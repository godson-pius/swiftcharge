import connectServer from "@/config/mongoose";
import { Transaction } from "@/models/transaction.model";
import User from "@/models/user.model";
import { BillPaymentDto } from "@/types/transaction.type";
import { authenticateRequest } from "@/utils/auth";
import { formatError } from "@/utils/errorHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const VTU_API_KEY = process.env.VTU_API_KEY!;
const VTU_BASE_URL = process.env.VTU_BASE_URL!;
const VTU_SECRET_KEY = process.env.VTU_SECRET_KEY!;
const VTU_PUBLIC_KEY = process.env.VTU_PUBLIC_KEY!;

/*
 * Handles bill payment request.
 */
export async function POST(request: NextRequest) {
    try {
        // Authenticate the user
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        // Parse the incoming request data
        const _data = await request.json();
        const data = BillPaymentDto.parse(_data);

        // Connect to the database if needed
        connectServer();

        // Generate a unique request ID
        const request_id = generateRequestId("YUs83meikd");

        // Destructure user and service data
        const [userId, serviceID, phone, billersCode, variation_code, amount, identifier] = [
            auth.userId,
            data.serviceId,
            data.phone,
            data.billersCode || data.phone,
            data.variationCode,
            data.amount,
            data.identifier
        ];
        const [userBalance, vtBalance] = [await getUserBalance(userId), await getVTBalance()];

        const _fallback = await fallback(vtBalance, userBalance, amount);
        if (_fallback?.success === false) {
            await Transaction.create({
                userId,
                amount,
                type: 'payment',
                status: 'failed',
                reference: request_id,
                description: _fallback.message,
                bill: {
                    type: identifier,
                    provider: serviceID,
                    accountNumber: phone
                }
            })
            return NextResponse.json({
                success: false,
                message: _fallback.message
            }, { status: 500 });
        }

        // Call the external API to make the payment
        const payBill = await axios.post(
            `${VTU_BASE_URL}pay`, {
            request_id,
            serviceID,
            billersCode,
            phone,
            variation_code,
            amount
        },
            {
                headers: {
                    "api-key": VTU_API_KEY,
                    "secret-key": VTU_SECRET_KEY
                }
            }
        );

        // Check if the payment was successful
        if (payBill.data.code !== "000") {
            await Transaction.create({
                userId,
                amount,
                type: 'payment',
                status: 'failed',
                reference: request_id,
                description: payBill.data.response_description,
                bill: {
                    type: identifier,
                    provider: serviceID,
                    accountNumber: phone,
                    metaData: payBill.data.content.transactions
                }
            });
            if (payBill.data.response_description === "") {
                throw new Error("Invalid VariationCode");
            }
            console.error("Error from API:", payBill.data.response_description);
            throw new Error(payBill.data.response_description || "Payment failed with an unknown error");
        }

        const transaction = await Transaction.create({
            userId,
            amount,
            type: 'payment',
            status: 'success',
            reference: request_id,
            description: `${identifier} purchase of ${amount}`,
            bill: {
                type: identifier,
                provider: serviceID,
                accountNumber: phone,
                metaData: payBill.data.content.transactions
            }
        })

        if (!transaction) {
            await Transaction.create({
                userId,
                amount,
                type: 'payment',
                status: 'failed',
                reference: request_id,
                description: `${identifier} purchase of ${amount}`,
                bill: {
                    type: identifier,
                    provider: serviceID,
                    accountNumber: phone,
                    metaData: payBill.data.content.transactions
                }
            })
            throw new Error("Transaction failed");
        }
        const user = await User.findById(userId);
        user.balance = user.balance - amount;
        await user.save();
        // Return the API response on successful payment
        return NextResponse.json({
            success: true,
            message: "Bill payment successful",
            data: { transaction, user }
        });

    } catch (error) {
        console.error("Error processing payment:", error); // Log the error for debugging
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

/**
 * Generate a unique request ID based on the current date and time
 */
const generateRequestId = (additionalString = '') => {
    // Get the current date and time in Africa/Lagos timezone (or GMT+1)
    const now = new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Lagos",
        hour12: false,
    });

    // Format the date into YYYYMMDDHHMM
    const datePart = now
        .replace(/[^0-9]/g, '') // Remove all non-numeric characters
        .slice(0, 12); // Get first 12 characters (YYYYMMDDHHMM)

    // Concatenate with the additional string (if provided)
    return datePart + additionalString;
}

const getVTBalance = async () => {
    const response = await axios.get(
        `${VTU_BASE_URL}balance`,
        {
            headers: {
                "api-key": VTU_API_KEY,
                "public-key": VTU_PUBLIC_KEY
            }
        }
    );
    return Number(response.data.contents.balance);
}

const getUserBalance = async (userId: string) => {
    const user = await User.findById(userId);
    if (!user) {
        return "user not found";
    }
    const balance = user.balance;
    return balance;
}

const fallback = async (vtBalance: number, userBalance: number, transactionAmount: number) => {
    // 1 => not enough user balance, 2 => enough user balance but not enough VTbalance => fund from monnify, 3 not enugh monnify alert admin;
    if (userBalance < transactionAmount) {
        return {
            success: false,
            message: "You don't have enough balance to process the transaction"
        }
    }

    if (transactionAmount >= vtBalance) {
        // fund VTPassl
        // error in process of funding mail admin
        return {
            success: false,
            message: "Something went wrong please retry transaction"
        }
    }
}
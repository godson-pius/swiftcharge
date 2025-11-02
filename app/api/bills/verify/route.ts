import connectServer from "@/config/mongoose";
import { VerifyBillerDto } from "@/types/transaction.type";
import { authenticateRequest } from "@/utils/auth";
import { formatError } from "@/utils/errorHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const VTU_API_KEY = process.env.VTU_API_KEY!;
const VTU_BASE_URL = process.env.VTU_BASE_URL!;
const VTU_SECRET_KEY = process.env.VTU_SECRET_KEY!;
const VTU_PUBLIC_KEY = process.env.VTU_PUBLIC_KEY!;

export async function POST(request: NextRequest) {
    try {
        // Authenticate the user
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        // Parse the incoming request data
        const _data = await request.json();
        const data = VerifyBillerDto.parse(_data);

        // Connect to the database if needed
        connectServer();

        // Generate a unique request ID
        const request_id = generateRequestId("YUs83meikd");

        // Destructure user and service data
        const [userId, serviceID, billersCode, variation_code] = [
            auth.userId,
            data.serviceId,
            data.billersCode,
            data.variationCode
        ];

        // Call the external API to make the payment
        const payBill = await axios.post(
            `${VTU_BASE_URL}merchant-verify`, {
            request_id,
            serviceID,
            billersCode,
            variation_code
        },
            {
                headers: {
                    "api-key": VTU_API_KEY,
                    "secret-key": VTU_SECRET_KEY
                }
            }
        );


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
        .slice(2, 14); // Get first 12 characters (YYYYMMDDHHMM)

    // Concatenate with the additional string (if provided)
    return datePart + additionalString;
}
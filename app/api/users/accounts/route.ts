import connectServer from "@/config/mongoose";
import User, { IUser } from "@/models/user.model";
import { authenticateRequest } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";
import {formatError} from "@/utils/errorHandler";
import axios from "axios";
import { createReservedAccount } from "@/utils/monify";
    
/**
 * create reserved account for user and update user with reserved account
 * @param NextRequest - The HTTP request object
 * @return A JSON response with the created user data or an error message
 * @throws 500 - If there is an error during user creation | 400 - If the request is invalid
 * @description This function handles the creation of a reserved account for a user by collecting data from the request body
 * and saving it to the database. It also handles errors and returns appropriate responses.
 */

export async function POST(request: NextRequest) {
    try {
        const { userId } = await request.json().catch(() => { 
            return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
        });
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }
        //authenticate user
        const auth = await authenticateRequest(request);
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        // confirm authenticated user is the same as userId or admin
        if (auth.userId !== userId && auth.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized access", dev: "only authorized users or admins only" }, { status: 403 });
        }

        await connectServer();
        //find user by id
        const user: IUser = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        // create reserved account and save
        const reservedAccount = await createReservedAccount(userId, user.fullname!, user.email);
        if (!reservedAccount) {
            return NextResponse.json({ error: "Failed to create reserved account" }, { status: 500 });
        }
        // update user with reserved account
        user.accounts.push(reservedAccount.accounts);
        await user.save();
        // return response
        return NextResponse.json({ data: { reservedAccount } }, { status: 200 });

    } catch (error) { 
        const formattedError = formatError(error);
        return NextResponse.json({ error: formattedError.errors[0].message }, { status: formattedError.status });
    }
}


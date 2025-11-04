import connectServer from "@/config/mongoose";
import User from "@/models/user.model";
import { CreateUserDto } from "@/types/user.type";
import { formatError } from "@/utils/errorHandler";
import { createReferralChain } from "@/utils/referral";
import { nanoid } from "nanoid";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a new user
 * @param request - The HTTP request object
 * @returns A JSON response with the created user data or an error message
 * @throws 500 - If there is an error during user creation | 400 - If the request is invalid
 * @description This function handles the creation of a new user by collecting data from the request body
 * and saving it to the database. It also handles errors and returns appropriate responses.
 */
export async function POST(request: NextRequest) {
    try {
        await connectServer();
        const _data = await request.json();
        const data = CreateUserDto.parse(_data);

        // Check if user already exists (run checks in parallel)
        const checks = [
            User.findOne({ email: data.email }),
            User.findOne({ username: data.username })
        ];
        const [existingUserEmail, existingUserUsername] = await Promise.all(checks);
        if (existingUserEmail) {
            return NextResponse.json({ error: "User with this email already exists" }, { status: 400 });
        }
        if (existingUserUsername) {
            return NextResponse.json({ error: "User with this username already exists" }, { status: 400 });
        }


        // Generate unique refId
        const refId = nanoid(5);

        // Handle referral (parentId)
        let parentId = null;
        if (data.parentId) {
            const referrer = await User.findOne({ refId: data.parentId });
            if (!referrer) {
                return NextResponse.json({ error: "Invalid referrer referral ID" }, { status: 400 });
            }
            parentId = referrer._id.toString();
        }

        // Create user
        const user = await User.create({
            fullname: data.fullname,
            username: data.username,
            email: data.email,
            phone: data.phone,
            address: data.address,
            password: data.password,
            refId,
            parentId,
            role: data.role || 'user',
        });

        // Create referral chain if there's a referrer
        if (parentId) {
            await createReferralChain(user._id.toString(), parentId);
        }

        // Remove password from response
        const userObj = user.toObject();
        delete userObj.password;
        delete userObj.pin;

        return NextResponse.json({ user: userObj }, { status: 201 });
    } catch (error) {
        const formatedError = formatError(error)
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

export async function GET(__request: Request) {
    try {
        // Exclude sensitive fields at the query level and return plain objects
        const users = await User.find().select('-password -pin');
        return NextResponse.json({ users }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}
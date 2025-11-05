// app/api/users/me/route.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { authenticateRequest } from "@/utils/auth";
import connectServer from "@/config/mongoose";
import User from "@/models/user.model";
import { UpdateUserDto } from "@/types/user.type";
import { formatError } from "@/utils/errorHandler";

export async function GET(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        connectServer();
        const user = await User.findById(auth.userId).select('-password');



        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
        const referrals = await User.find({ parentId: user.id });
        const { pin, ...rest } = user;

        return NextResponse.json({ data: { user: rest, referrals } }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

export async function PUT(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        connectServer();
        const body = await request.json();
        const data = UpdateUserDto.parse(body);

        const user = await User.findByIdAndUpdate(auth.userId, data, { new: true }).select('-password -pin');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ data: { user } }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        await connectServer();
        const user = await User.findByIdAndDelete(auth.userId);

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User deleted successfully" }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}
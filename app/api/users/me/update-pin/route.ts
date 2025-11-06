import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest } from "@/utils/auth";
import connectServer from "@/config/mongoose";
import User from "@/models/user.model";
import { formatError } from "@/utils/errorHandler";

const UpdatePinDto = z.object({
    password: z.string({ required_error: "Password is required" }).min(6),
    pin: z.string({ required_error: "PIN is required" }).regex(/^\d{4}$/, "PIN must be 4 digits"),
});

export async function POST(request: NextRequest) {
    try {
        // Authenticate via token first (ensures we're acting on the authenticated account)
        const auth = await authenticateRequest(request);
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        connectServer();

        const body = await request.json();
        const data = UpdatePinDto.parse(body);

        // Find user and verify provided password as extra authentication
        const user = await User.findById(auth.userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const valid = await user.comparePassword(data.password);
        if (!valid) {
            return NextResponse.json({ error: "Password is incorrect" }, { status: 401 });
        }

        // Update pin (stored as string)
        user.pin = data.pin;
        await user.save();

        return NextResponse.json({ message: "PIN updated successfully" }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}


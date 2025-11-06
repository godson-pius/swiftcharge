import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { z } from "zod";
import { authenticateRequest } from "@/utils/auth";
import connectServer from "@/config/mongoose";
import User from "@/models/user.model";
import { formatError } from "@/utils/errorHandler";

const UpdatePasswordDto = z.object({
    oldPassword: z.string({ required_error: "Old password is required" }),
    newPassword: z.string({ required_error: "New password is required" }).min(6),
});

export async function POST(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request);
        if ("error" in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        connectServer();

        const body = await request.json();
        const data = UpdatePasswordDto.parse(body);

        const user = await User.findById(auth.userId);
        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        const isMatch = await user.comparePassword(data.oldPassword);
        if (!isMatch) {
            return NextResponse.json({ error: "Old password is incorrect" }, { status: 400 });
        }

        user.password = data.newPassword;
        await user.save();

        return NextResponse.json({ message: "Password updated successfully" }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

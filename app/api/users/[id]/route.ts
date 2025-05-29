import User from "@/models/user.model";
import { NextResponse } from "next/server";
import connectServer from "@/config/mongoose";
import { authenticateRequest } from "@/utils/auth";
import { formatError } from "@/utils/errorHandler";

export async function GET(request: Request, context: { params: { id: string } }) {
    try {
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }
        console.log(auth);
        
        // role based accesss control
        if (auth.role !== 'admin') {
            return NextResponse.json({ error: "Unauthorized access" }, { status: 403 });
        }

        const userId = context.params.id;
        if (!userId) {
            return NextResponse.json({ error: "User ID is required" }, { status: 400 });
        }

        await connectServer();
        const user = await User.findById(userId).select('-password');

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ data: user }, { status: 200 });
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}


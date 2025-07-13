// handle transactions at top level: get all.
import { NextRequest, NextResponse } from "next/server";
import connectServer from "@/config/mongoose";
import {Transaction} from "@/models/transaction.model";
import { authenticateRequest } from "@/utils/auth";
import User from "@/models/user.model";

export async function GET(request: NextRequest) {
    try {
        const auth = await authenticateRequest(request);
        if ('error' in auth) {
            return NextResponse.json({ error: auth.error }, { status: auth.status });
        }

        await connectServer();
        const user = await User.findById(auth.userId);
        
        if (!user) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        // if user is admin fetch all transactions else fetch transactions for the user
        const transactions = user.role === 'admin'
            ? await Transaction.find().sort({ createdAt: -1 }).populate('userId', '-password')
            : await Transaction.find({ userId: user._id }).sort({ createdAt: -1 }).populate('userId', '-password');

        return NextResponse.json({ data: transactions }, { status: 200 });
    } catch (error) {
        console.error("Error fetching transactions:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
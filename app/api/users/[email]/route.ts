import User from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(request: Request, context: any) {
    try {
        const { params} = context;
        const { password } = await request.json();
        
        const user = await User.findOne({email: params.email, password: password});
        if (user == null) return NextResponse.json("No user found", { status: 404 });

        return NextResponse.json({user}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: "The error"}, {status: 500});
    } 
}

export async function GET(request: Request, context: any) {
    try {
        const { params} = context;
        
        const user = await User.findOne({email: params.email});
        if (user == null) return NextResponse.json("No user found", { status: 404 });

        return NextResponse.json({user}, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: "The error"}, {status: 500});
    } 
}
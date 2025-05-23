import connectServer from "@/config/mongoose";
import User from "@/models/user.model";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
    try {
        const data = await request.json();
        console.log(data);



        await User.create(data);

        return NextResponse.json({data}, {status: 201});
    } catch (error) {
        return NextResponse.json({error}, {status: 500});
    }

}

export async function GET(request: Request) {
    try {
        const users = await User.find({});
        return NextResponse.json({users}, {status: 200});
    } catch (error) {
        return NextResponse.json({error: "The error"}, {status: 500});
    }
}
import User from "@/models/user.model";
import connectServer from "@/config/mongoose";
import { LoginUserDto } from "@/types/user.type";
import { formatError } from "@/utils/errorHandler";
import { NextResponse } from "next/server";
import jwt, { Secret, SignOptions } from 'jsonwebtoken';

export async function POST(request: Request) {
    try {
        await connectServer();
        const body = await request.json();
        const data = LoginUserDto.parse(body)
        
        const user = await User.findOne({email: data.email});
        
        if (!user) {
            return  NextResponse.json({error: "No user found"}, { status: 404 });
        } 

        const isPasswordValid = await user.comparePassword(data.password);
        if (!isPasswordValid) {
            return NextResponse.json({error: "Incorrect password"}, { status: 401 });
        }

        const jwtSecret: Secret = process.env.JWT_SECRET as string;
        const jwtOptions: SignOptions = { 
            expiresIn: '3h' 
        };

        const token = jwt.sign(
            { id: user._id, email: user.email, role: user.role },
            jwtSecret,
            jwtOptions
        );

        const { password, ...userData } = user.toObject();
        return NextResponse.json({ data: { user: userData, token } }, { status: 200 });

    } catch (error) {
        const formatedError = formatError(error)
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    } 
}
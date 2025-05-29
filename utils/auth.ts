// utils/auth.ts
import { NextResponse } from 'next/server';
import { verifyToken } from './jwt';
import type { NextRequest } from 'next/server';
import { JwtPayload } from 'jsonwebtoken';

export async function authenticateRequest(request: NextRequest) {
    try {
        const token = request.headers.get("authorization")?.split(" ")[1];
        
        if (!token) {
            return { error: "No token provided", status: 401 };
        }

        const payload = await verifyToken(token);

        return { userId: (payload as JwtPayload).id, role: (payload as JwtPayload).role, email: (payload as JwtPayload).email };
    } catch (error) {
        return { error: `Authentication failed: ${(error as Error).message}`, status: 401 };
    }
}
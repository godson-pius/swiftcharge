// middleware.ts (in root directory)
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
    // Skip middleware for public routes
    if (
        request.nextUrl.pathname.startsWith('/api/users/login') ||
        request.nextUrl.pathname.startsWith('/api/users/register')
    ) {
        return NextResponse.next();
    }

    // Check for Authorization header
    const hasAuthHeader = request.headers.has("authorization");
    if (!hasAuthHeader) {
        return NextResponse.json(
            { error: "No authorization header" },
            { status: 401 }
        );
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/api/users/me',
        // '/api/users/:id*',
        '/api/transactions/:path*'
    ]
};
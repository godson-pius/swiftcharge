import { NextRequest, NextResponse } from "next/server";

// Auto fund from monify
export function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get("amount");
}

const fundVTPass = (amount: number) => {
    
}
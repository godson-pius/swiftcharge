import { formatError } from "@/utils/errorHandler";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

const VTU_API_KEY = process.env.VTU_API_KEY!;
const VTU_BASE_URL = process.env.VTU_BASE_URL!;
const VTU_SECRET_KEY = process.env.VTU_SECRET_KEY!;
const VTU_PUBLIC_KEY = process.env.VTU_PUBLIC_KEY!;

export async function GET(request: NextRequest, context: { params: { serviceId: string } }) {
    try {
        const serviceId = context.params.serviceId;
        const products = await axios.get(`${VTU_BASE_URL}service-variations?serviceID=${serviceId}`, {
            headers: {
                "api-key": VTU_API_KEY,
                "public-key": VTU_PUBLIC_KEY
            }
        });

        if (products.data.content.errors) {
            throw Error(products.data.content.errors);
        }

        return NextResponse.json({
            success: true,
            message: "Fetched products for serviceId",
            data: products.data.content
        })
    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}
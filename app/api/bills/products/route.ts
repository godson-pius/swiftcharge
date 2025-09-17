import { formatError } from "@/utils/errorHandler";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

const VTU_API_KEY = process.env.VTU_API_KEY!;
const VTU_BASE_URL = process.env.VTU_BASE_URL!;
const VTU_SECRET_KEY = process.env.VTU_SECRET_KEY!;
const VTU_PUBLIC_KEY = process.env.VTU_PUBLIC_KEY!;

/** GET /api/bills/categories
 * @description fetch all available bills and services
 */
export async function GET(request: NextRequest) {
    try {
        console.log("Request authenticated fetching services from VTPass");
        let services;

        const { searchParams } = new URL(request.url);
        const identifier = searchParams.get("identifier");

        if (identifier) {

            const validIdentifiers = ['airtime', 'data', 'electricity-bill', 'tv-subscription', 'education', 'other-services', 'insurance'];
            if (!validIdentifiers.includes(identifier)) {
                return NextResponse.json({
                    success: false,
                    message: `identifier: ${identifier} is not valid`
                }, {status: 400})
            }

            console.log("Fetching services with identifier");
            services = await axios.get(`${VTU_BASE_URL}services?identifier=${identifier}`, {
                headers: {
                    "api-key": VTU_API_KEY,
                    "public-key": VTU_PUBLIC_KEY
                }
            });
        } else {
            console.log("Fetching all services");
            services = await axios.get(`${VTU_BASE_URL}service-categories`, {
                headers: {
                    "api-key": VTU_API_KEY,
                    "public-key": VTU_PUBLIC_KEY
                }
            });
        }

        return NextResponse.json({
            success: true,
            message: "Services fetched successfully",
            data: services.data.content
        }, { status: 200 });

    } catch (error) {
        const formatedError = formatError(error);
        return NextResponse.json({ error: formatedError.errors[0].message }, { status: formatedError.status });
    }
}

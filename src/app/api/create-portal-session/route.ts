import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function POST(request: Request) {
    const { customerId } = await request.json();

    try {
        const session = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: process.env.DOMAIN_URL,
        });

        return new NextResponse(JSON.stringify({ url: session.url }), { status: 200 });
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

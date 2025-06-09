import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;
    const FRONTEND_URL = process.env.FRONTEND_URL!;

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: "2025-05-28.basil",
    });

    const { price_id } = await request.json();

    const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price: price_id,
                quantity: 1,
            },
        ],
        mode: "payment",
        success_url: `${FRONTEND_URL}/service-list?isSuccess=true`,
        cancel_url: `${FRONTEND_URL}/service-list?isSuccess=false`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
}

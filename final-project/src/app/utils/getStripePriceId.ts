import Stripe from "stripe";

export async function getStripePriceId(
    girlName: string,
    girlImgeUrl: string
): Promise<string> {
    const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY!;

    const stripe = new Stripe(STRIPE_SECRET_KEY, {
        apiVersion: "2025-05-28.basil",
    });

    const product = await stripe.products.create({
        name: girlName,
        images: [girlImgeUrl],
    });

    const price = await stripe.prices.create({
        currency: "usd",
        unit_amount: 1000,
        product: product.id,
    });

    return price.id as string;
}

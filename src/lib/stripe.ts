import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
    throw new Error("STRIPE_SECRET_KEY environment variable is not defined");
}

const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2024-04-10',
});

export default stripe;

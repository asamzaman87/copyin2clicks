import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import User from "@/lib/model/userModel";
import dbConnect from "@/lib/dbConnect";
import { headers } from "next/headers";
export async function POST(req: NextRequest) {
  try {
    const buf = await req.text();
    const sig = headers().get("stripe-signature");
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

    if (!sig) {
      console.log(`⚠️ Webhook signature is null.`);
      return NextResponse.json(
        { error: { message: "Webhook Error: Signature is null." } },
        { status: 400 }
      );
    }

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(buf, sig, webhookSecret);
    } catch (err: any) {
      console.log(`⚠️ Webhook signature verification failed.`, err.message);
      return NextResponse.json(
        { error: { message: `Webhook Error: ${err.message}` } },
        { status: 400 }
      );
    }

    await dbConnect();

    const subscription = event.data.object as Stripe.Subscription;
    console.log("subscriptionsubscription", subscription);
    
    console.log('eventeventevent', event.type)
    switch (event.type) {
      case "customer.subscription.created":
      case "customer.subscription.updated": {
        await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          {
            subscriptionStatus: subscription.status,
            stripeSubscriptionId: subscription.id,
            isActive: true,
          }
        );
        console.log(`Subscription ${event.type} handled: ${subscription.id}`);
        break;
      }

      case "customer.subscription.deleted":
        await User.findOneAndUpdate(
          { stripeCustomerId: subscription.customer },
          {
            subscriptionStatus: subscription.status,
            stripeSubscriptionId: null, // Clear the subscription ID if needed
            isActive: false,
          }
        );
        console.log(`Subscription deleted: ${subscription.id}`);
        break;

      case "customer.subscription.trial_will_end":
        console.log(`Subscription trial ending: ${subscription.id}`);
        break;

      case "entitlements.active_entitlement_summary.updated":
        console.log(`Active entitlement summary updated for ${subscription.id}`);
        break;

      default:
        console.log(`Unhandled event type: ${event.type}`);
        break;
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: { message: "Method Not Allowed" } },
      { status: 405 }
    );
  }
}


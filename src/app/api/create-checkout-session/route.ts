import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/option";

/**
 * Handles creating a new Stripe customer, fetching price details, and initiating a checkout session for a subscription.
 * @param request An instance of NextRequest containing the JSON payload with lookup_key and email.
 * @returns A NextResponse object with a JSON body containing the checkout session URL and a status of 200 on success, or an error message and a status of 500 on failure.
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const session = await getServerSession(options);

    if (!session?.user) {
      return NextResponse.json(
        {
          error: {
            code: "no-access",
            message: "You are not signed in.",
          },
        },
        { status: 401 }
      );
    }

    const user = await User.findOne({ _id: session.user.id });

    if (!user) {
      return NextResponse.json(
        {
          error: {
            code: "user-not-found",
            message: "User not found.",
          },
        },
        { status: 404 }
      );
    }

    const hasUsedTrial = user.hasUsedTrial; // Assuming `hasUsedTrial` is a field in your user schema

    const subscriptionData: { metadata: { payingUserId: string }; trial_period_days?: number } = {
      metadata: {
        payingUserId: session.user.id,
      },
    };

    if (!hasUsedTrial) {
      subscriptionData.trial_period_days = 1;
      // Mark the user as having used the trial after creating the session
      user.hasUsedTrial = true;
      await user.save();
    }

    const checkoutSession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: "price_1PQPLmFCc8jJeTk6XkLyVPXJ",
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: session.user.stripeCustomerId,
      success_url: `https://extension-landing-page-zeta.vercel.app/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://extension-landing-page-zeta.vercel.app/?canceled=true`,
      subscription_data: subscriptionData,
    });

    return new NextResponse(JSON.stringify({ url: checkoutSession.url }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

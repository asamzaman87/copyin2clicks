import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/option";

/**
 * Handles creating a new Stripe customer, fetching price details, and initiating a checkout session for a subscription.
 * @param request An instance of NextRequest containing the JSON payload .
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

    const checkoutSession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      // payment_method_types: ['card', 'amazon_pay'],
      line_items: [
        {
          price: "price_1PeFzeDqnd1M4o5t9GUHQ4KT",
          // price: "price_1PeCGuDqnd1M4o5tB9FF1NjV",
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: session.user.stripeCustomerId,
      success_url: `https://www.copyin2clicks.com/?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://www.copyin2clicks.com/?canceled=true`,
      subscription_data: {
        metadata: {
          payingUserId: session.user.id,
        },
        trial_period_days : 7
      }
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

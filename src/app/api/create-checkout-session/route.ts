import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
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
    console.log('session123',session)
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
    const checkoutsession = await stripe.checkout.sessions.create({
      billing_address_collection: "auto",
      line_items: [
        {
          price: "price_1PQPLmFCc8jJeTk6XkLyVPXJ",
          quantity: 1,
        },
      ],
      mode: "subscription",
      customer: session.user.stripeCustomerId,
      success_url: `https://extension-landing-page-zeta.vercel.app//?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `https://extension-landing-page-zeta.vercel.app/?canceled=true`,
      subscription_data: {
        metadata: {
          payingUserId: session.user.id,
        },
        trial_period_days: 7,
      },
    });

    return new NextResponse(JSON.stringify({ url: checkoutsession.url }), {
      status: 200,
    });
  } catch (error: any) {
    return new NextResponse(error.message, {
      status: 500,
    });
  }
}

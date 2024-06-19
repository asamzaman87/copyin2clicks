import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/option";
import stripe from "@/lib/stripe";

export async function GET(req: NextRequest) {
  const session = await getServerSession(options);
console.log('cancel session',session)
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
  const stripeSubscriptionId = session.user.stripeSubscriptionId as string;
console.log('stripeSubscriptionIdstripeSubscriptionId',stripeSubscriptionId)
  const subscription = await stripe.subscriptions.update(stripeSubscriptionId, {
    cancel_at_period_end: true,
    // metadata : {payingUserEmail : session.user?.email!}
  });

  return NextResponse.json({ subscription }, { status: 200 });
}

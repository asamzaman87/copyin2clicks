import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";
import { getServerSession } from "next-auth";
import { options } from "../auth/[...nextauth]/option";

export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    await dbConnect();
    const session = await getServerSession(options);
    if (!session?.user) {
      return NextResponse.json(
        { error: { code: "no-access", message: "You are not signed in." } },
        { status: 401 }
      );
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json(
        { error: { code: "user-not-found", message: "User not found." } },
        { status: 404 }
      );
    }

    const subscriptions = await stripe.subscriptions.retrieve(
      session.user.stripeSubscriptionId as string,
      {
        expand: ["default_payment_method"]
      }
      );

    return NextResponse.json({ subscriptions }, { status: 200 });
  } catch (error: any) {
    return new NextResponse(error.message, { status: 500 });
  }
}

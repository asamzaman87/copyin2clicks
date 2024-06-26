import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { options } from "../auth/[...nextauth]/option";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";
export const dynamic = 'force-dynamic' 

export async function GET(req: NextRequest, res: NextResponse) {
  // Ensure the method is GET
  if (req.method !== "GET") {
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 405 }
    );
  }

  // Get the session from the request
  const session = await getServerSession(options);
  // Check if the user is authenticated
  if (!session || !session.user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  // Connect to the database
  await dbConnect();

  // Find the user by their email
  const user = await User.findOne({ email: session.user.email });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  // Return the user data
  return NextResponse.json(
    {
      id: user._id,
      email: user.email,
      name: user.name,
      image: user.image,
      stripeCustomerId: user.stripeCustomerId,
      isActive: user.isActive,
      subscriptionStatus: user.subscriptionStatus,
      stripeSubscriptionId: user.stripeSubscriptionId,
    },
    { status: 200 }
  );
}

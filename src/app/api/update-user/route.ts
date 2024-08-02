// pages/api/reset-password.js
import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";

export async function POST(req: NextRequest, res : NextResponse) {
  const { email } = await req.json();
  await dbConnect();

  try {
    const user = await User.findOne({
        email  // Check if token is not expired
    });
    console.log("user1212", user)
    if (!user) {
      return NextResponse.json({ error: "Password reset token is invalid or has expired." }, { status: 400 });
    }

    // Hash the new password

    // Update the user's password and remove the reset token and expiry time
    user.loginCount = 2;
    await user.save();

    return NextResponse.json({ message: "User updated." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

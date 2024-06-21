// pages/api/reset-password.js
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";

export async function POST(req: NextRequest, res : NextResponse) {
  const { token, password } = await req.json();
  await dbConnect();

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() } // Check if token is not expired
    });

    if (!user) {
      return NextResponse.json({ error: "Password reset token is invalid or has expired." }, { status: 400 });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and remove the reset token and expiry time
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return NextResponse.json({ message: "Password has been reset." }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

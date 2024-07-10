import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import dbConnect from "@/lib/dbConnect";
import User from "@/lib/model/userModel";

/**
 * Handles password reset requests by verifying the user's email, generating a reset token,
 * updating the user record with the token, and sending a reset link via email.
 * @param req - An instance of NextRequest containing the user's email in the request body.
 * @param res - An instance of NextResponse to send the response.
 * @returns JSON response with a success message or an error message.
 */
export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const { email } = await req.json();
    await dbConnect();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 400 });
    }

    const resetToken = Math.random().toString(36).slice(2);
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;

    const updatedData = await User.findOneAndUpdate(
      { email },
      {
        $set: {
          resetPasswordToken: resetToken,
          resetPasswordExpires: Date.now() + 3600000,
        },
      },
      { new: true }
    );

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.SMTP_EMAIL,
      to: user.email,
      subject: "Password Reset",
      html: `<p>You are receiving this because you (or someone else) have requested the reset of the password for your account.</p>
      <p>Please click on the following link, or paste this into your browser to complete the process:</p>
      <p><a href="https://extension-landing-page-zeta.vercel.app/forgot-password/${resetToken}">Reset Password</a></p>
      <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`,
    });

    return NextResponse.json({ message: "Email sent" }, { status: 200 });
  } catch (error: any) {
    console.error(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

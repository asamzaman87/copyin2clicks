import User from "@/lib/model/userModel";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response : NextResponse) {
  const { email } = await request.json();

  await dbConnect();

  const user = await User.findOne({ email });
    
  if (user) {
    // Return if the user is new or existing
    return NextResponse.json({ isNewUser: user.isNewUser }, { status: 200 });
  }

  // User not found
  return NextResponse.json({ isNewUser: false }, { status: 404 });
}

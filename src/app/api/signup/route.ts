import User from "@/lib/model/userModel";
import dbConnect from "@/lib/dbConnect";
import bcrypt from "bcryptjs"; 
import { NextRequest, NextResponse } from "next/server";
 
export async function POST(request: NextRequest) {
    const { name, email, password } = await request.json();
 
    await dbConnect();
 
    const existingUser = await User.findOne({ email });
 
    if (existingUser) {
        return new NextResponse("Email is already in use", { status: 400 });
    }
 
    const hashedPassword = await bcrypt.hash(password, 5);
    const newUser = new User({
        name,
        email,
        password: hashedPassword,
    });
 
    try {
        await newUser.save();
        return new NextResponse("user is registered", { status: 200 });
    } catch (err: any) {
        return new NextResponse(err, {
            status: 500,
        });
    }
};
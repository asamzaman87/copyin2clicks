import dbConnect from "@/lib/dbConnect";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/model/userModel";
import bcrypt from "bcryptjs";
import stripe from "@/lib/stripe";

// const baseURL = process.env.NEXT_PUBLIC_HOSTNAME + "login";

export const options: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {

        name: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        try {
          const user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            }
          }
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],
 

       
  pages: {
    // signIn: "/",
    // error: '/auth/error',
    // signOut: '/auth/signout'
  },
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
 
  },
  
  events:{
    createUser: async ({ user }) => {
    const customer=  await stripe.customers.create({
        email: user.email!,
        name: user.name!,
      })
      await User.findByIdAndUpdate(user.id, {
        stripeCustomerId: customer.id,
      });
  
    }
  }
};

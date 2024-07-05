import dbConnect from "@/lib/dbConnect";
import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import User from "@/lib/model/userModel";
import bcrypt from "bcryptjs";
import stripe from "@/lib/stripe";
import clientPromise from "@/lib/db";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import { Adapter } from "next-auth/adapters";

export const options: NextAuthOptions = {
  adapter: MongoDBAdapter(clientPromise) as Adapter,

  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      allowDangerousEmailAccountLinking : true
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        await dbConnect();
        try {
          let user = await User.findOne({ email: credentials.email });
          if (user) {
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              // Create Stripe customer if stripeCustomerId is not available
              if (!user.stripeCustomerId) {
                const customer = await stripe.customers.create({
                  email: user.email,
                  name: user.name,
                });

                user.stripeCustomerId = customer.id;
                await user.save();
              }

              return {
                id: user._id,
                email: user.email,
                name: user.name,
                image: user.image,
                stripeCustomerId: user.stripeCustomerId,
                isActive: user.isActive,
                subscriptionStatus: user.subscriptionStatus,
                stripeSubscriptionId: user.stripeSubscriptionId,
                emailVerified: user.emailVerified,
              };
            }
          }
          return null;
        } catch (err: any) {
          throw new Error(err);
        }
      },
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  pages: {
    // signIn: "/",
    // error: '/auth/error',
    // signOut : ''
  },
  callbacks: {
    // async signIn({ user }) {
    //   await dbConnect();
    //   const existingUser = await User.findById(user.id);
      
    //   if (!existingUser.stripeCustomerId) {
    //     const customer = await stripe.customers.create({
    //       email: user.email!,
    //       name: user.name!,
    //     });
    //     await User.findByIdAndUpdate(user.id, {
    //       stripeCustomerId: customer.id,
    //     });
    //   }
    //   return true;
    // },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.isActive = user.isActive;
        token.stripeCustomerId = user.stripeCustomerId;
        token.subscriptionStatus = user.subscriptionStatus;
        token.stripeSubscriptionId = user.stripeSubscriptionId;
        token.emailVerified = user.emailVerified;
      } else {
        await dbConnect();
        const dbUser = await User.findById(token.id);
        if (dbUser) {
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image;
          token.isActive = dbUser.isActive;
          token.stripeCustomerId = dbUser.stripeCustomerId;
          token.subscriptionStatus = dbUser.subscriptionStatus;
          token.stripeSubscriptionId = dbUser.stripeSubscriptionId;
          token.emailVerified = dbUser.emailVerified;
        }
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.name = token.name as string;
      session.user.email = token.email as string;
      session.user.image = token.image as string;
      session.user.isActive = token.isActive as boolean;
      session.user.stripeCustomerId = token.stripeCustomerId as string;
      session.user.subscriptionStatus = token.subscriptionStatus as string;
      session.user.stripeSubscriptionId = token.stripeSubscriptionId as string;
      session.user.emailVerified = token.emailVerified as Date;

      return session;
    },
  },

  events: {
    createUser: async ({ user }) => {
      await dbConnect();
      const existingUser = await User.findById(user.id);

      if (!existingUser.stripeCustomerId) {
        const customer = await stripe.customers.create({
          email: user.email!,
          name: user.name!,
        });

        await User.findByIdAndUpdate(user.id, {
          stripeCustomerId: customer.id,
        });
      }
    },
  },
};

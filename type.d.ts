// next-auth.d.ts
import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    stripeCustomerId?: string;
    isActive?: boolean;
    subscriptionStatus?: string;
    stripeSubscriptionId?: string;
    emailVerified?: Date;
    account?: any[];
    session?: any[];
  }

  interface Session {
    user: User;
  }

  interface JWT {
    id: string;
    stripeCustomerId?: string;
    isActive?: boolean;
    subscriptionStatus?: string;
    stripeSubscriptionId?: string;
    emailVerified?: Date;
    account?: any[];
    session?: any[];
  }
}

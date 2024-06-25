"use client";

import { useSession } from 'next-auth/react';
import Image from 'next/image';
import React from 'react';
const user = {
    image: 'https://via.placeholder.com/150',
    name: 'John Doe',
    email: 'john.doe@example.com',
    subscription: {
      plan: 'Premium',
      status: 'Active',
      nextBillingDate: '2024-07-01'
    }
  };
  
export default function UserProfile() {
    const { data: session, status } = useSession();

  return (
    <main className="flex flex-col min-h-screen items-center p-8  space-y-6">
      <h1 className="text-3xl font-bold">User Profile</h1>
      <div className="w-full max-w-2xl space-y-8">
        <section className="flex flex-col items-center space-y-4">
          <Image
            src={user?.image || '/icon.png'}
            alt={'not-found'}
            className="rounded-full object-cover"
            width={100}
            height={100}
          />
          <div className="text-center">
            <h2 className="text-2xl font-semibold">{session?.user?.name}</h2>
            <p className="text-gray-600 dark:text-gray-400">{session?.user?.email}</p>
          </div>
        </section>
        <section className="w-full">
          <h2 className="text-2xl font-semibold">Subscription Details</h2>
          <div className="mt-4 border rounded-lg p-4">
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Plan:</strong> {`${session?.user?.subscriptionStatus ==='active'? 'Premium' : 'Free Trial'}`}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Status:</strong> {user.subscription.status}
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              <strong>Next Billing Date:</strong> {user.subscription.nextBillingDate}
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

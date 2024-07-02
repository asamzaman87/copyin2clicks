"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

interface subscriptionData {
  subscriptions: any;
  id: string;
  trial_end: number; // Unix timestamp
  status: string;
  current_period_end: number;
  default_payment_method?: {
    card?: {
      last4: string;
    };
  };
}

export default function UserProfile() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const [isLoading, setisLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<subscriptionData>();
  console.log(subscriptionData, "subscriptionData234567");
  const fetchSubscriptionDetails = async () => {
    try {
      setisLoading(true);
      const res = await fetch("/api/subscription-details");
      const subscriptions = await res.json();
      console.log(subscriptions, "sddsgfgnh");
      setSubscriptionData(subscriptions);
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      fetchSubscriptionDetails();
    }
  }, [status]);

  const cancelSubscription = async () => {
    setisLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription");
      const { subscription } = await res.json();
      console.log(subscription);
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <>
      {isLoading && <Loader />}
      <main className="flex flex-col min-h-screen items-center p-8 space-y-6 bg-gray-50 dark:bg-gray-900">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-200">
          User Profile
        </h1>
        <div className="w-full max-w-3xl space-y-12">
          <section className="flex flex-col items-center bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 space-y-6">
            <Image
              src={session?.user?.image || "https://via.placeholder.com/150"}
              alt={"not-found"}
              className="rounded-full object-cover border-4 border-gray-200 dark:border-gray-700"
              width={120}
              height={120}
            />
            <div className="text-center">
              <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
                {session?.user?.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                {session?.user?.email}
              </p>
            </div>
          </section>
          {subscriptionData && (
            <section className="w-full bg-white flex justify-center items-center dark:bg-gray-800 shadow-lg rounded-lg p-8">
              <div className="space-y-4 ">
                <Card className="w-full max-w-md">
                  <CardHeader>
                    <CardTitle>Subscription Details</CardTitle>
                    <CardDescription>
                      Manage your account and subscription.
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="plan">Current Plan</Label>
                      <Input
                        disabled
                        id="plan"
                        value={
                          subscriptionData?.subscriptions.status === "trialing"
                            ? "Free Trial"
                            : "Premium"
                        }
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="payment">Payment Method</Label>
                      <Input
                        disabled
                        id="payment"
                        value={`Visa ending with 2222`}
                      />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="next-billing">Next Billing Date</Label>
                      <Input
                        disabled
                        id="next-billing"
                        value={`${formatDate(
                          subscriptionData?.subscriptions.current_period_end
                        )}`}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <AlertDialog>
                        <AlertDialogTrigger className="border rounded-md py-2">
                          Cancel Subscription
                        </AlertDialogTrigger>
                        <AlertDialogContent className="bg-white text-black">
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Are you absolutely sure?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will
                              permanently delete your subscription and remove
                              your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel onClick={cancelSubscription}>
                              Cancel Subscription
                            </AlertDialogCancel>
                            <AlertDialogAction>Close</AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          )}
        </div>
      </main>
    </>
  );
}

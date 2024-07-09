"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import axios from "axios";
import { useRouter } from "next/navigation";

import WhyPremium from "./WhyPremium";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import Loader from "../ui/loader";
import PremiumCheckout from "../premiumcheckout/PremiumCheckout";
import Image from "next/image";
// import { Card } from "../ui/card";
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
interface SubscriptionActive {
  subscriptions : any ;
  id : string ;
  cancel_at_period_end : boolean;
}

const PricingSection: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const { data: session, status } = useSession();
  const [isLoading, setisLoading] = useState(false);

  const [subscriptionData, setSubscriptionData] = useState<subscriptionData>();
  const [SubscriptionActive, setSubscriptionActive] = useState<SubscriptionActive>();

  const parseQueryParams = () => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      setSuccess(true);
      setSessionId(query.get("session_id") || "");
    } else if (query.get("canceled")) {
      setSuccess(false);
    }
  };
  useEffect(() => {
    parseQueryParams();
  }, [sessionId]);

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

  const handleSubscription = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setisLoading(true);
    try {
      const response = await axios.post<{ url: string }>(
        "/api/create-checkout-session"
      );
      console.log("response", response);
      router.replace(response.data.url);
    } catch (error: any) {
      toast.error(error);
      if (axios.isAxiosError(error)) {
        toast.error(
          error.response?.data?.error?.message || "Unknown error occurred"
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
    } finally {
      setisLoading(false);
    }
  };

  const cancelSubscription = async () => {
    setisLoading(true);
    try {
      const res = await fetch("/api/cancel-subscription");
      const { subscription } = await res.json();
      console.log(subscription);

      let endDate;
      if (
        subscription.trial_end &&
        new Date(subscription.trial_end * 1000) > new Date()
      ) {
        // User is in a trial period
        endDate = new Date(subscription.trial_end * 1000);
      } else {
        // User is not in a trial period, use current_period_end
        endDate = new Date(subscription.current_period_end * 1000);
      }

      const today = new Date();
      const diffTime = Math.abs(endDate.getTime() - today.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffDays, 'diffDaysdiffDaysdiffDays')
      toast.success(`Your subscription will end in ${diffDays} day(s).`);
      setSubscriptionActive(subscription);

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

  if (isLoading || status === "loading") return <Loader />;

  return (
    <>
      {subscriptionData && session?.user?.stripeSubscriptionId && (
        <section className="w-full min-h-screen  bg-white flex justify-center items-center  shadow-lg rounded-lg p-8">
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
                {SubscriptionActive?.subscriptions?.cancel_at_period_end && (
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
                )}
                <div className="flex flex-col gap-2">
                  <AlertDialog>
                    {SubscriptionActive?.subscriptions
                      ?.cancel_at_period_end ? (
                      <AlertDialogTrigger className="border rounded-md py-2">
                        Cancel Subscription
                      </AlertDialogTrigger>
                    ) : (
                      <AlertDialogDescription>
                        Your subscription has been cancelled.
                      </AlertDialogDescription>
                    )}

                    <AlertDialogContent className="bg-white text-black">
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your subscription and remove your data from our
                          servers.
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
      <>
        {!session?.user?.stripeSubscriptionId && (
          <section
            className="w-full flex justify-center items-center py-12  md:py-20 lg:py-24"
            id="pricing"
          >
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center text-center">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm ">
                    Pricing
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    CopyIn2Clicks Tiers
                  </h2>
                  <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                    Here are the plans that the CopyIn2Clicks currently offers.
                  </p>
                </div>
                <div className="flex py-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-4xl mx-auto">
                    <Card className="flex flex-col h-auto justify-evenly rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800  dark:hover:shadow-lg">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-center">
                            Free
                          </h3>
                          <p className="text-center text-gray-500 dark:text-gray-400">
                            Free copy-paste features and tools.
                          </p>
                        </div>
                        <div className="mt-6 space-y-2">
                          <ul className="pl-6 space-y-1 text-left m-auto text-gray-700 ">
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Copy any text in two clicks
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Automatically save up to 5 recently copied items
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Star copied items that you do not want to be
                                automatically deleted
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Open copied text in new tab as well as ability
                                to delete copied item
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Limit of 500 words per copy
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Customize copy controls including toggle to
                                change copy key, store regular copied items, as
                                well as for copying images
                              </span>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-4 flex flex-col gap-2 items-center">
                          <Link
                            href="#premium"
                            className="w-full text-blue-500 border py-2 rounded-md font-semibold text-center"
                          >
                            Current
                          </Link>
                        </div>
                      </div>
                    </Card>
                    <Card className="flex flex-col h-auto justify-between rounded-lg border border-gray-200 bg-white p-4 sm:p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800  dark:hover:shadow-lg">
                      <div className="space-y-4">
                        <div>
                          <h3 className="text-2xl sm:text-3xl font-bold text-center">
                            Pro
                          </h3>
                          <p className="text-center text-gray-500 dark:text-gray-400">
                            Unlock advanced copy-paste features and tools.
                          </p>
                        </div>
                        <div className="text-center">
                          <div className="text-3xl sm:text-4xl font-bold">
                            $1.99
                          </div>
                          <div className="text-gray-500 dark:text-gray-400">
                            per month
                          </div>
                        </div>
                        <div className="mt-6 space-y-2">
                          <ul className="pl-6 space-y-1 text-left m-auto text-gray-700 ">
                            <li className="flex items-center">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Everything that free tier includes
                              </span>
                            </li>
                            <li className="flex items-center">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Store up to 15 recently copied items
                              </span>
                            </li>
                            <li className="flex items-center">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Ability to maintain formatting upon copying
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                No words restriction when it comes to copying
                              </span>
                            </li>
                            <li className="flex items-center">
                              <Image
                                src="/tickmark.svg"
                                width={25}
                                height={25}
                                alt="not-found"
                              />
                              <span className="ml-2">
                                Download copied items as any extension
                              </span>
                            </li>
                          </ul>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 items-center">
                        <Link
                          href="#premium"
                          className="w-full text-blue-500 border py-2 rounded-md font-semibold text-center"
                        >
                          Upgrade to Pro
                        </Link>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </>
      <WhyPremium stripeSubscriptionId={session?.user?.stripeSubscriptionId} />

      {!session?.user?.stripeSubscriptionId && (
        <section id="premium" className="py-5">
          <PremiumCheckout handleSubscription={handleSubscription} />
        </section>
      )}
    </>
  );
};

export default PricingSection;

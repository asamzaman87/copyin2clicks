"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Accordion,
  AccordionTrigger,
  AccordionContent,
  AccordionItem,
} from "@/components/ui/accordion";
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

import WhyPremium from "./WhyPremium";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import Loader from "../ui/loader";
import PremiumCheckout from "../premiumcheckout/PremiumCheckout";

interface subscriptionData {
  subscriptions: any;
  id: string;
  trial_end: number; // Unix timestamp
  status: string;
  current_period_end : number;
  default_payment_method?: {
    card?: {
      last4: string;
    };
  };
}

const PricingSection: React.FC = () => {
  const router = useRouter();
  const [success, setSuccess] = useState<boolean>(false);
  const [sessionId, setSessionId] = useState<string>("");
  const { data: session } = useSession();
  const [isLoading, setisLoading] = useState(false);
const [subscriptionData , setSubscriptionData] = useState<subscriptionData>();

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
      router.push("/");
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  };

  const fetchSubscriptionDetails = useCallback(async () => {
    setisLoading(true);
    try {
      if (session?.user?.stripeSubscriptionId) {
        const res = await fetch("/api/subscription-details");
        const subscriptions = await res.json();
        console.log(subscriptions, 'sddsgfgnh');
        setSubscriptionData(subscriptions)
      } else {
        return;
      }
    } catch (error) {
      console.log(error);
    } finally {
      setisLoading(false);
    }
  }, [session, setSubscriptionData]); 

  useEffect(() => {
    fetchSubscriptionDetails();
  }, [fetchSubscriptionDetails]);

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
      <section
        className="w-full flex justify-center items-center py-12  md:py-20 lg:py-24"
        id="pricing"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="space-y-2">
              <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
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
              {session?.user.stripeSubscriptionId ? (
                <>
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
                        <Input disabled id="plan" value={subscriptionData?.subscriptions.status} />
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
                          value={`Free trial ends on ${formatDate(subscriptionData?.subscriptions.current_period_end)}`}
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <AlertDialog>
                          <AlertDialogTrigger className="border rounded-md py-2">
                            Cancel Subscription
                          </AlertDialogTrigger>
                          <AlertDialogContent>
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
                              <AlertDialogAction>Continue</AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>

                        {/* <Button variant="outline" onClick={cancelSubscription}>
                          Cancel Subscription
                        </Button> */}
                      </div>
                    </CardContent>
                  </Card>
                </>
              ) : (
                <div className="grid grid-cols-2 gap-10 max-w-4xl">
                  <Card className="flex flex-col h-auto justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-center">Free</h3>
                        <p className="text-center text-gray-500 dark:text-gray-400">
                          Unlock advanced copy-paste features and tools.
                        </p>
                      </div>
                      <div className="space-y-1 text-center">
                        {/* <div className="text-4xl font-bold">$1.99</div>
                        <div className="text-gray-500 dark:text-gray-400">
                          per month
                        </div> */}
                        <div className="text-4xl font-bold text-green-600 dark:text-green-400">
                          7 days free trial
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <ul className="pl-6 space-y-1 text-left m-auto text-gray-700 dark:text-gray-300">
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Copy any text in two clicks
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Automatically save up to 5 recently copied items
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Star copied items that you do not want to be
                            automatically deleted
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Open copied text in new tab as well as ability to
                            delete copied item
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Limit of 500 words per copy
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Does not maintain formatting upon copying, example:
                            italics, bold, etc.{" "}
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Customize copy controls including toggle to change
                            copy key, store regular copied items, as well as for
                            copying images
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 items-center">
                        <Link
                          href="#premium"
                          className="w-full text-blue-500 border py-2 rounded-md font-semibold "
                        >
                          Upgrade
                        </Link>
                      </div>
                    </div>
                  </Card>
                  <Card className="flex flex-col h-auto justify-evenly rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl font-bold text-center">Pro</h3>
                        <p className="text-center text-gray-500 dark:text-gray-400">
                          Unlock advanced copy-paste features and tools.
                        </p>
                      </div>
                      <div className="space-y-1 text-center">
                        <div className="text-4xl font-bold">$1.99</div>
                        <div className="text-gray-500 dark:text-gray-400">
                          per month
                        </div>
                      </div>
                      <div className="mt-6 space-y-2">
                        <ul className="pl-6 space-y-1 text-left m-auto text-gray-700 dark:text-gray-300">
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Everything that free tier includes
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Store up to 15 recently copied items
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Ability to maintain formatting upon copying
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            No words restriction when it comes to copying
                          </li>
                          <li className="flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5 mr-2 text-green-600 dark:text-green-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.707 15.293a1 1 0 0 1-1.414 0l-3-3a1 1 0 1 1 1.414-1.414L8 12.586l6.293-6.293a1 1 0 1 1 1.414 1.414l-7 7z"
                                clipRule="evenodd"
                              />
                            </svg>
                            Download copied items as any extension
                          </li>
                        </ul>
                      </div>
                      <div className="mt-4 flex flex-col gap-2 items-center">
                        <Link
                          href="#premium"
                          className="w-full text-blue-500 border py-2 rounded-md font-semibold "
                        >
                          Upgrade to Pro
                        </Link>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      <WhyPremium />
      <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center">
            <div className="w-full max-w-4xl space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                Frequently Asked Questions
              </h2>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger className="font-semibold text-lg">
                    How do I start using ClickIn2Click?
                  </AccordionTrigger>
                  <AccordionContent>
                    To start using ClickIn2Click, simply download and install
                    the extension from the browser&apos;s web store. Once
                    installed, click on the extension and follow the listed
                    instructions to get started. If you are having issues, then
                    refer back to the demo in our download page.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger className="font-semibold text-lg">
                    What platforms does ClickIn2Click support?
                  </AccordionTrigger>
                  <AccordionContent>
                    ClickIn2Click supports popular web browsers such as Chrome,
                    Firefox, and Edge, across multiple operating systems
                    including Windows, macOS.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-3">
                  <AccordionTrigger className="font-semibold text-lg">
                    Is ClickIn2Click free to use?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, ClickIn2Click offers a free version with essential
                    clipboard management features. However, for advanced
                    features and customization options, users can opt for
                    ClickIn2Click Premium, available via subscription.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-4">
                  <AccordionTrigger className="font-semibold text-lg">
                    How do I upgrade to ClickIn2Click Premium?
                  </AccordionTrigger>
                  <AccordionContent>
                    You can upgrade to ClickIn2Click Premium by subscribing to
                    the premium plan within the extension&apos;s settings. Once
                    subscribed, you&apos;ll gain access to exclusive features
                    and benefits.
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-5">
                  <AccordionTrigger className="font-semibold text-lg">
                    Can I use ClickIn2Click on multiple devices?
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes, ClickIn2Click syncs your clipboard across multiple
                    devices, allowing you to seamlessly access your copied
                    content from anywhere.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </div>
        </div>
      </section>
      <section id="premium" className="py-5">
        <PremiumCheckout handleSubscription={handleSubscription} />
      </section>
    </>
  );
};

export default PricingSection;

import React from 'react'
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardTitle,
    CardDescription,
    CardHeader,
    CardContent,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";

const Account = () => {
  return (
    <>
      <section
          className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          id="account"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Account Management
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Manage Your Subscription
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  View your current plan, update your payment method, and
                  upgrade or downgrade your subscription.
                </p>
              </div>
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
                    <Input disabled id="plan" value="Pro" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="payment">Payment Method</Label>
                    <Input disabled id="payment" value="Visa ending in 1234" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="next-billing">Next Billing Date</Label>
                    <Input disabled id="next-billing" value="June 15, 2024" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <Button variant="outline">Update Payment Method</Button>
                    <Button variant="link">Upgrade to Enterprise</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
    </>
  )
}

export default Account
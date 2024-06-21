"use client";
import { useState } from "react";
import axios from "axios";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";
import Loader from "@/components/ui/loader";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setisLoading(true);
      const response = await axios.post("/api/reset-password", { email });
      toast.success(response?.data?.message);
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    } finally {
      setisLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 dark:bg-gray-950">
        <div className="mx-auto w-full max-w-md ">
          <Card className="">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold">
                Forgot Password
              </CardTitle>
              <CardDescription>
                Enter your email below to reset your password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  Reset Password
                </Button>
              </form>
              <div className="mt-4 text-center text-sm">
                Remember your password?
                <Link href="/login" className="underline" prefetch={false}>
                  Return to Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

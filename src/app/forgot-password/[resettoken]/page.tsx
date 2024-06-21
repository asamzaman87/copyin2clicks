"use client";
import { useState } from "react";
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
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";

type Params = {
  resettoken: string;
};

export default function ResetToken({ params }: { params: Params }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setisLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      setisLoading(true);
      const res = await fetch("/api/update-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: params.resettoken,
          password,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success(
          "Password has been reset. You can now log in with your new password."
        );
        setTimeout(() => {
          router.push("/login");
        }, 3000);
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
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
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Confirm Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="*********"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
                <Button type="submit" className="w-full" onClick={handleSubmit}>
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

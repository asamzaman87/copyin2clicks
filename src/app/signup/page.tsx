"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Loader from "@/components/ui/loader";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "react-toastify";

export default function Signup() {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status: sessionStatus } = useSession();

  const [name, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      router.replace("/login");
    }
  }, [sessionStatus, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 3) {
      setError("Password is invalid");
      return;
    }

    try {
      setIsLoading(true);

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This email is already registered");
        toast.error("This email is already registered");
      }
      if (res.status === 200) {
        toast.success("User Registered");
        setError("");
        router.push("/login");
      }
    } catch (error) {
      toast.error(error as string);
      setError("Error, try again");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6 space-y-10 xl:space-y-16">
          <div className="grid max-w-[1300px] mx-auto gap-4 px-4 sm:px-6 md:px-10 md:grid-cols-2 md:gap-16">
            <div>
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Copypaste - The Ultimate Clipboard Extension
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400 mt-4">
                Copypaste is a powerful browser extension that takes your
                clipboard to the next level. Never lose your copied content
                again!
              </p>
            </div>
            <div className="flex flex-col items-start space-y-4">
              <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                  <CardTitle className="text-2xl">Sign Up</CardTitle>
                  <CardDescription>
                    Enter your details to create an account
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="m@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center gap-2">
                  <Button className="" onClick={handleSubmit}>
                    Sign Up
                  </Button>
                  <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    By signing up, you agree to our{" "}
                    <Link href="#" className="underline" prefetch={false}>
                      Privacy Policy
                    </Link>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

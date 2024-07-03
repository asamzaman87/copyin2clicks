"use client";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { JSX, SVGProps, useEffect, useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "@/components/ui/loader";
import { toast } from "react-toastify";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { data: session, status: sessionStatus } = useSession();

  useEffect(() => {
    if (sessionStatus === "authenticated") {
      if (!session?.user?.isActive) {
        return router.push("/");
      }
      return router.push("/");
    }
  }, [sessionStatus, session, router]);

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setIsLoading(false);
      return;
    }

    if (!password) {
      setError("Password is invalid");
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        setError("Invalid email or password");
      } else {
        toast.success("User LoggedIn");
        router.replace("/");
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (sessionStatus === "loading") {
    return <Loader />;
  }
  return (
    <>
      {isLoading && <Loader />}
      <div className="flex min-h-screen items-center justify-center bg-gray-100 ">
        <div className="mx-auto w-full max-w-md space-y-6 rounded-lg bg-white p-6 shadow-lg ">
          <div className="space-y-2 text-center">
            <h1 className="text-3xl font-bold">Welcome Back</h1>
            <p className="text-gray-500 dark:text-gray-400">
              Log in to your account to continue
            </p>
          </div>
          <Button
            className="w-full justify-center gap-2 rounded-md border-gray-200 bg-white text-gray-900 shadow-sm transition-colors hover:bg-gray-100 dark:border-gray-800  dark:text-gray-50 dark:hover:bg-gray-800"
            variant="outline"
            onClick={() => signIn("google")}
          >
            <ChromeIcon className="h-5 w-5" />
            Login with Google
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-gray-300 dark:border-gray-700" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500  dark:text-gray-400">
                Or
              </span>
            </div>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="m@example.com"
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              {/* <Link href="/forgot-password" className="underline text-blue-500">
                Forgot Password
              </Link> */}
            </div>
            <Button className="w-full" type="submit" onClick={handleSubmit}>
              Login
            </Button>
          </div>
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?
            <Link className="font-medium underline" href="/signup">
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

function ChromeIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="21.17" x2="12" y1="8" y2="8" />
      <line x1="3.95" x2="8.54" y1="6.06" y2="14" />
      <line x1="10.88" x2="15.46" y1="21.94" y2="14" />
    </svg>
  );
}

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
import { Loader2 } from "lucide-react";

export default function Login() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isNewUser, setIsNewUser] = useState<boolean | null>(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
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

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    if (!email) {
      setError("Email is required");
      toast.error("Email is required");
      return;
    }
    if (!isValidEmail(email)) {
      setError("Email is invalid");
      toast.error("Email is invalid");
      return;
    }
    if (!password) {
      setError("Password is required");
      toast.error("Password is required");
      return;
    }

    try {
      setIsLoading(true);

      const checkUserRes = await fetch("/api/check-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (checkUserRes.status === 404) {
        toast.error("User not found");
        setError("User not found");
        return;
      }
      const isNew = await checkUserRes.json();
      setIsNewUser(isNew?.isNewUser);

      if (isNew?.isNewUser) {
        // Directly sign in if user is new
        const res = await signIn("credentials", {
          redirect: false,
          email,
          password,
        });

        if (res?.error) {
          toast.error("Invalid email or password");
          setError("Invalid email or password");
        } else {
          toast.success("User Logged In Successfully");
          router.replace("/");
        }
      } else {
        // Show AlertDialog for existing users
        setIsDialogOpen(true);
      }
    } catch (err) {
      toast.error("An unexpected error occurred");
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogSubmit = async () => {
    setIsDialogOpen(false);
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
        toast.success("User Logged In Successfully");
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
            className="w-full justify-center gap-2 rounded-md border-gray-200 bg-white text-gray-900 shadow-sm transition-colors  dark:border-gray-800  "
            variant="outline"
            onClick={(e) => {
              e.preventDefault();
              signIn("google");
            }}
          >
            <ChromeIcon className="" />
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
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Link href="/forgot-password" className="underline text-blue-500">
                Forgot Password
              </Link>
            </div>

            {!isNewUser && (
              <AlertDialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <AlertDialogTrigger className="w-full border rounded-md py-2">
                  Login
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white text-black">
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      You really want to sign in as your saved items will be
                      replaced with what is in the extension right now.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel onClick={() => setIsDialogOpen(false)}>
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction onClick={handleDialogSubmit}>
                      {isLoading && (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      )}
                      {`${isLoading ? "Please wait" : "Continue"}`}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
            {isNewUser && (
              <Button
                className="w-full rounded-md"
                variant="outline"
                onClick={handleSubmit}
              >
                Login
              </Button>
            )}
          </div>

          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Don&apos;t have an account?{" "}
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
    <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512">
      <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
    </svg>
  );
}

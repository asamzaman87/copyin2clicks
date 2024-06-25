"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { data: session, status } = useSession();

  console.log(session, "sessionsession");

  return (
    <>
      <header className="h-16 flex items-center justify-around gap-14  border-b border-gray-300">
        <Link className="flex items-center justify-center" href="/">
          <Image src="/icon.png" alt="Not-Found" width={50} height={50} />
          <div>ClickIn2Clicks</div>
        </Link>
        <nav className="flex items-center  gap-4 sm:gap-6">
          <Link
            className="text-lg font-light hover:underline underline-offset-4"
            href="/download"
          >
            Download
          </Link>
          <Link
            className="text-lg font-light hover:underline underline-offset-4"
            href="/about"
          >
            About
          </Link>
          <Link
            className="text-lg font-light hover:underline underline-offset-4"
            href="/premium"
          >
            Premium
          </Link>
          {status === "authenticated" ? (
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger className="outline-none">
                  <Avatar>
                    <AvatarImage
                      src={
                        session?.user?.image || "https://github.com/shadcn.png"
                      }
                    />
                    <AvatarFallback>
                      {session?.user?.name || "User"}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuLabel>{session.user?.name}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <Link href="/profile">
                    <DropdownMenuItem>Profile</DropdownMenuItem>
                  </Link>
                  <DropdownMenuItem>
                    <Link href="/premium">Subscription</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <Link
              className="text-lg font-light hover:underline underline-offset-4"
              href="/login"
            >
              Login
            </Link>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;

function ExpandIcon(
  props: JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>
) {
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
      <path d="m21 21-6-6m6 6v-4.8m0 4.8h-4.8" />
      <path d="M3 16.2V21m0 0h4.8M3 21l6-6" />
      <path d="M21 7.8V3m0 0h-4.8M21 3l-6 6" />
      <path d="M3 7.8V3m0 0h4.8M3 3l6 6" />
    </svg>
  );
}

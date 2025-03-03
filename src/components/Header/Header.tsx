"use client";
import React, { useState } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import
    {
        DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
    } from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const Header = () =>
{
    const pathname = usePathname();

    const { data: session, status } = useSession();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () =>
    {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <header className="h-16 flex items-center justify-between px-4 sm:px-8 lg:px-14 border-b border-gray-300">
                <Link className="flex items-center justify-center" href="/">
                    <Image src="/icon.png" alt="Not-Found" width={50} height={50} />
                    <div className="ml-2 text-lg sm:text-xl lg:text-2xl font-bold">
                        CopyIn2Clicks
                    </div>
                </Link>
                <nav className="flex items-center gap-4 sm:gap-6">
                    <div className="hidden md:flex justify-center items-center gap-4">
                        {[
                            { href: "/download", label: "Download" },
                            { href: "/about", label: "About" },
                            { href: "/faq", label: "FAQ" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                className={`text-lg font-light hover:underline underline-offset-4 ${pathname === link.href
                                        ? "font-bold underline text-blue-400"
                                        : ""
                                    }`}
                                href={link.href}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {status == "authenticated" ? (
                            <>
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="outline-none">
                                        <Avatar>
                                            <AvatarImage
                                                src={
                                                    session?.user?.image ??
                                                    "https://github.com/shadcn.png"
                                                }
                                            />
                                            {/* <AvatarFallback>
                        {session?.user?.name ?? "User"}
                      </AvatarFallback> */}
                                        </Avatar>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuLabel className="block">
                                            <div>{session?.user?.name}</div>
                                            <small className="text-gray-500 font-normal">
                                                {session?.user?.email}
                                            </small>
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>
                                            <Link href="/premium">Subscription</Link>
                                        </DropdownMenuItem>
                                        <DropdownMenuItem
                                            onClick={(e) =>
                                            {
                                                e.preventDefault();
                                                signOut();
                                            }}
                                        >
                                            Logout
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </>
                        ) : (
                            <Link
                                className={`text-lg font-light hover:underline underline-offset-4 ${pathname === "/login" ? "font-bold underline" : ""
                                    }`}
                                href="/login"
                            >
                                Login
                            </Link>
                        )}
                    </div>
                    <button className="md:hidden flex items-center" onClick={toggleMenu}>
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7"
                            ></path>
                        </svg>
                    </button>
                </nav>
                {isMenuOpen && (
                    <div className="md:hidden absolute top-16 left-0 w-full bg-white border-t border-gray-300 z-10">
                        {[
                            { href: "/download", label: "Download" },
                            { href: "/about", label: "About" },
                            { href: "/premium", label: "Premium" },
                            { href: "/faq", label: "FAQ" },
                        ].map((link) => (
                            <Link
                                key={link.href}
                                className={`block px-4 py-2 text-lg font-light hover:bg-gray-200 ${pathname === link.href ? "font-bold underline" : ""
                                    }`}
                                href={link.href}
                                onClick={toggleMenu}
                            >
                                {link.label}
                            </Link>
                        ))}
                        {status === "authenticated" ? (
                            <button
                                className="block w-full text-left px-4 py-2 text-lg font-light hover:bg-gray-200"
                                onClick={(e) =>
                                {
                                    e.preventDefault();
                                    signOut();
                                }}
                            >
                                Logout
                            </button>
                        ) : (
                            <Link
                                className={`block px-4 py-2 text-lg font-light hover:bg-gray-200 ${pathname === "/login" ? "font-bold underline" : ""
                                    }`}
                                href="/login"
                                onClick={toggleMenu}
                            >
                                Login
                            </Link>
                        )}
                    </div>
                )}
            </header>
        </>
    );
};

export default Header;

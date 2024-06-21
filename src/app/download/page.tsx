import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tabs from "@/components/ui/tab";

export default function download() {
  return (
    <>
      <section
        className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-12"
        id="hero"
      >
        <div className="container px-8 md:px-16">
          <div className="flex flex-row justify-center items-center">
            <div className="space-y-2">
              <Image
                className="m-auto mb-10"
                src="/download.png"
                alt="not-found"
                width={50}
                height={50}
              />
              <h1 className="text-3xl text-center font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                ClickIn2Click
                <br />
                Your Ultimate Clipboard Manager
              </h1>
              <p className="text-gray-600 text-center font-extralight">
                Effortlessly manage your copied content across devices and
                platforms.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-20 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr 600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Boost Your Productivity with Our Extension
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  ClickIn2Click revolutionizes how you manage your clipboard.
                  With seamless integration across browsers and devices, you can
                  effortlessly organize, access, and sync your copied content,
                  boosting your productivity like never before.
                </p>
                <Tabs />
              </div>
            </div>
            <Image
              className="h-full"
              src="/extension-screenshot.png"
              alt="Hero"
              height={500}
              width={500}
            />
          </div>
        </div>
      </section>
    </>
  );
}

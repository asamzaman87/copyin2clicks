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
                ClickIn2Clicks
                <br />
                Click, Click, and You’re Done
              </h1>
              <p className="text-gray-600 text-center font-extralight">
                Effortlessly copy and manage your copied content across devices
                and platforms.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-20 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr 600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Copy as Copy Always Should Have Been
                </h1>
                <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Imagine a world where copying large text is effortless,
                  efficient, and precise. No more tedious highlighting, no more
                  worrying about losing your copied text. This is the vision
                  behind CopyIn2Clicks, a groundbreaking browser extension
                  designed to transform the way you copy and store copied text
                  online.
                </p>
                <Tabs />
              </div>
            </div>
            <video  src="/demo.mov" controls autoPlay/>
            {/* <Image
              className="h-full"
              src="/extension-screenshot.png"
              alt="Hero"
              height={500}
              width={500}
            /> */}
          </div>
        </div>
      </section>
    </>
  );
}

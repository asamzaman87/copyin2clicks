import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tabs from "@/components/ui/tab";

export default function Download() {
  return (
    <>
      <section
        className="w-full flex justify-center items-center py-4"
        id="hero"
      >
        <div className="container px-4 sm:px-8 md:px-16">
          <div className="flex flex-row justify-center items-center">
            <div className="space-y-4 text-center">
              <Image
                className="m-auto mb-6"
                src="/download.png"
                alt="not-found"
                width={80}
                height={80}
              />
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter">
                ClickIn2Clicks
                <br />
                Click, Click, and You’re Done
              </h1>
              <p className="text-gray-600 font-extralight text-base sm:text-lg md:text-xl">
                Effortlessly copy and manage your copied content across devices
                and platforms.
              </p>
            </div>
          </div>
          <div className="grid gap-6 mt-10 lg:mt-20 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr 600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-4">
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter">
                  Copy as Copy Always Should Have Been
                </h1>
                <p className="max-w-[600px] text-gray-500 text-sm sm:text-base md:text-lg lg:text-xl dark:text-gray-400">
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
            <div className="flex justify-center items-center">
              <video className="w-full max-w-[500px] xl:max-w-[600px]" src="/demo.mov" controls autoPlay />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

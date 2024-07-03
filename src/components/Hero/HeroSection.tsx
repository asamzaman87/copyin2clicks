import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-12" id="hero">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Supercharge Your Copy-Paste Experience
              </h1>
              <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Elevate your productivity with CopyIn2Clicks. Effortlessly copy and manage text from any website with advanced features and seamless syncing.
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md bg-green-500 px-8 text-base font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50  dark:focus-visible:ring-gray-300"
                href="#features"
              >
                Learn More
              </Link>
              <Link
                className="inline-flex h-12 items-center justify-center rounded-md border border-gray-300 px-8 text-base font-medium text-gray-900 shadow-sm transition-colors hover:bg-gray-100 focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-600  dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300"
                href="/about"
              >
                How It Works
              </Link>
            </div>
          </div>
          <Image
            className="h-full w-full rounded-xl"
            src="/heroSection.png"
            alt="extension"
            height={500}
            width={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

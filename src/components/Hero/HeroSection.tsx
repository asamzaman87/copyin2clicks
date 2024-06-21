import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const HeroSection = () => {
  return (
    <>
       <section className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-12" id="hero">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  Supercharge Your Copy-Paste Experience
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                  Elevate your productivity with our cutting-edge copy-paste extension. Effortlessly manage your clipboard, sync across devices, and more.

                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-md bg-green-500 px-8 text-base font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50  dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                    href="#"
                  >
                    Download for Firefox
                  </Link>
                  <Link
                    className="inline-flex h-12 items-center justify-center rounded-md border bg-green-500 border-gray-20 text-gray-50 px-8 text-base font-medium shadow-sm transition-colors hover:bg-green-800  focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none disabled:opacity-50    dark:hover:text-gray-50 "
                    href="#"
                  >
                    Download for Chrome
                  </Link>
                </div>
              </div>
              <Image
                className="h-full w-full rounded-xl"
                src="/feature.jpg"
                alt="extension"
                height={500}
                width={500}
              />
            </div>
          </div>
        </section>
    </>
  )
}

export default HeroSection
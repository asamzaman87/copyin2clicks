import Image from 'next/image'
import React from 'react'

const FeatureSection = () => {
  return (
    <>
       <section
          className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 bg-gray-100 dark:bg-gray-800"
          id="features"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm dark:bg-gray-800">
                  Key Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  Streamline Your Workflow
                </h2>
                <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                  Our extension offers a suite of powerful tools to help you
                  work smarter, not harder.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <ul className="grid gap-6">
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">Productivity Boost</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Streamline your workflow with our suite of productivity
                        tools, helping you accomplish more in less time.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Seamless Integration
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Our extension seamlessly integrates with your browser,
                        providing a seamless user experience.
                      </p>
                    </div>
                  </li>
                  <li>
                    <div className="grid gap-1">
                      <h3 className="text-xl font-bold">
                        Customizable Settings
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Tailor the extension to your specific needs with our
                        customizable settings and preferences.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <Image
                alt="Features"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full"
                height={310}
                src="/hero.png"
                width={550}
              />
            </div>
          </div>
        </section>
    </>
  )
}

export default FeatureSection
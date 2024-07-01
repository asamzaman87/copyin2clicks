import Image from "next/image";
import React from "react";

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
                Empower Your Clipboard Experience
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
              CopyIn2Clicks offers a suite of powerful tools to help you
                manage your clipboard effortlessly and efficiently.
              </p>
            </div>
          </div>
          <div className="mx-auto grid max-w-5xl items-start gap-6 py-12 lg:grid-cols-2 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <ul className="grid gap-6">
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Fast copying</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Copy any text with a mere two clicks
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Smart storage</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Automatically save what you copy and choose what you want
                      saved across multiple copies
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Clipboard Management</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Efficiently organize and access your copied content with
                      our advanced clipboard management features.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">Cross-Platform Sync</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Seamlessly sync your clipboard across devices, ensuring
                      your content is always accessible when you need it.
                    </p>
                  </div>
                </li>
                <li>
                  <div className="grid gap-1">
                    <h3 className="text-xl font-bold">
                      Customizable Preferences
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Tailor CopyIn2Clicks to suit your workflow with
                      customizable settings and preferences.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <Image
              alt="CopyIn2Clicks Features"
              className="rounded-xl object-cover object-center"
              width={550}
              height={500}
              src="/feature.jpg"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default FeatureSection;

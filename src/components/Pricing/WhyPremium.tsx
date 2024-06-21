import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
const WhyPremium = () => {
  return (
    <>
      <section
        className="w-full flex justify-center items-center bg-gray-100 py-12 md:py-24 lg:py-32"
        id="pricing"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center text-center">
            <div className="w-full max-w-4xl">
              <Card className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-lg dark:border-gray-800 dark:bg-gray-950 dark:hover:shadow-lg pt-14 px-14 pb-28">
                <div className="mt-7">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Why Upgrade to Premium?
                  </h2>
                  <div className="mt-7 mx-0 mb-20 border"></div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image
                    src="/clipboard.png"
                    alt="clipboard"
                    width={100}
                    height={100}
                  />
                  <div>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">
                        Unlimited Clipboard History
                      </h3>
                    </div>
                    <p className="text-left mt-2">
                      Access and manage your clipboard history without
                      limitations. Never lose track of copied content again.
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image src="/sync.png" alt="sync" width={100} height={100} />
                  <div>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">
                        Sync Across Devices
                      </h3>
                    </div>
                    <p className="text-left mt-2">
                      Seamlessly sync your clipboard content across all your
                      devices. Access your copied items anywhere, anytime.
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image
                    src="/security.png"
                    alt="security"
                    width={100}
                    height={100}
                  />
                  <div>
                    <div className="flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">Enhanced Security</h3>
                    </div>
                    <p className="text-left mt-2">
                      Ensure the security of your copied data with Premium
                      access. Protect sensitive information from unauthorized
                      access.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WhyPremium;

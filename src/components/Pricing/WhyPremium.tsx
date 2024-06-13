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
                <div className="mt-7 ">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                    Why go Premium?
                  </h2>
                  <div className="mt-7 mx-0 mb-20 border"></div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image
                    // className="w-full h-auto"
                    src="/cookies.png"
                    alt="not-found"
                    width={200}
                    height={200}
                  />
                  <div>
                    <div className=" flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">
                        Block cookie consent pop-ups
                      </h3>
                    </div>
                    <p className="text-left mt-2">
                      Across the internet, websites are showing notifications
                      that inform you about cookie usage on their sites. You can
                      hide these annoying pop-ups with Premium access.
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image
                    // className="w-full h-auto"
                    src="/cookies.png"
                    alt="not-found"
                    width={200}
                    height={200}
                  />
                  <div>
                    <div className=" flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">
                        Block cookie consent pop-ups
                      </h3>
                    </div>
                    <p className="text-left mt-2">
                      Across the internet, websites are showing notifications
                      that inform you about cookie usage on their sites. You can
                      hide these annoying pop-ups with Premium access.
                    </p>
                  </div>
                </div>
                <div className="flex gap-10 mb-16">
                  <Image
                    // className="w-full h-auto"
                    src="/cookies.png"
                    alt="not-found"
                    width={200}
                    height={200}
                  />
                  <div>
                    <div className=" flex flex-row justify-start items-center gap-2">
                      <span className="rounded uppercase px-1 py-0.5 text-sm font-bold bg-blue-400 text-white whitespace-nowrap">
                        NEW!
                      </span>
                      <h3 className="text-3xl font-bold">
                        Block cookie consent pop-ups
                      </h3>
                    </div>
                    <p className="text-left mt-2">
                      Across the internet, websites are showing notifications
                      that inform you about cookie usage on their sites. You can
                      hide these annoying pop-ups with Premium access.
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

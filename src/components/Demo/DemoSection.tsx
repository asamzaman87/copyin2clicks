import React from "react";

const DemoSection = () => {
  return (
    <>
      <section
        className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32"
        id="demo"
      >
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                See CopyIn2Clicks in Action
              </h2>
              <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed dark:text-gray-400">
                Watch our demo video to see how CopyIn2Clicks can streamline
                your workflow and boost your productivity.
              </p>
            </div>
            <div className="w-full max-w-[800px] aspect-video overflow-hidden rounded-xl">
              <iframe
                width="100%"
                height="100%"
                src="https://www.youtube.com/embed/OLWV2ZPBpo8?si=r-faD97nEiqgSqjR"
                title="CopyIn2Clicks Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
              <span className="rounded-md bg-gray-100 " />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default DemoSection;

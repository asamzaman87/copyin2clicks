"use client";
import Link from "next/link";
import { useState } from "react";

interface Tab {
  id: string;
  label: string;
  href: string;
  rating: number; // Changed to number type
  reviewSource: string;
}

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("chrome");

  const tabs: Tab[] = [
    {
      id: "chrome",
      label: "Chrome",
      href: "https://chrome.google.com/webstore/detail/cfhdojbkjhnklbpkdaibdccddilifddb",
      rating: 5, // Changed to number type
      reviewSource: "Chrome Web Store",
    },
    {
      id: "firefox",
      label: "Firefox",
      href: "https://addons.mozilla.org/en-US/firefox/addon/copyin2clicks/",
      rating: 5, // Changed to number type
      reviewSource: "Mozilla Add-ons",
    },
  ];

  return (
    <div className="tabs">
      <ul role="tablist" className="flex">
        {tabs.map((tab) => (
          <li key={tab.id} className={`mr-1 ${activeTab === tab.id ? "" : ""}`}>
            <button
              role="tab"
              aria-controls={`${tab.id}-panel`}
              className={` px-4 block ${
                activeTab === tab.id
                  ? " bg-black px-3 py-1 text-white text-sm border border-gray-300 rounded-full mr-1"
                  : "px-3 py-1 text-black text-sm bg-white border border-gray-300 rounded-full mr-1"
              }`}
              id={`${tab.id}_tab`}
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          </li>
        ))}
      </ul>

      {tabs.map((tab) => (
        <div
          key={tab.id}
          role="tabpanel"
          aria-labelledby={`${tab.id}_tab`}
          id={`${tab.id}_panel`}
          className={`pt-4 ${activeTab === tab.id ? "block" : "hidden"}`}
        >
          <div className="flex justify-between">
            <Link
              id={`abp_${tab.id}`}
              data-install-suffix="index"
              className="inline-flex h-10 items-center justify-center rounded-md bg-green-500 px-8 py-7 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-green-800 focus-visible:outline-none focus-visible:ring-1  disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-gray-300"
              href={tab.href}
            >
              Get CopyIn2Clicks for {tab.label}
            </Link>
            {tab.rating && (
              <div className="rating flex flex-col items-center">
                <div style={{ width: 200 }}>
                  <svg
                    className="stars"
                    version="1.1"
                    viewBox="0 0 70.701 14.775"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      x=".28814"
                      y=".50425"
                      width="70.125"
                      height="13.766"
                      fill="#C4C4C4"
                    ></rect>
                    <rect
                      x="6%"
                      y=".50425"
                      width={`${(tab.rating / 5) * 100}%`}
                      height="13.766"
                      strokeWidth=".97372"
                      fill="#EDA51E"
                      className="rating-bar"
                    ></rect>
                    <path
                      d="m0 3.359e-7v14.775h70.701v-14.775zm8.7984 2.713 1.4955 3.0308 3.344 0.48576-2.4205 2.359 0.56999 3.3316-2.989-1.5725-2.9921 1.573 0.57-3.3316-2.419-2.359 3.344-0.48627zm13.418 0.14159 1.4955 3.0308 3.344 0.48628-2.4205 2.359 0.56999 3.3311-2.989-1.5725-2.9916 1.573 0.57-3.3316-2.419-2.359 3.344-0.48628zm13.229 0 1.4955 3.0308 3.344 0.48628-2.4205 2.359 0.57 3.3311-2.989-1.5725-2.9916 1.573 0.56999-3.3316-2.419-2.359 3.344-0.48628zm13.229 0 1.4955 3.0308 3.344 0.48628-2.4205 2.359 0.57 3.3311-2.989-1.5725-2.9916 1.573 0.56999-3.3316-2.419-2.359 3.344-0.48628zm13.229 0 1.4955 3.0308 3.344 0.48628-2.4205 2.359 0.56999 3.3311-2.989-1.5725-2.9916 1.573 0.57-3.3316-2.419-2.359 3.344-0.48628z"
                      fill="#fff"
                    ></path>
                  </svg>
                </div>
                <p className="ml-2">
                  <span className="font-extralight text-sm">{tab.rating}</span>{" "}
                  <span className="font-extralight text-sm">stars on </span>
                  <strong className="font-extralight text-sm">
                    {tab.reviewSource}
                  </strong>
                </p>
              </div>
            )}
          </div>
          <p className="text-sm font-extralight mt-2">
            By clicking the link above, you agree to our{" "}
            <Link href="/en/terms" className="text-blue-500">
              Terms of Use
            </Link>
            .
          </p>
        </div>
      ))}
    </div>
  );
};


export default Tabs;

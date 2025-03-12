"use client";
import Link from "next/link";
import { useState } from "react";

interface Tab
{
    id: string;
    label: string;
    href: string;
    reviewSource: string;
}

const Tabs = () =>
{
    const [activeTab, setActiveTab] = useState("chrome");

    const tabs: Tab[] = [
        {
            id: "chrome",
            label: "Chrome",
            href: "https://chromewebstore.google.com/detail/copyin2clicks-click-click/pacfgbakjmgjngangdcnnfgpbpfichpm?authuser=0&hl=en",
            reviewSource: "Chrome Web Store",
        },
        {
            id: "firefox",
            label: "Firefox",
            href: "https://addons.mozilla.org/en-US/firefox/addon/copyin2clicks/",
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
                            className={` px-4 block ${activeTab === tab.id
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

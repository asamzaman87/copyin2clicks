"use client";
import { useEffect, useRef, useState } from "react";
import { Link, Element } from "react-scroll";
import GmailLink from "next/link";
import Image from "next/image";

const sections = [
    {
        id: "what-is-CopyIn2Clicks",
        label: "What is CopyIn2Clicks?",
        content:
            "CopyIn2Clicks is a powerful browser extension designed to enhance your clipboard experience. With CopyIn2Clicks, you can seamlessly copy and paste within the same browser and device, saving you time and effort.",
    },
    {
        id: "features",
        label: "Key Features",
        content: (
            <>
                <ul className="list-disc ml-6">
                    <li>
                        <strong>Fast copying : </strong> Copy any text with a mere two
                        clicks.
                    </li>
                    <li>
                        <strong>Smart storage : </strong> Automatically save what you copy
                        and choose what you want saved within the same device and browser.
                    </li>
                    {/* <li>
            <strong>Cross-platform compatibility : </strong> Use CopyIn2Clicks
            on various browsers and operating systems.
          </li> */}
                    {/* <li>
            <strong>Clipboard synchronization : </strong> Sync your clipboard
            content across multiple devices.
          </li> */}
                    <li>
                        <strong>Customizable settings : </strong> Tailor CopyIn2Clicks to
                        suit your preferences with customizable options.
                    </li>
                </ul>
            </>
        ),
    },
    {
        id: "all-features",
        label: "All Features",
        content: (
            <>
                <ul className="list-disc ml-6 mb-4">
                    <li>Copy any text in two clicks</li>
                    <li>Store up to 15 recently copied items</li>
                    <li>
                        Star copied items that you do not want to be automatically deleted
                    </li>
                    <li>
                        Open copied text in new tab as well as ability to delete copied item
                    </li>
                    <li>
                        Customize copy controls including toggle to change copy key, store
                        regular copied items, as well as for copying images
                    </li>
                    <li>Ability to maintain formatting upon copying</li>
                    <li>No words restriction when it comes to copying</li>
                    <li>Download copied items as any extension</li>
                </ul>
            </>
        ),
    },
    {
        id: "how-to-use",
        label: "How to Use",
        content:
            "Using CopyIn2Clicks is simple! After installing the extension, you can access its features directly from your browser's toolbar. Click on the CopyIn2Clicks icon to open the clipboard manager and start copying and pasting with ease.",
        demoVideo: "https://www.youtube.com/embed/OLWV2ZPBpo8?si=r-faD97nEiqgSqjR",
    },
    {
        id: "support",
        label: "Support",
        content:
            "Need help with CopyIn2Clicks? Our support team is here to assist you! Visit our Help Center for FAQs, troubleshooting guides, and contact information. We're dedicated to ensuring you have the best experience with our extension.",
        supportEmail: "democraticdeveloper@gmail.com",
    },
];

const ScrollSpy = () =>
{
    const [activeSection, setActiveSection] = useState(sections[0].id);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() =>
    {
        const handleScroll = () =>
        {
            const contentElements = contentRef.current?.children;
            if (!contentElements) return;

            let activeId = sections[0].id;

            Array.from(contentElements).forEach((element) =>
            {
                const boundingRect = element.getBoundingClientRect();
                if (boundingRect.top <= window.innerHeight / 2)
                {
                    activeId = element.id;
                }
            });

            setActiveSection(activeId);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            <h1 className="text-left text-3xl md:text-5xl font-extrabold px-4 md:px-8 lg:px-16 py-8 md:py-12 lg:py-16 xl:py-20">
                About CopyIn2Clicks
            </h1>
            <section className="w-full flex justify-center items-start" id="hero">
                <div className="container px-4 md:px-8 lg:px-16 flex flex-col lg:flex-row">
                    <div
                        className="lg:w-1/4 p-4 lg:sticky lg:top-0 lg:h-full overflow-auto"
                        id="index-container"
                    >
                        <ul className="space-y-4 border p-5 rounded-lg">
                            <p className="font-semibold text-gray-500">INDEX</p>
                            {sections.map((section) => (
                                <li key={section.id}>
                                    <Link
                                        to={section.id}
                                        spy={true}
                                        smooth={true}
                                        duration={500}
                                        className={`cursor-pointer px-3 py-1 text-sm border rounded-full mr-1 ${activeSection === section.id
                                            ? "bg-blue-500 text-white active-link"
                                            : "bg-white text-black border-gray-300"
                                            }`}
                                    >
                                        {section.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div
                        className="lg:w-3/4 p-4 lg:p-8 h-full overflow-auto"
                        ref={contentRef}
                    >
                        {sections.map((section) => (
                            <Element
                                name={section.id}
                                key={section.id}
                                id={section.id}
                                className="mb-10"
                            >
                                <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-2">
                                    {section.label}
                                </h1>
                                <div className="font-extralight">{section.content}</div>
                                {section.id === "how-to-use" && (
                                    <div className="">
                                        <p>
                                            <GmailLink
                                                className="text-blue-500"
                                                target="_blank"
                                                href={`${section.demoVideo}`}
                                            >
                                                Click here to watch a video of the extension in action.
                                            </GmailLink>
                                        </p>
                                        <Image
                                            className="mt-4"
                                            src="/extension-screenshot.png"
                                            alt="Demo Image"
                                            width={500}
                                            height={500}
                                        />
                                    </div>
                                )}
                                {section.id === "support" && (
                                    <p className="mt-4">
                                        Contact us at{" "}
                                        <GmailLink
                                            href={`mailto:${section.supportEmail}`}
                                            className="text-blue-500"
                                        >
                                            {section.supportEmail}
                                        </GmailLink>
                                    </p>
                                )}
                            </Element>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default ScrollSpy;

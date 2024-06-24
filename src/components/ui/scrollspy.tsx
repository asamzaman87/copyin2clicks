"use client";
import { useEffect, useRef, useState } from "react";
import { Link, Element } from "react-scroll";
import GmailLink from "next/link";
import Image from "next/image";
const sections = [
  {
    id: "what-is-clickin2clicks",
    label: "What is clickin2clicks?",
    content:
      "CopyIn2Clicks is a powerful browser extension designed to enhance your clipboard experience. With CopyIn2Clicks, you can seamlessly copy and paste across different platforms and devices, saving you time and effort.",
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
            and choose what you want saved across multiple copies.
          </li>
          <li>
            <strong>Cross-platform compatibility : </strong> Use clickin2clicks
            on various browsers and operating systems.
          </li>
          <li>
            <strong>Clipboard synchronization : </strong> Sync your clipboard
            content across multiple devices.
          </li>
          <li>
            <strong>Customizable settings : </strong> Tailor clickin2clicks to
            suit your preferences with customizable options.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "pricing",
    label: "Pricing Plans",
    content: (
      <>
        <h2 className="text-2xl font-semibold mb-2">Free Tier</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Copy any text in two clicks</li>
          <li>Automatically save up to 5 recently copied items</li>
          <li>
            Star copied items that you do not want to be automatically deleted
          </li>
          <li>
            Open copied text in new tab as well as ability to delete copied item
          </li>
          <li>Limit of 500 words per copy</li>
          <li>
            Does not maintain formatting upon copying, example: italics, bold,
            etc.
          </li>
          <li>
            Customize copy controls including toggle to change copy key, store
            regular copied items, as well as for copying images
          </li>
        </ul>
        <h2 className="text-2xl font-semibold mb-2">Paid Tier</h2>
        <ul className="list-disc ml-6">
          <li>Everything that free tier includes</li>
          <li>Store up to 15 recently copied items</li>
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
      "Using clickin2clicks is simple! After installing the extension, you can access its features directly from your browser's toolbar. Click on the clickin2clicks icon to open the clipboard manager and start copying and pasting with ease.",
    demoVideo: "https://www.youtube.com/embed/OLWV2ZPBpo8?si=r-faD97nEiqgSqjR",
    // imageUrl: "/extension-screenshot.png",
  },
  {
    id: "support",
    label: "Support",
    content:
      "Need help with clickin2clicks? Our support team is here to assist you! Visit our Help Center for FAQs, troubleshooting guides, and contact information. We're dedicated to ensuring you have the best experience with our extension.",
    supportEmail: "democraticdeveloper@gmail.com",
  },
];

const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState(sections[0].id);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const contentElements = contentRef.current?.children;
      if (!contentElements) return;

      let activeId = sections[0].id;

      Array.from(contentElements).forEach((element) => {
        const boundingRect = element.getBoundingClientRect();
        if (boundingRect.top <= window.innerHeight / 2) {
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
      <h1 className="text-left text-5xl font-extrabold px-32 py-12 md:py-24 lg:py-32 xl:py-12">
        About ClickIn2Clicks
      </h1>
      <section className="w-full flex justify-center items-center " id="hero">
        <div className="container px-4 md:px-6 flex">
          <div
            className="w-1/4 p-4 sticky top-0 h-full overflow-auto"
            id="index-container"
          >
            <ul className="space-y-4 border p-5">
              <p className="font-semibold text-gray-500">INDEX</p>

              {sections.map((section) => (
                <li key={section.id}>
                  <Link
                    to={section.id}
                    spy={true}
                    smooth={true}
                    duration={500}
                    className={`cursor-pointer px-3 py-1 text-sm border rounded-full mr-1 ${
                      activeSection === section.id
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
          <div className="w-3/4 p-4 h-full overflow-auto" ref={contentRef}>
            {sections.map((section) => (
              <Element
                name={section.id}
                key={section.id}
                id={section.id}
                className="mb-10"
              >
                <h1 className="text-4xl font-bold mb-2">{section.label}</h1>
                <p className="font-extralight">{section.content}</p>
                {section.id === "how-to-use" && (
                  <div className="flex justify-between items-center gap-5">
                    <iframe
                      width="100%"
                      height="280px"
                      src={section?.demoVideo}
                      title="ClickIn2Click Demo"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      referrerPolicy="strict-origin-when-cross-origin"
                      allowFullScreen
                    ></iframe>
                    {/* <p>Demo Video: <video src={section.demoVideo}></video></p> */}
                    <Image
                      src='/extension-screenshot.png'
                      alt="Demo Image"
                      width={500}
                      height={500}
                    />
                  </div>
                )}
                {section.id === "support" && (
                  <p>
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

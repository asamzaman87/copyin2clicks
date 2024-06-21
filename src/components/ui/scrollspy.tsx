'use client'
import { useEffect, useRef, useState } from "react";
import { Link, Element } from "react-scroll";

const sections = [
  {
    id: "what-is-clickin2click",
    label: "What is ClickIn2Click?",
    content:
      "ClickIn2Click is a powerful browser extension designed to enhance your clipboard experience. With ClickIn2Click, you can seamlessly copy and paste across different platforms and devices, saving you time and effort.",
  },
  {
    id: "features",
    label: "Key Features",
    content:
      "1. Cross-platform compatibility: Use ClickIn2Click on various browsers and operating systems. 2. Clipboard synchronization: Sync your clipboard content across multiple devices. 3. Customizable settings: Tailor ClickIn2Click to suit your preferences with customizable options.",
  },
  {
    id: "pricing",
    label: "Pricing Plans",
    content:
      "ClickIn2Click offers both free and premium plans. The free plan includes essential clipboard management features, while the premium plan unlocks advanced functionalities and customization options.",
  },
  {
    id: "how-to-use",
    label: "How to Use",
    content:
      "Using ClickIn2Click is simple! After installing the extension, you can access its features directly from your browser's toolbar. Click on the ClickIn2Click icon to open the clipboard manager and start copying and pasting with ease.",
  },
  {
    id: "support",
    label: "Support",
    content:
      "Need help with ClickIn2Click? Our support team is here to assist you! Visit our Help Center for FAQs, troubleshooting guides, and contact information. We're dedicated to ensuring you have the best experience with our extension.",
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
    <section
      className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-12"
      id="hero"
    >
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
            </Element>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ScrollSpy;

"use client";

import { useEffect, useRef, useState } from "react";
import { Link, Element } from "react-scroll";

interface Section {
  id: string;
  label: string;
  content: string;
}

const sections: Section[] = [
  {
    id: "1",
    label: "What is Adblock Plus",
    content:
      "Adblock Plus is a free extension that allows you to customize your web experience. You can block annoying ads, disable tracking and lots more. It’s available for all major desktop browsers and for your mobile devices.Adblock Plus is an open source project licensed under GPLv3 and subject to its Terms of Use.",
  },
  // Add other sections here
];

const ScrollSpy = () => {
  const [activeSection, setActiveSection] = useState<string>(sections[0].id);
  const contentRef = useRef<HTMLDivElement>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px", // Adjust the margin to trigger when the section header enters the viewport by 50%
      threshold: 0,
    };

    if (contentRef.current) {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      }, observerOptions);

      const contentElements = contentRef.current.children;
      Array.from(contentElements).forEach((element) => {
        if (observerRef.current) {
          observerRef.current.observe(element as HTMLElement);
        }
      });

      return () => {
        Array.from(contentElements).forEach((element) => {
          if (observerRef.current) {
            observerRef.current.unobserve(element as HTMLElement);
          }
        });
      };
    }
  }, []);

  return (
    <section
      className="w-full flex justify-center items-center py-12 md:py-24 lg:py-32 xl:py-12"
      id="hero"
    >
      <div className="container px-4 md:px-6">
        <div className="flex flex-col justify-center">
          <div className="flex h-screen">
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
            <div className="w-3/4 p-4 overflow-scroll h-full" ref={contentRef}>
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
        </div>
      </div>
    </section>
  );
};

export default ScrollSpy;

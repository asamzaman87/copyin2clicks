import DemoSection from "@/components/Demo/DemoSection";
import HeroSection from "@/components/Hero/HeroSection";
import { Suspense } from "react";
import Loading from "./loading";

export default function Home() {
  return (
    <>
      <div className="flex flex-col min-h-[100dvh]">
        <main className="flex-1 border-b">
          <Suspense fallback={<Loading/>}>
            <HeroSection />
          </Suspense>
          <Suspense fallback={<p>Loading Demo...</p>}>
            <DemoSection />
          </Suspense>
        </main>
      </div>
    </>
  );
}

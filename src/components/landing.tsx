import Header from "./Header/Header";
import HeroSection from "./Hero/HeroSection";
import DemoSection from "./Demo/DemoSection";
import FeatureSection from "./Features/FeatureSection";
import PricingSection from "./Pricing/PricingSection";
import Account from "./Account/Account";
import Footer from "./Footer/Footer";

export function Landing() {
  return (
    <div className="flex flex-col min-h-[100dvh]">
      <main className="flex-1 border-b">
        <HeroSection />
        <DemoSection />
        {/* <FeatureSection /> */}
        {/* <PricingSection /> */}
        {/* <Account /> */}
      </main>
      {/* <Footer/> */}
    </div>
  );
}

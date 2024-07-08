import PricingSection from "@/components/Pricing/PricingSection";
import { Suspense } from "react";
import Loading from "../loading";

export default async function premium() {
  return (
    <>
      <Suspense fallback={<Loading/>}>
        <PricingSection />
      </Suspense>
    </>
  );
}

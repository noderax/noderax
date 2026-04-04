import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { RuntimeStrip } from "@/components/runtime-strip";
import { ProductSurface } from "@/components/product-surface";
import { RuntimeArchitecture } from "@/components/runtime-architecture";
import { OperationalWorkflows } from "@/components/operational-workflows";
import { GovernanceSection } from "@/components/governance-section";
import { ControlPlaneFaq } from "@/components/control-plane-faq";
import { Pricing } from "@/components/pricing";
import { CTASection } from "@/components/cta-section";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <Hero />
        <RuntimeStrip />
        <ProductSurface />
        <RuntimeArchitecture />
        <OperationalWorkflows />
        <GovernanceSection />
        <Pricing />
        <ControlPlaneFaq />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}

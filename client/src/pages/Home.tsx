// DESIGN: Light Premium — Glassmorphism + Brand Blue Accents
// Full page assembly for Inversiones S&M
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import ProcessSection from "@/components/ProcessSection";
import AdvisorsSection from "@/components/AdvisorsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-light-bg">
      <Navbar />
      <main>
        <HeroSection />
        <BrandsSection />
        <AdvisorsSection />
        <ProductsSection />
        <ProcessSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
    </MotionConfig>
  );
}

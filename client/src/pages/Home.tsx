// DESIGN: Light Premium — Glassmorphism + Brand Blue Accents
// Full page assembly for Inversiones S&M
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import GallerySection from "@/components/GallerySection";
import ProcessSection from "@/components/ProcessSection";
import AdvisorsSection from "@/components/AdvisorsSection";
import CoverageSection from "@/components/CoverageSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import CareersSection from "@/components/CareersSection";
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
        <StatsSection />
        <AboutSection />
        <WhyUsSection />
        <ValuePropositionSection />
        <ProductsSection />
        <BrandsSection />
        <GallerySection />
        <ProcessSection />
        <AdvisorsSection />
        <CoverageSection />
        <ContactSection />
        <CTASection />
        <CareersSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
    </MotionConfig>
  );
}

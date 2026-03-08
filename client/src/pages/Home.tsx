// DESIGN: Light Premium — Glassmorphism + Brand Blue Accents
// Full page assembly for Inversiones S&M
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import ProductsSection from "@/components/ProductsSection";
import BrandsSection from "@/components/BrandsSection";
import GallerySection from "@/components/GallerySection";
import ProcessSection from "@/components/ProcessSection";
import CoverageSection from "@/components/CoverageSection";
import ContactSection from "@/components/ContactSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-light-bg">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <AboutSection />
        <WhyUsSection />
        <ProductsSection />
        <BrandsSection />
        <GallerySection />
        <ProcessSection />
        <CoverageSection />
        <ContactSection />
        <CTASection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
  );
}

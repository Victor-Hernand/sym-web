// Página Nosotros — sección "Quiénes Somos" como página propia
import { MotionConfig } from "framer-motion";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/AboutSection";
import WhyUsSection from "@/components/WhyUsSection";
import ValuePropositionSection from "@/components/ValuePropositionSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import ScrollToTop from "@/components/ScrollToTop";

export default function Nosotros() {
  return (
    <MotionConfig reducedMotion="user">
    <div className="min-h-screen flex flex-col bg-light-bg">
      <Navbar />
      <main>
        <AboutSection />
        <WhyUsSection />
        <ValuePropositionSection />
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </div>
    </MotionConfig>
  );
}

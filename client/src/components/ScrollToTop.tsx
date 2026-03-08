// DESIGN: Light Premium — Scroll to top with brand blue progress ring
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [show, setShow] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      setShow(scrollTop > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const circumference = 2 * Math.PI * 18;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 left-6 z-50 w-12 h-12 flex items-center justify-center group"
          aria-label="Volver arriba"
        >
          {/* Progress ring */}
          <svg className="absolute inset-0 w-12 h-12 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="white" stroke="rgba(27,58,107,0.1)" strokeWidth="2" />
            <circle
              cx="20" cy="20" r="18" fill="none"
              stroke="url(#blueGrad)" strokeWidth="2" strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{ transition: "stroke-dashoffset 0.1s ease" }}
            />
            <defs>
              <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1B3A6B" />
                <stop offset="100%" stopColor="#3B6FC4" />
              </linearGradient>
            </defs>
          </svg>
          <ArrowUp className="w-4 h-4 text-brand-blue-light relative z-10 group-hover:scale-110 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

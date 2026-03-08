// DESIGN: Light Premium — Stats with brand blue gradient counters
import { useInView } from "@/hooks/useInView";
import { useCountUp } from "@/hooks/useCountUp";
import { STATS } from "@/lib/data";
import { motion } from "framer-motion";

function StatCard({ value, suffix, label, index }: { value: number; suffix: string; label: string; index: number }) {
  const { ref, isInView } = useInView();
  const count = useCountUp(value, 2000, isInView);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="relative text-center group"
    >
      <div className="blue-gradient font-display font-black text-5xl md:text-6xl lg:text-7xl leading-none">
        {count}{suffix}
      </div>
      <div className="mt-3 font-display font-semibold text-sm md:text-base uppercase tracking-widest text-sym-charcoal/50">
        {label}
      </div>
      <div className="mt-4 mx-auto w-12 h-0.5 bg-brand-blue/20 group-hover:w-20 group-hover:bg-brand-blue transition-all duration-500" />
    </motion.div>
  );
}

export default function StatsSection() {
  return (
    <section className="py-16 md:py-20 bg-light-surface relative border-y border-brand-blue/8">
      <div className="container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 md:gap-16">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} {...stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

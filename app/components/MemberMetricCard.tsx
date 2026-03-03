"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface MetricCardProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

export default function MemberMetricCard({ value, label, suffix = "", delay }: MetricCardProps) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 2000;
          const steps = 60;
          const increment = value / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= value) {
              setCount(value);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);

          return () => clearInterval(timer);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-6 text-center hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.15)]"
    >
      <div className="text-4xl md:text-5xl font-serif text-[#C5A85C] mb-3 font-light">
        {count}
        {suffix && <span className="text-xl ml-1">{suffix}</span>}
      </div>
      <div className="text-[#AAB3CF] text-xs uppercase tracking-widest">
        {label}
      </div>
      <div className="w-12 h-[1px] bg-[#C5A85C]/30 mx-auto mt-3" />
    </motion.div>
  );
}

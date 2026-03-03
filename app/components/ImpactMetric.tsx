"use client";

import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

interface MetricProps {
  value: number;
  label: string;
  suffix?: string;
  delay: number;
}

export default function ImpactMetric({ value, label, suffix = "", delay }: MetricProps) {
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
      className="text-center"
    >
      <div className="text-5xl md:text-6xl font-serif text-[#C5A85C] mb-4 font-light">
        {count}
        {suffix && <span className="text-2xl ml-1">{suffix}</span>}
      </div>
      <div className="text-[#AAB3CF] text-sm uppercase tracking-widest">
        {label}
      </div>
    </motion.div>
  );
}

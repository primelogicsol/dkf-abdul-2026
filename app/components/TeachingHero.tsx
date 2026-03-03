"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";

interface TeachingHeroProps {
  title: string | ReactNode;
  subtitle: string;
  ctaLink: string;
  ctaText?: string;
}

export default function TeachingHero({ title, subtitle, ctaLink, ctaText = "Explore Framework" }: TeachingHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

      {/* Radial Gold Glow */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated Gold Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "8rem" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
        />

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6"
        >
          {title}
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#AAB3CF] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12"
        >
          {subtitle}
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
        >
          <Link
            href={ctaLink}
            className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
          >
            <span>{ctaText}</span>
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-y-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

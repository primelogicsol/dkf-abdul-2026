"use client";

import { motion } from "framer-motion";

interface QuoteBlockProps {
  quote: string;
  attribution?: string;
}

export default function QuoteBlock({ quote, attribution }: QuoteBlockProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="max-w-4xl mx-auto"
    >
      <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-10 relative">
        {/* Gold Corner Accents */}
        <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
        <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

        <div className="relative z-10">
          {/* Floating Animation Wrapper */}
          <motion.div
            animate={{ y: [-5, 5, -5] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            {/* Opening Quote Mark */}
            <div className="text-[#C5A85C]/30 text-6xl font-serif mb-6">"</div>

            {/* Quote Text */}
            <blockquote className="font-serif text-2xl md:text-3xl text-white leading-relaxed mb-8">
              {quote}
            </blockquote>

            {/* Closing Quote Mark */}
            <div className="text-[#C5A85C]/30 text-6xl font-serif mb-6">"</div>
          </motion.div>

          {/* Attribution */}
          {attribution && (
            <div className="flex items-center gap-4">
              <div className="gold-divider" />
              <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                {attribution}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

"use client";

import { motion } from "framer-motion";

export default function FeaturedTeaching() {
  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full pattern-subtle opacity-20" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-[#C5A85C]/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] bg-[#C5A85C]/5 rounded-full blur-[100px]" />

      <div className="container-premium relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Dr. Kumar's Quotes
            </h2>
            <div className="gold-divider long mx-auto" />
          </motion.div>

          {/* Quote Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Left Gold Border */}
            <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#C5A85C] via-[#C5A85C]/60 to-[#C5A85C]/30 rounded-full" />

            {/* Content */}
            <div className="pl-10 py-8">
              {/* Floating Animation Wrapper */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Opening Quote Mark */}
                <div className="text-[#C5A85C]/30 text-6xl font-serif mb-4">"</div>

                {/* Quote Text */}
                <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-white leading-relaxed mb-8">
                  True transformation begins with refinement of the inner self
                  before engagement with the outer world.
                </blockquote>

                {/* Closing Quote Mark */}
                <div className="text-[#C5A85C]/30 text-6xl font-serif mb-6">"</div>
              </motion.div>

              {/* Attribution */}
              <div className="flex items-center gap-4 mb-8">
                <div className="gold-divider" />
                <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                  Dr. Ghulam Mohammad Kumar
                </span>
              </div>

              {/* Teaching Context */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-[#AAB3CF] leading-relaxed text-lg"
              >
                This teaching reflects the core understanding that authentic change
                emerges from sustained inner work. The emphasis is not on external
                achievement or recognition, but on the quality of attention brought
                to each moment. Through disciplined self-observation and ethical
                conduct, one develops the capacity to engage with the world from a
                place of clarity rather than reaction.
              </motion.p>
            </div>
          </motion.div>

          {/* Core Principles Link */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-center mt-12"
          >
            <div className="flex flex-wrap justify-center gap-4">
              {["Self-Awareness", "Inner Discipline", "Ethical Conduct"].map(
                (principle) => (
                  <span
                    key={principle}
                    className="px-4 py-2 border border-[#C5A85C]/20 text-[#C5A85C] text-sm rounded-full"
                  >
                    {principle}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

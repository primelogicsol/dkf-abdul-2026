"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function PremiumHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

      {/* Subtle Radial Gold Glow */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[120px]"
      />

      {/* Subtle Particle Texture */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(197, 168, 92, 0.4) 1px, transparent 0)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Mouse-follow Parallax Effect */}
      <motion.div
        animate={{
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{
          type: "spring",
          damping: 30,
          stiffness: 200,
        }}
        className="absolute inset-0"
      >
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#C5A85C]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-[#C5A85C]/5 rounded-full blur-[80px]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        {/* Animated Gold Line */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "6rem" }}
          transition={{ duration: 1, delay: 0.3 }}
          className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
        />

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-serif text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-white leading-tight mb-6"
        >
          Preserving Spiritual Legacy
          <br />
          <span className="gradient-gold">Through Structured Knowledge</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#AAB3CF] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-12"
        >
          The Dr. Kumar Foundation documents the life, teachings, and reflections of Dr. Ghulam Mohammad Kumar, a Sufi guide from Kashmir whose work brings together spirituality, knowledge, and ethical responsibility.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-[#AAB3CF] text-lg md:text-xl lg:text-2xl leading-relaxed max-w-3xl mx-auto mb-12"
        >
          This platform has been created as a living archive where seekers can explore his teachings and contribute to preserving a spiritual legacy through reflection, research, and shared participation.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/foundation"
            className="group relative px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg overflow-hidden transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
          >
            <span className="relative z-10">Explore the Foundation</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] opacity-0 group-hover:opacity-100 transition-opacity duration-600" />
          </Link>

          <Link
            href="/life-and-work"
            className="group px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C] hover:-translate-y-1"
          >
            Discover His Life
          </Link>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 border-2 border-[#C5A85C]/30 rounded-full flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-[#C5A85C] rounded-full"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

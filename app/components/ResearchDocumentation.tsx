"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ResearchCardProps {
  title: string;
  abstract: string;
  date: string;
  category: string;
  href: string;
  delay: number;
}

function ResearchCard({
  title,
  abstract,
  date,
  category,
  href,
  delay,
}: ResearchCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="group bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/30 transition-all duration-500 hover:shadow-[0_0_40px_rgba(197,168,92,0.1)]"
    >
      {/* Category Badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="px-3 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-xs uppercase tracking-wider rounded-full">
          {category}
        </span>
        <span className="text-[#6B7299] text-sm">{date}</span>
      </div>

      {/* Title */}
      <h3 className="font-serif text-xl text-white mb-4 group-hover:text-[#C5A85C] transition-colors duration-300">
        {title}
      </h3>

      {/* Abstract */}
      <p className="text-[#AAB3CF] leading-relaxed mb-6 line-clamp-3">
        {abstract}
      </p>

      {/* Actions */}
      <div className="flex items-center justify-between pt-6 border-t border-[#C5A85C]/10">
        <Link
          href={href}
          className="text-[#C5A85C] font-medium text-sm flex items-center group/link"
        >
          <span className="transition-all duration-300 group-hover/link:translate-x-2">
            Read More
          </span>
          <svg
            className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/link:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>

        <button className="p-2 text-[#6B7299] hover:text-[#C5A85C] transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
            />
          </svg>
        </button>
      </div>
    </motion.div>
  );
}

export default function ResearchDocumentation() {
  return (
    <section className="section-spacing bg-[#151A30] relative overflow-hidden">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 pattern-subtle opacity-20" />

      <div className="container-premium relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Research & Documentation
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Academic papers, archival materials, and documented teachings
            preserved through rigorous methodology and ethical standards.
          </p>
        </motion.div>

        {/* Research Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <ResearchCard
            title="The Architecture of Inner Discipline"
            abstract="An examination of structured practices for cultivating sustained attention and ethical refinement in contemporary contexts."
            date="2024"
            category="Research Paper"
            href="/research/inner-discipline"
            delay={0.1}
          />

          <ResearchCard
            title="Ethics Without Proclamation"
            abstract="Exploring the relationship between inner development and outer action through documented case studies of ethical conduct."
            date="2024"
            category="Case Study"
            href="/research/ethics-without-proclamation"
            delay={0.3}
          />

          <ResearchCard
            title="The Role of Solitude in Spiritual Development"
            abstract="Historical and contemporary perspectives on withdrawal and return as phases of spiritual maturation."
            date="2023"
            category="Archival Study"
            href="/research/solitude-and-development"
            delay={0.5}
          />
        </div>

        {/* Additional Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-wrap justify-center gap-4"
        >
          <Link
            href="/research"
            className="group inline-flex items-center px-6 py-3 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
          >
            <span>View All Research</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>

          <Link
            href="/archives"
            className="group inline-flex items-center px-6 py-3 text-[#AAB3CF] font-medium rounded-lg transition-all duration-300 hover:text-white"
          >
            <span>Browse Archives</span>
            <svg
              className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M5 19a2 2 0 01-2-2V7a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1M5 19h14a2 2 0 002-2v-5a2 2 0 00-2-2H9a2 2 0 00-2 2v5a2 2 0 01-2 2z"
              />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

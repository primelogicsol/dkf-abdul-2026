"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectCardProps {
  title: string;
  description: string;
  imageGradient: string;
  href: string;
  delay: number;
}

function ProjectCard({
  title,
  description,
  imageGradient,
  href,
  delay,
}: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
      className="group relative overflow-hidden rounded-2xl aspect-[4/5] cursor-pointer"
    >
      {/* Background Image Placeholder with Gradient */}
      <div className={`absolute inset-0 ${imageGradient} transition-transform duration-700 group-hover:scale-105`} />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1C2340] via-[#1C2340]/60 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end">
        {/* Gold Line Accent */}
        <div className="absolute top-8 left-8 right-8 h-[1px] bg-gradient-to-r from-[#C5A85C]/0 via-[#C5A85C]/40 to-[#C5A85C]/0 group-hover:via-[#C5A85C]/60 transition-colors duration-500" />

        {/* Icon */}
        <div className="absolute top-8 right-8 w-10 h-10 border border-[#C5A85C]/30 rounded-full flex items-center justify-center group-hover:border-[#C5A85C]/60 group-hover:bg-[#C5A85C]/10 transition-all duration-500">
          <svg
            className="w-4 h-4 text-[#C5A85C] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
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
        </div>

        {/* Title */}
        <h3 className="font-serif text-2xl text-white mb-3 group-hover:text-[#C5A85C] transition-colors duration-300">
          {title}
        </h3>

        {/* Description */}
        <p className="text-[#AAB3CF] text-sm leading-relaxed mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 translate-y-4 group-hover:translate-y-0">
          {description}
        </p>

        {/* Link */}
        <div className="flex items-center text-[#C5A85C] font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
          <span>Learn More</span>
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
        </div>
      </div>

      {/* Border Glow on Hover */}
      <div className="absolute inset-0 border border-[#C5A85C]/0 group-hover:border-[#C5A85C]/30 rounded-2xl transition-colors duration-500" />
    </motion.div>
  );
}

export default function LegacyProjects() {
  return (
    <section className="section-spacing bg-[#1C2340] relative">
      <div className="container-premium">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Legacy Projects
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Initiatives that extend the Foundation&apos;s mission into practical
            engagement with community, environment, and cultural preservation.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <ProjectCard
            title="Healing Initiatives"
            description="Supporting holistic wellness programs that integrate traditional wisdom with contemporary understanding of health and wellbeing."
            imageGradient="bg-gradient-to-br from-[#232B52] via-[#1C2340] to-[#151A30]"
            href="/legacy-projects/healing"
            delay={0.1}
          />

          <ProjectCard
            title="Environmental & Water Protection"
            description="Preserving natural resources through community-led conservation efforts and sustainable practices rooted in ethical responsibility."
            imageGradient="bg-gradient-to-br from-[#1C2340] via-[#232B52] to-[#151A30]"
            href="/legacy-projects/environment"
            delay={0.3}
          />

          <ProjectCard
            title="Youth & Cultural Engagement"
            description="Nurturing the next generation through educational programs that emphasize ethical development and cultural continuity."
            imageGradient="bg-gradient-to-br from-[#151A30] via-[#1C2340] to-[#232B52]"
            href="/legacy-projects/youth"
            delay={0.5}
          />
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Link
            href="/legacy-projects"
            className="group inline-flex items-center px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
          >
            <span>View All Projects</span>
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
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";

interface RoleCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  delay: number;
}

function RoleCard({ title, description, icon, delay }: RoleCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -6 }}
      className="group relative bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 hover:border-[#C5A85C]/40 transition-all duration-500 hover:shadow-[0_0_50px_rgba(197,168,92,0.12)]"
    >
      <div className="w-14 h-14 mb-6 flex items-center justify-center text-[#C5A85C] group-hover:scale-110 transition-transform duration-500">
        {icon}
      </div>
      <h3 className="font-serif text-xl text-white mb-3 group-hover:text-[#C5A85C] transition-colors duration-300">
        {title}
      </h3>
      <p className="text-[#AAB3CF] leading-relaxed">{description}</p>
      <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-[#C5A85C]/10 rounded-tr-2xl group-hover:border-[#C5A85C]/30 transition-colors duration-500" />
    </motion.div>
  );
}

interface FrameworkCardProps {
  title: string;
  description: string;
  delay: number;
}

function FrameworkCard({ title, description, delay }: FrameworkCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay }}
      className="relative pl-10 pb-10 last:pb-0"
    >
      {/* Gold Left Border */}
      <div className="absolute left-0 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#C5A85C] via-[#C5A85C]/60 to-[#C5A85C]/30 rounded-full" />

      <h3 className="font-serif text-lg text-white mb-3">{title}</h3>
      <p className="text-[#AAB3CF] leading-relaxed text-sm">{description}</p>
    </motion.div>
  );
}

export default function GovernancePage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-tight mb-6"
          >
            Governance &
            <br />
            <span className="gradient-gold">Institutional Integrity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto mb-12"
          >
            Transparent structure ensuring continuity, accountability, and
            responsible stewardship.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 1.1 }}
          >
            <Link
              href="#structure"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>View Structure</span>
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

      {/* SECTION 1: ORGANIZATIONAL STRUCTURE */}
      <section id="structure" className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Organizational Structure
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Clear roles and responsibilities ensuring effective governance
              and institutional continuity.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <RoleCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              }
              title="Board of Trustees"
              description="Oversees strategic direction, fiduciary responsibility, and institutional integrity."
              delay={0.1}
            />

            <RoleCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              title="Advisory Council"
              description="Provides guidance on programmatic matters, regional engagement, and ethical considerations."
              delay={0.2}
            />

            <RoleCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              title="Administrative Office"
              description="Manages day-to-day operations, documentation, and coordination of activities."
              delay={0.3}
            />

            <RoleCard
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
              title="Regional Representatives"
              description="Facilitate local engagement and maintain communication between regions and the Foundation."
              delay={0.4}
            />
          </div>
        </div>
      </section>

      {/* SECTION 2: ETHICAL FRAMEWORK */}
      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Ethical Framework
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Core principles guiding institutional conduct and decision-making.
            </p>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            <FrameworkCard
              title="Accountability"
              description="All operations are conducted with clear lines of responsibility. Board members and staff are answerable for their decisions and actions, with regular reporting and review mechanisms in place."
              delay={0.1}
            />

            <FrameworkCard
              title="Transparency"
              description="Financial statements, governance decisions, and institutional activities are documented and made accessible to stakeholders. Open communication channels ensure clarity of purpose and action."
              delay={0.3}
            />

            <FrameworkCard
              title="Knowledge Integrity"
              description="Documentation and research are conducted with rigorous methodology and ethical standards. Materials are preserved without distortion, maintaining fidelity to original context and meaning."
              delay={0.5}
            />

            <FrameworkCard
              title="Community Responsibility"
              description="The Foundation recognizes its obligation to serve the broader community through ethical engagement, cultural preservation, and support for initiatives aligned with its mission."
              delay={0.7}
            />
          </div>
        </div>
      </section>

      {/* SECTION 3: GOVERNANCE MODEL VISUALIZATION */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Governance Model
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Visual representation of institutional structure and flow of responsibility.
            </p>
          </motion.div>

          {/* Visual Diagram */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            {/* Level 1: Foundation Board */}
            <div className="relative">
              <div className="bg-[#232B52] border border-[#C5A85C]/30 rounded-2xl p-6 text-center glow-gold">
                <div className="w-12 h-12 border border-[#C5A85C]/40 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-1">Foundation Board</h3>
                <p className="text-[#AAB3CF] text-xs">Strategic oversight & governance</p>
              </div>

              {/* Connecting Line */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-[#C5A85C]/50 to-[#C5A85C]/20" />
            </div>

            {/* Level 2: Research & Documentation */}
            <div className="relative mt-12">
              <div className="bg-[#232B52]/80 border border-[#C5A85C]/20 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 border border-[#C5A85C]/30 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-1">Research & Documentation</h3>
                <p className="text-[#AAB3CF] text-xs">Archival preservation & analysis</p>
              </div>

              {/* Connecting Line */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-[#C5A85C]/30 to-[#C5A85C]/10" />
            </div>

            {/* Level 3: Community Programs */}
            <div className="relative mt-12">
              <div className="bg-[#232B52]/60 border border-[#C5A85C]/15 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 border border-[#C5A85C]/25 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-1">Community Programs</h3>
                <p className="text-[#AAB3CF] text-xs">Regional engagement & initiatives</p>
              </div>

              {/* Connecting Line */}
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1px] h-12 bg-gradient-to-b from-[#C5A85C]/20 to-[#C5A85C]/5" />
            </div>

            {/* Level 4: Media & Communication */}
            <div className="relative mt-12">
              <div className="bg-[#232B52]/40 border border-[#C5A85C]/10 rounded-2xl p-6 text-center">
                <div className="w-12 h-12 border border-[#C5A85C]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-lg text-white mb-1">Media & Communication</h3>
                <p className="text-[#AAB3CF] text-xs">Digital platforms & outreach</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Home</span>
            </Link>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/foundation"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>Foundation Overview</span>
              </Link>
              <Link
                href="/contact"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Contact the Foundation</span>
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
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

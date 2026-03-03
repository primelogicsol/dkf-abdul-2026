"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import ProjectHero from "../../components/ProjectHero";
import FrameworkCard from "../../components/FrameworkCard";
import ImpactDiagram from "../../components/ImpactDiagram";
import ImpactMetric from "../../components/ImpactMetric";

export default function SufiMusicPage() {
  const frameworkItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
        </svg>
      ),
      title: "Archival Preservation",
      description: "Documenting and preserving traditional devotional music and philosophical expressions for future generations.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      title: "Original Composition",
      description: "Creating new works that carry forward the philosophical depth of traditional forms in contemporary contexts.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Interfaith Expression",
      description: "Facilitating dialogue and shared understanding through music that transcends specific religious boundaries.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
      ),
      title: "Digital Distribution",
      description: "Utilizing modern platforms to make philosophical and devotional content accessible to global audiences.",
      delay: 0.4,
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <ProjectHero
        title={
          <>
            Sufi Music &
            <br />
            <span className="gradient-gold">Spiritual Media</span>
          </>
        }
        subtitle="Structured preservation and dissemination of devotional and philosophical expression through responsible digital media production."
        ctaLink="#framework"
        ctaText="View Program Framework"
      />

      {/* Program Overview */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl text-white mb-6">
                Program Overview
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  Sufi Music initiatives address the need for responsible preservation
                  and dissemination of devotional and philosophical musical traditions.
                  These programs integrate archival rigor with contemporary production
                  standards.
                </p>
                <p>
                  The approach emphasizes authenticity alongside accessibility,
                  recognizing that traditional forms must be preserved with fidelity
                  while also finding expression in contemporary contexts.
                </p>
                <p>
                  Programs are implemented through collaborations with musicians,
                  scholars, and cultural institutions who share commitment to
                  ethical representation and artistic integrity.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-8 relative">
                <div className="absolute top-0 left-0 w-24 h-24 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-24 h-24 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

                <h3 className="font-serif text-xl text-white mb-6">
                  Program Statement
                </h3>
                <blockquote className="font-serif text-lg text-white leading-relaxed mb-6">
                  "Music carries philosophical depth beyond words. Its preservation
                  is not merely archival but essential to cultural continuity."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="gold-divider" />
                  <span className="text-[#C5A85C] uppercase tracking-widest text-sm">
                    Foundational Principle
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Framework */}
      <section id="framework" className="section-spacing bg-[#151A30] relative overflow-hidden">
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
              Strategic Framework
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Four interconnected domains of music and media work, each supporting
              cultural preservation and responsible dissemination.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworkItems.map((item) => (
              <FrameworkCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={item.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Model */}
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
              Impact Pathway
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <ImpactDiagram
            steps={[
              {
                title: "Tradition",
                description: "Rooting all work in authentic understanding of traditional forms, their context, and philosophical foundations.",
              },
              {
                title: "Composition",
                description: "Creating new works that honor traditional depth while finding expression appropriate to contemporary contexts.",
              },
              {
                title: "Production",
                description: "Recording and producing content with technical excellence and ethical consideration for representation.",
              },
              {
                title: "Global Dissemination",
                description: "Distributing content through digital platforms to reach global audiences while maintaining artistic integrity.",
              },
            ]}
          />
        </div>
      </section>

      {/* Implementation Structure */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Implementation Structure
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                title: "Research",
                description: "Scholarly investigation of traditional forms, historical context, and philosophical foundations.",
              },
              {
                title: "Production",
                description: "Professional recording, mixing, and mastering with attention to authenticity and quality.",
              },
              {
                title: "Distribution",
                description: "Strategic release across digital platforms with appropriate metadata and contextual information.",
              },
              {
                title: "Archiving",
                description: "Long-term preservation of recordings, documentation, and related materials for future access.",
              },
            ].map((item) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center"
              >
                <h3 className="font-serif text-xl text-[#C5A85C] mb-4">
                  {item.title}
                </h3>
                <p className="text-[#AAB3CF] leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
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
              Program Impact
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <ImpactMetric value={100} label="Recordings Archived" suffix="+" delay={0.1} />
            <ImpactMetric value={50} label="Original Compositions" suffix="+" delay={0.2} />
            <ImpactMetric value={10} label="Collaborative Artists" suffix="+" delay={0.3} />
            <ImpactMetric value={50000} label="Global Listeners" suffix="+" delay={0.4} />
          </div>
        </div>
      </section>

      {/* Call to Engage */}
      <section className="py-24 bg-[#151A30] relative">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] to-[#151A30]" />
        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Engage With This Program
            </h2>
            <div className="gold-divider long mx-auto mb-8" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Whether for collaboration, support, or inquiry, we welcome
              structured engagement aligned with our mission and values.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/engage/sufi-music/collaboration"
                className="px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                Collaborate
              </Link>
              <Link
                href="/engage/sufi-music/support"
                className="px-8 py-4 border border-[#C5A85C]/40 text-[#C5A85C] font-medium rounded-lg transition-all duration-300 hover:bg-[#C5A85C]/10 hover:border-[#C5A85C]"
              >
                Support
              </Link>
              <Link
                href="/engage/sufi-music/inquiry"
                className="px-8 py-4 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                Inquire
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#0F1326] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/legacy-projects"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Legacy Projects</span>
            </Link>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/legacy-projects/sufi-ecommerce"
                className="group inline-flex items-center px-6 py-3 border border-white/20 text-[#F1F3F8] font-medium rounded-lg transition-all duration-300 hover:bg-white/5 hover:border-white/40"
              >
                <span>Sufi Commerce</span>
              </Link>
              <Link
                href="/legacy-projects/sufi-science"
                className="group inline-flex items-center px-6 py-3 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
              >
                <span>Sufi Science</span>
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

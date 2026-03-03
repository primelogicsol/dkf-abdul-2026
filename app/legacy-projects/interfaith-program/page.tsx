"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import ProjectHero from "../../components/ProjectHero";
import FrameworkCard from "../../components/FrameworkCard";
import ImpactDiagram from "../../components/ImpactDiagram";
import ImpactMetric from "../../components/ImpactMetric";

export default function InterfaithProgramPage() {
  const frameworkItems = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
        </svg>
      ),
      title: "Structured Dialogue Platforms",
      description: "Facilitated forums for sustained interfaith exchange, reducing polarization through principled conversation and mutual documentation.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      title: "Ethical & Theological Scholarship",
      description: "Research and publication initiatives examining theological frameworks for ethical coexistence and civilizational cooperation.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
      title: "Civic & Policy Interface",
      description: "Policy-informed discourse bridging theological scholarship with civic governance and institutional decision-making frameworks.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Community Stabilization",
      description: "Cross-community collaboration mechanisms designed to reduce tension and support ethical coexistence at institutional levels.",
      delay: 0.4,
    },
  ];

  const diagramSteps = [
    { title: "Tradition", description: "Theological & Philosophical Foundations" },
    { title: "Dialogue", description: "Structured Interfaith Exchange" },
    { title: "Documentation", description: "Scholarly Publication & Archive" },
    { title: "Integration", description: "Policy & Community Implementation" },
  ];

  const implementationSteps = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      title: "Research",
      description: "Theological research and position paper development",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Dialogue Forums",
      description: "Facilitated interfaith dialogue sessions and symposia",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Documentation",
      description: "Publication of proceedings and scholarly papers",
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
      title: "Collaboration",
      description: "Institutional partnerships and policy integration",
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <ProjectHero
        title={
          <>
            Interfaith Dialogue &
            <br />
            <span className="gradient-gold">Civilizational Engagement</span>
          </>
        }
        subtitle="Structured platforms advancing principled dialogue, ethical coexistence, and institutional collaboration across faith traditions and civic communities."
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
              <div className="w-24 h-[1px] bg-[#C5A85C] mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  The Interfaith Dialogue program operates as a structured engagement
                  framework designed to facilitate sustained dialogue across religious
                  and philosophical traditions. This is not event-based activism but
                  institutional dialogue infrastructure.
                </p>
                <p>
                  Through methodical documentation, scholarly publication, and policy
                  interface work, the program reduces polarization through principled
                  exchange and develops frameworks for ethical coexistence grounded
                  in theological scholarship and civic responsibility.
                </p>
                <p>
                  The initiative supports cross-community collaboration at institutional
                  levels, creating stable platforms for long-term engagement rather than
                  reactive responses to immediate tensions.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
                <h3 className="font-serif text-xl text-white mb-6">
                  Program Objectives
                </h3>
                <ul className="space-y-4">
                  {[
                    "Facilitate sustained interfaith dialogue",
                    "Reduce polarization through structured exchange",
                    "Develop policy-informed ethical discourse",
                    "Support cross-community collaboration",
                    "Document interfaith scholarship and initiatives",
                  ].map((item, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-3 text-[#AAB3CF]"
                    >
                      <svg className="w-5 h-5 text-[#C5A85C] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{item}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Strategic Framework Grid */}
      <section id="framework" className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl text-white mb-4">
              Strategic Framework
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-3xl mx-auto">
              Four-pillar infrastructure supporting principled interfaith engagement
              and civilizational cooperation.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6">
            {frameworkItems.map((item, index) => (
              <FrameworkCard
                key={index}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={item.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Impact Model Diagram */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl text-white mb-4">
              Impact Model
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-3xl mx-auto">
              Structured pathway from theological foundation to community integration.
            </p>
          </motion.div>

          <ImpactDiagram steps={diagramSteps} />
        </div>
      </section>

      {/* Implementation Structure */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl text-white mb-4">
              Implementation Structure
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-3xl mx-auto">
              Sequential methodology ensuring rigorous documentation and institutional impact.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {implementationSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 text-center group hover:border-[#C5A85C]/30 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#C5A85C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5A85C]/20 transition-colors">
                  <div className="text-[#C5A85C]">
                    {step.icon}
                  </div>
                </div>
                <h3 className="font-serif text-lg text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-[#AAB3CF] text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Metrics */}
      <section className="section-spacing bg-[#1C2340]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-3xl text-white mb-4">
              Impact Metrics
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-3xl mx-auto">
              Quantifiable indicators of program reach and institutional engagement.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <ImpactMetric
              value={50}
              label="Dialogue Sessions"
              suffix="+"
              delay={0.1}
            />
            <ImpactMetric
              value={25}
              label="Position Papers"
              suffix="+"
              delay={0.2}
            />
            <ImpactMetric
              value={15}
              label="Community Partners"
              suffix="+"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Engagement Section */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="font-serif text-3xl text-white mb-4">
              Engage with This Program
            </h2>
            <div className="w-24 h-[1px] bg-[#C5A85C] mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto">
              Structured pathways for institutional collaboration, resource support,
              or programmatic inquiry.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link
                href="/engage/interfaith-program/collaboration"
                className="group block bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center hover:border-[#C5A85C]/30 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.15)]"
              >
                <div className="w-16 h-16 bg-[#C5A85C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5A85C]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-white mb-3">Collaborate</h3>
                <p className="text-[#AAB3CF] text-sm">
                  Institutional partnership and program collaboration
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link
                href="/engage/interfaith-program/support"
                className="group block bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center hover:border-[#C5A85C]/30 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.15)]"
              >
                <div className="w-16 h-16 bg-[#C5A85C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5A85C]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-white mb-3">Support</h3>
                <p className="text-[#AAB3CF] text-sm">
                  Resource contribution and program support
                </p>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link
                href="/engage/interfaith-program/inquiry"
                className="group block bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center hover:border-[#C5A85C]/30 transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.15)]"
              >
                <div className="w-16 h-16 bg-[#C5A85C]/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-[#C5A85C]/20 transition-colors">
                  <svg className="w-8 h-8 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="font-serif text-xl text-white mb-3">Inquire</h3>
                <p className="text-[#AAB3CF] text-sm">
                  General program information and questions
                </p>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

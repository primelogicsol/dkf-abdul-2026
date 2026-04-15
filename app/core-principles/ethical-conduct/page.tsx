"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import TeachingHero from "../../components/TeachingHero";
import TeachingCard from "../../components/TeachingCard";
import QuoteBlock from "../../components/QuoteBlock";

export default function EthicalConductPage() {
  const aspects = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Personal Ethics",
      description: "Integrity in private conduct—alignment between inner values and outer actions when no one is watching.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      ),
      title: "Social Responsibility",
      description: "Recognition that individual actions affect the broader community. Accountability beyond self-interest.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Compassionate Action",
      description: "Action motivated by genuine care for the welfare of others, not by obligation or expectation of return.",
      delay: 0.3,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Institutional Integrity",
      description: "Upholding ethical standards within organizational contexts. Transparency and accountability in governance.",
      delay: 0.4,
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <TeachingHero
        title={
          <>
            Ethical
            <br />
            <span className="gradient-gold">Conduct</span>
          </>
        }
        subtitle="Action aligned with understanding rather than impulse. Ethical conduct arises naturally from self-awareness and inner discipline, not from external rules."
        ctaLink="#aspects"
        ctaText="Explore Dimensions"
      />

      {/* Aspects Grid */}
      <section id="aspects" className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Four Dimensions of Ethical Living
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Ethical conduct extends from personal integrity to social
              responsibility, from compassionate action to institutional
              accountability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aspects.map((aspect) => (
              <TeachingCard
                key={aspect.title}
                icon={aspect.icon}
                title={aspect.title}
                description={aspect.description}
                delay={aspect.delay}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Framework Diagram */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="sm:text-center mb-16"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              The Foundation of Ethical Action
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {[
              {
                title: "Self-Awareness",
                description: "Ethics begins with seeing oneself clearly recognizing patterns of selfishness, justification, and harm.",
              },
              {
                title: "Understanding",
                description: "Comprehending the interconnected nature of action and consequence. Seeing beyond immediate gratification.",
              },
              {
                title: "Intention",
                description: "Conscious choice to act from clarity rather than reaction. Setting ethical direction before situations arise.",
              },
              {
                title: "Action",
                description: "The natural expression of awareness, understanding, and intention in concrete behavior toward self and others.",
              },
            ].map((step, index, arr) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 * (index + 1) }}
                className="relative"
              >
                <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-6 mb-4">
                  <h4 className="font-serif text-lg text-white mb-2">{step.title}</h4>
                  <p className="text-[#AAB3CF] text-sm leading-relaxed">{step.description}</p>
                </div>
                {index < arr.length - 1 && (
                  <div className="flex justify-center py-2">
                    <div className="w-[1px] h-10 bg-gradient-to-b from-[#C5A85C]/50 to-[#C5A85C]/20" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="section-spacing bg-[#151A30] relative">
        <div className="container-premium">
          <QuoteBlock
            quote="Ethics is not what you believe. It is how you act when no one is watching."
            attribution="Core Teaching"
          />
        </div>
      </section>

      {/* Practical Application */}
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
                Ethics in Practice
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  Ethical conduct is not adherence to external rules but
                  expression of inner clarity. When one sees clearly, right
                  action follows without struggle.
                </p>
                <p>
                  This is not ethics as convention or social expectation.
                  It is ethics as natural expression of understanding.
                </p>
                <p>
                  Ethical conduct manifests as honesty without calculation,
                  as responsibility without resentment, as care without
                  expectation of return.
                </p>
                <p>
                  This principle applies to all domains of life—to
                  professional responsibility, to relationships, to private
                  conduct. There is no separation between inner work and
                  outer action. They are one.
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
                <div className="absolute top-0 left-0 w-20 h-20 border-t border-l border-[#C5A85C]/30 rounded-tl-2xl" />
                <div className="absolute bottom-0 right-0 w-20 h-20 border-b border-r border-[#C5A85C]/30 rounded-br-2xl" />

                <h3 className="font-serif text-xl text-white mb-6">
                  Ethical Considerations
                </h3>

                <ul className="space-y-4">
                  {[
                    "Does this action cause harm to self or others?",
                    "Am I acting from clarity or from reaction?",
                    "Would I act this way if others were watching?",
                    "Does this align with my stated values?",
                    "What are the long-term consequences of this choice?",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[#AAB3CF]">
                      <span className="text-[#C5A85C] mt-1">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/core-principles/reflective-silence"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Reflective Silence</span>
            </Link>

            <Link
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors"
            >
              Back to Core Principles
            </Link>

            <Link
              href="/core-principles/shared-responsibility"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Next: Shared Responsibility</span>
              <svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-2"
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
      </section>

      <PremiumFooter />
    </div>
  );
}

"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import TeachingHero from "../../components/TeachingHero";
import TeachingCard from "../../components/TeachingCard";
import QuoteBlock from "../../components/QuoteBlock";

export default function SelfAwarenessPage() {
  const aspects = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
      title: "Self-Observation",
      description: "Developing the capacity to witness thoughts, emotions, and sensations without immediate identification or reaction.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      title: "Self-Accountability",
      description: "Taking responsibility for one's inner states and outer actions without blame or justification.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
        </svg>
      ),
      title: "Self-Refinement",
      description: "Using observation as the basis for conscious transformation rather than unconscious habit.",
      delay: 0.3,
    },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <TeachingHero
        title={
          <>
            Self-
            <br />
            <span className="gradient-gold">Awareness</span>
          </>
        }
        subtitle="The capacity to observe oneself without identification or judgment. The foundation upon which all other qualities depend."
        ctaLink="#framework"
        ctaText="Explore Framework"
      />

      {/* Aspects Grid */}
      <section id="framework" className="section-spacing bg-[#151A30] relative overflow-hidden">
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
              Three Aspects of Self-Awareness
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Self-awareness develops through three interrelated capacities,
              each supporting and deepening the others.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
              The Process of Awareness
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {[
              {
                title: "Perception",
                description: "Direct sensing of what is occurring bodily sensations, thoughts, emotions without the filter of interpretation.",
              },
              {
                title: "Reflection",
                description: "Stepping back from immediate experience to observe the patterns and tendencies that shape perception itself.",
              },
              {
                title: "Correction",
                description: "Adjusting one's relationship to experience based on clearer understanding, not based on self-judgment.",
              },
              {
                title: "Growth",
                description: "The natural deepening of awareness that occurs when perception, reflection, and correction become sustained practice.",
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
            quote="Awareness precedes transformation. To change what we do not see is to remain in bondage to unconscious habit."
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
                Practice in Daily Life
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  Self-awareness begins with simple attention to the body.
                  Notice the quality of breathing, the presence of tension,
                  the sensations that arise and pass.
                </p>
                <p>
                  Extend this attention to thoughts as they arise. Notice
                  how one thought leads to another, how the mind moves
                  from past to future, rarely resting in the present.
                </p>
                <p>
                  Observe emotions without becoming them. Notice how an
                  emotion arises, has a trajectory, and passes—like a wave
                  in the ocean.
                </p>
                <p>
                  The practice is not to control these phenomena but to
                  know them. In knowing, a space opens between stimulus
                  and response. Within that space lies the possibility of
                  conscious action.
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
                  Points of Practice
                </h3>

                <ul className="space-y-4">
                  {[
                    "Begin with 5 minutes of bodily awareness daily",
                    "Notice one automatic reaction each day",
                    "Pause before speaking in conversation",
                    "Observe without judging—yourself or others",
                    "Return to attention when you notice wandering",
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
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Back to Core Principles</span>
            </Link>

            <Link
              href="/core-principles/inner-discipline"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Next: Inner Discipline</span>
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

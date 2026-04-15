"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../../components/PremiumHeader";
import PremiumFooter from "../../components/PremiumFooter";
import TeachingHero from "../../components/TeachingHero";
import TeachingCard from "../../components/TeachingCard";
import QuoteBlock from "../../components/QuoteBlock";

export default function InnerDisciplinePage() {
  const aspects = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Habit Formation",
      description: "Establishing consistent practices that support awareness and ethical living through daily commitment.",
      delay: 0.1,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Intentional Living",
      description: "Making conscious choices aligned with understood principles rather than reactive impulses.",
      delay: 0.2,
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Spiritual Regulation",
      description: "Maintaining equilibrium through sustained practice regardless of external circumstances.",
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
            Inner
            <br />
            <span className="gradient-gold">Discipline</span>
          </>
        }
        subtitle="The consistent application of attention and effort toward refined states of being. Not imposed from outside but arising from genuine understanding."
        ctaLink="#aspects"
        ctaText="Explore Aspects"
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
              Three Dimensions of Discipline
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
              Inner discipline manifests through consistent practice in three
              interconnected domains of daily life.
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
              The Development of Discipline
            </h2>
            <div className="gold-divider long sm:mx-auto mb-6" />
          </motion.div>

          <div className="max-w-2xl mx-auto">
            {[
              {
                title: "Understanding",
                description: "Discipline begins with clarity about what serves awareness and what obscures it. Without understanding, discipline becomes mere constraint.",
              },
              {
                title: "Commitment",
                description: "A conscious decision to prioritize inner development over comfort or convenience. This commitment must be renewed daily.",
              },
              {
                title: "Practice",
                description: "Regular engagement with specific exercises meditation, self observation, ethical restraint that strengthen the capacity for attention.",
              },
              {
                title: "Integration",
                description: "The gradual embodiment of discipline until it becomes natural expression rather than effortful constraint.",
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
            quote="Discipline is not confinement. It is the structure within which freedom becomes possible."
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
                Daily Discipline Framework
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  Inner discipline is not about grand gestures or dramatic
                  renunciations. It is expressed in small, consistent choices
                  made daily.
                </p>
                <p>
                  Begin with a fixed time for reflection each day. The specific
                  time matters less than the consistency of the practice.
                </p>
                <p>
                  Restraint in speech—pausing before speaking, avoiding
                  unnecessary conversation, refraining from complaint—builds
                  the capacity for conscious action.
                </p>
                <p>
                  Attention to the body—posture, breathing, movement—anchors
                  awareness in the present moment throughout the day.
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
                  Daily Practice Grid
                </h3>

                <div className="space-y-4">
                  {[
                    { time: "Morning", practice: "15 minutes silent reflection" },
                    { time: "Midday", practice: "Conscious pause before meals" },
                    { time: "Evening", practice: "Review of the day's actions" },
                    { time: "Throughout", practice: "Attention to posture and breathing" },
                  ].map((item) => (
                    <div key={item.time} className="flex items-center gap-4">
                      <span className="text-[#C5A85C] text-sm w-20">{item.time}</span>
                      <div className="flex-1 h-[1px] bg-[#C5A85C]/20" />
                      <span className="text-[#AAB3CF] text-sm">{item.practice}</span>
                    </div>
                  ))}
                </div>
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
              href="/core-principles/self-awareness"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Self-Awareness</span>
            </Link>

            <Link
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors"
            >
              Back to Core Principles
            </Link>

            <Link
              href="/core-principles/reflective-silence"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Next: Reflective Silence</span>
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

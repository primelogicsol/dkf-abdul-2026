"use client";

import Link from "next/link";

export default function ReflectiveSilencePage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">

      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/core-principles" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to Core Principles
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Reflective Silence
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C] mb-8" />
          <p className="text-[#C5A85C] text-lg italic">
            Intentional restraint and clarity.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8 text-[#C9CCD6] leading-relaxed">
            <p>
              Reflective silence is the intentional cultivation of inward quietude.
              It is not absence of thought but a quality of attention that allows
              deeper understanding to emerge.
            </p>
            <p>
              In silence, the constant commentary of the mind subsides. What remains
              is not emptiness but presence. Within this presence, perception sharpens
              and insight becomes possible.
            </p>
            <p>
              This silence is not escape from the world but engagement with it from
              a different level. It is not withdrawal but refinement. The world
              continues, but one's relationship to it changes.
            </p>
            <p>
              Reflective silence requires intentional practice. It may be approached
              through formal meditation, through walks in nature, through the deliberate
              reduction of unnecessary speech and activity. The form matters less than
              the quality of attention brought to it.
            </p>

            <div className="border-l-2 border-[#C5A85C]/30 pl-6 py-4 my-8">
              <p className="text-[#C9CCD6] italic">
                "In silence, what is true reveals itself. In noise, it hides."
              </p>
            </div>

            <p>
              This principle is not about becoming passive or disengaged. Silence
              prepares one for right action. It is the ground from which clarity
              emerges and the space in which understanding deepens.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/core-principles/inner-discipline" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← Inner Discipline
          </Link>
          <Link
            href="/core-principles/ethical-conduct"
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">Ethical Conduct →</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}

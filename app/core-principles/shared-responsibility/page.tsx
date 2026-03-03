"use client";

import Link from "next/link";

export default function SharedResponsibilityPage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">

      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/core-principles" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to Core Principles
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">
            Shared Responsibility
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C] mb-8" />
          <p className="text-[#C5A85C] text-lg italic">
            Accountability within community.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[900px] mx-auto">
          <div className="space-y-8 text-[#C9CCD6] leading-relaxed">
            <p>
              Shared responsibility is recognition that individual work occurs within
              a larger context. It means accountability to others engaged in similar
              inquiry, without hierarchy or dependency.
            </p>
            <p>
              This principle acknowledges that no one works in isolation. Even in
              solitude, one is part of a larger movement. Shared responsibility
              means acknowledging this connection and acting accordingly.
            </p>
            <p>
              Shared responsibility is not about group identity or collective
              belief. It is about mutual support in the pursuit of clarity. It
              means showing up, contributing, and holding oneself accountable to
              the standards one professes.
            </p>
            <p>
              This principle manifests in many ways—in participation in gatherings,
              in documentation of experience, in support of others, in contribution
              to the continuity of the work. The form varies; the essence is
              commitment beyond self-interest.
            </p>

            <div className="border-l-2 border-[#C5A85C]/30 pl-6 py-4 my-8">
              <p className="text-[#C9CCD6] italic">
                "We are responsible not only for ourselves but for the quality of
                what we create together."
              </p>
            </div>

            <p>
              Shared responsibility does not diminish individual work; it supports
              it. Community is not escape from self but mirror for self. In
              relationship, what is hidden becomes visible. In accountability,
              what is weak becomes strong.
            </p>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/core-principles/ethical-conduct" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← Ethical Conduct
          </Link>
          <Link
            href="/the-circle"
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">The Circle →</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </section>
    </div>
  );
}

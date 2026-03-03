"use client";

import Link from "next/link";

export default function ReturnToCommunityPage() {
  return (
    <div className="bg-[#1C2340] min-h-screen">
      
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/life-and-work" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to The Life and Work
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Return to Community
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C]" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif text-white">Return to Community</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mt-4" />
            </div>
            <div className="md:col-span-3 space-y-6">
              <p className="text-[#C9CCD6] leading-relaxed">
                Following years of solitude, engagement with individuals resumed in a structured 
                and measured manner. Interaction centered on clarity, responsibility, and 
                ethical refinement.
              </p>
              <p className="text-[#C9CCD6] leading-relaxed">
                [Documentation of renewed engagement and structured interactions to be added.]
              </p>
              <div className="pt-8 border-t border-[#C5A85C]/20">
                <div className="flex items-center gap-4 text-[#C9CCD6]">
                  <span className="text-[#C5A85C] text-sm font-serif">[Year]</span>
                  <span className="w-16 h-[1px] bg-[#C5A85C]/30" />
                  <span>Re-engagement begins</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/life-and-work/years-of-solitude" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← Years of Solitude
          </Link>
          <Link 
            href="/life-and-work/continuing-presence" 
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">Continuing Presence →</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </section>

      {/* Closing Note */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#1C2340]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-lg font-serif text-[#C9CCD6] leading-relaxed">
            This account is maintained for documentation and continuity, not elevation of personality.
          </p>
        </div>
      </section>
    </div>
  );
}

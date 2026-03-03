"use client";

import Link from "next/link";

export default function ContinuingPresencePage() {
  return (
    <div className="bg-[#242B4A] min-h-screen">
      
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#1C2340]">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/life-and-work" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to The Life and Work
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Continuing Presence
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C]" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif text-white">Continuing Presence</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mt-4" />
            </div>
            <div className="md:col-span-3 space-y-6">
              <p className="text-[#C9CCD6] leading-relaxed">
                He remains alive and engaged. The Foundation documents ongoing continuity 
                through structured governance and the global circle of documented engagement.
              </p>
              <div className="pt-8 border-t border-[#C5A85C]/20">
                <p className="text-[#C9CCD6] text-sm">
                  Current documentation maintained through the Foundation office.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/life-and-work/return-to-community" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← Return to Community
          </Link>
          <Link 
            href="/core-principles" 
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">Core Principles →</span>
            <span className="absolute bottom-0 left-0 h-[1px] bg-[#C5A85C] w-0 group-hover:w-full transition-all duration-300" />
          </Link>
        </div>
      </section>

      {/* Closing Note */}
      <section className="py-16 px-6 md:px-12 lg:px-24 bg-[#242B4A]">
        <div className="max-w-[800px] mx-auto text-center">
          <p className="text-lg font-serif text-[#C9CCD6] leading-relaxed">
            This account is maintained for documentation and continuity, not elevation of personality.
          </p>
        </div>
      </section>
    </div>
  );
}

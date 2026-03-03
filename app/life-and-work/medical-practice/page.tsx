"use client";

import Link from "next/link";

export default function MedicalPracticePage() {
  return (
    <div className="bg-[#242B4A] min-h-screen">
      
      {/* Page Header */}
      <section className="py-24 px-6 md:px-12 lg:px-24 bg-[#1C2340]">
        <div className="max-w-[1200px] mx-auto">
          <Link href="/life-and-work" className="text-[#C9CCD6] hover:text-white transition-colors text-sm mb-6 inline-block">
            ← Back to The Life and Work
          </Link>
          <h1 className="text-4xl md:text-5xl font-serif text-white mb-6">
            Medical Practice
          </h1>
          <div className="w-24 h-[1px] bg-[#C5A85C]" />
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid md:grid-cols-4 gap-12">
            <div className="md:col-span-1">
              <h2 className="text-3xl font-serif text-white">Medical Practice</h2>
              <div className="w-16 h-[1px] bg-[#C5A85C] mt-4" />
            </div>
            <div className="md:col-span-3 space-y-6">
              <p className="text-[#C9CCD6] leading-relaxed">
                After completing medical education in [Year], he served in various regions, 
                providing care without distinction. This period reflects structured professional 
                responsibility and disciplined service.
              </p>
              <div className="pt-8 border-t border-[#C5A85C]/20">
                <div className="space-y-3">
                  <div className="flex items-center gap-4 text-[#C9CCD6]">
                    <span className="text-[#C5A85C] text-sm font-serif">[Year]</span>
                    <span className="w-16 h-[1px] bg-[#C5A85C]/30" />
                    <span>Degree completion</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#C9CCD6]">
                    <span className="text-[#C5A85C] text-sm font-serif">[Year]</span>
                    <span className="w-16 h-[1px] bg-[#C5A85C]/30" />
                    <span>Initial posting</span>
                  </div>
                  <div className="flex items-center gap-4 text-[#C9CCD6]">
                    <span className="text-[#C5A85C] text-sm font-serif">[Years]</span>
                    <span className="w-16 h-[1px] bg-[#C5A85C]/30" />
                    <span>Service period</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-16 px-6 md:px-12 lg:px-24 border-t border-[#C5A85C]/20">
        <div className="max-w-[1200px] mx-auto flex justify-between items-center">
          <Link href="/life-and-work/early-life" className="text-[#C9CCD6] hover:text-white transition-colors">
            ← Early Life
          </Link>
          <Link 
            href="/life-and-work/the-turning-point" 
            className="group relative px-6 py-3 text-white border border-white/40 hover:border-[#C5A85C] transition-colors"
          >
            <span className="relative z-10">The Turning Point →</span>
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

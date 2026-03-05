"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface TopContributor {
  user_name: string;
  user_email: string;
  _count: {
    id: number;
  };
}

interface TopContributorsProps {
  programType: string;
}

export default function TopContributors({ programType }: TopContributorsProps) {
  const [contributors, setContributors] = useState<TopContributor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTopContributors();
  }, [programType]);

  const fetchTopContributors = async () => {
    try {
      const response = await fetch(`/api/contributions/top?program_type=${programType}&limit=3`);
      if (response.ok) {
        const data = await response.json();
        setContributors(data);
      }
    } catch (error) {
      console.error('Failed to fetch top contributors:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#AAB3CF]">Loading top contributors...</p>
      </div>
    );
  }

  if (contributors.length === 0) {
    return null;
  }

  return (
    <section className="section-spacing bg-[#151A30]">
      <div className="container-premium">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Top Contributors This Month
          </h2>
          <div className="gold-divider long mx-auto mb-6" />
          <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed">
            Recognizing dedicated individuals making consistent contributions to our community.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {contributors.map((contributor, index) => (
            <motion.div
              key={contributor.user_email}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="relative"
            >
              {/* Rank Badge */}
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full flex items-center justify-center font-serif font-bold text-lg z-10"
                style={{
                  background: index === 0 ? 'linear-gradient(135deg, #FFD700, #FFA500)' :
                             index === 1 ? 'linear-gradient(135deg, #C0C0C0, #808080)' :
                             'linear-gradient(135deg, #CD7F32, #8B4513)',
                }}
              >
                <span className="text-[#1C2340]">{index + 1}</span>
              </div>

              {/* Card */}
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 pt-12 text-center hover:border-[#C5A85C]/30 transition-all duration-300">
                {/* Avatar */}
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#C5A85C]/20 to-[#D4BE90]/20 flex items-center justify-center border-2 border-[#C5A85C]/40">
                  <span className="text-[#C5A85C] font-serif text-2xl font-bold">
                    {contributor.user_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>

                {/* Name */}
                <h3 className="font-serif text-xl text-white mb-2">
                  {contributor.user_name}
                </h3>

                {/* Contributions Count */}
                <div className="inline-block px-4 py-2 bg-[#C5A85C]/10 rounded-full mb-4">
                  <p className="text-[#C5A85C] text-sm font-medium">
                    {contributor._count.id} {contributor._count.id === 1 ? 'Contribution' : 'Contributions'}
                  </p>
                </div>

                {/* Email */}
                <p className="text-[#AAB3CF] text-sm">
                  {contributor.user_email}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

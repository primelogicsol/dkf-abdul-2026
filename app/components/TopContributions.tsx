"use client";

import { motion } from "framer-motion";

interface Contribution {
  id: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  task_conducted: string;
  results: string;
  user_name: string;
  submitted_at: string;
}

interface TopContributionsProps {
  contributions: Contribution[];
  programName: string;
}

export default function TopContributions({ contributions, programName }: TopContributionsProps) {
  if (!contributions || contributions.length === 0) {
    return (
      <div className="text-center py-12 bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl">
        <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <p className="text-[#AAB3CF] text-lg">No contributions yet for {programName}</p>
        <p className="text-[#6B7299] text-sm mt-2">Be the first to contribute!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {contributions.map((contribution, index) => (
        <motion.div
          key={contribution.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/30 transition-all duration-500"
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            </div>
            <span className="text-xs px-3 py-1 bg-green-500/20 text-green-400 rounded-full">
              Approved
            </span>
          </div>

          {/* Title */}
          <h3 className="font-serif text-lg text-white mb-3 line-clamp-2">
            {contribution.title}
          </h3>

          {/* Contributor */}
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-6 bg-[#C5A85C]/20 rounded-full flex items-center justify-center">
              <span className="text-[#C5A85C] text-xs font-bold">
                {contribution.user_name.charAt(0).toUpperCase()}
              </span>
            </div>
            <span className="text-[#AAB3CF] text-sm">{contribution.user_name}</span>
          </div>

          {/* Details */}
          <div className="space-y-3 mb-4">
            <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
              <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{new Date(contribution.activity_date).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
              <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <span>{contribution.venue_city}, {contribution.venue_country}</span>
            </div>
            <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
              <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>{contribution.participant_count} participants</span>
            </div>
          </div>

          {/* Task Description */}
          <div className="pt-4 border-t border-[#C5A85C]/10">
            <p className="text-[#AAB3CF] text-sm line-clamp-3">
              {contribution.task_conducted}
            </p>
          </div>

          {/* Results */}
          {contribution.results && (
            <div className="mt-3 pt-3 border-t border-[#C5A85C]/10">
              <p className="text-[#C5A85C] text-xs font-medium mb-1">Impact:</p>
              <p className="text-[#AAB3CF] text-sm line-clamp-2">
                {contribution.results}
              </p>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}

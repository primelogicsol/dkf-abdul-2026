"use client";

import { motion } from "framer-motion";

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
}

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

interface TopContributor {
  user: User;
  contribution_count: number;
  latest_contribution: Contribution;
  collaboration_info?: {
    fullName?: string;
    professionalBackground?: string;
    specialization?: string;
    yearsExperience?: string;
    country?: string;
    email?: string;
    proposedContribution?: string;
  };
}

interface TopContributorsGridProps {
  contributors: TopContributor[];
  programName: string;
  isLoading?: boolean;
}

export default function TopContributorsGrid({ contributors, programName, isLoading }: TopContributorsGridProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-20">
        <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
      </div>
    );
  }

  if (!contributors || contributors.length === 0) {
    return (
      <div className="text-center py-12 bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl">
        <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-[#AAB3CF] text-lg">No contributors yet for {programName}</p>
        <p className="text-[#6B7299] text-sm mt-2">Be the first to contribute!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {contributors.map((contributor, index) => (
        <motion.div
          key={contributor.user.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: index * 0.15 }}
          className={`relative bg-[#232B52] border-2 rounded-2xl p-6 ${
            index === 0 ? 'border-[#C5A85C] shadow-[0_0_30px_rgba(197,168,92,0.2)]' :
            index === 1 ? 'border-[#C5A85C]/40' :
            'border-[#C5A85C]/20'
          } hover:border-[#C5A85C]/40 transition-all duration-500`}
        >
          {/* Rank Badge */}
          {index < 3 && (
            <div className={`absolute -top-3 -right-3 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${
              index === 0 ? 'bg-[#C5A85C] text-[#1C2340]' :
              index === 1 ? 'bg-gray-400 text-white' :
              'bg-orange-600 text-white'
            }`}>
              #{index + 1}
            </div>
          )}

          {/* User Avatar & Info */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C5A85C] to-[#D4BE90] rounded-full flex items-center justify-center text-[#1C2340] font-serif text-2xl font-bold">
              {contributor.user.full_name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1">
              <h3 className="font-serif text-lg text-white mb-1">
                {contributor.user.full_name}
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs px-2 py-1 bg-[#C5A85C]/20 text-[#C5A85C] rounded-full">
                  {contributor.contribution_count} {contributor.contribution_count === 1 ? 'Contribution' : 'Contributions'}
                </span>
                {contributor.collaboration_info?.specialization && (
                  <span className="text-xs px-2 py-1 bg-[#1C2340] text-[#AAB3CF] rounded-full">
                    {contributor.collaboration_info.specialization}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Collaboration Info from Engagement Form */}
          {contributor.collaboration_info && (
            <div className="mb-6 p-4 bg-[#1C2340] rounded-lg border border-[#C5A85C]/10">
              <p className="text-[#C5A85C] text-xs uppercase tracking-wider mb-3">Collaboration Details</p>
              
              {contributor.collaboration_info.professionalBackground && (
                <div className="mb-3">
                  <p className="text-[#6B7299] text-xs mb-1">Professional Background</p>
                  <p className="text-white text-sm">{contributor.collaboration_info.professionalBackground}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-3 mb-3">
                {contributor.collaboration_info.yearsExperience && (
                  <div>
                    <p className="text-[#6B7299] text-xs mb-1">Experience</p>
                    <p className="text-white text-sm">{contributor.collaboration_info.yearsExperience} years</p>
                  </div>
                )}
                {contributor.collaboration_info.country && (
                  <div>
                    <p className="text-[#6B7299] text-xs mb-1">Location</p>
                    <p className="text-white text-sm">{contributor.collaboration_info.country}</p>
                  </div>
                )}
              </div>

              {contributor.collaboration_info.proposedContribution && (
                <div>
                  <p className="text-[#6B7299] text-xs mb-1">Proposed Contribution</p>
                  <p className="text-[#AAB3CF] text-sm line-clamp-3">
                    {contributor.collaboration_info.proposedContribution}
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Latest Contribution */}
          {contributor.latest_contribution && (
            <>
              <div className="pt-4 border-t border-[#C5A85C]/10">
                <p className="text-[#C5A85C] text-xs uppercase tracking-wider mb-2">Latest Activity</p>
                <h4 className="text-white font-medium mb-3 line-clamp-2">
                  {contributor.latest_contribution.title}
                </h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>{new Date(contributor.latest_contribution.activity_date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span>{contributor.latest_contribution.venue_city}, {contributor.latest_contribution.venue_country}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#AAB3CF] text-sm">
                    <svg className="w-4 h-4 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <span>{contributor.latest_contribution.participant_count} participants</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-[#C5A85C]/10">
                  <p className="text-[#AAB3CF] text-sm line-clamp-3">
                    {contributor.latest_contribution.task_conducted}
                  </p>
                </div>

                {contributor.latest_contribution.results && (
                  <div className="mt-3 pt-3 border-t border-[#C5A85C]/10">
                    <p className="text-[#C5A85C] text-xs font-medium mb-1">Impact:</p>
                    <p className="text-[#AAB3CF] text-sm line-clamp-2">
                      {contributor.latest_contribution.results}
                    </p>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      ))}
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { use } from "react";
import PremiumHeader from "../../../components/PremiumHeader";
import PremiumFooter from "../../../components/PremiumFooter";
import {dummyMembers} from "../../../../dumpdata/circle-members";

interface Member {
  id: string;
  full_name: string;
  country: string;
  city?: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: string;
  life_changes: string;
  continuing_engagement: string;
  photo_url?: string;
  media_url?: string;
  gender?: "Male" | "Female";
}



export default function MemberProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const [member, setMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const response = await fetch(`/api/members/${resolvedParams.id}`);
        
        // If API returns successfully with data
        if (response.ok) {
          const data = await response.json();
          if (data) {
            setMember(data);
            setIsLoading(false);
            return;
          }
        }
        
        // If API fails or returns no data, try dummy data
        const foundMember = dummyMembers.find(m => m.id === resolvedParams.id);
        if (foundMember) {
          setMember(foundMember);
        } else {
          setMember(null);
        }
      } catch (error) {
        console.error('Error fetching member:', error);
        // On error, try dummy data
        const foundMember = dummyMembers.find(m => m.id === resolvedParams.id);
        if (foundMember) {
          setMember(foundMember);
        } else {
          setMember(null);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchMember();
  }, [resolvedParams.id]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading member profile...</p>
        </div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-serif text-3xl text-white mb-4">Member Not Found</h2>
          <p className="text-[#AAB3CF] mb-6">The member profile you're looking for doesn't exist.</p>
          <Link
            href="/the-circle/members-directory"
            className="text-[#C5A85C] hover:text-white transition-colors"
          >
            ← Back to Directory
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[15vh] flex items-center justify-center overflow-hidden px-4 py-4 md:py-20">
        <div className="absolute inset-0" />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />

        <div className="relative z-10 max-w-4xl mx-auto w-full text-left md:text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "6rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mb-6 md:mx-auto"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-3xl sm:text-4xl md:text-5xl text-white mb-4 leading-tight"
          >
            {member.full_name}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="text-[#AAB3CF] text-sm sm:text-base md:text-lg flex flex-wrap items-center gap-2 md:justify-center"
          >
            <span>{member.country}{member.city ? ", " + member.city : ""}</span>
            <span className="text-[#C5A85C] hidden sm:inline">|</span>
            <span>{member.profession}</span>
            <span className="text-[#C5A85C] hidden sm:inline">|</span>
            <span>Connected {member.year_connected}</span>
          </motion.p>
        </div>
      </section>

      {/* Content Sections */}
      <section className="py-12 md:py-4 px-4">
        <div className="container-premium max-w-4xl mx-auto">
          <div className="space-y-6 md:space-y-8">
            {/* First Encounter */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-left md:text-center"
            >
              <h4 className="font-serif text-lg md:text-xl text-white mb-2">First Encounter</h4>
              <div className="w-12 h-[1px] bg-[#C5A85C]/40 mb-4 md:mx-auto" />
              <p className="text-[#AAB3CF] text-sm md:text-base leading-relaxed">{member.first_encounter}</p>
            </motion.div>

            {/* Resonated Quality */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-left md:text-center"
            >
              <h4 className="font-serif text-lg md:text-xl text-white mb-2">Resonated Quality</h4>
              <div className="w-12 h-[1px] bg-[#C5A85C]/40 mb-4 md:mx-auto" />
              <p className="text-[#AAB3CF] text-sm md:text-base leading-relaxed">{member.resonated_quality.replace(/_/g, ' ')}</p>
            </motion.div>

            {/* Life Changes */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-left md:text-center"
            >
              <h4 className="font-serif text-lg md:text-xl text-white mb-2">Life Changes</h4>
              <div className="w-12 h-[1px] bg-[#C5A85C]/40 mb-4 md:mx-auto" />
              <p className="text-[#AAB3CF] text-sm md:text-base leading-relaxed">{member.life_changes}</p>
            </motion.div>

            {/* Continuing Engagement */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-left md:text-center"
            >
              <h4 className="font-serif text-lg md:text-xl text-white mb-2">Continuing Engagement</h4>
              <div className="w-12 h-[1px] bg-[#C5A85C]/40 mb-4 md:mx-auto" />
              <p className="text-[#AAB3CF] text-sm md:text-base leading-relaxed">{member.continuing_engagement}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Back to Directory */}
      <section className="py-8 md:py-12 bg-[#151A30] px-4">
        <div className="container-premium max-w-4xl mx-auto">
          <Link
            href="/the-circle/members-directory"
            className="inline-flex items-center text-[#C5A85C] hover:text-white transition-colors group"
          >
            <svg className="w-5 h-5 mr-2 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="text-sm md:text-base">Back to Directory</span>
          </Link>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

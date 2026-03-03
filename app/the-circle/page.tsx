"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import CircleHero from "../components/CircleHero";
import MemberCard from "../components/MemberCard";
import MemberMetricCard from "../components/MemberMetricCard";

interface Member {
  id: number;
  name: string;
  country: string;
  profession: string;
  yearConnected: number;
}

// Sample data
const sampleMembers: Member[] = [
  { id: 1, name: "Ahmed Hassan", country: "Egypt", profession: "Physician", yearConnected: 2018 },
  { id: 2, name: "Sarah Mitchell", country: "United Kingdom", profession: "Educator", yearConnected: 2019 },
  { id: 3, name: "Marcus Weber", country: "Germany", profession: "Engineer", yearConnected: 2017 },
  { id: 4, name: "Fatima Al-Rashid", country: "UAE", profession: "Architect", yearConnected: 2020 },
  { id: 5, name: "James Chen", country: "Singapore", profession: "Researcher", yearConnected: 2019 },
  { id: 6, name: "Elena Popescu", country: "Romania", profession: "Psychologist", yearConnected: 2021 },
  { id: 7, name: "David Okonkwo", country: "Nigeria", profession: "Legal Advisor", yearConnected: 2018 },
  { id: 8, name: "Priya Sharma", country: "India", profession: "Social Worker", yearConnected: 2020 },
];

export default function TheCirclePage() {
  const [members, setMembers] = useState<Member[]>(sampleMembers);

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <CircleHero />

      {/* Overview Section */}
      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl text-white mb-6">
                Overview
              </h2>
              <div className="gold-divider mb-8" />

              <div className="space-y-6 text-[#AAB3CF] leading-relaxed">
                <p>
                  The Circle exists as a documented archive of engagement. It is
                  neither hierarchical nor promotional. Each record reflects
                  structured documentation of first encounter, resonated qualities,
                  and continuing participation.
                </p>
                <p>
                  All submissions undergo moderation before publication. This ensures
                  clarity of language, accuracy of representation, and alignment with
                  the Foundation&apos;s standards for responsible documentation.
                </p>
                <p>
                  The Circle is maintained through the stewardship of the Foundation
                  and represents a living archive of individuals engaged with this
                  orientation across diverse contexts and regions.
                </p>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href="/the-circle/members-directory"
                  className="group inline-flex items-center text-[#C5A85C] font-medium"
                >
                  <span className="transition-all duration-300 group-hover:translate-x-2">
                    View Full Directory
                  </span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
            </motion.div>

            {/* Right: Metric Cards */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-4"
            >
              <MemberMetricCard
                value={150}
                label="Members Documented"
                suffix="+"
                delay={0.3}
              />
              <MemberMetricCard
                value={30}
                label="Countries Represented"
                suffix="+"
                delay={0.4}
              />
              <MemberMetricCard
                value={10}
                label="Years of Continuity"
                suffix="+"
                delay={0.5}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Members Directory Preview */}
      <section className="section-spacing bg-[#1C2340] relative">
        <div className="container-premium">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-white mb-2">
                Members Directory
              </h2>
              <div className="gold-divider" />
            </div>
            <Link
              href="/the-circle/members-directory"
              className="text-[#AAB3CF] hover:text-white transition-colors text-sm flex items-center gap-2"
            >
              <span>View All</span>
              <svg
                className="w-4 h-4"
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
          </motion.div>

          {/* Members Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {members.slice(0, 4).map((member, index) => (
              <MemberCard
                key={member.id}
                id={member.id.toString()}
                name={member.name}
                country={member.country}
                profession={member.profession}
                yearConnected={member.yearConnected}
                delay={0.1 * (index + 1)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Participation Guidelines Preview */}
      <section className="section-spacing bg-[#151A30] relative overflow-hidden">
        <div className="absolute inset-0 pattern-subtle opacity-20" />

        <div className="container-premium relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4 text-center">
              Participation Guidelines
            </h2>
            <div className="gold-divider long mx-auto mb-8" />

            <ul className="space-y-4 text-[#AAB3CF]">
              {[
                "Maintain clarity of language in all documentation",
                "Avoid exaggeration or mystical claims",
                "No hierarchical claims or status distinctions",
                "Respect structured documentation format",
                "All submissions subject to moderation",
              ].map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  className="flex items-start gap-3"
                >
                  <span className="text-[#C5A85C] mt-1">•</span>
                  <span>{item}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 text-center">
              <Link
                href="/the-circle/participation-guidelines"
                className="text-[#C5A85C] font-medium inline-flex items-center group"
              >
                <span className="transition-all duration-300 group-hover:translate-x-2">
                  Read Full Guidelines
                </span>
                <svg
                  className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1"
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
          </motion.div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-24 bg-[#1C2340] relative">
        <div className="container-premium">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
              Submit for Inclusion
            </h2>
            <div className="gold-divider long mx-auto mb-6" />
            <p className="text-[#AAB3CF] max-w-2xl mx-auto leading-relaxed mb-12">
              Individuals seeking inclusion must submit structured documentation.
              All submissions undergo review prior to publication.
            </p>
            <Link
              href="/the-circle/registration"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Register for The Circle</span>
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
          </motion.div>
        </div>
      </section>

      {/* Navigation CTA */}
      <section className="py-16 bg-[#151A30] border-t border-[#C5A85C]/10">
        <div className="container-premium">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <Link
              href="/core-principles"
              className="text-[#AAB3CF] hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              <span>Core Principles</span>
            </Link>

            <Link
              href="/global-presence"
              className="group inline-flex items-center px-8 py-4 bg-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] hover:-translate-y-1"
            >
              <span>Global Presence</span>
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

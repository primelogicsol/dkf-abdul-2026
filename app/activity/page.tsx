"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Contribution {
  id: string;
  program_type: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  status: string;
  submitted_at: string;
}

interface MonthlyData {
  month: string;
  count: number;
}

const programNames: Record<string, string> = {
  'healing-initiatives': 'Healing Initiatives',
  'environmental-programs': 'Environmental Programs',
  'youth-engagement': 'Youth Engagement',
  'sufi-music': 'Sufi Music',
  'sufi-ecommerce': 'Sufi Ecommerce',
  'sufi-science': 'Sufi Science',
  'interfaith-program': 'Interfaith Program',
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function ActivityPage() {
  const [user, setUser] = useState<User | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');

  useEffect(() => {
    const checkSession = async () => {
      const session = localStorage.getItem("user_session");
      if (!session) {
        window.location.href = '/auth/login';
        return;
      }

      const userData = JSON.parse(session);
      setUser(userData);

      try {
        const response = await fetch(`/api/contributions?user_id=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setContributions(data);
          
          // Calculate monthly data for the last 6 months
          const now = new Date();
          const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
          
          const monthlyCounts: Record<string, number> = {};
          
          // Initialize last 6 months with 0
          for (let i = 5; i >= 0; i--) {
            const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            monthlyCounts[key] = 0;
          }
          
          // Count contributions per month
          data.forEach((contribution: Contribution) => {
            const date = new Date(contribution.submitted_at);
            if (date >= sixMonthsAgo) {
              const key = `${date.getFullYear()}-${date.getMonth()}`;
              monthlyCounts[key] = (monthlyCounts[key] || 0) + 1;
            }
          });
          
          // Convert to array for rendering
          const monthlyArray: MonthlyData[] = Object.entries(monthlyCounts)
            .map(([key, count]) => {
              const [year, month] = key.split('-').map(Number);
              return {
                month: monthNames[month],
                count,
              };
            });
          
          setMonthlyData(monthlyArray);
        }
      } catch (error) {
        console.error('Failed to fetch contributions:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const filteredContributions = filter === 'all' 
    ? contributions 
    : contributions.filter(c => c.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="bg-[#1C2340] min-h-screen">
        <PremiumHeader />
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
            <p className="text-[#AAB3CF]">Loading activities...</p>
          </div>
        </div>
        <PremiumFooter />
      </div>
    );
  }

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "8rem" }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-[2px] bg-gradient-to-r from-transparent via-[#C5A85C] to-transparent mx-auto mb-8"
          />

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-4xl md:text-5xl text-white mb-6"
          >
            My
            <span className="gradient-gold"> Activities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Track your contributions and engagement across all programs.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-6xl">
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-4 gap-4 mb-8"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="text-3xl font-serif text-white mb-1">{contributions.length}</div>
              <div className="text-[#AAB3CF] text-sm">Total Activities</div>
            </div>
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="text-3xl font-serif text-amber-400 mb-1">
                {contributions.filter(c => c.status === 'pending').length}
              </div>
              <div className="text-[#AAB3CF] text-sm">Pending</div>
            </div>
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="text-3xl font-serif text-green-400 mb-1">
                {contributions.filter(c => c.status === 'approved').length}
              </div>
              <div className="text-[#AAB3CF] text-sm">Approved</div>
            </div>
            <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
              <div className="text-3xl font-serif text-red-400 mb-1">
                {contributions.filter(c => c.status === 'rejected').length}
              </div>
              <div className="text-[#AAB3CF] text-sm">Rejected</div>
            </div>
          </motion.div>

          {/* Monthly Activity Chart */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 mb-8"
          >
            <h3 className="font-serif text-lg text-white mb-6">Monthly Activity Overview</h3>
            <div className="flex items-end justify-between gap-2 h-48">
              {monthlyData.map((data, index) => {
                const maxCount = Math.max(...monthlyData.map(d => d.count), 1);
                const height = (data.count / maxCount) * 100;
                
                return (
                  <div key={index} className="flex-1 flex flex-col items-center gap-2">
                    <div className="w-full relative flex items-end justify-center h-40">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${height}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className={`w-full max-w-[60px] rounded-t-lg transition-all ${
                          data.count > 0 
                            ? 'bg-gradient-to-t from-[#C5A85C] to-[#D4BE90]' 
                            : 'bg-[#232B52] border border-[#C5A85C]/20'
                        }`}
                        style={{ minHeight: data.count > 0 ? '20px' : '0' }}
                      >
                        {data.count > 0 && (
                          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-white text-sm font-medium">
                            {data.count}
                          </div>
                        )}
                      </motion.div>
                    </div>
                    <span className="text-[#AAB3CF] text-xs font-medium">{data.month}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Filters & Actions */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex gap-3">
              {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 text-sm uppercase tracking-wider border transition-colors ${
                    filter === status
                      ? 'bg-[#C5A85C] border-[#C5A85C] text-[#1C2340]'
                      : 'border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
            <Link
              href="/dashboard/contribute"
              className="px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium"
            >
              New Contribution
            </Link>
          </div>

          {/* Activities List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
          >
            {filteredContributions.length === 0 ? (
              <div className="p-12 text-center text-[#AAB3CF]">
                <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mb-4">No activities found</p>
                <Link
                  href="/dashboard/contribute"
                  className="text-[#C5A85C] hover:text-white transition-colors"
                >
                  Submit your first contribution →
                </Link>
              </div>
            ) : (
              <div className="divide-y divide-[#C5A85C]/10">
                {filteredContributions.map((contribution) => (
                  <div key={contribution.id} className="p-6 hover:bg-[#1C2340]/50 transition-colors">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-serif text-lg text-white">{contribution.title}</h3>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                            {contribution.status === 'approved' ? 'Approved' :
                             contribution.status === 'rejected' ? 'Rejected' :
                             'Pending Review'}
                          </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-[#AAB3CF] mb-3">
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                            </svg>
                            {programNames[contribution.program_type]}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            </svg>
                            {contribution.venue_city}, {contribution.venue_country}
                          </span>
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            {contribution.participant_count} {contribution.participant_count === 1 ? 'Participant' : 'Participants'}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#6B7299]">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          Submitted on {new Date(contribution.submitted_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

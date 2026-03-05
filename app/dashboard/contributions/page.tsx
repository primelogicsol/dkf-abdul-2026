"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
  admin_comment?: string;
  submitted_at: string;
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

export default function UserContributionsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [contributions, setContributions] = useState<Contribution[]>([]);
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
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading contributions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C2340]">
      {/* Header */}
      <header className="h-20 bg-[#1C2340] border-b border-[#C5A85C]/20 flex items-center justify-between px-8">
        <div>
          <h1 className="text-white font-serif text-2xl">My Contributions</h1>
          <p className="text-[#AAB3CF] text-sm">Track your monthly activities</p>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="text-[#AAB3CF] hover:text-white transition-colors text-sm">
            ← Back to Dashboard
          </Link>
          <Link
            href="/dashboard/contribute"
            className="px-6 py-2 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium"
          >
            Submit New
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-white mb-1">{contributions.length}</div>
            <div className="text-[#AAB3CF] text-sm">Total</div>
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

        {/* Filters */}
        <div className="flex gap-3 mb-6">
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

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
        >
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Title</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Date</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Location</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Participants</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {filteredContributions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-[#AAB3CF]">
                    No contributions found
                  </td>
                </tr>
              ) : (
                filteredContributions.map((contribution) => (
                  <tr key={contribution.id} className="hover:bg-[#1C2340]/50 transition-colors">
                    <td className="px-6 py-4 text-white text-sm">
                      {programNames[contribution.program_type]}
                    </td>
                    <td className="px-6 py-4 text-white text-sm font-medium">
                      {contribution.title}
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                      {new Date(contribution.activity_date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                      {contribution.venue_city}, {contribution.venue_country}
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                      {contribution.participant_count}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                        {contribution.status === 'approved' ? 'Approved' :
                         contribution.status === 'rejected' ? 'Rejected' :
                         'Pending Review'}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </motion.div>

        {/* Monthly Activity Reminder */}
        {contributions.filter(c => {
          const submittedDate = new Date(c.submitted_at);
          const now = new Date();
          return submittedDate.getMonth() === now.getMonth() && 
                 submittedDate.getFullYear() === now.getFullYear();
        }).length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 bg-amber-500/10 border border-amber-500/30 rounded-xl p-6 text-center"
          >
            <p className="text-amber-400 font-medium mb-2">
              ⚠️ Monthly Activity Required
            </p>
            <p className="text-[#AAB3CF] text-sm">
              You haven't submitted any activity this month. Minimum 1 activity per month is required.
            </p>
            <Link
              href="/dashboard/contribute"
              className="inline-block mt-4 px-6 py-2 bg-amber-500/20 border border-amber-500/40 text-amber-400 rounded-lg hover:bg-amber-500/30 transition-all"
            >
              Submit Activity Now
            </Link>
          </motion.div>
        )}
      </main>
    </div>
  );
}

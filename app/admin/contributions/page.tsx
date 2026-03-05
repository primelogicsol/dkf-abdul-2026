"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Contribution {
  id: string;
  user_name: string;
  user_email: string;
  program_type: string;
  title: string;
  activity_date: string;
  venue_city: string;
  venue_country: string;
  participant_count: number;
  participant_phones: string;
  task_conducted: string;
  results: string;
  status: string;
  admin_comment?: string;
  submitted_at: string;
}

interface MonthlyData {
  month: string;
  count: number;
  approved: number;
  pending: number;
  rejected: number;
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

export default function AdminContributionsPage() {
  const [contributions, setContributions] = useState<Contribution[]>([]);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [programFilter, setProgramFilter] = useState<string>('all');
  const [roleFilter, setRoleFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContribution, setSelectedContribution] = useState<Contribution | null>(null);
  const [adminComment, setAdminComment] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@dkf.sufisciencecenter.info", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchContributions();
  }, [statusFilter, programFilter]);

  const fetchContributions = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      params.set('status', statusFilter);
      if (programFilter !== 'all') params.set('program_type', programFilter);

      const response = await fetch(`/api/admin/contributions?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setContributions(data);
        
        // Calculate monthly data for chart
        const now = new Date();
        const sixMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 5, 1);
        
        const monthlyCounts: Record<string, { count: number; approved: number; pending: number; rejected: number }> = {};
        
        // Initialize last 6 months
        for (let i = 5; i >= 0; i--) {
          const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
          const key = `${date.getFullYear()}-${date.getMonth()}`;
          monthlyCounts[key] = { count: 0, approved: 0, pending: 0, rejected: 0 };
        }
        
        // Count by status
        data.forEach((c: Contribution) => {
          const date = new Date(c.submitted_at);
          if (date >= sixMonthsAgo) {
            const key = `${date.getFullYear()}-${date.getMonth()}`;
            if (monthlyCounts[key]) {
              monthlyCounts[key].count++;
              if (c.status === 'approved') monthlyCounts[key].approved++;
              else if (c.status === 'pending') monthlyCounts[key].pending++;
              else if (c.status === 'rejected') monthlyCounts[key].rejected++;
            }
          }
        });
        
        // Convert to array
        const monthlyArray: MonthlyData[] = Object.entries(monthlyCounts)
          .map(([key, data]) => {
            const [year, month] = key.split('-').map(Number);
            return {
              month: monthNames[month],
              count: data.count,
              approved: data.approved,
              pending: data.pending,
              rejected: data.rejected,
            };
          });
        
        setMonthlyData(monthlyArray);
      }
    } catch (error) {
      console.error('Failed to fetch contributions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReview = async (id: string, status: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/contributions/${id}/review`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          status,
          adminComment,
          adminId: user.id,
          programType: selectedContribution?.program_type,
        }),
      });

      if (response.ok) {
        fetchContributions();
        setSelectedContribution(null);
        setAdminComment('');
      }
    } catch (error) {
      console.error('Failed to review contribution:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'revision_requested': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const filteredContributions = contributions.filter(c => {
    const matchesSearch = c.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.user_email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-3xl font-serif text-white mb-2">Contribution Reviews</h2>
        <p className="text-[#AAB3CF]">Review and approve user contributions from all programs</p>
      </div>

      {/* Filters */}
      <div className="flex gap-4 mb-8 flex-wrap">
        {(['pending', 'approved', 'rejected', 'all'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-4 py-2 text-xs uppercase tracking-wider border transition-colors ${
              statusFilter === status
                ? 'bg-[#C5A85C] border-[#C5A85C] text-[#1C2340]'
                : 'border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]'
            }`}
          >
            {status}
          </button>
        ))}

        <select
          value={programFilter}
          onChange={(e) => setProgramFilter(e.target.value)}
          className="bg-[#232B52] border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]"
        >
          <option value="all">All Programs</option>
          {Object.entries(programNames).map(([key, name]) => (
            <option key={key} value={key}>{name}</option>
          ))}
        </select>

        <input
          type="text"
          placeholder="Search by user..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="bg-[#232B52] border border-white/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C] flex-1 min-w-[200px]"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
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
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {contributions.length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Total</div>
        </div>
      </div>

      {/* Monthly Activity Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 mb-8"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg text-white">Monthly Contribution Overview</h3>
          <div className="flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
              <span className="text-[#AAB3CF]">Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-amber-500 rounded-sm"></div>
              <span className="text-[#AAB3CF]">Pending</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-red-500 rounded-sm"></div>
              <span className="text-[#AAB3CF]">Rejected</span>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-2 h-64">
          {monthlyData.map((data, index) => {
            const maxCount = Math.max(...monthlyData.map(d => d.count), 1);
            const approvedHeight = (data.approved / maxCount) * 100;
            const pendingHeight = (data.pending / maxCount) * 100;
            const rejectedHeight = (data.rejected / maxCount) * 100;
            
            return (
              <div key={index} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full relative flex items-end justify-center h-52 gap-1">
                  {/* Stacked bar */}
                  <div className="w-full max-w-[60px] flex flex-col justify-end gap-0.5">
                    {data.approved > 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${approvedHeight}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-green-500 rounded-t-sm min-h-[4px]"
                      />
                    )}
                    {data.pending > 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${pendingHeight}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-amber-500 min-h-[4px]"
                      />
                    )}
                    {data.rejected > 0 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${rejectedHeight}%` }}
                        transition={{ duration: 0.5, delay: index * 0.1 }}
                        className="bg-red-500 rounded-b-sm min-h-[4px]"
                      />
                    )}
                  </div>
                </div>
                <span className="text-[#AAB3CF] text-xs font-medium">{data.month}</span>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Table */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Program</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Title</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Date</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Participants</th>
              <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Status</th>
              <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {loading ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[#AAB3CF]">Loading contributions...</td>
              </tr>
            ) : filteredContributions.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-[#AAB3CF]">
                  No contributions found
                </td>
              </tr>
            ) : (
              filteredContributions.map((contribution) => (
                <tr key={contribution.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div>
                      <div className="text-white font-medium">{contribution.user_name}</div>
                      <div className="text-[#AAB3CF] text-sm">{contribution.user_email}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                    {programNames[contribution.program_type]}
                  </td>
                  <td className="px-6 py-4 text-white text-sm">
                    {contribution.title}
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                    {new Date(contribution.activity_date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                    {contribution.participant_count}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(contribution.status)}`}>
                      {contribution.status === 'approved' ? 'Approved' :
                       contribution.status === 'rejected' ? 'Rejected' :
                       contribution.status === 'revision_requested' ? 'Revision Requested' :
                       'Pending Review'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => {
                          setSelectedContribution(contribution);
                          setAdminComment(contribution.admin_comment || '');
                        }}
                        className="px-4 py-2 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] hover:text-white transition-colors"
                      >
                        Review
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Review Modal */}
      {selectedContribution && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto rounded-2xl">
            <div className="p-6 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52]">
              <h3 className="text-white font-serif text-xl">Review Contribution</h3>
              <button
                onClick={() => {
                  setSelectedContribution(null);
                  setAdminComment('');
                }}
                className="text-[#C9CCD6] hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* User Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-1">Contributor</p>
                  <p className="text-white">{selectedContribution.user_name}</p>
                  <p className="text-[#AAB3CF] text-sm">{selectedContribution.user_email}</p>
                </div>
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-1">Program</p>
                  <p className="text-white">{programNames[selectedContribution.program_type]}</p>
                </div>
              </div>

              {/* Activity Details */}
              <div className="bg-[#1C2340] rounded-xl p-4 space-y-3">
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-1">Title</p>
                  <p className="text-white">{selectedContribution.title}</p>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Date</p>
                    <p className="text-white">{new Date(selectedContribution.activity_date).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Location</p>
                    <p className="text-white">{selectedContribution.venue_city}, {selectedContribution.venue_country}</p>
                  </div>
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Participants</p>
                    <p className="text-white">{selectedContribution.participant_count}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-1">Contact Numbers</p>
                  <p className="text-[#AAB3CF] text-sm">{selectedContribution.participant_phones}</p>
                </div>
              </div>

              {/* Task & Results */}
              <div className="space-y-4">
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-2">Task Conducted</p>
                  <p className="text-[#C9CCD6] leading-relaxed">{selectedContribution.task_conducted}</p>
                </div>
                <div>
                  <p className="text-[#C5A85C] text-xs uppercase mb-2">Results / Outcomes</p>
                  <p className="text-[#C9CCD6] leading-relaxed">{selectedContribution.results}</p>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Admin Comment
                </label>
                <textarea
                  value={adminComment}
                  onChange={(e) => setAdminComment(e.target.value)}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] min-h-[100px]"
                  placeholder="Add your review comments..."
                />
              </div>
            </div>

            <div className="p-6 border-t border-[#C5A85C]/20 flex justify-between items-center sticky bottom-0 bg-[#232B52]">
              {selectedContribution.status === 'pending' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => handleReview(selectedContribution.id, 'rejected')}
                    disabled={actionLoading === selectedContribution.id}
                    className="px-6 py-3 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50"
                  >
                    {actionLoading === selectedContribution.id ? 'Processing...' : 'Reject'}
                  </button>
                  <button
                    onClick={() => handleReview(selectedContribution.id, 'revision_requested')}
                    disabled={actionLoading === selectedContribution.id}
                    className="px-6 py-3 border border-blue-500/40 text-blue-400 rounded-lg hover:bg-blue-500/10 transition-all disabled:opacity-50"
                  >
                    {actionLoading === selectedContribution.id ? 'Processing...' : 'Request Revision'}
                  </button>
                  <button
                    onClick={() => handleReview(selectedContribution.id, 'approved')}
                    disabled={actionLoading === selectedContribution.id}
                    className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50"
                  >
                    {actionLoading === selectedContribution.id ? 'Processing...' : 'Approve'}
                  </button>
                </div>
              )}
              <button
                onClick={() => {
                  setSelectedContribution(null);
                  setAdminComment('');
                }}
                className="px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Registration {
  id: string;
  full_name: string;
  country: string;
  profession: string;
  year_connected: number;
  resonated_quality: string;
  first_encounter: string;
  life_changes: string;
  continuing_engagement: string;
  review_status: 'pending' | 'approved' | 'rejected';
  created_at: string;
}

export default function RegistrationsPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('pending');
  const [selectedRegistration, setSelectedRegistration] = useState<Registration | null>(null);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Registration>>({});

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchRegistrations();
  }, [filter]);

  const fetchRegistrations = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations?status=${filter}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRegistrations(data);
      }
    } catch (error) {
      console.error('Failed to fetch registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}/approve`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
        setEditMode(false);
      }
    } catch (error) {
      console.error('Failed to approve registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm('Are you sure you want to reject this registration?')) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}/reject`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Failed to reject registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this registration?')) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRegistrations();
        setSelectedRegistration(null);
      }
    } catch (error) {
      console.error('Failed to delete registration:', error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/registrations/${selectedRegistration?.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedRegistration(updated);
        setEditMode(false);
        fetchRegistrations();
      }
    } catch (error) {
      console.error('Failed to update registration:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-GB', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'approved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <div className="flex items-center gap-4 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-[#C5A85C] to-[#D4BE90] rounded-xl flex items-center justify-center shadow-lg shadow-[#C5A85C]/20">
            <svg className="w-6 h-6 text-[#1C2340]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-serif text-white">Circle Member Requests</h2>
            <p className="text-[#AAB3CF] text-sm mt-1">Review and manage Circle membership submissions</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-3 mt-6">
          {(['all', 'pending', 'approved', 'rejected'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-6 py-2.5 text-sm font-medium rounded-xl transition-all duration-300 capitalize ${
                filter === status
                  ? 'bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] shadow-lg shadow-[#C5A85C]/30'
                  : 'bg-[#232B52] text-[#AAB3CF] hover:text-white hover:bg-[#232B52]/80 border border-[#C5A85C]/20'
              }`}
            >
              {status}
              {status === 'pending' && (
                <span className="ml-2 px-2 py-0.5 bg-[#1C2340]/20 rounded-full text-xs">
                  {registrations.filter(r => r.review_status === 'pending').length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          { label: 'Total Requests', value: registrations.length, color: 'from-blue-500/20 to-blue-600/20', borderColor: 'border-blue-500/30', textColor: 'text-blue-400' },
          { label: 'Pending Review', value: registrations.filter(r => r.review_status === 'pending').length, color: 'from-amber-500/20 to-amber-600/20', borderColor: 'border-amber-500/30', textColor: 'text-amber-400' },
          { label: 'Approved', value: registrations.filter(r => r.review_status === 'approved').length, color: 'from-green-500/20 to-green-600/20', borderColor: 'border-green-500/30', textColor: 'text-green-400' },
          { label: 'Rejected', value: registrations.filter(r => r.review_status === 'rejected').length, color: 'from-red-500/20 to-red-600/20', borderColor: 'border-red-500/30', textColor: 'text-red-400' },
        ].map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`bg-gradient-to-br ${stat.color} border ${stat.borderColor} rounded-2xl p-6 backdrop-blur-sm`}
          >
            <div className={`text-4xl font-serif ${stat.textColor} mb-2`}>{stat.value}</div>
            <div className="text-[#AAB3CF] text-sm">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl overflow-hidden shadow-xl"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gradient-to-r from-[#1C2340] to-[#232B52] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Name</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Country</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Profession</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Year</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Submitted</th>
                <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Status</th>
                <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider font-semibold px-8 py-5">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-16 text-center">
                    <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
                    <p className="text-[#AAB3CF]">Loading registrations...</p>
                  </td>
                </tr>
              ) : registrations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-16 text-center">
                    <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-[#AAB3CF]">No {filter !== 'all' ? filter : ''} registrations found</p>
                  </td>
                </tr>
              ) : (
                registrations.map((reg, index) => (
                  <motion.tr
                    key={reg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-[#1C2340]/50 transition-all duration-300 cursor-pointer group"
                    onClick={() => {
                      setSelectedRegistration(reg);
                      setEditMode(false);
                    }}
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C5A85C]/20 to-[#D4BE90]/20 flex items-center justify-center border border-[#C5A85C]/30">
                          <span className="text-[#C5A85C] font-serif text-sm font-bold">
                            {reg.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </span>
                        </div>
                        <div>
                          <div className="text-white font-medium group-hover:text-[#C5A85C] transition-colors">{reg.full_name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-[#AAB3CF] text-sm">{reg.country}</td>
                    <td className="px-8 py-5 text-[#AAB3CF] text-sm">{reg.profession}</td>
                    <td className="px-8 py-5 text-[#AAB3CF] text-sm">{reg.year_connected}</td>
                    <td className="px-8 py-5 text-[#AAB3CF] text-sm">{formatDate(reg.created_at)}</td>
                    <td className="px-8 py-5">
                      <span className={`px-4 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(reg.review_status)}`}>
                        {reg.review_status}
                      </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRegistration(reg);
                            setEditMode(false);
                          }}
                          className="px-4 py-2 text-xs font-medium bg-[#C5A85C]/10 text-[#C5A85C] rounded-lg hover:bg-[#C5A85C]/20 transition-all border border-[#C5A85C]/30"
                        >
                          View
                        </button>
                        {reg.review_status === 'pending' && (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleApprove(reg.id);
                              }}
                              disabled={actionLoading === reg.id}
                              className="px-4 py-2 text-xs font-medium bg-green-500/10 text-green-400 rounded-lg hover:bg-green-500/20 transition-all border border-green-500/30 disabled:opacity-50"
                            >
                              {actionLoading === reg.id ? (
                                <svg className="w-4 h-4 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : 'Approve'}
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleReject(reg.id);
                              }}
                              disabled={actionLoading === reg.id}
                              className="px-4 py-2 text-xs font-medium bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-all border border-red-500/30 disabled:opacity-50"
                            >
                              {actionLoading === reg.id ? (
                                <svg className="w-4 h-4 animate-spin mx-auto" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                </svg>
                              ) : 'Reject'}
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Detail Modal */}
      {selectedRegistration && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-4xl my-8 max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl"
          >
            <div className="p-8 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52] backdrop-blur-sm z-10">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-[#C5A85C] to-[#D4BE90] rounded-xl flex items-center justify-center">
                  <span className="text-[#1C2340] font-serif text-lg font-bold">
                    {selectedRegistration.full_name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                  </span>
                </div>
                <div>
                  <h3 className="text-white font-serif text-xl">{selectedRegistration.full_name}</h3>
                  <p className="text-[#AAB3CF] text-sm">{selectedRegistration.profession} • {selectedRegistration.country}</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setSelectedRegistration(null);
                  setEditMode(false);
                }}
                className="text-[#AAB3CF] hover:text-white transition-colors p-2 hover:bg-[#1C2340] rounded-lg"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-8 space-y-8">
              {editMode ? (
                <>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">Full Name</label>
                      <input
                        type="text"
                        value={editedData.full_name ?? selectedRegistration.full_name}
                        onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
                        className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                      />
                    </div>
                    <div>
                      <label className="block text-[#C5A85C] text-xs uppercase mb-2 font-medium">Country</label>
                      <input
                        type="text"
                        value={editedData.country ?? selectedRegistration.country}
                        onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                        className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] rounded-lg"
                      />
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {/* Journey Section */}
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-[#C5A85C] text-xs uppercase mb-3 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        First Encounter
                      </h4>
                      <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-5 border border-[#C5A85C]/10">
                        {selectedRegistration.first_encounter}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[#C5A85C] text-xs uppercase mb-3 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                        Resonated Quality
                      </h4>
                      <p className="text-white bg-[#1C2340]/50 rounded-xl px-5 py-3 border border-[#C5A85C]/10">
                        {selectedRegistration.resonated_quality.replace(/_/g, ' ')}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[#C5A85C] text-xs uppercase mb-3 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                        </svg>
                        Life Changes
                      </h4>
                      <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-5 border border-[#C5A85C]/10">
                        {selectedRegistration.life_changes}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-[#C5A85C] text-xs uppercase mb-3 font-semibold flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z" />
                        </svg>
                        Continuing Engagement
                      </h4>
                      <p className="text-[#C9CCD6] leading-relaxed bg-[#1C2340]/50 rounded-xl p-5 border border-[#C5A85C]/10">
                        {selectedRegistration.continuing_engagement}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <div className="p-8 border-t border-[#C5A85C]/20 flex justify-between items-center sticky bottom-0 bg-[#232B52] backdrop-blur-sm">
              <div className="flex gap-3">
                {selectedRegistration.review_status === 'pending' && !editMode && (
                  <>
                    <button
                      onClick={() => handleReject(selectedRegistration.id)}
                      disabled={actionLoading === selectedRegistration.id}
                      className="px-6 py-3 border border-red-500/40 text-red-400 text-sm font-medium rounded-xl hover:bg-red-500/10 transition-all disabled:opacity-50"
                    >
                      {actionLoading === selectedRegistration.id ? 'Processing...' : 'Reject'}
                    </button>
                    <button
                      onClick={() => handleApprove(selectedRegistration.id)}
                      disabled={actionLoading === selectedRegistration.id}
                      className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-xl hover:from-green-600 hover:to-green-700 transition-all shadow-lg shadow-green-500/30 disabled:opacity-50"
                    >
                      {actionLoading === selectedRegistration.id ? 'Processing...' : 'Approve'}
                    </button>
                  </>
                )}
              </div>
              <div className="flex gap-3">
                {editMode ? (
                  <>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setEditedData({});
                      }}
                      className="px-6 py-3 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-xl hover:border-[#C5A85C] transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-6 py-3 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] text-sm font-medium rounded-xl hover:from-[#D4BE90] hover:to-[#C5A85C] transition-all shadow-lg shadow-[#C5A85C]/30"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleDelete(selectedRegistration.id)}
                      className="px-6 py-3 text-[#AAB3CF] text-sm font-medium hover:text-red-400 transition-all"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setEditedData({});
                      }}
                      className="px-6 py-3 border border-white/20 text-[#C9CCD6] text-sm font-medium rounded-xl hover:border-[#C5A85C] transition-all"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

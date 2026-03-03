"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface EngagementRequest {
  id: string;
  program_type: string;
  form_type: string;
  payload: string;
  status: string;
  created_at: string;
  reviewed_at?: string;
  reviewed_by?: string;
}

export default function AdminEngagementPage() {
  const [filter, setFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<EngagementRequest | null>(null);
  const [requests, setRequests] = useState<EngagementRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchRequests();
  }, [filter]);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (filter !== "all") params.set("status", filter);

      const response = await fetch(`/api/admin/engagement?${params}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      }
    } catch (error) {
      console.error("Failed to fetch engagement requests:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (id: string) => {
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}/approve`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to approve engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!confirm("Are you sure you want to reject this engagement request?")) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}/reject`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to reject engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this engagement request?")) return;
    setActionLoading(id);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/engagement/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchRequests();
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error("Failed to delete engagement request:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const filteredRequests = requests.filter((req) => {
    if (filter === "all") return true;
    return req.status === filter;
  });

  const statusColors: Record<string, string> = {
    pending: "bg-amber-500/20 text-amber-400",
    approved: "bg-green-500/20 text-green-400",
    rejected: "bg-red-500/20 text-red-400",
    reviewed: "bg-blue-500/20 text-blue-400",
  };

  const getPayload = (payloadString: string) => {
    try {
      return JSON.parse(payloadString);
    } catch {
      return {};
    }
  };

  const formatProgramName = (programType: string) => {
    return programType
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">Engagement Requests</h2>
          <p className="text-[#AAB3CF]">Review and manage program engagement submissions</p>
        </div>
        <div className="flex items-center gap-4">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]/60"
          >
            <option value="all">All Requests</option>
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
            <option value="reviewed">Reviewed</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {requests.filter((r) => r.status === "pending").length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Pending</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-[#C5A85C] mb-1">
            {requests.filter((r) => r.status === "approved").length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Approved</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {requests.filter((r) => r.status === "rejected").length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Rejected</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {requests.length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Total</div>
        </div>
      </div>

      {/* Requests Table */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#AAB3CF]">Loading engagement requests...</div>
        ) : filteredRequests.length === 0 ? (
          <div className="text-center py-12">
            <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <p className="text-[#AAB3CF]">No engagement requests found</p>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Name</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Program</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Type</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Country</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Date</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Status</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {filteredRequests.map((request) => {
                const payload = getPayload(request.payload);
                return (
                  <tr key={request.id} className="hover:bg-[#1C2340]/50 transition-colors">
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-white font-medium">{payload.fullName || "N/A"}</div>
                        <div className="text-[#AAB3CF] text-sm">{payload.email || "N/A"}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                      {formatProgramName(request.program_type)}
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm capitalize">
                      {request.form_type}
                    </td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">{payload.country || "N/A"}</td>
                    <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                      {new Date(request.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-3 py-1 rounded-full ${statusColors[request.status]}`}>
                        {request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => setSelectedRequest(request)}
                        className="text-[#C5A85C] hover:text-white text-sm transition-colors"
                      >
                        View Details →
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedRequest && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
          >
            <div className="p-6 border-b border-[#C5A85C]/10 flex items-center justify-between">
              <h3 className="font-serif text-xl text-white">Request Details</h3>
              <button
                onClick={() => setSelectedRequest(null)}
                className="text-[#AAB3CF] hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 space-y-4">
              {(() => {
                const payload = getPayload(selectedRequest.payload);
                return (
                  <>
                    <div>
                      <label className="text-[#AAB3CF] text-sm">Full Name</label>
                      <p className="text-white">{payload.fullName || "N/A"}</p>
                    </div>
                    <div>
                      <label className="text-[#AAB3CF] text-sm">Email</label>
                      <p className="text-white">{payload.email || "N/A"}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Program</label>
                        <p className="text-white">{formatProgramName(selectedRequest.program_type)}</p>
                      </div>
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Form Type</label>
                        <p className="text-white capitalize">{selectedRequest.form_type}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Country</label>
                        <p className="text-white">{payload.country || "N/A"}</p>
                      </div>
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Submitted</label>
                        <p className="text-white">{new Date(selectedRequest.created_at).toLocaleString()}</p>
                      </div>
                    </div>
                    {selectedRequest.status !== "pending" && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-[#AAB3CF] text-sm">Reviewed At</label>
                          <p className="text-white">
                            {selectedRequest.reviewed_at
                              ? new Date(selectedRequest.reviewed_at).toLocaleString()
                              : "N/A"}
                          </p>
                        </div>
                        <div>
                          <label className="text-[#AAB3CF] text-sm">Status</label>
                          <p className="text-white capitalize">{selectedRequest.status}</p>
                        </div>
                      </div>
                    )}
                    {/* Display additional fields based on form type */}
                    {payload.professionalBackground && (
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Professional Background</label>
                        <p className="text-white">{payload.professionalBackground}</p>
                      </div>
                    )}
                    {payload.proposedContribution && (
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Proposed Contribution</label>
                        <p className="text-white">{payload.proposedContribution}</p>
                      </div>
                    )}
                    {payload.proposedSupport && (
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Proposed Support</label>
                        <p className="text-white">{payload.proposedSupport}</p>
                      </div>
                    )}
                    {payload.inquiry && (
                      <div>
                        <label className="text-[#AAB3CF] text-sm">Inquiry</label>
                        <p className="text-white">{payload.inquiry}</p>
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
            <div className="p-6 border-t border-[#C5A85C]/10 flex items-center justify-end gap-4">
              {selectedRequest.status === "pending" && (
                <>
                  <button
                    onClick={() => handleReject(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    className="px-6 py-2 border border-red-500/40 text-red-400 rounded-lg hover:bg-red-500/10 transition-all disabled:opacity-50"
                  >
                    {actionLoading === selectedRequest.id ? "Processing..." : "Reject"}
                  </button>
                  <button
                    onClick={() => handleApprove(selectedRequest.id)}
                    disabled={actionLoading === selectedRequest.id}
                    className="px-6 py-2 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all disabled:opacity-50"
                  >
                    {actionLoading === selectedRequest.id ? "Processing..." : "Approve"}
                  </button>
                </>
              )}
              <button
                onClick={() => handleDelete(selectedRequest.id)}
                className="px-6 py-2 text-[#AAB3CF] hover:text-red-400 transition-all"
              >
                Delete
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
}

"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

interface Member {
  id: string;
  full_name: string;
  country: string;
  profession: string;
  year_connected: number;
  visibility_status: "draft" | "published" | "archived";
  approved: boolean;
  created_at: string;
}

export default function AdminMembersPage() {
  const [viewMode, setViewMode] = useState<"grid" | "table">("table");
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [members, setMembers] = useState<Member[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [editedData, setEditedData] = useState<Partial<Member>>({});
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  useEffect(() => {
    fetchMembers();
  }, [filterStatus, searchTerm]);

  const fetchMembers = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("admin_token");
      const params = new URLSearchParams();
      if (filterStatus !== "all") params.set("visibility_status", filterStatus);
      if (searchTerm) params.set("search", searchTerm);

      const response = await fetch(`/api/admin/members?${params}`, {
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMembers(data);
      }
    } catch (error) {
      console.error("Failed to fetch members:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePublish = async (id: string) => {
    setActionLoading(`publish-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}/publish`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to publish member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleArchive = async (id: string) => {
    if (!confirm("Are you sure you want to archive this member?")) return;
    setActionLoading(`archive-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}/archive`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to archive member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this member?")) return;
    setActionLoading(`delete-${id}`);
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` },
      });
      if (response.ok) {
        fetchMembers();
        setSelectedMember(null);
      }
    } catch (error) {
      console.error("Failed to delete member:", error);
    } finally {
      setActionLoading(null);
    }
  };

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${selectedMember?.id}`, {
        method: "PATCH",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedMember(updated);
        setEditMode(false);
        fetchMembers();
      }
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const statusColors: Record<string, string> = {
    draft: "bg-gray-500/20 text-gray-400",
    published: "bg-green-500/20 text-green-400",
    archived: "bg-amber-500/20 text-amber-400",
  };

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">Circle Members</h2>
          <p className="text-[#AAB3CF]">Manage member directory and registrations</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search members..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]/60 w-64"
          />
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 text-white px-4 py-2 rounded-lg focus:outline-none focus:border-[#C5A85C]/60"
          >
            <option value="all">All Status</option>
            <option value="published">Published</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4 mb-8">
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {members.filter(m => m.visibility_status === 'published').length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Published</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {members.filter(m => m.visibility_status === 'draft').length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Draft</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {members.filter(m => m.visibility_status === 'archived').length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Archived</div>
        </div>
        <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
          <div className="text-3xl font-serif text-white mb-1">
            {members.length}
          </div>
          <div className="text-[#AAB3CF] text-sm">Total</div>
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-[#AAB3CF]">Loading members...</div>
        ) : members.length === 0 ? (
          <div className="p-8 text-center text-[#AAB3CF]">
            No members found
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Member</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Country</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Profession</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Year</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Status</th>
                <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#C5A85C]/10">
              {members.map((member) => (
                <tr key={member.id} className="hover:bg-[#1C2340]/50 transition-colors">
                  <td className="px-6 py-4">
                    <div className="text-white font-medium">{member.full_name}</div>
                  </td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.country}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.profession}</td>
                  <td className="px-6 py-4 text-[#AAB3CF] text-sm">{member.year_connected}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[member.visibility_status]}`}>
                      {member.visibility_status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setSelectedMember(member);
                          setEditMode(false);
                        }}
                        className="text-[#C5A85C] hover:text-white text-sm transition-colors"
                      >
                        Edit
                      </button>
                      {member.visibility_status === 'draft' && (
                        <button
                          onClick={() => handlePublish(member.id)}
                          disabled={actionLoading === `publish-${member.id}`}
                          className="text-green-400 hover:text-green-300 text-sm transition-colors disabled:opacity-50"
                        >
                          {actionLoading === `publish-${member.id}` ? '...' : 'Publish'}
                        </button>
                      )}
                      {member.visibility_status !== 'archived' && (
                        <button
                          onClick={() => handleArchive(member.id)}
                          disabled={actionLoading === `archive-${member.id}`}
                          className="text-amber-400 hover:text-amber-300 text-sm transition-colors disabled:opacity-50"
                        >
                          {actionLoading === `archive-${member.id}` ? '...' : 'Archive'}
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Detail Modal */}
      {selectedMember && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="bg-[#232B52] border border-[#C5A85C]/20 w-full max-w-3xl my-8 max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#232B52]">
              <h3 className="text-white font-sans text-lg uppercase tracking-wider">
                {editMode ? "Edit Member" : "Member Details"}
              </h3>
              <button
                onClick={() => {
                  setSelectedMember(null);
                  setEditMode(false);
                }}
                className="text-[#C9CCD6] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-5">
              {editMode ? (
                <>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                    <input
                      type="text"
                      value={editedData.full_name ?? selectedMember.full_name}
                      onChange={(e) => setEditedData({ ...editedData, full_name: e.target.value })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                      <input
                        type="text"
                        value={editedData.country ?? selectedMember.country}
                        onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                        className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                      />
                    </div>
                    <div>
                      <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Profession</label>
                      <input
                        type="text"
                        value={editedData.profession ?? selectedMember.profession}
                        onChange={(e) => setEditedData({ ...editedData, profession: e.target.value })}
                        className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year Connected</label>
                    <input
                      type="number"
                      value={editedData.year_connected ?? selectedMember.year_connected}
                      onChange={(e) => setEditedData({ ...editedData, year_connected: parseInt(e.target.value) })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                    />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Status</label>
                    <select
                      value={editedData.visibility_status ?? selectedMember.visibility_status}
                      onChange={(e) => setEditedData({ ...editedData, visibility_status: e.target.value as any })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                    >
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Name</p>
                      <p className="text-white">{selectedMember.full_name}</p>
                    </div>
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Country</p>
                      <p className="text-white">{selectedMember.country}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Profession</p>
                      <p className="text-white">{selectedMember.profession}</p>
                    </div>
                    <div>
                      <p className="text-[#C5A85C] text-xs uppercase mb-1">Year Connected</p>
                      <p className="text-white">{selectedMember.year_connected}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-[#C5A85C] text-xs uppercase mb-1">Status</p>
                    <span className={`text-xs px-3 py-1 rounded-full ${statusColors[selectedMember.visibility_status]}`}>
                      {selectedMember.visibility_status}
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="p-5 border-t border-[#C5A85C]/20 flex justify-between items-center sticky bottom-0 bg-[#232B52]">
              <div className="flex gap-3">
                {!editMode && selectedMember.visibility_status === 'draft' && (
                  <button
                    onClick={() => handlePublish(selectedMember.id)}
                    disabled={actionLoading === `publish-${selectedMember.id}`}
                    className="px-4 py-2 border border-green-500/40 text-green-400 text-xs uppercase tracking-wider hover:border-green-500 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === `publish-${selectedMember.id}` ? 'Publishing...' : 'Publish'}
                  </button>
                )}
                {!editMode && selectedMember.visibility_status !== 'archived' && (
                  <button
                    onClick={() => handleArchive(selectedMember.id)}
                    disabled={actionLoading === `archive-${selectedMember.id}`}
                    className="px-4 py-2 border border-amber-500/40 text-amber-400 text-xs uppercase tracking-wider hover:border-amber-500 transition-colors disabled:opacity-50"
                  >
                    {actionLoading === `archive-${selectedMember.id}` ? 'Archiving...' : 'Archive'}
                  </button>
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
                      className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleUpdate}
                      className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => handleDelete(selectedMember.id)}
                      disabled={actionLoading === `delete-${selectedMember.id}`}
                      className="px-4 py-2 text-[#C9CCD6] text-xs uppercase tracking-wider hover:text-red-400 disabled:opacity-50"
                    >
                      {actionLoading === `delete-${selectedMember.id}` ? '...' : 'Delete'}
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(true);
                        setEditedData({});
                      }}
                      className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
                    >
                      Edit
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}

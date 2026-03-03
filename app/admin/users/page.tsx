"use client";

import { useState } from "react";
import AdminLayout from "../components/AdminLayout";

export default function AdminUsersPage() {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  // Mock data
  const users = [
    {
      id: "1",
      email: "admin@drkumarfoundation.org",
      full_name: "System Administrator",
      role: "super_admin",
      is_active: true,
      created_at: new Date().toISOString(),
    },
  ];

  const roleColors: Record<string, string> = {
    super_admin: "bg-purple-500/20 text-purple-400",
    program_director: "bg-blue-500/20 text-blue-400",
    moderator: "bg-green-500/20 text-green-400",
    contributor: "bg-gray-500/20 text-gray-400",
  };

  const [user] = useState(() => {
    if (typeof window !== "undefined") {
      const session = localStorage.getItem("admin_session");
      return session ? JSON.parse(session) : { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
    }
    return { email: "admin@drkumarfoundation.org", full_name: "Admin", role: "super_admin" };
  });

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-serif text-white mb-2">User Management</h2>
          <p className="text-[#AAB3CF]">Manage system access and permissions</p>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium"
        >
          + New User
        </button>
      </div>

      {/* Users Table */}
      <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-[#1C2340] border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">User</th>
              <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Role</th>
              <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Status</th>
              <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Created</th>
              <th className="text-left text-[#C5A85C] text-sm font-medium px-6 py-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#C5A85C]/10">
            {users.map((u) => (
              <tr key={u.id} className="hover:bg-[#1C2340]/50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#C5A85C]/20 rounded-full flex items-center justify-center">
                      <span className="text-[#C5A85C] font-serif text-sm font-bold">
                        {u.full_name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2)}
                      </span>
                    </div>
                    <div>
                      <div className="text-white font-medium">{u.full_name}</div>
                      <div className="text-[#AAB3CF] text-sm">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${roleColors[u.role]}`}>
                    {u.role.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className={`text-xs px-3 py-1 rounded-full ${u.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                    {u.is_active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#AAB3CF] text-sm">
                  {new Date(u.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4">
                  <button className="text-[#C5A85C] hover:text-white text-sm transition-colors">
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}

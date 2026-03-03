"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "../components/AdminLayout";

export default function AdminProgramsPage() {
  const [selectedProgram, setSelectedProgram] = useState<any | null>(null);

  // Mock data
  const programs = [
    {
      id: "1",
      name: "Healing Initiatives",
      description: "Structured pathways for healing and counseling programs.",
      is_active: true,
      engagement_count: 12,
      last_updated: new Date().toISOString(),
    },
    {
      id: "2",
      name: "Environmental Programs",
      description: "Research and field partnership for environmental conservation.",
      is_active: true,
      engagement_count: 8,
      last_updated: new Date().toISOString(),
    },
    {
      id: "3",
      name: "Interfaith Program",
      description: "Dialogue and civilizational engagement infrastructure.",
      is_active: true,
      engagement_count: 5,
      last_updated: new Date().toISOString(),
    },
  ];

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
          <h2 className="text-2xl font-serif text-white mb-2">Programs</h2>
          <p className="text-[#AAB3CF]">Manage program content and engagement</p>
        </div>
      </div>

      {/* Programs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {programs.map((program, index) => (
          <motion.div
            key={program.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6 hover:border-[#C5A85C]/30 transition-all"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-14 h-14 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
                <svg className="w-7 h-7 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <span className={`text-xs px-3 py-1 rounded-full ${program.is_active ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                {program.is_active ? "Active" : "Inactive"}
              </span>
            </div>

            <h3 className="font-serif text-xl text-white mb-2">{program.name}</h3>
            <p className="text-[#AAB3CF] text-sm mb-4">{program.description}</p>

            <div className="flex items-center justify-between pt-4 border-t border-[#C5A85C]/10">
              <div>
                <div className="text-2xl font-serif text-[#C5A85C]">{program.engagement_count}</div>
                <div className="text-[#AAB3CF] text-xs">Engagements</div>
              </div>
              <div className="text-[#AAB3CF] text-xs">
                Updated {new Date(program.last_updated).toLocaleDateString()}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AdminLayout>
  );
}

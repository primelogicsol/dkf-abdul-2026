"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Task {
  id: string;
  title: string;
  message: string;
  program_type: string;
  status: string;
  created_at: string;
  due_date?: string;
  completed_at?: string;
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

export default function TasksPage() {
  const [user, setUser] = useState<User | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');

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
        const response = await fetch(`/api/tasks?user_id=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setTasks(data);
        }
      } catch (error) {
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const filteredTasks = filter === 'all' 
    ? tasks 
    : tasks.filter(t => t.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'completed': return 'bg-green-500/20 text-green-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading tasks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C2340]">
      {/* Header */}
      <header className="h-20 bg-[#1C2340] border-b border-[#C5A85C]/20 flex items-center justify-between px-8">
        <div>
          <h1 className="text-white font-serif text-2xl">My Tasks</h1>
          <p className="text-[#AAB3CF] text-sm">View tasks assigned by admin</p>
        </div>
        <Link href="/dashboard" className="text-[#AAB3CF] hover:text-white transition-colors text-sm">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-7xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-white mb-1">{tasks.length}</div>
            <div className="text-[#AAB3CF] text-sm">Total Tasks</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-amber-400 mb-1">
              {tasks.filter(t => t.status === 'pending').length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Pending</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-green-400 mb-1">
              {tasks.filter(t => t.status === 'completed').length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Completed</div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex gap-3 mb-6">
          {(['all', 'pending', 'completed'] as const).map((status) => (
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

        {/* Tasks List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
        >
          {filteredTasks.length === 0 ? (
            <div className="p-12 text-center text-[#AAB3CF]">
              <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
              <p>No tasks found</p>
            </div>
          ) : (
            <div className="divide-y divide-[#C5A85C]/10">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-[#1C2340]/50 transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-serif text-lg text-white">{task.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(task.status)}`}>
                          {task.status}
                        </span>
                      </div>
                      <p className="text-[#AAB3CF] text-sm mb-3">{task.message}</p>
                      <div className="flex items-center gap-4 text-xs text-[#6B7299]">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(task.created_at).toLocaleDateString()}
                        </span>
                        {task.due_date && (
                          <span className="flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            Due: {new Date(task.due_date).toLocaleDateString()}
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                          {programNames[task.program_type]}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
    </div>
  );
}

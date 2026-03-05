"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  is_read: boolean;
  link?: string;
  created_at: string;
}

export default function NotificationsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all');

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
        const response = await fetch(`/api/notifications?user_id=${userData.id}`);
        if (response.ok) {
          const data = await response.json();
          setNotifications(data);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, []);

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : filter === 'unread' 
      ? notifications.filter(n => !n.is_read)
      : notifications.filter(n => n.is_read);

  const markAsRead = async (id: string) => {
    try {
      const response = await fetch(`/api/notifications/${id}/read`, {
        method: 'PATCH',
      });
      if (response.ok) {
        setNotifications(prev =>
          prev.map(n => n.id === id ? { ...n, is_read: true } : n)
        );
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  const markAllAsRead = async () => {
    try {
      const response = await fetch('/api/notifications/read-all', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: user?.id }),
      });
      if (response.ok) {
        setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
    }
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'Just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading notifications...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1C2340]">
      {/* Header */}
      <header className="h-20 bg-[#1C2340] border-b border-[#C5A85C]/20 flex items-center justify-between px-8">
        <div>
          <h1 className="text-white font-serif text-2xl">Notifications</h1>
          <p className="text-[#AAB3CF] text-sm">Stay updated with your activities</p>
        </div>
        <Link href="/dashboard" className="text-[#AAB3CF] hover:text-white transition-colors text-sm">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-white mb-1">{notifications.length}</div>
            <div className="text-[#AAB3CF] text-sm">Total</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-amber-400 mb-1">
              {notifications.filter(n => !n.is_read).length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Unread</div>
          </div>
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-xl p-4">
            <div className="text-3xl font-serif text-green-400 mb-1">
              {notifications.filter(n => n.is_read).length}
            </div>
            <div className="text-[#AAB3CF] text-sm">Read</div>
          </div>
        </motion.div>

        {/* Filters */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex gap-3">
            {(['all', 'unread', 'read'] as const).map((status) => (
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
          {notifications.some(n => !n.is_read) && (
            <button
              onClick={markAllAsRead}
              className="text-sm text-[#C5A85C] hover:text-white transition-colors"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden"
        >
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center text-[#AAB3CF]">
              <svg className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <p>No notifications yet</p>
            </div>
          ) : (
            <div className="divide-y divide-[#C5A85C]/10">
              {filteredNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead(notification.id)}
                  className={`p-6 hover:bg-[#1C2340]/50 transition-colors cursor-pointer ${
                    !notification.is_read ? 'bg-[#C5A85C]/5' : ''
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-3 h-3 rounded-full mt-1.5 flex-shrink-0 ${
                      !notification.is_read ? 'bg-[#C5A85C]' : 'bg-transparent'
                    }`} />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-white font-medium">{notification.title}</h3>
                        <span className="text-[#6B7299] text-xs">{getTimeAgo(notification.created_at)}</span>
                      </div>
                      <p className="text-[#AAB3CF] text-sm mb-3">{notification.message}</p>
                      <div className="flex items-center gap-3">
                        <span className={`px-2 py-1 rounded text-xs ${
                          notification.type === 'task' ? 'bg-blue-500/20 text-blue-400' :
                          notification.type === 'contribution' ? 'bg-green-500/20 text-green-400' :
                          'bg-gray-500/20 text-gray-400'
                        }`}>
                          {notification.type}
                        </span>
                        {!notification.is_read && (
                          <span className="text-[#C5A85C] text-xs">New</span>
                        )}
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

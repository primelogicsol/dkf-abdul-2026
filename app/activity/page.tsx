"use client";

import { motion } from "framer-motion";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function ActivityPage() {
  const activities = [
    { id: 1, action: "Logged in", date: "2026-02-28 10:30", device: "Chrome on Windows", ip: "192.168.1.1" },
    { id: 2, action: "Profile updated", date: "2026-02-27 15:45", device: "Chrome on Windows", ip: "192.168.1.1" },
    { id: 3, action: "Password changed", date: "2026-02-25 09:20", device: "Chrome on Windows", ip: "192.168.1.1" },
  ];

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

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
            <span className="gradient-gold"> Activity</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Track your account activity and login history.
          </motion.p>
        </div>
      </section>

      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-4xl">
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 bg-[#1C2340] border-b border-[#C5A85C]/10">
              <div className="text-[#C5A85C] text-sm font-medium">Action</div>
              <div className="text-[#C5A85C] text-sm font-medium">Date & Time</div>
              <div className="text-[#C5A85C] text-sm font-medium">Device</div>
              <div className="text-[#C5A85C] text-sm font-medium">IP Address</div>
            </div>

            <div className="divide-y divide-[#C5A85C]/10">
              {activities.map((activity) => (
                <div key={activity.id} className="grid grid-cols-1 md:grid-cols-4 gap-4 px-6 py-4 hover:bg-[#1C2340]/50 transition-colors">
                  <div className="text-white font-medium">{activity.action}</div>
                  <div className="text-[#AAB3CF] text-sm">{activity.date}</div>
                  <div className="text-[#AAB3CF] text-sm">{activity.device}</div>
                  <div className="text-[#AAB3CF] text-sm font-mono">{activity.ip}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

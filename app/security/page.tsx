"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";

export default function SecurityPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error">("success");

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      setMessageType("error");
      return;
    }

    if (newPassword.length < 8) {
      setMessage("Password must be at least 8 characters");
      setMessageType("error");
      return;
    }

    setMessage("Password updated successfully!");
    setMessageType("success");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    setTimeout(() => setMessage(""), 3000);
  };

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
            Security
            <span className="gradient-gold"> Settings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Manage your password and security preferences.
          </motion.p>
        </div>
      </section>

      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-2xl">
          {message && (
            <div className={`mb-6 border rounded-lg p-3 text-sm ${
              messageType === "success" 
                ? "bg-green-500/10 border-green-500/30 text-green-400" 
                : "bg-red-500/10 border-red-500/30 text-red-400"
            }`}>
              {message}
            </div>
          )}

          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 mb-6">
            <h2 className="font-serif text-xl text-white mb-6">Change Password</h2>
            
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div className="space-y-2">
                <label className="text-[#C9CCD6] text-sm font-medium">Current Password</label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#C9CCD6] text-sm font-medium">New Password</label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#C9CCD6] text-sm font-medium">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)]"
              >
                Update Password
              </button>
            </form>
          </div>

          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-serif text-xl text-white">Two-Factor Authentication</h2>
                <p className="text-[#AAB3CF] text-sm mt-1">
                  Add an extra layer of security
                </p>
              </div>
              <button
                onClick={() => setTwoFactorEnabled(!twoFactorEnabled)}
                className={`relative w-14 h-8 rounded-full transition-colors ${
                  twoFactorEnabled ? "bg-[#C5A85C]" : "bg-white/10"
                }`}
              >
                <div
                  className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-transform ${
                    twoFactorEnabled ? "left-7" : "left-1"
                  }`}
                />
              </button>
            </div>
            
            {twoFactorEnabled && (
              <div className="mt-4 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-green-400 text-sm">
                  ✓ Two-factor authentication is enabled
                </p>
              </div>
            )}
          </div>
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import PremiumHeader from "../components/PremiumHeader";
import PremiumFooter from "../components/PremiumFooter";
import { useRouter } from "next/navigation";
import SubmissionsTab from "./submissions-tab";

interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string | null;
}

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  // Profile state
  const [fullName, setFullName] = useState("");
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  
  // Avatar upload state
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  // Password change state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSavingPassword, setIsSavingPassword] = useState(false);
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  
  // Active tab state
  const [activeTab, setActiveTab] = useState<'profile' | 'submissions'>('profile');

  // Check session on mount
  useEffect(() => {
    const checkSession = async () => {
      // First check localStorage
      const localSession = localStorage.getItem("user_session");
      if (localSession) {
        try {
          const parsedData = JSON.parse(localSession);
          setUser(parsedData);
          setFullName(parsedData.full_name);
          if (parsedData.avatar_url) {
            setAvatarPreview(parsedData.avatar_url);
          }
          setIsLoading(false);
          return;
        } catch {
          localStorage.removeItem("user_session");
        }
      }
      
      // Then check server session with user ID header
      try {
        const storedSession = localStorage.getItem("user_session");
        const storedUser = storedSession ? JSON.parse(storedSession) : null;
        const userId = storedUser?.id;
        
        if (!userId) {
          setIsLoading(false);
          return;
        }
        
        const response = await fetch("/api/auth/session", {
          headers: {
            'Authorization': `Bearer ${userId}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
          setFullName(userData.full_name);
          if (userData.avatar_url) {
            setAvatarPreview(userData.avatar_url);
          }
          localStorage.setItem("user_session", JSON.stringify(userData));
        }
      } catch (error) {
        console.error('Session check failed:', error);
      } finally {
        setIsLoading(false);
      }
    };
    checkSession();
  }, [router]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setProfileMessage("✗ Please select an image file");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setProfileMessage("✗ File size must be less than 5MB");
      return;
    }

    // Create preview
    const previewUrl = URL.createObjectURL(file);
    setAvatarPreview(previewUrl);
    setIsUploadingAvatar(true);

    try {
      // Upload to Cloudinary
      const formData = new FormData();
      formData.append('avatar', file);
      formData.append('userId', user.id);

      const response = await fetch('/api/auth/upload-avatar', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok && data.user) {
        // Update user state with new avatar
        const updatedUserData = {
          ...user,
          avatar_url: data.user.avatar_url,
        };
        setUser(updatedUserData);
        setAvatarPreview(data.user.avatar_url);
        
        // Save to localStorage (works even if database failed)
        localStorage.setItem("user_session", JSON.stringify(updatedUserData));
        
        setProfileMessage("✓ Avatar updated successfully!");
      } else {
        setProfileMessage(`✗ ${data.error || 'Upload failed'}`);
        // Revert preview on error
        setAvatarPreview(user.avatar_url || null);
      }
    } catch (err) {
      console.error('Upload error:', err);
      setProfileMessage("✗ An error occurred. Please try again.");
      setAvatarPreview(user.avatar_url || null);
    } finally {
      setIsUploadingAvatar(false);
      setTimeout(() => setProfileMessage(""), 4000);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsSavingProfile(true);
    setProfileMessage("");
    
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          fullName: fullName.trim(),
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setProfileMessage("✓ Profile name updated successfully!");
        setUser({ ...user, full_name: fullName });
        // Update localStorage
        localStorage.setItem("user_session", JSON.stringify({ ...user, full_name: fullName }));
      } else {
        setProfileMessage(`✗ ${data.error}`);
      }
    } catch {
      setProfileMessage("✗ An error occurred. Please try again.");
    } finally {
      setIsSavingProfile(false);
      setTimeout(() => setProfileMessage(""), 4000);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setPasswordError("");
    setPasswordMessage("");
    
    // Validation
    if (newPassword.length < 6) {
      setPasswordError("New password must be at least 6 characters");
      return;
    }
    
    if (newPassword !== confirmPassword) {
      setPasswordError("New passwords do not match");
      return;
    }
    
    setIsSavingPassword(true);
    
    try {
      const response = await fetch("/api/auth/update-profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          currentPassword,
          newPassword,
        }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setPasswordMessage("✓ Password updated successfully!");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
      } else {
        setPasswordError(`✗ ${data.error}`);
      }
    } catch {
      setPasswordError("✗ An error occurred. Please try again.");
    } finally {
      setIsSavingPassword(false);
      setTimeout(() => {
        setPasswordMessage("");
        setPasswordError("");
      }, 4000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center max-w-md px-6">
          <div className="w-20 h-20 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-6" />
          <h2 className="font-serif text-2xl text-white mb-3">Please Sign In</h2>
          <p className="text-[#AAB3CF] mb-6">You need to be logged in to view your profile.</p>
          <button
            onClick={() => router.push('/')}
            className="px-6 py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)]"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1C2340] min-h-screen">
      <PremiumHeader />

      {/* Hero Section */}
      <section className="relative min-h-[40vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#1C2340] via-[#1C2340] to-[#151A30]" />

        {/* Animated Glow */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#C5A85C]/10 rounded-full blur-[140px]"
        />

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
            Profile
            <span className="gradient-gold"> Settings</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-[#AAB3CF] text-xl leading-relaxed"
          >
            Manage your personal information and security settings.
          </motion.p>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-spacing bg-[#151A30]">
        <div className="container-premium max-w-4xl">
          {/* Tab Navigation */}
          <div className="flex gap-4 mb-8 border-b border-[#C5A85C]/20">
            <button
              onClick={() => setActiveTab('profile')}
              className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'profile'
                  ? 'border-[#C5A85C] text-[#C5A85C]'
                  : 'border-transparent text-[#AAB3CF] hover:text-white'
              }`}
            >
              Profile Settings
            </button>
            <button
              onClick={() => setActiveTab('submissions')}
              className={`px-6 py-3 text-sm font-medium transition-all border-b-2 ${
                activeTab === 'submissions'
                  ? 'border-[#C5A85C] text-[#C5A85C]'
                  : 'border-transparent text-[#AAB3CF] hover:text-white'
              }`}
            >
              My Submissions
            </button>
          </div>

          {activeTab === 'profile' ? (
          <div className="grid md:grid-cols-2 gap-8">
            {/* Profile Information Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="md:col-span-2"
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-xl text-white">Profile Information</h2>
                </div>

                {profileMessage && (
                  <div className={`mb-6 border rounded-lg p-3 text-sm ${
                    profileMessage.includes("✓") 
                      ? "bg-green-500/10 border-green-500/30 text-green-400" 
                      : "bg-red-500/10 border-red-500/30 text-red-400"
                  }`}>
                    {profileMessage}
                  </div>
                )}

                <div className="grid md:grid-cols-3 gap-8">
                  {/* Avatar Upload Section */}
                  <div className="md:col-span-1">
                    <label className="block text-[#C9CCD6] text-sm font-medium mb-3">Profile Photo</label>
                    <div className="relative">
                      <div className="w-32 h-32 mx-auto rounded-full border-2 border-[#C5A85C]/40 overflow-hidden bg-[#1C2340] hover:border-[#C5A85C] transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,168,92,0.3)]">
                        {avatarPreview ? (
                          <img
                            src={avatarPreview}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <span className="text-[#C5A85C] font-serif text-3xl font-bold">
                              {user?.full_name?.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "U"}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      {/* Upload Overlay */}
                      <label
                        htmlFor="avatar-upload"
                        className={`absolute inset-0 w-32 h-32 mx-auto rounded-full cursor-pointer flex items-center justify-center bg-black/60 opacity-0 hover:opacity-100 transition-all duration-300 ${isUploadingAvatar ? 'opacity-100 cursor-not-allowed' : ''}`}
                      >
                        {isUploadingAvatar ? (
                          <svg className="animate-spin h-8 w-8 text-[#C5A85C]" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        ) : (
                          <div className="text-center">
                            <svg className="w-8 h-8 text-white mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <span className="text-white text-xs">Change</span>
                          </div>
                        )}
                      </label>
                      <input
                        id="avatar-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleAvatarChange}
                        disabled={isUploadingAvatar}
                        className="hidden"
                      />
                    </div>
                    <p className="text-[#AAB3CF] text-xs text-center mt-3">
                      Click to upload • Max 5MB
                    </p>
                  </div>

                  {/* Profile Form Fields */}
                  <div className="md:col-span-2">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <label className="text-[#C9CCD6] text-sm font-medium">Full Name</label>
                        <input
                          type="text"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                          placeholder="Enter your full name"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[#C9CCD6] text-sm font-medium">Email Address</label>
                        <input
                          type="email"
                          value={user?.email || ""}
                          disabled
                          className="w-full bg-[#1C2340]/50 border border-white/10 px-4 py-3 text-[#AAB3CF] rounded-lg cursor-not-allowed"
                        />
                        <p className="text-[#AAB3CF] text-xs">Email cannot be changed</p>
                      </div>

                      <button
                        onClick={handleProfileUpdate}
                        type="button"
                        disabled={isSavingProfile || !fullName.trim()}
                        className="w-full py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[length:200%_100%] animate-gradient"
                      >
                        {isSavingProfile && (
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                        )}
                        {isSavingProfile ? "Saving..." : "Save Changes"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Password Change Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
                    <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h2 className="font-serif text-xl text-white">Change Password</h2>
                </div>

                {passwordMessage && (
                  <div className="mb-6 bg-green-500/10 border border-green-500/30 rounded-lg p-3 text-green-400 text-sm">
                    {passwordMessage}
                  </div>
                )}

                {passwordError && (
                  <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                    {passwordError}
                  </div>
                )}

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[#C9CCD6] text-sm font-medium">Current Password</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                      placeholder="Enter current password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#C9CCD6] text-sm font-medium">New Password</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                      placeholder="Enter new password"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[#C9CCD6] text-sm font-medium">Confirm New Password</label>
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="w-full bg-[#1C2340] border border-white/10 px-4 py-3 text-white placeholder-[#AAB3CF]/50 focus:outline-none focus:border-[#C5A85C]/60 focus:ring-2 focus:ring-[#C5A85C]/20 rounded-lg transition-all"
                      placeholder="Confirm new password"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSavingPassword || !currentPassword || !newPassword || !confirmPassword}
                    className="w-full py-3 bg-gradient-to-r from-[#C5A85C] via-[#D4BE90] to-[#C5A85C] text-[#1C2340] font-medium rounded-lg transition-all duration-300 hover:shadow-[0_10px_40px_rgba(197,168,92,0.3)] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 bg-[length:200%_100%] animate-gradient"
                  >
                    {isSavingPassword && (
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                    )}
                    {isSavingPassword ? "Updating..." : "Update Password"}
                  </button>
                </form>

                {/* Password Requirements */}
                <div className="mt-6 pt-6 border-t border-[#C5A85C]/10">
                  <h3 className="text-[#C9CCD6] text-sm font-medium mb-3">Password Requirements:</h3>
                  <ul className="space-y-2 text-[#AAB3CF] text-sm">
                    <li className="flex items-center gap-2">
                      <svg className={`w-4 h-4 ${newPassword.length >= 6 ? "text-green-400" : "text-[#C5A85C]"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      At least 6 characters long
                    </li>
                    <li className="flex items-center gap-2">
                      <svg className={`w-4 h-4 ${newPassword && newPassword === confirmPassword ? "text-green-400" : "text-[#C5A85C]"}`} fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      Passwords must match
                    </li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </div>
          ) : (
            /* Submissions Tab */
            <SubmissionsTab user={user} />
          )}
        </div>
      </section>

      <PremiumFooter />
    </div>
  );
}

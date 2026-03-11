"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";
import OtpForm from "./OtpForm";
import Image from "next/image";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: "signin" | "signup";
}

export type AuthTab = "signin" | "signup" | "otp";

export default function AuthModal({ isOpen, onClose, initialTab = "signin" }: AuthModalProps) {
  const [activeTab, setActiveTab] = useState<AuthTab>(initialTab);
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSignInSuccess = () => {
    // Re-fetch user data to ensure session is set
    const session = localStorage.getItem("user_session");
    if (session) {
      // Session already set by SignInForm
    }
    onClose();
  };

  const handleSignUpSuccess = (userEmail: string) => {
    setEmail(userEmail);
    setActiveTab("otp");
  };

  const handleOtpSuccess = async () => {
    // After OTP verification, fetch user data and set session
    try {
      const response = await fetch("/api/auth/session");
      if (response.ok) {
        const userData = await response.json();
        localStorage.setItem("user_session", JSON.stringify(userData));
      }
    } catch (error) {
      console.error("Failed to fetch session after OTP:", error);
    }
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50 px-4"
          >
            <div className="bg-[#1C2340]/98 backdrop-blur-md border border-[#C5A85C]/20 rounded-2xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="relative bg-gradient-to-r from-[#1C2340] via-[#232B52] to-[#1C2340] px-8 py-6 border-b border-[#C5A85C]/20">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 text-[#AAB3CF] hover:text-white transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="text-center">
                  {/* <div className="w-12 h-12 border border-[#C5A85C]/40 flex items-center justify-center mx-auto mb-3">
                    <span className="text-[#C5A85C] font-serif text-xl font-bold">D</span>
                  </div> */}
                  <Image alt="LOGO" height={50} width={50} src="/dkf_logo_21.png" className="pt-2" />
                  <h2 className="font-serif text-2xl text-white">
                    {activeTab === "signin" && "Welcome Back"}
                    {activeTab === "signup" && "Create Account"}
                    {activeTab === "otp" && "Verify Email"}
                  </h2>
                  <p className="text-[#AAB3CF] text-sm mt-1">
                    {activeTab === "signin" && "Sign in to continue to your dashboard"}
                    {activeTab === "signup" && "Join our community of seekers"}
                    {activeTab === "otp" && `Enter code sent to ${email}`}
                  </p>
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {activeTab === "signin" && (
                  <SignInForm
                    onSuccess={handleSignInSuccess}
                    onSwitchToSignUp={() => setActiveTab("signup")}
                  />
                )}
                {activeTab === "signup" && (
                  <SignUpForm
                    onSuccess={handleSignUpSuccess}
                    onSwitchToSignIn={() => setActiveTab("signin")}
                  />
                )}
                {activeTab === "otp" && (
                  <OtpForm
                    email={email}
                    onSuccess={handleOtpSuccess}
                    onResend={() => {}}
                  />
                )}
              </div>

              {/* Footer */}
              {activeTab !== "otp" && (
                <div className="px-8 py-4 bg-[#151A30]/50 border-t border-[#C5A85C]/10">
                  <p className="text-[#AAB3CF] text-xs text-center">
                    By continuing, you agree to our{" "}
                    <a href="#" className="text-[#C5A85C] hover:underline">Terms of Service</a>
                    {" "}and{" "}
                    <a href="#" className="text-[#C5A85C] hover:underline">Privacy Policy</a>
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

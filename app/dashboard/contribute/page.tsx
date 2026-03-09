"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface UserProgram {
  id: string;
  program_type: string;
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

export default function ContributePage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [userProgram, setUserProgram] = useState<UserProgram | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    title: '',
    venue: '',
    activity_date: '',
    venue_city: '',
    venue_country: '',
    participant_count: '',
    participant_phones: '',
    task_conducted: '',
    results: '',
  });

  useEffect(() => {
    const checkSession = async () => {
      const session = localStorage.getItem("user_session");
      if (!session) {
        console.log('[Contribute] No session found, redirecting');
        router.push('/auth/login');
        return;
      }

      const userData = JSON.parse(session);
      console.log('[Contribute] User from session:', userData);
      setUser(userData);

      try {
        const response = await fetch(`/api/user-programs?user_id=${userData.id}`);
        console.log('[Contribute] User programs response status:', response.status);
        if (response.ok) {
          const programs = await response.json();
          console.log('[Contribute] User programs:', programs);
          if (programs.length > 0) {
            setUserProgram(programs[0]);
          } else {
            alert('You are not enrolled in any program');
            router.push('/dashboard');
          }
        }
      } catch (error) {
        console.error('[Contribute] Failed to check enrollment:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkSession();
  }, [router]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.activity_date) {
      newErrors.activity_date = 'Activity date is required';
    } else {
      const selectedDate = new Date(formData.activity_date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selectedDate > today) {
        newErrors.activity_date = 'Cannot select a future date';
      }
    }

    if (!formData.venue.trim()) {
      newErrors.venue = 'Venue is required';
    }

    if (!formData.venue_city.trim()) {
      newErrors.venue_city = 'City is required';
    }

    if (!formData.venue_country.trim()) {
      newErrors.venue_country = 'Country is required';
    }

    if (!formData.participant_count || parseInt(formData.participant_count) < 1) {
      newErrors.participant_count = 'At least 1 participant required';
    }

    if (!formData.participant_phones.trim()) {
      newErrors.participant_phones = 'Participant phones are required';
    }

    if (formData.task_conducted.trim().length < 20) {
      newErrors.task_conducted = 'Minimum 20 characters required';
    }

    if (formData.results.trim().length < 20) {
      newErrors.results = 'Minimum 20 characters required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    if (!user || !userProgram) return;

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/contributions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          user_program_id: userProgram.id,
          user_id: user.id,
          user_name: user.full_name,
          user_email: user.email,
          program_type: userProgram.program_type,
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
      } else {
        alert('Failed to submit contribution');
      }
    } catch (error) {
      console.error('Failed to submit:', error);
      alert('Failed to submit contribution');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
          <p className="text-[#AAB3CF]">Loading...</p>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-[#1C2340] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl p-12 text-center max-w-md"
        >
          <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-white mb-4">Contribution Submitted!</h2>
          <p className="text-[#AAB3CF] mb-8">
            Your contribution has been submitted successfully. It will be reviewed by admin and become visible after approval.
          </p>
          <Link
            href="/dashboard"
            className="inline-block px-8 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium"
          >
            Back to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen my-6 bg-[#1C2340]">
      {/* Header */}
      <header className="h-24 bg-[#1C2340] border-b border-[#C5A85C]/20 flex items-center justify-between px-8">
        <div className="flex justify-center w-full">
          <div>
          <h1 className="text-white font-serif text-2xl">{userProgram ? programNames[userProgram.program_type] : ''}</h1>
          <p className="text-[#AAB3CF] text-sm">Submit Contribution</p>
          </div>
          
        </div>
        <Link href="/dashboard" className="text-[#AAB3CF] w-48 hover:text-white transition-colors text-sm">
          ← Back to Dashboard
        </Link>
      </header>

      {/* Form */}
      <main className="p-8 max-w-4xl mx-auto">
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={handleSubmit}
          className="space-y-8"
        >
          {/* Basic Information */}
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
            <h3 className="font-serif text-lg text-white mb-6">Activity Information</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Contribution Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  className={`w-full bg-[#1C2340] border ${errors.title ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                  placeholder="e.g., Community Reflection Circle"
                />
                {errors.title && <p className="text-red-400 text-xs mt-1">{errors.title}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                    Date of Activity *
                  </label>
                  <input
                    type="date"
                    max={new Date().toISOString().split('T')[0]}
                    value={formData.activity_date}
                    onChange={(e) => handleChange('activity_date', e.target.value)}
                    className={`w-full bg-[#1C2340] border ${errors.activity_date ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                  />
                  {errors.activity_date && <p className="text-red-400 text-xs mt-1">{errors.activity_date}</p>}
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                    Number of Participants *
                  </label>
                  <input
                    type="number"
                    min="1"
                    value={formData.participant_count}
                    onChange={(e) => handleChange('participant_count', e.target.value)}
                    className={`w-full bg-[#1C2340] border ${errors.participant_count ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                    placeholder="5"
                  />
                  {errors.participant_count && <p className="text-red-400 text-xs mt-1">{errors.participant_count}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Venue / Location Name *
                </label>
                <input
                  type="text"
                  value={formData.venue}
                  onChange={(e) => handleChange('venue', e.target.value)}
                  className={`w-full bg-[#1C2340] border ${errors.venue ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                  placeholder="e.g., Community Center, Park, Online"
                />
                {errors.venue && <p className="text-red-400 text-xs mt-1">{errors.venue}</p>}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                    City *
                  </label>
                  <input
                    type="text"
                    value={formData.venue_city}
                    onChange={(e) => handleChange('venue_city', e.target.value)}
                    className={`w-full bg-[#1C2340] border ${errors.venue_city ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                    placeholder="Srinagar"
                  />
                  {errors.venue_city && <p className="text-red-400 text-xs mt-1">{errors.venue_city}</p>}
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                    Country *
                  </label>
                  <input
                    type="text"
                    value={formData.venue_country}
                    onChange={(e) => handleChange('venue_country', e.target.value)}
                    className={`w-full bg-[#1C2340] border ${errors.venue_country ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                    placeholder="India"
                  />
                  {errors.venue_country && <p className="text-red-400 text-xs mt-1">{errors.venue_country}</p>}
                </div>
              </div>

              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Participant Phone Numbers *
                </label>
                <input
                  type="text"
                  value={formData.participant_phones}
                  onChange={(e) => handleChange('participant_phones', e.target.value)}
                  className={`w-full bg-[#1C2340] border ${errors.participant_phones ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]`}
                  placeholder="+1-916-699-0091, +91-9876543210"
                />
                {errors.participant_phones && <p className="text-red-400 text-xs mt-1">{errors.participant_phones}</p>}
                <p className="text-[#AAB3CF] text-xs mt-2">Separate multiple numbers with commas</p>
              </div>
            </div>
          </div>

          {/* Activity Details */}
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6">
            <h3 className="font-serif text-lg text-white mb-6">Activity Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Task Conducted *
                </label>
                <textarea
                  rows={4}
                  value={formData.task_conducted}
                  onChange={(e) => handleChange('task_conducted', e.target.value)}
                  className={`w-full bg-[#1C2340] border ${errors.task_conducted ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] resize-none`}
                  placeholder="Describe what activity you conducted (minimum 20 characters)..."
                />
                <div className="flex justify-between mt-2">
                  {errors.task_conducted ? (
                    <p className="text-red-400 text-xs">{errors.task_conducted}</p>
                  ) : (
                    <p className="text-[#AAB3CF] text-xs">{formData.task_conducted.length} characters</p>
                  )}
                  <p className="text-[#AAB3CF] text-xs">Min: 20 characters</p>
                </div>
              </div>

              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                  Results / Outcomes *
                </label>
                <textarea
                  rows={4}
                  value={formData.results}
                  onChange={(e) => handleChange('results', e.target.value)}
                  className={`w-full bg-[#1C2340] border ${errors.results ? 'border-red-500/40' : 'border-white/20'} px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] resize-none`}
                  placeholder="Describe the outcomes and impact of your activity (minimum 20 characters)..."
                />
                <div className="flex justify-between mt-2">
                  {errors.results ? (
                    <p className="text-red-400 text-xs">{errors.results}</p>
                  ) : (
                    <p className="text-[#AAB3CF] text-xs">{formData.results.length} characters</p>
                  )}
                  <p className="text-[#AAB3CF] text-xs">Min: 20 characters</p>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <Link
              href="/dashboard"
              className="px-8 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 px-8 py-3 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] rounded-lg hover:from-[#D4BE90] hover:to-[#C5A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Contribution for Review'
              )}
            </button>
          </div>
        </motion.form>
      </main>
    </div>
  );
}

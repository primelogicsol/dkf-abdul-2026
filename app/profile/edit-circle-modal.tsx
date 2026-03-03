"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CircleRegistration {
  id: string;
  full_name: string;
  country: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: string;
  life_changes: string;
  continuing_engagement: string;
  review_status: string;
  created_at: string;
}

interface EditCircleModalProps {
  registration: CircleRegistration;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: any) => void;
}

const resonatedQualities = [
  { value: "Stillness", label: "Stillness" },
  { value: "Clarity", label: "Clarity" },
  { value: "Discipline", label: "Discipline" },
  { value: "Accountability", label: "Accountability" },
  { value: "Compassion", label: "Compassion" },
  { value: "Presence", label: "Presence" },
  { value: "Ethical_Firmness", label: "Ethical Firmness" },
  { value: "Self_Awareness", label: "Self-Awareness" },
  { value: "Inner_Discipline", label: "Inner Discipline" },
  { value: "Reflective_Silence", label: "Reflective Silence" },
  { value: "Ethical_Conduct", label: "Ethical Conduct" },
  { value: "Shared_Responsibility", label: "Shared Responsibility" },
];

export default function EditCircleModal({ registration, isOpen, onClose, onSave }: EditCircleModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (isOpen && registration) {
      setFormData({
        country: registration.country,
        profession: registration.profession,
        year_connected: registration.year_connected,
        first_encounter: registration.first_encounter,
        resonated_quality: registration.resonated_quality,
        life_changes: registration.life_changes,
        continuing_engagement: registration.continuing_engagement,
      });
    }
  }, [isOpen, registration]);

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(registration.id, formData);
    setIsSaving(false);
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
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl z-50 px-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-[#C5A85C]/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white">Edit Circle Registration</h3>
                  <p className="text-[#AAB3CF] text-sm mt-1">
                    Submitted on {new Date(registration.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="text-[#AAB3CF] hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Info Banner */}
              <div className="mx-6 mt-6 bg-[#C5A85C]/10 border border-[#C5A85C]/30 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#C5A85C] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="text-sm text-[#C9CCD6]">
                    <p className="font-medium text-[#C5A85C] mb-1">Note:</p>
                    <ul className="list-disc list-inside space-y-1">
                      <li>Your name is locked to your account</li>
                      <li>Changes will reset the review status to "Pending"</li>
                      <li>All fields marked with * are required</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-6">
                {/* Personal Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Country *</label>
                    <input
                      type="text"
                      value={formData.country || ''}
                      onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Profession *</label>
                    <input
                      type="text"
                      value={formData.profession || ''}
                      onChange={(e) => setFormData({ ...formData, profession: e.target.value })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Year of First Connection *</label>
                    <input
                      type="number"
                      value={formData.year_connected || ''}
                      onChange={(e) => setFormData({ ...formData, year_connected: parseInt(e.target.value) })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Resonated Quality *</label>
                    <select
                      value={formData.resonated_quality || ''}
                      onChange={(e) => setFormData({ ...formData, resonated_quality: e.target.value })}
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                      required
                    >
                      <option value="">Select a quality</option>
                      {resonatedQualities.map((q) => (
                        <option key={q.value} value={q.value}>{q.label}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Journey Fields */}
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">First Encounter *</label>
                  <textarea
                    value={formData.first_encounter || ''}
                    onChange={(e) => setFormData({ ...formData, first_encounter: e.target.value })}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Life Changes *</label>
                  <textarea
                    value={formData.life_changes || ''}
                    onChange={(e) => setFormData({ ...formData, life_changes: e.target.value })}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                    rows={4}
                    required
                  />
                </div>

                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">Continuing Engagement *</label>
                  <textarea
                    value={formData.continuing_engagement || ''}
                    onChange={(e) => setFormData({ ...formData, continuing_engagement: e.target.value })}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                    rows={4}
                    required
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 border-t border-[#C5A85C]/20 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  disabled={isSaving}
                  className="px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSaving}
                  className="px-6 py-3 bg-gradient-to-r from-[#C5A85C] to-[#D4BE90] text-[#1C2340] rounded-lg hover:from-[#D4BE90] hover:to-[#C5A85C] transition-all shadow-lg shadow-[#C5A85C]/30 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save Changes'
                  )}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Engagement {
  id: string;
  program_type: string;
  form_type: string;
  payload: string;
  status: string;
  created_at: string;
}

interface EditModalProps {
  engagement: Engagement;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, data: any) => void;
}

export default function EditEngagementModal({ engagement, isOpen, onClose, onSave }: EditModalProps) {
  const [formData, setFormData] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);

  // Parse payload when modal opens or engagement changes
  useEffect(() => {
    if (isOpen && engagement) {
      try {
        const payload = JSON.parse(engagement.payload);
        setFormData(payload);
      } catch {
        setFormData({});
      }
    }
  }, [isOpen, engagement]);

  const handleSubmit = async () => {
    setIsSaving(true);
    await onSave(engagement.id, formData);
    setIsSaving(false);
  };

  const getProgramTitle = (program: string, formType: string) => {
    const titles: Record<string, Record<string, string>> = {
      'healing-initiatives': {
        'collaboration': 'Therapeutic Collaboration',
        'support': 'Program Support',
        'inquiry': 'Program Inquiry',
      },
      'environmental-programs': {
        'collaboration': 'Research & Field Partnership',
      },
      'sufi-music': {
        'collaboration': 'Creative Collaboration',
        'support': 'Music Program Support',
      },
      'interfaith-program': {
        'collaboration': 'Interfaith Collaboration',
        'support': 'Interfaith Program Support',
        'inquiry': 'Interfaith Program Inquiry',
      },
    };
    return titles[program]?.[formType] || `${program} - ${formType}`;
  };

  const renderFields = () => {
    const { program_type, form_type } = engagement;
    
    // Common fields for all forms
    const fields: any[] = [];

    // Add fields based on program and form type
    if (form_type === 'collaboration') {
      if (program_type === 'healing-initiatives') {
        fields.push(
          { name: 'professionalBackground', label: 'Professional Background', type: 'textarea' },
          { name: 'specialization', label: 'Area of Specialization', type: 'text' },
          { name: 'yearsExperience', label: 'Years of Experience', type: 'text' },
          { name: 'proposedContribution', label: 'Proposed Contribution', type: 'textarea', required: true },
        );
      } else if (program_type === 'environmental-programs') {
        fields.push(
          { name: 'institution', label: 'Research Institution', type: 'text' },
          { name: 'fieldOfExpertise', label: 'Field of Expertise', type: 'text' },
          { name: 'fieldExperienceYears', label: 'Field Experience (Years)', type: 'text' },
          { name: 'proposedContribution', label: 'Proposed Environmental Contribution', type: 'textarea', required: true },
        );
      } else if (program_type === 'sufi-music') {
        fields.push(
          { name: 'role', label: 'Your Role', type: 'select', options: ['singer', 'composer', 'producer', 'researcher', 'other'] },
          { name: 'portfolioLink', label: 'Portfolio / Website', type: 'text' },
          { name: 'proposedCollaboration', label: 'Proposed Collaboration', type: 'textarea', required: true },
        );
      } else if (program_type === 'interfaith-program') {
        fields.push(
          { name: 'institution', label: 'Religious/Civic Institution', type: 'text' },
          { name: 'role', label: 'Role/Position', type: 'text' },
          { name: 'proposedContribution', label: 'Proposed Collaboration', type: 'textarea', required: true },
        );
      }
    } else if (form_type === 'support') {
      fields.push(
        { name: 'supportType', label: 'Type of Support', type: 'select', options: ['volunteer', 'financial', 'resources', 'expertise'] },
        { name: 'proposedSupport', label: 'Proposed Support', type: 'textarea', required: true },
      );
    } else if (form_type === 'inquiry') {
      fields.push(
        { name: 'organization', label: 'Organization', type: 'text' },
        { name: 'inquiry', label: 'Your Inquiry', type: 'textarea', required: true },
      );
    }

    return fields.map((field) => (
      <div key={field.name} className="space-y-2">
        <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
          {field.label} {field.required && <span className="text-red-400">*</span>}
        </label>
        {field.type === 'textarea' ? (
          <textarea
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
            rows={4}
            required={field.required}
          />
        ) : field.type === 'select' ? (
          <select
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
          >
            <option value="">Select an option</option>
            {field.options.map((opt: string) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>
        ) : (
          <input
            type={field.type}
            value={formData[field.name] || ''}
            onChange={(e) => setFormData({ ...formData, [field.name]: e.target.value })}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
            placeholder={`Enter ${field.label.toLowerCase()}`}
          />
        )}
      </div>
    ));
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
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl z-50 px-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl shadow-2xl">
              {/* Header */}
              <div className="p-6 border-b border-[#C5A85C]/20 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl text-white">
                    Edit {getProgramTitle(engagement.program_type, engagement.form_type)}
                  </h3>
                  <p className="text-[#AAB3CF] text-sm mt-1">
                    Submitted on {new Date(engagement.created_at).toLocaleDateString()}
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
                      <li>Your name and email are locked to your account</li>
                      <li>Changes will reset the review status to "Pending"</li>
                      <li>All fields marked with * are required</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Form Fields */}
              <div className="p-6 space-y-6">
                {renderFields()}
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

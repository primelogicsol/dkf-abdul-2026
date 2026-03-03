"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import EditEngagementModal from "./edit-engagement-modal";
import EditCircleModal from "./edit-circle-modal";

interface User {
  id: string;
  email: string;
  full_name: string;
}

interface Engagement {
  id: string;
  program_type: string;
  form_type: string;
  payload: string;
  status: string;
  created_at: string;
  reviewed_at?: string;
}

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

interface SubmissionsTabProps {
  user: User;
}

export default function SubmissionsTab({ user }: SubmissionsTabProps) {
  const [engagements, setEngagements] = useState<Engagement[]>([]);
  const [circleRegistration, setCircleRegistration] = useState<CircleRegistration | null>(null);
  const [isMember, setIsMember] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [editingEngagement, setEditingEngagement] = useState<Engagement | null>(null);
  const [editingCircle, setEditingCircle] = useState<CircleRegistration | null>(null);

  useEffect(() => {
    fetchSubmissions();
  }, [user]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch(`/api/user/submissions?user_id=${user.id}`);
      if (response.ok) {
        const data = await response.json();
        setEngagements(data.engagements);
        setCircleRegistration(data.circleRegistration);
        setIsMember(data.isMember);
      }
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (engagement: Engagement) => {
    setEditingEngagement(engagement);
  };

  const handleEditCircle = () => {
    if (circleRegistration) {
      setEditingCircle(circleRegistration);
    }
  };

  const handleCancelEdit = () => {
    setEditingEngagement(null);
  };

  const handleCancelEditCircle = () => {
    setEditingCircle(null);
  };

  const handleSave = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/user/submissions/engagement/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          data: data,
        }),
      });

      if (response.ok) {
        setEditingEngagement(null);
        fetchSubmissions();
        return true;
      } else {
        alert('Failed to update submission');
        return false;
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update submission');
      return false;
    }
  };

  const handleSaveCircle = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/user/submissions/circle/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          data: data,
        }),
      });

      if (response.ok) {
        setEditingCircle(null);
        fetchSubmissions();
        return true;
      } else {
        alert('Failed to update registration');
        return false;
      }
    } catch (error) {
      console.error('Failed to update:', error);
      alert('Failed to update registration');
      return false;
    }
  };

  const getProgramName = (programType: string) => {
    return programType.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-500/20 text-amber-400';
      case 'approved': return 'bg-green-500/20 text-green-400';
      case 'rejected': return 'bg-red-500/20 text-red-400';
      case 'reviewed': return 'bg-blue-500/20 text-blue-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#AAB3CF]">Loading your submissions...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Circle Registration Status */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6"
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-white">The Circle Membership</h3>
        </div>

        {isMember ? (
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 text-green-400">
            <p className="font-medium">✓ You are a member of The Circle</p>
            <p className="text-sm mt-1">Your profile is published in the members directory.</p>
          </div>
        ) : circleRegistration ? (
          <div>
            <div className={`rounded-lg p-4 border ${
              circleRegistration.review_status === 'approved' ? 'bg-green-500/10 border-green-500/30 text-green-400' :
              circleRegistration.review_status === 'rejected' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
              'bg-amber-500/10 border-amber-500/30 text-amber-400'
            }`}>
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">
                    {circleRegistration.review_status === 'approved' ? '✓ Approved' :
                     circleRegistration.review_status === 'rejected' ? '✗ Rejected' :
                     '⏳ Pending Review'}
                  </p>
                  <p className="text-sm mt-1">
                    Submitted on {new Date(circleRegistration.created_at).toLocaleDateString()}
                  </p>
                </div>
                {circleRegistration.review_status === 'pending' && (
                  <button
                    onClick={handleEditCircle}
                    className="text-[#C5A85C] hover:text-white transition-colors text-sm flex items-center gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-[#AAB3CF]">
            <p>You haven't registered for The Circle yet.</p>
            <button
              onClick={() => window.location.href = '/the-circle/registration'}
              className="mt-3 text-[#C5A85C] hover:text-white transition-colors"
            >
              Register for The Circle →
            </button>
          </div>
        )}
      </motion.div>

      {/* Engagement Forms */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-[#C5A85C]/10 rounded-xl flex items-center justify-center">
            <svg className="w-6 h-6 text-[#C5A85C]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="font-serif text-xl text-white">Program Engagements</h3>
        </div>

        {engagements.length === 0 ? (
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-8 text-center">
            <p className="text-[#AAB3CF] mb-4">You haven't submitted any program engagement forms yet.</p>
            <button
              onClick={() => window.location.href = '/legacy-projects'}
              className="text-[#C5A85C] hover:text-white transition-colors"
            >
              Browse Programs →
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {engagements.map((engagement, index) => (
              <motion.div
                key={engagement.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-serif text-lg text-white mb-1">
                      {getProgramName(engagement.program_type)} - {engagement.form_type}
                    </h4>
                    <p className="text-[#AAB3CF] text-sm">
                      Submitted on {new Date(engagement.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(engagement.status)}`}>
                    {engagement.status}
                  </span>
                </div>

                <div className="mt-4 pt-4 border-t border-[#C5A85C]/10">
                  {(() => {
                    const payload = JSON.parse(engagement.payload);
                    return (
                      <div className="space-y-3">
                        {payload.proposedContribution && (
                          <div>
                            <p className="text-[#C5A85C] text-xs uppercase mb-1">Proposed Contribution</p>
                            <p className="text-[#C9CCD6] text-sm">{payload.proposedContribution}</p>
                          </div>
                        )}
                        {payload.proposedSupport && (
                          <div>
                            <p className="text-[#C5A85C] text-xs uppercase mb-1">Proposed Support</p>
                            <p className="text-[#C9CCD6] text-sm">{payload.proposedSupport}</p>
                          </div>
                        )}
                        {payload.inquiry && (
                          <div>
                            <p className="text-[#C5A85C] text-xs uppercase mb-1">Inquiry</p>
                            <p className="text-[#C9CCD6] text-sm">{payload.inquiry}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                  
                  {engagement.status === 'pending' && (
                    <button
                      onClick={() => handleEdit(engagement)}
                      className="mt-4 text-[#C5A85C] hover:text-white transition-colors text-sm flex items-center gap-2"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      Edit Submission
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Edit Engagement Modal */}
      {editingEngagement && (
        <EditEngagementModal
          engagement={editingEngagement}
          isOpen={!!editingEngagement}
          onClose={handleCancelEdit}
          onSave={handleSave}
        />
      )}

      {/* Edit Circle Modal */}
      {editingCircle && (
        <EditCircleModal
          registration={editingCircle}
          isOpen={!!editingCircle}
          onClose={handleCancelEditCircle}
          onSave={handleSaveCircle}
        />
      )}
    </div>
  );
}

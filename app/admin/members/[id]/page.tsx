"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";

interface Member {
  id: string;
  full_name: string;
  country: string;
  city?: string;
  profession: string;
  year_connected: number;
  first_encounter: string;
  resonated_quality: string;
  life_changes: string;
  continuing_engagement: string;
  photo_url?: string;
  media_url?: string;
  approved: boolean;
  visibility_status: 'draft' | 'published' | 'archived';
}

const resonatedQualities = [
  "Stillness",
  "Clarity",
  "Discipline",
  "Accountability",
  "Compassion",
  "Presence",
  "Ethical_Firmness",
  "Self_Awareness",
  "Inner_Discipline",
  "Reflective_Silence",
  "Ethical_Conduct",
  "Shared_Responsibility",
];

export default function EditMemberPage() {
  const router = useRouter();
  const params = useParams();
  const memberId = params.id as string;
  
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<Partial<Member>>({});

  useEffect(() => {
    if (memberId === 'new') {
      setMember({
        id: '',
        full_name: '',
        country: '',
        city: '',
        profession: '',
        year_connected: new Date().getFullYear(),
        first_encounter: '',
        resonated_quality: 'Self_Awareness',
        life_changes: '',
        continuing_engagement: '',
        approved: false,
        visibility_status: 'draft',
      });
      setFormData({});
      setLoading(false);
      return;
    }

    fetchMember();
  }, [memberId]);

  const fetchMember = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/members/${memberId}`, {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setMember(data);
        setFormData({});
      }
    } catch (error) {
      console.error('Failed to fetch member:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof Member, value: any) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = async (status?: 'draft' | 'published') => {
    setSaving(true);
    try {
      const token = localStorage.getItem("admin_token");
      const data = { ...formData };
      if (status) {
        data.visibility_status = status;
        if (status === 'published') {
          data.approved = true;
        }
      }

      const url = memberId === 'new' 
        ? '/api/admin/members' 
        : `/api/admin/members/${memberId}`;
      const method = memberId === 'new' ? 'POST' : 'PATCH';

      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        router.push('/admin/members');
      }
    } catch (error) {
      console.error('Failed to save member:', error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <span className="text-[#C9CCD6]">Loading...</span>
      </div>
    );
  }

  const currentData = { ...member, ...formData };

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/admin/members" className="text-[#C9CCD6] text-sm hover:text-white mb-2 inline-block">
            ← Back to Members
          </Link>
          <h2 className="text-white font-sans text-xl uppercase tracking-wider">
            {memberId === 'new' ? 'Add Member' : 'Edit Member'}
          </h2>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => handleSave('draft')}
            disabled={saving}
            className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C] disabled:opacity-50"
          >
            Save Draft
          </button>
          <button
            onClick={() => handleSave('published')}
            disabled={saving}
            className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80 disabled:opacity-50"
          >
            {memberId === 'new' ? 'Create & Publish' : 'Save & Publish'}
          </button>
        </div>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20 p-6 space-y-6">
        <h3 className="text-white font-sans text-sm uppercase tracking-wider mb-4">Basic Information</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
            <input
              type="text"
              value={currentData?.full_name || ''}
              onChange={(e) => handleChange('full_name', e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
            />
          </div>
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Profession</label>
            <input
              type="text"
              value={currentData?.profession || ''}
              onChange={(e) => handleChange('profession', e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
            <input
              type="text"
              value={currentData?.country || ''}
              onChange={(e) => handleChange('country', e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
            />
          </div>
          <div>
            <label className="block text-[#C9CCD6] text-xs uppercase mb-2">City (Optional)</label>
            <input
              type="text"
              value={currentData?.city || ''}
              onChange={(e) => handleChange('city', e.target.value)}
              className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
            />
          </div>
        </div>

        <div>
          <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year Connected</label>
          <input
            type="number"
            value={currentData?.year_connected || ''}
            onChange={(e) => handleChange('year_connected', parseInt(e.target.value))}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
          />
        </div>

        <div>
          <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Resonated Quality</label>
          <select
            value={currentData?.resonated_quality || ''}
            onChange={(e) => handleChange('resonated_quality', e.target.value)}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
          >
            {resonatedQualities.map((q) => (
              <option key={q} value={q}>{q.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20 p-6 space-y-6">
        <h3 className="text-white font-sans text-sm uppercase tracking-wider mb-4">Member Story</h3>
        
        <div>
          <label className="block text-[#C9CCD6] text-xs uppercase mb-2">First Encounter</label>
          <textarea
            value={currentData?.first_encounter || ''}
            onChange={(e) => handleChange('first_encounter', e.target.value)}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[120px]"
            placeholder="Describe how they first encountered the work..."
          />
        </div>

        <div>
          <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Life Changes</label>
          <textarea
            value={currentData?.life_changes || ''}
            onChange={(e) => handleChange('life_changes', e.target.value)}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[120px]"
            placeholder="Describe changes since connecting..."
          />
        </div>

        <div>
          <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Continuing Engagement</label>
          <textarea
            value={currentData?.continuing_engagement || ''}
            onChange={(e) => handleChange('continuing_engagement', e.target.value)}
            className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[120px]"
            placeholder="Describe ongoing participation..."
          />
        </div>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20 p-6">
        <h3 className="text-white font-sans text-sm uppercase tracking-wider mb-4">Status</h3>
        <div className="flex items-center gap-4">
          <span className="text-[#C9CCD6] text-sm">Current Status:</span>
          <span className={`px-3 py-1 text-xs uppercase ${
            currentData?.visibility_status === 'published' ? 'bg-green-500/20 text-green-400' :
            currentData?.visibility_status === 'draft' ? 'bg-yellow-500/20 text-yellow-400' :
            'bg-red-500/20 text-red-400'
          }`}>
            {currentData?.visibility_status || 'draft'}
          </span>
          {currentData?.approved && (
            <span className="px-3 py-1 text-xs uppercase bg-green-500/20 text-green-400">
              Approved
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

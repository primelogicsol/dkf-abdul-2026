"use client";

import { useEffect, useState } from "react";

interface Governance {
  id: string;
  full_name: string;
  role_title: string;
  bio_summary?: string;
  term_start?: string;
  term_end?: string;
  is_active: boolean;
}

export default function GovernancePage() {
  const [governance, setGovernance] = useState<Governance[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    full_name: '',
    role_title: '',
    bio_summary: '',
    term_start: '',
    term_end: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchGovernance();
  }, []);

  const fetchGovernance = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/governance', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setGovernance(data);
      }
    } catch (error) {
      console.error('Failed to fetch governance:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId 
        ? `/api/admin/governance/${editingId}`
        : '/api/admin/governance';
      const method = editingId ? 'PATCH' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setShowForm(false);
        setEditingId(null);
        setFormData({ full_name: '', role_title: '', bio_summary: '', term_start: '', term_end: '' });
        fetchGovernance();
      }
    } catch (error) {
      console.error('Failed to save governance:', error);
    }
  };

  const handleEdit = (item: Governance) => {
    setEditingId(item.id);
    setFormData({
      full_name: item.full_name,
      role_title: item.role_title,
      bio_summary: item.bio_summary || '',
      term_start: item.term_start ? item.term_start.split('T')[0] : '',
      term_end: item.term_end ? item.term_end.split('T')[0] : '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/governance/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) fetchGovernance();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  const handleToggleActive = async (id: string, isActive: boolean) => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/governance/${id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ is_active: !isActive }),
      });
      if (response.ok) fetchGovernance();
    } catch (error) {
      console.error('Failed to update:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-sans text-xl uppercase tracking-wider">Governance</h2>
          <p className="text-[#C9CCD6] text-sm mt-1">Board and leadership management</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ full_name: '', role_title: '', bio_summary: '', term_start: '', term_end: '' });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors"
        >
          Add Member
        </button>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Name</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Role</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Term</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Status</th>
              <th className="text-right text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#C9CCD6]">Loading...</td></tr>
            ) : governance.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-[#C9CCD6]">No governance members</td></tr>
            ) : (
              governance.map((g) => (
                <tr key={g.id} className="border-b border-[#C5A85C]/10">
                  <td className="p-4 text-white">{g.full_name}</td>
                  <td className="p-4 text-[#C9CCD6]">{g.role_title}</td>
                  <td className="p-4 text-[#C9CCD6]">
                    {g.term_start ? new Date(g.term_start).toLocaleDateString() : 'N/A'} - 
                    {g.term_end ? new Date(g.term_end).toLocaleDateString() : 'Present'}
                  </td>
                  <td className="p-4">
                    <span className={`px-2 py-1 text-xs uppercase ${g.is_active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {g.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(g)}
                      className="px-3 py-1 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleToggleActive(g.id, g.is_active)}
                      className="px-3 py-1 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
                    >
                      {g.is_active ? 'Deactivate' : 'Activate'}
                    </button>
                    <button
                      onClick={() => handleDelete(g.id)}
                      className="px-3 py-1 text-xs text-[#C9CCD6] hover:text-red-400"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleSubmit} className="bg-[#242B4A] border border-[#C5A85C]/20 p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <h3 className="text-white font-sans text-lg uppercase tracking-wider mb-6">
              {editingId ? 'Edit Governance Member' : 'Add Governance Member'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Full Name</label>
                <input
                  type="text"
                  value={formData.full_name}
                  onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Role Title</label>
                <input
                  type="text"
                  value={formData.role_title}
                  onChange={(e) => setFormData({ ...formData, role_title: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                  placeholder="e.g., Board Member, Trustee, Advisor"
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Bio Summary</label>
                <textarea
                  value={formData.bio_summary}
                  onChange={(e) => setFormData({ ...formData, bio_summary: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[100px]"
                  rows={4}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Term Start</label>
                  <input
                    type="date"
                    value={formData.term_start}
                    onChange={(e) => setFormData({ ...formData, term_start: e.target.value })}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>
                <div>
                  <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Term End</label>
                  <input
                    type="date"
                    value={formData.term_end}
                    onChange={(e) => setFormData({ ...formData, term_end: e.target.value })}
                    className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  />
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingId(null);
                }} 
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80">
                {editingId ? 'Save Changes' : 'Add Member'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

interface Gathering {
  id: string;
  year: number;
  location_city: string;
  location_country: string;
  description?: string;
}

export default function GatheringsPage() {
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    year: new Date().getFullYear(),
    location_city: '',
    location_country: '',
    description: '',
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    fetchGatherings();
  }, []);

  const fetchGatherings = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/gatherings', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setGatherings(data);
      }
    } catch (error) {
      console.error('Failed to fetch gatherings:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingId ? `/api/admin/gatherings/${editingId}` : '/api/admin/gatherings';
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
        setFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', description: '' });
        fetchGatherings();
      }
    } catch (error) {
      console.error('Failed to save gathering:', error);
    }
  };

  const handleEdit = (item: Gathering) => {
    setEditingId(item.id);
    setFormData({
      year: item.year,
      location_city: item.location_city,
      location_country: item.location_country,
      description: item.description || '',
    });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure?')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/gatherings/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) fetchGatherings();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-sans text-xl uppercase tracking-wider">Gatherings</h2>
          <p className="text-[#C9CCD6] text-sm mt-1">Documented meetings and events</p>
        </div>
        <button
          onClick={() => {
            setEditingId(null);
            setFormData({ year: new Date().getFullYear(), location_city: '', location_country: '', description: '' });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors"
        >
          Record Gathering
        </button>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Year</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Location</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Description</th>
              <th className="text-right text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="p-8 text-center text-[#C9CCD6]">Loading...</td></tr>
            ) : gatherings.length === 0 ? (
              <tr><td colSpan={4} className="p-8 text-center text-[#C9CCD6]">No gatherings recorded</td></tr>
            ) : (
              gatherings.map((g) => (
                <tr key={g.id} className="border-b border-[#C5A85C]/10">
                  <td className="p-4 text-white">{g.year}</td>
                  <td className="p-4 text-[#C9CCD6]">{g.location_city}, {g.location_country}</td>
                  <td className="p-4 text-[#C9CCD6]">{g.description || '-'}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(g)}
                      className="px-3 py-1 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
                    >
                      Edit
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
          <form onSubmit={handleSubmit} className="bg-[#242B4A] border border-[#C5A85C]/20 p-6 w-full max-w-md">
            <h3 className="text-white font-sans text-lg uppercase tracking-wider mb-6">
              {editingId ? 'Edit Gathering' : 'Record Gathering'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({ ...formData, year: parseInt(e.target.value) })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">City</label>
                <input
                  type="text"
                  value={formData.location_city}
                  onChange={(e) => setFormData({ ...formData, location_city: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                <input
                  type="text"
                  value={formData.location_country}
                  onChange={(e) => setFormData({ ...formData, location_country: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                />
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[80px]"
                  rows={3}
                />
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
                {editingId ? 'Save Changes' : 'Record'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

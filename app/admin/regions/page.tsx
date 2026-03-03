"use client";

import { useEffect, useState } from "react";

interface Region {
  id: string;
  continent: string;
  country: string;
}

export default function RegionsPage() {
  const [regions, setRegions] = useState<Region[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ continent: '', country: '' });
  const [editingCountry, setEditingCountry] = useState<string | null>(null);

  useEffect(() => {
    fetchRegions();
  }, []);

  const fetchRegions = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/regions', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setRegions(data);
      }
    } catch (error) {
      console.error('Failed to fetch regions:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("admin_token");
      const url = editingCountry ? `/api/admin/regions/${editingCountry}` : '/api/admin/regions';
      const method = editingCountry ? 'PATCH' : 'POST';
      
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
        setEditingCountry(null);
        setFormData({ continent: '', country: '' });
        fetchRegions();
      }
    } catch (error) {
      console.error('Failed to save region:', error);
    }
  };

  const handleEdit = (item: Region) => {
    setEditingCountry(item.country);
    setFormData({ continent: item.continent, country: item.country });
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure? This may affect linked members.')) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/regions/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) fetchRegions();
    } catch (error) {
      console.error('Failed to delete:', error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-white font-sans text-xl uppercase tracking-wider">Regions</h2>
          <p className="text-[#C9CCD6] text-sm mt-1">Geographic data management</p>
        </div>
        <button
          onClick={() => {
            setEditingCountry(null);
            setFormData({ continent: '', country: '' });
            setShowForm(true);
          }}
          className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider font-medium hover:bg-[#C5A85C]/80 transition-colors"
        >
          Add Region
        </button>
      </div>

      <div className="bg-[#242B4A] border border-[#C5A85C]/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#C5A85C]/20">
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Continent</th>
              <th className="text-left text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Country</th>
              <th className="text-right text-[#C9CCD6] text-xs uppercase tracking-wider font-normal p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="p-8 text-center text-[#C9CCD6]">Loading...</td></tr>
            ) : regions.length === 0 ? (
              <tr><td colSpan={3} className="p-8 text-center text-[#C9CCD6]">No regions added</td></tr>
            ) : (
              regions.map((r) => (
                <tr key={r.id} className="border-b border-[#C5A85C]/10">
                  <td className="p-4 text-white">{r.continent}</td>
                  <td className="p-4 text-[#C9CCD6]">{r.country}</td>
                  <td className="p-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(r)}
                      className="px-3 py-1 text-xs border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id)}
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
              {editingCountry ? 'Edit Region' : 'Add Region'}
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Continent</label>
                <select
                  value={formData.continent}
                  onChange={(e) => setFormData({ ...formData, continent: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                >
                  <option value="">Select Continent</option>
                  <option value="Africa">Africa</option>
                  <option value="Asia">Asia</option>
                  <option value="Europe">Europe</option>
                  <option value="North America">North America</option>
                  <option value="South America">South America</option>
                  <option value="Oceania">Oceania</option>
                  <option value="Antarctica">Antarctica</option>
                </select>
              </div>
              <div>
                <label className="block text-[#C9CCD6] text-xs uppercase mb-2">Country</label>
                <input
                  type="text"
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  required
                  placeholder="e.g., United Kingdom"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-6">
              <button 
                type="button" 
                onClick={() => {
                  setShowForm(false);
                  setEditingCountry(null);
                }} 
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button type="submit" className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80">
                {editingCountry ? 'Save Changes' : 'Add Region'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

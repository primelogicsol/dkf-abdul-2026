"use client";

import { useEffect, useState } from "react";

interface PrinciplePage {
  id: string;
  title: string;
  definition: string;
  context?: string;
  practical_implication?: string;
  selected_words?: string;
  display_order: number;
}

export default function PrinciplesContentPage() {
  const [principles, setPrinciples] = useState<PrinciplePage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPrinciple, setSelectedPrinciple] = useState<PrinciplePage | null>(null);
  const [editedData, setEditedData] = useState<Partial<PrinciplePage>>({});

  useEffect(() => {
    fetchPrinciples();
  }, []);

  const fetchPrinciples = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/content/principles', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setPrinciples(data);
      }
    } catch (error) {
      console.error('Failed to fetch principles:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedPrinciple) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/content/principles/${selectedPrinciple.id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedData),
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedPrinciple(updated);
        fetchPrinciples();
      }
    } catch (error) {
      console.error('Failed to save principle:', error);
    }
  };

  const openEditor = (principle: PrinciplePage) => {
    setSelectedPrinciple(principle);
    setEditedData({
      definition: principle.definition,
      context: principle.context,
      practical_implication: principle.practical_implication,
      selected_words: principle.selected_words,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-sans text-xl uppercase tracking-wider">Core Principles</h2>
        <p className="text-[#C9CCD6] text-sm mt-1">Edit principle definitions and content</p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-[#C9CCD6] text-center py-12">Loading...</div>
        ) : (
          principles.map((principle) => (
            <div
              key={principle.id}
              className="bg-[#242B4A] border border-[#C5A85C]/20 p-5 hover:border-[#C5A85C]/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#C5A85C] text-xs font-mono">
                      {String(principle.display_order).padStart(2, '0')}
                    </span>
                    <h3 className="text-white font-serif text-lg">{principle.title}</h3>
                  </div>
                  <p className="text-[#C9CCD6] text-sm leading-relaxed line-clamp-2">
                    {principle.definition}
                  </p>
                </div>
                <button
                  onClick={() => openEditor(principle)}
                  className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C] hover:text-white transition-colors ml-4"
                >
                  Edit
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Editor Modal */}
      {selectedPrinciple && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242B4A] border border-[#C5A85C]/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="p-5 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#242B4A]">
              <h3 className="text-white font-sans text-lg uppercase tracking-wider">
                Edit: {selectedPrinciple.title}
              </h3>
              <button
                onClick={() => {
                  setSelectedPrinciple(null);
                  setEditedData({});
                }}
                className="text-[#C9CCD6] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 space-y-5">
              <div>
                <label className="block text-[#C5A85C] text-xs uppercase mb-2">Definition</label>
                <textarea
                  value={editedData.definition ?? selectedPrinciple.definition}
                  onChange={(e) => setEditedData({ ...editedData, definition: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[120px]"
                />
              </div>

              <div>
                <label className="block text-[#C5A85C] text-xs uppercase mb-2">Context</label>
                <textarea
                  value={editedData.context ?? selectedPrinciple.context ?? ''}
                  onChange={(e) => setEditedData({ ...editedData, context: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-[#C5A85C] text-xs uppercase mb-2">Practical Implication</label>
                <textarea
                  value={editedData.practical_implication ?? selectedPrinciple.practical_implication ?? ''}
                  onChange={(e) => setEditedData({ ...editedData, practical_implication: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[100px]"
                />
              </div>

              <div>
                <label className="block text-[#C5A85C] text-xs uppercase mb-2">Selected Words</label>
                <input
                  type="text"
                  value={editedData.selected_words ?? selectedPrinciple.selected_words ?? ''}
                  onChange={(e) => setEditedData({ ...editedData, selected_words: e.target.value })}
                  className="w-full bg-[#1C2340] border border-white/20 px-4 py-2 text-white text-sm focus:outline-none focus:border-[#C5A85C]"
                  placeholder="Short phrase or quote"
                />
              </div>
            </div>

            <div className="p-5 border-t border-[#C5A85C]/20 flex justify-end gap-3 sticky bottom-0 bg-[#242B4A]">
              <button
                onClick={() => {
                  setSelectedPrinciple(null);
                  setEditedData({});
                }}
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] text-xs uppercase tracking-wider hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] text-xs uppercase tracking-wider hover:bg-[#C5A85C]/80"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

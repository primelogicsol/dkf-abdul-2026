"use client";

import { useEffect, useState } from "react";

interface FoundationSection {
  id: string;
  section_name: string;
  content: string;
  display_order: number;
}

export default function FoundationContentPage() {
  const [sections, setSections] = useState<FoundationSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<FoundationSection | null>(null);
  const [editedContent, setEditedContent] = useState('');

  useEffect(() => {
    fetchSections();
  }, []);

  const fetchSections = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch('/api/admin/content/foundation', {
        headers: { 'Authorization': `Bearer ${token}` },
      });
      if (response.ok) {
        const data = await response.json();
        setSections(data);
      }
    } catch (error) {
      console.error('Failed to fetch sections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedSection) return;
    try {
      const token = localStorage.getItem("admin_token");
      const response = await fetch(`/api/admin/content/foundation/${selectedSection.id}`, {
        method: 'PATCH',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: editedContent }),
      });
      if (response.ok) {
        const updated = await response.json();
        setSelectedSection(updated);
        fetchSections();
      }
    } catch (error) {
      console.error('Failed to save section:', error);
    }
  };

  const openEditor = (section: FoundationSection) => {
    setSelectedSection(section);
    setEditedContent(section.content);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-white font-sans text-xl uppercase tracking-wider">Foundation Content</h2>
        <p className="text-[#C9CCD6] text-sm mt-1">Edit Foundation page sections</p>
      </div>

      <div className="grid gap-4">
        {loading ? (
          <div className="text-[#C9CCD6] text-center py-12">Loading...</div>
        ) : (
          sections.map((section) => (
            <div
              key={section.id}
              className="bg-[#242B4A] border border-[#C5A85C]/20 p-5 hover:border-[#C5A85C]/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[#C5A85C] text-xs font-mono">
                      {String(section.display_order).padStart(2, '0')}
                    </span>
                    <h3 className="text-white font-serif text-lg">{section.section_name}</h3>
                  </div>
                  <p className="text-[#C9CCD6] text-sm leading-relaxed line-clamp-2">
                    {section.content}
                  </p>
                </div>
                <button
                  onClick={() => openEditor(section)}
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
      {selectedSection && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242B4A] border border-[#C5A85C]/20 w-full max-w-3xl max-h-[90vh] overflow-y-auto flex flex-col">
            <div className="p-5 border-b border-[#C5A85C]/20 flex items-center justify-between sticky top-0 bg-[#242B4A]">
              <h3 className="text-white font-sans text-lg uppercase tracking-wider">
                Edit: {selectedSection.section_name}
              </h3>
              <button
                onClick={() => {
                  setSelectedSection(null);
                  setEditedContent('');
                }}
                className="text-[#C9CCD6] hover:text-white"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-5 flex-1">
              <label className="block text-[#C5A85C] text-xs uppercase mb-2">Content</label>
              <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white text-sm focus:outline-none focus:border-[#C5A85C] min-h-[400px]"
              />
            </div>

            <div className="p-5 border-t border-[#C5A85C]/20 flex justify-end gap-3 sticky bottom-0 bg-[#242B4A]">
              <button
                onClick={() => {
                  setSelectedSection(null);
                  setEditedContent('');
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

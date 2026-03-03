"use client";

import { useEffect, useState } from "react";

interface PrinciplePage {
  id: string;
  title: string;
  definition: string;
  display_order: number;
}

interface FoundationSection {
  id: string;
  section_name: string;
  content: string;
  display_order: number;
}

export default function ContentPage() {
  const [activeTab, setActiveTab] = useState<'principles' | 'foundation'>('principles');
  const [principlePages, setPrinciplePages] = useState<PrinciplePage[]>([]);
  const [foundationSections, setFoundationSections] = useState<FoundationSection[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<PrinciplePage | FoundationSection | null>(null);
  const [editContent, setEditContent] = useState('');

  useEffect(() => {
    fetchContent();
  }, [activeTab]);

  const fetchContent = async () => {
    setLoading(true);
    try {
      if (activeTab === 'principles') {
        const response = await fetch('/api/admin/content/principles');
        if (response.ok) {
          const data = await response.json();
          setPrinciplePages(data);
        }
      } else {
        const response = await fetch('/api/admin/content/foundation');
        if (response.ok) {
          const data = await response.json();
          setFoundationSections(data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch content:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!selectedItem) return;
    
    try {
      const endpoint = activeTab === 'principles' 
        ? `/api/admin/content/principles/${selectedItem.id}`
        : `/api/admin/content/foundation/${selectedItem.id}`;
      
      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          [activeTab === 'principles' ? 'definition' : 'content']: editContent 
        }),
      });
      
      if (response.ok) {
        fetchContent();
        setSelectedItem(null);
      }
    } catch (error) {
      console.error('Failed to save content:', error);
    }
  };

  const openEditor = (item: PrinciplePage | FoundationSection) => {
    setSelectedItem(item);
    setEditContent(activeTab === 'principles' 
      ? (item as PrinciplePage).definition 
      : (item as FoundationSection).content);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-white font-serif text-2xl">Content Management</h2>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-[#C5A85C]/20">
        <button
          onClick={() => setActiveTab('principles')}
          className={`px-4 py-2 text-sm border-b-2 transition-colors ${
            activeTab === 'principles'
              ? 'border-[#C5A85C] text-white'
              : 'border-transparent text-[#C9CCD6] hover:text-white'
          }`}
        >
          Core Principles
        </button>
        <button
          onClick={() => setActiveTab('foundation')}
          className={`px-4 py-2 text-sm border-b-2 transition-colors ${
            activeTab === 'foundation'
              ? 'border-[#C5A85C] text-white'
              : 'border-transparent text-[#C9CCD6] hover:text-white'
          }`}
        >
          Foundation Sections
        </button>
      </div>

      {/* Content List */}
      <div className="bg-[#242B4A] border border-[#C5A85C]/20">
        {loading ? (
          <div className="p-8 text-center text-[#C9CCD6]">Loading...</div>
        ) : activeTab === 'principles' ? (
          <div className="divide-y divide-[#C5A85C]/10">
            {principlePages.map((page) => (
              <div key={page.id} className="p-4 flex items-center justify-between hover:bg-[#1C2340]/50">
                <div>
                  <h3 className="text-white font-serif">{page.title}</h3>
                  <p className="text-[#C9CCD6] text-sm mt-1 line-clamp-2">{page.definition}</p>
                </div>
                <button
                  onClick={() => openEditor(page)}
                  className="px-4 py-2 border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] hover:text-white transition-colors"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-[#C5A85C]/10">
            {foundationSections.map((section) => (
              <div key={section.id} className="p-4 flex items-center justify-between hover:bg-[#1C2340]/50">
                <div>
                  <h3 className="text-white font-serif">{section.section_name}</h3>
                  <p className="text-[#C9CCD6] text-sm mt-1 line-clamp-2">{section.content}</p>
                </div>
                <button
                  onClick={() => openEditor(section)}
                  className="px-4 py-2 border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C] hover:text-white transition-colors"
                >
                  Edit
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-[#242B4A] border border-[#C5A85C]/20 w-full max-w-3xl max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-[#C5A85C]/20 flex items-center justify-between">
              <h3 className="text-white font-serif text-xl">
                Edit {activeTab === 'principles' ? 'Principle' : 'Section'}: {'title' in selectedItem ? selectedItem.title : selectedItem.section_name}
              </h3>
              <button onClick={() => setSelectedItem(null)} className="text-[#C9CCD6] hover:text-white">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-4 flex-1 overflow-y-auto">
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white min-h-[300px] resize-none focus:outline-none focus:border-[#C5A85C]"
              />
            </div>
            <div className="p-4 border-t border-[#C5A85C]/20 flex justify-end gap-3">
              <button
                onClick={() => setSelectedItem(null)}
                className="px-4 py-2 border border-white/20 text-[#C9CCD6] hover:border-[#C5A85C]"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#C5A85C] text-[#1C2340] hover:bg-[#C5A85C]/80"
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

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import AdminLayout from "../components/AdminLayout";

interface Quote {
  id: string;
  text: string;
  category: string;
  is_featured: boolean;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const CATEGORIES = [
  "Compassion",
  "Self Awareness",
  "Inner Discipline",
  "Ethical Conduct",
  "Human Unity",
  "Peace and Reflection",
];

export default function AdminQuotesPage() {
  const router = useRouter();
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingQuote, setEditingQuote] = useState<Quote | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [user, setUser] = useState<{
    id: string;
    email: string;
    full_name: string;
    role: string;
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isToggling, setIsToggling] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    text: "",
    category: "Compassion",
    is_featured: false,
    display_order: 0,
    is_active: true,
  });

  useEffect(() => {
    // Check admin session
    const session = localStorage.getItem("admin_session");
    if (!session) {
      router.push("/admin/login");
      return;
    }
    setUser(JSON.parse(session));
    fetchQuotes();
  }, [searchQuery, selectedCategory]);

  const fetchQuotes = async () => {
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append("search", searchQuery);
      if (selectedCategory !== "All") params.append("category", selectedCategory);

      const response = await fetch(`/api/admin/quotes?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setQuotes(data);
      }
    } catch (error) {
      console.error("Failed to fetch quotes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const url = editingQuote
        ? `/api/admin/quotes/${editingQuote.id}`
        : "/api/admin/quotes";
      
      const method = editingQuote ? "PUT" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setIsModalOpen(false);
        setEditingQuote(null);
        setFormData({
          text: "",
          category: "Compassion",
          is_featured: false,
          display_order: 0,
          is_active: true,
        });
        fetchQuotes();
      }
    } catch (error) {
      console.error("Failed to save quote:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (quote: Quote) => {
    setEditingQuote(quote);
    setFormData({
      text: quote.text,
      category: quote.category,
      is_featured: quote.is_featured,
      display_order: quote.display_order,
      is_active: quote.is_active,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      const response = await fetch(`/api/admin/quotes/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setDeleteConfirmId(null);
        fetchQuotes();
      }
    } catch (error) {
      console.error("Failed to delete quote:", error);
    } finally {
      setIsDeleting(null);
    }
  };

  const toggleFeatured = async (quote: Quote) => {
    setIsToggling(quote.id);
    try {
      const response = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_featured: !quote.is_featured }),
      });
      if (response.ok) {
        fetchQuotes();
      }
    } catch (error) {
      console.error("Failed to toggle featured:", error);
    } finally {
      setIsToggling(null);
    }
  };

  const toggleActive = async (quote: Quote) => {
    setIsToggling(quote.id);
    try {
      const response = await fetch(`/api/admin/quotes/${quote.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: !quote.is_active }),
      });
      if (response.ok) {
        fetchQuotes();
      }
    } catch (error) {
      console.error("Failed to toggle active:", error);
    } finally {
      setIsToggling(null);
    }
  };

  const filteredQuotes = quotes.filter((quote) => {
    const matchesSearch =
      quote.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      quote.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || quote.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (!user) {
    return null;
  }

  return (
    <AdminLayout userRole={user.role} userName={user.full_name} userEmail={user.email}>
      <div className="min-h-screen bg-[#1C2340]">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="font-serif text-3xl text-white mb-2">Quotes Management</h1>
              <p className="text-[#AAB3CF] text-sm">
                Manage Dr. Kumar&apos;s wisdom quotes for the Teachings section
              </p>
            </div>
            <button
              onClick={() => {
                setEditingQuote(null);
                setFormData({
                  text: "",
                  category: "Compassion",
                  is_featured: false,
                  display_order: 0,
                  is_active: true,
                });
                setIsModalOpen(true);
              }}
              disabled={isSubmitting}
              className="px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Quote
                </>
              )}
            </button>
          </div>
        </div>

      {/* Filters */}
      <section className="px-8 py-6 bg-[#151A30] border-b border-[#C5A85C]/10">
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search quotes or categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 pl-12 pr-4 text-white placeholder-[#AAB3CF]/60 focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C5A85C]/60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="bg-[#232B52] border border-[#C5A85C]/20 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#C5A85C]/40 transition-colors"
          >
            <option value="All">All Categories</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* Stats */}
          <div className="flex items-center gap-6 ml-auto">
            <div className="text-center">
              <p className="text-2xl font-serif text-white">{quotes.length}</p>
              <p className="text-[#AAB3CF] text-xs uppercase tracking-wider">Total</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-[#C5A85C]">
                {quotes.filter((q) => q.is_featured).length}
              </p>
              <p className="text-[#AAB3CF] text-xs uppercase tracking-wider">Featured</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-serif text-green-400">
                {quotes.filter((q) => q.is_active).length}
              </p>
              <p className="text-[#AAB3CF] text-xs uppercase tracking-wider">Active</p>
            </div>
          </div>
        </div>
      </section>

      {/* Quotes Table */}
      <main className="p-8">
        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-16 h-16 border-4 border-[#C5A85C]/20 border-t-[#C5A85C] rounded-full animate-spin" />
          </div>
        ) : filteredQuotes.length === 0 ? (
          <div className="text-center py-20 bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl">
            <svg
              className="w-16 h-16 text-[#C5A85C]/20 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-[#AAB3CF] text-lg mb-2">No quotes found</p>
            <p className="text-[#6B7299] text-sm">
              {searchQuery || selectedCategory !== "All"
                ? "Try adjusting your filters"
                : "Add your first quote to get started"}
            </p>
          </div>
        ) : (
          <div className="bg-[#232B52] border border-[#C5A85C]/15 rounded-2xl overflow-hidden">
            <table className="w-full">
              <thead className="bg-[#1C2340] border-b border-[#C5A85C]/20">
                <tr>
                  <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6 font-medium">
                    Quote
                  </th>
                  <th className="text-left text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6 font-medium">
                    Category
                  </th>
                  <th className="text-center text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6 font-medium">
                    Featured
                  </th>
                  <th className="text-center text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6 font-medium">
                    Active
                  </th>
                  <th className="text-right text-[#C5A85C] text-xs uppercase tracking-wider py-4 px-6 font-medium">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <AnimatePresence>
                  {filteredQuotes.map((quote, index) => (
                    <motion.tr
                      key={quote.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="border-b border-[#C5A85C]/5 hover:bg-[#1C2340]/50 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <p className="text-white text-sm leading-relaxed line-clamp-2 max-w-xl">
                          {quote.text}
                        </p>
                        <p className="text-[#6B7299] text-xs mt-2">
                          Added {new Date(quote.created_at).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className="inline-block px-3 py-1 bg-[#C5A85C]/10 text-[#C5A85C] text-xs uppercase tracking-wider rounded-full">
                          {quote.category}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleFeatured(quote)}
                          disabled={isToggling === quote.id}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            quote.is_featured
                              ? "bg-[#C5A85C]"
                              : "bg-[#C5A85C]/20"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isToggling === quote.id ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                          ) : (
                            <div
                              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                quote.is_featured ? "left-7" : "left-1"
                              }`}
                            />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <button
                          onClick={() => toggleActive(quote)}
                          disabled={isToggling === quote.id}
                          className={`w-12 h-6 rounded-full transition-colors relative ${
                            quote.is_active
                              ? "bg-green-500"
                              : "bg-green-500/20"
                          } disabled:opacity-50 disabled:cursor-not-allowed`}
                        >
                          {isToggling === quote.id ? (
                            <div className="absolute inset-0 flex items-center justify-center">
                              <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            </div>
                          ) : (
                            <div
                              className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                                quote.is_active ? "left-7" : "left-1"
                              }`}
                            />
                          )}
                        </button>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleEdit(quote)}
                            disabled={isSubmitting}
                            className="p-2 text-[#C5A85C] hover:bg-[#C5A85C]/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Edit"
                          >
                            {isSubmitting ? (
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            )}
                          </button>
                          <button
                            onClick={() => setDeleteConfirmId(quote.id)}
                            disabled={isDeleting === quote.id}
                            className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete"
                          >
                            {isDeleting === quote.id ? (
                              <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                              </svg>
                            ) : (
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={1.5}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                            )}
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </AnimatePresence>
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#C5A85C]/20">
                  <h2 className="font-serif text-2xl text-white">
                    {editingQuote ? "Edit Quote" : "Add New Quote"}
                  </h2>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="text-[#AAB3CF] hover:text-white transition-colors"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>

                {/* Modal Body */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                  {/* Quote Text */}
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                      Quote Text *
                    </label>
                    <textarea
                      value={formData.text}
                      onChange={(e) =>
                        setFormData({ ...formData, text: e.target.value })
                      }
                      rows={4}
                      required
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C] resize-none"
                      placeholder='Enter the quote text... e.g., "The heart becomes clear when it stops arguing with truth."'
                    />
                  </div>

                  {/* Category */}
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                      Category *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Display Order */}
                  <div>
                    <label className="block text-[#C9CCD6] text-xs uppercase mb-2 font-medium">
                      Display Order
                    </label>
                    <input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          display_order: parseInt(e.target.value) || 0,
                        })
                      }
                      className="w-full bg-[#1C2340] border border-white/20 px-4 py-3 text-white rounded-lg focus:outline-none focus:border-[#C5A85C]"
                    />
                    <p className="text-[#6B7299] text-xs mt-2">
                      Lower numbers appear first
                    </p>
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-8">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_featured}
                        onChange={(e) =>
                          setFormData({ ...formData, is_featured: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-[#C5A85C]/30 bg-[#1C2340] text-[#C5A85C] focus:ring-[#C5A85C]/20 focus:ring-offset-0"
                      />
                      <span className="text-white text-sm">Featured Quote</span>
                    </label>

                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.is_active}
                        onChange={(e) =>
                          setFormData({ ...formData, is_active: e.target.checked })
                        }
                        className="w-5 h-5 rounded border-[#C5A85C]/30 bg-[#1C2340] text-green-500 focus:ring-green-500/20 focus:ring-offset-0"
                      />
                      <span className="text-white text-sm">Active</span>
                    </label>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[#C5A85C]/20">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex-1 px-6 py-3 bg-[#C5A85C] text-[#1C2340] rounded-lg hover:bg-[#D4BE90] transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          {editingQuote ? "Updating..." : "Adding..."}
                        </>
                      ) : (
                        editingQuote ? "Update Quote" : "Add Quote"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirmId && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDeleteConfirmId(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="fixed inset-0 flex items-center justify-center z-50 p-4"
            >
              <div className="bg-[#232B52] border border-[#C5A85C]/20 rounded-2xl w-full max-w-md p-6">
                <h3 className="font-serif text-xl text-white mb-4">Delete Quote?</h3>
                <p className="text-[#AAB3CF] mb-6">
                  This action cannot be undone. The quote will be permanently deleted.
                </p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setDeleteConfirmId(null)}
                    disabled={isDeleting !== null}
                    className="flex-1 px-6 py-3 border border-white/20 text-[#C9CCD6] rounded-lg hover:border-[#C5A85C] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => handleDelete(deleteConfirmId)}
                    disabled={isDeleting === deleteConfirmId}
                    className="flex-1 px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDeleting === deleteConfirmId ? (
                      <>
                        <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Deleting...
                      </>
                    ) : (
                      "Delete"
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      </div>
    </AdminLayout>
  );
}

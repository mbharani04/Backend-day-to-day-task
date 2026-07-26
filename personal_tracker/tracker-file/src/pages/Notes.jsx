import React, { useState } from 'react';
import { FileText, Plus, Search, Pin, Trash2, Edit2, Tag } from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';

export const Notes = () => {
  const { notes, toggleNotePin, deleteNote, updateNote, openQuickAdd } = useProductivity();

  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [editingNote, setEditingNote] = useState(null);

  const filteredNotes = notes
    .filter((n) => {
      if (activeCategory !== 'All') return n.category === activeCategory;
      return true;
    })
    .filter((n) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        n.title.toLowerCase().includes(q) ||
        n.content.toLowerCase().includes(q) ||
        (n.tags && n.tags.some((t) => t.toLowerCase().includes(q)))
      );
    })
    .sort((a, b) => {
      if (a.pinned !== b.pinned) return b.pinned ? 1 : -1;
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

  const handleUpdateNoteSubmit = (e) => {
    e.preventDefault();
    if (!editingNote) return;
    updateNote(editingNote.id, editingNote);
    setEditingNote(null);
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <FileText className="w-6 h-6 text-cyan-400" />
              Notes & Knowledge Hub
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Store technical notes, interview preparation questions & quick ideas
            </p>
          </div>

          <button
            onClick={() => openQuickAdd('note')}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold text-xs shadow-lg shadow-cyan-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Note</span>
          </button>
        </div>

        {/* Search & Categories Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex overflow-x-auto gap-1 no-scrollbar">
              {['All', 'Study', 'Ideas', 'Personal', 'Work', 'Project'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search notes or tags..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 placeholder-slate-400 focus:outline-hidden"
              />
            </div>
          </div>
        </div>

        {/* Notes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredNotes.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No notes found. Create your first note above!
            </div>
          ) : (
            filteredNotes.map((note) => (
              <div
                key={note.id}
                className={`p-5 rounded-3xl border transition-all duration-200 flex flex-col justify-between ${
                  note.pinned
                    ? 'glass-panel border-cyan-500/30 bg-cyan-500/5'
                    : 'glass-card border-white/10 hover:border-cyan-500/30'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                      {note.category}
                    </span>

                    <button
                      onClick={() => toggleNotePin(note.id)}
                      className={`p-1.5 rounded-lg transition-colors ${
                        note.pinned
                          ? 'text-cyan-400 bg-cyan-500/20'
                          : 'text-slate-500 hover:text-slate-300'
                      }`}
                      title={note.pinned ? 'Unpin Note' : 'Pin Note'}
                    >
                      <Pin className="w-4 h-4 fill-current" />
                    </button>
                  </div>

                  <h3 className="mt-3 text-base font-bold text-slate-100">{note.title}</h3>
                  <p className="mt-2 text-xs text-slate-300 whitespace-pre-line line-clamp-6 leading-relaxed">
                    {note.content}
                  </p>

                  {/* Tags */}
                  {note.tags && note.tags.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {note.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-slate-800/80 text-[10px] text-cyan-300 font-medium border border-cyan-500/20 flex items-center gap-1"
                        >
                          <Tag className="w-2.5 h-2.5" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">
                    Updated: {note.updatedAt}
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => setEditingNote(note)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800"
                      title="Edit Note"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => deleteNote(note.id)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                      title="Delete Note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Edit Note Modal */}
        {editingNote && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
            <div className="w-full max-w-lg rounded-2xl glass-panel border border-white/10 p-6 space-y-4">
              <h3 className="text-base font-bold text-slate-100">Edit Note</h3>
              <form onSubmit={handleUpdateNoteSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    required
                    value={editingNote.title}
                    onChange={(e) => setEditingNote({ ...editingNote, title: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">Content</label>
                  <textarea
                    rows={6}
                    required
                    value={editingNote.content}
                    onChange={(e) =>
                      setEditingNote({ ...editingNote, content: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setEditingNote(null)}
                    className="px-4 py-1.5 rounded-xl bg-slate-800 text-slate-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 rounded-xl bg-cyan-600 text-white font-semibold"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Notes;

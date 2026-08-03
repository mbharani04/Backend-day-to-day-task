import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiFileText, FiPlus, FiSearch, FiTrash2, FiEdit2, FiStar, FiExternalLink, FiClock } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';

const Notes = () => {
  const { notes, addNote, updateNote, togglePinNote, deleteNote } = useApp();

  const [showModal, setShowModal] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [optionalLink, setOptionalLink] = useState('');

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setOptionalLink('');
    setEditingNote(null);
  };

  const handleOpenEdit = (n) => {
    setEditingNote(n);
    setTitle(n.title);
    setDescription(n.description || '');
    setOptionalLink(n.optionalLink || '');
    setShowModal(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    if (editingNote) {
      updateNote(editingNote.id, {
        title,
        description,
        optionalLink
      });
    } else {
      addNote({
        id: uuidv4(),
        title,
        description,
        optionalLink,
        pinned: false,
        createdAt: new Date().toISOString().split('T')[0],
        updatedAt: new Date().toISOString().split('T')[0]
      });
    }
    resetForm();
    setShowModal(false);
  };

  const filteredNotes = notes.filter(n =>
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (n.description && n.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const pinnedNotes = filteredNotes.filter(n => n.pinned);
  const unpinnedNotes = filteredNotes.filter(n => !n.pinned);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
            <FiFileText className="w-7 h-7 text-pink-500" /> Knowledge & Notes Hub
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Capture quick thoughts, architectural blueprints, and resource URLs
          </p>
        </div>

        <button
          onClick={() => { resetForm(); setShowModal(true); }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold text-xs shadow-lg shadow-pink-500/25 hover:scale-105 transition-all flex items-center gap-2"
        >
          <FiPlus className="w-4 h-4" /> Create New Note
        </button>
      </div>

      {/* Search Input Bar */}
      <div className="glass-panel p-3.5 rounded-2xl border border-slate-200 dark:border-white/10 relative">
        <FiSearch className="absolute left-3.5 top-3.5 text-slate-400 w-4 h-4" />
        <input
          type="text"
          placeholder="Search notes by title or content..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-1.5 rounded-xl bg-slate-100 dark:bg-white/5 text-xs text-slate-900 dark:text-white outline-none"
        />
      </div>

      {/* Pinned Notes Section */}
      {pinnedNotes.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <FiStar className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> Pinned Notes ({pinnedNotes.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pinnedNotes.map(n => (
              <NoteCard
                key={n.id}
                note={n}
                onEdit={handleOpenEdit}
                onDelete={deleteNote}
                onTogglePin={togglePinNote}
              />
            ))}
          </div>
        </div>
      )}

      {/* Other Notes Section */}
      <div className="space-y-3">
        <h3 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
          All Notes ({unpinnedNotes.length})
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {unpinnedNotes.map(n => (
            <NoteCard
              key={n.id}
              note={n}
              onEdit={handleOpenEdit}
              onDelete={deleteNote}
              onTogglePin={togglePinNote}
            />
          ))}
        </div>
      </div>

      {/* Create / Edit Note Modal */}
      <AnimatePresence>
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-lg glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 shadow-2xl space-y-4"
            >
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingNote ? 'Edit Note' : 'Create New Note'}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Title</label>
                  <input
                    type="text"
                    placeholder="e.g. Microservices Distributed Caching"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Content / Description</label>
                  <textarea
                    placeholder="Write detailed notes..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Resource Link (Optional)</label>
                  <input
                    type="url"
                    placeholder="https://..."
                    value={optionalLink}
                    onChange={(e) => setOptionalLink(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                  />
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="w-1/2 py-2.5 rounded-xl border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-600 dark:text-slate-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="w-1/2 py-2.5 rounded-xl bg-pink-600 text-white text-xs font-semibold shadow-lg shadow-pink-500/25"
                  >
                    {editingNote ? 'Update Note' : 'Save Note'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

const NoteCard = ({ note, onEdit, onDelete, onTogglePin }) => (
  <motion.div
    layout
    className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 space-y-3 flex flex-col justify-between"
  >
    <div>
      <div className="flex items-start justify-between gap-3">
        <h4 className="font-bold text-sm text-slate-900 dark:text-white">{note.title}</h4>
        <div className="flex items-center gap-1">
          <button
            onClick={() => onTogglePin(note.id)}
            className={`p-1.5 rounded-lg transition-colors ${
              note.pinned ? 'text-amber-400 bg-amber-500/10' : 'text-slate-400 hover:text-amber-400'
            }`}
            title={note.pinned ? 'Unpin Note' : 'Pin Note'}
          >
            <FiStar className={`w-4 h-4 ${note.pinned ? 'fill-amber-400' : ''}`} />
          </button>
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-400 hover:bg-indigo-500/10"
          >
            <FiEdit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10"
          >
            <FiTrash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 whitespace-pre-wrap leading-relaxed">
        {note.description}
      </p>
    </div>

    <div className="pt-3 border-t border-slate-200/50 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
      <span className="flex items-center gap-1">
        <FiClock className="w-3 h-3 text-slate-400" /> Created {note.createdAt}
      </span>
      {note.optionalLink && (
        <a
          href={note.optionalLink}
          target="_blank"
          rel="noreferrer"
          className="flex items-center gap-1 text-indigo-400 hover:underline font-medium"
        >
          Link <FiExternalLink className="w-3 h-3" />
        </a>
      )}
    </div>
  </motion.div>
);

export default Notes;

import React from 'react';
import { FileText, Pin, Plus } from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const QuickNotesWidget = () => {
  const { notes, openQuickAdd } = useProductivity();
  const pinnedNotes = notes.filter((n) => n.pinned).slice(0, 3);
  const displayNotes = pinnedNotes.length > 0 ? pinnedNotes : notes.slice(0, 3);

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full">
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Quick Notes
          </h3>
          <p className="text-xs text-slate-400">Pinned & recent productivity notes</p>
        </div>

        <button
          onClick={() => openQuickAdd('note')}
          className="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-cyan-400 hover:bg-slate-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 mt-3 space-y-2.5 max-h-72 overflow-y-auto pr-1">
        {displayNotes.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 animate-float">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No notes yet 📝</p>
              <p className="text-slate-400 text-xs mt-0.5">Capture your first idea or important thought.</p>
            </div>
            <button
              onClick={() => openQuickAdd('note')}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs shadow-md shadow-cyan-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span> Create Note</span>
            </button>
          </div>
        ) : (
          displayNotes.map((note) => (
            <div
              key={note.id}
              className="p-3.5 rounded-2xl glass-card border border-white/10 hover:border-cyan-500/30 transition-all"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-100 truncate flex items-center gap-1.5">
                  {note.pinned && <Pin className="w-3 h-3 text-cyan-400 fill-current" />}
                  {note.title}
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {note.category}
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400 line-clamp-2">{note.content}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default QuickNotesWidget;

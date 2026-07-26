import React, { useEffect, useState } from 'react';
import { Search, X, CheckSquare, Target, Bell, PartyPopper, FileText, BookOpen, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useProductivity } from '../../context/ProductivityContext';

export const CommandSearchModal = () => {
  const {
    searchModalOpen,
    setSearchModalOpen,
    searchQuery,
    setSearchQuery,
    tasks,
    targets,
    reminders,
    events,
    notes,
    skills,
  } = useProductivity();

  const navigate = useNavigate();
  const [results, setResults] = useState([]);

  // Keyboard shortcut Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setSearchModalOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && searchModalOpen) {
        setSearchModalOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchModalOpen, setSearchModalOpen]);

  useEffect(() => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const q = searchQuery.toLowerCase();
    const res = [];

    // Tasks
    tasks.forEach((t) => {
      if (t.title.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)) {
        res.push({
          id: t.id,
          title: t.title,
          subtitle: `Task • Priority: ${t.priority} • Due ${t.dueDate}`,
          icon: CheckSquare,
          color: 'text-indigo-400',
          path: '/',
        });
      }
    });

    // Targets
    targets.forEach((tg) => {
      if (tg.title.toLowerCase().includes(q) || tg.category.toLowerCase().includes(q)) {
        res.push({
          id: tg.id,
          title: tg.title,
          subtitle: `Target (${tg.type}) • Progress ${tg.currentProgress}/${tg.targetValue} ${tg.unit}`,
          icon: Target,
          color: 'text-emerald-400',
          path: '/targets',
        });
      }
    });

    // Reminders
    reminders.forEach((r) => {
      if (r.title.toLowerCase().includes(q)) {
        res.push({
          id: r.id,
          title: r.title,
          subtitle: `Reminder • ${r.date} ${r.time}`,
          icon: Bell,
          color: 'text-amber-400',
          path: '/reminders',
        });
      }
    });

    // Events
    events.forEach((ev) => {
      if (ev.title.toLowerCase().includes(q) || ev.category.toLowerCase().includes(q)) {
        res.push({
          id: ev.id,
          title: ev.title,
          subtitle: `Event (${ev.category}) • ${ev.date} ${ev.time}`,
          icon: PartyPopper,
          color: 'text-pink-400',
          path: '/events',
        });
      }
    });

    // Notes
    notes.forEach((n) => {
      if (n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)) {
        res.push({
          id: n.id,
          title: n.title,
          subtitle: `Note • Category: ${n.category}`,
          icon: FileText,
          color: 'text-cyan-400',
          path: '/notes',
        });
      }
    });

    // Skills
    skills.forEach((sk) => {
      if (sk.name.toLowerCase().includes(q) || sk.category.toLowerCase().includes(q)) {
        res.push({
          id: sk.id,
          title: sk.name,
          subtitle: `Skill Goal • Progress: ${sk.progress}%`,
          icon: BookOpen,
          color: 'text-purple-400',
          path: '/learning',
        });
      }
    });

    setResults(res.slice(0, 10));
  }, [searchQuery, tasks, targets, reminders, events, notes, skills]);

  if (!searchModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 gap-3">
          <Search className="w-5 h-5 text-indigo-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Type to search tasks, targets, events, notes..."
            className="flex-1 bg-transparent text-sm text-slate-100 placeholder-slate-400 focus:outline-hidden"
            autoFocus
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setSearchModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="p-3 max-h-96 overflow-y-auto space-y-1.5">
          {!searchQuery.trim() ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              Type anything to search across all your tasks, notes, events & targets.
            </div>
          ) : results.length === 0 ? (
            <div className="py-8 text-center text-slate-400 text-xs">
              No matching records found for "{searchQuery}"
            </div>
          ) : (
            results.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  onClick={() => {
                    setSearchModalOpen(false);
                    setSearchQuery('');
                    navigate(item.path);
                  }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-800/40 hover:bg-slate-800/90 border border-white/5 cursor-pointer transition-all duration-150 group"
                >
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg bg-slate-900 border border-white/10 ${item.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-100 group-hover:text-cyan-400 transition-colors">
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-400">{item.subtitle}</p>
                    </div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default CommandSearchModal;

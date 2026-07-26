import React, { useState } from 'react';
import {
  Play,
  Pause,
  Clock,
  BookOpen,
  Square,
  Sparkles,
  AlertTriangle,
  X,
  Plus,
  CheckCircle2,
  MoreVertical,
  Trash2,
  Eye,
  Calendar,
} from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import { StudySessionSetupModal } from '../common/StudySessionSetupModal';

export const StudyTimerCard = () => {
  const {
    timer,
    startStudySession,
    pauseStudySession,
    resumeStudySession,
    endStudySessionEarly,
    completeStudySession,
    deleteStudySession,
    studySessions,
  } = useProductivity();

  const [isSetupModalOpen, setIsSetupModalOpen] = useState(false);
  const [showEndModal, setShowEndModal] = useState(false);
  const [sessionDetailModal, setSessionDetailModal] = useState(null);
  const [activeMenuId, setActiveMenuId] = useState(null);

  const active = timer?.activeSession;

  // Format time remaining
  const remainingSecs = active?.remainingSeconds || 0;
  const hours = Math.floor(remainingSecs / 3600);
  const minutes = Math.floor((remainingSecs % 3600) / 60);
  const seconds = remainingSecs % 60;

  const timeFormatted =
    hours > 0
      ? `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
      : `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  // Progress percentage
  const totalSecs = (active?.plannedDuration || 1) * 60;
  const elapsedSecs = Math.max(0, totalSecs - remainingSecs);
  const progressPct = Math.min(100, Math.round((elapsedSecs / totalSecs) * 100));

  // Studied minutes calculation for end modal
  const studiedMins = Math.max(1, Math.round(elapsedSecs / 60));

  const handleConfirmEndEarly = () => {
    endStudySessionEarly();
    setShowEndModal(false);
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full bg-gradient-to-br from-slate-900/90 via-slate-900/60 to-indigo-950/40 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Focus Timer
            {active && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            )}
          </h3>
          <p className="text-xs text-slate-400">Plan topics, track focus time & study history</p>
        </div>
        <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
          <Clock className="w-4 h-4" />
        </div>
      </div>

      {/* Main Body: Inactive vs Active */}
      {!active ? (
        /* Inactive State */
        <div className="flex-1 flex flex-col items-center justify-center py-8 text-center gap-4">
          <div className="p-4 rounded-3xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-float shadow-xl">
            <BookOpen className="w-8 h-8" />
          </div>

          <div>
            <h4 className="text-base font-extrabold text-slate-100">Ready to focus? 📚</h4>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Plan your study session topic and duration to start learning.
            </p>
          </div>

          <button
            onClick={() => setIsSetupModalOpen(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-indigo-500 via-purple-600 to-pink-600 hover:from-indigo-600 hover:to-pink-700 text-white font-extrabold text-xs shadow-xl shadow-indigo-500/30 transition-all hover:scale-105"
          >
            <Plus className="w-4 h-4" />
            <span>Start Study Session</span>
          </button>
        </div>
      ) : (
        /* Active Session Display */
        <div className="flex-1 flex flex-col items-center justify-between my-4 gap-4">
          {/* Active Info Badge */}
          <div className="w-full text-center p-3 rounded-2xl bg-slate-800/60 border border-white/10 space-y-1">
            <div className="flex items-center justify-center gap-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                📚 {active.subject}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                ⏱️ {active.plannedDuration} Mins
              </span>
            </div>
            <p className="text-xs font-semibold text-slate-200 truncate max-w-xs mx-auto">
              {active.concept}
            </p>
          </div>

          {/* SVG Circular Countdown */}
          <div className="relative flex items-center justify-center w-44 h-44 rounded-full border-4 border-slate-800 shadow-2xl">
            <svg className="absolute inset-0 w-full h-full -rotate-90">
              <circle
                cx="88"
                cy="88"
                r="78"
                className="text-slate-800"
                strokeWidth="7"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="88"
                cy="88"
                r="78"
                className="text-indigo-500 transition-all duration-1000"
                strokeWidth="7"
                strokeDasharray={490}
                strokeDashoffset={490 - (490 * progressPct) / 100}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            <div className="flex flex-col items-center z-10">
              <span className="text-3xl font-black tracking-tight text-slate-100 font-mono">
                {timeFormatted}
              </span>
              <span
                className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full mt-1.5 border ${
                  active.status === 'focusing'
                    ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300 border-amber-500/30'
                }`}
              >
                {active.status === 'focusing' ? 'FOCUSING' : 'PAUSED'}
              </span>
            </div>
          </div>

          {/* Active Controls */}
          <div className="flex items-center justify-center gap-3 w-full pt-2">
            {active.status === 'focusing' ? (
              <button
                onClick={pauseStudySession}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all"
              >
                <Pause className="w-4 h-4" />
                <span>Pause</span>
              </button>
            ) : (
              <button
                onClick={resumeStudySession}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-lg shadow-indigo-600/30 transition-all"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>Resume</span>
              </button>
            )}

            <button
              onClick={() => setShowEndModal(true)}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-rose-600/80 hover:bg-rose-600 text-white font-bold text-xs shadow-lg shadow-rose-600/20 transition-all"
            >
              <Square className="w-4 h-4 fill-current" />
              <span>End Session</span>
            </button>
          </div>
        </div>
      )}

      {/* Recent Study Sessions Ledger */}
      <div className="mt-4 pt-4 border-t border-white/10 space-y-2">
        <h4 className="text-xs font-bold text-slate-300 flex items-center justify-between">
          <span>Recent Study Sessions</span>
          <span className="text-[10px] text-slate-400 font-normal">{studySessions.length} logged</span>
        </h4>

        <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
          {studySessions.length === 0 ? (
            <p className="text-[11px] text-slate-400 text-center py-4">No study sessions logged yet 📚</p>
          ) : (
            studySessions.slice(0, 5).map((session) => (
              <div
                key={session.id}
                className="p-2.5 rounded-xl bg-slate-800/50 border border-white/5 flex items-center justify-between gap-2 hover:border-indigo-500/20 transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-200 truncate">{session.subject}</span>
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.2 rounded-md ${
                        session.status === 'completed'
                          ? 'bg-emerald-500/20 text-emerald-300'
                          : 'bg-amber-500/20 text-amber-300'
                      }`}
                    >
                      {session.status === 'completed' ? 'Completed' : 'Ended Early'}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{session.concept}</p>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-400">
                    <span>⏱️ {session.plannedDuration}m planned</span>
                    <span>•</span>
                    <span className="text-indigo-300 font-semibold">✅ {session.actualDuration}m studied</span>
                  </div>
                </div>

                <div className="relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === session.id ? null : session.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>

                  {activeMenuId === session.id && (
                    <div className="absolute right-0 top-6 w-32 rounded-xl glass-panel border border-white/10 shadow-2xl z-50 p-1 bg-slate-900">
                      <button
                        onClick={() => {
                          setSessionDetailModal(session);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] text-slate-200 hover:bg-slate-800"
                      >
                        <Eye className="w-3 h-3 text-cyan-400" />
                        <span>View Details</span>
                      </button>
                      <button
                        onClick={() => {
                          deleteStudySession(session.id);
                          setActiveMenuId(null);
                        }}
                        className="w-full flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[11px] text-rose-400 hover:bg-rose-500/10"
                      >
                        <Trash2 className="w-3 h-3" />
                        <span>Delete</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Setup Modal */}
      <StudySessionSetupModal
        isOpen={isSetupModalOpen}
        onClose={() => setIsSetupModalOpen(false)}
        onStartSession={(sessionData) => startStudySession(sessionData)}
      />

      {/* End Early Confirmation Modal */}
      {showEndModal && active && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-sm rounded-3xl glass-panel border border-rose-500/30 p-6 space-y-4 shadow-2xl bg-slate-900">
            <div className="flex items-start justify-between">
              <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <button onClick={() => setShowEndModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <h3 className="text-base font-bold text-slate-100">End Study Session?</h3>
              <p className="text-xs text-slate-300 mt-1">
                You have studied for <strong className="text-indigo-400">{studiedMins} minutes</strong> out of{' '}
                <strong>{active.plannedDuration} minutes</strong>.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
              <button
                onClick={() => setShowEndModal(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                Continue Studying
              </button>
              <button
                onClick={handleConfirmEndEarly}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
              >
                End Session
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Session Details Modal */}
      {sessionDetailModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="w-full max-w-md rounded-3xl glass-panel border border-white/10 p-6 space-y-4 shadow-2xl bg-slate-900">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-400">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-slate-100">Session Details</h3>
              </div>
              <button onClick={() => setSessionDetailModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 bg-slate-800/40 p-4 rounded-2xl border border-white/5 text-xs">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Subject</span>
                <span className="text-slate-100 font-bold text-sm">{sessionDetailModal.subject}</span>
              </div>

              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">Concept / Topic</span>
                <span className="text-indigo-300 font-medium">{sessionDetailModal.concept}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Planned Duration</span>
                  <span className="text-slate-200 font-extrabold">{sessionDetailModal.plannedDuration} Mins</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">Actual Studied</span>
                  <span className="text-emerald-400 font-extrabold">{sessionDetailModal.actualDuration} Mins</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5 text-[11px] text-slate-400">
                <div>
                  <span>Date: {sessionDetailModal.date}</span>
                </div>
                <div>
                  <span>Status: {sessionDetailModal.status}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end pt-2">
              <button
                onClick={() => setSessionDetailModal(null)}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyTimerCard;

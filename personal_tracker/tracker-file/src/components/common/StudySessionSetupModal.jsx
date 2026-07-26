import React, { useState, useEffect } from 'react';
import { X, BookOpen, Clock, Sparkles, Check, ChevronRight, AlertCircle, ArrowLeft } from 'lucide-react';
import { getFromStorage, saveToStorage, STORAGE_KEYS } from '../../utils/localStorage';

const PRESET_SUBJECTS = [
  'JavaScript',
  'React',
  'Node.js',
  'MongoDB',
  'Python',
  'Java',
  'Data Structures',
  'Communication Skills',
  'Aptitude',
  'Project Work',
  'Exam Preparation',
];

const PRESET_DURATIONS = [15, 20, 25, 30, 45, 60, 90, 120];

export const StudySessionSetupModal = ({ isOpen, onClose, onStartSession }) => {
  const [step, setStep] = useState(1); // 1: Form, 2: Preview
  const [subject, setSubject] = useState('JavaScript');
  const [customSubject, setCustomSubject] = useState('');
  const [concept, setConcept] = useState('');
  const [durationMode, setDurationMode] = useState('preset'); // 'preset' | 'custom'
  const [presetDuration, setPresetDuration] = useState(30);
  const [customHours, setCustomHours] = useState(0);
  const [customMinutes, setCustomMinutes] = useState(45);
  const [customSubjectsList, setCustomSubjectsList] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setErrorMsg('');
      const savedCustoms = getFromStorage(STORAGE_KEYS.CUSTOM_SUBJECTS, []);
      setCustomSubjectsList(savedCustoms);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const finalSubject = subject === 'OTHER_CUSTOM' ? customSubject.trim() : subject;

  const calculateTotalMinutes = () => {
    if (durationMode === 'preset') return Number(presetDuration);
    const hrs = Number(customHours) || 0;
    const mins = Number(customMinutes) || 0;
    return hrs * 60 + mins;
  };

  const handleProceedToPreview = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (subject === 'OTHER_CUSTOM' && !customSubject.trim()) {
      setErrorMsg('Please enter a custom subject name.');
      return;
    }

    if (!concept.trim()) {
      setErrorMsg('Please enter a concept / topic to cover.');
      return;
    }

    const totalMins = calculateTotalMinutes();
    if (totalMins <= 0) {
      setErrorMsg('Study duration must be greater than 0 minutes.');
      return;
    }

    setStep(2);
  };

  const handleConfirmStart = () => {
    const totalMins = calculateTotalMinutes();

    // If a new custom subject was used, save to localStorage
    if (subject === 'OTHER_CUSTOM' && customSubject.trim()) {
      const trimmedCustom = customSubject.trim();
      if (!customSubjectsList.includes(trimmedCustom)) {
        const updated = [...customSubjectsList, trimmedCustom];
        saveToStorage(STORAGE_KEYS.CUSTOM_SUBJECTS, updated);
      }
    }

    onStartSession({
      subject: finalSubject,
      concept: concept.trim(),
      plannedDuration: totalMins,
    });
    onClose();
  };

  const formatDurationDisplay = (totalMins) => {
    if (totalMins < 60) return `${totalMins} Minutes`;
    const h = Math.floor(totalMins / 60);
    const m = totalMins % 60;
    return m > 0 ? `${h} hour${h > 1 ? 's' : ''} ${m} min` : `${h} hour${h > 1 ? 's' : ''}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-3xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col bg-slate-900/95">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Plan Your Study Session 📚</h3>
              <p className="text-xs text-slate-400">
                {step === 1 ? 'What are you going to learn today?' : 'Review session parameters before starting'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Step 1: Form Inputs */}
        {step === 1 ? (
          <form onSubmit={handleProceedToPreview} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
            {/* Subject Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Subject Name <span className="text-indigo-400">*</span>
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-xs text-slate-100 focus:outline-hidden focus:border-indigo-500"
              >
                {[...PRESET_SUBJECTS, ...customSubjectsList].map((subj) => (
                  <option key={subj} value={subj}>
                    {subj}
                  </option>
                ))}
                <option value="OTHER_CUSTOM">+ Add Custom Subject</option>
              </select>

              {subject === 'OTHER_CUSTOM' && (
                <input
                  type="text"
                  placeholder="Enter Subject Name (e.g. Next.js, Machine Learning)"
                  value={customSubject}
                  onChange={(e) => setCustomSubject(e.target.value)}
                  className="mt-2 w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-indigo-500/40 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden"
                  autoFocus
                />
              )}
            </div>

            {/* Concept / Topic to Cover */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Concept / Topic to Cover <span className="text-indigo-400">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="Example: Closures and Higher-Order Functions"
                value={concept}
                onChange={(e) => setConcept(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
              />
            </div>

            {/* Study Duration Presets & Custom Input */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-xs font-semibold text-slate-300">Study Duration</label>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setDurationMode('preset')}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                      durationMode === 'preset'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Presets
                  </button>
                  <button
                    type="button"
                    onClick={() => setDurationMode('custom')}
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-md transition-colors ${
                      durationMode === 'custom'
                        ? 'bg-indigo-600 text-white'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    Custom
                  </button>
                </div>
              </div>

              {durationMode === 'preset' ? (
                <div className="grid grid-cols-4 gap-2">
                  {PRESET_DURATIONS.map((mins) => (
                    <button
                      key={mins}
                      type="button"
                      onClick={() => setPresetDuration(mins)}
                      className={`py-2 rounded-xl text-xs font-bold transition-all border ${
                        presetDuration === mins
                          ? 'bg-indigo-600 text-white border-indigo-400 shadow-md shadow-indigo-600/30'
                          : 'bg-slate-800/60 text-slate-300 border-white/5 hover:border-indigo-500/30'
                      }`}
                    >
                      {mins}m
                    </button>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 bg-slate-800/40 p-3 rounded-2xl border border-white/5">
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Hours</label>
                    <input
                      type="number"
                      min="0"
                      max="12"
                      value={customHours}
                      onChange={(e) => setCustomHours(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-semibold text-slate-400 mb-1">Minutes</label>
                    <input
                      type="number"
                      min="0"
                      max="59"
                      value={customMinutes}
                      onChange={(e) => setCustomMinutes(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex items-center gap-1.5 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all"
              >
                <span>Preview Session</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          /* Step 2: Session Preview Card */
          <div className="p-6 space-y-5">
            <div className="p-5 rounded-2xl glass-card border border-indigo-500/30 bg-slate-800/40 space-y-4">
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-indigo-400" />
                  Study Session Preview
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                  Ready to Start
                </span>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Subject</span>
                <p className="text-lg font-extrabold text-slate-100 mt-0.5">{finalSubject}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Concept / Topic</span>
                <p className="text-sm font-semibold text-indigo-300 mt-0.5">{concept}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase">Target Duration</span>
                <p className="text-base font-extrabold text-cyan-400 mt-0.5 flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  {formatDurationDisplay(calculateTotalMinutes())}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex items-center gap-1 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmStart}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold text-xs shadow-lg shadow-indigo-500/30 transition-all flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-300 animate-pulse" />
                  <span>Start Study Session</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudySessionSetupModal;

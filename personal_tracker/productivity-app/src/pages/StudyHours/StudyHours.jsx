import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiClock, FiPlay, FiPause, FiRotateCcw, FiPlus, FiBookOpen, FiBarChart2, FiCheckCircle, FiTrash2 } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import toast from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { formatDuration, formatTime } from '../../utils/formatters';

const StudyHours = () => {
  const { studySessions, addStudySession, deleteStudySession } = useApp();

  // Pomodoro Timer State
  const [timerMode, setTimerMode] = useState('pomodoro'); // 'pomodoro' (25m) | 'shortBreak' (5m) | 'longBreak' (10m) | 'focus50' (50m)
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [subject, setSubject] = useState('');
  const [topic, setTopic] = useState('');

  // Manual Log Form State
  const [manualSubject, setManualSubject] = useState('');
  const [manualTopic, setManualTopic] = useState('');
  const [manualDuration, setManualDuration] = useState(60);

  // Timer Tick Effect
  useEffect(() => {
    let interval = null;
    if (isActive && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft(prev => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isActive) {
      setIsActive(false);
      toast.success('🎉 Timer Completed! Great job focusing.');
      if (timerMode === 'pomodoro' || timerMode === 'focus50') {
        const mins = timerMode === 'pomodoro' ? 25 : 50;
        addStudySession({
          id: uuidv4(),
          subject: subject || 'General Study',
          topic: topic || 'Pomodoro Session',
          startTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          endTime: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          durationMinutes: mins,
          date: new Date().toISOString().split('T')[0]
        });
      }
    }
    return () => clearInterval(interval);
  }, [isActive, secondsLeft, timerMode, subject, topic]);

  const switchPreset = (mode, mins) => {
    setTimerMode(mode);
    setSecondsLeft(mins * 60);
    setIsActive(false);
  };

  const handleManualSubmit = (e) => {
    e.preventDefault();
    if (!manualSubject) return;
    addStudySession({
      id: uuidv4(),
      subject: manualSubject,
      topic: manualTopic || 'Self Study',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      durationMinutes: Number(manualDuration),
      date: new Date().toISOString().split('T')[0]
    });
    setManualSubject('');
    setManualTopic('');
  };

  const totalMinutes = studySessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <FiClock className="w-7 h-7 text-purple-500" /> Study Hours & Pomodoro Timer
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Master deep work sessions, eliminate distractions, and record study logs
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pomodoro Interactive Widget */}
        <div className="lg:col-span-2 glass-panel p-8 rounded-3xl border border-slate-200 dark:border-white/10 text-center space-y-6 bg-gradient-to-b from-purple-500/5 to-indigo-500/5">
          {/* Preset Buttons */}
          <div className="inline-flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <button
              onClick={() => switchPreset('pomodoro', 25)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'pomodoro' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              25 / 5 Pomodoro
            </button>
            <button
              onClick={() => switchPreset('focus50', 50)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'focus50' ? 'bg-indigo-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              50 / 10 Deep Focus
            </button>
            <button
              onClick={() => switchPreset('shortBreak', 5)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                timerMode === 'shortBreak' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-600 dark:text-slate-400'
              }`}
            >
              5m Break
            </button>
          </div>

          {/* Subject & Topic Tag Inputs */}
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Subject (e.g. Algorithms)"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none text-center"
            />
            <input
              type="text"
              placeholder="Topic (e.g. Dynamic Prog)"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none text-center"
            />
          </div>

          {/* Large Animated Clock Display */}
          <div className="relative w-64 h-64 mx-auto flex flex-col items-center justify-center rounded-full border-4 border-indigo-500/20 bg-indigo-500/5 shadow-2xl glow-purple">
            <h2 className="text-5xl font-extrabold text-slate-900 dark:text-white tracking-widest font-mono">
              {formatTime(secondsLeft)}
            </h2>
            <p className="text-xs font-semibold text-indigo-400 uppercase tracking-wider mt-2">
              {isActive ? 'Session in Progress' : 'Paused / Ready'}
            </p>
          </div>

          {/* Controls: Play, Pause, Reset */}
          <div className="flex items-center justify-center gap-4">
            <button
              onClick={() => setIsActive(!isActive)}
              className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white text-xl shadow-xl transition-all hover:scale-105 active:scale-95 ${
                isActive ? 'bg-amber-500 shadow-amber-500/30' : 'bg-gradient-to-r from-blue-600 to-indigo-600 shadow-indigo-500/30'
              }`}
            >
              {isActive ? <FiPause /> : <FiPlay className="ml-1" />}
            </button>

            <button
              onClick={() => { setIsActive(false); setSecondsLeft(timerMode === 'pomodoro' ? 25*60 : timerMode === 'focus50' ? 50*60 : 5*60); }}
              className="w-14 h-14 rounded-2xl bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/20 text-slate-700 dark:text-white text-xl flex items-center justify-center transition-all"
              title="Reset Timer"
            >
              <FiRotateCcw />
            </button>
          </div>
        </div>

        {/* Manual Session Log & Total Stats */}
        <div className="space-y-6">
          <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <FiPlus className="w-4 h-4 text-purple-500" /> Manual Study Entry
            </h3>

            <form onSubmit={handleManualSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. System Architecture"
                  value={manualSubject}
                  onChange={(e) => setManualSubject(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                <input
                  type="text"
                  placeholder="e.g. Distributed Databases"
                  value={manualTopic}
                  onChange={(e) => setManualTopic(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="600"
                  value={manualDuration}
                  onChange={(e) => setManualDuration(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs text-slate-900 dark:text-white outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 rounded-xl bg-purple-600 text-white font-semibold text-xs shadow-md shadow-purple-500/20 hover:scale-[1.02] transition-all"
              >
                Log Study Session
              </button>
            </form>
          </div>

          <div className="glass-panel p-5 rounded-2xl border border-slate-200 dark:border-white/10 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400">Total Study Time</p>
              <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{formatDuration(totalMinutes)}</p>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 text-purple-500 flex items-center justify-center">
              <FiBookOpen className="w-6 h-6" />
            </div>
          </div>
        </div>
      </div>

      {/* Study Session Log Table */}
      <div className="glass-panel p-6 rounded-3xl border border-slate-200 dark:border-white/10 space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <FiBarChart2 className="w-4 h-4 text-purple-400" /> Recent Study History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-white/10 text-slate-500 dark:text-slate-400 uppercase font-semibold">
                <th className="pb-3 px-2">Date</th>
                <th className="pb-3 px-2">Subject</th>
                <th className="pb-3 px-2">Topic</th>
                <th className="pb-3 px-2">Duration</th>
                <th className="pb-3 px-2 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200/50 dark:divide-white/5">
              {studySessions.map(session => (
                <tr key={session.id} className="hover:bg-slate-100/50 dark:hover:bg-white/5 transition-colors">
                  <td className="py-3 px-2 text-slate-900 dark:text-white font-medium">{session.date}</td>
                  <td className="py-3 px-2 text-indigo-400 font-bold">{session.subject}</td>
                  <td className="py-3 px-2 text-slate-600 dark:text-slate-300">{session.topic}</td>
                  <td className="py-3 px-2 font-bold text-emerald-400">{formatDuration(session.durationMinutes)}</td>
                  <td className="py-3 px-2 text-right">
                    <button
                      onClick={() => deleteStudySession(session.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-400"
                    >
                      <FiTrash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default StudyHours;

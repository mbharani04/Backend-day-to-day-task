import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiTarget, FiBell, FiFileText, FiClock } from 'react-icons/fi';
import { v4 as uuidv4 } from 'uuid';
import { useApp } from '../../context/AppContext';

export const QuickActionModal = () => {
  const { quickActionModal, closeQuickAction, addTarget, addReminder, addNote, addStudySession } = useApp();
  const { isOpen, type: initialType } = quickActionModal;

  const [activeTab, setActiveTab] = useState(initialType || 'target');

  // Form states
  const [targetTitle, setTargetTitle] = useState('');
  const [targetDesc, setTargetDesc] = useState('');
  const [targetType, setTargetType] = useState('Daily');
  const [targetPriority, setTargetPriority] = useState('High');

  const [reminderTitle, setReminderTitle] = useState('');
  const [reminderDate, setReminderDate] = useState(new Date().toISOString().split('T')[0]);
  const [reminderTime, setReminderTime] = useState('18:00');
  const [reminderPriority, setReminderPriority] = useState('High');

  const [noteTitle, setNoteTitle] = useState('');
  const [noteDesc, setNoteDesc] = useState('');
  const [noteLink, setNoteLink] = useState('');

  const [studySubject, setStudySubject] = useState('');
  const [studyTopic, setStudyTopic] = useState('');
  const [studyDuration, setStudyDuration] = useState(60);

  if (!isOpen) return null;

  const handleTargetSubmit = (e) => {
    e.preventDefault();
    if (!targetTitle) return;
    addTarget({
      id: uuidv4(),
      title: targetTitle,
      description: targetDesc,
      type: targetType,
      priority: targetPriority,
      progress: 0,
      completed: false,
      createdAt: new Date().toISOString().split('T')[0]
    });
    setTargetTitle('');
    setTargetDesc('');
    closeQuickAction();
  };

  const handleReminderSubmit = (e) => {
    e.preventDefault();
    if (!reminderTitle) return;
    addReminder({
      id: uuidv4(),
      title: reminderTitle,
      date: reminderDate,
      time: reminderTime,
      priority: reminderPriority,
      completed: false
    });
    setReminderTitle('');
    closeQuickAction();
  };

  const handleNoteSubmit = (e) => {
    e.preventDefault();
    if (!noteTitle) return;
    addNote({
      id: uuidv4(),
      title: noteTitle,
      description: noteDesc,
      optionalLink: noteLink,
      pinned: false,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0]
    });
    setNoteTitle('');
    setNoteDesc('');
    setNoteLink('');
    closeQuickAction();
  };

  const handleStudySubmit = (e) => {
    e.preventDefault();
    if (!studySubject) return;
    addStudySession({
      id: uuidv4(),
      subject: studySubject,
      topic: studyTopic || 'Deep Focus Block',
      startTime: '09:00 AM',
      endTime: '10:00 AM',
      durationMinutes: Number(studyDuration),
      date: new Date().toISOString().split('T')[0]
    });
    setStudySubject('');
    setStudyTopic('');
    closeQuickAction();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="w-full max-w-lg glass-panel rounded-3xl p-6 border border-slate-200 dark:border-white/10 shadow-2xl overflow-hidden"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-white/10">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              ⚡ Quick Action
            </h3>
            <button
              onClick={closeQuickAction}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          {/* Action Tabs */}
          <div className="grid grid-cols-4 gap-1 p-1 my-4 bg-slate-100 dark:bg-white/5 rounded-2xl border border-slate-200/50 dark:border-white/5">
            <button
              onClick={() => setActiveTab('target')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'target'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FiTarget className="w-4 h-4" /> Target
            </button>
            <button
              onClick={() => setActiveTab('reminder')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'reminder'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FiBell className="w-4 h-4" /> Reminder
            </button>
            <button
              onClick={() => setActiveTab('note')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'note'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FiFileText className="w-4 h-4" /> Note
            </button>
            <button
              onClick={() => setActiveTab('study')}
              className={`flex items-center justify-center gap-1.5 py-2 text-xs font-semibold rounded-xl transition-all ${
                activeTab === 'study'
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FiClock className="w-4 h-4" /> Study Log
            </button>
          </div>

          {/* Form Content */}
          {activeTab === 'target' && (
            <form onSubmit={handleTargetSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Master Framer Motion Layouts"
                  value={targetTitle}
                  onChange={e => setTargetTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description</label>
                <textarea
                  placeholder="Details about target objectives..."
                  value={targetDesc}
                  onChange={e => setTargetDesc(e.target.value)}
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Target Type</label>
                  <select
                    value={targetType}
                    onChange={e => setTargetType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none text-slate-900 dark:text-white"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Priority</label>
                  <select
                    value={targetPriority}
                    onChange={e => setTargetPriority(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none text-slate-900 dark:text-white"
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Add Target
              </button>
            </form>
          )}

          {activeTab === 'reminder' && (
            <form onSubmit={handleReminderSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Reminder Title</label>
                <input
                  type="text"
                  placeholder="e.g. Sync with engineering team"
                  value={reminderTitle}
                  onChange={e => setReminderTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={reminderDate}
                    onChange={e => setReminderDate(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none text-slate-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={reminderTime}
                    onChange={e => setReminderTime(e.target.value)}
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none text-slate-900 dark:text-white"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Set Reminder
              </button>
            </form>
          )}

          {activeTab === 'note' && (
            <form onSubmit={handleNoteSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Note Title</label>
                <input
                  type="text"
                  placeholder="e.g. Microservices Caching Architecture"
                  value={noteTitle}
                  onChange={e => setNoteTitle(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Description / Content</label>
                <textarea
                  placeholder="Write quick ideas, links, or notes..."
                  value={noteDesc}
                  onChange={e => setNoteDesc(e.target.value)}
                  rows={3}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Optional Link</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={noteLink}
                  onChange={e => setNoteLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Save Note
              </button>
            </form>
          )}

          {activeTab === 'study' && (
            <form onSubmit={handleStudySubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Subject</label>
                <input
                  type="text"
                  placeholder="e.g. System Design / React"
                  value={studySubject}
                  onChange={e => setStudySubject(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Topic</label>
                <input
                  type="text"
                  placeholder="e.g. State persistence pattern"
                  value={studyTopic}
                  onChange={e => setStudyTopic(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1">Duration (Minutes)</label>
                <input
                  type="number"
                  min="5"
                  max="480"
                  value={studyDuration}
                  onChange={e => setStudyDuration(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm outline-none focus:border-indigo-500 text-slate-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold text-sm shadow-lg shadow-indigo-500/25 hover:opacity-95 transition-all"
              >
                Log Study Session
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default QuickActionModal;

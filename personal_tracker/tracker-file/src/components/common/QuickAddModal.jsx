import React, { useState, useEffect } from 'react';
import {
  Plus,
  X,
  CheckSquare,
  Target as TargetIcon,
  Bell,
  PartyPopper,
  FileText,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';

export const QuickAddModal = () => {
  const {
    quickAddModal,
    closeQuickAdd,
    addTask,
    addTarget,
    addReminder,
    addEvent,
    addNote,
    addSkill,
  } = useProductivity();

  const [activeTab, setActiveTab] = useState('task');

  useEffect(() => {
    if (quickAddModal.isOpen && quickAddModal.initialType) {
      setActiveTab(quickAddModal.initialType);
    }
  }, [quickAddModal]);

  // Form states
  // Task Form
  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    category: 'Study',
    dueDate: new Date().toISOString().split('T')[0],
    dueTime: '18:00',
    reminder: true,
    notes: '',
  });

  // Target Form
  const [targetForm, setTargetForm] = useState({
    title: '',
    description: '',
    category: 'Study',
    type: 'Daily',
    startDate: new Date().toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0],
    targetValue: 5,
    unit: 'Hours',
  });

  // Reminder Form
  const [reminderForm, setReminderForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '12:00',
    priority: 'Medium',
  });

  // Event Form
  const [eventForm, setEventForm] = useState({
    title: '',
    description: '',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    category: 'Exam',
    reminder: true,
  });

  // Note Form
  const [noteForm, setNoteForm] = useState({
    title: '',
    content: '',
    category: 'Study',
    tags: 'React, Code',
  });

  // Skill Form
  const [skillForm, setSkillForm] = useState({
    name: '',
    description: '',
    category: 'Development',
    period: 'Monthly',
    startDate: new Date().toISOString().split('T')[0],
    targetCompletionDate: new Date(Date.now() + 14 * 86400000).toISOString().split('T')[0],
    durationDays: 30,
  });

  if (!quickAddModal.isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (activeTab === 'task') {
      if (!taskForm.title.trim()) return;
      addTask(taskForm);
    } else if (activeTab === 'target') {
      if (!targetForm.title.trim()) return;
      addTarget(targetForm);
    } else if (activeTab === 'reminder') {
      if (!reminderForm.title.trim()) return;
      addReminder(reminderForm);
    } else if (activeTab === 'event') {
      if (!eventForm.title.trim()) return;
      addEvent(eventForm);
    } else if (activeTab === 'note') {
      if (!noteForm.title.trim()) return;
      addNote({
        ...noteForm,
        tags: noteForm.tags.split(',').map((t) => t.trim()).filter(Boolean),
      });
    } else if (activeTab === 'skill') {
      if (!skillForm.name.trim()) return;
      addSkill(skillForm);
    }
    closeQuickAdd();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl glass-panel border border-white/10 shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-slate-900/50">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-500/20 border border-indigo-500/30 text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Quick Add</h3>
              <p className="text-xs text-slate-400">Create new item directly to your life dashboard</p>
            </div>
          </div>
          <button
            onClick={closeQuickAdd}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex overflow-x-auto p-2 bg-slate-900/30 border-b border-white/5 gap-1 no-scrollbar">
          {[
            { id: 'task', label: 'Task', icon: CheckSquare },
            { id: 'target', label: 'Target', icon: TargetIcon },
            { id: 'reminder', label: 'Reminder', icon: Bell },
            { id: 'event', label: 'Event', icon: PartyPopper },
            { id: 'note', label: 'Note', icon: FileText },
            { id: 'skill', label: 'Skill Goal', icon: BookOpen },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Dynamic Form Content */}
        <form onSubmit={handleSubmit} className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          {activeTab === 'task' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Task Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Complete System Design Chapter 4"
                  value={taskForm.title}
                  onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden focus:border-indigo-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={taskForm.category}
                    onChange={(e) => setTaskForm({ ...taskForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Study">Study</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Project">Project</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Priority</label>
                  <select
                    value={taskForm.priority}
                    onChange={(e) => setTaskForm({ ...taskForm, priority: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Due Date</label>
                  <input
                    type="date"
                    value={taskForm.dueDate}
                    onChange={(e) => setTaskForm({ ...taskForm, dueDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Due Time</label>
                  <input
                    type="time"
                    value={taskForm.dueTime}
                    onChange={(e) => setTaskForm({ ...taskForm, dueTime: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Notes & Description</label>
                <textarea
                  rows={2}
                  placeholder="Additional context or notes..."
                  value={taskForm.description}
                  onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 placeholder-slate-500 focus:outline-hidden"
                />
              </div>
            </>
          )}

          {activeTab === 'target' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Read 100 pages of Algorithms"
                  value={targetForm.title}
                  onChange={(e) => setTargetForm({ ...targetForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 placeholder-slate-500 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Type</label>
                  <select
                    value={targetForm.type}
                    onChange={(e) => setTargetForm({ ...targetForm, type: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Value</label>
                  <input
                    type="number"
                    min="1"
                    value={targetForm.targetValue}
                    onChange={(e) => setTargetForm({ ...targetForm, targetValue: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Unit</label>
                  <select
                    value={targetForm.unit}
                    onChange={(e) => setTargetForm({ ...targetForm, unit: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Hours">Hours</option>
                    <option value="Tasks">Tasks</option>
                    <option value="Pages">Pages</option>
                    <option value="Projects">Projects</option>
                    <option value="Lessons">Lessons</option>
                    <option value="Custom">Custom</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {activeTab === 'reminder' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Reminder Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Call mentor regarding thesis review"
                  value={reminderForm.title}
                  onChange={(e) => setReminderForm({ ...reminderForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={reminderForm.date}
                    onChange={(e) => setReminderForm({ ...reminderForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={reminderForm.time}
                    onChange={(e) => setReminderForm({ ...reminderForm, time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'event' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Event Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Mid-term Distributed Systems Exam"
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Exam">Exam</option>
                    <option value="Interview">Interview</option>
                    <option value="Project Deadline">Project Deadline</option>
                    <option value="Birthday">Birthday</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Time</label>
                  <input
                    type="time"
                    value={eventForm.time}
                    onChange={(e) => setEventForm({ ...eventForm, time: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'note' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Note Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Key take-aways from Microservices lecture"
                  value={noteForm.title}
                  onChange={(e) => setNoteForm({ ...noteForm, title: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 focus:outline-hidden"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Content</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Write your note content here..."
                  value={noteForm.content}
                  onChange={(e) => setNoteForm({ ...noteForm, content: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={noteForm.category}
                    onChange={(e) => setNoteForm({ ...noteForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Study">Study</option>
                    <option value="Ideas">Ideas</option>
                    <option value="Personal">Personal</option>
                    <option value="Work">Work</option>
                    <option value="Project">Project</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Tags (comma separated)</label>
                  <input
                    type="text"
                    value={noteForm.tags}
                    onChange={(e) => setNoteForm({ ...noteForm, tags: e.target.value })}
                    placeholder="React, Architecture"
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          {activeTab === 'skill' && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Skill Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Master Next.js App Router"
                  value={skillForm.name}
                  onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-sm text-slate-100 focus:outline-hidden"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                  <select
                    value={skillForm.category}
                    onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  >
                    <option value="Development">Development</option>
                    <option value="Backend">Backend</option>
                    <option value="Design">Design</option>
                    <option value="Language">Language</option>
                    <option value="Soft Skills">Soft Skills</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Target Completion Date</label>
                  <input
                    type="date"
                    value={skillForm.targetCompletionDate}
                    onChange={(e) => setSkillForm({ ...skillForm, targetCompletionDate: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 focus:outline-hidden"
                  />
                </div>
              </div>
            </>
          )}

          {/* Action Buttons */}
          <div className="pt-3 border-t border-white/10 flex justify-end gap-2">
            <button
              type="button"
              onClick={closeQuickAdd}
              className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-xs font-semibold shadow-md shadow-indigo-500/25 hover:from-indigo-600 hover:to-purple-700 transition-all"
            >
              Save Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuickAddModal;

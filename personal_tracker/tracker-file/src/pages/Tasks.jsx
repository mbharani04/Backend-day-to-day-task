import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Search,
  Filter,
  Trash2,
  Edit2,
  CheckCircle2,
  Circle,
  Clock,
  Tag,
  AlertTriangle,
  X,
} from 'lucide-react';
import { PageTransition } from '../components/layout/PageTransition';
import { useProductivity } from '../context/ProductivityContext';
import { TaskModal } from '../components/common/TaskModal';

export const Tasks = () => {
  const { tasks, deleteTask, toggleTaskCompletion } = useProductivity();

  const [activeTab, setActiveTab] = useState('All'); // All | Pending | Completed | High Priority | Overdue
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [sortBy, setSortBy] = useState('Newest'); // Newest | Oldest | Priority | Due Date

  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];

  const filteredTasks = tasks
    .filter((t) => {
      if (activeTab === 'Pending') return t.status === 'Pending';
      if (activeTab === 'Completed') return t.status === 'Completed';
      if (activeTab === 'High Priority') return t.priority === 'High';
      if (activeTab === 'Overdue') return t.dueDate < todayStr && t.status !== 'Completed';
      return true;
    })
    .filter((t) => {
      if (categoryFilter !== 'All') return t.category === categoryFilter;
      return true;
    })
    .filter((t) => {
      if (!search.trim()) return true;
      const q = search.toLowerCase();
      return (
        t.title.toLowerCase().includes(q) ||
        (t.description && t.description.toLowerCase().includes(q))
      );
    })
    .sort((a, b) => {
      if (sortBy === 'Newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'Oldest') return new Date(a.createdAt) - new Date(b.createdAt);
      if (sortBy === 'Due Date') return new Date(a.dueDate) - new Date(b.dueDate);
      if (sortBy === 'Priority') {
        const order = { High: 1, Medium: 2, Low: 3 };
        return order[a.priority] - order[b.priority];
      }
      return 0;
    });

  const handleOpenAddModal = () => {
    setEditingTask(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setEditingTask(task);
    setIsTaskModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  return (
    <PageTransition>
      <div className="space-y-6 pb-12">
        {/* Header Banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-white/10">
          <div>
            <h1 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
              <CheckSquare className="w-6 h-6 text-indigo-400" />
              Daily & Project Tasks
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Organize, filter, track priorities and manage all your tasks
            </p>
          </div>

          <button
            onClick={handleOpenAddModal}
            className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-semibold text-xs shadow-lg shadow-indigo-500/25 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Create New Task</span>
          </button>
        </div>

        {/* Filters Bar */}
        <div className="p-4 rounded-2xl glass-panel border border-white/10 space-y-3">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            {/* Status Tabs */}
            <div className="flex overflow-x-auto gap-1 no-scrollbar">
              {['All', 'Pending', 'Completed', 'High Priority', 'Overdue'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    activeTab === tab
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search tasks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-slate-800/60 border border-white/10 text-xs text-slate-100 placeholder-slate-400 focus:outline-hidden"
              />
            </div>
          </div>

          {/* Category & Sorting Selectors */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-white/5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Filter className="w-3.5 h-3.5 text-cyan-400" />
              <span>Category:</span>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 focus:outline-hidden"
              >
                <option value="All">All Categories</option>
                <option value="Study">Study</option>
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Project">Project</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <span>Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-slate-800 text-slate-200 px-2.5 py-1 rounded-lg border border-white/10 focus:outline-hidden"
              >
                <option value="Newest">Newest First</option>
                <option value="Oldest">Oldest First</option>
                <option value="Priority">Priority</option>
                <option value="Due Date">Due Date</option>
              </select>
            </div>
          </div>
        </div>

        {/* Task Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTasks.length === 0 ? (
            <div className="col-span-full py-16 text-center text-slate-400 text-sm glass-panel rounded-3xl">
              No tasks match your selected criteria.
            </div>
          ) : (
            filteredTasks.map((t) => (
              <div
                key={t.id}
                className={`p-5 rounded-2xl border transition-all duration-200 flex flex-col justify-between ${
                  t.status === 'Completed'
                    ? 'bg-slate-900/30 border-white/5 opacity-70'
                    : 'glass-card border-white/10 hover:border-indigo-500/30'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <button
                      onClick={() => toggleTaskCompletion(t.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors"
                    >
                      {t.status === 'Completed' ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400" />
                      )}
                    </button>
                    <div className="flex-1 min-w-0">
                      <h4
                        className={`text-sm font-bold truncate ${
                          t.status === 'Completed'
                            ? 'line-through text-slate-500'
                            : 'text-slate-100'
                        }`}
                      >
                        {t.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                        {t.description || 'No description provided.'}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 mt-4 text-[10px]">
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      {t.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {t.dueDate}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      t.priority === 'High'
                        ? 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                        : t.priority === 'Medium'
                        ? 'bg-amber-500/15 text-amber-400 border-amber-500/30'
                        : 'bg-slate-500/15 text-slate-400 border-slate-500/30'
                    }`}
                  >
                    {t.priority} Priority
                  </span>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEditModal(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-cyan-400 hover:bg-slate-800 transition-colors"
                      title="Edit Task"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setTaskToDelete(t)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800 transition-colors"
                      title="Delete Task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Task Modal for Add and Edit */}
        <TaskModal
          isOpen={isTaskModalOpen}
          onClose={() => setIsTaskModalOpen(false)}
          taskToEdit={editingTask}
        />

        {/* Confirmation Modal for Delete */}
        {taskToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
            <div className="w-full max-w-sm rounded-3xl glass-panel border border-rose-500/30 p-6 space-y-4 shadow-2xl bg-slate-900">
              <div className="flex items-start justify-between">
                <div className="p-3 rounded-2xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <button
                  onClick={() => setTaskToDelete(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-100">Delete this task?</h3>
                <p className="text-xs text-slate-400 mt-1">
                  Are you sure you want to permanently delete "{taskToDelete.title}"?
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-white/10">
                <button
                  onClick={() => setTaskToDelete(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmDelete}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white text-xs font-bold shadow-md shadow-rose-600/30 transition-all"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
};

export default Tasks;

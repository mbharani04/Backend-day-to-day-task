import React, { useState, useRef, useEffect } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Clock,
  Tag,
  MoreVertical,
  Edit2,
  Trash2,
  AlertTriangle,
  X,
} from 'lucide-react';
import { useProductivity } from '../../context/ProductivityContext';
import { TaskModal } from '../common/TaskModal';

export const TodaysTasks = () => {
  const { tasks, toggleTaskCompletion, deleteTask } = useProductivity();

  const [filter, setFilter] = useState('All'); // All | Pending | Completed
  const [activeMenuId, setActiveMenuId] = useState(null);

  // Modals state
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const todayStr = new Date().toISOString().split('T')[0];
  const todaysTasks = tasks.filter((t) => t.dueDate === todayStr);

  const filteredTasks = todaysTasks.filter((t) => {
    if (filter === 'Pending') return t.status === 'Pending';
    if (filter === 'Completed') return t.status === 'Completed';
    return true;
  });

  // Close dropdown on outside click
  const menuRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setActiveMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOpenAddModal = () => {
    setTaskToEdit(null);
    setIsTaskModalOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setActiveMenuId(null);
    setTaskToEdit(task);
    setIsTaskModalOpen(true);
  };

  const handleOpenDeleteModal = (task) => {
    setActiveMenuId(null);
    setTaskToDelete(task);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      deleteTask(taskToDelete.id);
      setTaskToDelete(null);
    }
  };

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return 'bg-rose-500/15 text-rose-400 border-rose-500/30';
      case 'Medium':
        return 'bg-amber-500/15 text-amber-400 border-amber-500/30';
      default:
        return 'bg-slate-500/15 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="p-6 rounded-3xl glass-panel border border-white/10 flex flex-col h-full relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-white/10">
        <div>
          <h3 className="text-lg font-bold text-slate-100 flex items-center gap-2">
            Today's Tasks
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
              {todaysTasks.length}
            </span>
          </h3>
          <p className="text-xs text-slate-400">Manage and check off your daily goals</p>
        </div>

        <button
          onClick={handleOpenAddModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold shadow-md shadow-indigo-600/30 transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>Add Task</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-1 my-3 overflow-x-auto no-scrollbar">
        {['All', 'Pending', 'Completed'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${filter === f
              ? 'bg-slate-800 text-cyan-400 border border-cyan-500/30'
              : 'text-slate-400 hover:text-slate-200'
              }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Task List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 max-h-80 pr-1">
        {filteredTasks.length === 0 ? (
          <div className="py-10 text-center text-slate-400 text-xs flex flex-col items-center justify-center gap-2.5">
            <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 animate-float">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="font-bold text-slate-200 text-sm">No tasks yet ✨</p>
              <p className="text-slate-400 text-xs mt-0.5">Start your day by adding your first task.</p>
            </div>
            <button
              onClick={handleOpenAddModal}
              className="mt-1 flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs shadow-md shadow-indigo-600/30 transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Task</span>
            </button>
          </div>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className={`relative p-3.5 rounded-2xl border transition-all duration-200 flex items-start justify-between gap-3 ${task.status === 'Completed'
                ? 'bg-slate-900/30 border-white/5 opacity-65'
                : 'glass-card border-white/10 hover:border-indigo-500/30'
                }`}
            >
              <div className="flex items-start gap-3 min-w-0 flex-1">
                <button
                  onClick={() => toggleTaskCompletion(task.id)}
                  className="mt-0.5 text-slate-400 hover:text-indigo-400 transition-colors shrink-0"
                  title={task.status === 'Completed' ? 'Mark Pending' : 'Mark Completed'}
                >
                  {task.status === 'Completed' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-500 hover:text-indigo-400" />
                  )}
                </button>

                <div className="min-w-0 flex-1">
                  <p
                    className={`text-sm font-semibold truncate ${task.status === 'Completed'
                      ? 'line-through text-slate-500'
                      : 'text-slate-100'
                      }`}
                  >
                    {task.title}
                  </p>
                  {task.description && (
                    <p className="text-xs text-slate-400 truncate mt-0.5">
                      {task.description}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Tag className="w-3 h-3 text-cyan-400" />
                      {task.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-indigo-400" />
                      {task.dueTime || 'Anytime'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Priority & Action Dropdown */}
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getPriorityBadge(
                    task.priority
                  )}`}
                >
                  {task.priority}
                </span>

                {/* Dropdown Menu Trigger */}
                <div className="relative">
                  <button
                    onClick={() => setActiveMenuId(activeMenuId === task.id ? null : task.id)}
                    className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
                    title="Task options"
                  >
                    <MoreVertical className="w-4 h-4" />
                  </button>

                  {/* Dropdown Card */}
                  {activeMenuId === task.id && (
                    <div
                      ref={menuRef}
                      className="absolute right-0 top-7 w-36 rounded-xl glass-panel border border-white/10 shadow-2xl z-50 p-1 animate-in fade-in zoom-in-95 duration-150 bg-slate-900/95"
                    >
                      <button
                        onClick={() => handleOpenEditModal(task)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-cyan-300 hover:bg-cyan-500/10 transition-colors"
                      >
                        <Edit2 className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Edit Task</span>
                      </button>
                      <button
                        onClick={() => handleOpenDeleteModal(task)}
                        className="w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-semibold text-slate-200 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                        <span>Delete Task</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Task Add / Edit Reusable Modal */}
      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
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
  );
};

export default TodaysTasks;

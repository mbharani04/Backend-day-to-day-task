import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  STORAGE_KEYS,
  DEFAULT_PROFILE,
  getFromStorage,
  saveToStorage,
  initializeStorageIfEmpty,
  resetAllStorage,
} from '../utils/localStorage';
import { createActivityLog } from '../utils/activityTracker';
import { createNotification, requestBrowserNotificationPermission, showBrowserNotification } from '../utils/notifications';

const ProductivityContext = createContext(null);

export const ProductivityProvider = ({ children }) => {
  // Initialize storage first if empty
  useEffect(() => {
    initializeStorageIfEmpty();
    requestBrowserNotificationPermission();
  }, []);

  // Theme state
  const [theme, setTheme] = useState(() => getFromStorage(STORAGE_KEYS.THEME, 'dark'));

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.THEME, theme);
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // State definitions from localStorage
  const [profile, setProfile] = useState(() => getFromStorage(STORAGE_KEYS.PROFILE, null));
  const [tasks, setTasks] = useState(() => getFromStorage(STORAGE_KEYS.TASKS, []));
  const [targets, setTargets] = useState(() => getFromStorage(STORAGE_KEYS.TARGETS, []));
  const [reminders, setReminders] = useState(() => getFromStorage(STORAGE_KEYS.REMINDERS, []));
  const [events, setEvents] = useState(() => getFromStorage(STORAGE_KEYS.EVENTS, []));
  const [notes, setNotes] = useState(() => getFromStorage(STORAGE_KEYS.NOTES, []));
  const [studySessions, setStudySessions] = useState(() => getFromStorage(STORAGE_KEYS.STUDY_SESSIONS, []));
  const [skills, setSkills] = useState(() => getFromStorage(STORAGE_KEYS.SKILLS, []));
  const [attendance, setAttendance] = useState(() => getFromStorage(STORAGE_KEYS.ATTENDANCE, []));
  const [activityLogs, setActivityLogs] = useState(() => getFromStorage(STORAGE_KEYS.ACTIVITY_LOGS, []));
  const [notifications, setNotifications] = useState(() => getFromStorage(STORAGE_KEYS.NOTIFICATIONS, []));
  
  // Timer State
  const [timer, setTimer] = useState(() =>
    getFromStorage(STORAGE_KEYS.TIMER, {
      mode: 'pomodoro',
      timeLeft: 25 * 60,
      isRunning: false,
      subject: 'JavaScript',
      category: 'Study',
    })
  );

  // Global Quick Add Modal State
  const [quickAddModal, setQuickAddModal] = useState({ isOpen: false, initialType: 'task' });
  const openQuickAdd = (type = 'task') => setQuickAddModal({ isOpen: true, initialType: type });
  const closeQuickAdd = () => setQuickAddModal({ isOpen: false, initialType: 'task' });

  // Command Search Modal State
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Persist State Updates
  const updateProfile = (updatedData) => {
    const newProfile = { ...profile, ...updatedData };
    setProfile(newProfile);
    saveToStorage(STORAGE_KEYS.PROFILE, newProfile);
  };

  const addActivity = (type, title, category) => {
    const newLog = createActivityLog(type, title, category);
    const updated = [newLog, ...activityLogs];
    setActivityLogs(updated);
    saveToStorage(STORAGE_KEYS.ACTIVITY_LOGS, updated);
  };

  const addNotification = (title, message, type = 'info') => {
    const newNotif = createNotification(title, message, type);
    const updated = [newNotif, ...notifications];
    setNotifications(updated);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
    showBrowserNotification(title, message);
  };

  // Task Actions
  const addTask = (taskData) => {
    const newTask = {
      id: `task-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
      status: 'Pending',
      ...taskData,
    };
    const updated = [newTask, ...tasks];
    setTasks(updated);
    saveToStorage(STORAGE_KEYS.TASKS, updated);
    addNotification('New Task Created', `Task "${newTask.title}" was added.`, 'info');
  };

  const updateTask = (id, updatedFields) => {
    const updated = tasks.map((t) => (t.id === id ? { ...t, ...updatedFields } : t));
    setTasks(updated);
    saveToStorage(STORAGE_KEYS.TASKS, updated);
  };

  const deleteTask = (id) => {
    const updated = tasks.filter((t) => t.id !== id);
    setTasks(updated);
    saveToStorage(STORAGE_KEYS.TASKS, updated);
  };

  const toggleTaskCompletion = (id) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updated = tasks.map((t) => {
      if (t.id === id) {
        const isCompleted = t.status === 'Completed';
        const newStatus = isCompleted ? 'Pending' : 'Completed';
        const newCompletedAt = isCompleted ? null : todayStr;

        if (!isCompleted) {
          addActivity('task_completed', `Completed task: ${t.title}`, t.category);
          addNotification('Task Completed! 🎉', `"${t.title}" marked as finished.`, 'success');
        }

        return {
          ...t,
          status: newStatus,
          completedAt: newCompletedAt,
        };
      }
      return t;
    });
    setTasks(updated);
    saveToStorage(STORAGE_KEYS.TASKS, updated);
  };

  // Target Actions
  const addTarget = (targetData) => {
    const newTarget = {
      id: `target-${Date.now()}`,
      currentProgress: 0,
      status: 'In Progress',
      ...targetData,
    };
    const updated = [newTarget, ...targets];
    setTargets(updated);
    saveToStorage(STORAGE_KEYS.TARGETS, updated);
    addNotification('New Target Set', `Target "${newTarget.title}" created.`, 'info');
  };

  const updateTargetProgress = (id, progressDelta) => {
    const updated = targets.map((t) => {
      if (t.id === id) {
        const newProgress = Math.max(0, Math.min(t.targetValue, Number(t.currentProgress) + Number(progressDelta)));
        const isFinished = newProgress >= t.targetValue;
        const newStatus = isFinished ? 'Completed' : 'In Progress';

        if (isFinished && t.status !== 'Completed') {
          addActivity('target_completed', `Achieved target: ${t.title}`, t.category);
          addNotification('Target Achieved! 🏆', `Congratulations! Goal "${t.title}" reached.`, 'success');
        }

        return { ...t, currentProgress: newProgress, status: newStatus };
      }
      return t;
    });
    setTargets(updated);
    saveToStorage(STORAGE_KEYS.TARGETS, updated);
  };

  const updateTarget = (id, updatedFields) => {
    const updated = targets.map((t) => {
      if (t.id === id) {
        const currentProgress = Number(updatedFields.currentProgress !== undefined ? updatedFields.currentProgress : t.currentProgress);
        const targetValue = Number(updatedFields.targetValue !== undefined ? updatedFields.targetValue : t.targetValue);
        const isFinished = currentProgress >= targetValue;
        const newStatus = isFinished ? 'Completed' : 'In Progress';
        return {
          ...t,
          ...updatedFields,
          currentProgress,
          targetValue,
          status: newStatus,
        };
      }
      return t;
    });
    setTargets(updated);
    saveToStorage(STORAGE_KEYS.TARGETS, updated);
  };

  const deleteTarget = (id) => {
    const updated = targets.filter((t) => t.id !== id);
    setTargets(updated);
    saveToStorage(STORAGE_KEYS.TARGETS, updated);
  };

  // Reminder Actions
  const addReminder = (remData) => {
    const newRem = {
      id: `rem-${Date.now()}`,
      status: 'Pending',
      ...remData,
    };
    const updated = [newRem, ...reminders];
    setReminders(updated);
    saveToStorage(STORAGE_KEYS.REMINDERS, updated);
    addNotification('Reminder Scheduled', `"${newRem.title}" set for ${newRem.date} ${newRem.time}`, 'info');
  };

  const toggleReminderCompletion = (id) => {
    const updated = reminders.map((r) =>
      r.id === id ? { ...r, status: r.status === 'Completed' ? 'Pending' : 'Completed' } : r
    );
    setReminders(updated);
    saveToStorage(STORAGE_KEYS.REMINDERS, updated);
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    saveToStorage(STORAGE_KEYS.REMINDERS, updated);
  };

  // Event Actions
  const addEvent = (evtData) => {
    const newEvt = {
      id: `evt-${Date.now()}`,
      ...evtData,
    };
    const updated = [newEvt, ...events];
    setEvents(updated);
    saveToStorage(STORAGE_KEYS.EVENTS, updated);
    addActivity('event_created', `Added Event: ${newEvt.title}`, newEvt.category);
    addNotification('Event Added', `"${newEvt.title}" added to calendar.`, 'info');
  };

  const deleteEvent = (id) => {
    const updated = events.filter((e) => e.id !== id);
    setEvents(updated);
    saveToStorage(STORAGE_KEYS.EVENTS, updated);
  };

  // Note Actions
  const addNote = (noteData) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const newNote = {
      id: `note-${Date.now()}`,
      pinned: false,
      createdAt: todayStr,
      updatedAt: todayStr,
      ...noteData,
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveToStorage(STORAGE_KEYS.NOTES, updated);
  };

  const updateNote = (id, updatedFields) => {
    const todayStr = new Date().toISOString().split('T')[0];
    const updated = notes.map((n) => (n.id === id ? { ...n, ...updatedFields, updatedAt: todayStr } : n));
    setNotes(updated);
    saveToStorage(STORAGE_KEYS.NOTES, updated);
  };

  const toggleNotePin = (id) => {
    const updated = notes.map((n) => (n.id === id ? { ...n, pinned: !n.pinned } : n));
    setNotes(updated);
    saveToStorage(STORAGE_KEYS.NOTES, updated);
  };

  const deleteNote = (id) => {
    const updated = notes.filter((n) => n.id !== id);
    setNotes(updated);
    saveToStorage(STORAGE_KEYS.NOTES, updated);
  };

  // Study Session & Focus Timer Actions
  const startStudySession = ({ subject, concept, plannedDuration }) => {
    const totalSecs = Number(plannedDuration) * 60;
    const now = Date.now();
    const startTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const dateStr = new Date().toISOString().split('T')[0];

    const activeSession = {
      id: `session-${now}`,
      subject,
      concept,
      plannedDuration: Number(plannedDuration),
      remainingSeconds: totalSecs,
      status: 'focusing',
      startTimestamp: now,
      lastTimestamp: now,
      startTimeStr,
      dateStr,
    };

    const newTimerState = { activeSession };
    setTimer(newTimerState);
    saveToStorage(STORAGE_KEYS.TIMER, newTimerState);
    addNotification('Study Session Started 📚', `Focusing on ${subject}: ${concept}`, 'info');
  };

  const pauseStudySession = () => {
    if (!timer?.activeSession) return;
    const updatedSession = {
      ...timer.activeSession,
      status: 'paused',
      lastTimestamp: Date.now(),
    };
    const newTimerState = { activeSession: updatedSession };
    setTimer(newTimerState);
    saveToStorage(STORAGE_KEYS.TIMER, newTimerState);
  };

  const resumeStudySession = () => {
    if (!timer?.activeSession) return;
    const updatedSession = {
      ...timer.activeSession,
      status: 'focusing',
      lastTimestamp: Date.now(),
    };
    const newTimerState = { activeSession: updatedSession };
    setTimer(newTimerState);
    saveToStorage(STORAGE_KEYS.TIMER, newTimerState);
  };

  const completeStudySession = () => {
    if (!timer?.activeSession) return;
    const { subject, concept, plannedDuration, startTimeStr, dateStr } = timer.activeSession;
    const endTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSessionRecord = {
      id: `study-${Date.now()}`,
      subject,
      concept,
      plannedDuration: Number(plannedDuration),
      actualDuration: Number(plannedDuration),
      durationMinutes: Number(plannedDuration),
      startTime: startTimeStr,
      endTime: endTimeStr,
      date: dateStr || new Date().toISOString().split('T')[0],
      status: 'completed',
    };

    const updatedSessions = [newSessionRecord, ...studySessions];
    setStudySessions(updatedSessions);
    saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, updatedSessions);

    addActivity('study_session', `Completed ${plannedDuration} mins Study Session (${subject}: ${concept})`, 'Study');
    addNotification('Study Session Completed! 🎉', `Great work! Completed ${plannedDuration} mins on ${subject}.`, 'success');

    const resetTimerState = { activeSession: null };
    setTimer(resetTimerState);
    saveToStorage(STORAGE_KEYS.TIMER, resetTimerState);
    return newSessionRecord;
  };

  const endStudySessionEarly = () => {
    if (!timer?.activeSession) return;
    const { subject, concept, plannedDuration, remainingSeconds, startTimeStr, dateStr } = timer.activeSession;

    const elapsedSeconds = plannedDuration * 60 - remainingSeconds;
    const actualDuration = Math.max(1, Math.round(elapsedSeconds / 60));
    const endTimeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newSessionRecord = {
      id: `study-${Date.now()}`,
      subject,
      concept,
      plannedDuration: Number(plannedDuration),
      actualDuration,
      durationMinutes: actualDuration,
      startTime: startTimeStr,
      endTime: endTimeStr,
      date: dateStr || new Date().toISOString().split('T')[0],
      status: 'ended',
    };

    const updatedSessions = [newSessionRecord, ...studySessions];
    setStudySessions(updatedSessions);
    saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, updatedSessions);

    addActivity('study_session', `Studied ${actualDuration} mins of ${subject} (${concept})`, 'Study');
    addNotification('Study Session Ended', `Saved ${actualDuration} mins of focus for ${subject}.`, 'info');

    const resetTimerState = { activeSession: null };
    setTimer(resetTimerState);
    saveToStorage(STORAGE_KEYS.TIMER, resetTimerState);
    return newSessionRecord;
  };

  const deleteStudySession = (id) => {
    const updated = studySessions.filter((s) => s.id !== id);
    setStudySessions(updated);
    saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, updated);
  };

  // Timer Tick Effect
  useEffect(() => {
    let interval = null;
    if (timer?.activeSession?.status === 'focusing') {
      interval = setInterval(() => {
        const active = timer.activeSession;
        if (!active) return;

        const now = Date.now();
        const elapsedSecs = Math.floor((now - active.lastTimestamp) / 1000);

        if (elapsedSecs >= 1) {
          const newRemaining = Math.max(0, active.remainingSeconds - elapsedSecs);
          if (newRemaining <= 0) {
            completeStudySession();
          } else {
            const updatedState = {
              ...timer,
              activeSession: {
                ...active,
                remainingSeconds: newRemaining,
                lastTimestamp: now,
              },
            };
            setTimer(updatedState);
            saveToStorage(STORAGE_KEYS.TIMER, updatedState);
          }
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer?.activeSession?.status, timer?.activeSession?.remainingSeconds]);

  // Skill Actions
  const addSkill = (skillData) => {
    const newSkill = {
      id: `skill-${Date.now()}`,
      progress: 0,
      status: 'Learning',
      ...skillData,
    };
    const updated = [newSkill, ...skills];
    setSkills(updated);
    saveToStorage(STORAGE_KEYS.SKILLS, updated);
    addNotification('New Skill Goal Added', `Learning goal "${newSkill.name}" started.`, 'info');
  };

  const updateSkillProgress = (id, progress) => {
    const updated = skills.map((s) => {
      if (s.id === id) {
        const val = Math.min(100, Math.max(0, Number(progress)));
        const newStatus = val >= 100 ? 'Completed' : 'Learning';

        if (val >= 100 && s.status !== 'Completed') {
          addActivity('skill_updated', `Mastered Skill: ${s.name} (100%)`, s.category);
          addNotification('Skill Completed! 🚀', `Congratulations! You mastered "${s.name}".`, 'success');
        }

        return { ...s, progress: val, status: newStatus };
      }
      return s;
    });
    setSkills(updated);
    saveToStorage(STORAGE_KEYS.SKILLS, updated);
  };

  const deleteSkill = (id) => {
    const updated = skills.filter((s) => s.id !== id);
    setSkills(updated);
    saveToStorage(STORAGE_KEYS.SKILLS, updated);
  };

  // Attendance Actions
  const addAttendanceCategory = (attData) => {
    const newAtt = {
      id: `att-${Date.now()}`,
      totalClasses: 0,
      present: 0,
      absent: 0,
      requiredPercentage: 75,
      ...attData,
    };
    const updated = [newAtt, ...attendance];
    setAttendance(updated);
    saveToStorage(STORAGE_KEYS.ATTENDANCE, updated);
  };

  const recordAttendance = (id, isPresent) => {
    const updated = attendance.map((item) => {
      if (item.id === id) {
        const newTotal = Number(item.totalClasses) + 1;
        const newPresent = isPresent ? Number(item.present) + 1 : Number(item.present);
        const newAbsent = !isPresent ? Number(item.absent) + 1 : Number(item.absent);

        const currentPct = Math.round((newPresent / newTotal) * 100);
        if (currentPct < item.requiredPercentage) {
          addNotification(
            'Attendance Warning ⚠️',
            `${item.category} attendance dropped to ${currentPct}% (Target: ${item.requiredPercentage}%)`,
            'warning'
          );
        }

        addActivity('attendance_updated', `Marked ${isPresent ? 'Present' : 'Absent'} for ${item.category}`, 'Attendance');

        return {
          ...item,
          totalClasses: newTotal,
          present: newPresent,
          absent: newAbsent,
        };
      }
      return item;
    });
    setAttendance(updated);
    saveToStorage(STORAGE_KEYS.ATTENDANCE, updated);
  };

  const deleteAttendance = (id) => {
    const updated = attendance.filter((a) => a.id !== id);
    setAttendance(updated);
    saveToStorage(STORAGE_KEYS.ATTENDANCE, updated);
  };

  // Notification Center Actions
  const markNotificationRead = (id) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, read: true } : n));
    setNotifications(updated);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const markAllNotificationsRead = () => {
    const updated = notifications.map((n) => ({ ...n, read: true }));
    setNotifications(updated);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  };

  const clearNotifications = () => {
    setNotifications([]);
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, []);
  };

  // Reset Application Data
  const resetApplicationData = () => {
    resetAllStorage();
    setProfile(null);
    setTasks([]);
    setTargets([]);
    setReminders([]);
    setEvents([]);
    setNotes([]);
    setStudySessions([]);
    setSkills([]);
    setAttendance([]);
    setActivityLogs([]);
    setNotifications([]);
    setTimer({
      mode: 'pomodoro',
      timeLeft: 25 * 60,
      isRunning: false,
      subject: 'General Focus',
      category: 'Study',
    });
  };

  return (
    <ProductivityContext.Provider
      value={{
        theme,
        toggleTheme,
        profile,
        updateProfile,
        tasks,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        targets,
        addTarget,
        updateTarget,
        updateTargetProgress,
        deleteTarget,
        reminders,
        addReminder,
        toggleReminderCompletion,
        deleteReminder,
        events,
        addEvent,
        deleteEvent,
        notes,
        addNote,
        updateNote,
        toggleNotePin,
        deleteNote,
        studySessions,
        timer,
        startStudySession,
        pauseStudySession,
        resumeStudySession,
        completeStudySession,
        endStudySessionEarly,
        deleteStudySession,
        skills,
        addSkill,
        updateSkillProgress,
        deleteSkill,
        attendance,
        addAttendanceCategory,
        recordAttendance,
        deleteAttendance,
        activityLogs,
        addActivity,
        notifications,
        addNotification,
        markNotificationRead,
        markAllNotificationsRead,
        clearNotifications,
        quickAddModal,
        openQuickAdd,
        closeQuickAdd,
        searchModalOpen,
        setSearchModalOpen,
        searchQuery,
        setSearchQuery,
        resetApplicationData,
      }}
    >
      {children}
    </ProductivityContext.Provider>
  );
};

export const useProductivity = () => {
  const context = useContext(ProductivityContext);
  if (!context) {
    throw new Error('useProductivity must be used within a ProductivityProvider');
  }
  return context;
};

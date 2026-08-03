import React, { createContext, useContext, useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import { getStorageItem, setStorageItem, clearAllStorage } from '../utils/localStorage';
import {
  initialTargets,
  initialDailyPlanner,
  initialStudySessions,
  initialSkills,
  initialWork,
  initialSalary,
  initialSavings,
  initialShopping,
  initialNotes,
  initialReminders,
  initialProfile,
  initialSettings,
  initialDailyReview,
  initialCalendarEvents
} from '../utils/initialData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Local storage state hooks
  const [targets, setTargets] = useState(() => getStorageItem('targets', initialTargets));
  const [dailyPlanner, setDailyPlanner] = useState(() => getStorageItem('dailyPlanner', initialDailyPlanner));
  const [studySessions, setStudySessions] = useState(() => getStorageItem('studySessions', initialStudySessions));
  const [skills, setSkills] = useState(() => getStorageItem('skills', initialSkills));
  const [work, setWork] = useState(() => getStorageItem('work', initialWork));
  const [salary, setSalary] = useState(() => getStorageItem('salary', initialSalary));
  const [savings, setSavings] = useState(() => getStorageItem('savings', initialSavings));
  const [shopping, setShopping] = useState(() => getStorageItem('shopping', initialShopping));
  const [notes, setNotes] = useState(() => getStorageItem('notes', initialNotes));
  const [reminders, setReminders] = useState(() => getStorageItem('reminders', initialReminders));
  const [profile, setProfile] = useState(() => getStorageItem('profile', initialProfile));
  const [settings, setSettings] = useState(() => getStorageItem('settings', initialSettings));
  const [dailyReview, setDailyReview] = useState(() => getStorageItem('dailyReview', initialDailyReview));
  const [calendarEvents, setCalendarEvents] = useState(() => getStorageItem('calendarEvents', initialCalendarEvents));

  // Global UI modal & timer states
  const [quickActionModal, setQuickActionModal] = useState({ isOpen: false, type: 'target' });
  const [activeTimer, setActiveTimer] = useState({
    isRunning: false,
    mode: 'pomodoro', // 'pomodoro' | 'shortBreak' | 'longBreak'
    secondsLeft: 25 * 60,
    subject: 'General Study',
    topic: 'Focus Block'
  });

  // Sync to LocalStorage
  useEffect(() => { setStorageItem('targets', targets); }, [targets]);
  useEffect(() => { setStorageItem('dailyPlanner', dailyPlanner); }, [dailyPlanner]);
  useEffect(() => { setStorageItem('studySessions', studySessions); }, [studySessions]);
  useEffect(() => { setStorageItem('skills', skills); }, [skills]);
  useEffect(() => { setStorageItem('work', work); }, [work]);
  useEffect(() => { setStorageItem('salary', salary); }, [salary]);
  useEffect(() => { setStorageItem('savings', savings); }, [savings]);
  useEffect(() => { setStorageItem('shopping', shopping); }, [shopping]);
  useEffect(() => { setStorageItem('notes', notes); }, [notes]);
  useEffect(() => { setStorageItem('reminders', reminders); }, [reminders]);
  useEffect(() => { setStorageItem('profile', profile); }, [profile]);
  useEffect(() => { setStorageItem('settings', settings); }, [settings]);
  useEffect(() => { setStorageItem('dailyReview', dailyReview); }, [dailyReview]);
  useEffect(() => { setStorageItem('calendarEvents', calendarEvents); }, [calendarEvents]);

  // Quick Action Modal Controls
  const openQuickAction = (type = 'target') => setQuickActionModal({ isOpen: true, type });
  const closeQuickAction = () => setQuickActionModal({ isOpen: false, type: 'target' });

  // Calendar Events CRUD & Auto Integration
  const addCalendarEvent = (eventData) => {
    const newEvent = {
      id: uuidv4(),
      title: eventData.title || 'Untitled Event',
      description: eventData.description || '',
      category: eventData.category || 'Personal',
      startDate: eventData.startDate || new Date().toISOString().split('T')[0],
      endDate: eventData.endDate || eventData.startDate || new Date().toISOString().split('T')[0],
      startTime: eventData.startTime || '09:00 AM',
      endTime: eventData.endTime || '10:00 AM',
      priority: eventData.priority || 'Medium',
      color: eventData.color || 'Blue',
      completed: eventData.completed || false,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setCalendarEvents(prev => [newEvent, ...prev]);

    // Auto-Integration with related modules
    if (newEvent.category === 'Study') {
      setStudySessions(prev => [{
        id: uuidv4(),
        subject: newEvent.title,
        topic: newEvent.description || 'Calendar Event Session',
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        durationMinutes: 60,
        date: newEvent.startDate
      }, ...prev]);
    } else if (newEvent.category === 'Work') {
      setWork(prev => [{
        id: uuidv4(),
        title: newEvent.title,
        description: newEvent.description || 'Calendar Event Work',
        date: newEvent.startDate,
        startTime: newEvent.startTime,
        endTime: newEvent.endTime,
        durationMinutes: 60,
        completed: newEvent.completed
      }, ...prev]);
    } else if (newEvent.category === 'Target') {
      setTargets(prev => [{
        id: uuidv4(),
        title: newEvent.title,
        description: newEvent.description || 'Calendar Target Goal',
        type: 'Daily',
        priority: newEvent.priority,
        progress: newEvent.completed ? 100 : 0,
        completed: newEvent.completed,
        createdAt: newEvent.startDate
      }, ...prev]);
    } else if (newEvent.category === 'Reminder') {
      setReminders(prev => [{
        id: uuidv4(),
        title: newEvent.title,
        date: newEvent.startDate,
        time: newEvent.startTime,
        priority: newEvent.priority,
        completed: newEvent.completed
      }, ...prev]);
    }

    toast.success(`Event '${newEvent.title}' created and synchronized!`);
  };

  const updateCalendarEvent = (id, updatedFields) => {
    setCalendarEvents(prev => prev.map(evt => evt.id === id ? { ...evt, ...updatedFields } : evt));
    toast.success('Calendar Event Updated!');
  };

  const deleteCalendarEvent = (id) => {
    setCalendarEvents(prev => prev.filter(evt => evt.id !== id));
    toast.error('Calendar Event Deleted');
  };

  const toggleCalendarEventCompleted = (id) => {
    setCalendarEvents(prev => prev.map(evt => evt.id === id ? { ...evt, completed: !evt.completed } : evt));
  };

  const duplicateCalendarEvent = (id) => {
    const existing = calendarEvents.find(evt => evt.id === id);
    if (!existing) return;
    const duplicated = {
      ...existing,
      id: uuidv4(),
      title: `${existing.title} (Copy)`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setCalendarEvents(prev => [duplicated, ...prev]);
    toast.success('Event Duplicated!');
  };

  // Targets CRUD
  const addTarget = (item) => {
    setTargets(prev => [item, ...prev]);
    toast.success('New Target Added!');
  };
  const updateTarget = (id, updated) => {
    setTargets(prev => prev.map(t => (t.id === id ? { ...t, ...updated } : t)));
    toast.success('Target Updated!');
  };
  const deleteTarget = (id) => {
    setTargets(prev => prev.filter(t => t.id !== id));
    toast.error('Target Deleted!');
  };

  // Daily Planner CRUD
  const addPlannerTask = (task) => {
    setDailyPlanner(prev => [task, ...prev]);
    toast.success('Task Added to Planner!');
  };
  const togglePlannerTask = (id) => {
    setDailyPlanner(prev => prev.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };
  const deletePlannerTask = (id) => {
    setDailyPlanner(prev => prev.filter(t => t.id !== id));
    toast.error('Planner Task Deleted');
  };

  // Study Sessions CRUD
  const addStudySession = (session) => {
    setStudySessions(prev => [session, ...prev]);
    toast.success('Study Session Logged!');
  };
  const deleteStudySession = (id) => {
    setStudySessions(prev => prev.filter(s => s.id !== id));
    toast.error('Session Removed');
  };

  // Skills CRUD
  const addSkill = (skill) => {
    setSkills(prev => [skill, ...prev]);
    toast.success('New Skill Registered!');
  };
  const updateSkill = (id, updated) => {
    setSkills(prev => prev.map(s => (s.id === id ? { ...s, ...updated } : s)));
    toast.success('Skill Updated');
  };
  const deleteSkill = (id) => {
    setSkills(prev => prev.filter(s => s.id !== id));
    toast.error('Skill Removed');
  };

  // Work CRUD
  const addWorkEntry = (entry) => {
    setWork(prev => [entry, ...prev]);
    toast.success('Work Logged Successfully!');
  };
  const toggleWorkEntry = (id) => {
    setWork(prev => prev.map(w => (w.id === id ? { ...w, completed: !w.completed } : w)));
  };
  const deleteWorkEntry = (id) => {
    setWork(prev => prev.filter(w => w.id !== id));
    toast.error('Work Entry Deleted');
  };

  // Salary CRUD
  const addSalary = (item) => {
    setSalary(prev => [item, ...prev]);
    toast.success('Income Logged!');
  };
  const deleteSalary = (id) => {
    setSalary(prev => prev.filter(s => s.id !== id));
    toast.error('Income Entry Removed');
  };

  // Savings CRUD
  const addSavings = (item) => {
    setSavings(prev => [item, ...prev]);
    toast.success('Savings Added!');
  };
  const deleteSavings = (id) => {
    setSavings(prev => prev.filter(s => s.id !== id));
    toast.error('Savings Entry Removed');
  };

  // Shopping CRUD
  const addShoppingItem = (item) => {
    setShopping(prev => [item, ...prev]);
    toast.success('Added to Wishlist!');
  };
  const toggleShoppingPurchased = (id) => {
    setShopping(prev => prev.map(item => (item.id === id ? { ...item, purchased: !item.purchased } : item)));
  };
  const deleteShoppingItem = (id) => {
    setShopping(prev => prev.filter(item => item.id !== id));
    toast.error('Wishlist Item Deleted');
  };

  // Notes CRUD
  const addNote = (note) => {
    setNotes(prev => [note, ...prev]);
    toast.success('Note Created!');
  };
  const updateNote = (id, updated) => {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, ...updated, updatedAt: new Date().toISOString().split('T')[0] } : n)));
    toast.success('Note Updated');
  };
  const togglePinNote = (id) => {
    setNotes(prev => prev.map(n => (n.id === id ? { ...n, pinned: !n.pinned } : n)));
  };
  const deleteNote = (id) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    toast.error('Note Deleted');
  };

  // Reminders CRUD
  const addReminder = (reminder) => {
    setReminders(prev => [reminder, ...prev]);
    toast.success('Reminder Set!');
  };
  const toggleReminderCompleted = (id) => {
    setReminders(prev => prev.map(r => (r.id === id ? { ...r, completed: !r.completed } : r)));
  };
  const deleteReminder = (id) => {
    setReminders(prev => prev.filter(r => r.id !== id));
    toast.error('Reminder Deleted');
  };

  // Daily Review CRUD
  const addDailyReview = (review) => {
    setDailyReview(prev => [review, ...prev]);
    toast.success('Daily Reflection Saved!');
  };
  const updateDailyReview = (id, updatedFields) => {
    setDailyReview(prev => prev.map(r => r.id === id ? { ...r, ...updatedFields } : r));
    toast.success('Daily Reflection Updated!');
  };
  const deleteDailyReview = (id) => {
    setDailyReview(prev => prev.filter(r => r.id !== id));
    toast.error('Daily Reflection Deleted');
  };

  // Data Reset & Backup
  const resetAllData = () => {
    clearAllStorage();
    setTargets(initialTargets);
    setDailyPlanner(initialDailyPlanner);
    setStudySessions(initialStudySessions);
    setSkills(initialSkills);
    setWork(initialWork);
    setSalary(initialSalary);
    setSavings(initialSavings);
    setShopping(initialShopping);
    setNotes(initialNotes);
    setReminders(initialReminders);
    setProfile(initialProfile);
    setSettings(initialSettings);
    setDailyReview(initialDailyReview);
    setCalendarEvents(initialCalendarEvents);
    toast.success('All Data Reset to Initial Demo State!');
  };

  const exportDataJSON = () => {
    const backupData = {
      targets,
      dailyPlanner,
      studySessions,
      skills,
      work,
      salary,
      savings,
      shopping,
      notes,
      reminders,
      profile,
      settings,
      dailyReview,
      calendarEvents,
      exportDate: new Date().toISOString()
    };
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `productivity_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    toast.success('JSON Export Downloaded!');
  };

  const importDataJSON = (jsonData) => {
    try {
      if (jsonData.targets) setTargets(jsonData.targets);
      if (jsonData.dailyPlanner) setDailyPlanner(jsonData.dailyPlanner);
      if (jsonData.studySessions) setStudySessions(jsonData.studySessions);
      if (jsonData.skills) setSkills(jsonData.skills);
      if (jsonData.work) setWork(jsonData.work);
      if (jsonData.salary) setSalary(jsonData.salary);
      if (jsonData.savings) setSavings(jsonData.savings);
      if (jsonData.shopping) setShopping(jsonData.shopping);
      if (jsonData.notes) setNotes(jsonData.notes);
      if (jsonData.reminders) setReminders(jsonData.reminders);
      if (jsonData.profile) setProfile(jsonData.profile);
      if (jsonData.settings) setSettings(jsonData.settings);
      if (jsonData.dailyReview) setDailyReview(jsonData.dailyReview);
      if (jsonData.calendarEvents) setCalendarEvents(jsonData.calendarEvents);
      toast.success('Data Imported Successfully!');
    } catch (err) {
      toast.error('Failed to parse JSON backup file');
    }
  };

  return (
    <AppContext.Provider
      value={{
        targets,
        addTarget,
        updateTarget,
        deleteTarget,

        dailyPlanner,
        addPlannerTask,
        togglePlannerTask,
        deletePlannerTask,

        studySessions,
        addStudySession,
        deleteStudySession,

        skills,
        addSkill,
        updateSkill,
        deleteSkill,

        work,
        addWorkEntry,
        toggleWorkEntry,
        deleteWorkEntry,

        salary,
        addSalary,
        deleteSalary,

        savings,
        addSavings,
        deleteSavings,

        shopping,
        addShoppingItem,
        toggleShoppingPurchased,
        deleteShoppingItem,

        notes,
        addNote,
        updateNote,
        togglePinNote,
        deleteNote,

        reminders,
        addReminder,
        toggleReminderCompleted,
        deleteReminder,

        profile,
        setProfile,

        settings,
        setSettings,

        dailyReview,
        addDailyReview,
        updateDailyReview,
        deleteDailyReview,

        calendarEvents,
        addCalendarEvent,
        updateCalendarEvent,
        deleteCalendarEvent,
        toggleCalendarEventCompleted,
        duplicateCalendarEvent,

        quickActionModal,
        openQuickAction,
        closeQuickAction,

        activeTimer,
        setActiveTimer,

        resetAllData,
        exportDataJSON,
        importDataJSON
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};


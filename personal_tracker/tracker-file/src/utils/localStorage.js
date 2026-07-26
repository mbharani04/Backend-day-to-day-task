// LocalStorage helper module with safe error handling and empty collection defaults
import lionAvatar from '../assets/lion.jpg';
import pandaAvatar from '../assets/panda.png';

export const STORAGE_KEYS = {
  PROFILE: 'productivity_profile',
  TASKS: 'productivity_tasks',
  TARGETS: 'productivity_targets',
  REMINDERS: 'productivity_reminders',
  EVENTS: 'productivity_events',
  NOTES: 'productivity_notes',
  STUDY_SESSIONS: 'productivity_study_sessions',
  SKILLS: 'productivity_skills',
  ATTENDANCE: 'productivity_attendance',
  ACTIVITY_LOGS: 'productivity_activity_logs',
  NOTIFICATIONS: 'productivity_notifications',
  TIMER: 'productivity_timer',
  THEME: 'productivity_theme',
  CUSTOM_SUBJECTS: 'productivity_custom_subjects',
};

// Default empty collections
export const DEFAULT_PROFILE = {
  name: 'Bharani',
  email: 'bharani@example.com',
  phone: '+1 (555) 234-5678',
  education: 'Computer Science & Software Engineering',
  role: 'Full-Stack Developer',
  bio: 'Passionate about building high-quality applications and achieving daily productivity milestones.',
  skills: ['React', 'JavaScript', 'Node.js', 'Tailwind CSS'],
  profileAvatar: lionAvatar,
  onboarded: true,
};

const DEFAULT_TIMER = {
  activeSession: null,
};

export function getFromStorage(key, defaultValue = null) {
  try {
    const item = localStorage.getItem(key);
    if (!item) return defaultValue;
    return JSON.parse(item);
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
}

export function saveToStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving to localStorage key "${key}":`, error);
  }
}

export function initializeStorageIfEmpty() {
  if (localStorage.getItem(STORAGE_KEYS.PROFILE) === null) {
    saveToStorage(STORAGE_KEYS.PROFILE, null);
  }
  if (localStorage.getItem(STORAGE_KEYS.TASKS) === null) {
    saveToStorage(STORAGE_KEYS.TASKS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.TARGETS) === null) {
    saveToStorage(STORAGE_KEYS.TARGETS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.REMINDERS) === null) {
    saveToStorage(STORAGE_KEYS.REMINDERS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.EVENTS) === null) {
    saveToStorage(STORAGE_KEYS.EVENTS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.NOTES) === null) {
    saveToStorage(STORAGE_KEYS.NOTES, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.STUDY_SESSIONS) === null) {
    saveToStorage(STORAGE_KEYS.STUDY_SESSIONS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.SKILLS) === null) {
    saveToStorage(STORAGE_KEYS.SKILLS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.ATTENDANCE) === null) {
    saveToStorage(STORAGE_KEYS.ATTENDANCE, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.ACTIVITY_LOGS) === null) {
    saveToStorage(STORAGE_KEYS.ACTIVITY_LOGS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.NOTIFICATIONS) === null) {
    saveToStorage(STORAGE_KEYS.NOTIFICATIONS, []);
  }
  if (localStorage.getItem(STORAGE_KEYS.TIMER) === null) {
    saveToStorage(STORAGE_KEYS.TIMER, DEFAULT_TIMER);
  }
  if (localStorage.getItem(STORAGE_KEYS.THEME) === null) {
    saveToStorage(STORAGE_KEYS.THEME, 'dark');
  }
  if (localStorage.getItem(STORAGE_KEYS.CUSTOM_SUBJECTS) === null) {
    saveToStorage(STORAGE_KEYS.CUSTOM_SUBJECTS, []);
  }
}

export function resetAllStorage() {
  Object.values(STORAGE_KEYS).forEach((key) => {
    localStorage.removeItem(key);
  });
  initializeStorageIfEmpty();
}

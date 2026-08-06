import lionImg from '../assets/images/lion.jpg';

export const initialAuth = {
  isAuthenticated: true,
  user: {
    id: 'user-default-1',
    name: 'Guest User',
    email: 'user@example.com',
    avatar: lionImg,
    degree: '',
    bio: '',
    skills: [],
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: ''
    }
  }
};

export const initialProfile = {
  name: 'Guest User',
  email: 'user@example.com',
  avatar: lionImg,
  degree: '',
  skills: [],
  bio: '',
  socialLinks: {
    github: '',
    linkedin: '',
    twitter: ''
  }
};

export const initialSettings = {
  theme: 'dark',
  accentColor: 'purple',
  animationEnabled: true,
  notificationEnabled: true,
  sidebarCollapsed: false
};

export const initialCalendarEvents = [];
export const initialTargets = [];
export const initialDailyPlanner = [];
export const initialStudySessions = [];
export const initialSkills = [];
export const initialWork = [];
export const initialSalary = [];
export const initialSavings = [];
export const initialShopping = [];
export const initialNotes = [];
export const initialReminders = [];
export const initialDailyReview = [];

// Centralized localStorage database manager for Chennai Public Events App

const KEYS = {
  USERS: 'users',
  ORGANIZATIONS: 'organizations',
  EVENTS: 'events',
  BOOKINGS: 'bookings',
  CURRENT_USER: 'currentUser',
  THEME: 'theme',
  OTP: 'otp'
};

// Users Utility
export const getUsers = () => {
  try {
    const data = localStorage.getItem(KEYS.USERS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading users from localStorage:', error);
    return [];
  }
};

export const saveUsers = (users) => {
  try {
    localStorage.setItem(KEYS.USERS, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};

// Organizations Utility
export const getOrganizations = () => {
  try {
    const data = localStorage.getItem(KEYS.ORGANIZATIONS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading organizations from localStorage:', error);
    return [];
  }
};

export const saveOrganizations = (organizations) => {
  try {
    localStorage.setItem(KEYS.ORGANIZATIONS, JSON.stringify(organizations));
  } catch (error) {
    console.error('Error saving organizations to localStorage:', error);
  }
};

// Events Utility
export const getEvents = () => {
  try {
    const data = localStorage.getItem(KEYS.EVENTS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading events from localStorage:', error);
    return [];
  }
};

export const saveEvents = (events) => {
  try {
    localStorage.setItem(KEYS.EVENTS, JSON.stringify(events));
  } catch (error) {
    console.error('Error saving events to localStorage:', error);
  }
};

// Bookings Utility
export const getBookings = () => {
  try {
    const data = localStorage.getItem(KEYS.BOOKINGS);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading bookings from localStorage:', error);
    return [];
  }
};

export const saveBookings = (bookings) => {
  try {
    localStorage.setItem(KEYS.BOOKINGS, JSON.stringify(bookings));
  } catch (error) {
    console.error('Error saving bookings to localStorage:', error);
  }
};

// Current User Session Utility
export const getCurrentUser = () => {
  try {
    const data = localStorage.getItem(KEYS.CURRENT_USER);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error reading currentUser from localStorage:', error);
    return null;
  }
};

export const setCurrentUser = (user) => {
  try {
    if (user) {
      localStorage.setItem(KEYS.CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(KEYS.CURRENT_USER);
    }
  } catch (error) {
    console.error('Error setting currentUser in localStorage:', error);
  }
};

export const logoutUser = () => {
  localStorage.removeItem(KEYS.CURRENT_USER);
};

// Theme Utility
export const getTheme = () => {
  return localStorage.getItem(KEYS.THEME) || 'dark';
};

export const setTheme = (theme) => {
  localStorage.setItem(KEYS.THEME, theme);
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStorageItem, setStorageItem, removeStorageItem } from '../utils/localStorage';
import { initialAuth } from '../utils/initialData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const stored = getStorageItem('auth');
    return stored !== null ? stored : initialAuth;
  });

  useEffect(() => {
    setStorageItem('auth', authState);
  }, [authState]);

  const login = (email, password) => {
    const userPayload = {
      id: 'user-' + Date.now(),
      name: email ? email.split('@')[0].replace('.', ' ') : 'Bharani Kumar',
      email: email || 'bharani@example.com',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&q=80',
      degree: 'B.S. Computer Science & AI Systems',
      bio: 'Obsessed with deep focus, high performance routines, full-stack engineering, and lifelong growth.',
      skills: ['React.js', 'System Architecture', 'UI/UX Design', 'TypeScript', 'Node.js'],
      socialLinks: {
        github: 'https://github.com',
        linkedin: 'https://linkedin.com',
        twitter: 'https://twitter.com'
      }
    };

    const newAuthState = {
      isAuthenticated: true,
      user: userPayload
    };

    setAuthState(newAuthState);
    return true;
  };

  const logout = () => {
    const loggedOutState = {
      isAuthenticated: false,
      user: null
    };
    setAuthState(loggedOutState);
    removeStorageItem('auth');
  };

  const updateUserProfile = (updatedFields) => {
    setAuthState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        ...updatedFields
      }
    }));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: authState.isAuthenticated,
        user: authState.user,
        login,
        logout,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

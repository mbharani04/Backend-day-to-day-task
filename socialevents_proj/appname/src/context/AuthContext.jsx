import React, { createContext, useContext, useState, useEffect } from 'react';
import { getCurrentUser, setCurrentUser, logoutUser, getUsers, saveUsers } from '../utils/storage';
import { initSeedData } from '../utils/seedData';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Initialize seed data if not present on first application startup
    initSeedData();
    const storedUser = getCurrentUser();
    setUser(storedUser);
    setLoading(false);
  }, []);

  const sendOTP = async (identifier, selectedRole, mode = 'login') => {
    const users = getUsers();
    const cleanIdentifier = identifier.trim().toLowerCase();
    
    const existingUser = users.find(
      (u) => u.email.toLowerCase() === cleanIdentifier || u.mobile === cleanIdentifier
    );

    if (mode === 'login') {
      if (!existingUser) {
        throw new Error(
          `No account found for '${identifier}'. Please switch to the 'Register' tab to create an account.`
        );
      }
      if (existingUser.role !== selectedRole) {
        throw new Error(
          `Account '${identifier}' is registered as '${existingUser.role.toUpperCase()}', not '${selectedRole.toUpperCase()}'.`
        );
      }
    } else if (mode === 'register') {
      if (existingUser) {
        throw new Error(
          `An account with '${identifier}' already exists. Please switch to the 'Login' tab to log in.`
        );
      }
    }

    return {
      success: true,
      message: 'Demo OTP generated: 123456',
      otp: '123456'
    };
  };

  const verifyOTP = async (identifier, otp, selectedRole, mode = 'login', fullName = '') => {
    if (otp !== '123456') {
      throw new Error('Invalid OTP! Please enter demo OTP 123456.');
    }

    const users = getUsers();
    const cleanIdentifier = identifier.trim().toLowerCase();
    let existingUser = users.find(
      (u) => u.email.toLowerCase() === cleanIdentifier || u.mobile === cleanIdentifier
    );

    if (mode === 'login') {
      if (!existingUser) {
        throw new Error('Account not found! Please register first.');
      }
      if (existingUser.role !== selectedRole) {
        throw new Error(
          `Role mismatch! Account registered as '${existingUser.role.toUpperCase()}'.`
        );
      }
    } else {
      // Register Mode
      const isEmail = cleanIdentifier.includes('@');
      const newUser = {
        id: `usr-${Date.now()}`,
        name: fullName.trim() || (isEmail ? cleanIdentifier.split('@')[0] : 'New User'),
        email: isEmail ? cleanIdentifier : `${cleanIdentifier}@example.com`,
        mobile: isEmail ? '9876543210' : cleanIdentifier,
        role: selectedRole,
        organizationId: selectedRole === 'organization' ? `org-${Date.now()}` : null,
        joinedDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      users.push(newUser);
      saveUsers(users);
      existingUser = newUser;
    }

    // Save session in state and localStorage
    setUser(existingUser);
    setCurrentUser(existingUser);
    return { success: true, user: existingUser };
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    if (!user) return;
    const users = getUsers();
    const index = users.findIndex((u) => u.id === user.id);
    const updatedUser = { ...user, ...updatedData };
    
    if (index !== -1) {
      users[index] = updatedUser;
      saveUsers(users);
    }
    setUser(updatedUser);
    setCurrentUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        role: user?.role || null,
        isAuthenticated: !!user,
        sendOTP,
        verifyOTP,
        logout,
        setUser,
        updateUserProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

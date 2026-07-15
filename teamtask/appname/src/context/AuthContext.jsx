import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const AuthContext = createContext(null);
const AUTH_STORAGE_KEY = 'jslearn-auth';

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isVerified, setIsVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [bookmarks, setBookmarks] = useState([]);
  const [completedTopics, setCompletedTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setUser(parsed.user ?? null);
        setIsVerified(Boolean(parsed.isVerified));
        setOtp(parsed.otp ?? '');
        setBookmarks(parsed.bookmarks ?? []);
        setCompletedTopics(parsed.completedTopics ?? []);
      }
    } catch (error) {
      console.error('Could not read auth data', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (loading) return;

    const payload = {
      user,
      isVerified,
      otp,
      bookmarks,
      completedTopics,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(payload));
  }, [user, isVerified, otp, bookmarks, completedTopics, loading]);

  const registerUser = (form) => {
    const generatedOtp = String(Math.floor(100000 + Math.random() * 900000));
    setUser({ fullName: form.fullName, email: form.email });
    setOtp(generatedOtp);
    setIsVerified(false);
    setBookmarks([]);
    setCompletedTopics([]);
    return generatedOtp;
  };

  const verifyOtp = (inputOtp) => {
    if (inputOtp === otp) {
      setIsVerified(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    setOtp('');
    setIsVerified(false);
    setBookmarks([]);
    setCompletedTopics([]);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const toggleBookmark = (topicId) => {
    setBookmarks((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId],
    );
  };

  const toggleComplete = (topicId) => {
    setCompletedTopics((prev) =>
      prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId],
    );
  };

  const value = useMemo(
    () => ({
      user,
      isVerified,
      otp,
      loading,
      bookmarks,
      completedTopics,
      registerUser,
      verifyOtp,
      logout,
      toggleBookmark,
      toggleComplete,
    }),
    [user, isVerified, otp, loading, bookmarks, completedTopics],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

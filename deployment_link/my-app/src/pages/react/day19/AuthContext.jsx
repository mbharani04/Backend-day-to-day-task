import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("day19_user");
    return saved ? JSON.parse(saved) : null;
  });

  const login = (credentials) => {
    const stored = JSON.parse(localStorage.getItem("day19_users") || "[]");
    const found = stored.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );
    if (!found) return { error: "Invalid email or password." };
    const loggedUser = { name: found.name, email: found.email };
    localStorage.setItem("day19_user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return { success: true };
  };

  const register = (data) => {
    const stored = JSON.parse(localStorage.getItem("day19_users") || "[]");
    const exists = stored.find((u) => u.email === data.email);
    if (exists) return { error: "Email already registered." };
    stored.push(data);
    localStorage.setItem("day19_users", JSON.stringify(stored));
    const loggedUser = { name: data.name, email: data.email };
    localStorage.setItem("day19_user", JSON.stringify(loggedUser));
    setUser(loggedUser);
    return { success: true };
  };

  const logout = () => {
    localStorage.removeItem("day19_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

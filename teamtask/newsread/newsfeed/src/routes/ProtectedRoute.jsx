// ─── ProtectedRoute ───────────────────────────────────────────────────────────
// Wraps private routes. Redirects unauthenticated users to /login.

import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  // If not authenticated, redirect to /login and preserve the attempted URL
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Outlet renders the matched child route
  return <Outlet />;
};

export default ProtectedRoute;

import { Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./AuthContext";
import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import NinteenHome from "./NinteenHome";

/**
 * Day 19 — Login / Register with Protected Routes
 *
 * Routes (nested under /dayninteen):
 *  /dayninteen            → redirect to /dayninteen/login
 *  /dayninteen/login      → Login page (public)
 *  /dayninteen/register   → Register page (public)
 *  /dayninteen/home       → Home page (protected — requires auth)
 */

const Ninteen = () => {
  return (
    <AuthProvider>
      <Routes>
        {/* Default: redirect to login */}
        <Route index element={<Navigate to="login" replace />} />

        {/* Public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />

        {/* Protected route */}
        <Route
          path="home"
          element={
            <ProtectedRoute>
              <NinteenHome />
            </ProtectedRoute>
          }
        />
      </Routes>
    </AuthProvider>
  );
};

export default Ninteen;

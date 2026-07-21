// ─── App.jsx ─────────────────────────────────────────────────────────────────
// Root component. Sets up routing with React Router v7.
// Uses React.lazy + Suspense for code-splitting (performance optimization).

import { Suspense, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoadingSpinner from "./components/LoadingSpinner";
import ProtectedRoute from "./routes/ProtectedRoute";

// ── Lazy-loaded pages ─────────────────────────────────────────────────────────
// React.lazy: splits each page into a separate bundle loaded on demand
const Login     = lazy(() => import("./pages/Login"));
const Register  = lazy(() => import("./pages/Register"));
const Home      = lazy(() => import("./pages/Home"));
const Bookmarks = lazy(() => import("./pages/Bookmarks"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Profile   = lazy(() => import("./pages/Profile"));

const App = () => {
  return (
    // Suspense: shows LoadingSpinner while a lazy page is being loaded
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* ── Public Routes ── */}
        <Route path="/login"    element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* ── Protected Routes (requires authentication) ── */}
        <Route element={<ProtectedRoute />}>
          <Route path="/"          element={<Home />} />
          <Route path="/bookmarks" element={<Bookmarks />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile"   element={<Profile />} />
        </Route>

        {/* ── Catch-all: redirect to home ── */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};

export default App;

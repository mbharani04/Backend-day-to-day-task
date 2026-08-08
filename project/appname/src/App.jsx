import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ToastProvider } from './context/ToastContext';

import { ProtectedRoute, UserRoute, AdminRoute, OrganizationRoute } from './routes/ProtectedRoutes';

// Public Pages
import { Landing } from './pages/Landing';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';

// User Portal Pages
import { UserDashboard } from './pages/user/UserDashboard';
import { UserBookings } from './pages/user/UserBookings';
import { UserProfile } from './pages/user/UserProfile';

// Admin Portal Pages
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminEvents } from './pages/admin/AdminEvents';
import { AdminUsers } from './pages/admin/AdminUsers';
import { AdminOrganizations } from './pages/admin/AdminOrganizations';
import { AdminBookings } from './pages/admin/AdminBookings';

// Organization Portal Pages
import { OrganizationDashboard } from './pages/organization/OrganizationDashboard';
import { OrganizationEvents } from './pages/organization/OrganizationEvents';
import { CreateEvent } from './pages/organization/CreateEvent';
import { OrganizationBookings } from './pages/organization/OrganizationBookings';
import { OrganizationProfile } from './pages/organization/OrganizationProfile';

export function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetails />} />
              <Route path="/login" element={<Login />} />

              {/* User Protected Routes */}
              <Route element={<UserRoute />}>
                <Route path="/user/dashboard" element={<UserDashboard />} />
                <Route path="/user/bookings" element={<UserBookings />} />
                <Route path="/user/profile" element={<UserProfile />} />
              </Route>

              {/* Admin Protected Routes */}
              <Route element={<AdminRoute />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/events" element={<AdminEvents />} />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route path="/admin/organizations" element={<AdminOrganizations />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
              </Route>

              {/* Organization Protected Routes */}
              <Route element={<OrganizationRoute />}>
                <Route path="/organization/dashboard" element={<OrganizationDashboard />} />
                <Route path="/organization/events" element={<OrganizationEvents />} />
                <Route path="/organization/events/create" element={<CreateEvent />} />
                <Route path="/organization/events/edit/:id" element={<CreateEvent />} />
                <Route path="/organization/bookings" element={<OrganizationBookings />} />
                <Route path="/organization/profile" element={<OrganizationProfile />} />
              </Route>

              {/* 404 Catch All */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Router>
        </AuthProvider>
      </ToastProvider>
    </ThemeProvider>
  );
}

export default App;

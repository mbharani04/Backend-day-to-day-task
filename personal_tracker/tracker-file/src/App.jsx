import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ProductivityProvider } from './context/ProductivityContext';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import QuickAddModal from './components/common/QuickAddModal';
import CommandSearchModal from './components/common/CommandSearchModal';
import OnboardingModal from './components/common/OnboardingModal';

import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import CalendarPage from './pages/CalendarPage';
import Reminders from './pages/Reminders';
import Targets from './pages/Targets';
import Productivity from './pages/Productivity';
import Learning from './pages/Learning';
import Attendance from './pages/Attendance';
import Events from './pages/Events';
import Notes from './pages/Notes';
import Settings from './pages/Settings';

export function App() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <ProductivityProvider>
      <Router>
        <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] font-sans antialiased flex transition-colors duration-300">
          {/* Fixed Desktop Sidebar & Mobile Drawer */}
          <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

          {/* Main Content Area */}
          <div className="flex-1 lg:ml-64 flex flex-col min-w-0 min-h-screen">
            {/* Sticky Header */}
            <Header onOpenMobileMenu={() => setIsMobileOpen(true)} />

            {/* Page Route Views Container */}
            <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/calendar" element={<CalendarPage />} />
                <Route path="/reminders" element={<Reminders />} />
                <Route path="/targets" element={<Targets />} />
                <Route path="/productivity" element={<Productivity />} />
                <Route path="/learning" element={<Learning />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/events" element={<Events />} />
                <Route path="/notes" element={<Notes />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
          </div>

          {/* Modals */}
          <QuickAddModal />
          <CommandSearchModal />
          <OnboardingModal />
        </div>
      </Router>
    </ProductivityProvider>
  );
}

export default App;

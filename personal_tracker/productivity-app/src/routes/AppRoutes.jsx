import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from './ProtectedRoute';

import Login from '../pages/Auth/Login';
import Dashboard from '../pages/Dashboard/Dashboard';
import Targets from '../pages/Targets/Targets';
import DailyPlanner from '../pages/DailyPlanner/DailyPlanner';
import StudyHours from '../pages/StudyHours/StudyHours';
import LearningSkills from '../pages/LearningSkills/LearningSkills';
import Work from '../pages/Work/Work';
import Salary from '../pages/Salary/Salary';
import Savings from '../pages/Savings/Savings';
import ThingsToBuy from '../pages/ThingsToBuy/ThingsToBuy';
import Notes from '../pages/Notes/Notes';
import Reminder from '../pages/Reminder/Reminder';
import CalendarView from '../pages/Calendar/CalendarView';
import Analytics from '../pages/Analytics/Analytics';
import Profile from '../pages/Profile/Profile';
import Settings from '../pages/Settings/Settings';
import DailyReview from '../pages/DailyReview/DailyReview';

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Protected Main App Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/targets" element={<Targets />} />
          <Route path="/planner" element={<DailyPlanner />} />
          <Route path="/study" element={<StudyHours />} />
          <Route path="/skills" element={<LearningSkills />} />
          <Route path="/work" element={<Work />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/shopping" element={<ThingsToBuy />} />
          <Route path="/notes" element={<Notes />} />
          <Route path="/reminders" element={<Reminder />} />
          <Route path="/calendar" element={<CalendarView />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/daily-review" element={<DailyReview />} />
        </Route>
      </Route>

      {/* Catch-all Fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};

export default AppRoutes;

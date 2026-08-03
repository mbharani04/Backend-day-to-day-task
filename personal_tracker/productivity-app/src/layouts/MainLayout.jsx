import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar/Sidebar';
import Navbar from '../components/Navbar/Navbar';
import QuickActionModal from '../components/Common/QuickActionModal';

const MainLayout = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--bg-primary-text)] font-sans antialiased transition-colors duration-300">
      {/* Sidebar Navigation */}
      <Sidebar isMobileOpen={isMobileOpen} setIsMobileOpen={setIsMobileOpen} />

      {/* Main Content Area (Offsetted by Sidebar on Desktop) */}
      <div className="lg:pl-64 flex flex-col min-h-screen transition-all duration-300">
        {/* Navbar */}
        <Navbar onOpenMobileSidebar={() => setIsMobileOpen(true)} />

        {/* Page View Container */}
        <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>
      </div>

      {/* Global Quick Action Modal */}
      <QuickActionModal />
    </div>
  );
};

export default MainLayout;

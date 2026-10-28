import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import { Menu, ChevronRight } from 'lucide-react';

const titleMap = {
  '/dashboard': 'Student Dashboard',
  '/attendance': 'Attendance Tracker & Calculator',
  '/registration': 'Semester Registration Log',
  '/noc': 'No Objection Certificate (NOC) Applications',
  '/fees': 'Fee Info & Receipt Portal',
  '/marks': 'Sessional Marks & Internal Estimates',
  '/library': 'Library Transactions & Fine Status',
  '/messages': 'Messages & Grievances',
  '/placement': 'Placement Drives & Readiness',
  '/forum': 'Student & Faculty Discussion Forum',
  '/timetable': 'Weekly Class Timetable',
  '/materials': 'Notes & Assignment Repository',
  '/faculty/dashboard': 'Faculty Overview Dashboard',
  '/faculty/classes': 'Class Traversal Workspace',
  '/faculty/attendance': 'Faculty Attendance Marker',
  '/faculty/marks': 'Sessional Marks Entry',
  '/faculty/materials': 'Study Materials & Notes',
  '/admin/dashboard': 'Executive Admin Control Center',
  '/admin/noc-review': 'NOC Submissions Reviewer',
  '/admin/notices': 'Campus Notice Publisher',
  '/admin/placements': 'Placement Drive Manager',
  '/parent/dashboard': 'Parent / Guardian Portal',
  '/warden/dashboard': 'Hostel Warden Control Panel',
};

export default function AppLayout() {
  const location = useLocation();
  const title = titleMap[location.pathname] || 'Trust One ERP';
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);

  // Close mobile drawer on route navigation
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleToggleSidebar = () => {
    if (window.innerWidth < 1024) {
      setMobileMenuOpen((prev) => !prev);
    } else {
      setDesktopSidebarOpen((prev) => !prev);
    }
  };

  const handleSelectTab = () => {
    // If on laptop/tablet screens (< 1280px), collapse sidebar on tab selection so full table is visible
    if (window.innerWidth < 1280) {
      setDesktopSidebarOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800 relative">
      {/* Sidebar (Desktop and Mobile) */}
      <Sidebar
        isMobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
        isDesktopOpen={desktopSidebarOpen}
        onToggleDesktop={() => setDesktopSidebarOpen((prev) => !prev)}
        onSelectTab={handleSelectTab}
      />

      {/* Floating edge tab to reopen sidebar when collapsed on desktop */}
      {!desktopSidebarOpen && (
        <button
          onClick={() => setDesktopSidebarOpen(true)}
          className="hidden lg:flex fixed left-0 top-20 z-30 bg-slate-900/95 hover:bg-indigo-600 text-white px-2.5 py-2 rounded-r-xl shadow-2xl transition-all duration-200 border-r border-t border-b border-slate-700 hover:pl-3.5 group items-center space-x-1.5 cursor-pointer"
          title="Open Navigation Menu"
        >
          <Menu className="w-4 h-4 text-cyan-400 group-hover:text-white" />
          <span className="text-[11px] font-bold">Menu</span>
        </button>
      )}

      {/* Main Content Area — dynamically offset so it NEVER overlaps or blocks view */}
      <div
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          desktopSidebarOpen ? 'lg:ml-64' : 'lg:ml-0'
        }`}
      >
        <Topbar
          title={title}
          onToggleMobileMenu={handleToggleSidebar}
          isDesktopSidebarOpen={desktopSidebarOpen}
        />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

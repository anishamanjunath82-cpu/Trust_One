import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard, CalendarCheck, FileCheck, FileText,
  CreditCard, Award, BookOpen, MessageSquare, Briefcase,
  MessagesSquare, Calendar, BookMarked, LogOut,
  CheckSquare, Edit3, Upload, Megaphone, ShieldCheck, Users, X,
  ShoppingBag, Building, ChevronLeft
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getUserInitials, getUserDisplayName, getUserAccountLabel } from '../../utils/userUtils';
import ProfileModal from '../common/ProfileModal';

const studentNavItems = [
  { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { name: 'Fee Info', path: '/fees', icon: CreditCard },
  { name: 'Attendance', path: '/attendance', icon: CalendarCheck },
  { name: 'Sessional Marks', path: '/marks', icon: Award },
  { name: 'Study Material & PYQs', path: '/materials', icon: BookMarked },
  { name: 'Campus Book Store', path: '/bookstore', icon: ShoppingBag },
  { name: 'Library Borrowings', path: '/library', icon: BookOpen },
  { name: 'Registration Log', path: '/registration', icon: FileCheck },
  { name: 'NOC Application', path: '/noc', icon: FileText },
  { name: 'SMS & Grievances', path: '/messages', icon: MessageSquare },
  { name: 'Placement', path: '/placement', icon: Briefcase },
  { name: 'Discussion Forum', path: '/forum', icon: MessagesSquare },
  { name: 'Timetable', path: '/timetable', icon: Calendar },
];

const facultyNavItems = [
  { name: 'Faculty Dashboard', path: '/faculty/dashboard', icon: LayoutDashboard },
  { name: 'Class Traversal Workspace', path: '/faculty/classes', icon: Users },
  { name: 'Mark Attendance', path: '/faculty/attendance', icon: CheckSquare },
  { name: 'Enter Sessional Marks', path: '/faculty/marks', icon: Edit3 },
  { name: 'Upload Notes & PYQs', path: '/faculty/materials', icon: Upload },
  { name: 'Study Materials Hub', path: '/materials', icon: BookMarked },
  { name: 'Campus Book Store', path: '/bookstore', icon: ShoppingBag },
  { name: 'Class Timetable', path: '/timetable', icon: Calendar },
  { name: 'Discussion Forum', path: '/forum', icon: MessagesSquare },
  { name: 'Messages & Grievances', path: '/messages', icon: MessageSquare },
];

const adminNavItems = [
  { name: 'Admin Dashboard', path: '/admin/dashboard', icon: ShieldCheck },
  { name: 'Review NOC Applications', path: '/admin/noc-review', icon: FileText },
  { name: 'Publish Official Notice', path: '/admin/notices', icon: Megaphone },
  { name: 'Publish Placement Drive', path: '/admin/placements', icon: Briefcase },
  { name: 'Campus Book Store', path: '/bookstore', icon: ShoppingBag },
  { name: 'Study Materials Hub', path: '/materials', icon: BookMarked },
  { name: 'Messages & Grievances', path: '/messages', icon: MessageSquare },
  { name: 'Discussion Forum', path: '/forum', icon: MessagesSquare },
];

const parentNavItems = [
  { name: 'Parent Dashboard', path: '/parent/dashboard', icon: LayoutDashboard },
  { name: 'Fee Statements', path: '/fees', icon: CreditCard },
  { name: 'Sessional Marks', path: '/marks', icon: Award },
  { name: 'Class Timetable', path: '/timetable', icon: Calendar },
  { name: 'Messages', path: '/messages', icon: MessageSquare },
  { name: 'Discussion Forum', path: '/forum', icon: MessagesSquare },
];

const wardenNavItems = [
  { name: 'Warden Dashboard', path: '/warden/dashboard', icon: Building },
  { name: 'Class Timetable', path: '/timetable', icon: Calendar },
  { name: 'Messages & Complaints', path: '/messages', icon: MessageSquare },
  { name: 'Discussion Forum', path: '/forum', icon: MessagesSquare },
];

export default function Sidebar({
  isMobileOpen = false,
  onCloseMobile = () => {},
  isDesktopOpen = true,
  onToggleDesktop = () => {},
  onSelectTab = () => {},
}) {
  const { logout, user } = useAuth();
  const [profileOpen, setProfileOpen] = React.useState(false);
  const role = user?.role || 'STUDENT';

  let navItems = studentNavItems;
  if (role === 'FACULTY') {
    navItems = facultyNavItems;
  } else if (role === 'ADMIN') {
    navItems = adminNavItems;
  } else if (role === 'PARENT') {
    navItems = parentNavItems;
  } else if (role === 'WARDEN') {
    navItems = wardenNavItems;
  }

  const renderContent = (isMobile = false) => (
    <div className="flex flex-col justify-between h-full">
      <div>
        {/* Header Branding */}
        <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center space-x-3 min-w-0">
            <img
              src="/app_icon.png"
              alt="Trust One ERP"
              className="w-9 h-9 rounded-xl shadow-lg shadow-cyan-500/10 object-contain shrink-0 ring-1 ring-white/10"
            />
            <div className="min-w-0">
              <div className="flex items-center space-x-1">
                <span className="font-black text-white tracking-tight text-base">Trust</span>
                <span className="font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300 text-base">One</span>
              </div>
              <p className="text-[8px] sm:text-[9px] text-cyan-300/80 font-bold uppercase tracking-widest truncate">
                EVERY CAMPUS • CONNECTED
              </p>
            </div>
          </div>

          {/* Collapse/Close Button */}
          {!isMobile ? (
            <button
              onClick={onToggleDesktop}
              className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition shrink-0 cursor-pointer"
              title="Collapse sidebar to full-width view"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          ) : (
            <button
              onClick={onCloseMobile}
              className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-xl transition lg:hidden"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Dynamic Navigation Items */}
        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => {
                  if (isMobile) {
                    onCloseMobile();
                  } else if (onSelectTab) {
                    onSelectTab();
                  }
                }}
                className={({ isActive }) =>
                  `flex items-center space-x-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition duration-150 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 font-bold'
                      : 'hover:bg-slate-800 hover:text-white text-slate-400'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* User Footer & Logout */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/60">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setProfileOpen(true)}
            className="flex items-center space-x-2.5 truncate hover:opacity-80 transition cursor-pointer text-left flex-1 min-w-0"
            title="Click to view full personal profile details"
          >
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-black text-xs shrink-0 shadow-sm uppercase ring-2 ring-transparent hover:ring-indigo-400 transition">
              {getUserInitials(user)}
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white truncate" title={getUserDisplayName(user)}>
                {getUserDisplayName(user)}
              </p>
              <div className="flex items-center space-x-1 mt-0.5">
                <span
                  className="inline-block px-1.5 py-0.2 text-[9px] font-medium bg-indigo-950/80 text-indigo-300 rounded border border-indigo-700/50 truncate max-w-[130px]"
                  title={getUserAccountLabel(user)}
                >
                  {getUserAccountLabel(user)}
                </span>
              </div>
            </div>
          </button>
          <button
            onClick={() => {
              if (isMobile) onCloseMobile();
              logout();
            }}
            className="p-2 text-slate-500 hover:text-rose-400 hover:bg-slate-800 rounded-xl transition shrink-0 ml-2"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Profile Modal */}
      {profileOpen && (
        <ProfileModal
          user={user}
          onClose={() => setProfileOpen(false)}
        />
      )}
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar — Smooth sliding collapse */}
      <aside
        className={`hidden lg:flex flex-col bg-slate-950 border-r border-slate-800/80 fixed top-0 left-0 h-screen z-40 transition-all duration-300 ease-in-out ${
          isDesktopOpen ? 'w-64 translate-x-0' : 'w-64 -translate-x-full pointer-events-none'
        }`}
      >
        {renderContent(false)}
      </aside>

      {/* Mobile/Tablet Sidebar Overlay Drawer */}
      {isMobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <aside className="absolute left-0 top-0 h-full w-72 bg-slate-950 border-r border-slate-800/80 shadow-2xl">
            {renderContent(true)}
          </aside>
        </div>
      )}
    </>
  );
}

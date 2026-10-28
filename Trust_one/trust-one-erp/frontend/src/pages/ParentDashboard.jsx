import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import { Users, CalendarCheck, CreditCard, Award, Bell, ArrowUpRight, BookOpen, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ParentDashboard() {
  const { user } = useAuth();

  return (
    <PageContainer>
      {/* Parent Welcome Banner */}
      <div className="bg-gradient-to-r from-violet-900 via-purple-800 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-purple-500/30 border border-purple-400/30 px-3 py-1 rounded-full text-xs font-medium text-purple-200">
              <Users className="w-3.5 h-3.5" />
              <span>Parent / Guardian Portal</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome, {user?.full_name || 'Parent'}!
            </h1>
            <p className="text-sm text-purple-200/80">
              Monitor your child's academic performance, attendance, and campus activities.
            </p>
          </div>
        </div>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card title="Child's Attendance" icon={CalendarCheck}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">--</p>
              <p className="text-xs text-slate-500 mt-1">Overall attendance %</p>
            </div>
            <Link to="/attendance" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        <Card title="Fee Status" icon={CreditCard}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800">
                UP TO DATE
              </span>
              <p className="text-xs text-slate-500 mt-1">No pending dues</p>
            </div>
            <Link to="/fees" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        <Card title="Sessional Marks" icon={Award}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">--</p>
              <p className="text-xs text-slate-500 mt-1">Latest evaluation scores</p>
            </div>
            <Link to="/marks" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        <Card title="Messages" icon={MessageSquare}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">0</p>
              <p className="text-xs text-slate-500 mt-1">New teacher messages</p>
            </div>
            <Link to="/messages" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Quick Access Links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Parent Resources" icon={BookOpen}>
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                As a parent, you can view your child's attendance records, fee payment history,
                sessional marks, and communicate with teachers through the messaging system.
              </p>
              <p>
                Use the sidebar navigation to access detailed views for attendance analysis,
                fee information, and academic performance tracking.
              </p>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Quick Navigation" icon={Bell}>
            <div className="space-y-2 text-xs font-semibold">
              <Link to="/fees" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>View Fee Statements</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/marks" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>Check Sessional Marks</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/messages" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>Message a Teacher</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/timetable" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>View Class Timetable</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}


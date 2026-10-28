import React from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import { Building, Users, CalendarCheck, Bell, ArrowUpRight, ClipboardList, Moon, ShieldCheck, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function WardenDashboard() {
  const { user } = useAuth();

  return (
    <PageContainer>
      {/* Warden Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-teal-950 to-slate-900 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden border border-teal-900/50">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center space-x-2 bg-teal-500/30 border border-teal-400/30 px-3 py-1 rounded-full text-xs font-medium text-teal-200">
              <Building className="w-3.5 h-3.5" />
              <span>Hostel Warden Control Panel</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight">
              Welcome, {user?.full_name || 'Warden'}!
            </h1>
            <p className="text-sm text-teal-200/80">
              Manage hostel residences, room inventories, curfew enforcement, and student welfare.
            </p>
          </div>
          <div className="flex items-center space-x-4 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-teal-200 font-semibold">Total Residents</p>
              <p className="text-2xl font-black text-white">--</p>
            </div>
            <div className="w-px h-8 bg-white/20"></div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-teal-200 font-semibold">Occupancy</p>
              <p className="text-2xl font-black text-emerald-300">--%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card title="Roll Call Attendance" icon={CalendarCheck}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">--</p>
              <p className="text-xs text-slate-500 mt-1">Residents present today</p>
            </div>
          </div>
        </Card>

        <Card title="Pending Gate Passes" icon={ClipboardList}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">0</p>
              <p className="text-xs text-slate-500 mt-1">Leave requests to review</p>
            </div>
          </div>
        </Card>

        <Card title="Night Curfew Status" icon={Moon}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className="inline-block px-2.5 py-0.5 text-xs font-bold rounded-md bg-emerald-100 text-emerald-800">
                ALL CLEAR
              </span>
              <p className="text-xs text-slate-500 mt-1">No curfew violations</p>
            </div>
          </div>
        </Card>

        <Card title="Complaints & Issues" icon={MessageSquare}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">0</p>
              <p className="text-xs text-slate-500 mt-1">Open maintenance tickets</p>
            </div>
            <Link to="/messages" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>
      </div>

      {/* Management Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card title="Hostel Operations" icon={ShieldCheck}>
            <div className="space-y-3 text-xs text-slate-600">
              <p>
                As the Hostel Warden, you oversee all residential operations including room
                allocations, mess clearances, gate passes, night curfew enforcement, and
                student welfare within the campus hostels.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Room Allocations</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Floor-wise hostel block and bed assignments</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Mess Management</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Daily mess attendance and meal counters</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Night Security</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Curfew violations and security logs</p>
                </div>
                <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <p className="font-bold text-slate-800">Maintenance</p>
                  <p className="text-[11px] text-slate-500 mt-0.5">Room repair requests and inventory</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
        <div>
          <Card title="Quick Actions" icon={Bell}>
            <div className="space-y-2 text-xs font-semibold">
              <Link to="/messages" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition">
                <span>View Hostel Messages</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/forum" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition">
                <span>Hostel Discussion Board</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/timetable" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-teal-50 hover:text-teal-600 rounded-xl transition">
                <span>Campus Timetable</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}


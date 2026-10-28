import React, { useEffect, useState } from 'react';
import PageContainer from '../components/layout/PageContainer';
import Card from '../components/common/Card';
import LoadingSpinner from '../components/common/LoadingSpinner';
import { getDashboardSummary } from '../services/erpService';
import {
  User, CalendarCheck, CreditCard, Award, Bell,
  MessageSquare, ArrowUpRight, Megaphone, Phone, Mail,
  Users, Home, GraduationCap, Building2, Sparkles, CheckCircle2,
  Tag, ShieldCheck, BookOpen, Download, ExternalLink, FileText,
  Calendar, CheckCircle, AlertCircle, X, ChevronRight, FileCheck,
  Compass, ShieldAlert, Sparkle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Modals for Rule Book and Scholarship details
  const [activeModal, setActiveModal] = useState(null); // 'rulebook' | 'scholarship' | null

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res = await getDashboardSummary();
      setData(res);
    } catch (err) {
      setError('Failed to fetch dashboard metrics.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <PageContainer><LoadingSpinner message="Loading student dashboard..." /></PageContainer>;

  if (error || !data) {
    return (
      <PageContainer>
        <div className="p-6 bg-rose-50 border border-rose-200 text-rose-700 rounded-2xl flex flex-col items-start space-y-3">
          <p className="font-bold">{error || 'Unable to load student metrics.'}</p>
          <button
            onClick={fetchDashboard}
            className="px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold transition"
          >
            Retry Loading
          </button>
        </div>
      </PageContainer>
    );
  }

  const {
    student,
    overall_attendance_percentage,
    academic_percentage = 82.5,
    total_classes = 120,
    present_classes = 106,
    fee_status = 'PAID',
    fee_due_amount = 0.0,
    total_fee = 93500.0,
    fees_paid = 84150.0,
    fee_concession_amount = 9350.0,
    balance_amount = 0.0,
    recent_notices = []
  } = data;

  const yearOfStudy = Math.max(1, Math.ceil((student.current_semester || 1) / 2));

  return (
    <PageContainer>
      {/* 1. STUDENT PROFILE HEADER (Identity, Institution, Academic Year, Residence) */}
      <div className="bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-slate-800">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3">
            {/* Institution Badge + USN/ID Badge */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-indigo-500/25 border border-indigo-400/30 rounded-full text-xs font-bold text-indigo-200">
                <Building2 className="w-3.5 h-3.5" />
                <span>{student.institution || 'Trust One Institute of Technology'}</span>
              </span>
              <span className="inline-flex items-center space-x-1 px-3 py-1 bg-cyan-500/20 border border-cyan-400/30 rounded-full text-xs font-bold text-cyan-200">
                <GraduationCap className="w-3.5 h-3.5" />
                <span>USN / Student ID: {student.usn || student.enrollment_number}</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800 text-slate-300 border border-slate-700">
                Gender: {student.gender || 'Male'}
              </span>
            </div>

            {/* Student Name */}
            <div>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {student.full_name}
              </h1>
              <p className="text-xs sm:text-sm text-indigo-200/80 mt-1 font-medium">
                {student.branch} &bull; Year {yearOfStudy} (Semester {student.current_semester}) &bull; Section {student.section} &bull; {student.block}
              </p>
            </div>

            {/* Residence Type & Academic Term Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg font-semibold">
                <Home className="w-3.5 h-3.5" />
                <span>Residence: {student.residence_type || 'Hosteller'}</span>
              </span>
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 bg-purple-500/20 text-purple-300 border border-purple-500/30 rounded-lg font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Admission Year: {student.admission_year}</span>
              </span>
            </div>
          </div>

          {/* Header Metric Gauges */}
          <div className="flex items-center space-x-3 sm:space-x-4 bg-white/5 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/10 shrink-0">
            <div className="text-center px-2">
              <p className="text-[10px] uppercase tracking-wider text-indigo-300 font-bold">Academic Performance</p>
              <p className="text-2xl font-black text-white">{academic_percentage}%</p>
              <p className="text-[10px] text-indigo-200/70">CGPA: {student.cgpa} / 10</p>
            </div>
            <div className="w-px h-10 bg-white/15"></div>
            <div className="text-center px-2">
              <p className="text-[10px] uppercase tracking-wider text-cyan-300 font-bold">Attendance</p>
              <p className="text-2xl font-black text-cyan-200">{overall_attendance_percentage}%</p>
              <p className="text-[10px] text-cyan-200/70">{present_classes} / {total_classes} classes</p>
            </div>
          </div>
        </div>
      </div>

      {/* 2. FOUR HIGH-LEVEL SUMMARY KPI CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Attendance Card */}
        <Card title="Attendance" icon={CalendarCheck}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{overall_attendance_percentage}%</p>
              <p className="text-xs text-slate-500 mt-0.5">{present_classes} of {total_classes} attended</p>
            </div>
            <Link to="/attendance" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition" title="View Subject Breakdown">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        {/* Academic Percentage Card */}
        <Card title="Academic Percentage" icon={Award}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-slate-900">{academic_percentage}%</p>
              <p className="text-xs text-slate-500 mt-0.5">CGPA {student.cgpa} &bull; {student.backlogs} Backlogs</p>
            </div>
            <Link to="/marks" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition" title="View Sessional Marks">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        {/* Fee Status & Balance Card */}
        <Card title="Fee Status & Balance" icon={CreditCard}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <span className={`inline-block px-2 py-0.5 text-xs font-bold rounded-md ${
                fee_status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
              }`}>
                {fee_status}
              </span>
              <p className="text-xs text-slate-500 mt-1 font-semibold">
                Balance: ₹ {balance_amount.toLocaleString()}
              </p>
            </div>
            <Link to="/fees" className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-xl transition" title="View Fee Portal">
              <ArrowUpRight className="w-5 h-5" />
            </Link>
          </div>
        </Card>

        {/* Concession Award Card */}
        <Card title="Fee Concession Award" icon={Tag}>
          <div className="flex items-end justify-between mt-2">
            <div>
              <p className="text-2xl font-extrabold text-indigo-600">{student.fee_concession_percent || 10}%</p>
              <p className="text-xs text-slate-500 mt-0.5">
                Saved: ₹ {(fee_concession_amount || 0).toLocaleString()}
              </p>
            </div>
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-xl">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </Card>
      </div>

      {/* 3. TWO DEDICATED SECTIONS: FINANCIAL STRUCTURE & FAMILY/COMMUNICATION */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION A: DETAILED FEE STRUCTURE & BALANCE */}
        <Card title="Fee Structure & Ledger Summary" icon={CreditCard}>
          <div className="space-y-4 pt-1">
            <p className="text-xs text-slate-500">
              Verified institutional fee heads, approved concession subsidies, and current settlement status for academic year {student.admission_year}-{student.admission_year + 4}.
            </p>

            {/* Structured Table */}
            <div className="border border-slate-200/80 rounded-2xl overflow-hidden text-xs">
              <div className="divide-y divide-slate-100">
                <div className="flex items-center justify-between p-3 bg-slate-50/60 font-medium text-slate-700">
                  <span>Tuition Fees</span>
                  <span className="font-bold text-slate-900">₹ {(student.tuition_fee || 65000).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 font-medium text-slate-700">
                  <span>Exam Fees</span>
                  <span className="font-bold text-slate-900">₹ {(student.exam_fee || 3500).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50/60 font-medium text-slate-700">
                  <div className="flex items-center space-x-1.5">
                    <span>Hostel Fees</span>
                    <span className="text-[10px] text-slate-500">({student.residence_type || 'Hosteller'})</span>
                  </div>
                  <span className="font-bold text-slate-900">₹ {(student.hostel_fee || 0).toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-100/70 font-bold text-slate-800">
                  <span>Gross Total Fees</span>
                  <span className="font-black text-slate-900">₹ {total_fee.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-indigo-50/50 text-indigo-700 font-bold">
                  <span>Fee Concession ({student.fee_concession_percent || 10}%)</span>
                  <span>- ₹ {fee_concession_amount.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-slate-50 font-bold text-slate-900">
                  <span>Fees Paid to Date</span>
                  <span className="text-emerald-600 font-black">₹ {fees_paid.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3.5 bg-slate-900 text-white font-extrabold rounded-b-2xl">
                  <span>Remaining Fee Balance</span>
                  <span className="text-amber-300 text-sm font-black">₹ {balance_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <div className="flex items-center space-x-2">
                <span className="text-slate-500">Current Status:</span>
                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[11px] ${
                  fee_status === 'PAID' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {fee_status}
                </span>
              </div>
              <Link to="/fees" className="text-indigo-600 hover:text-indigo-700 font-bold inline-flex items-center space-x-1">
                <span>View Payment Receipts</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </Card>

        {/* SECTION B: STUDENT, FAMILY & COMMUNICATION DIRECTORY */}
        <Card title="Student, Family & Contact Directory" icon={Users}>
          <div className="space-y-4 pt-1">
            <p className="text-xs text-slate-500">
              Official institutional record of student identity, parent/guardian details, residential room allocation, and authorized contact channels.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {/* Father Name */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Father's Name</p>
                <p className="font-bold text-slate-800">{student.father_name || 'Dr. Robert Johnson'}</p>
              </div>

              {/* Mother Name */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Mother's Name</p>
                <p className="font-bold text-slate-800">{student.mother_name || 'Mary Johnson'}</p>
              </div>

              {/* Parent Phone */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Parent Contact Number</p>
                <p className="font-bold text-indigo-700 flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-indigo-500" />
                  <span>{student.parent_phone || '+91 98765 11223'}</span>
                </p>
              </div>

              {/* Student Phone */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Student Contact Number</p>
                <p className="font-bold text-slate-800 flex items-center space-x-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{student.phone || '+91 98765 43210'}</span>
                </p>
              </div>

              {/* Student Email */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5 sm:col-span-2">
                <p className="text-[10px] uppercase font-bold text-slate-400">Student Email ID</p>
                <p className="font-bold text-slate-800 flex items-center space-x-1.5 truncate">
                  <Mail className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                  <span className="truncate">{student.email}</span>
                </p>
              </div>

              {/* Residence Type & Block */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Residence Type</p>
                <p className="font-bold text-slate-800">{student.residence_type || 'Hosteller'}</p>
              </div>

              {/* Block & Section */}
              <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-slate-400">Block & Section</p>
                <p className="font-bold text-slate-800">{student.block || 'Block B'} &bull; Sec {student.section}</p>
              </div>
            </div>

            <div className="p-3 bg-indigo-50/60 border border-indigo-100 rounded-xl flex items-center justify-between text-xs text-indigo-900">
              <span>Campus: <strong>{student.institution || 'Trust One Institute of Technology'}</strong></span>
              <span className="text-[10px] font-bold text-indigo-600 bg-white px-2 py-0.5 rounded border border-indigo-200">
                Verified Record
              </span>
            </div>
          </div>
        </Card>
      </div>

      {/* 4. TWO DEDICATED SECTIONS: UNIVERSITY RULE BOOK & SCHOLARSHIPS (STUDENT DASHBOARD ONLY) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* SECTION 1: UNIVERSITY RULE BOOK */}
        <Card
          title="University Rule Book"
          subtitle="Academic Year 2026–27 &bull; Edition 1.0"
          icon={BookOpen}
          action={
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-indigo-100 text-indigo-800 border border-indigo-200">
              Official Regulations
            </span>
          }
        >
          <div className="space-y-4 pt-1">
            <p className="text-xs text-slate-500 leading-relaxed">
              Official Academic, Administrative, and Disciplinary Regulations governing admissions, attendance norms, evaluation systems, campus code of conduct, and student rights across the trust.
            </p>

            {/* Quick Key Regulatory Highlights */}
            <div className="grid grid-cols-2 gap-2.5 text-[11px]">
              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Attendance Norm</span>
                <p className="font-bold text-slate-800">Min. 75% Mandatory</p>
                <p className="text-[10px] text-slate-500">Max 10% medical condonation</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Evaluation Split</span>
                <p className="font-bold text-slate-800">40% CIA + 60% ESE</p>
                <p className="text-[10px] text-slate-500">Passing: 40% aggregate</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Grading Formula</span>
                <p className="font-bold text-slate-800">% = CGPA &times; 9.5</p>
                <p className="text-[10px] text-slate-500">10-Point Letter Scale (O to F)</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-0.5">
                <span className="text-[10px] uppercase font-bold text-slate-400">Anti-Ragging</span>
                <p className="font-bold text-rose-700">Zero Tolerance</p>
                <p className="text-[10px] text-slate-500">UGC & AICTE Act compliant</p>
              </div>
            </div>

            {/* Chapter Highlights pill */}
            <div className="p-3 bg-indigo-50/70 border border-indigo-100 rounded-xl flex items-center justify-between text-xs">
              <div className="space-y-0.5">
                <p className="font-bold text-indigo-900">15 Comprehensive Chapters &amp; 4 Annexures</p>
                <p className="text-[11px] text-indigo-700">Includes Academic Integrity, Grievance Redressal, and Fee Policies</p>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal('rulebook')}
                className="px-2.5 py-1 bg-white hover:bg-indigo-100 text-indigo-700 rounded-lg font-bold text-xs border border-indigo-200 transition shrink-0"
              >
                View TOC
              </button>
            </div>

            {/* Download and Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <a
                  href="/documents/University_Rule_Book_2026_27.pdf"
                  download="University_Rule_Book_2026_27.pdf"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                  <span className="opacity-75 text-[10px] font-normal pl-0.5">(50 KB)</span>
                </a>

                <a
                  href="/documents/University_Rule_Book_2026_27.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                  title="Open PDF in new browser tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('rulebook')}
                className="text-indigo-600 hover:text-indigo-700 font-bold text-xs inline-flex items-center space-x-1"
              >
                <span>Full Summary</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Card>

        {/* SECTION 2: SCHOLARSHIPS & FINANCIAL AID */}
        <Card
          title="Scholarships & Financial Aid"
          subtitle="Trust &amp; University Merit Schemes"
          icon={Award}
          action={
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800 border border-emerald-200">
              Scheme Notification
            </span>
          }
        >
          <div className="space-y-4 pt-1">
            <p className="text-xs text-slate-500 leading-relaxed">
              Official scholarship notification for academic year 2026–27 fostering technological innovation, research prototypes, and academic brilliance across all 6 institutions.
            </p>

            {/* Featured Scholarship Scheme Card */}
            <div className="p-3 bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50/40 border border-emerald-200/80 rounded-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-wide text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded">
                  Scheme Code: UNI-AIS-2026
                </span>
                <span className="text-[10px] font-bold text-slate-500">AY 2026–27</span>
              </div>
              <h4 className="font-extrabold text-slate-900 text-xs">
                Aryabhata Innovation Scholarship Scheme
              </h4>
              <p className="text-[11px] text-slate-600 leading-snug">
                Awarded to undergraduate and postgraduate students demonstrating outstanding technical innovation, research prototypes, or hackathon excellence.
              </p>
            </div>

            {/* Award Categories */}
            <div className="grid grid-cols-2 gap-2.5 text-[11px]">
              <div className="p-2.5 bg-amber-50/70 border border-amber-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-amber-800">Gold Award</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.2 rounded">10 Awards</span>
                </div>
                <p className="font-extrabold text-slate-900">₹ 60,000 Waiver</p>
                <p className="text-[10px] text-amber-800">+ ₹ 25,000 Project Seed Grant</p>
              </div>

              <div className="p-2.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-slate-600">Silver Award</span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-200/80 px-1.5 py-0.2 rounded">20 Awards</span>
                </div>
                <p className="font-extrabold text-slate-900">₹ 40,000 Waiver</p>
                <p className="text-[10px] text-slate-600">+ ₹ 10,000 Project Grant</p>
              </div>
            </div>

            {/* Eligibility Quick Row */}
            <div className="flex items-center justify-between text-[11px] px-2 py-1.5 bg-slate-50 rounded-lg text-slate-600 border border-slate-100">
              <span>Eligibility: <strong>CGPA &ge; 7.50</strong> &bull; <strong>Attendance &ge; 75%</strong></span>
              <span className="text-emerald-700 font-bold">Apply by Sep 30, 2026</span>
            </div>

            {/* Download and Action Buttons */}
            <div className="pt-1 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100">
              <div className="flex items-center space-x-2">
                <a
                  href="/documents/Aryabhata_Innovation_Scholarship_2026_27.pdf"
                  download="Aryabhata_Innovation_Scholarship_2026_27.pdf"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scheme PDF</span>
                  <span className="opacity-75 text-[10px] font-normal pl-0.5">(7.1 KB)</span>
                </a>

                <a
                  href="/documents/Aryabhata_Innovation_Scholarship_2026_27.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1 px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
                  title="Open Scheme PDF in new tab"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open</span>
                </a>
              </div>

              <button
                type="button"
                onClick={() => setActiveModal('scholarship')}
                className="text-emerald-700 hover:text-emerald-800 font-bold text-xs inline-flex items-center space-x-1"
              >
                <span>Selection Guidelines</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </Card>

      </div>

      {/* 5. NOTICES & QUICK SHORTCUTS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card title="Official Trust & Campus Notices" icon={Megaphone}>
            <div className="space-y-3">
              {recent_notices?.map((n) => (
                <div key={n.id} className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-xl space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{n.title}</span>
                    <span className="px-2 py-0.5 bg-indigo-100 text-indigo-800 rounded font-bold text-[10px]">
                      {n.category}
                    </span>
                  </div>
                  <p className="text-slate-600">{n.content}</p>
                  <p className="text-[10px] text-slate-400 font-mono">Posted by {n.posted_by} &bull; {n.posted_date}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <div>
          <Card title="Quick Portal Shortcuts" icon={Bell}>
            <div className="space-y-2 text-xs font-semibold">
              <Link to="/attendance" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>Subject Attendance Breakdown</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/fees" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>View Dues &amp; Fee Receipts</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/marks" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>Continuous Evaluation (CIE)</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
              <Link to="/timetable" className="flex items-center justify-between p-3 bg-slate-50 hover:bg-indigo-50 hover:text-indigo-600 rounded-xl transition">
                <span>Weekly Lecture Timetable</span>
                <ArrowUpRight className="w-4 h-4 text-slate-400" />
              </Link>
            </div>
          </Card>
        </div>
      </div>

      {/* ================= MODAL 1: UNIVERSITY RULE BOOK ================= */}
      {activeModal === 'rulebook' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950 text-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-indigo-500/20 text-indigo-300 rounded-xl border border-indigo-400/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg">University Rule Book 2026–27</h3>
                  <p className="text-xs text-indigo-200/80">Edition 1.0 &bull; Office of the Registrar &bull; 23 Pages</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
              <div className="p-3.5 bg-indigo-50 border border-indigo-100 rounded-2xl text-indigo-900 space-y-1">
                <p className="font-bold text-xs">Official Statutory Regulation Notification</p>
                <p className="text-[11px] text-indigo-700 leading-relaxed">
                  These Academic, Administrative, and Disciplinary Regulations apply uniformly to all admitted students across the Engineering, Polytechnic, School, Pre-University, MCA, and Medical campuses under the Educational Trust.
                </p>
              </div>

              {/* Table of Chapters */}
              <div>
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider mb-2">
                  Table of Contents (15 Chapters &amp; 4 Annexures)
                </h4>
                <div className="space-y-1.5">
                  {[
                    { ch: 'Chapter 1', title: 'Preliminary & Definitions', desc: 'Short title, commencement, application to all 6 constituent colleges, statutory definitions.' },
                    { ch: 'Chapter 2', title: 'Admission & Enrolment', desc: 'Eligibility, certificate verification, lateral entry, change of branch, and cancellation rules.' },
                    { ch: 'Chapter 3', title: 'Academic Program & Credit System', desc: 'Choice Based Credit System (CBCS), course structures, curriculum revision, and continuous evaluation.' },
                    { ch: 'Chapter 4', title: 'Attendance & Leave Regulations', desc: 'Mandatory 75% minimum attendance, 10% condonation permissible on approved medical/sports grounds, medical leave procedures.' },
                    { ch: 'Chapter 5', title: 'Examinations & Evaluation', desc: '40% Continuous Internal Assessment (CIA) + 60% End Semester Examination (ESE), hall ticket criteria, supplementary exams.' },
                    { ch: 'Chapter 6', title: 'Grading System & Award of Degree', desc: '10-point scale (O, A+, A, B+, B, C, P, F). SGPA/CGPA computation; Equivalence: Percentage = CGPA × 9.5.' },
                    { ch: 'Chapter 7', title: 'Fees, Dues & Financial Regulations', desc: 'Tuition schedule, late fee fines, refund policy upon withdrawal, fee concessions, and institutional dues clearance.' },
                    { ch: 'Chapter 8', title: 'Student Conduct & Discipline', desc: 'Campus code of conduct, dress code, prohibited items, IT & network acceptable use policy, and disciplinary procedures.' },
                    { ch: 'Chapter 9', title: 'Anti-Ragging Regulations', desc: 'Zero-tolerance policy under UGC/AICTE regulations, mandatory anti-ragging undertaking, Proctorial Board, and emergency helpline.' },
                    { ch: 'Chapter 10', title: 'Academic Integrity & Anti-Plagiarism', desc: 'Turnitin similarity standards, code of ethics for dissertations, intellectual property, and penalty matrix.' },
                    { ch: 'Chapter 11', title: 'Student Grievance Redressal', desc: 'Procedure for academic & administrative grievances, Internal Complaints Committee (ICC), and appeal mechanisms.' },
                    { ch: 'Chapter 12', title: 'Campus Facilities & Services', desc: 'Central Library rules, computer laboratories, hostel code of conduct, student mess, and bus transport.' },
                    { ch: 'Chapter 13', title: 'Scholarships, Awards & Fee Concessions', desc: 'Merit-cum-means scholarships, Aryabhata Innovation awards, fee concession application workflow.' },
                    { ch: 'Chapter 14', title: 'Graduation Requirements & Convocation', desc: 'Degree conferment eligibility, rank determination, provisional certificates, and migration procedures.' },
                    { ch: 'Chapter 15', title: 'Miscellaneous & Amendments', desc: 'Power to relax regulations, interpretations by Academic Council, and transitional savings clauses.' },
                  ].map((item, i) => (
                    <div key={i} className="p-2.5 bg-slate-50 border border-slate-200/70 rounded-xl flex items-start space-x-3">
                      <span className="font-extrabold text-indigo-700 bg-indigo-100/70 px-2 py-0.5 rounded text-[10px] shrink-0">
                        {item.ch}
                      </span>
                      <div className="space-y-0.5">
                        <p className="font-bold text-slate-800 text-xs">{item.title}</p>
                        <p className="text-[11px] text-slate-500 leading-normal">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <a
                href="/documents/University_Rule_Book_2026_27.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-indigo-600 inline-flex items-center space-x-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Web Viewer</span>
              </a>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Close
                </button>
                <a
                  href="/documents/University_Rule_Book_2026_27.pdf"
                  download="University_Rule_Book_2026_27.pdf"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Full PDF (50 KB)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= MODAL 2: SCHOLARSHIP SCHEME NOTIFICATION ================= */}
      {activeModal === 'scholarship' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[88vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-emerald-900 to-teal-950 text-white">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-emerald-500/20 text-emerald-300 rounded-xl border border-emerald-400/30">
                  <Award className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-black text-base sm:text-lg">Aryabhata Innovation Scholarship Scheme</h3>
                  <p className="text-xs text-emerald-200/80">Scheme Code: UNI-AIS-2026 &bull; Academic Year 2026–27</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs text-slate-600">
              <div className="p-3.5 bg-emerald-50 border border-emerald-200/70 rounded-2xl text-emerald-950 space-y-1">
                <p className="font-bold text-xs">Official Innovation Scheme Notification</p>
                <p className="text-[11px] text-emerald-800 leading-relaxed">
                  Established under the Trust Innovation &amp; Research Directorate to provide financial grants, full tuition fee subsidies, and prototyping incubation to promising student innovators and researchers.
                </p>
              </div>

              {/* Award Categories Detailed */}
              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Award Tiers &amp; Financial Benefits
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-3.5 bg-amber-50/60 border border-amber-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-amber-900 text-xs">Category A: Gold Award</span>
                      <span className="text-[10px] font-bold text-amber-800 bg-amber-200/60 px-2 py-0.5 rounded-full">
                        Up to 10 Scholars
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-amber-950">
                      <li>&bull; <strong>₹ 60,000</strong> Tuition Fee Waiver for AY 2026–27</li>
                      <li>&bull; <strong>₹ 25,000</strong> Project Seed &amp; Prototyping Grant</li>
                      <li>&bull; Direct incubation access at Central Campus FabLab</li>
                      <li>&bull; University Innovation Laureate Certificate</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-black text-slate-800 text-xs">Category B: Silver Award</span>
                      <span className="text-[10px] font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                        Up to 20 Scholars
                      </span>
                    </div>
                    <ul className="space-y-1 text-[11px] text-slate-700">
                      <li>&bull; <strong>₹ 40,000</strong> Tuition Fee Waiver for AY 2026–27</li>
                      <li>&bull; <strong>₹ 10,000</strong> Project Seed Grant</li>
                      <li>&bull; Priority mentorship from Industry Innovation Panel</li>
                      <li>&bull; Innovation Merit Certificate of Excellence</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Eligibility Criteria */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Eligibility Criteria &amp; Rules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Academic Standing:</strong> Cumulative CGPA of <strong>7.50</strong> or higher without any active backlogs.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Attendance:</strong> Minimum <strong>75%</strong> overall attendance in all previous semesters.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Innovation Proof:</strong> Working hardware/software prototype, patent filed, research paper, or national hackathon win.</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Enrolment:</strong> Currently enrolled in 2nd, 3rd, or 4th year across any of the 6 trust institutions.</span>
                  </div>
                </div>
              </div>

              {/* Key Timeline */}
              <div className="p-3.5 bg-slate-50 border border-slate-200/80 rounded-2xl space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Important Dates (AY 2026–27)
                </h4>
                <div className="grid grid-cols-3 gap-2 text-center text-[11px]">
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Application Due</p>
                    <p className="font-bold text-slate-900">Sep 30, 2026</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Committee Interview</p>
                    <p className="font-bold text-slate-900">Oct 15–25, 2026</p>
                  </div>
                  <div className="p-2 bg-white rounded-xl border border-slate-200">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Award &amp; Disbursal</p>
                    <p className="font-bold text-emerald-700">Nov 10, 2026</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 sm:p-5 border-t border-slate-100 bg-slate-50 flex items-center justify-between">
              <a
                href="/documents/Aryabhata_Innovation_Scholarship_2026_27.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-semibold text-slate-600 hover:text-emerald-700 inline-flex items-center space-x-1"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Open in Web Viewer</span>
              </a>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setActiveModal(null)}
                  className="px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-200 rounded-xl transition"
                >
                  Close
                </button>
                <a
                  href="/documents/Aryabhata_Innovation_Scholarship_2026_27.pdf"
                  download="Aryabhata_Innovation_Scholarship_2026_27.pdf"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Scheme PDF (7.1 KB)</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

    </PageContainer>
  );
}

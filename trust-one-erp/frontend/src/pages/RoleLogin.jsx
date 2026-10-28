import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import CaptchaWidget from '../components/common/CaptchaWidget';
import { INSTITUTES, ROLE_KEYS } from '../utils/institutesData';
import {
  Lock,
  AlertCircle,
  Sparkles,
  UserPlus,
  ArrowLeft,
  Eye,
  EyeOff,
  Globe,
  GraduationCap,
  KeyRound
} from 'lucide-react';

export default function RoleLogin() {
  const { instituteId } = useParams();
  const navigate = useNavigate();
  const { login, loading, error, setError } = useAuth();

  // Find institute from id, fallback if 'degree-college' was requested
  const institute = INSTITUTES.find(
    (i) => i.id === instituteId || (instituteId === 'degree-college' && i.id === 'mca-college')
  );

  const [activeRole, setActiveRole] = useState('student');
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaId, setCaptchaId] = useState('');
  const [captchaSolution, setCaptchaSolution] = useState('');
  
  // USN option (ONLY for Student login)
  const [studentIdMode, setStudentIdMode] = useState('USN'); // 'USN' | 'ROLL'

  // Language state (English / Kannada)
  const [lang, setLang] = useState('en'); // 'en' | 'kn'

  if (!institute) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6">
        <div className="text-center space-y-4">
          <p className="text-rose-400 font-bold">Campus / Institute record not found.</p>
          <button
            onClick={() => navigate('/login')}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
          >
            Go Back to Trust One Institutions
          </button>
        </div>
      </div>
    );
  }

  const theme = institute.theme;
  const roleConfig = institute.roles[activeRole];
  const roleObj = ROLE_KEYS.find((r) => r.key === activeRole);
  const InstIcon = institute.icon;

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(
        identifier,
        password,
        captchaId,
        captchaSolution,
        activeRole === 'teacher' ? 'Professor' : null
      );
      if (user.role === 'ADMIN') {
        navigate('/admin/dashboard');
      } else if (user.role === 'FACULTY') {
        navigate('/faculty/dashboard');
      } else if (user.role === 'PARENT') {
        navigate('/parent/dashboard');
      } else if (user.role === 'WARDEN') {
        navigate('/warden/dashboard');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      // Error handled by AuthContext
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col lg:flex-row font-sans">
      {/* LEFT PANEL — Trust One & Campus Identity */}
      <div className={`lg:w-5/12 relative bg-gradient-to-br ${theme.gradient} p-6 sm:p-8 lg:p-10 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800/80`}>
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-32 -right-32 w-80 h-80 bg-${theme.accent}-600/5 rounded-full blur-3xl`} />
          <div className={`absolute -bottom-32 -left-32 w-80 h-80 bg-${theme.accent}-600/3 rounded-full blur-3xl`} />
        </div>

        <div className="relative z-10 space-y-6">
          {/* Top Bar: Back button + Language selector */}
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate('/login')}
              className="inline-flex items-center space-x-1.5 text-xs text-slate-400 hover:text-white transition group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>{lang === 'kn' ? 'ಎಲ್ಲಾ ಕ್ಯಾಂಪಸ್‌ಗಳು' : 'All Campuses'}</span>
            </button>

            {/* Bilingual Language Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
              className="flex items-center space-x-1.5 px-2.5 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-700/80 rounded-lg text-[11px] font-semibold text-slate-300 transition"
              title="Toggle English / ಕನ್ನಡ"
            >
              <Globe className="w-3 h-3 text-cyan-400" />
              <span>{lang === 'en' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
            </button>
          </div>

          {/* Trust One Wordmark & Tagline */}
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black tracking-widest uppercase px-2 py-0.5 bg-indigo-500/20 text-indigo-300 rounded border border-indigo-400/30">
                TRUST ONE
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {lang === 'kn' ? 'ಒಂದು ಟ್ರಸ್ಟ್. ಪ್ರತಿಯೊಂದು ಕ್ಯಾಂಪಸ್. ಸಂಪರ್ಕಿತ.' : 'One Trust. Every Campus. Connected.'}
              </span>
            </div>
          </div>

          {/* Institute details */}
          <div className="space-y-4">
            <div className={`w-14 h-14 rounded-2xl ${theme.badgeBg} flex items-center justify-center shadow-lg`}>
              <InstIcon className="w-7 h-7" />
            </div>
            <div>
              <div className={`inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${theme.badgeBg} mb-2`}>
                <span>{institute.code} • {institute.type}</span>
              </div>
              <h1 className="text-2xl lg:text-3xl font-extrabold text-white leading-tight">
                {institute.name}
              </h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed max-w-md">
                {institute.description}
              </p>
            </div>
          </div>

          {/* Affiliation badge */}
          <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800/80">
            <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wider mb-1">
              {lang === 'kn' ? 'ಮಾನ್ಯತೆ ಮತ್ತು ಸಂಬಂಧ' : 'Affiliation & Governance'}
            </p>
            <p className="text-xs text-slate-300 font-bold">{institute.affiliation}</p>
          </div>

          {/* Active Role Description */}
          <div className={`p-4 rounded-xl bg-slate-900/50 border ${theme.border}`}>
            <div className="flex items-center space-x-2 mb-2">
              {roleObj && <roleObj.icon className={`w-4 h-4 text-${theme.accent}-400`} />}
              <p className="text-xs font-bold text-white">{roleConfig.title}</p>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {roleConfig.description}
            </p>
          </div>
        </div>

        {/* Footer stats */}
        <div className="relative z-10 mt-6 hidden lg:block">
          <p className="text-[10px] text-slate-500 font-semibold">
            {theme.stats}
          </p>
        </div>
      </div>

      {/* RIGHT PANEL — Role Selection + Login Form */}
      <div className="lg:w-7/12 flex flex-col justify-center px-5 sm:px-8 lg:px-12 py-8 lg:py-10 overflow-y-auto">
        <div className="w-full max-w-md mx-auto space-y-6">
          {/* Title */}
          <div>
            <h2 className="text-xl font-extrabold text-white">
              {lang === 'kn' ? `${institute.shortName} ಗೆ ಲಾಗಿನ್ ಆಗಿ` : `Sign In to ${institute.shortName}`}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              {lang === 'kn' 
                ? 'ನಿಮ್ಮ ಪಾತ್ರವನ್ನು ಆಯ್ಕೆಮಾಡಿ ಮತ್ತು ಲಾಗಿನ್ ವಿವರಗಳನ್ನು ನಮೂದಿಸಿ.'
                : 'Select your role and authenticate with your verified credentials.'}
            </p>
          </div>

          {/* ROLE PICKER — 5 role tabs (Student, Parent, Teacher, Admin, Hostel Warden) */}
          <div className="grid grid-cols-5 gap-1.5 p-1.5 bg-slate-950/80 border border-slate-800 rounded-2xl">
            {ROLE_KEYS.map((r) => {
              const RIcon = r.icon;
              const isActive = activeRole === r.key;
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => {
                    setActiveRole(r.key);
                    setIdentifier('');
                    setPassword('');
                    setError(null);
                  }}
                  className={`flex flex-col items-center justify-center py-2 px-1 rounded-xl transition text-center space-y-1 ${
                    isActive
                      ? theme.activeTab
                      : 'text-slate-500 hover:text-slate-300 hover:bg-slate-900/60'
                  }`}
                  title={r.label}
                >
                  <RIcon className="w-4 h-4 shrink-0" />
                  <span className="text-[9px] font-bold leading-tight">{r.label}</span>
                </button>
              );
            })}
          </div>

          {/* Error message */}
          {error && (
            <div className="p-3 bg-rose-950/60 border border-rose-800/80 rounded-xl text-rose-300 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
              <span>{error}</span>
            </div>
          )}

          {/* LOGIN FORM */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* SPECIAL USN OPTION — ONLY AND ONLY IN STUDENTS LOGIN PAGE */}
            {activeRole === 'student' ? (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-300">
                    Student Identification Mode:
                  </label>
                  {/* USN vs Roll No Toggle — strictly in student tab */}
                  <div className="inline-flex rounded-lg bg-slate-900 border border-slate-800 p-0.5 text-[10px]">
                    <button
                      type="button"
                      onClick={() => {
                        setStudentIdMode('USN');
                        setIdentifier('');
                      }}
                      className={`px-2.5 py-1 rounded font-bold transition ${
                        studentIdMode === 'USN'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      USN
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setStudentIdMode('ROLL');
                        setIdentifier('');
                      }}
                      className={`px-2.5 py-1 rounded font-bold transition ${
                        studentIdMode === 'ROLL'
                          ? 'bg-indigo-600 text-white shadow'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Roll No / ID
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <GraduationCap className="w-4 h-4 text-indigo-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={
                      studentIdMode === 'USN'
                        ? 'Enter University Seat Number (e.g. 1UT22CS045, 1UT22ME001)'
                        : 'Enter Campus Roll Number / Admission No. (e.g. 2022CSE0101)'
                    }
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none ${theme.ring} transition`}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500">
                  <span>
                    {studentIdMode === 'USN'
                      ? '✓ Authentic University Seat Number (USN) verified authentication'
                      : '✓ Campus admission / institutional roll number'}
                  </span>
                  <span className="font-mono text-indigo-400/80">
                    {studentIdMode === 'USN' ? 'USN format: 1UTXXYYZZZ' : 'Format: Roll / Reg'}
                  </span>
                </div>
              </div>
            ) : (
              /* NON-STUDENT ROLES (Parent, Teacher, Admin, Hostel Warden) — NO USN OPTION */
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  {roleConfig.idLabel}
                </label>
                <div className="relative">
                  {roleObj && <roleObj.icon className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />}
                  <input
                    type="text"
                    required
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={roleConfig.placeholder}
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none ${theme.ring} transition`}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {lang === 'kn' ? 'ಪಾಸ್‌ವರ್ಡ್' : 'Password'}
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ಪಾಸ್‌ವರ್ಡ್ ನಮೂದಿಸಿ' : 'Enter password'}
                  className={`w-full pl-10 pr-10 py-2.5 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none ${theme.ring} transition`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300 transition"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Captcha Widget */}
            <CaptchaWidget
              onCaptchaChange={setCaptchaId}
              value={captchaSolution}
              onChange={setCaptchaSolution}
            />

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 ${theme.btn} text-xs font-bold rounded-xl shadow-lg transition disabled:opacity-50 mt-1`}
            >
              {loading 
                ? (lang === 'kn' ? 'ದೃಢೀಕರಿಸಲಾಗುತ್ತಿದೆ...' : 'Authenticating...') 
                : (lang === 'kn' ? `${roleObj?.label} ಆಗಿ ಲಾಗಿನ್ ಮಾಡಿ` : `Sign In as ${roleObj?.label || 'User'}`)}
            </button>
          </form>

          {/* Link to Signup */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>{lang === 'kn' ? 'ಹೊಸ ವಿದ್ಯಾರ್ಥಿ / ಬಳಕೆದಾರರೇ?' : `New to ${institute.shortName}?`}</span>
            <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 font-bold flex items-center space-x-1">
              <UserPlus className="w-3.5 h-3.5" />
              <span>{lang === 'kn' ? 'ಖಾತೆ ತೆರೆಯಿರಿ' : 'Register Account'}</span>
            </Link>
          </div>

          {/* Quick Fill Demo */}
          <div className="pt-1 space-y-2">
            <div className="flex items-center space-x-1.5 text-[11px] text-slate-400 font-semibold uppercase tracking-wider mb-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'kn' ? 'ಡೆಮೊ ತ್ವರಿತ ಲಾಗಿನ್' : 'Demo Quick Login'}</span>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {ROLE_KEYS.map((r) => {
                const demoInfo = institute.roles[r.key];
                return (
                  <button
                    key={r.key}
                    type="button"
                    onClick={() => {
                      setActiveRole(r.key);
                      setIdentifier(demoInfo.demoId);
                      setPassword(demoInfo.demoPass);
                      setError(null);
                    }}
                    className="py-1.5 px-1 bg-slate-800/70 hover:bg-slate-800 border border-slate-700/60 rounded-lg text-[10px] font-medium text-slate-300 text-center transition"
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Switch institute link */}
          <div className="text-center pt-2">
            <button
              onClick={() => navigate('/login')}
              className="text-[11px] text-slate-500 hover:text-slate-300 transition inline-flex items-center space-x-1"
            >
              <ArrowLeft className="w-3 h-3" />
              <span>{lang === 'kn' ? 'ಬೇರೆ ಸಂಸ್ಥೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Switch to a different institution'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

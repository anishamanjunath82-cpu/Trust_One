import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { INSTITUTES } from '../utils/institutesData';
import { ArrowRight, Sparkles, Globe, ShieldCheck } from 'lucide-react';

export default function InstitutePicker() {
  const navigate = useNavigate();
  const [lang, setLang] = useState('en'); // 'en' | 'kn'

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* Background decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-5xl space-y-7">
        {/* Top Navbar: Trust identity & Language switcher */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-4">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-lg shadow-indigo-500/20">
              T1
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-lg font-black tracking-tight text-white">Trust One</span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
                  ERP
                </span>
              </div>
              <p className="text-[10px] text-cyan-300/80 font-bold uppercase tracking-wider">
                {lang === 'kn' ? 'ಒಂದು ಟ್ರಸ್ಟ್. ಪ್ರತಿಯೊಂದು ಕ್ಯಾಂಪಸ್. ಸಂಪರ್ಕಿತ.' : 'One Trust. Every Campus. Connected.'}
              </p>
            </div>
          </div>

          {/* Bilingual English / Kannada Toggle */}
          <button
            type="button"
            onClick={() => setLang(lang === 'en' ? 'kn' : 'en')}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-slate-900/90 hover:bg-slate-800 border border-slate-700/80 rounded-xl text-xs font-semibold text-slate-200 transition shadow-sm"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{lang === 'en' ? 'ಕನ್ನಡ (KN)' : 'English (EN)'}</span>
          </button>
        </div>

        {/* Central Header */}
        <div className="text-center space-y-2.5 max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            {lang === 'kn' ? 'ನಿಮ್ಮ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ' : 'Select Your Educational Campus'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {lang === 'kn'
              ? 'ಆರು ಕ್ಯಾಂಪಸ್‌ಗಳು ಒಂದೇ ಕೇಂದ್ರೀಕೃತ ವಿದ್ಯಾರ್ಥಿ ಮಾಹಿತಿ ವ್ಯವಸ್ಥೆಯಡಿ ಸಂಪರ್ಕಗೊಂಡಿವೆ. ಪ್ರತಿಯೊಂದು ಸಂಸ್ಥೆಯು ವಿದ್ಯಾರ್ಥಿ (USN ಸಹಿತ), ಪೋಷಕರು, ಬೋಧಕರು, ಆಡಳಿತ ಮತ್ತು ವಸತಿ ನಿಲಯದ ಪ್ರತ್ಯೇಕ ಲಾಗಿನ್ ಹೊಂದಿದೆ.'
              : 'Six institutions connected under a unified educational trust. Each campus provides dedicated portals for Students (with USN support), Parents, Teachers, Administrators, and Hostel Wardens.'}
          </p>
        </div>

        {/* 6 Campus Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {INSTITUTES.map((inst) => {
            const Icon = inst.icon;
            const theme = inst.theme;
            return (
              <button
                key={inst.id}
                onClick={() => navigate(`/login/${inst.id}`)}
                className={`group relative bg-gradient-to-br ${theme.gradient} border ${theme.border} rounded-2xl p-5 text-left transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:border-slate-600 focus:outline-none`}
              >
                <div className="relative z-10 space-y-3">
                  {/* Icon + Code */}
                  <div className="flex items-start justify-between">
                    <div className={`w-11 h-11 rounded-xl ${theme.badgeBg} flex items-center justify-center shadow-md`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${theme.badgeBg}`}>
                      {inst.code}
                    </span>
                  </div>

                  {/* Name & Type */}
                  <div>
                    <h3 className="text-base font-extrabold text-white leading-snug group-hover:text-cyan-200 transition">
                      {inst.name}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-1 font-medium">
                      {inst.type}
                    </p>
                  </div>

                  {/* Affiliation */}
                  <p className="text-[10px] text-slate-500 font-medium line-clamp-1">
                    {inst.affiliation}
                  </p>

                  {/* Stats and Entrance Button */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                    <span className="text-[10px] text-slate-400 font-semibold">
                      {theme.stats}
                    </span>
                    <div className={`px-2.5 py-1 rounded-lg ${theme.badgeBg} flex items-center space-x-1 group-hover:bg-indigo-600 group-hover:text-white transition`}>
                      <span className="text-[10px] font-bold">
                        {lang === 'kn' ? 'ಪ್ರವೇಶಿಸಿ' : 'Enter'}
                      </span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="text-center space-y-1.5 pt-2 border-t border-slate-800/80">
          <div className="flex items-center justify-center space-x-1.5 text-[11px] text-slate-400">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              {lang === 'kn'
                ? 'ಒಂದು ವಿದ್ಯಾರ್ಥಿ ಗುರುತು • ಒಂದು ಅಧಿಕೃತ ದಾಖಲೆ • ಬಹು ಕ್ಯಾಂಪಸ್‌ಗಳು'
                : 'One Student Identity • One Trusted Record • Multiple Connected Campuses'}
            </span>
          </div>
          <p className="text-[10px] text-slate-600 font-mono">
            Trust One ERP • Autonomous Multi-Campus Governance Platform
          </p>
        </div>
      </div>
    </div>
  );
}

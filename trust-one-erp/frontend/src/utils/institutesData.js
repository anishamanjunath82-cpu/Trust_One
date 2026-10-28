import {
  GraduationCap,
  Wrench,
  BookOpen,
  Landmark,
  Cpu,
  HeartPulse,
  User,
  Users,
  ShieldCheck,
  Building,
  School,
  Sparkles
} from 'lucide-react';

export const INSTITUTES = [
  {
    id: 'engineering-college',
    code: 'ENG',
    name: 'Trust One Institute of Technology',
    shortName: 'Engineering College',
    type: 'Engineering & Advanced Technology',
    affiliation: 'AICTE Approved • NBA Accredited • VTU Recognized',
    description: 'B.Tech, M.Tech, high-performance computing clusters, robotics automation, and multi-disciplinary engineering laboratories.',
    icon: Cpu,
    theme: {
      gradient: 'from-indigo-950 via-slate-900 to-slate-950',
      accent: 'indigo',
      badgeBg: 'bg-indigo-500/20 text-indigo-300 border-indigo-400/30',
      activeTab: 'bg-indigo-600 text-white shadow-indigo-600/30 shadow-lg',
      btn: 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-indigo-600/25',
      border: 'border-indigo-500/30',
      ring: 'focus:border-indigo-500',
      stats: 'B.Tech / M.Tech • 40-Acre Digital Campus'
    },
    roles: {
      student: {
        title: 'Engineering Student Portal',
        idLabel: 'University Seat Number (USN) / Student ID',
        placeholder: 'e.g. 1UT22CS001 or 2022CSE0101',
        demoId: '1UT22CS001',
        demoPass: 'password123',
        description: 'Real-time attendance matrix, sessional CIE, lab slots, and placement drives.'
      },
      parent: {
        title: 'Parent & Guardian Portal',
        idLabel: 'Parent ID / Registered Phone',
        placeholder: 'e.g. eng_parent',
        demoId: 'eng_parent',
        demoPass: 'password123',
        description: 'Track engineering attendance compliance (75%), sessional grades, and fees.'
      },
      teacher: {
        title: 'Engineering Faculty Portal',
        idLabel: 'Employee Code / Faculty ID',
        placeholder: 'e.g. FAC9901 or eng_teacher',
        demoId: 'FAC9901',
        demoPass: 'faculty123',
        description: 'Class traversal, period-wise attendance, and sessional grading engine.'
      },
      admin: {
        title: 'Director & Deans Command Center',
        idLabel: 'Admin ID / Principal Login',
        placeholder: 'e.g. admin or principal',
        demoId: 'admin',
        demoPass: 'admin123',
        description: 'Autonomous governance, NOC approvals, placements, and campus notices.'
      },
      warden: {
        title: 'Chief Hostel Warden',
        idLabel: 'Hostel Warden ID',
        placeholder: 'e.g. eng_warden or warden',
        demoId: 'warden',
        demoPass: 'password123',
        description: 'Hostel gate passes, room inventories, and night curfew logs.'
      }
    }
  },
  {
    id: 'polytechnic',
    code: 'POLY',
    name: 'Trust One Polytechnic College',
    shortName: 'Polytechnic College',
    type: 'Technical Diploma & Vocational',
    affiliation: 'AICTE Approved • Directorate of Technical Education',
    description: 'Hands-on technical engineering, workshops, industry-grade tooling, and polytechnic diploma credentials.',
    icon: Wrench,
    theme: {
      gradient: 'from-amber-950 via-orange-950 to-slate-950',
      accent: 'amber',
      badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/30',
      activeTab: 'bg-amber-600 text-white shadow-amber-600/30 shadow-lg',
      btn: 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/25',
      border: 'border-amber-500/30',
      ring: 'focus:border-amber-500',
      stats: '6 Engineering Diplomas • 1,800+ Apprentices'
    },
    roles: {
      student: {
        title: 'Diploma Student Portal',
        idLabel: 'University Seat Number (USN) / Diploma Roll No.',
        placeholder: 'e.g. 1UT22ME042 or POLY202401',
        demoId: 'POLY202401',
        demoPass: 'password123',
        description: 'Access practical lab manual, workshop roster, and internal marks.'
      },
      parent: {
        title: 'Guardian & Parent Hub',
        idLabel: 'Parent Registered ID / Mobile',
        placeholder: 'e.g. poly_parent',
        demoId: 'poly_parent',
        demoPass: 'password123',
        description: 'Review vocational attendance, workshop evaluations, and fees.'
      },
      teacher: {
        title: 'Instructor / Workshop Faculty',
        idLabel: 'Instructor Staff Code',
        placeholder: 'e.g. TCH_POLY01 or poly_teacher',
        demoId: 'poly_teacher',
        demoPass: 'password123',
        description: 'Evaluate practical journals, industry internships, and exams.'
      },
      admin: {
        title: 'Polytechnic Administration',
        idLabel: 'Admin ID / Principal Login',
        placeholder: 'e.g. poly_admin',
        demoId: 'poly_admin',
        demoPass: 'password123',
        description: 'Oversee technical labs, workshop equipment, and state board exams.'
      },
      warden: {
        title: 'Technical Hostel Warden',
        idLabel: 'Hostel Staff Code / Warden ID',
        placeholder: 'e.g. poly_warden',
        demoId: 'poly_warden',
        demoPass: 'password123',
        description: 'Resident discipline, night attendance, and hostel management.'
      }
    }
  },
  {
    id: 'school',
    code: 'SCH',
    name: 'Trust One Public School',
    shortName: 'School',
    type: 'K-12 Higher Secondary',
    affiliation: 'CBSE & State Board Affiliated',
    description: 'Foundational education, holistic curriculum, and secondary academic excellence nurturing tomorrow’s leaders.',
    icon: School,
    theme: {
      gradient: 'from-emerald-950 via-teal-950 to-slate-950',
      accent: 'emerald',
      badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
      activeTab: 'bg-emerald-600 text-white shadow-emerald-600/30 shadow-lg',
      btn: 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-emerald-600/25',
      border: 'border-emerald-500/30',
      ring: 'focus:border-emerald-500',
      stats: 'Grade 1–12 • 2,400+ Students'
    },
    roles: {
      student: {
        title: 'Student Portal',
        idLabel: 'Student USN / Admission Number',
        placeholder: 'e.g. SCH202401 or 1UT24SC012',
        demoId: 'SCH202401',
        demoPass: 'password123',
        description: 'Check daily homework, attendance, report cards, and notices.'
      },
      parent: {
        title: 'Parent Portal',
        idLabel: 'Registered Parent Mobile / Parent ID',
        placeholder: 'e.g. school_parent or PRNT_SCH01',
        demoId: 'school_parent',
        demoPass: 'password123',
        description: 'Track child’s academic progress, fee status, and teacher remarks.'
      },
      teacher: {
        title: 'Teacher / Faculty Portal',
        idLabel: 'Teacher Employee Code / Email',
        placeholder: 'e.g. TCH_SCH01 or school_teacher',
        demoId: 'school_teacher',
        demoPass: 'password123',
        description: 'Log classroom attendance, publish assignments, and grade tests.'
      },
      admin: {
        title: 'Principal & School Admin',
        idLabel: 'Principal / Admin Login ID',
        placeholder: 'e.g. school_admin',
        demoId: 'school_admin',
        demoPass: 'password123',
        description: 'Manage admissions, syllabus scheduling, fee records, and staff.'
      },
      warden: {
        title: 'Boarding & Hostel Warden',
        idLabel: 'Hostel Warden ID',
        placeholder: 'e.g. school_warden',
        demoId: 'school_warden',
        demoPass: 'password123',
        description: 'Boarding house attendance, night roll call, and campus leaves.'
      }
    }
  },
  {
    id: 'pre-university',
    code: 'PUC',
    name: 'Trust One Pre-University College',
    shortName: 'Pre-University College',
    type: 'Higher Secondary (10+2 / Intermediate)',
    affiliation: 'Department of Pre-University Education, Karnataka',
    description: 'Premier bridge education spanning Science (PCMB/PCMC), Commerce, and Arts with integrated competitive exam coaching.',
    icon: BookOpen,
    theme: {
      gradient: 'from-cyan-950 via-sky-950 to-slate-950',
      accent: 'cyan',
      badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
      activeTab: 'bg-cyan-600 text-white shadow-cyan-600/30 shadow-lg',
      btn: 'bg-cyan-600 hover:bg-cyan-500 text-white shadow-cyan-600/25',
      border: 'border-cyan-500/30',
      ring: 'focus:border-cyan-500',
      stats: 'Science • Commerce • Arts (10+2)'
    },
    roles: {
      student: {
        title: 'PUC Student Portal',
        idLabel: 'Student USN / SATS Register No.',
        placeholder: 'e.g. PUC202401 or 1UT24PU089',
        demoId: 'PUC202401',
        demoPass: 'password123',
        description: 'Track preparatory exam scores, lab sessions, and JEE/NEET test marks.'
      },
      parent: {
        title: 'Parent Monitoring Desk',
        idLabel: 'Registered Parent Phone / ID',
        placeholder: 'e.g. puc_parent',
        demoId: 'puc_parent',
        demoPass: 'password123',
        description: 'Monitor competitive mock performance and college attendance.'
      },
      teacher: {
        title: 'Lecturer & Faculty Portal',
        idLabel: 'Lecturer ID / Staff Email',
        placeholder: 'e.g. TCH_PUC01 or puc_teacher',
        demoId: 'puc_teacher',
        demoPass: 'password123',
        description: 'Upload lecture notes, track laboratory attendance, and enter marks.'
      },
      admin: {
        title: 'Dean & PUC Administrator',
        idLabel: 'Administrator Username',
        placeholder: 'e.g. puc_admin',
        demoId: 'puc_admin',
        demoPass: 'password123',
        description: 'Board registrations, exam hall tickets, and institutional analytics.'
      },
      warden: {
        title: 'PUC Residential Warden',
        idLabel: 'Hostel Warden Code',
        placeholder: 'e.g. puc_warden',
        demoId: 'puc_warden',
        demoPass: 'password123',
        description: 'Hostel curfew enforcement, daily check-ins, and study hours.'
      }
    }
  },
  {
    id: 'mca-college',
    code: 'MCA',
    name: 'Trust One Institute of MCA Studies',
    shortName: 'MCA College',
    type: 'Postgraduate Computer Applications & Degree',
    affiliation: 'AICTE Approved • UGC Recognized • University Affiliated',
    description: 'Postgraduate Master of Computer Applications (MCA), Data Engineering, Cloud Infrastructure, and advanced software technology suites.',
    icon: Landmark,
    theme: {
      gradient: 'from-purple-950 via-violet-950 to-slate-950',
      accent: 'purple',
      badgeBg: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
      activeTab: 'bg-purple-600 text-white shadow-purple-600/30 shadow-lg',
      btn: 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-600/25',
      border: 'border-purple-500/30',
      ring: 'focus:border-purple-500',
      stats: 'MCA & P.G. Programs • 1,200+ Scholars'
    },
    roles: {
      student: {
        title: 'MCA Student Portal',
        idLabel: 'University Seat Number (USN) / Student Reg. No.',
        placeholder: 'e.g. 1UT23MC001 or DEG202401',
        demoId: 'DEG202401',
        demoPass: 'password123',
        description: 'Access cloud lab instances, software project reviews, and placement dossiers.'
      },
      parent: {
        title: 'Parent Portal',
        idLabel: 'Parent Identifier / Phone',
        placeholder: 'e.g. degree_parent',
        demoId: 'degree_parent',
        demoPass: 'password123',
        description: 'Review semester credits, semester fee dues, and placement status.'
      },
      teacher: {
        title: 'Professor & Faculty Portal',
        idLabel: 'Faculty Employee Code',
        placeholder: 'e.g. TCH_DEG01 or degree_teacher',
        demoId: 'degree_teacher',
        demoPass: 'password123',
        description: 'Manage MCA lecture attendance, lab projects, and semester grades.'
      },
      admin: {
        title: 'Director & MCA Admin',
        idLabel: 'Director / Admin ID',
        placeholder: 'e.g. degree_admin',
        demoId: 'degree_admin',
        demoPass: 'password123',
        description: 'Manage university affiliations, PG exam schedules, and research clearances.'
      },
      warden: {
        title: 'PG Hostels Warden',
        idLabel: 'Hostel In-Charge Staff ID',
        placeholder: 'e.g. degree_warden',
        demoId: 'degree_warden',
        demoPass: 'password123',
        description: 'PG room allocations, mess clearances, and hostel security logs.'
      }
    }
  },
  {
    id: 'medical-college',
    code: 'MED',
    name: 'Trust One Institute of Medical Sciences',
    shortName: 'Medical College',
    type: 'Medical Sciences & Clinical Hospital',
    affiliation: 'NMC Recognized • Ministry of Health & Family Welfare',
    description: 'Clinical rotations, patient wards, anatomy dissection halls, pathology laboratories, and teaching hospital governance.',
    icon: HeartPulse,
    theme: {
      gradient: 'from-rose-950 via-red-950 to-slate-950',
      accent: 'rose',
      badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
      activeTab: 'bg-rose-600 text-white shadow-rose-600/30 shadow-lg',
      btn: 'bg-rose-600 hover:bg-rose-500 text-white shadow-rose-600/25',
      border: 'border-rose-500/30',
      ring: 'focus:border-rose-500',
      stats: 'MBBS / MD • 750-Bed Teaching Hospital'
    },
    roles: {
      student: {
        title: 'Medical Intern & Student Portal',
        idLabel: 'University Seat Number (USN) / NMC Reg. No.',
        placeholder: 'e.g. 1UT23MB018 or MED202401',
        demoId: 'MED202401',
        demoPass: 'password123',
        description: 'Clinical postings, ward duty logs, anatomy sessions, and viva marks.'
      },
      parent: {
        title: 'Medical Student Guardian',
        idLabel: 'Parent Contact / ID',
        placeholder: 'e.g. med_parent',
        demoId: 'med_parent',
        demoPass: 'password123',
        description: 'Monitor professional clinical rotations, attendance, and exam clearances.'
      },
      teacher: {
        title: 'Clinical Faculty / Senior Resident',
        idLabel: 'Medical Faculty ID / Registration No.',
        placeholder: 'e.g. TCH_MED01 or med_teacher',
        demoId: 'med_teacher',
        demoPass: 'password123',
        description: 'Log clinical ward attendance, conduct bedside vivas, and publish case studies.'
      },
      admin: {
        title: 'Dean of Medicine & Medical Director',
        idLabel: 'Medical Superintendent / Admin ID',
        placeholder: 'e.g. med_admin',
        demoId: 'med_admin',
        demoPass: 'password123',
        description: 'Hospital accreditation, residency allocations, and NMC compliance tracking.'
      },
      warden: {
        title: 'Doctors & Medical Hostel Warden',
        idLabel: 'Medical Hostel Warden Code',
        placeholder: 'e.g. med_warden',
        demoId: 'med_warden',
        demoPass: 'password123',
        description: 'Resident doctor hostel allotments, night emergency shift leaves.'
      }
    }
  }
];

export const ROLE_KEYS = [
  { key: 'student', label: 'Student', icon: GraduationCap, dbRole: 'STUDENT' },
  { key: 'parent', label: 'Parent', icon: Users, dbRole: 'PARENT' },
  { key: 'teacher', label: 'Teacher', icon: User, dbRole: 'FACULTY' },
  { key: 'admin', label: 'Admin', icon: ShieldCheck, dbRole: 'ADMIN' },
  { key: 'warden', label: 'Hostel Warden', icon: Building, dbRole: 'WARDEN' },
];

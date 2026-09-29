import { PortfolioData } from '../types/portfolio';

// Import images from src/assets
import libsysImg from '../assets/libsys.png';
import bagyoalertoImg from '../assets/bagyoalerto.png';
import borrowhubImg from '../assets/borrowhub.png';
import specmatchImg from '../assets/specmatch.jpeg';

export const portfolioData: PortfolioData = {
  name: "Alwyn Adriano",
  title: "AI-Native Software Engineer | 4th Year CS Student",
  summary: "4th Year Computer Science student at University of Caloocan City and AI-Native Software Engineer with a solid foundation in core PHP, JavaScript, and relational database systems. Proficient in leveraging AI tooling, prompt architecture, and agentic workflows to rapidly prototype, build, and deploy production web applications and RESTful APIs. Committed to writing clean, maintainable code with strict attention to data integrity, robust architecture, and system security. Driven by discipline both in software engineering and fitness.",
  contact: {
    location: "Manila, Metro Manila",
    email: "adrianoalwyn@gmail.com",
    linkedin: "https://linkedin.com/in/alwyn-adriano-9659bb283",
    github: "https://github.com/sis0n",
    phone: "+63 976-368-3414",
    facebook: "https://www.facebook.com/adrianoalwyn05",
    instagram: "https://www.instagram.com/adrianoalwyn/"
  },
  skillCategories: [
    {
      title: "Backend Development",
      skills: ["PHP", "Laravel", "Java", "C", "Node.js"]
    },
    {
      title: "Frontend Development",
      skills: ["JavaScript (ES6+)", "TypeScript", "React", "HTML5", "CSS3", "Tailwind CSS"]
    },
    {
      title: "Databases & Architecture",
      skills: ["MySQL", "SQLite", "Database Design", "Repository Pattern", "RESTful APIs"]
    },
    {
      title: "AI & Modern Tooling",
      skills: ["AI-Augmented Development", "Git / GitHub", "Postman", "Linux", "Vite", "Composer"]
    }
  ],
  projects: [
    {
      id: "specmatch",
      title: "Spec Match — AI Technical Specification Matching Platform",
      image: specmatchImg,
      technologies: ["Laravel", "Inertia.js", "React", "Google Gemini API", "TechSpecs API", "laravel-dompdf", "Tailwind CSS", "MySQL / SQLite", "Wasmer Serverless"],
      highlights: ["AI Integration (Gemini)", "APPCON 2026 Hackathon", "Inertia.js / React", "TechSpecs API", "DomPDF Reports"],
      metrics: [
        { label: "Delivery", value: "24h Hackathon Sprint" },
        { label: "AI Pipeline", value: "Gemini + TechSpecs API" },
        { label: "Reporting", value: "Automated PDF Reports" }
      ],
      shortDescription: "AI-native hardware matching engine engineered in a 24-hour hackathon sprint to benchmark enterprise devices against workload demands with automated PDF audit reports.",
      description: "An AI-native enterprise platform engineered during the 24-hour APPCON 2026: AI Matsuri Hackathon by Team-10 (Code Titans) for the sub-theme 'Intelligent Internal Device Asset Optimization'. Built with a full-stack Laravel and Inertia.js/React architecture, integrated with Google Gemini AI and the TechSpecs API. Automatically queries, parses, and matches internal device hardware capabilities against organizational workload demands, generating automated PDF asset audit and optimization reports via laravel-dompdf.",
      liveLink: "https://appcon2026-codetitans-specmatch.wasmer.app/login",
      architecture: "Full-stack Laravel monolith with Inertia.js and React frontend, Google Gemini AI prompt integration, TechSpecs API hardware data ingestion, laravel-dompdf server-side report generation, and serverless hosting on Wasmer.",
      challenges: [
        {
          problem: "Extreme 24-hour (1-day) active development window during a 3-day hackathon event, requiring full architectural design, AI pipeline integration, PDF report generation, and production deployment under intense time constraints and sleep deprivation.",
          solution: "Leveraged rapid full-stack scaffolding using Laravel with Inertia.js and React alongside AI-assisted engineering workflows to design, integrate APIs, test, and ship a live working application to Wasmer before the final buzzer."
        },
        {
          problem: "Integrating external hardware telemetry from TechSpecs API and processing unstructured specs through Google Gemini with deterministic scoring.",
          solution: "Designed structured prompt pipelines with strict schema validation and fallback heuristics to generate reliable device compatibility scores and bottleneck insights without hallucination."
        },
        {
          problem: "Generating downloadable, multi-page hardware asset optimization and compatibility audit reports dynamically on the server.",
          solution: "Integrated laravel-dompdf with custom print CSS stylesheets to render server-side PDF asset reports in sub-second response times."
        }
      ]
    },
    {
      id: "libsys",
      title: "LibSys — Full-Stack Library Management System",
      image: libsysImg,
      technologies: ["PHP (Native)", "MySQL", "JavaScript (ES6)", "Tailwind CSS", "MVC Pattern", "QR Code Scanner", "Apache"],
      highlights: ["Custom PHP MVC", "QR Code Check-ins", "RBAC Architecture", "Repository Pattern"],
      metrics: [
        { label: "Architecture", value: "Custom Native PHP MVC" },
        { label: "Security", value: "3-Tier Granular RBAC" },
        { label: "Concurrency", value: "Atomic DB Transactions" }
      ],
      shortDescription: "Full-stack library system built with a custom PHP MVC architecture, featuring 3-tier role-based access control, QR check-ins, and atomic inventory transactions.",
      description: "A full-stack library management system engineered from scratch using a custom PHP MVC architecture. Features granular Role-Based Access Control (RBAC) for administrators, staff, and students, an automated book catalog, and full borrowing/returning lifecycle tracking. Integrated QR code check-ins for expedited circulation and utilized the Repository pattern for maintainable data querying.",
      link: "https://github.com/sis0n/LibSys-v3",
      liveLink: "https://library.ucc-caloocan.com/",
      architecture: "Custom MVC architecture with centralized front-controller routing, service-layer separation, and MySQL repository abstractions for modular, testable business logic.",
      challenges: [
        {
          problem: "Managing granular user roles and permission policies across multi-level admin, staff, and student workflows.",
          solution: "Implemented custom RBAC middleware that authenticates session tokens and enforces permission guards before controller execution."
        },
        {
          problem: "Handling high concurrency and potential race conditions during peak book borrowing periods.",
          solution: "Implemented MySQL database transactions with row-level locking to guarantee atomic inventory updates."
        }
      ]
    },
    {
      id: "borrowhub",
      title: "BorrowHub — Asset & Inventory Management Platform",
      image: borrowhubImg,
      technologies: ["PHP / Laravel", "MySQL", "Java (Android)", "Laravel Sanctum", "Tailwind CSS", "RESTful API", "RBAC"],
      highlights: ["Laravel REST API", "Android Client", "Audit Logging", "Sanctum Auth"],
      metrics: [
        { label: "Platform", value: "Laravel REST + Android" },
        { label: "Audit Trail", value: "Immutable State Snapshots" },
        { label: "Auth Protocol", value: "Sanctum Bearer Tokens" }
      ],
      shortDescription: "Enterprise equipment tracking platform with a Laravel REST API backend, token-based Sanctum authentication, and an immutable model audit trail.",
      description: "An enterprise-grade asset and equipment management platform comprising a Laravel REST API web dashboard and a native Android client application. Features automated asset tracking, barcode scanning, token-based authentication with Laravel Sanctum, and an immutable audit logging pipeline for regulatory compliance.",
      link: "https://github.com/sis0n/BorrowHub",
      architecture: "Decoupled client-server architecture with Laravel RESTful API backend, token-based authentication via Laravel Sanctum, and asynchronous Android Java HTTP client.",
      challenges: [
        {
          problem: "Ensuring secure, stateless authentication between the Android client and Laravel backend.",
          solution: "Integrated Laravel Sanctum to issue cryptographically signed bearer tokens with configurable expiration and permission abilities."
        },
        {
          problem: "Maintaining complete traceability of sensitive asset movements and user actions.",
          solution: "Engineered an automated Audit Logging system leveraging model observers to record before/after state snapshots on every modification."
        }
      ]
    },
    {
      id: "bagyoalerto",
      title: "BagyoAlerto — Typhoon Emergency Alert PWA",
      image: bagyoalertoImg,
      technologies: ["JavaScript (ES6+)", "Service Workers", "PWA APIs", "OpenWeatherMap API", "HTML5 & CSS3"],
      highlights: ["CodeSprout 2025 Hackathon", "Offline PWA", "OpenWeather API", "Emergency Alert System"],
      metrics: [
        { label: "Event", value: "CodeSprout 2025 Hackathon" },
        { label: "Reliability", value: "100% Offline PWA Cache" },
        { label: "Telemetry", value: "OpenWeather Live Feed" }
      ],
      shortDescription: "Progressive Web App developed for the CodeSprout 2025 Hackathon, delivering real-time localized typhoon alerts and offline emergency survival guides.",
      description: "A Progressive Web App (PWA) developed for the CodeSprout 2025 Hackathon to provide real-time, localized typhoon alerts and disaster preparedness guides. Utilizes Geolocation APIs, live weather feeds, and service worker caching to ensure mission-critical safety information remains accessible even during severe network outages.",
      link: "https://github.com/99lash/BagyoAlerto",
      liveLink: "https://bagyoalerto.vercel.app/",
      architecture: "Progressive Web App leveraging Service Workers for cache-first offline asset delivery, paired with dynamic OpenWeatherMap API telemetry.",
      challenges: [
        {
          problem: "Delivering life-saving weather alerts in disaster zones with intermittent or lost internet connectivity.",
          solution: "Implemented Service Worker caching strategies to cache emergency checklists, hotlines, and last-known radar data for offline utility."
        },
        {
          problem: "Rapidly designing and shipping a fully functional MVP under intense hackathon deadlines.",
          solution: "Established a structured Git workflow with feature branches and paired modular JavaScript architecture for rapid team integration."
        }
      ]
    },
    {
      id: "atm-simulator",
      title: "ATM Simulator — Banking State Machine",
      technologies: ["C Language", "Standard File I/O", "Data Structures", "Transaction State Machine"],
      highlights: ["File-Based Persistence", "Transaction State Machine", "C Architecture"],
      metrics: [
        { label: "Runtime", value: "Pure C Architecture" },
        { label: "Persistence", value: "Flat-File Binary Buffer" },
        { label: "Safety", value: "Overdraft State Machine" }
      ],
      shortDescription: "Terminal banking simulator implemented in pure C with persistent flat-file binary records, PIN authentication, and overdraft transaction safeguards.",
      description: "A robust banking terminal simulator implemented in pure C. Features persistent file-based account storage, secure PIN hashing and authentication, account balance inquiry, cash deposits, withdrawals with overdraft prevention, and persistent audit transaction logs.",
      link: "https://github.com/sis0n/First-Year",
      architecture: "Modular C program employing structured file I/O buffers, state-driven transaction execution, and strict memory safety practices.",
      challenges: [
        {
          problem: "Achieving reliable persistent data storage without an external database server in low-level C.",
          solution: "Engineered a structured flat-file record management system with binary validation and atomic rewrite routines."
        }
      ]
    }
  ],
  experiences: [
    {
      role: "INTERNAL AUDIT SPECIALIST (SPES)",
      company: "CITY GOVERNMENT OF CALOOCAN — INTERNAL AUDIT SERVICE",
      location: "Caloocan City, Metro Manila",
      period: "May 2025 – June 2025",
      responsibilities: [
        "Data Integrity & Auditing: Processed and audited high-volume municipal financial records with 100% data fidelity, maintaining strict confidentiality standards for sensitive government documentation.",
        "IT Support & Infrastructure: Served as departmental technical lead, troubleshooting local network connectivity, resolving hardware bottlenecks, and eliminating printer downtime.",
        "Systematic Record Archival: Streamlined physical and digital filing workflows, decreasing document retrieval latency across auditing operations."
      ]
    },
    {
      role: "STUDENT ASSISTANT — MANAGEMENT INFORMATION SYSTEMS (MIS)",
      company: "UNIVERSITY OF CALOOCAN CITY SOUTH",
      location: "Caloocan City, Metro Manila",
      period: "January 2024 – September 2025",
      responsibilities: [
        "Student Information Systems: Provided primary technical support for the university's AIMS Portal, resolving authentication failures, account anomalies, and student record discrepancies.",
        "Faculty & Administrative Support: Delivered rapid technical resolution for faculty computational systems, preventing instructional disruptions and ensuring system uptime.",
        "Network & Hardware Diagnostics: Collaborated directly with the MIS Head to troubleshoot workstation hardware, configure network switches, and optimize campus-wide Wi-Fi performance.",
        "System Administration: Aided in daily IT operations, database maintenance, data hygiene procedures, and hardware asset audits."
      ]
    },
    {
      role: "TECHNICAL DATA ASSISTANT (CASH FOR WORK) — MIS",
      company: "UNIVERSITY OF CALOOCAN CITY SOUTH",
      location: "Caloocan City, Metro Manila",
      period: "September 2024 – November 2024",
      responsibilities: [
        "Database Record Management: Encoded and verified student and faculty credential records within the central database with zero data discrepancy.",
        "Admissions Pipeline Support: Optimized digital enrollment pipelines and provided technical assistance to streamline applicant onboarding.",
        "Infrastructure Maintenance: Performed diagnostics and software provisioning across institutional computing labs."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science (4th Year Senior)",
      institution: "University of Caloocan City",
      location: "Caloocan City, Metro Manila",
      period: "August 2023 – Present"
    },
    {
      degree: "TVL — Information and Communication Technology (ICT)",
      institution: "Systems Plus Computer College",
      location: "Caloocan City, Metro Manila",
      period: "September 2021 – July 2023"
    },
    {
      degree: "Junior High School",
      institution: "Caloocan High School",
      location: "Caloocan City, Metro Manila",
      period: "June 2017 – June 2020"
    }
  ]
};

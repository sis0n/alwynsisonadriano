import { PortfolioData } from '../types/portfolio';

// Import images from src/assets
import libsysImg from '../assets/libsys.png';
import bagyoalertoImg from '../assets/bagyoalerto.png';
import borrowhubImg from '../assets/borrowhub.png';
import specmatchImg from '../assets/specmatch.jpeg';
import bantaiImg from '../assets/bantai_landing.png';

export const portfolioData: PortfolioData = {
  name: "Alwyn Sison Adriano",
  title: "AI-Native Software Engineer",
  summary: "Software developer experienced in building web applications with PHP and Laravel. Proficient in backend logic, database management, and leveraging AI tools to write clean and efficient code. Seeking a Full Stack or Software Developer role to build reliable applications and deliver value to software teams.",
  contact: {
    location: "Manila, Metro Manila",
    email: "adrianoalwyn@gmail.com",
    linkedin: "https://linkedin.com/in/alwyn-adriano-9659bb283",
    github: "https://github.com/sis0n",
    phone: "+63 976-368-3414",
    website: "https://alwynsisonadriano.vercel.app",
    facebook: "https://www.facebook.com/adrianoalwyn05",
    instagram: "https://www.instagram.com/adrianoalwyn/"
  },
  skillCategories: [
    {
      title: "Backend",
      skills: ["PHP", "Java", "C"]
    },
    {
      title: "Frontend",
      skills: ["JavaScript (ES6+)", "HTML5", "CSS3"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "SQLite"]
    },
    {
      title: "Frameworks",
      skills: ["Laravel", "Tailwind CSS", "Bootstrap CSS"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git/GitHub", "Postman", "XAMPP", "CI/CD Workflow", "RESTful Services"]
    }
  ],
  projects: [
    {
      id: "libsys",
      title: "LibSys (Software Engineering Project)",
      image: libsysImg,
      technologies: ["PHP Native", "MySQL"],
      highlights: ["Custom PHP MVC", "QR Code Check-ins", "RBAC Architecture", "Repository Pattern"],
      metrics: [
        { label: "Architecture", value: "Custom PHP MVC" },
        { label: "Security", value: "Role-Based Access (RBAC)" },
        { label: "Data Management", value: "Repository Pattern" }
      ],
      shortDescription: "Full-stack library management system engineered from scratch using a custom PHP MVC architecture, featuring role-based access control, book cataloging, and QR code check-ins.",
      description: "Developed a full-stack library management system from the ground up using a custom PHP MVC architecture, featuring role-based access control (RBAC) for administrators, staff, and students. Implemented a comprehensive book catalog and borrowing/returning workflow, along with QR code integration for streamlined library check-ins and improved user efficiency. Designed the MySQL database and applied the Repository pattern for maintainable data management, while developing a dynamic frontend using Vanilla JavaScript.",
      bulletPoints: [
        "Developed a full-stack library management system from the ground up using a custom PHP MVC architecture, featuring role-based access control (RBAC) for administrators, staff, and students.",
        "Implemented a comprehensive book catalog and borrowing/returning workflow, along with QR code integration for streamlined library check-ins and improved user efficiency.",
        "Designed the MySQL database and applied the Repository pattern for maintainable data management, while developing a dynamic frontend using Vanilla JavaScript."
      ],
      link: "https://github.com/sis0n/LibSys-v3",
      liveLink: "https://library.ucc-caloocan.com/",
      architecture: "Custom PHP MVC architecture featuring centralized routing, separation of concerns across service layers, and the Repository pattern for decoupled MySQL queries and clean business logic.",
      challenges: [
        {
          problem: "Managing granular user roles and permission policies across administrators, staff, and students.",
          solution: "Implemented custom RBAC middleware that authenticates session tokens and enforces permission guards before controller execution."
        },
        {
          problem: "Maintaining data integrity and performance during concurrent book checkout and return operations.",
          solution: "Utilized atomic MySQL database transactions and optimized query routines structured through the Repository pattern."
        }
      ]
    },
    {
      id: "iaims",
      title: "iAIMS (Thesis Project)",
      technologies: ["Laravel", "Next.js", "PostgreSQL (Ongoing)"],
      highlights: ["Thesis Project", "Laravel Core Backend", "PostgreSQL Optimization", "Next.js UI"],
      metrics: [
        { label: "Backend Core", value: "Laravel Framework" },
        { label: "Database", value: "Optimized PostgreSQL" },
        { label: "Frontend", value: "Next.js RESTful UI" }
      ],
      shortDescription: "Academic Information Management System engineered with Laravel backend core logic, optimized PostgreSQL schemas, and dynamic Next.js frontend interfaces.",
      description: "Engineered backend core logic for administrative and registrar modules using Laravel, automating key record-processing functions and increasing administrative workflow efficiency. Designed PostgreSQL relational database schemas and optimized queries, enforcing data integrity across modules and reducing query response times during peak usage periods. Developed dynamic frontend user interfaces with Next.js and integrated RESTful APIs, delivering responsive user components and seamless web navigation for academic operations.",
      bulletPoints: [
        "Engineered backend core logic for administrative and registrar modules using Laravel, automating key record-processing functions and increasing administrative workflow efficiency.",
        "Designed PostgreSQL relational database schemas and optimized queries, enforcing data integrity across modules and reducing query response times during peak usage periods.",
        "Developed dynamic frontend user interfaces with Next.js and integrated RESTful APIs, delivering responsive user components and seamless web navigation for academic operations."
      ],
      architecture: "Modern full-stack architecture featuring a decoupled Laravel RESTful API backend handling business logic and authorization, an optimized PostgreSQL relational database, and a Next.js client delivering responsive user interfaces.",
      challenges: [
        {
          problem: "Enforcing data integrity and minimizing response times across interconnected administrative modules during heavy academic enrollment periods.",
          solution: "Designed normalized PostgreSQL schemas with composite indexing, foreign key constraints, and optimized SQL queries to preserve data fidelity and prevent bottlenecks."
        },
        {
          problem: "Automating disparate manual record-processing functions for administrative and registrar offices.",
          solution: "Architected modular Laravel service layers that orchestrate record transactions, data validation, and automated workflow triggers."
        }
      ]
    },
    {
      id: "borrowhub",
      title: "BorrowHub",
      image: borrowhubImg,
      technologies: ["Laravel", "React Native", "MySQL"],
      highlights: ["Laravel REST API", "React Native Mobile", "Automated Workflows", "RBAC Authorization"],
      metrics: [
        { label: "Backend API", value: "Laravel RESTful API" },
        { label: "Mobile App", value: "React Native" },
        { label: "Database", value: "Relational MySQL" }
      ],
      shortDescription: "Full-stack equipment and resource borrowing platform featuring a Laravel RESTful API backend, cross-platform React Native mobile application, and automated reservation workflows.",
      description: "Architected and developed a full-stack equipment and resource borrowing platform featuring a Laravel RESTful API backend and a cross-platform React Native mobile application. Designed MySQL database schemas, implemented role-based authorization, and integrated automated reservation workflows to streamline resource tracking and approval processes.",
      bulletPoints: [
        "Architected and developed a full-stack equipment and resource borrowing platform featuring a Laravel RESTful API backend and a cross-platform React Native mobile application.",
        "Designed MySQL database schemas, implemented role-based authorization, and integrated automated reservation workflows to streamline resource tracking and approval processes."
      ],
      link: "https://github.com/sis0n/BorrowHub",
      architecture: "Decoupled client-server architecture with a Laravel RESTful API service communicating with a cross-platform React Native mobile client, backed by a relational MySQL database.",
      challenges: [
        {
          problem: "Preventing double-booking and schedule collisions across institutional equipment and assets.",
          solution: "Designed automated reservation workflows with database-level checks and role-based approval pipelines to ensure accurate scheduling."
        },
        {
          problem: "Ensuring secure and consistent authorization policies across mobile and administrative interfaces.",
          solution: "Implemented role-based authorization in Laravel to govern API endpoints and restrict actions based on user privilege."
        }
      ]
    },
    {
      id: "bagyoalerto",
      title: "BagyoAlerto (CodeSprout 2025 Hackathon Project)",
      image: bagyoalertoImg,
      technologies: ["HTML5", "CSS3", "JavaScript", "Weather API", "PWA"],
      highlights: ["CodeSprout 2025 Hackathon", "Offline PWA", "Weather API Integration", "Disaster Preparedness"],
      metrics: [
        { label: "Event", value: "CodeSprout 2025 Hackathon" },
        { label: "Architecture", value: "Progressive Web App (PWA)" },
        { label: "Availability", value: "Offline-First Caching" }
      ],
      shortDescription: "Progressive Web App developed for the CodeSprout 2025 Hackathon, delivering localized typhoon alerts, emergency preparedness checklists, and offline accessibility.",
      description: "Developed a Progressive Web App (PWA) for localized typhoon alerts and disaster preparedness, integrating the Geolocation API and external Weather APIs to provide location-based weather information. Implemented an interactive dashboard with real-time weather updates, emergency preparedness checklists, and essential emergency contact information to help users prepare for severe weather conditions. Implemented PWA capabilities for offline accessibility and an installable app experience, improving access to critical information during limited or unavailable internet connectivity.",
      bulletPoints: [
        "Developed a Progressive Web App (PWA) for localized typhoon alerts and disaster preparedness, integrating the Geolocation API and external Weather APIs to provide location-based weather information.",
        "Implemented an interactive dashboard with real-time weather updates, emergency preparedness checklists, and essential emergency contact information to help users prepare for severe weather conditions.",
        "Implemented PWA capabilities for offline accessibility and an installable app experience, improving access to critical information during limited or unavailable internet connectivity."
      ],
      link: "https://github.com/99lash/BagyoAlerto",
      liveLink: "https://bagyoalerto.vercel.app/",
      architecture: "Progressive Web Application architecture combining client-side Geolocation and Weather APIs with Service Worker caching routines for resilient offline availability.",
      challenges: [
        {
          problem: "Delivering critical survival guides and alerts when network connectivity is disrupted during storms.",
          solution: "Implemented Service Worker caching strategies to cache emergency checklists, hotlines, and weather data for reliable offline use."
        },
        {
          problem: "Providing accurate, location-sensitive typhoon telemetry across varied user devices.",
          solution: "Integrated the browser Geolocation API with external Weather APIs to dynamically serve localized conditions and safety advisories."
        }
      ]
    },
    {
      id: "specmatch",
      title: "SpecMatch (AppCon 2026: AI Matsuri Hackathon Project)",
      image: specmatchImg,
      technologies: ["Laravel", "Inertia.js", "MySQL"],
      highlights: ["AppCon 2026: AI Matsuri", "Laravel Core Logic", "Inertia.js Integration", "MySQL Optimization"],
      metrics: [
        { label: "Event", value: "AppCon 2026 Hackathon" },
        { label: "Full-Stack Bridge", value: "Inertia.js" },
        { label: "Database Tuning", value: "Optimized MySQL Queries" }
      ],
      shortDescription: "Full-stack hardware matching platform built during the AppCon 2026: AI Matsuri Hackathon, featuring a Laravel backend, Inertia.js data flow, and optimized MySQL queries.",
      description: "Designed and updated the front-end user interface, improving screen layouts and navigation to create a clearer, more user-friendly experience. Built the main features and core application logic using Laravel, connecting key backend tasks to complete the project on time for the competition. Cleaned up MySQL queries and passed data efficiently through Inertia.js, making pages load faster and reducing server response times.",
      bulletPoints: [
        "Designed and updated the front-end user interface, improving screen layouts and navigation to create a clearer, more user-friendly experience.",
        "Built the main features and core application logic using Laravel, connecting key backend tasks to complete the project on time for the competition.",
        "Cleaned up MySQL queries and passed data efficiently through Inertia.js, making pages load faster and reducing server response times."
      ],
      liveLink: "https://appcon2026-codetitans-specmatch.wasmer.app/login",
      architecture: "Full-stack monolithic architecture utilizing Laravel for backend business logic, Inertia.js for seamless single-page interface transitions, and MySQL for relational storage.",
      challenges: [
        {
          problem: "Engineering core application logic and intuitive user flows within tight competition timeframes.",
          solution: "Leveraged Laravel's rapid application scaffolding alongside Inertia.js to connect backend services directly to front-end views without custom API layers."
        },
        {
          problem: "Sluggish page performance and high database response latency during rapid data matching.",
          solution: "Refactored and cleaned up MySQL queries, eliminated redundant data fetches, and passed lean state snapshots via Inertia.js to accelerate page loads."
        }
      ]
    },
    {
      id: "bantai",
      title: "Bantai (AppBuildersPH Hackathon Project)",
      image: bantaiImg,
      technologies: ["Kotlin", "Local AI", "Android"],
      highlights: ["AppBuildersPH Hackathon", "Kotlin Native", "Local On-Device AI", "Real-Time Detection"],
      metrics: [
        { label: "Event", value: "AppBuildersPH Hackathon" },
        { label: "Sprint Duration", value: "2-Day Hackathon" },
        { label: "AI Engine", value: "On-Device Local AI" }
      ],
      shortDescription: "Android application engineered with Kotlin and Local AI during a two-day hackathon, enabling real-time detection of scam messages and instant alert notifications.",
      description: "Engineered an Android application using Kotlin and Local AI during a two-day hackathon, enabling real-time detection of scam messages and instant alert notifications for users. Refactored core application logic and backend infrastructure, resolving critical bugs to ensure stable performance during live project demonstrations.",
      bulletPoints: [
        "Engineered an Android application using Kotlin and Local AI during a two-day hackathon, enabling real-time detection of scam messages and instant alert notifications for users.",
        "Refactored core application logic and backend infrastructure, resolving critical bugs to ensure stable performance during live project demonstrations."
      ],
      architecture: "Native Android application built in Kotlin utilizing on-device Local AI inference for instantaneous classification of incoming SMS and messages without external cloud dependencies.",
      challenges: [
        {
          problem: "Analyzing message contents for fraudulent indicators in real time without compromising user privacy or requiring external cloud calls.",
          solution: "Integrated Local AI models within the Kotlin Android runtime to execute instant, on-device scam pattern analysis."
        },
        {
          problem: "Ensuring zero crashes and rock-solid system stability under the pressure of a 2-day hackathon demo.",
          solution: "Refactored core logic and application infrastructure, isolating edge cases and handling async threads cleanly to guarantee flawless live evaluation."
        }
      ]
    }
  ],
  experiences: [
    {
      role: "MIS Intern",
      company: "Krazy Media Digital Solutions Corp.",
      location: "Sta. Cruz, Manila",
      period: "May 2026 – July 2026",
      responsibilities: [
        "Conducted quality assurance testing for the company's HRIS, evaluating system functionality and identifying bugs, inconsistencies, and usability issues, resulting in more reliable system performance and improved user experience.",
        "Trained team members on Gemini CLI, demonstrating its commands, features, and application in AI-assisted software development, resulting in improved understanding and adoption of AI tools in development workflows.",
        "Developed Flutter application components, writing and testing code based on project requirements and development standards, resulting in functional mobile application features that contributed to project development."
      ]
    },
    {
      role: "Student Assistant – Management Information Systems (MIS)",
      company: "University of Caloocan City South",
      location: "Caloocan City, Metro Manila",
      period: "January 2024 – September 2025",
      responsibilities: [
        "Resolved AIMS Portal account and navigation issues for students, providing front-line technical support and troubleshooting assistance, resulting in smoother access to academic records and online services.",
        "Troubleshot technical concerns reported by faculty members, providing timely support for classroom and office technology, resulting in minimal disruption to academic and administrative operations.",
        "Diagnosed and resolved hardware and network issues, including printer malfunctions and campus Wi-Fi connectivity problems, in coordination with the MIS Head, resulting in more reliable IT infrastructure and reduced operational downtime."
      ]
    },
    {
      role: "DSWD Cash for Work – Management Information Systems (MIS)",
      company: "University of Caloocan City South",
      location: "Caloocan City, Metro Manila",
      period: "September 2024 – November 2024",
      responsibilities: [
        "Encoded student and faculty information into the AIMS Portal, maintaining accurate and up-to-date records for administrative processes, resulting in more reliable data for academic and administrative operations.",
        "Supported the admissions team in processing student applications, providing technical assistance and resolving system-related concerns, resulting in more efficient application processing and fewer technical delays.",
        "Troubleshot software and hardware issues reported by faculty and administrative offices, providing timely technical support to resolve operational concerns, resulting in smoother day-to-day office operations."
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Caloocan City South",
      location: "Metro Manila",
      period: "August 2023 – Present"
    },
    {
      degree: "ICT (Information and Communication Technology)",
      institution: "Systems Plus Computer College",
      location: "Caloocan City South, Metro Manila",
      period: "September 2021 – July 2023"
    }
  ]
};

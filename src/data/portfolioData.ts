import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "Alwyn Sison Adriano",
  title: "Software Developer | Computer Science Student",
  summary: "Passionate Computer Science student with a strong foundation in core PHP and JavaScript. Proficient in building functional web applications using HTML/CSS and currently deepening my technical expertise by mastering the Laravel framework. Committed to writing clean, efficient code and eager to apply backend logic in a professional environment.",
  contact: {
    location: "Manila, Metro Manila",
    email: "adrianoalwyn@gmail.com",
    linkedin: "https://linkedin.com/in/alwyn-adriano-9659bb283",
    github: "https://github.com/sis0n",
    phone: "+63 976-368-3414"
  },
  skillCategories: [
    {
      title: "Backend Development",
      skills: ["PHP", "Java", "C", "Laravel"]
    },
    {
      title: "Frontend Development",
      skills: ["JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS", "Bootstrap CSS"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "SQLite"]
    },
    {
      title: "Tools & Platforms",
      skills: ["Git", "GitHub", "Postman", "XAMPP"]
    }
  ],
  projects: [
    {
      title: "LibSys",
      technologies: ["PHP", "MySQL", "MVC Architecture", "JavaScript"],
      description: "A full-stack library management system featuring RBAC, comprehensive book catalog, and borrowing workflow.",
      highlights: [
        "Implemented QR code integration for streamlined check-ins",
        "Follows Repository pattern for clean, maintainable data management"
      ],
      link: "https://github.com/sis0n/LibSys-v3"
    },
    {
      title: "BagyoAlerto",
      technologies: ["HTML5", "CSS3", "JavaScript", "Weather API", "PWA"],
      description: "A Progressive Web App providing real-time typhoon alerts and safety information.",
      highlights: [
        "Real-time updates via Geolocation and external weather APIs",
        "Offline accessibility and installable experience"
      ],
      link: "https://github.com/99lash/BagyoAlerto"
    },
    {
      title: "BorrowHub",
      technologies: ["Laravel", "MySQL", "Tailwind CSS"],
      description: "Advanced asset and inventory management system built with modern Laravel practices.",
      highlights: [
        "Automated borrowing tracking",
        "Responsive administrative dashboard"
      ],
      link: "https://github.com/sis0n/BorrowHub"
    },
    {
      title: "ATM Simulator",
      technologies: ["C Language", "File Handling"],
      description: "A secure terminal-based ATM simulator managing user accounts and transaction records.",
      highlights: [
        "Secure login authentication and banking operations",
        "Text file database for user data storage"
      ],
      link: "https://github.com/sis0n/First-Year"
    }
  ],
  experiences: [
    {
      role: "Internal Audit Service Intern (SPES)",
      company: "City Hall of Caloocan City South",
      location: "Caloocan City",
      period: "May 2025 – June 2025",
      responsibilities: [
        "High-volume data encoding of audit reports with 100% accuracy",
        "Unofficial technical lead for network and hardware troubleshooting",
        "Systematic filing and organization of sensitive audit papers"
      ]
    },
    {
      role: "Student Assistant – MIS",
      company: "University of Caloocan City South",
      location: "Caloocan City",
      period: "January 2024 – September 2025",
      responsibilities: [
        "Front-line troubleshooting for students with AIMS Portal issues",
        "Resolved technical concerns for faculty to minimize classroom disruption",
        "Maintained campus hardware and restored Wi-Fi connectivity"
      ]
    },
    {
      role: "Cash for Work – MIS",
      company: "University of Caloocan City South",
      location: "Caloocan City",
      period: "September 2024 – November 2024",
      responsibilities: [
        "Encoded vital student and faculty information into administrative systems",
        "Provided technical guidance during student admissions processing",
        "Resolved software and hardware issues for administrative offices"
      ]
    }
  ],
  education: [
    {
      degree: "Bachelor of Science in Computer Science",
      institution: "University of Caloocan City",
      location: "South Caloocan, Metro Manila",
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

import { PortfolioData } from '../types/portfolio';

export const portfolioData: PortfolioData = {
  name: "Alwyn Sison Adriano",
  title: "Software Developer | Computer Science Student",
  summary: "Passionate Computer Science student with a strong foundation in core PHP and JavaScript. Proficient in building functional web applications using HTML/CSS and currently deepening my technical expertise by mastering the Laravel framework. I am committed to writing clean, efficient code and eager to apply my backend logic in a professional environment. Aiming to secure a Software Developer or Full Stack Intern position where I can support development lifecycles while completing my 400-hour OJT requirement.",
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
      skills: ["PHP", "Java", "C"]
    },
    {
      title: "Frontend Development",
      skills: ["JavaScript (ES6+)", "HTML5", "CSS3"]
    },
    {
      title: "Databases",
      skills: ["MySQL", "SQLite"]
    },
    {
      title: "Tools & Frameworks",
      skills: ["Laravel", "Tailwind CSS", "Bootstrap CSS", "Git/GitHub", "Postman", "XAMPP"]
    }
  ],
  projects: [
    {
      title: "LibSys (Software Engineering Project)",
      technologies: ["PHP Native", "MySQL"],
      description: "Developed \"LibSys,\" a full-stack library management system from the ground up using a custom PHP MVC architecture. The system features robust role-based access control (RBAC) for administrators, staff, and students, a comprehensive book catalog, and a complete borrowing/returning workflow. To enhance user experience and efficiency, I implemented QR code integration for streamlined check-ins and a dynamic frontend with vanilla JavaScript. The application leverages a MySQL database and follows the Repository pattern for clean, maintainable data management.",
      link: "https://github.com/sis0n/LibSys-v3"
    },
    {
      title: "BagyoAlerto (CodeSprout 2025 Hackathon Project)",
      technologies: ["HTML5", "CSS3", "JavaScript", "Weather API", "PWA"],
      description: "BagyoAlerto is a Progressive Web App (PWA) developed using vanilla JavaScript, HTML, and CSS, designed to provide users with crucial, localized typhoon alerts and comprehensive safety information. Leveraging the Geolocation API and integrating with external weather APIs, the application offers real-time updates, an interactive dashboard, an emergency preparedness checklist, and essential contact information. Its PWA architecture offline accessibility and an installable experience, enhancing user readiness during adverse weather events.",
      link: "https://github.com/99lash/BagyoAlerto"
    },
    {
      title: "BorrowHub (Application Development Project)",
      technologies: ["Laravel", "MySQL", "Tailwind CSS"],
      description: "Advanced asset and inventory management system built with modern Laravel practices. Features automated borrowing tracking and a responsive administrative dashboard.",
      link: "https://github.com/sis0n/BorrowHub"
    },
    {
      title: "ATM Simulator (Computer Programming Project)",
      technologies: ["C Language"],
      description: "Developed a fully functional ATM simulator in C language using a text file as a database to handle user accounts and transaction records. Implemented secure login authentication and essential banking operations, kabilang ang withdrawals, deposits, fund transfers, at password management.",
      link: "https://github.com/sis0n/First-Year"
    }
  ],
  experiences: [
    {
      role: "SPECIAL PROGRAM FOR EMPLOYMENT OF STUDENTS (SPES) – INTERNAL AUDIT SERVICE",
      company: "CITY HALL OF CALOOCAN CITY SOUTH",
      location: "Caloocan City",
      period: "May 2025 – June 2025",
      responsibilities: [
        "Data Management: Performed high-volume data encoding of audit reports and financial documents, ensuring 100% accuracy and maintaining the confidentiality of sensitive government records.",
        "Technical Support: Acted as the unofficial technical lead for the department by troubleshooting network connectivity (Wi-Fi) and resolving hardware issues with office printers to minimize downtime.",
        "Administrative Operations: Assisted in the systematic filing and organization of audit papers, improving the efficiency of document retrieval within the office."
      ]
    },
    {
      role: "STUDENT ASSISTANT – MANAGEMENT INFORMATION SYSTEMS (MIS)",
      company: "UNIVERSITY OF CALOOCAN CITY SOUTH",
      location: "Caloocan City",
      period: "January 2024 – September 2025",
      responsibilities: [
        "Technical Support: Provides front-line assistance to students regarding AIMS Portal issues, kabilang ang account troubleshooting at navigation support para siguraduhin ang seamless access sa academic records.",
        "Faculty Assistance: Resolves technical concerns for faculty members, ensuring minimal disruption to classroom instruction and office operations.",
        "Hardware & Network Maintenance: Collaborates with the MIS Head to troubleshoot and repair hardware malfunctions, such as printer issues, and restore campus Wi-Fi connectivity.",
        "Operational Support: Assists in the daily management of the MIS office, helping maintain the integrity and reliability of the school's digital and physical infrastructure."
      ]
    },
    {
      role: "CASH FOR WORK – MANAGEMENT INFORMATION SYSTEMS (MIS)",
      company: "UNIVERSITY OF CALOOCAN CITY SOUTH",
      location: "Caloocan City",
      period: "September 2024 – November 2024",
      responsibilities: [
        "Data Management & Encoding: Accurately encoded student and faculty information into the AIMS Portal, ensuring up-to-date and reliable records for administrative processes.",
        "Admissions Support: Assisted the admissions team by providing technical guidance and helping process student applications efficiently.",
        "Technical Assistance: Provided troubleshooting support to faculty and administrative offices, resolving software and hardware issues to maintain smooth daily operations.",
        "Operational Support: Supported the MIS team in maintaining office systems and digital resources, contributing to the overall reliability of campus IT infrastructure."
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
    },
    {
      degree: "High School",
      institution: "Caloocan High School",
      location: "Caloocan City South, Metro Manila",
      period: "June 2017 – June 2020"
    }
  ]
};

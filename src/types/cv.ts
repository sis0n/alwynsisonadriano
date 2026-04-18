export interface Project {
  title: string;
  technologies: string;
  description: string;
  features: string[];
}

export interface WorkExperience {
  role: string;
  company: string;
  location: string;
  period: string;
  responsibilities: string[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
}

export interface TechnicalSkills {
  backend: string[];
  frontend: string[];
  databases: string[];
  frameworks: string[];
  tools: string[];
}

export interface CVData {
  name: string;
  contact: {
    location: string;
    email: string;
    linkedin: string;
    github: string;
    phone: string;
  };
  summary: string;
  skills: TechnicalSkills;
  projects: Project[];
  experience: WorkExperience[];
  education: Education[];
}

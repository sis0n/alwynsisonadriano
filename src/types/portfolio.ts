export interface ContactInfo {
  location: string;
  email: string;
  linkedin: string;
  github: string;
  phone: string;
  facebook?: string;
  instagram?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface Project {
  id: string;
  title: string;
  technologies: string[];
  description: string;
  highlights?: string[];
  link?: string;
  liveLink?: string;
  image?: string;
  architecture?: string;
  databaseSchema?: string;
  apiDocs?: string;
  apiEndpoints?: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    path: string;
    description: string;
  }[];
  challenges?: {
    problem: string;
    solution: string;
  }[];
}

export interface Experience {
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

export interface PortfolioData {
  name: string;
  title: string;
  summary: string;
  contact: ContactInfo;
  skillCategories: SkillCategory[];
  projects: Project[];
  experiences: Experience[];
  education: Education[];
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: string;
  image?: string;
}

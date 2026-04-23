import React, { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight,
  Database,
  Cpu,
  Terminal,
  Layout as LayoutIcon,
  Star,
  GitFork,
  Activity
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import gradPhoto from '../assets/grad.png';

// GitHub Activity Types
interface GithubData {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  publicRepositories: number;
  followers: number;
  lifetimeCommits: number;
  createdAt: string;
  repositories: Array<{
    name: string;
    stargazerCount: number;
    forkCount: number;
    primaryLanguage?: {
      name: string;
      color: string;
    };
  }>;
  contributionsCollection?: {
    contributionCalendar: {
      totalContributions: number;
      weeks: Array<{
        contributionDays: Array<{
          contributionCount: number;
          date: string;
          color: string;
        }>;
      }>;
    };
  };
}

// Cleaner, More Elegant Reveal (No Skew)
const RevealText: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.8, 
          delay, 
          ease: [0.25, 1, 0.5, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Interactive Glow Card Component
const GlowCard: React.FC<{ children: React.ReactNode, className?: string, onClick?: () => void }> = ({ children, className, onClick }) => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={onClick}
      whileHover={{ y: -5 }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-700"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(37, 99, 235, 0.04), transparent 40%)`
        }}
      />
      <div className="relative z-10 h-full flex flex-col">
        {children}
      </div>
    </motion.div>
  );
};

const ProjectImage: React.FC<{ project: any }> = ({ project }) => {
  const [hasError, setHasError] = useState(false);

  if (project.image && !hasError) {
    return (
      <div className="w-full h-full bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex items-center justify-center text-slate-300 dark:text-slate-700 bg-slate-100 dark:bg-slate-800">
      {project.title.toLowerCase().includes('lib') ? <Database size={48} /> : 
       project.title.toLowerCase().includes('bagyo') ? <Cpu size={48} /> : 
       <Terminal size={48} />}
    </div>
  );
};

const Home: React.FC = () => {
  const { name, summary, skillCategories, projects, contact } = portfolioData;
  const { theme } = useTheme();
  const { openHireModal } = useUI();
  const navigate = useNavigate();
  const location = useLocation();

  const [githubData, setGithubData] = React.useState<GithubData | null>(null);
  const [githubLoading, setGithubLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGithub = async () => {
      // Mock data to use as fallback
      const mockData: GithubData = {
        name: "Alwyn Sison Adriano",
        login: "sis0n",
        avatarUrl: "https://github.com/sis0n.png",
        bio: "Computer Science Student | Backend Developer | Fitness Enthusiast",
        publicRepositories: 12,
        followers: 5,
        lifetimeCommits: 450,
        repositories: [
          { name: "LibSys-v3", stargazerCount: 2, forkCount: 1, primaryLanguage: { name: "PHP", color: "#4F5D95" } },
          { name: "BorrowHub", stargazerCount: 3, forkCount: 2, primaryLanguage: { name: "Java", color: "#b07219" } },
          { name: "BagyoAlerto", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "JavaScript", color: "#f1e05a" } },
          { name: "Portfolio-v2", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "TypeScript", color: "#3178c6" } }
        ]
      };

      try {
        const res = await fetch('/api/github');
        if (!res.ok) throw new Error('API request failed');
        
        const data = await res.json();
        if (data && !data.error && !data.errors) {
          setGithubData(data);
        } else {
          setGithubData(mockData);
        }
      } catch (err) {
        console.warn("Using mock data (Local/API error):", err);
        setGithubData(mockData);
      } finally {
        setGithubLoading(false);
      }
    };
    fetchGithub();
  }, []);

  React.useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location]);
  
  const sectionPadding = "py-20 md:py-32 px-6 md:px-20";

  return (
    <div className="bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-blue-500/30 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen relative overflow-hidden flex flex-col px-6 md:px-20 pb-12 lg:pb-0">
        <div className="flex-1 flex items-center pt-24 lg:pt-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
              className="text-center lg:text-left"
            >
              <RevealText delay={0.1}>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] text-slate-950 dark:text-white mb-8 uppercase">
                  {name} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">BACKEND DEV.</span>
                </h1>
              </RevealText>

              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 1 }}
                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium mx-auto lg:mx-0"
              >
                Building robust systems and efficient architectures. Specialized in PHP/Laravel and modern web logic.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-8 md:gap-12"
              >
                <button onClick={openHireModal} className="group relative bg-slate-950 dark:bg-white text-white dark:text-black px-12 py-6 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                   <span className="relative z-10 uppercase tracking-[0.2em] text-[13px]">Work with me</span>
                   <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <div className="flex gap-8 md:gap-10">
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all"><Github size={32} /></a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all"><Linkedin size={32} /></a>
                </div>
              </motion.div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="relative flex justify-center items-center h-full max-h-[40vh] lg:max-h-[75vh] mt-6 lg:mt-0"
            >
              <div className="relative w-full h-full flex justify-center items-center group">
                <img 
                  src={gradPhoto} 
                  alt={name}
                  className="max-w-[240px] md:max-w-full max-h-[30vh] lg:max-h-[70vh] w-auto h-auto object-contain rounded-[2rem] shadow-2xl grayscale hover:grayscale-0 transition-all duration-1000 ease-out border border-slate-100 dark:border-slate-800 bg-slate-100 dark:bg-slate-900"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT SECTION */}
      <section id="about" className={`relative ${sectionPadding}`}>
        <div className="max-w-4xl mx-auto text-center">
          <RevealText className="mb-10">
            <h2 className="text-blue-600 font-black text-sm md:text-base tracking-[0.4em] uppercase">About Me</h2>
          </RevealText>
          <RevealText className="mb-12" delay={0.1}>
            <p className="text-3xl md:text-6xl font-bold tracking-tight leading-tight text-slate-950 dark:text-white">
              Focusing on the <span className="text-blue-600 italic">Core logic</span> that powers modern applications.
            </p>
          </RevealText>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-2xl md:text-3xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
          >
            {summary}
          </motion.p>
        </div>
      </section>

      {/* 2.5 GITHUB ACTIVITY SECTION */}
      {!githubLoading && githubData && (
        <section className={`relative ${sectionPadding} bg-slate-50/30 dark:bg-transparent pt-0`}>
          <div className="max-w-4xl mx-auto">
            <div className="bg-[#f8fafc] dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-[2rem] p-8 md:p-12 shadow-sm">
              
              {/* Header Row */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <img 
                      src={githubData.avatarUrl} 
                      alt={githubData.login} 
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md" 
                    />
                    <div className="absolute -bottom-1 -right-1 bg-[#0d1117] rounded-full p-1 border-2 border-[#f8fafc] dark:border-slate-900 text-white">
                      <Github size={10} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-950 dark:text-white uppercase tracking-tight mb-0.5">
                      {githubData.name || githubData.login}
                    </h3>
                    <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">
                      GitHub Activity <span className="mx-2 text-slate-300">•</span> Just Now
                    </div>
                  </div>
                </div>
                <a 
                  href={`https://github.com/${githubData.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors"
                >
                  View Profile
                </a>
              </div>

              <div className="h-px bg-slate-200 dark:bg-slate-800 w-full mb-10 opacity-60" />

              {/* Stats Row */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0">
                <div className="md:pr-10">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-5">Commits (2026)</h5>
                  <div className="text-4xl font-black text-slate-950 dark:text-white">
                    {githubData.lifetimeCommits}
                  </div>
                </div>

                <div className="md:px-10 md:border-l border-slate-200 dark:border-slate-800">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-5">Consistency</h5>
                  <div className="text-4xl font-black text-slate-950 dark:text-white">
                    {(() => {
                      if (!githubData.contributionsCollection) return "0 days";
                      let streak = 0;
                      const weeks = [...githubData.contributionsCollection.contributionCalendar.weeks].reverse();
                      let found = false;
                      for (const week of weeks) {
                        const days = [...week.contributionDays].reverse();
                        for (const day of days) {
                          if (new Date(day.date) > new Date()) continue;
                          if (day.contributionCount > 0) {
                            streak++;
                          } else {
                            found = true;
                            break;
                          }
                        }
                        if (found) break;
                      }
                      return `${streak} days`;
                    })()}
                  </div>
                </div>

                <div className="md:pl-10 md:border-l border-slate-200 dark:border-slate-800">
                  <h5 className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400 mb-5">Most Used Languages</h5>
                  <div className="space-y-3">
                    {(() => {
                      const langs: Record<string, { count: number, color: string }> = {};
                      githubData.repositories.forEach(repo => {
                        if (repo.primaryLanguage) {
                          if (!langs[repo.primaryLanguage.name]) {
                            langs[repo.primaryLanguage.name] = { count: 0, color: repo.primaryLanguage.color };
                          }
                          langs[repo.primaryLanguage.name].count++;
                        }
                      });
                      const total = Object.values(langs).reduce((sum, l) => sum + l.count, 0);
                      return Object.entries(langs)
                        .sort((a, b) => b[1].count - a[1].count)
                        .slice(0, 3)
                        .map(([name, info], idx) => {
                          const percent = Math.round((info.count / total) * 100);
                          return (
                            <div key={idx} className="flex items-center justify-between">
                              <div className="flex items-center gap-2.5">
                                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: info.color }} />
                                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-700 dark:text-slate-300">
                                  {name}
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-slate-400 opacity-60">
                                {percent}%
                              </span>
                            </div>
                          );
                        });
                    })()}
                    <div className="flex items-center justify-between opacity-40">
                      <div className="flex items-center gap-2.5">
                        <div className="w-2 h-2 rounded-full bg-slate-400" />
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Others</span>
                      </div>
                      <span className="text-[10px] font-bold">--</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="mt-14 pt-8 border-t border-slate-200 dark:border-slate-800 border-dashed">
                <p className="text-slate-400 text-[11px] font-medium tracking-wide">
                  Total commits <span className="text-slate-900 dark:text-white font-black">{githubData.lifetimeCommits}</span> since {new Date(githubData.createdAt).getFullYear()}.
                </p>
              </div>

            </div>
          </div>
        </section>
      )}


      {/* 3. PROJECTS SECTION */}
      <section id="projects" className={`transition-colors relative ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center">
            <RevealText>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-slate-950 dark:text-white leading-none">Selected Work.</h2>
            </RevealText>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-2 bg-blue-600 rounded-full mx-auto"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, idx) => (
              <GlowCard 
                key={idx}
                onClick={() => navigate(`/project/${project.id}`)}
                className="bg-white dark:bg-slate-900/50 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-xl dark:shadow-none min-h-[480px] flex flex-col overflow-hidden"
              >
                {/* Project Image Header */}
                <div className="h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 relative group-hover:scale-105 transition-transform duration-700">
                  <ProjectImage project={project} />
                  <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-slate-900 to-transparent opacity-60" />
                </div>

                <div className="p-8 flex-1 flex flex-col text-center">
                  <div className="flex-1">
                    <h3 className="text-lg font-black mb-3 uppercase tracking-tight text-slate-950 dark:text-white leading-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-[15px] leading-relaxed mb-6 italic line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6 h-12 items-start justify-center overflow-hidden">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[8px] font-black px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-400 uppercase tracking-wider border border-slate-200/50 dark:border-transparent">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="group/link inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 group-hover:text-blue-700 transition-colors">
                      View Case Study <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        onClick={(e) => e.stopPropagation()}
                        className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors relative z-20"
                        title="View Source"
                      >
                        <Github size={14} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </GlowCard>
          ))}
        </div>
      </div>
    </section>

      {/* 4. SERVICES SECTION */}
      <section className={`relative ${sectionPadding} bg-slate-50/50 dark:bg-slate-900/10`}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-20">
             <RevealText className="mb-6">
                <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Core Expertise</h2>
             </RevealText>
             <RevealText delay={0.1}>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase">What I Do<span className="text-blue-600">.</span></h3>
             </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               className="space-y-6"
             >
                <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20 mx-auto">
                   <Terminal size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">API Development</h4>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed italic">
                  Building secure, scalable, and well-documented RESTful APIs using Laravel and Node.js to power modern client applications.
                </p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.1 }}
               className="space-y-6"
             >
                <div className="w-16 h-16 rounded-3xl bg-slate-950 dark:bg-white flex items-center justify-center text-white dark:text-slate-950 shadow-xl shadow-slate-950/10 mx-auto">
                   <Database size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">Database Design</h4>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed italic">
                  Designing optimized SQL/NoSQL database schemas and implementing efficient queries to ensure high performance and data integrity.
                </p>
             </motion.div>

             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: 0.2 }}
               className="space-y-6"
             >
                <div className="w-16 h-16 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-600 mx-auto">
                   <Cpu size={32} />
                </div>
                <h4 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white">Server Deployment</h4>
                <p className="text-slate-500 dark:text-slate-400 text-lg font-medium leading-relaxed italic">
                  Managing and deploying applications to cloud environments, ensuring smooth performance and continuous availability.
                </p>
             </motion.div>
          </div>
        </div>
      </section>

      {/* 4. TOOLS SECTION */}
      <section className={`relative ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-16 gap-8">
            <div className="max-w-2xl text-center mx-auto">
              <RevealText className="mb-6">
                <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Tech Ecosystem</h2>
              </RevealText>
              <RevealText delay={0.1}>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase leading-none">
                  The Stack <span className="text-slate-300 dark:text-slate-800">.</span>
                </h3>
              </RevealText>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat, idx) => (
              <GlowCard 
                key={idx}
                className="relative p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-2xl dark:shadow-none h-full"
              >
                <div className="mb-10 w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 mx-auto">
                  {cat.title.toLowerCase().includes('backend') ? <Database size={28} /> : 
                   cat.title.toLowerCase().includes('frontend') ? <LayoutIcon size={28} /> : 
                   cat.title.toLowerCase().includes('database') ? <Cpu size={28} /> :
                   <Terminal size={28} />}
                </div>

                <div className="text-center">
                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Category 0{idx + 1}</h4>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white mb-8 uppercase tracking-tight">{cat.title}</h3>
                </div>

                <ul className="space-y-4 max-w-[200px] mx-auto">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold text-[18px] group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                      <div className="w-2.5 h-2.5 rounded-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors shrink-0" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section id="contact" className={`text-slate-950 dark:text-white relative transition-colors ${sectionPadding} pt-48 pb-48`}>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-24">
            <div className="text-center md:text-left flex-1">
              <RevealText className="mb-8">
                <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Ready to start?</h2>
              </RevealText>
              
              <RevealText className="mb-12" delay={0.1}>
                <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.9]">
                  Let's work <br />
                  <span className="text-slate-400 dark:text-slate-500 italic">on something</span> <br />
                  Together<span className="text-blue-600">.</span>
                </h1>
              </RevealText>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.5 }}
                className="flex flex-wrap justify-center md:justify-start gap-10 mt-12"
              >
                 <button 
                   onClick={openHireModal}
                   className="group relative bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-14 py-7 rounded-full font-black uppercase tracking-[0.2em] text-[13px] overflow-hidden transition-all hover:scale-105 shadow-2xl active:scale-95"
                 >
                   <span className="relative z-10">Hire Me</span>
                   <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 </button>
                 <div className="flex items-center gap-12 px-4">
                   <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all uppercase text-[12px] font-black tracking-widest">Github</a>
                   <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all uppercase text-[12px] font-black tracking-widest">Linkedin</a>
                 </div>
              </motion.div>
            </div>

            <div className="hidden lg:block w-[1px] h-64 bg-slate-200 dark:bg-slate-800 transition-colors" />

            <div className="flex-1 text-center md:text-left max-w-sm">
              <motion.p 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
                className="text-2xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 italic"
              >
                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
              </motion.p>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Currently Based In</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{contact.location}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

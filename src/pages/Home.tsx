import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Database,
  Cpu,
  Terminal,
  Server,
  BookOpen
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blogPosts } from '../data/blogPosts';
import { useUI } from '../context/UIContext';
import { useNavigate, Link } from 'react-router-dom';

import gradPhoto from '../assets/grad.png';

// GitHub Activity Types
interface GithubData {
  name: string;
  login: string;
  avatarUrl: string;
  bio: string;
  publicRepositories: number;
  followers: number;
  currentYearCommits: number;
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
}

// Clean Reveal Animation
const RevealText: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0 }) => {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <motion.div
        initial={{ y: "100%", opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ 
          duration: 0.7, 
          delay, 
          ease: [0.22, 1, 0.36, 1] 
        }}
      >
        {children}
      </motion.div>
    </div>
  );
};

// Interactive Minimalist Glow Card Component
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
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className={`group relative overflow-hidden transition-all duration-300 ${className}`}
    >
      <div 
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: isHovering ? 1 : 0,
          background: `radial-gradient(450px circle at ${mousePos.x}px ${mousePos.y}px, rgba(161, 161, 170, 0.08), transparent 50%)`
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
      <div className="w-full h-full bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center p-4">
        <img 
          src={project.image} 
          alt={project.title} 
          className="max-w-full max-h-full object-contain transition-transform duration-500 group-hover:scale-105"
          onError={() => setHasError(true)}
        />
      </div>
    );
  }

  return (
    <div className="w-full h-full flex flex-col items-center justify-center text-zinc-500 dark:text-zinc-400 bg-gradient-to-br from-zinc-100 to-zinc-200/60 dark:from-zinc-900 dark:to-zinc-950 p-6 relative overflow-hidden group-hover:bg-zinc-200/50 dark:group-hover:bg-zinc-800/40 transition-colors">
      <div className="w-14 h-14 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-950 dark:text-white shadow-xs mb-3 transition-transform duration-500 group-hover:scale-110">
        {project.id === 'specmatch' || project.title.toLowerCase().includes('spec') ? <Cpu size={26} /> :
         project.title.toLowerCase().includes('lib') ? <Database size={26} /> : 
         project.title.toLowerCase().includes('bagyo') ? <Cpu size={26} /> : 
         <Terminal size={26} />}
      </div>
      <span className="font-pixel text-[11px] text-zinc-500 dark:text-zinc-400 tracking-tight">
        {project.id === 'specmatch' ? '[AI SPEC MATCH ENGINE]' : '[SYSTEM STATE MACHINE]'}
      </span>
    </div>
  );
};

const Home: React.FC = () => {
  const { name, skillCategories, projects, contact } = portfolioData;
  const { openHireModal } = useUI();
  const navigate = useNavigate();

  const [githubData, setGithubData] = React.useState<GithubData | null>(null);
  const [githubLoading, setGithubLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGithub = async () => {
      const mockData: GithubData = {
        name: "Alwyn Sison Adriano",
        login: "sis0n",
        avatarUrl: "https://github.com/sis0n.png",
        bio: "Computer Science Student | Backend Developer",
        publicRepositories: 12,
        followers: 5,
        lifetimeCommits: 450,
        currentYearCommits: 120,
        createdAt: "2020-01-01T00:00:00Z",
        repositories: [
          { name: "LibSys-v3", stargazerCount: 2, forkCount: 1, primaryLanguage: { name: "PHP", color: "#777bb4" } },
          { name: "BorrowHub", stargazerCount: 3, forkCount: 2, primaryLanguage: { name: "Java", color: "#888888" } },
          { name: "BagyoAlerto", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "JavaScript", color: "#a1a1aa" } },
          { name: "Portfolio-v2", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "TypeScript", color: "#71717a" } }
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
        setGithubData(mockData);
      } finally {
        setGithubLoading(false);
      }
    };
    fetchGithub();
  }, []);

  const sectionPadding = "py-20 md:py-28 px-6 md:px-16";

  return (
    <div className="bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500 font-sans scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[90vh] relative overflow-hidden flex flex-col justify-center px-6 md:px-16 pt-24 pb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 text-center lg:text-left"
          >
            <RevealText delay={0.05}>
              <div className="font-pixel text-[13px] text-zinc-500 dark:text-zinc-400 mb-4 tracking-tight inline-flex items-center gap-2">
                <span>[AI-NATIVE SOFTWARE ENGINEER]</span>
                <span className="opacity-40">•</span>
                <span>[CS STUDENT]</span>
              </div>
            </RevealText>

            <RevealText delay={0.1}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-6">
                {name}
              </h1>
            </RevealText>

            {/* Micro-Bio */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 mb-8 max-w-xl leading-relaxed font-normal mx-auto lg:mx-0 space-y-2.5"
            >
              <p>
                Computer Science student at <span className="font-semibold text-zinc-950 dark:text-white">University of Caloocan City</span> and <span className="font-semibold text-zinc-950 dark:text-white">AI-Native Software Engineer</span> leveraging modern AI workflows, agentic tooling, and clean architecture to build and ship production software rapidly.
              </p>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-500">
                Focused on core backend logic, structured relational databases, and rigorous code verification standards — driven by discipline both in engineering and fitness.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-5 sm:gap-6"
            >
              <button 
                onClick={openHireModal} 
                className="w-full sm:w-auto bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-8 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 shadow-md"
              >
                Get In Touch
              </button>
              
              <div className="flex items-center gap-4">
                <a 
                  href={contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                  aria-label="GitHub Profile"
                >
                  <Github size={18} />
                </a>
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex justify-center items-center"
          >
            <div className="relative group max-w-xs sm:max-w-sm">
              <div className="p-3 bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-3xl shadow-xl">
                <img 
                  src={gradPhoto} 
                  alt={name}
                  className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-[1.02]"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. GITHUB ACTIVITY SECTION */}
      {!githubLoading && githubData && (
        <section className={`relative ${sectionPadding} pt-0`}>
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 md:p-12 shadow-sm">
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 mb-10">
                <div className="flex items-center gap-4">
                  <img 
                    src={githubData.avatarUrl} 
                    alt={githubData.login} 
                    className="w-14 h-14 rounded-2xl object-cover border border-zinc-200 dark:border-zinc-800" 
                  />
                  <div>
                    <h3 className="text-xl font-bold text-zinc-950 dark:text-white tracking-tight">
                      {githubData.name || githubData.login}
                    </h3>
                    <div className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                      @{githubData.login} • Open Source Activity
                    </div>
                  </div>
                </div>
                <a 
                  href={`https://github.com/${githubData.login}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors"
                >
                  GitHub Profile <ArrowUpRight size={14} />
                </a>
              </div>

              <div className="h-px bg-zinc-200 dark:bg-zinc-800 w-full mb-10" />

              {/* Stats Row */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
                <div>
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    Commits (2026)
                  </div>
                  <div className="text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                    {githubData.currentYearCommits}
                  </div>
                </div>

                <div className="sm:border-l border-zinc-200 dark:border-zinc-800 sm:pl-8">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    Repositories
                  </div>
                  <div className="text-4xl font-black text-zinc-950 dark:text-white tracking-tight">
                    {githubData.publicRepositories}
                  </div>
                </div>

                <div className="sm:border-l border-zinc-200 dark:border-zinc-800 sm:pl-8">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-3">
                    Top Languages
                  </div>
                  <div className="space-y-2 font-mono text-xs text-zinc-700 dark:text-zinc-300">
                    <div className="flex justify-between items-center">
                      <span>PHP</span>
                      <span className="text-zinc-400">45%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Java / C</span>
                      <span className="text-zinc-400">30%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>JavaScript</span>
                      <span className="text-zinc-400">25%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer Row */}
              <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Lifetime Commits: <span className="font-bold text-zinc-950 dark:text-white">{githubData.lifetimeCommits}</span> since {new Date(githubData.createdAt).getFullYear()}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 3. SELECTED WORK / PROJECTS SECTION */}
      <section id="projects" className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
              [01] SELECTED WORK
            </div>
            <RevealText>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Featured Projects
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <GlowCard 
                key={project.id}
                onClick={() => navigate(`/project/${project.id}`)}
                className="bg-white dark:bg-zinc-900/40 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm min-h-[480px] flex flex-col overflow-hidden"
              >
                {/* Project Image Header */}
                <div className="h-48 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900 relative border-b border-zinc-200/80 dark:border-zinc-800/80">
                  <ProjectImage project={project} />
                </div>

                <div className="p-7 flex-1 flex flex-col">
                  {/* Architectural Highlights */}
                  {project.highlights && project.highlights.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {project.highlights.slice(0, 2).map((highlight, hIdx) => (
                        <span 
                          key={hIdx} 
                          className="text-[9px] font-mono px-2 py-0.5 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 rounded border border-zinc-200 dark:border-zinc-700/60 font-semibold"
                        >
                          {highlight}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="flex-1">
                    <h3 className="text-base font-semibold mb-1.5 tracking-tight text-zinc-950 dark:text-white leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-6 line-clamp-3">
                      {project.description}
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 mt-auto">
                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.technologies.slice(0, 3).map((tech, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 bg-zinc-50 dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 rounded-md border border-zinc-200/60 dark:border-zinc-800 uppercase">
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Actions Bar */}
                    <div className="flex justify-between items-center">
                      <span className="inline-flex items-center gap-1 text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-950 dark:text-white group-hover:underline">
                        View Project <ArrowUpRight size={13} />
                      </span>
                      
                      <div className="flex items-center gap-3">
                        {project.liveLink && (
                          <a
                            href={project.liveLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-zinc-700 dark:text-zinc-300 hover:text-zinc-950 dark:hover:text-white transition-colors bg-zinc-100 dark:bg-zinc-800 px-2.5 py-1 rounded-md border border-zinc-200 dark:border-zinc-700"
                            title="Open Live Preview"
                          >
                            <span>Live Demo</span>
                            <ExternalLink size={11} />
                          </a>
                        )}
                        {project.link && (
                          <a 
                            href={project.link} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={(e) => e.stopPropagation()}
                            className="text-zinc-400 hover:text-zinc-950 dark:hover:text-white transition-colors p-1"
                            title="View Source Code"
                          >
                            <Github size={15} />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 4. RECENT WRITINGS / BLOG SECTION */}
      <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
                [02] WRITINGS & NOTES
              </div>
              <RevealText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  Recent Articles
                </h2>
              </RevealText>
            </div>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-wider text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors group"
            >
              <span>View All Writings</span>
              <span className="font-pixel text-[10px] opacity-40">[03]</span>
              <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="divide-y divide-zinc-200/80 dark:divide-zinc-800/80 border-y border-zinc-200/80 dark:border-zinc-800/80">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.id}
                to={`/blog/${post.id}`}
                className="group flex flex-col md:flex-row md:items-baseline justify-between gap-3 md:gap-8 py-5 px-3 hover:bg-zinc-100/60 dark:hover:bg-zinc-900/40 rounded-2xl transition-all"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-zinc-500 dark:text-zinc-400 font-semibold">
                      {post.category}
                    </span>
                    <span className="text-zinc-300 dark:text-zinc-700">•</span>
                    <span className="font-mono text-[10px] text-zinc-400 dark:text-zinc-500">
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold text-zinc-950 dark:text-white group-hover:underline leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 line-clamp-1 mt-1 font-normal">
                    {post.excerpt}
                  </p>
                </div>
                <time className="shrink-0 font-mono text-xs text-zinc-400 dark:text-zinc-500 md:text-right">
                  {post.date}
                </time>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CORE EXPERTISE / CAPABILITIES SECTION */}
      <section className={`relative ${sectionPadding} bg-zinc-100/50 dark:bg-zinc-900/20 border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
              [03] CAPABILITIES
            </div>
            <RevealText>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                What I Build
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Cpu size={22} />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                AI-Accelerated Engineering
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Leveraging agentic AI tooling and prompt architecture for rapid prototyping, automated scaffolding, and accelerated shipping without sacrificing code quality.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Server size={22} />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                Backend & System Logic
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Building secure, scalable, and well-documented RESTful APIs using Laravel and PHP MVC architecture to power responsive multi-platform applications.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 space-y-4"
            >
              <div className="w-12 h-12 rounded-2xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center border border-zinc-200 dark:border-zinc-700">
                <Database size={22} />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white">
                Database & Data Integrity
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed">
                Designing normalized relational schemas in MySQL, optimizing queries with indexing, and applying strict validation to ensure complete data fidelity.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. TECH STACK SECTION */}
      <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
              [04] TECHNICAL STACK
            </div>
            <RevealText>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Technical Stack
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <div 
                key={idx}
                className="p-7 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between"
              >
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-2">
                    0{idx + 1} / STACK
                  </div>
                  <h3 className="text-sm font-semibold text-zinc-950 dark:text-white mb-4 tracking-tight">
                    {cat.title}
                  </h3>
                </div>

                <ul className="space-y-3 font-mono text-xs text-zinc-600 dark:text-zinc-400">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. CALL TO ACTION / CONTACT */}
      <section id="contact" className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900 py-28 md:py-36`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-4">
            [05] COLLABORATION
          </div>
          <RevealText className="mb-8">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-zinc-950 dark:text-white leading-tight">
              Let's build <br />
              <span className="text-zinc-400 dark:text-zinc-500">something solid.</span>
            </h2>
          </RevealText>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-lg mx-auto mb-10 font-normal">
            Whether you need a backend developer for your project, an intern for your engineering team, or want to discuss technical ideas.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={openHireModal}
              className="w-full sm:w-auto bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-9 py-4 rounded-full font-mono text-xs uppercase tracking-widest font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-lg"
            >
              Get In Touch
            </button>
            <a 
              href={`mailto:${contact.email}`}
              className="w-full sm:w-auto px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
            >
              {contact.email}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

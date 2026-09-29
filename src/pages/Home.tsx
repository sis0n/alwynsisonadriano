import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  BookOpen,
  Copy,
  Check,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { blogPosts } from '../data/blogPosts';
import { useUI } from '../context/UIContext';
import { useNavigate, Link } from 'react-router-dom';

import gradPhoto from '../assets/grad.png';

// GitHub Activity Types
interface GithubContributionDay {
  date: string;
  count: number;
  level: number;
}

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
  totalPerYear: Record<string, number>;
  contributions: GithubContributionDay[];
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

// 365-Day & Multi-Year Lifetime Real GitHub Contribution Heatmap Grid
interface ContributionHeatmapProps {
  contributions: GithubContributionDay[];
  totalPerYear: Record<string, number>;
}

const ContributionHeatmap: React.FC<ContributionHeatmapProps> = ({ contributions, totalPerYear }) => {
  const [hoveredDay, setHoveredDay] = useState<{ date: string; count: number; x: number; y: number } | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  const availableYears = React.useMemo(() => {
    const years = Object.keys(totalPerYear || {})
      .filter((y) => y !== 'all' && y !== 'lastYear')
      .sort((a, b) => Number(b) - Number(a));
    return ['All', 'Last Year', ...years];
  }, [totalPerYear]);

  const [selectedYear, setSelectedYear] = useState<string>('All');

  const filteredDays = React.useMemo(() => {
    if (!contributions || contributions.length === 0) return [];
    const todayStr = new Date().toISOString().split('T')[0];

    if (selectedYear === 'All') {
      return [...contributions]
        .filter((d) => d.date <= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));
    }
    if (selectedYear === 'Last Year') {
      const pastDays = contributions
        .filter((d) => d.date <= todayStr)
        .sort((a, b) => a.date.localeCompare(b.date));
      return pastDays.slice(-365);
    }
    return contributions
      .filter((d) => d.date.startsWith(selectedYear))
      .sort((a, b) => a.date.localeCompare(b.date));
  }, [contributions, selectedYear]);

  const weeks = React.useMemo(() => {
    if (!filteredDays || filteredDays.length === 0) return [];
    
    const res: Array<Array<{ date: string; count: number; level: number }>> = [];
    let currentWeek: Array<{ date: string; count: number; level: number }> = [];

    const firstDayOfWeek = new Date(filteredDays[0].date).getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
      currentWeek.push({ date: '', count: 0, level: -1 });
    }

    filteredDays.forEach((day) => {
      currentWeek.push(day);
      if (currentWeek.length === 7) {
        res.push(currentWeek);
        currentWeek = [];
      }
    });

    if (currentWeek.length > 0) {
      while (currentWeek.length < 7) {
        currentWeek.push({ date: '', count: 0, level: -1 });
      }
      res.push(currentWeek);
    }

    return res;
  }, [filteredDays]);

  const headerLabels = React.useMemo(() => {
    const labels: { label: string; weekIndex: number; isYearStart?: boolean }[] = [];
    let lastMonth = '';
    let lastYear = '';

    weeks.forEach((week, wIdx) => {
      const validDay = week.find((d) => d.date);
      if (validDay) {
        const dObj = new Date(validDay.date);
        const m = dObj.toLocaleDateString('en-US', { month: 'short' });
        const y = dObj.getFullYear().toString();
        
        const isNewMonth = m !== lastMonth;
        const isNewYear = y !== lastYear;

        if (isNewYear && selectedYear === 'All') {
          labels.push({
            label: `${y} ${m}`,
            weekIndex: wIdx,
            isYearStart: true
          });
          lastMonth = m;
          lastYear = y;
        } else if (isNewMonth) {
          labels.push({
            label: m,
            weekIndex: wIdx,
            isYearStart: false
          });
          lastMonth = m;
        }
      }
    });

    return labels;
  }, [weeks, selectedYear]);

  const dayLabels = ['', 'Mon', '', 'Wed', '', 'Fri', ''];

  const getLevelColor = (level: number) => {
    if (level === -1) return 'opacity-0 pointer-events-none';
    switch (level) {
      case 1:
        return 'bg-emerald-300/90 dark:bg-emerald-950 border border-emerald-400/40 dark:border-emerald-800/60';
      case 2:
        return 'bg-emerald-400 dark:bg-emerald-800 border border-emerald-500/40 dark:border-emerald-700/60';
      case 3:
        return 'bg-emerald-500 dark:bg-emerald-600 border border-emerald-600/40 dark:border-emerald-500/60';
      case 4:
        return 'bg-emerald-600 dark:bg-emerald-400 border border-emerald-700/40 dark:border-emerald-300/60';
      default:
        return 'bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/40';
    }
  };

  const currentPeriodCount = React.useMemo(() => {
    if (selectedYear === 'All') {
      const lifetime = Object.entries(totalPerYear || {})
        .filter(([key]) => key !== 'all' && key !== 'lastYear')
        .reduce((sum, [, val]) => sum + val, 0);
      return lifetime > 0 ? lifetime : filteredDays.reduce((acc, curr) => acc + curr.count, 0);
    }
    if (selectedYear === 'Last Year') {
      return filteredDays.reduce((acc, curr) => acc + curr.count, 0);
    }
    return totalPerYear[selectedYear] ?? filteredDays.reduce((acc, curr) => acc + curr.count, 0);
  }, [selectedYear, totalPerYear, filteredDays]);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollOffset = direction === 'left' ? -360 : 360;
      scrollContainerRef.current.scrollBy({ left: scrollOffset, behavior: 'smooth' });
    }
  };

  // Scroll to the newest activity on mount or selection change
  React.useEffect(() => {
    const timer = setTimeout(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth;
      }
    }, 60);
    return () => clearTimeout(timer);
  }, [selectedYear, weeks]);

  return (
    <div className="w-full">
      {/* Header & Year Tabs */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-5">
        <div>
          <div className="font-mono text-xs font-semibold text-zinc-900 dark:text-zinc-100 flex items-center gap-2">
            <span>
              {selectedYear === 'All' 
                ? 'All-Time Contribution Timeline' 
                : selectedYear === 'Last Year' 
                ? 'Past 365 Days Activity' 
                : `${selectedYear} Contribution Activity`}
            </span>
            <span className="text-[11px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              {currentPeriodCount} contributions
            </span>
          </div>
        </div>

        {/* Year Selector Tabs & Scroll Controls */}
        <div className="flex items-center gap-2">
          {availableYears.length > 1 && (
            <div className="flex flex-wrap items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/60 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
              {availableYears.map((yr) => (
                <button
                  key={yr}
                  onClick={() => setSelectedYear(yr)}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-mono transition-all ${
                    selectedYear === yr
                      ? 'bg-white dark:bg-zinc-900 text-zinc-950 dark:text-white font-bold shadow-xs'
                      : 'text-zinc-500 hover:text-zinc-950 dark:hover:text-white'
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          )}

          {/* Quick Scroll Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/60 p-1 rounded-xl border border-zinc-200/60 dark:border-zinc-700/60">
            <button
              onClick={() => handleScroll('left')}
              className="p-1 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-900 transition-all"
              title="Scroll Left"
              aria-label="Scroll Heatmap Left"
            >
              <ChevronLeft size={14} />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="p-1 rounded-lg text-zinc-500 hover:text-zinc-950 dark:hover:text-white hover:bg-white dark:hover:bg-zinc-900 transition-all"
              title="Scroll Right"
              aria-label="Scroll Heatmap Right"
            >
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Heatmap Grid Scroll Container */}
      <div 
        ref={scrollContainerRef}
        className="relative overflow-x-auto pb-3 pt-1 heatmap-scrollbar select-none"
      >
        <div className="inline-flex gap-2 min-w-full">
          {/* Sticky Days column */}
          <div className="sticky left-0 z-20 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xs pr-2 flex flex-col gap-1 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 select-none">
            {/* Header spacer to match month labels height */}
            <div className="h-4" />
            {dayLabels.map((day, idx) => (
              <span key={idx} className="h-3 leading-none flex items-center">
                {day}
              </span>
            ))}
          </div>

          {/* Main Weeks Columns & Month Headers */}
          <div className="flex flex-col">
            {/* Months header row */}
            <div className="relative h-4 text-[9px] font-mono text-zinc-400 dark:text-zinc-500 mb-1">
              {headerLabels.map((item, idx) => (
                <span 
                  key={idx}
                  className={`absolute whitespace-nowrap ${item.isYearStart ? 'font-bold text-zinc-800 dark:text-zinc-200' : ''}`}
                  style={{ left: `${item.weekIndex * 16}px` }}
                >
                  {item.label}
                </span>
              ))}
            </div>

            {/* Grid columns */}
            <div className="flex gap-1">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 shrink-0 w-3">
                  {week.map((day, dIdx) => (
                    <div
                      key={dIdx}
                      onMouseEnter={(e) => {
                        if (day.date) {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setHoveredDay({
                            date: day.date,
                            count: day.count,
                            x: rect.left + rect.width / 2,
                            y: rect.top,
                          });
                        }
                      }}
                      onMouseLeave={() => setHoveredDay(null)}
                      className={`h-3 w-3 rounded-[2px] transition-transform hover:scale-125 cursor-pointer ${getLevelColor(day.level)}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend & Summary */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 mt-3 text-[10px] font-mono text-zinc-400 dark:text-zinc-500">
        <div className="flex items-center gap-2">
          <span>Real data synced directly with @sis0n</span>
          <span className="hidden md:inline text-zinc-300 dark:text-zinc-700">•</span>
          <span className="hidden md:inline">Scroll horizontally to view entire timeline</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span>Less</span>
          <div className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-[2px] bg-zinc-100 dark:bg-zinc-800/60 border border-zinc-200/50 dark:border-zinc-700/40" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-300 dark:bg-emerald-950 border border-emerald-400/40 dark:border-emerald-800/60" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-400 dark:bg-emerald-800" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-500 dark:bg-emerald-600" />
            <span className="w-2.5 h-2.5 rounded-[2px] bg-emerald-600 dark:bg-emerald-400" />
          </div>
          <span>More</span>
        </div>
      </div>

      {/* Floating Hover Tooltip */}
      {hoveredDay && (
        <div 
          className="fixed z-50 pointer-events-none -translate-x-1/2 -translate-y-full mb-2 px-2.5 py-1 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-mono rounded shadow-xl whitespace-nowrap"
          style={{ left: hoveredDay.x, top: hoveredDay.y - 8 }}
        >
          {hoveredDay.count === 0 ? 'No contributions' : `${hoveredDay.count} contribution${hoveredDay.count > 1 ? 's' : ''}`} on {new Date(hoveredDay.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </div>
      )}
    </div>
  );
};

const Home: React.FC = () => {
  const { name, skillCategories, projects, contact } = portfolioData;
  const { openHireModal } = useUI();
  const navigate = useNavigate();

  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText(contact.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const [githubData, setGithubData] = React.useState<GithubData | null>(null);
  const [githubLoading, setGithubLoading] = React.useState(true);

  React.useEffect(() => {
    const fetchGithub = async () => {
      try {
        const userPromise = fetch('https://api.github.com/users/sis0n');
        const contribPromise = fetch('https://github-contributions-api.jogruber.de/v4/sis0n?y=all');

        const [userRes, contribRes] = await Promise.allSettled([userPromise, contribPromise]);

        let user: any = null;
        if (userRes.status === 'fulfilled' && userRes.value.ok) {
          user = await userRes.value.json();
        }

        let contribData: any = null;
        if (contribRes.status === 'fulfilled' && contribRes.value.ok) {
          contribData = await contribRes.value.json();
        }

        const totalPerYear: Record<string, number> = contribData?.total || {
          "2023": 1,
          "2024": 19,
          "2025": 729,
          "2026": 1048
        };

        const lifetimeCommits = Object.entries(totalPerYear)
          .filter(([key]) => key !== 'all' && key !== 'lastYear')
          .reduce((sum, [, val]) => sum + val, 0) || 1797;

        const currentYear = new Date().getFullYear().toString();
        const currentYearCommits = totalPerYear[currentYear] ?? 1048;

        const contributions: GithubContributionDay[] = contribData?.contributions || [];

        setGithubData({
          name: user?.name || "Alwyn Sison Adriano",
          login: user?.login || "sis0n",
          avatarUrl: user?.avatar_url || "https://github.com/sis0n.png",
          bio: user?.bio || "Computer Science Student | Backend Developer",
          publicRepositories: user?.public_repos ?? 12,
          followers: user?.followers ?? 5,
          lifetimeCommits,
          currentYearCommits,
          createdAt: user?.created_at || "2023-06-20T00:00:00Z",
          totalPerYear,
          contributions,
          repositories: [
            { name: "LibSys-v3", stargazerCount: 2, forkCount: 1, primaryLanguage: { name: "PHP", color: "#777bb4" } },
            { name: "BorrowHub", stargazerCount: 3, forkCount: 2, primaryLanguage: { name: "Java", color: "#888888" } },
            { name: "BagyoAlerto", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "JavaScript", color: "#a1a1aa" } },
            { name: "Portfolio-v2", stargazerCount: 1, forkCount: 0, primaryLanguage: { name: "TypeScript", color: "#71717a" } }
          ]
        });
      } catch (err) {
        console.error("Failed to fetch live GitHub contributions", err);
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
            {/* Live Status Pill & Subtitle */}
            <RevealText delay={0.05}>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 mb-4">
                <div className="font-pixel text-[13px] text-zinc-500 dark:text-zinc-400 tracking-tight inline-flex items-center gap-2">
                  <span>[AI-NATIVE SOFTWARE ENGINEER]</span>
                  <span className="opacity-40">•</span>
                  <span>[4TH YEAR CS STUDENT]</span>
                </div>
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Open for Internships & Junior Roles</span>
                </div>
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
                4th Year Computer Science student at <span className="font-semibold text-zinc-950 dark:text-white">University of Caloocan City</span> and <span className="font-semibold text-zinc-950 dark:text-white">AI-Native Software Engineer</span> leveraging modern AI workflows, agentic tooling, and clean architecture to build and ship production software rapidly.
              </p>
              <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-500">
                Focused on core backend logic, structured relational databases, and rigorous code verification standards — driven by discipline both in engineering and fitness.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3"
            >
              <button 
                onClick={openHireModal} 
                className="w-full sm:w-auto bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-7 py-3.5 rounded-full font-mono text-xs uppercase tracking-widest font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 shadow-md"
              >
                Get In Touch
              </button>

              <div className="relative w-full sm:w-auto">
                <button
                  onClick={handleCopyEmail}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-zinc-800 dark:text-zinc-200 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all font-mono text-xs uppercase tracking-wider group shadow-xs active:scale-95"
                  title="Copy email address"
                >
                  {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-zinc-400 group-hover:text-zinc-950 dark:group-hover:text-white transition-colors" />}
                  <span>{copiedEmail ? "Copied!" : "Copy Email"}</span>
                </button>
                <AnimatePresence>
                  {copiedEmail && (
                    <motion.div
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: -4, scale: 1 }}
                      exit={{ opacity: 0, y: 4, scale: 0.95 }}
                      className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none"
                    >
                      Copied {contact.email}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              
              <div className="flex items-center gap-2.5">
                <a 
                  href={contact.github} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all active:scale-95"
                  aria-label="GitHub Profile"
                  title="GitHub Profile"
                >
                  <Github size={17} />
                </a>
                <a 
                  href={contact.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-3 rounded-full border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all active:scale-95"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn Profile"
                >
                  <Linkedin size={17} />
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

      {/* 2. SELECTED WORK / PROJECTS SECTION */}
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
                    <h3 className="text-base font-semibold mb-2 tracking-tight text-zinc-950 dark:text-white leading-snug">
                      {project.title}
                    </h3>

                    {/* Concrete Engineering Metrics */}
                    {project.metrics && project.metrics.length > 0 && (
                      <div className="grid grid-cols-2 gap-2 mb-3.5 p-2.5 rounded-2xl bg-zinc-100/80 dark:bg-zinc-800/50 border border-zinc-200/60 dark:border-zinc-800">
                        {project.metrics.slice(0, 2).map((m, mIdx) => (
                          <div key={mIdx} className="min-w-0">
                            <span className="block text-[8px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold truncate">
                              {m.label}
                            </span>
                            <span className="text-[10px] font-mono font-medium text-zinc-800 dark:text-zinc-200 truncate block">
                              {m.value}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-6 font-normal">
                      {project.shortDescription || project.description}
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

      {/* 3. TECH STACK SECTION */}
      <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
              [02] TECHNICAL STACK
            </div>
            <RevealText>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Core Technologies
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

      {/* 4. OPEN SOURCE & GITHUB ACTIVITY SECTION */}
      {!githubLoading && githubData && (
        <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
          <div className="max-w-7xl mx-auto">
            <div className="mb-14">
              <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
                [03] OPEN SOURCE & CODE ACTIVITY
              </div>
              <RevealText>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                  Engineering Consistency
                </h2>
              </RevealText>
            </div>

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

              {/* 365-Day & Lifetime Real Heatmap Grid */}
              <div className="mt-10 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                <ContributionHeatmap 
                  contributions={githubData.contributions} 
                  totalPerYear={githubData.totalPerYear} 
                />
              </div>

              {/* Footer Row */}
              <div className="mt-8 pt-6 border-t border-zinc-200 dark:border-zinc-800 text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Lifetime Commits: <span className="font-bold text-zinc-950 dark:text-white">{githubData.lifetimeCommits}</span> since {new Date(githubData.createdAt).getFullYear()}
              </div>

            </div>
          </div>
        </section>
      )}

      {/* 5. ACADEMIC & HACKATHONS SECTION */}
      <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
              [04] ACADEMIC & HACKATHONS
            </div>
            <RevealText>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-zinc-950 dark:text-white">
                Education & Build Sprints
              </h2>
            </RevealText>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Education Card */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                    Formal Education
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/60 dark:border-zinc-700/60 font-semibold">
                    2023 – Present
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight mb-1">
                  University of Caloocan City
                </h3>
                <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-4 font-semibold">
                  Bachelor of Science in Computer Science (4th Year Senior)
                </div>
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-6 font-normal">
                  Focused on computer science fundamentals, data structures, relational database management systems, and clean architectural design patterns.
                </p>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>Location: Caloocan City, PH</span>
                <span className="font-semibold text-zinc-950 dark:text-white">4th Year Senior Standing</span>
              </div>
            </div>

            {/* Hackathons & Competitions Card */}
            <div className="p-8 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 font-semibold">
                    Hackathons & Competitions
                  </span>
                  <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 font-semibold">
                    Sprint Builds
                  </span>
                </div>
                <h3 className="text-lg font-bold text-zinc-950 dark:text-white tracking-tight mb-4">
                  Competitive Engineering
                </h3>
                
                <div className="space-y-3">
                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-semibold text-xs text-zinc-950 dark:text-white">
                        APPCON 2026: AI Matsuri Hackathon
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">2026</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                      Engineered <span className="font-semibold text-zinc-900 dark:text-zinc-200">SpecMatch AI</span> with Team Code Titans. Completed full-stack Laravel + Gemini API integration within a 24-hour development sprint.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-zinc-50 dark:bg-zinc-800/40 border border-zinc-200/60 dark:border-zinc-800">
                    <div className="flex justify-between items-start gap-2 mb-1">
                      <span className="font-semibold text-xs text-zinc-950 dark:text-white">
                        CodeSprout 2025 Hackathon
                      </span>
                      <span className="text-[9px] font-mono text-zinc-400">2025</span>
                    </div>
                    <p className="text-[11px] text-zinc-500 dark:text-zinc-400 leading-snug">
                      Developed <span className="font-semibold text-zinc-900 dark:text-zinc-200">BagyoAlerto</span>, an offline-first PWA with Service Worker cache strategies and OpenWeather telemetry for disaster resilience.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400 mt-4">
                <span>Rapid Prototyping</span>
                <span className="font-semibold text-zinc-950 dark:text-white">Production Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RECENT WRITINGS / BLOG SECTION */}
      <section className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-10 flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <div>
              <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-2">
                [05] WRITINGS & NOTES
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

      {/* 7. CALL TO ACTION / CONTACT */}
      <section id="contact" className={`relative ${sectionPadding} border-t border-zinc-200/80 dark:border-zinc-900 py-28 md:py-36`}>
        <div className="max-w-5xl mx-auto text-center">
          <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-4">
            [06] COLLABORATION
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
            <div className="relative w-full sm:w-auto">
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-full font-mono text-xs uppercase tracking-widest border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-zinc-700 dark:text-zinc-300 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all"
                title="Copy email to clipboard"
              >
                {copiedEmail ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} className="text-zinc-400" />}
                <span>{copiedEmail ? "Copied!" : contact.email}</span>
              </button>
              <AnimatePresence>
                {copiedEmail && (
                  <motion.div
                    initial={{ opacity: 0, y: 6, scale: 0.95 }}
                    animate={{ opacity: 1, y: -4, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute -top-7 left-1/2 -translate-x-1/2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 text-[10px] font-mono px-2 py-0.5 rounded shadow-lg whitespace-nowrap z-20 pointer-events-none"
                  >
                    Copied to clipboard!
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;

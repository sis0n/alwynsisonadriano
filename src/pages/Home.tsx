import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Github, 
  Linkedin, 
  MapPin,
  ArrowUpRight,
  Database,
  Cpu,
  Terminal,
  ExternalLink,
  Layout as LayoutIcon
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { useTheme } from '../context/ThemeContext';
import { useUI } from '../context/UIContext';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import gradPhoto from '../assets/grad.png';

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
const GlowCard: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
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
      whileHover={{ y: -5 }}
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

const Home: React.FC = () => {
  const { name, summary, skillCategories, projects, contact } = portfolioData;
  const { theme } = useTheme();
  const { openHireModal } = useUI();
  
  const sectionPadding = "py-20 md:py-32 px-6 md:px-20";

  return (
    <div className="bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-blue-500/30 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-screen relative overflow-hidden flex flex-col px-6 md:px-20 pb-12 lg:pb-0">
        <div className="flex-1 flex items-center pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
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
                className="text-lg md:text-xl text-slate-500 dark:text-slate-400 mb-12 max-w-lg leading-relaxed font-medium"
              >
                Building robust systems and efficient architectures. Specialized in PHP/Laravel and modern web logic.
              </motion.p>
              
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 md:gap-10"
              >
                <button onClick={openHireModal} className="group relative bg-slate-950 dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-bold overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl">
                   <span className="relative z-10 uppercase tracking-[0.2em] text-[11px]">Work with me</span>
                   <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                </button>
                <div className="flex gap-6 md:gap-8">
                  <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all"><Github size={24} /></a>
                  <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all"><Linkedin size={24} /></a>
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

      {/* 2. PROJECTS SECTION */}
      <section id="projects" className={`transition-colors relative ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center md:text-left">
            <RevealText>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-slate-950 dark:text-white leading-none">Selected Work.</h2>
            </RevealText>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 60 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-2 bg-blue-600 rounded-full mx-auto md:mx-0"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, idx) => (
              <GlowCard 
                key={idx}
                className="bg-white dark:bg-slate-900/50 p-8 rounded-[2rem] border border-slate-200/60 dark:border-slate-800/60 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-xl dark:shadow-none min-h-[420px] flex flex-col"
              >
                <div className="flex-1">
                  <div className="mb-6 text-blue-600 bg-blue-600/5 w-12 h-12 rounded-xl flex items-center justify-center">
                    {project.title.toLowerCase().includes('lib') ? <Database size={24} /> : 
                     project.title.toLowerCase().includes('bagyo') ? <Cpu size={24} /> : 
                     <Terminal size={24} />}
                  </div>
                  <h3 className="text-lg font-black mb-3 uppercase tracking-tight text-slate-950 dark:text-white leading-tight">
                    {project.title}
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6 italic line-clamp-4">
                    {project.description}
                  </p>
                </div>
                
                <div className="pt-6 border-t border-slate-50 dark:border-slate-800/50 mt-auto">
                  <div className="flex flex-wrap gap-1.5 mb-6 h-12 items-start overflow-hidden">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[8px] font-black px-2.5 py-1 bg-slate-100 dark:bg-slate-800 rounded-lg text-slate-700 dark:text-slate-400 uppercase tracking-wider border border-slate-200/50 dark:border-transparent">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div>
                    {project.link && (
                      <a 
                        href={project.link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="group/link inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.2em] text-blue-600 hover:text-blue-700 transition-colors"
                      >
                        Source <ArrowUpRight size={12} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className={`relative ${sectionPadding}`}>
        <div className="max-w-4xl mx-auto">
          <RevealText className="mb-10">
            <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Who I Am</h2>
          </RevealText>
          <RevealText className="mb-12" delay={0.1}>
            <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-950 dark:text-white">
              Focusing on the <span className="text-blue-600 italic">Core logic</span> that powers modern applications.
            </p>
          </RevealText>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.3 }}
            className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium"
          >
            {summary}
          </motion.p>
        </div>
      </section>

      {/* 4. TOOLS SECTION */}
      <section className={`relative ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-16 gap-8">
            <div className="max-w-2xl text-center md:text-left mx-auto md:mx-0">
              <RevealText className="mb-6">
                <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Tech Ecosystem</h2>
              </RevealText>
              <RevealText delay={0.1}>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase leading-none">
                  The Stack <span className="text-slate-300 dark:text-slate-800">.</span>
                </h3>
              </RevealText>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="text-slate-500 dark:text-slate-400 font-medium italic max-w-xs text-sm border-l-2 border-blue-600 pl-6 transition-colors"
            >
              My core technical foundation for building scalable backend systems.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {skillCategories.map((cat, idx) => (
              <GlowCard 
                key={idx}
                className="relative p-10 rounded-[3rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-2xl dark:shadow-none h-full"
              >
                <div className="mb-10 w-14 h-14 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {cat.title.toLowerCase().includes('backend') ? <Database size={28} /> : 
                   cat.title.toLowerCase().includes('frontend') ? <LayoutIcon size={28} /> : 
                   cat.title.toLowerCase().includes('database') ? <Cpu size={28} /> :
                   <Terminal size={28} />}
                </div>

                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Category 0{idx + 1}</h4>
                <h3 className="text-xl font-black text-slate-950 dark:text-white mb-8 uppercase tracking-tight">{cat.title}</h3>

                <ul className="space-y-4">
                  {cat.skills.map((skill, sIdx) => (
                    <li key={sIdx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-bold text-sm group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                      <div className="w-2 h-2 rounded-full bg-blue-600/20 group-hover:bg-blue-600 transition-colors" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </GlowCard>
            ))}
          </div>
        </div>
      </section>

      {/* 5. GITHUB ACTIVITY SECTION */}
      <section className={`relative ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-16">
            <div className="flex-1 text-center md:text-left">
              <RevealText className="mb-6">
                <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase">Open Source</h2>
              </RevealText>
              <RevealText delay={0.1}>
                <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase leading-none">
                  Code Activity <span className="text-slate-300 dark:text-slate-800">.</span>
                </h3>
              </RevealText>
            </div>
            <div className="flex-1 max-w-lg">
              <p className="text-slate-500 dark:text-slate-400 font-medium italic text-lg leading-relaxed border-l-2 border-blue-600 pl-6">
                "Code is like humor. When you have to explain it, it's bad." — Always pushing updates to my GitHub ecosystem.
              </p>
            </div>
          </div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="w-full bg-white dark:bg-slate-900/20 border border-slate-100 dark:border-slate-800/50 rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-10 hover:border-blue-600/20 transition-all duration-700"
          >
            <div className="flex items-center gap-8">
              <div className="w-20 h-20 rounded-3xl bg-blue-600/10 flex items-center justify-center text-blue-600">
                <Github size={40} />
              </div>
              <div>
                <h4 className="text-2xl font-black text-slate-950 dark:text-white mb-1 uppercase tracking-tight">GitHub Portfolio</h4>
                <p className="text-slate-500 dark:text-slate-400 font-medium uppercase tracking-[0.1em] text-[10px]">@{contact.github.split('/').pop()}</p>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-12 text-center md:text-left">
              <div>
                <div className="text-3xl font-black text-slate-950 dark:text-white">50+</div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Repositories</div>
              </div>
              <div>
                <div className="text-3xl font-black text-slate-950 dark:text-white">Active</div>
                <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">Coding Status</div>
              </div>
              <a 
                href={contact.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-slate-950 dark:bg-white text-white dark:text-black px-10 py-5 rounded-full font-black uppercase tracking-[0.1em] text-[10px] hover:scale-105 transition-all shadow-xl active:scale-95 flex items-center gap-3"
              >
                Follow on Github <ExternalLink size={14} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. CALL TO ACTION SECTION */}
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
                className="flex flex-wrap justify-center md:justify-start gap-8 mt-12"
              >
                 <button 
                   onClick={openHireModal}
                   className="group relative bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] text-[10px] overflow-hidden transition-all hover:scale-105 shadow-2xl active:scale-95"
                 >
                   <span className="relative z-10">Hire Me</span>
                   <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                 </button>
                 <div className="flex items-center gap-10 px-4">
                   <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all uppercase text-[10px] font-black tracking-widest">Github</a>
                   <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white hover:scale-110 transition-all uppercase text-[10px] font-black tracking-widest">Linkedin</a>
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
                className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 italic"
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

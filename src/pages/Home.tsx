import React from 'react';
import { motion } from 'framer-motion';
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

const Home: React.FC = () => {
  const { name, summary, skillCategories, projects, contact } = portfolioData;
  const { theme } = useTheme();
  const { openHireModal } = useUI();
  const location = useLocation();
  const navigate = useNavigate();

  const sectionVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  // Consistent section padding class
  const sectionPadding = "pt-32 md:pt-40 pb-32 px-6 md:px-20";

  return (
    <div className="bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-200 transition-colors duration-500 font-sans selection:bg-blue-500/30 scroll-smooth">
      
      {/* 1. HERO SECTION */}
      <section className={`min-h-screen relative overflow-hidden flex flex-col ${sectionPadding}`}>
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-start relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="pt-4"
          >
            <h2 className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase text-sm mb-6">
              3rd Year Computer Science Student
            </h2>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] text-slate-950 dark:text-white mb-8 uppercase">
              {name} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">BACKEND DEV.</span>
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-10 max-w-lg leading-relaxed">
              Building robust systems and efficient architectures. Specialized in PHP/Laravel and modern web logic.
            </p>
            <div className="flex items-center gap-6">
              <button onClick={openHireModal} className="bg-slate-950 dark:bg-white text-white dark:text-black px-8 py-4 rounded-full font-bold transition-transform hover:scale-105">
                Contact Me
              </button>
              <div className="flex gap-4">
                <a href={contact.github} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"><Github size={24} /></a>
                <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors"><Linkedin size={24} /></a>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative lg:pt-10"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-br from-blue-600 to-indigo-600 overflow-hidden shadow-2xl shadow-blue-500/10">
              <img 
                src={gradPhoto} 
                alt={name}
                className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION */}
      <section id="projects" className={`bg-slate-50 dark:bg-[#080808] border-y border-slate-100 dark:border-slate-900 transition-colors relative ${sectionPadding}`}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
        >
          <div className="mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4 text-slate-950 dark:text-white leading-none">Selected Work.</h2>
            <div className="w-20 h-1.5 bg-blue-600"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {projects.map((project, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -10 }}
                className="group bg-white dark:bg-slate-900/50 p-8 rounded-[2.5rem] border border-slate-200 dark:border-slate-800 hover:border-blue-500/30 transition-all flex flex-col justify-between h-full shadow-sm hover:shadow-xl dark:shadow-none"
              >
                <div>
                  <div className="mb-6 text-blue-600">
                    {project.title.toLowerCase().includes('lib') ? <Database size={32} /> : 
                     project.title.toLowerCase().includes('bagyo') ? <Cpu size={32} /> : 
                     <Terminal size={32} />}
                  </div>
                  <h3 className="text-xl font-black mb-3 uppercase tracking-tight text-slate-950 dark:text-white">{project.title}</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-xs leading-relaxed mb-6 italic">
                    {project.description}
                  </p>
                </div>
                <div>
                  <div className="flex flex-wrap gap-1 mb-6">
                    {project.technologies.slice(0, 3).map((tech, tIdx) => (
                      <span key={tIdx} className="text-[8px] font-black px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 uppercase">
                        {tech}
                      </span>
                    ))}
                  </div>
                  {project.link && (
                    <a 
                      href={project.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      View Source <ArrowUpRight size={14} />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 3. ABOUT SECTION */}
      <section id="about" className={`relative ${sectionPadding}`}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-12">Who I Am</h2>
          <p className="text-3xl md:text-5xl font-bold tracking-tight leading-tight text-slate-950 dark:text-white mb-12">
            Focusing on the <span className="text-blue-600 italic">Core logic</span> that powers modern applications.
          </p>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            {summary}
          </p>
        </motion.div>
      </section>

      {/* 4. TOOLS SECTION */}
      <section className={`overflow-hidden bg-slate-50/50 dark:bg-[#080808] transition-colors border-y border-slate-100 dark:border-slate-900 relative ${sectionPadding}`}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-6">Tech Ecosystem</h2>
              <h3 className="text-4xl md:text-6xl font-black tracking-tighter text-slate-950 dark:text-white uppercase leading-none">
                The Stack <span className="text-slate-300 dark:text-slate-800">.</span>
              </h3>
            </div>
            <p className="text-slate-500 dark:text-slate-400 font-medium italic max-w-xs text-sm border-l-2 border-blue-600 pl-4 transition-colors">
              My core technical foundation for building scalable backend systems.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((cat, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -8 }}
                className="relative group p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 dark:shadow-none overflow-hidden"
              >
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-colors" />

                <div className="relative z-10">
                  <div className="mb-8 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                    {cat.title.toLowerCase().includes('backend') ? <Database size={24} /> : 
                     cat.title.toLowerCase().includes('frontend') ? <LayoutIcon size={24} /> : 
                     cat.title.toLowerCase().includes('database') ? <Cpu size={24} /> :
                     <Terminal size={24} />}
                  </div>

                  <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-2">Category 0{idx + 1}</h4>
                  <h3 className="text-xl font-black text-slate-950 dark:text-white mb-6 uppercase tracking-tight">{cat.title}</h3>

                  <ul className="space-y-3">
                    {cat.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="flex items-center gap-3 text-slate-600 dark:text-slate-400 font-medium text-sm group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600/30 group-hover:bg-blue-600 transition-colors" />
                        {skill}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* 5. CALL TO ACTION SECTION */}
      <section id="contact" className={`overflow-hidden bg-slate-50 dark:bg-[#080808] text-slate-950 dark:text-white relative border-t border-slate-100 dark:border-slate-900 transition-colors pb-48 pt-48 md:pt-60 md:pb-60 px-6 md:px-20`}>
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={sectionVariants}
          className="max-w-7xl mx-auto relative z-10"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-20">
            <div className="text-center md:text-left flex-1">
              <h2 className="text-blue-600 font-black text-xs tracking-[0.4em] uppercase mb-8">Ready to start?</h2>
              <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85] mb-12">
                Let's work <br />
                <span className="text-slate-400 dark:text-slate-500 italic">on something</span> <br />
                Together<span className="text-blue-600">.</span>
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mt-12">
                 <button 
                   onClick={openHireModal}
                   className="group flex items-center gap-4 bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all duration-500 shadow-xl"
                 >
                   Hire Me <ArrowUpRight size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                 </button>
                 <div className="flex items-center gap-8 px-4">
                   <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Github</a>
                   <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors uppercase text-[10px] font-black tracking-widest">Linkedin</a>
                 </div>
              </div>
            </div>

            <div className="hidden lg:block w-[1px] h-64 bg-slate-200 dark:bg-slate-800 transition-colors" />

            <div className="flex-1 text-center md:text-left max-w-sm">
              <p className="text-xl text-slate-500 dark:text-slate-400 leading-relaxed mb-8 italic">
                "I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision."
              </p>
              <div className="space-y-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-blue-600">Currently Based In</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white">{contact.location}</div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

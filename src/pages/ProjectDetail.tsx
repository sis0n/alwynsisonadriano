import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight,
  Code2, 
  Github, 
  ExternalLink,
  Layers,
  AlertCircle,
  CheckCircle2,
  Terminal,
  Cpu,
  Database
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = portfolioData.projects.find(p => p.id === id);
  const currentIndex = portfolioData.projects.findIndex(p => p.id === id);
  const prevProject = currentIndex > 0 ? portfolioData.projects[currentIndex - 1] : null;
  const nextProject = currentIndex < portfolioData.projects.length - 1 ? portfolioData.projects[currentIndex + 1] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="pt-40 text-center min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
        <h1 className="text-3xl font-black tracking-tight mb-4 uppercase">Project not found.</h1>
        <Link to="/" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-white font-mono text-xs uppercase tracking-wider underline">
          Back to home
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-28 md:pt-36 pb-32 px-6 md:px-16 min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Link 
            to="/#projects" 
            className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-10 font-mono text-xs uppercase tracking-wider"
          >
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header Section */}
        <header className="mb-16">
          {project.image ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full h-[35vh] md:h-[50vh] rounded-3xl overflow-hidden mb-12 border border-zinc-200 dark:border-zinc-800 shadow-xl bg-zinc-100 dark:bg-zinc-900/60 flex items-center justify-center p-6 md:p-10"
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="max-w-full max-h-full object-contain rounded-xl transition-transform duration-500 hover:scale-[1.02]" 
              />
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
              className="w-full h-[26vh] md:h-[32vh] rounded-3xl overflow-hidden mb-12 border border-zinc-200 dark:border-zinc-800 shadow-xl bg-gradient-to-br from-zinc-100 via-zinc-100/70 to-zinc-200/50 dark:from-zinc-900 dark:via-zinc-900/70 dark:to-zinc-950 flex flex-col items-center justify-center p-6 md:p-10 relative"
            >
              <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center text-zinc-950 dark:text-white shadow-sm mb-4">
                {project.id === 'specmatch' || project.title.toLowerCase().includes('spec') ? <Cpu size={32} /> :
                 project.title.toLowerCase().includes('lib') ? <Database size={32} /> : 
                 project.title.toLowerCase().includes('bagyo') ? <Cpu size={32} /> : 
                 <Terminal size={32} />}
              </div>
              <span className="font-pixel text-[13px] text-zinc-500 dark:text-zinc-400 tracking-tight">
                {project.id === 'specmatch' ? '[AI SPECIFICATION MATCHING PLATFORM]' : '[STATE MACHINE ARCHITECTURE]'}
              </span>
            </motion.div>
          )}

          <div className="flex flex-wrap items-center gap-2.5 mb-6">
            <span className="text-[12px] font-pixel px-3 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-full border border-zinc-200 dark:border-zinc-700 tracking-tight">
              [PROJECT]
            </span>
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-[10px] font-mono px-3 py-1 bg-white dark:bg-zinc-900 rounded-full text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-800 uppercase tracking-wider">
                {tech}
              </span>
            ))}
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight text-zinc-950 dark:text-white mb-6"
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start border-t border-zinc-200/80 dark:border-zinc-800 pt-8"
          >
            <div className="md:col-span-8">
              <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-3">
                [OVERVIEW]
              </div>
              <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
                {project.description}
              </p>
            </div>

            <div className="md:col-span-4 flex flex-col gap-3">
              {project.liveLink && (
                <a 
                  href={project.liveLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-6 py-3.5 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold transition-all hover:bg-zinc-800 dark:hover:bg-zinc-200 active:scale-95 shadow-md"
                >
                  <span>Live Demo</span>
                  <ExternalLink size={15} />
                </a>
              )}
              {project.link && (
                <a 
                  href={project.link} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center justify-between bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-950 dark:text-white px-6 py-3.5 rounded-2xl font-mono text-xs uppercase tracking-wider font-bold transition-all hover:border-zinc-400 dark:hover:border-zinc-600 active:scale-95 shadow-xs"
                >
                  <span>Source Code</span>
                  <Github size={15} />
                </a>
              )}
            </div>
          </motion.div>
        </header>

        {/* Concrete Engineering Metrics */}
        {project.metrics && project.metrics.length > 0 && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 p-6 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 shadow-sm"
          >
            {project.metrics.map((m, idx) => (
              <div key={idx} className="flex flex-col">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 dark:text-zinc-500 mb-1 font-semibold">
                  {m.label}
                </span>
                <span className="text-sm font-semibold font-mono text-zinc-950 dark:text-white">
                  {m.value}
                </span>
              </div>
            ))}
          </motion.div>
        )}

        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-16">
          {/* Architecture */}
          {project.architecture && (
            <motion.section 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col"
            >
              <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700">
                <Layers size={20} />
              </div>
              <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white mb-3">
                Architecture & System Design
              </h3>
              <p className="text-zinc-600 dark:text-zinc-400 text-xs sm:text-sm leading-relaxed mb-6">
                {project.architecture}
              </p>
              {project.highlights && project.highlights.length > 0 && (
                <div className="mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/80">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 mb-2">Key Highlights</div>
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="text-[10px] font-mono px-2.5 py-1 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-md">
                        {h}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </motion.section>
          )}

          {/* Languages & Technologies List */}
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white dark:bg-zinc-900/40 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col"
          >
            <div className="w-10 h-10 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-950 dark:text-white flex items-center justify-center mb-6 border border-zinc-200 dark:border-zinc-700">
              <Code2 size={20} />
            </div>
            <h3 className="text-base font-semibold tracking-tight text-zinc-950 dark:text-white mb-4">
              Languages & Tech Stack
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.technologies.map((tech, i) => (
                <div 
                  key={i} 
                  className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-zinc-50 dark:bg-zinc-950 border border-zinc-200/80 dark:border-zinc-800/80 text-xs font-mono font-medium text-zinc-900 dark:text-zinc-200"
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600" />
                  <span>{tech}</span>
                </div>
              ))}
            </div>
          </motion.section>
        </div>

        {/* Challenges & Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16"
          >
            <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-3">
              [ENGINEERING NOTES]
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-zinc-950 dark:text-white mb-6">
              Challenges & Solutions
            </h3>
            
            <div className="space-y-4">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-6 p-7 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400 font-mono text-[11px] uppercase tracking-wider">
                      <AlertCircle size={14} /> Problem Encountered
                    </div>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-200 leading-snug">
                      {challenge.problem}
                    </p>
                  </div>
                  <div className="space-y-2 md:border-l border-zinc-200 dark:border-zinc-800 md:pl-6">
                    <div className="flex items-center gap-2 text-zinc-950 dark:text-white font-mono text-[11px] uppercase tracking-wider font-bold">
                      <CheckCircle2 size={14} /> Engineering Solution
                    </div>
                    <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Next / Previous Project Navigation */}
        <div className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {prevProject ? (
              <Link 
                to={`/project/${prevProject.id}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col items-start"
              >
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:-translate-x-1 transition-transform">
                  <ArrowLeft size={12} /> Previous Project
                </span>
                <span className="font-bold text-sm text-zinc-950 dark:text-white uppercase truncate w-full">
                  {prevProject.title.split('—')[0].trim()}
                </span>
              </Link>
            ) : (
              <div />
            )}

            {nextProject ? (
              <Link 
                to={`/project/${nextProject.id}`}
                className="group p-5 rounded-2xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all flex flex-col items-end sm:text-right"
              >
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider mb-1 flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Next Project <ArrowRight size={12} />
                </span>
                <span className="font-bold text-sm text-zinc-950 dark:text-white uppercase truncate w-full">
                  {nextProject.title.split('—')[0].trim()}
                </span>
              </Link>
            ) : (
              <div />
            )}
          </div>

          <div className="mt-8 flex justify-center">
            <Link to="/#projects" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-white font-mono text-xs uppercase tracking-wider transition-colors">
              ← Return to All Projects
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ProjectDetail;

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowLeft, 
  Database, 
  Cpu, 
  Terminal, 
  Globe, 
  Github, 
  ExternalLink,
  Code,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { portfolioData } from '../data/portfolioData';

const ProjectDetail: React.FC = () => {
  const { id } = useParams();
  const project = portfolioData.projects.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h1 className="text-4xl font-black tracking-tighter mb-8 text-slate-950 dark:text-white uppercase">Project not found.</h1>
        <Link to="/" className="text-blue-600 font-black uppercase tracking-widest text-[10px] hover:underline transition-all">Back to home</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-20 min-h-screen bg-white dark:bg-[#050505] text-slate-900 dark:text-slate-200 transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        {/* Back Link */}
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link to="/#projects" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 uppercase text-[10px] font-black tracking-[0.2em]">
            <ArrowLeft size={14} /> Back to Projects
          </Link>
        </motion.div>

        {/* Header Section */}
        <header className="mb-20">
          {project.image && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
              className="w-full h-[40vh] md:h-[60vh] rounded-[3rem] overflow-hidden mb-16 border border-slate-100 dark:border-slate-800 shadow-2xl bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-4 md:p-12"
            >
              <img src={project.image} alt={project.title} className="max-w-full max-h-full object-contain rounded-xl md:rounded-2xl" />
            </motion.div>
          )}

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-blue-600 mb-8"
          >
            <span className="px-3 py-1 bg-blue-600/5 rounded-full border border-blue-600/10">Case Study</span>
            <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
            <span className="text-slate-400 font-bold">{project.technologies[0]}</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white mb-8 uppercase"
          >
            {project.title}
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {project.technologies.map((tech, i) => (
              <span key={i} className="text-[10px] font-black px-4 py-2 bg-slate-50 dark:bg-slate-900 rounded-xl text-slate-600 dark:text-slate-400 uppercase tracking-widest border border-slate-100 dark:border-slate-800/50">
                {tech}
              </span>
            ))}
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2 }}
             className="grid grid-cols-1 md:grid-cols-3 gap-12"
          >
            <div className="md:col-span-2">
               <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Overview</h3>
               <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
                 {project.description}
               </p>
            </div>
            <div className="flex flex-col gap-6 justify-end">
               {project.liveLink && (
                 <a 
                   href={project.liveLink} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="group flex items-center justify-between bg-blue-600 text-white px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-[1.02] active:scale-95 shadow-xl shadow-blue-600/20"
                 >
                   Live Preview <ExternalLink size={18} />
                 </a>
               )}
               {project.link && (
                 <a 
                   href={project.link} 
                   target="_blank" 
                   rel="noopener noreferrer" 
                   className="group flex items-center justify-between bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-8 py-5 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all hover:scale-[1.02] active:scale-95 shadow-xl"
                 >
                   View Source Code <Github size={18} />
                 </a>
               )}
            </div>
          </motion.div>
        </header>

        {/* Technical Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          {/* Architecture */}
          {project.architecture && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-8">
                <Layers size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 dark:text-white mb-6">Architecture</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
                {project.architecture}
              </p>
            </motion.section>
          )}

          {/* Database Schema */}
          {project.databaseSchema && (
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-slate-50 dark:bg-slate-900/50 p-10 rounded-[2.5rem] border border-slate-100 dark:border-slate-800/50"
            >
              <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center mb-8">
                <Database size={24} />
              </div>
              <h3 className="text-xl font-black uppercase tracking-tight text-slate-950 dark:text-white mb-6">Database Schema</h3>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-mono text-sm bg-white dark:bg-slate-950 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                {project.databaseSchema}
              </p>
            </motion.section>
          )}
        </div>

        {/* Challenges & Solutions */}
        {project.challenges && project.challenges.length > 0 && (
          <motion.section 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 mb-12 text-center md:text-left">Challenges & Solutions</h3>
            <div className="space-y-6">
              {project.challenges.map((challenge, i) => (
                <div key={i} className="group grid grid-cols-1 md:grid-cols-2 gap-8 p-10 rounded-[2.5rem] bg-white dark:bg-transparent border border-slate-100 dark:border-slate-800/50 hover:border-blue-600/30 transition-all">
                  <div>
                    <div className="flex items-center gap-3 text-red-500 mb-4">
                       <ShieldCheck size={18} className="rotate-180" />
                       <span className="text-[10px] font-black uppercase tracking-widest">The Problem</span>
                    </div>
                    <p className="text-lg font-bold text-slate-900 dark:text-slate-200 leading-snug">
                      {challenge.problem}
                    </p>
                  </div>
                  <div className="md:border-l border-slate-100 dark:border-slate-800/50 md:pl-8">
                    <div className="flex items-center gap-3 text-green-500 mb-4">
                       <Zap size={18} />
                       <span className="text-[10px] font-black uppercase tracking-widest">The Solution</span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed italic">
                      {challenge.solution}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.section>
        )}

        {/* Footer Navigation */}
        <div className="mt-32 pt-12 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
           <Link to="/#projects" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">
              ← All Projects
           </Link>
           <Link to="/resume" className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-blue-600 transition-colors">
              View Resume →
           </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;

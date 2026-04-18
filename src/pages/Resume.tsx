import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Download, ArrowLeft, Mail, Linkedin, Github, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';

const Resume: React.FC = () => {
  const { name, summary, experiences, education, contact, skillCategories } = portfolioData;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-20 px-6 md:px-20 min-h-screen bg-slate-50 dark:bg-[#020202]">
      <div className="max-w-4xl mx-auto">
        {/* Header Actions */}
        <div className="flex justify-between items-center mb-12">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <button 
            onClick={() => window.print()}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 text-sm"
          >
            <Download size={16} /> Print Resume
          </button>
        </div>

        {/* Resume Paper */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-[#0a0a0a] rounded-[2rem] shadow-2xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-8 md:p-16"
        >
          {/* Info Header */}
          <header className="border-b border-slate-100 dark:border-slate-800 pb-12 mb-12 text-slate-950 dark:text-white">
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter uppercase mb-6">{name}</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-500 font-medium">
              <div className="space-y-2">
                <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-blue-600 transition-colors"><Mail size={14}/> {contact.email}</a>
                <div className="flex items-center gap-2"><Phone size={14}/> {contact.phone}</div>
                <div className="flex items-center gap-2"><MapPin size={14}/> {contact.location}</div>
              </div>
              <div className="space-y-2 md:text-right">
                <a href={contact.linkedin} target="_blank" className="flex items-center gap-2 md:justify-end hover:text-blue-600 transition-colors"><Linkedin size={14}/> LinkedIn Profile</a>
                <a href={contact.github} target="_blank" className="flex items-center gap-2 md:justify-end hover:text-blue-600 transition-colors"><Github size={14}/> GitHub Portfolio</a>
              </div>
            </div>
          </header>

          {/* Summary */}
          <section className="mb-12">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-6">Professional Summary</h2>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-4 border-slate-100 dark:border-slate-800 pl-6">
              {summary}
            </p>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12 text-slate-950 dark:text-white">
              {/* Experience */}
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Work Experience</h2>
                <div className="space-y-10">
                  {experiences.map((exp, i) => (
                    <div key={i} className="relative pl-6 border-l-2 border-slate-100 dark:border-slate-800">
                      <div className="absolute w-3 h-3 bg-blue-600 rounded-full -left-[7px] top-1.5 ring-4 ring-white dark:ring-[#0a0a0a]"></div>
                      <div className="text-[10px] font-black font-mono text-slate-400 mb-1 tracking-widest">{exp.period}</div>
                      <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                      <div className="text-blue-600 font-bold text-sm mb-4 uppercase tracking-tight">{exp.company}</div>
                      <ul className="space-y-2">
                        {exp.responsibilities.map((res, ri) => (
                          <li key={ri} className="text-sm text-slate-500 dark:text-slate-400 leading-snug">
                            • {res}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Education */}
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Education</h2>
                <div className="space-y-8">
                  {education.map((edu, i) => (
                    <div key={i}>
                      <h3 className="text-lg font-bold">{edu.degree}</h3>
                      <div className="text-slate-500 text-sm">{edu.institution}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase mt-1 tracking-widest">{edu.period} // {edu.location}</div>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            <div className="space-y-12">
              {/* Skills Sidebar */}
              <section>
                <h2 className="text-xs font-black uppercase tracking-[0.3em] text-blue-600 mb-8">Technical Stack</h2>
                <div className="space-y-8">
                  {skillCategories.map((cat, i) => (
                    <div key={i}>
                      <h3 className="text-[10px] font-black uppercase text-slate-400 mb-3 tracking-widest">{cat.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        {cat.skills.map((skill, si) => (
                          <span key={si} className="text-[10px] font-bold px-3 py-1 bg-slate-50 dark:bg-slate-900 rounded-md border border-slate-100 dark:border-slate-800 text-slate-600 dark:text-slate-400">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Resume;

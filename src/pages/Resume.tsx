import React, { useEffect, useState } from 'react';
import { Download, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { portfolioData } from '../data/portfolioData';

const Resume: React.FC = () => {
  const { name, summary, experiences, education, contact, skillCategories, projects } = portfolioData;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText(contact.phone);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    const originalTitle = document.title;
    document.title = `${name} - Resume`;
    window.print();
    document.title = originalTitle;
  };

  const getCleanUrl = (url: string) => {
    return url.replace(/^https?:\/\/(www\.)?/, '');
  };

  return (
    <div className="pt-28 pb-20 px-4 md:px-16 min-h-screen bg-[#fafafa] dark:bg-[#09090b] transition-colors duration-500 print:bg-white print:min-h-0 print:p-0">
      <style>
        {`
          @media print {
            @page { 
              margin: 0; 
              size: auto;
            }
            
            html, body {
              background-color: white !important;
              margin: 0 !important;
              padding: 0 !important;
            }

            .resume-wrapper {
              padding: 1.5cm !important;
              background-color: white !important;
            }

            nav, footer, .print-hidden, button, .header-actions { 
              display: none !important; 
            }

            .resume-paper { 
              box-shadow: none !important; 
              border: none !important; 
              padding: 0 !important;
              margin: 0 !important;
              width: 100% !important;
              background-color: white !important;
              color: black !important;
            }

            .break-before-page {
              break-before: page !important;
            }

            h1, h2, h3, p, span, li, a, div {
              color: black !important;
            }

            * {
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }
          }
          
          .resume-paper {
            background-color: white !important;
            color: #09090b !important;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif !important;
          }
          .resume-paper a {
            color: #09090b !important;
            text-decoration: underline !important;
            pointer-events: auto !important;
            cursor: pointer !important;
          }
          .section-border {
            border-bottom: 1px solid #d4d4d8 !important;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto print:max-w-none resume-wrapper">
        {/* Header Actions - Hidden on Print */}
        <div className="flex justify-between items-center mb-8 print:hidden font-mono header-actions">
          <Link to="/" className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors text-xs uppercase tracking-wider">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-5 py-2.5 rounded-full font-bold hover:bg-zinc-800 dark:hover:bg-zinc-200 transition shadow-sm text-xs uppercase tracking-wider"
          >
            <Download size={14} /> Print / Download PDF
          </button>
        </div>

        {/* Resume Paper */}
        <div className="resume-paper shadow-2xl border border-zinc-200 dark:border-zinc-800 rounded-2xl p-8 md:p-14 mb-20 mx-auto overflow-hidden relative">
          
          {/* HEADER */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-black uppercase tracking-tight mb-2 text-black">{name}</h1>
            <div className="flex flex-wrap justify-center items-center gap-x-2 text-xs font-mono text-zinc-700">
              <span>{contact.location}</span>
              <span className="opacity-30">•</span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
              <span className="opacity-30">•</span>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer">{getCleanUrl(contact.linkedin)}</a>
              <span className="opacity-30">•</span>
              <a href={contact.github} target="_blank" rel="noopener noreferrer">{getCleanUrl(contact.github)}</a>
              <span className="opacity-30">•</span>
              <div 
                onClick={handleCopyPhone}
                className="cursor-pointer hover:opacity-70 transition-opacity relative"
              >
                {contact.phone}
                <AnimatePresence>
                  {copied && (
                    <motion.span 
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 bg-zinc-950 text-white text-[9px] font-mono px-2 py-0.5 rounded whitespace-nowrap print:hidden"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* SUMMARY */}
          <section className="mb-8">
            <h2 className="section-border font-pixel text-[13px] tracking-tight mb-3 pb-1 text-zinc-950">
              [PROFESSIONAL SUMMARY]
            </h2>
            <p className="text-sm leading-relaxed text-zinc-800">
              {summary}
            </p>
          </section>

          {/* TECHNICAL SKILLS */}
          <section className="mb-8">
            <h2 className="section-border font-pixel text-[13px] tracking-tight mb-3 pb-1 text-zinc-950">
              [TECHNICAL SKILLS]
            </h2>
            <div className="space-y-1 text-sm text-zinc-800">
              {skillCategories.map((cat, i) => (
                <div key={i} className="flex flex-wrap gap-x-2">
                  <span className="font-bold text-zinc-950">{cat.title}:</span>
                  <span className="text-zinc-700">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* SELECTED PROJECTS */}
          <section className="mb-8">
            <h2 className="section-border font-pixel text-[13px] tracking-tight mb-3 pb-1 text-zinc-950">
              [SELECTED PROJECTS]
            </h2>
            <div className="space-y-5">
              {projects.map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold uppercase text-zinc-950">
                      {project.title} <span className="font-normal font-mono text-xs text-zinc-500">[{project.technologies.join(', ')}]</span>
                    </h3>
                  </div>
                  <p className="text-sm leading-relaxed text-zinc-700">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* WORK EXPERIENCE */}
          <section className="mb-8 break-before-page print:mt-[1.5cm]">
            <h2 className="section-border font-pixel text-[13px] tracking-tight mb-3 pb-1 text-zinc-950">
              [EXPERIENCE & PROJECTS]
            </h2>
            <div className="space-y-5 text-zinc-800">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-sm font-bold text-zinc-950 uppercase">{exp.role}</h3>
                    <span className="text-xs font-mono text-zinc-500">{exp.period}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-600 mb-2 uppercase tracking-wide">{exp.company} — {exp.location}</div>
                  <ul className="list-disc ml-5 space-y-1 text-zinc-700">
                    {exp.responsibilities.map((res, ri) => (
                      <li key={ri} className="text-sm leading-relaxed">
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="mb-4">
            <h2 className="section-border font-pixel text-[13px] tracking-tight mb-3 pb-1 text-zinc-950">
              [EDUCATION]
            </h2>
            <div className="space-y-4 text-zinc-800">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-sm font-bold uppercase text-zinc-950">{edu.degree}</h3>
                    <span className="text-xs font-mono text-zinc-500">{edu.period}</span>
                  </div>
                  <div className="text-xs font-mono text-zinc-600">{edu.institution} | {edu.location}</div>
                </div>
              ))}
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default Resume;

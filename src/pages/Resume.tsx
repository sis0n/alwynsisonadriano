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
    <div className="pt-32 pb-20 px-4 md:px-20 min-h-screen bg-slate-50 dark:bg-[#020202] transition-colors duration-500 print:bg-white print:min-h-0 print:p-0">
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
            color: black !important;
            font-family: "Times New Roman", Times, serif !important;
          }
          .resume-paper a {
            color: #2563eb !important;
            pointer-events: auto !important;
            cursor: pointer !important;
          }
          .section-border {
            border-bottom: 1px solid black !important;
          }
        `}
      </style>

      <div className="max-w-4xl mx-auto print:max-w-none resume-wrapper">
        {/* Header Actions - Hidden on Print */}
        <div className="flex justify-between items-center mb-8 print:hidden font-sans header-actions">
          <Link to="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors uppercase text-[10px] font-black tracking-widest">
            <ArrowLeft size={14} /> Back to Home
          </Link>
          <button 
            onClick={handlePrint}
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-full font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/20 text-sm"
          >
            <Download size={16} /> Download PDF
          </button>
        </div>

        {/* Resume Paper */}
        <div className="resume-paper shadow-2xl border border-slate-200 p-8 md:p-16 mb-20 mx-auto overflow-hidden relative">
          
          {/* HEADER */}
          <header className="text-center mb-6">
            <h1 className="text-3xl font-bold uppercase mb-2 tracking-wide text-black">{name}</h1>
            <div className="flex flex-wrap justify-center items-center gap-x-1.5 text-[12px] font-medium leading-tight font-sans text-black">
              <span className="text-black">{contact.location}</span>
              <span className="opacity-40 text-black">|</span>
              <a href={`mailto:${contact.email}`} className="text-blue-600">{contact.email}</a>
              <span className="opacity-40 text-black">|</span>
              <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-600">{getCleanUrl(contact.linkedin)}</a>
              <span className="opacity-40 text-black">|</span>
              <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-blue-600">{getCleanUrl(contact.github)}</a>
              <span className="opacity-40 text-black">|</span>
              <div 
                onClick={handleCopyPhone}
                className="cursor-pointer hover:text-blue-600 transition-colors relative text-black"
              >
                {contact.phone}
                <AnimatePresence>
                  {copied && (
                    <motion.span 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="absolute -top-6 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-[9px] px-2 py-0.5 rounded font-sans whitespace-nowrap print:hidden"
                    >
                      Copied!
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </header>

          {/* SUMMARY */}
          <section className="mb-6">
            <h2 className="section-border text-[14px] font-bold uppercase mb-2 pb-0.5 text-black">Professional Summary</h2>
            <p className="text-[13px] leading-[1.4] text-justify text-black">
              {summary}
            </p>
          </section>

          {/* TECHNICAL SKILLS */}
          <section className="mb-6">
            <h2 className="section-border text-[14px] font-bold uppercase mb-2 pb-0.5 text-black">Technical Skills</h2>
            <div className="space-y-0.5 text-[13px] text-black">
              {skillCategories.map((cat, i) => (
                <div key={i} className="flex flex-wrap gap-x-1.5">
                  <span className="font-bold text-black">{cat.title}:</span>
                  <span className="text-black">{cat.skills.join(', ')}</span>
                </div>
              ))}
            </div>
          </section>

          {/* PROJECTS */}
          <section className="mb-6">
            <h2 className="section-border text-[14px] font-bold uppercase mb-3 pb-0.5 text-black">Selected Projects</h2>
            <div className="space-y-4">
              {projects.map((project, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[13px] font-bold uppercase text-black">
                      {project.title} | <span className="font-normal italic opacity-80 text-black">{project.technologies.join(', ')}</span>
                    </h3>
                  </div>
                  <p className="text-[13px] leading-[1.3] text-justify text-black">
                    {project.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* WORK EXPERIENCE */}
          <section className="mb-6 break-before-page print:mt-[1.5cm]">
            <h2 className="section-border text-[14px] font-bold uppercase mb-3 pb-0.5 text-black">Work Experience</h2>
            <div className="space-y-5 text-black">
              {experiences.map((exp, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[13px] font-bold text-black uppercase">{exp.role}</h3>
                    <span className="text-[12px] font-bold font-sans text-black">{exp.period}</span>
                  </div>
                  <div className="text-[12.5px] font-bold italic mb-1.5 font-sans opacity-70 uppercase tracking-tight text-black">{exp.company} — {exp.location}</div>
                  <ul className="list-disc ml-5 space-y-0.5 text-black">
                    {exp.responsibilities.map((res, ri) => (
                      <li key={ri} className="text-[13px] leading-[1.3] text-justify pl-1 text-black">
                        {res}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* EDUCATION */}
          <section className="mb-6">
            <h2 className="section-border text-[14px] font-bold uppercase mb-3 pb-0.5 text-black">Education</h2>
            <div className="space-y-4 font-sans text-black">
              {education.map((edu, i) => (
                <div key={i}>
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h3 className="text-[13px] font-bold uppercase text-black">{edu.degree}</h3>
                    <span className="text-[12px] font-bold text-black">{edu.period}</span>
                  </div>
                  <div className="text-[12.5px] italic opacity-80 text-black">{edu.institution} | {edu.location}</div>
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

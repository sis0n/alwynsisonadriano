import React from 'react';
import { motion } from 'framer-motion';
import { Search, Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const posts = blogPosts;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-32 md:pt-40 pb-20 px-6 md:px-20 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 flex flex-col md:flex-row justify-between items-end gap-10 border-b border-slate-100 dark:border-slate-900 pb-16">
          <div className="max-w-2xl">
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter uppercase mb-8 text-slate-950 dark:text-white leading-none">Blog<span className="text-blue-600">.</span></h1>
            <p className="text-xl text-slate-500 dark:text-slate-400 italic">
              "Sharing my thoughts on backend architecture, school projects, and my journey as a developer."
            </p>
          </div>
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-2 ring-blue-600/20 outline-none transition-all dark:text-white"
            />
          </div>
        </header>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -8 }}
              className="group relative flex flex-col p-8 rounded-[2.5rem] bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/50 hover:border-blue-500/30 transition-all shadow-sm hover:shadow-2xl hover:shadow-blue-500/5 dark:shadow-none overflow-hidden"
            >
              <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                <div className="mb-8 w-12 h-12 rounded-2xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  <BookOpen size={24} />
                </div>

                <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-blue-600 mb-4">
                  <span>{post.category}</span>
                  <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                  <span className="text-slate-400">{post.date}</span>
                </div>

                <h2 className="text-2xl font-black tracking-tight mb-4 group-hover:text-blue-600 transition-colors text-slate-950 dark:text-white leading-tight">
                  {post.title}
                </h2>
                
                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-10 italic flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-6 border-t border-slate-50 dark:border-slate-800/50">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-1.5">
                    <Clock size={12} /> {post.readTime}
                  </span>
                  <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:gap-4 transition-all text-blue-600">
                    Read <ArrowRight size={16} />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Blog;

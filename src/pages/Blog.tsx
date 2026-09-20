import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';
import { blogPosts } from '../data/blogPosts';

const Blog: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const posts = blogPosts.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="pt-28 md:pt-36 pb-20 px-6 md:px-16 min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <header className="mb-14 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-zinc-200/80 dark:border-zinc-900 pb-12">
          <div>
            <div className="text-xs font-mono tracking-[0.3em] uppercase text-zinc-400 dark:text-zinc-500 mb-2">
              Writings & Thoughts
            </div>
            <h1 className="text-4xl md:text-6xl font-black tracking-tight uppercase text-zinc-950 dark:text-white">
              Blog.
            </h1>
            <p className="text-sm md:text-base text-zinc-500 dark:text-zinc-400 mt-2 max-w-xl">
              Notes on backend architecture, system design, lessons learned in computer science, and engineering insights.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" size={16} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs font-mono focus:border-zinc-950 dark:focus:border-white focus:outline-none transition-all dark:text-white"
            />
          </div>
        </header>

        {/* Blog Post Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {posts.map((post) => (
            <motion.div 
              key={post.id}
              variants={itemVariants}
              whileHover={{ y: -4 }}
              className="group relative flex flex-col p-7 rounded-3xl bg-white dark:bg-zinc-900/40 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-all shadow-sm flex-grow"
            >
              <Link to={`/blog/${post.id}`} className="flex flex-col h-full">
                <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-6">
                  <span className="uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-semibold">{post.category}</span>
                  <span>{post.date}</span>
                </div>

                <h2 className="text-xl font-bold tracking-tight mb-3 group-hover:underline text-zinc-950 dark:text-white leading-snug">
                  {post.title}
                </h2>
                
                <p className="text-zinc-600 dark:text-zinc-400 text-xs leading-relaxed mb-8 flex-grow">
                  {post.excerpt}
                </p>

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800/80 font-mono text-xs">
                  <span className="text-zinc-400 flex items-center gap-1.5">
                    <Clock size={13} /> {post.readTime}
                  </span>
                  <span className="font-bold text-zinc-950 dark:text-white flex items-center gap-1 group-hover:gap-2 transition-all uppercase tracking-wider text-[11px]">
                    Read <ArrowRight size={13} />
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {posts.length === 0 && (
          <div className="py-20 text-center text-zinc-500 font-mono text-xs">
            No articles found matching "{searchQuery}".
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;

import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Clock, Share2 } from 'lucide-react';
import { blogPosts } from '../data/blogPosts';

const BlogDetail: React.FC = () => {
  const { id } = useParams();
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!post) {
    return (
      <div className="pt-40 text-center min-h-screen">
        <h1 className="text-4xl font-black tracking-tighter mb-8">Post not found.</h1>
        <Link to="/blog" className="text-blue-600 font-bold uppercase tracking-widest text-xs">Back to blog</Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-32 px-6 md:px-20 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-slate-400 hover:text-blue-600 transition-colors mb-12 uppercase text-[10px] font-black tracking-widest">
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        <header className="mb-16">
          <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-8">
            <span>{post.category}</span>
            <span className="w-1.5 h-1.5 bg-slate-200 dark:bg-slate-800 rounded-full"></span>
            <span className="text-slate-400 flex items-center gap-1.5 font-bold"><Calendar size={12}/> {post.date}</span>
          </div>
          <h1 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight text-slate-950 dark:text-white mb-8">
            {post.title}
          </h1>
          <p className="text-xl md:text-2xl text-slate-500 dark:text-slate-400 italic leading-relaxed border-l-4 border-blue-600/20 pl-6 py-2">
            {post.excerpt}
          </p>
        </header>

        <article className="prose prose-slate dark:prose-invert prose-lg max-w-none">
          <div className="text-slate-600 dark:text-slate-400 space-y-8 leading-relaxed text-lg">
            {/* Split content by newlines for basic formatting */}
            {post.content.split('\n').map((paragraph: string, i: number) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
          
          <div className="mt-20 pt-10 border-t border-slate-100 dark:border-slate-900 flex justify-between items-center">
            <div className="flex gap-4">
               <button className="p-3 rounded-full bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-blue-600 transition-colors">
                 <Share2 size={20} />
               </button>
            </div>
            <Link to="/blog" className="text-xs font-black uppercase tracking-widest text-slate-400 hover:text-blue-600 transition-colors">
              Next Post →
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default BlogDetail;

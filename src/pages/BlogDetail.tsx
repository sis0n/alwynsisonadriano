import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
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
      <div className="pt-40 text-center min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100">
        <h1 className="text-3xl font-black tracking-tight mb-4 uppercase">Post not found.</h1>
        <Link to="/blog" className="text-zinc-500 hover:text-zinc-950 dark:hover:text-white font-mono text-xs uppercase tracking-wider underline">
          Back to blog
        </Link>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: post.title,
        text: post.excerpt,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="pt-28 md:pt-36 pb-32 px-6 md:px-16 min-h-screen bg-[#fafafa] dark:bg-[#09090b] text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
      <div className="max-w-3xl mx-auto">
        
        {/* Back navigation */}
        <Link 
          to="/blog" 
          className="inline-flex items-center gap-2 text-zinc-500 hover:text-zinc-950 dark:hover:text-white transition-colors mb-10 font-mono text-xs uppercase tracking-wider"
        >
          <ArrowLeft size={14} /> Back to Blog
        </Link>

        {/* Post Header */}
        <header className="mb-12 border-b border-zinc-200/80 dark:border-zinc-800 pb-10">
          <div className="font-pixel text-[13px] tracking-tight text-zinc-500 dark:text-zinc-400 mb-3">
            [ARTICLE]
          </div>
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-zinc-400 mb-5 uppercase tracking-wider">
            <span className="text-zinc-950 dark:text-white font-semibold">{post.category}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
            <span>•</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight leading-tight text-zinc-950 dark:text-white mb-6">
            {post.title}
          </h1>

          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed border-l-2 border-zinc-300 dark:border-zinc-700 pl-4 italic">
            "{post.excerpt}"
          </p>
        </header>

        {/* Post Article Content */}
        <article className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
          <div className="space-y-4 leading-relaxed text-base font-normal">
            {post.content.split('\n').map((paragraph: string, i: number) => {
              const trimmed = paragraph.trim();
              if (!trimmed) return null;

              // Bullet points
              if (trimmed.startsWith('- ')) {
                return (
                  <div key={i} className="flex items-start gap-2.5 pl-2 py-0.5 text-zinc-700 dark:text-zinc-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 dark:bg-zinc-600 mt-2 flex-shrink-0" />
                    <span>{trimmed.substring(2)}</span>
                  </div>
                );
              }

              // Numbered list
              if (/^\d+\.\s/.test(trimmed)) {
                const match = trimmed.match(/^(\d+\.)\s(.*)$/);
                return (
                  <div key={i} className="flex items-start gap-2.5 pl-2 py-0.5 text-zinc-700 dark:text-zinc-300">
                    <span className="font-mono text-xs text-zinc-400 mt-0.5 flex-shrink-0">{match ? match[1] : ''}</span>
                    <span>{match ? match[2] : trimmed}</span>
                  </div>
                );
              }

              // Headings or Questions
              if (trimmed.endsWith('?') || trimmed.endsWith(':')) {
                return (
                  <h3 key={i} className="text-lg font-semibold text-zinc-950 dark:text-white mt-6 mb-2">
                    {trimmed}
                  </h3>
                );
              }

              // URL detection
              if (trimmed.includes('https://')) {
                const parts = trimmed.split(/(https:\/\/[^\s]+)/g);
                return (
                  <p key={i} className="leading-relaxed">
                    {parts.map((part, pIdx) => {
                      if (part.startsWith('https://')) {
                        return (
                          <a
                            key={pIdx}
                            href={part}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="font-mono text-xs text-zinc-950 dark:text-white underline underline-offset-4 hover:opacity-70 transition-opacity break-all inline-block mt-2 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800"
                          >
                            {part} ↗
                          </a>
                        );
                      }
                      return part;
                    })}
                  </p>
                );
              }

              return <p key={i} className="leading-relaxed">{trimmed}</p>;
            })}
          </div>
          
          <div className="mt-16 pt-8 border-t border-zinc-200/80 dark:border-zinc-800 flex justify-between items-center font-mono text-xs">
            <button 
              onClick={handleShare}
              className="inline-flex items-center gap-2 p-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/50 dark:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white hover:border-zinc-400 dark:hover:border-zinc-600 transition-all uppercase tracking-wider"
            >
              <Share2 size={14} /> Share Post
            </button>

            <Link 
              to="/blog" 
              className="text-zinc-500 hover:text-zinc-950 dark:hover:text-white uppercase tracking-wider font-bold transition-colors"
            >
              More Articles →
            </Link>
          </div>
        </article>

      </div>
    </div>
  );
};

export default BlogDetail;

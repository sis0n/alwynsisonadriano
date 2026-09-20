import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import {
  Sun,
  Moon,
  ArrowUp,
  X,
  Send,
  User,
  Mail,
  MessageSquare,
} from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useUI } from "../context/UIContext";
import { portfolioData } from "../data/portfolioData";

import CustomCursor from "./CustomCursor";
import ChatBot from "./ChatBot";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { theme, toggleTheme } = useTheme();
  const { isHireModalOpen, openHireModal, closeHireModal } = useUI();
  const location = useLocation();
  const navigate = useNavigate();
  const { name, contact } = portfolioData;
  const [showScrollTop, setShowScrollTop] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "backend",
    message: "",
  });
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      navigate("/", { replace: true });
    } else {
      navigate("/");
      window.scrollTo({ top: 0 });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const response = await fetch("https://formspree.io/f/mlgalzeq", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          opportunity_type: formData.type,
          message: formData.message,
          _subject: `New Inquiry from ${formData.name}`,
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", type: "backend", message: "" });
        setTimeout(() => {
          closeHireModal();
          setStatus("idle");
        }, 2000);
      } else {
        setStatus("error");
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setStatus("error");
    }
  };

  return (
    <div className="bg-[#fafafa] dark:bg-[#09090b] min-h-screen transition-colors duration-500 font-sans relative text-zinc-900 dark:text-zinc-100 selection:bg-zinc-900 selection:text-white dark:selection:bg-white dark:selection:text-zinc-950 pb-24 lg:pb-0">
      <CustomCursor />
      
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white z-[100] origin-left print:hidden"
        style={{ scaleX, position: "fixed" }}
      />

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-[100] px-6 md:px-12 py-4 md:py-5 flex justify-between items-center bg-[#fafafa]/80 dark:bg-[#09090b]/80 backdrop-blur-md border-b border-zinc-200/80 dark:border-zinc-800/80 transition-colors print:hidden">
        {/* Left: Monogram / Logo */}
        <div className="flex-1 text-zinc-950 dark:text-white">
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-black text-lg md:text-xl tracking-tighter hover:opacity-70 transition-opacity cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>
              {name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-900 dark:bg-white inline-block" />
          </a>
        </div>

        {/* Center: Desktop Navigation Links (hidden on mobile) */}
        <div className="hidden lg:flex items-center gap-8 text-[11px] font-mono uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
          <Link
            to="/#projects"
            className="hover:text-zinc-950 dark:hover:text-white transition-colors"
          >
            Projects
          </Link>
          <Link
            to="/resume"
            className={`transition-colors ${
              location.pathname === "/resume" 
                ? "text-zinc-950 dark:text-white font-bold" 
                : "hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Resume
          </Link>
          <Link
            to="/blog"
            className={`transition-colors ${
              location.pathname.startsWith("/blog") 
                ? "text-zinc-950 dark:text-white font-bold" 
                : "hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>
        </div>

        {/* Right: Desktop Actions & Mobile Contact Button */}
        <div className="flex-1 flex justify-end items-center gap-3 md:gap-5">
          {/* Desktop Theme Toggle */}
          <button
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle Theme"
            className="hidden lg:flex p-2.5 rounded-full bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 text-zinc-700 dark:text-zinc-300 active:scale-90 cursor-pointer overflow-hidden transition-all duration-300"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {theme === "light" ? <Moon size={16} /> : <Sun size={16} />}
            </motion.div>
          </button>

          {/* Get In Touch CTA */}
          <button
            onClick={openHireModal}
            className="inline-flex items-center justify-center bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 px-4 md:px-5 py-2 md:py-2.5 rounded-full font-mono text-[10px] md:text-[11px] uppercase tracking-wider hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all active:scale-95 shadow-sm"
          >
            Get In Touch
          </button>
        </div>
      </nav>

      {/* Floating Mobile Bottom Navigation Dock */}
      <div className="lg:hidden fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] print:hidden max-w-[94vw] w-auto pointer-events-auto">
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800/90 rounded-full shadow-2xl p-1.5 flex items-center gap-1"
        >
          <Link
            to="/#projects"
            className={`px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              location.pathname === "/" && location.hash === "#projects"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Projects
          </Link>
          <Link
            to="/resume"
            className={`px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              location.pathname === "/resume"
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Resume
          </Link>
          <Link
            to="/blog"
            className={`px-3.5 py-2 rounded-full text-xs font-mono tracking-wider transition-all ${
              location.pathname.startsWith("/blog")
                ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-bold shadow-xs"
                : "text-zinc-600 dark:text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
            }`}
          >
            Blog
          </Link>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-0.5" />

          {/* Mobile Floating Theme Toggle */}
          <button
            onClick={(e) => toggleTheme(e)}
            aria-label="Toggle Theme"
            className="p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 transition-colors cursor-pointer active:scale-90 overflow-hidden"
          >
            <motion.div
              key={theme}
              initial={{ rotate: -90, scale: 0.7, opacity: 0 }}
              animate={{ rotate: 0, scale: 1, opacity: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </motion.div>
          </button>
        </motion.div>
      </div>

      {/* Main Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {children}
      </motion.main>

      {/* Persistent Footer */}
      <footer className="py-12 px-6 md:px-20 border-t border-zinc-200/80 dark:border-zinc-900 bg-[#fafafa] dark:bg-[#09090b] transition-colors print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          <div className="text-xs font-mono tracking-wider text-zinc-400 dark:text-zinc-600">
            © {new Date().getFullYear()} {name} — Built with React & Tailwind CSS.
          </div>
          <div className="flex flex-wrap justify-center gap-6 text-xs font-mono tracking-wider text-zinc-500 dark:text-zinc-400">
            <span className="hover:text-zinc-950 dark:hover:text-white transition-colors cursor-default">
              {contact.location}
            </span>
            <span className="text-zinc-300 dark:text-zinc-700">•</span>
            <a href={`mailto:${contact.email}`} className="hover:text-zinc-950 dark:hover:text-white transition-colors">
              {contact.email}
            </a>
          </div>
        </div>
      </footer>

      {/* Hire Me / Contact Modal */}
      <AnimatePresence>
        {isHireModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 print:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHireModal}
              className="absolute inset-0 bg-zinc-950/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0c0c0e] rounded-3xl shadow-2xl z-[160] overflow-hidden border border-zinc-200 dark:border-zinc-800"
            >
              <div className="p-8 md:p-10 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-black tracking-tight text-zinc-950 dark:text-white">
                      Let's Connect
                    </h2>
                    <p className="text-xs font-mono text-zinc-500 mt-1 uppercase tracking-wider">
                      Open for opportunities & collaborations
                    </p>
                  </div>
                  <button
                    onClick={closeHireModal}
                    className="p-2.5 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors text-zinc-400 hover:text-zinc-950 dark:hover:text-white"
                  >
                    <X size={20} />
                  </button>
                </div>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-10 text-center"
                  >
                    <div className="w-16 h-16 bg-zinc-100 dark:bg-zinc-900 text-zinc-950 dark:text-white rounded-full flex items-center justify-center mb-5 border border-zinc-200 dark:border-zinc-800">
                      <Send size={24} />
                    </div>
                    <h3 className="text-xl font-bold tracking-tight text-zinc-950 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400">
                      Thank you for reaching out. I will review your message and reply promptly.
                    </p>
                  </motion.div>
                ) : (
                  <form className="space-y-5" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                          <User size={12} /> Full Name
                        </label>
                        <input
                          required
                          disabled={status === "loading"}
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-zinc-950 dark:focus:border-white focus:outline-none transition-all dark:text-white disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                          <Mail size={12} /> Email
                        </label>
                        <input
                          required
                          disabled={status === "loading"}
                          type="email"
                          placeholder="name@company.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-zinc-950 dark:focus:border-white focus:outline-none transition-all dark:text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                        Inquiry Type
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {["Backend", "Internship", "Collab", "Freelance"].map(
                          (type) => (
                            <label
                              key={type}
                              className={`relative flex items-center justify-center p-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all ${
                                formData.type === type.toLowerCase()
                                  ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 border-zinc-950 dark:border-white"
                                  : "text-zinc-600 dark:text-zinc-400"
                              } ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                              <input
                                type="radio"
                                name="opp_type"
                                value={type.toLowerCase()}
                                checked={formData.type === type.toLowerCase()}
                                onChange={(e) =>
                                  setFormData({
                                    ...formData,
                                    type: e.target.value,
                                  })
                                }
                                className="peer hidden"
                                required
                                disabled={status === "loading"}
                              />
                              <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">
                                {type}
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 flex items-center gap-1.5">
                        <MessageSquare size={12} /> Message
                      </label>
                      <textarea
                        required
                        disabled={status === "loading"}
                        rows={3}
                        placeholder="Tell me about your project or role..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 rounded-xl py-3 px-4 text-sm focus:border-zinc-950 dark:focus:border-white focus:outline-none transition-all dark:text-white resize-none disabled:opacity-50"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-500 font-mono">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-all text-xs uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                    >
                      {status === "loading" ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          Send Message <Send size={14} />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Back to Top Button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={scrollToTop}
          aria-label="Back to top"
          className="fixed bottom-20 md:bottom-24 right-4 md:right-8 p-3.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-full shadow-xl z-[85] hover:scale-105 active:scale-95 transition-all print:hidden"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}

      {/* ChatBot AI */}
      <ChatBot />
    </div>
  );
};

export default Layout;

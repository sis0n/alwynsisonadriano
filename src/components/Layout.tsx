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
  Menu,
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const [isNavigating, setIsNavigating] = useState(false);
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
    setIsNavigating(true);
    const timer = setTimeout(() => setIsNavigating(false), 800);
    window.scrollTo(0, 0);
    return () => clearTimeout(timer);
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

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

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
          _subject: `New Hire Inquiry from ${formData.name}`,
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
    <div className="bg-white dark:bg-[#050505] min-h-screen transition-colors duration-500 font-sans selection:bg-blue-500/30 relative text-slate-900 dark:text-slate-200">
      <CustomCursor />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-[100] origin-left print:hidden"
        style={{ scaleX, position: "fixed" }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-[100] px-6 py-6 flex justify-between items-center bg-white/80 dark:bg-[#050505]/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-900 transition-colors print:hidden">
        {/* Left: Logo */}
        <div className="flex-1 text-slate-950 dark:text-white">
          <a
            href="/"
            onClick={handleLogoClick}
            className="font-black text-xl tracking-tighter hover:scale-110 transition-transform cursor-pointer inline-block"
          >
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
            .
          </a>
        </div>

        {/* Center: Main Links */}
        <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
          <Link
            to="/#projects"
            className="hover:text-blue-600 transition-colors"
          >
            Projects
          </Link>
          <Link to="/#about" className="hover:text-blue-600 transition-colors">
            About
          </Link>
          <Link
            to="/resume"
            className={`hover:text-blue-600 transition-colors ${location.pathname === "/resume" ? "text-blue-600" : ""}`}
          >
            Resume
          </Link>
          <Link
            to="/blog"
            className={`hover:text-blue-600 transition-colors ${location.pathname.startsWith("/blog") ? "text-blue-600" : ""}`}
          >
            Blog
          </Link>
        </div>

        {/* Right: Actions */}
        <div className="flex-1 flex justify-end items-center gap-4 md:gap-8">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 hover:ring-2 ring-slate-200 dark:ring-slate-700 transition-all text-slate-600 dark:text-slate-400"
          >
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <button
            onClick={openHireModal}
            className="group relative hidden sm:block bg-slate-950 dark:bg-white text-white dark:text-slate-950 px-6 py-2.5 rounded-full font-black text-[10px] uppercase tracking-widest overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-lg shadow-blue-600/10"
          >
            <span className="relative z-10">Hire Me</span>
            <div className="absolute inset-0 bg-blue-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
          </button>

          <button
            onClick={toggleMobileMenu}
            className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 relative z-[80]"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeMobileMenu}
              className="fixed inset-0 z-[110] bg-slate-950/20 backdrop-blur-sm lg:hidden"
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 z-[120] w-[280px] bg-white dark:bg-[#080808] shadow-2xl flex flex-col p-8 pt-32 lg:hidden border-l border-slate-100 dark:border-slate-800"
            >
              <div className="flex flex-col gap-6 text-2xl font-black uppercase tracking-tighter">
                <Link
                  to="/#projects"
                  onClick={closeMobileMenu}
                  className="text-slate-950 dark:text-white hover:text-blue-600 transition-colors"
                >
                  Projects
                </Link>
                <Link
                  to="/#about"
                  onClick={closeMobileMenu}
                  className="text-slate-950 dark:text-white hover:text-blue-600 transition-colors"
                >
                  About
                </Link>
                <Link
                  to="/resume"
                  onClick={closeMobileMenu}
                  className={`hover:text-blue-600 transition-colors ${location.pathname === "/resume" ? "text-blue-600" : "text-slate-950 dark:text-white"}`}
                >
                  Resume
                </Link>
                <Link
                  to="/blog"
                  onClick={closeMobileMenu}
                  className={`hover:text-blue-600 transition-colors ${location.pathname.startsWith("/blog") ? "text-blue-600" : "text-slate-950 dark:text-white"}`}
                >
                  Blog
                </Link>

                <button
                  onClick={() => {
                    closeMobileMenu();
                    openHireModal();
                  }}
                  className="mt-8 w-full bg-blue-600 text-white py-4 rounded-2xl font-bold text-sm uppercase tracking-widest shadow-lg shadow-blue-600/20"
                >
                  Hire Me
                </button>
              </div>

              <div className="mt-auto pt-10 border-t border-slate-100 dark:border-slate-800">
                <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4 text-center">
                  Get in touch
                </div>
                <div className="flex justify-center gap-6">
                  <a
                    href={contact.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <Mail size={20} />
                  </a>
                  <a
                    href={contact.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-400 hover:text-blue-600 transition-colors"
                  >
                    <User size={20} />
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <motion.main
        key={location.pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.main>

      {/* Persistent Footer */}
      <footer className="py-12 px-6 md:px-20 border-t border-slate-100 dark:border-slate-900 bg-white dark:bg-[#050505] transition-colors print:hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
          <div className="text-xs font-black uppercase tracking-[0.4em] text-slate-300 dark:text-slate-700">
            © {new Date().getFullYear()} {name}
          </div>
          <div className="flex gap-8 text-xs font-black uppercase tracking-[0.2em] text-slate-400">
            <span className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default tracking-tight">
              {contact.location}
            </span>
            <span className="flex items-center gap-2 hover:text-blue-600 transition-colors cursor-default">
              {contact.phone}
            </span>
          </div>
        </div>
      </footer>

      {/* Hire Me Modal */}
      <AnimatePresence>
        {isHireModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 md:p-6 print:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHireModal}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-white dark:bg-[#0a0a0a] rounded-[2rem] md:rounded-[3rem] shadow-2xl z-[160] overflow-hidden border border-slate-100 dark:border-slate-800"
            >
              <div className="p-8 md:p-14 max-h-[90vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-8 md:mb-12">
                  <h2 className="text-3xl md:text-4xl font-black tracking-tighter uppercase text-slate-950 dark:text-white leading-none">
                    Hire Me<span className="text-blue-600">.</span>
                  </h2>
                  <button
                    onClick={closeHireModal}
                    className="p-3 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors group"
                  >
                    <X
                      size={24}
                      className="text-slate-400 group-hover:text-slate-950 dark:group-hover:text-white transition-colors"
                    />
                  </button>
                </div>

                {status === "success" ? (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mb-6">
                      <Send size={40} />
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-slate-950 dark:text-white mb-2">
                      Message Sent!
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400">
                      Maraming salamat! I'll get back to you soon.
                    </p>
                  </motion.div>
                ) : (
                  <form className="space-y-6" onSubmit={handleFormSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <User size={12} /> Full Name
                        </label>
                        <input
                          required
                          disabled={status === "loading"}
                          type="text"
                          placeholder="John Doe"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData({ ...formData, name: e.target.value })
                          }
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 px-6 text-sm focus:ring-2 ring-blue-600/20 outline-none transition-all dark:text-white disabled:opacity-50"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                          <Mail size={12} /> Email Address
                        </label>
                        <input
                          required
                          disabled={status === "loading"}
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })
                          }
                          className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 px-6 text-sm focus:ring-2 ring-blue-600/20 outline-none transition-all dark:text-white disabled:opacity-50"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                        Opportunity Type
                      </label>
                      <div className="grid grid-cols-2 gap-3">
                        {["Backend", "Internship", "Collab", "Freelance"].map(
                          (type) => (
                            <label
                              key={type}
                              className={`relative flex items-center justify-center p-3 rounded-xl border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-900 transition-all group ${status === "loading" ? "opacity-50 cursor-not-allowed" : ""}`}
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
                              <div className="absolute inset-0 rounded-xl peer-checked:border-2 peer-checked:border-blue-600 pointer-events-none transition-all" />
                              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-blue-600 peer-checked:text-blue-600 transition-colors">
                                {type}
                              </span>
                            </label>
                          ),
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 flex items-center gap-2">
                        <MessageSquare size={12} /> Project Description
                      </label>
                      <textarea
                        required
                        disabled={status === "loading"}
                        rows={3}
                        placeholder="Tell me about your project..."
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                        className="w-full bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 rounded-2xl py-4 px-6 text-sm focus:ring-2 ring-blue-600/20 outline-none transition-all dark:text-white resize-none disabled:opacity-50"
                      />
                    </div>

                    {status === "error" && (
                      <p className="text-xs text-red-500 font-bold uppercase tracking-tight">
                        Something went wrong. Please try again.
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="w-full bg-blue-600 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 group uppercase tracking-widest text-xs disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {status === "loading" ? (
                        <span className="animate-pulse">Sending...</span>
                      ) : (
                        <>
                          Send Inquiry{" "}
                          <Send
                            size={16}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
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
          className="fixed bottom-28 right-8 p-4 bg-blue-600 text-white rounded-2xl shadow-xl shadow-blue-600/20 z-[90] hover:bg-blue-700 hover:scale-110 transition-all print:hidden"
        >
          <ArrowUp size={24} />
        </motion.button>
      )}
      {/* ChatBot AI */}
      <ChatBot />
    </div>
  );
};

export default Layout;

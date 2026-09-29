import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Minus } from "lucide-react";
import { portfolioData } from "../data/portfolioData";
import gradImg from "../assets/grad.png";

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
}

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [lastTopic, setLastTopic] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm Alwyn. Welcome to my portfolio. Feel free to ask me about my projects, technical stack, experience, or anything you would like to know.",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { label: "Projects", value: "tell me about your projects" },
    { label: "Tech Stack", value: "what are your skills?" },
    { label: "Contact", value: "how can i contact you?" },
    { label: "Dev Joke", value: "tell me a joke" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (input: string) => {
    const query = input.toLowerCase().trim();
    const { skillCategories, contact } = portfolioData;

    // 1. Gibberish Detection
    const isGibberish = (str: string) => {
      const longConsonants = /[^aeiouy\s]{6,}/i.test(str);
      const repetitive = /(.)\1{4,}/.test(str);
      const randomJumble =
        str.length > 10 && !str.includes(" ") && !/[aeiouy]/.test(str);
      return longConsonants || repetitive || randomJumble;
    };

    if (isGibberish(query)) {
      return "I didn't quite understand that. Please ask about my projects, technical skills, or background.";
    }

    // 2. Contextual Handling (Memory)
    if (
      lastTopic &&
      (query.includes("live") ||
        query.includes("link") ||
        query.includes("preview"))
    ) {
      if (lastTopic === "libsys")
        return "The live deployment of LibSys is accessible here: https://library.ucc-caloocan.com/";
      if (lastTopic === "bagyoalerto")
        return "The live Progressive Web App for BagyoAlerto is hosted here: https://bagyoalerto.vercel.app/";
      return "Most of my major projects have live links and source code repositories available in the Projects section.";
    }

    const hasWord = (words: string[]) => words.some(w => new RegExp(`\\b${w}\\b`, 'i').test(query));

    // 3. Intent Matching
    if (hasWord(['keira'])) {
      return "That's Keira Uy, my girlfriend and biggest supporter!";
    }

    if (hasWord(['hello', 'hi', 'hey', 'kamusta', 'uy', 'sup'])) {
      return "Hello! I'm Alwyn Adriano, a Backend Developer. Feel free to explore my work or ask any questions.";
    }

    if (hasWord(['project', 'projects', 'gawa', 'portfolio', 'work'])) {
      setLastTopic('projects');
      return "I have engineered several key projects including LibSys (Library System with Custom PHP MVC), BorrowHub (Asset Management Platform with Laravel REST API and Android Client), and BagyoAlerto (Emergency Weather Alert PWA). Which one would you like to know more about?";
    }

    if (hasWord(['libsys'])) {
      setLastTopic('libsys');
      return "LibSys is a full-stack library system built with native PHP following custom MVC architecture, RBAC middleware, QR code circulation check-ins, and MySQL repository abstractions. Live preview: https://library.ucc-caloocan.com/";
    }

    if (hasWord(['bagyo', 'alerto', 'bagyoalerto'])) {
      setLastTopic('bagyoalerto');
      return "BagyoAlerto was developed for the CodeSprout 2025 Hackathon. It is an offline-capable Progressive Web App with geolocation and real-time weather integration. Live demo: https://bagyoalerto.vercel.app/";
    }

    if (hasWord(['borrowhub'])) {
      setLastTopic('borrowhub');
      return "BorrowHub is an inventory management platform featuring a Laravel REST API backend, token-based Sanctum authentication, audit logging, and a native Android client application.";
    }

    if (hasWord(['skill', 'skills', 'tech', 'stack', 'marunong', 'talento'])) {
      setLastTopic('skills');
      const tech = skillCategories.flatMap((c) => c.skills).join(', ');
      return `My core technical stack includes: ${tech}. I specialize primarily in backend development, relational database modeling, and clean system architecture.`;
    }

    if (hasWord(['hire', 'contact', 'email', 'recruit', 'number', 'kontak', 'message'])) {
      setLastTopic('contact');
      return `I am actively looking for backend engineering opportunities and internships. Reach me via email at ${contact.email} or by phone at ${contact.phone}. You can also use the 'Get In Touch' button at the top.`;
    }

    if (hasWord(['socials', 'social', 'github', 'linkedin', 'links', 'link', 'facebook', 'instagram', 'fb', 'ig'])) {
      return `Connect with me:\n- GitHub: ${contact.github}\n- LinkedIn: ${contact.linkedin}\n- Facebook: ${contact.facebook}\n- Instagram: ${contact.instagram}`;
    }

    if (hasWord(['sino', 'who', 'alan', 'alwyn', 'about'])) {
      return "I'm Alwyn Adriano, a 4th Year Computer Science student at University of Caloocan City (UCC) and AI-Native Software Engineer passionate about backend architecture and performant systems.";
    }

    if (hasWord(['joke', 'tawa', 'patawa', 'biro'])) {
      const devJokes = [
        "Why do developers prefer dark mode? Because light attracts bugs.",
        "Why was the JavaScript developer sad? Because they didn't know how to 'null' their feelings.",
        "There are 10 types of people in the world: those who understand binary, and those who don't.",
        "What did the C++ class say to the C function? 'You have no class.'",
      ];
      return devJokes[Math.floor(Math.random() * devJokes.length)];
    }

    return "Thank you for visiting! You can use the quick suggestions below or ask any question about my technical background.";
  };

  const handleSend = (text?: string) => {
    const messageText = text || inputValue;
    if (!messageText.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        text: generateResponse(messageText),
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 500);
  };

  const renderMessageText = (text: string) => {
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const parts = text.split(urlRegex);
    
    return parts.map((part, i) => {
      if (part.match(urlRegex)) {
        return (
          <a 
            key={i} 
            href={part} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="underline hover:opacity-80 transition-opacity break-all font-mono text-xs"
          >
            {part}
          </a>
        );
      }
      return part;
    });
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-[90] print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.96 }}
            className="absolute bottom-16 right-0 w-[calc(100vw-3rem)] sm:w-[340px] md:w-[360px] h-[58vh] min-h-[380px] max-h-[520px] bg-white dark:bg-[#0c0c0e] rounded-3xl shadow-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-4 px-5 bg-zinc-950 dark:bg-zinc-900 text-white flex justify-between items-center border-b border-zinc-800">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full overflow-hidden border border-zinc-700">
                  <img
                    src={gradImg}
                    alt="Alwyn"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-xs font-bold tracking-tight">
                    Alwyn Adriano
                  </div>
                  <div className="text-[10px] text-zinc-400 flex items-center gap-1.5 font-mono">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 inline-block animate-pulse" />
                    Assistant
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-400 hover:text-white"
                aria-label="Close Assistant"
              >
                <X size={16} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-zinc-50/50 dark:bg-transparent">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap break-words ${
                      msg.sender === "user"
                        ? "bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 rounded-tr-xs"
                        : "bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 border border-zinc-200 dark:border-zinc-800 rounded-tl-xs shadow-xs"
                    }`}
                  >
                    {renderMessageText(msg.text)}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-zinc-900 p-3 rounded-2xl rounded-tl-xs border border-zinc-200 dark:border-zinc-800 flex gap-1.5">
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                    />
                    <motion.div
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{
                        repeat: Infinity,
                        duration: 1,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-zinc-400 dark:bg-zinc-500 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggestions */}
            {!isTyping && (
              <div className="px-4 pb-2 flex flex-wrap gap-1.5">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.value)}
                    className="text-[10px] font-mono px-2.5 py-1 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-full text-zinc-600 dark:text-zinc-400 hover:border-zinc-950 dark:hover:border-white transition-all active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-3 bg-white dark:bg-[#0c0c0e] border-t border-zinc-200 dark:border-zinc-800">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask a question..."
                  className="w-full bg-zinc-100 dark:bg-zinc-900 rounded-xl py-2.5 pl-3.5 pr-11 text-xs focus:outline-none focus:ring-1 focus:ring-zinc-400 dark:focus:ring-zinc-600 dark:text-white"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="absolute right-1.5 p-1.5 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 rounded-lg hover:opacity-80 active:scale-95 transition-all disabled:opacity-30"
                  aria-label="Send Message"
                >
                  <Send size={13} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Chat Assistant"
        className="p-3.5 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 bg-zinc-950 dark:bg-white text-white dark:text-zinc-950 border border-zinc-800 dark:border-zinc-200"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Minus size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center gap-2 px-1"
            >
              <MessageSquare size={18} />
              <span className="text-xs font-mono tracking-wider hidden md:block">
                Chat
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;

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
      text: "Hi! I'm Alwyn. Thank you for visiting my portfolio! Ano'ng maipaglilingkod ko sa'yo today? Ask me about my projects, skills, or anything you're curious about! 😊",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestions = [
    { label: "🚀 My Projects", value: "tell me about your projects" },
    { label: "🛠️ My Tech Stack", value: "what are your skills?" },
    { label: "💌 Hire Me", value: "how can i contact you?" },
    { label: "🃏 Tell a Joke", value: "tell me a joke" },
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const generateResponse = (input: string) => {
    const query = input.toLowerCase().trim();
    const { projects, skillCategories, contact } = portfolioData;

    // 1. Gibberish Detection
    const isGibberish = (str: string) => {
      const longConsonants = /[^aeiouy\s]{6,}/i.test(str);
      const repetitive = /(.)\1{4,}/.test(str);
      const randomJumble =
        str.length > 10 && !str.includes(" ") && !/[aeiouy]/.test(str);
      return longConsonants || repetitive || randomJumble;
    };

    if (isGibberish(query)) {
      return "Wait, hindi ko ma-gets 'yan ah! 😂 Speak human please, ano ba talaga gusto mong malaman about me?";
    }

    // 2. Contextual Handling (Memory)
    if (
      lastTopic &&
      (query.includes("live") ||
        query.includes("link") ||
        query.includes("preview"))
    ) {
      if (lastTopic === "libsys")
        return "Yes, live 'yung LibSys project ko! Ito ang link: https://library-ucc.bscs3a.com/. Check it out! 📚";
      if (lastTopic === "bagyoalerto")
        return "Yup! Fully functional 'yan dito: https://bagyoalerto.vercel.app/. Ingat sa bagyo! ⛈️";
      return "Alin dyan? Karamihan ng major projects ko may live links, check mo sa Project Details section!";
    }

    const hasWord = (words: string[]) => words.some(w => new RegExp(`\\b${w}\\b`, 'i').test(query));

    // 3. Smart Intent Matching
    if (hasWord(['keira'])) {
      return "Ah, si Keira Uy? Girlfriend ko 'yan! 🥰 Siya ang inspiration at number one supporter ko sa pag-co-code. Debugging partner ko rin 'yan in real life! Haha";
    }

    if (hasWord(['hello', 'hi', 'hey', 'kamusta', 'uy'])) {
      return "Hello there! Alwyn here. Looking for a dev or just exploring my work? Feel free to ask anything!";
    }

    if (hasWord(['project', 'projects', 'gawa', 'portfolio'])) {
      setLastTopic('projects');
      return "Maraming solid na projects akong nagawa! Nandyan ang LibSys (Library), BagyoAlerto (Weather), at BorrowHub (Assets). Alin sa mga 'to ang gusto mong i-deep dive natin?";
    }

    if (hasWord(['libsys'])) {
      setLastTopic('libsys');
      return "LibSys is my masterpiece in native PHP. Gumamit ako dyan ng QR codes at custom MVC architecture. Gusto mo ba ng live link nito?";
    }

    if (hasWord(['bagyo', 'alerto', 'bagyoalerto'])) {
      setLastTopic('bagyoalerto');
      return "Binuild ko ang BagyoAlerto during a hackathon. PWA 'yan so pwede mo siyang i-install sa phone! Gusto mo ba makita ang live preview?";
    }

    if (hasWord(['skill', 'skills', 'tech', 'stack', 'marunong', 'talento'])) {
      setLastTopic('skills');
      const tech = skillCategories.flatMap((c) => c.skills).join(', ');
      return `I'm proficient in: ${tech}. Pero ang favorite ko talaga is PHP/Laravel for backend development. 🔥`;
    }

    if (hasWord(['hire', 'contact', 'email', 'recruit', 'number', 'kontak'])) {
      setLastTopic('contact');
      return `I'm ready to collaborate! Email me at ${contact.email} or call ${contact.phone}. Pwede mo ring i-click 'yung Hire Me button sa taas! 📩`;
    }

    if (hasWord(['sino', 'who', 'alan', 'alwyn'])) {
      return "I'm Alwyn Adriano, an aspiring Software Developer and 3rd Year CS student sa UCC. Dedicated ako sa logic at pag-gawa ng clean code! 💻";
    }

    if (hasWord(['joke', 'tawa', 'patawa', 'biro'])) {
      const devJokes = [
        "Bakit laging malungkot ang mga developer? Kasi wala silang 'comment' sa buhay nila. Sakit 'di ba? 😂",
        "Ano ang tawag sa developer na hindi marunong mag-CSS? Isang 'classless' developer. 💀",
        "Bakit ang hirap makipag-date ng programmer? Kasi 'if' lang sila ng 'if', wala namang 'then'. Sad boi hours! 🥲",
        "Bakit daw mahilig sa dark mode ang mga devs? Kasi 'light' attracts bugs. Stay dark, stay safe! 🕶️",
        "Ano ang paboritong kanta ng mga web developer? 'Linkin Park'. Gets mo? Haha! 🎸",
        "Bakit hindi kumakain ng lunch ang mga programmer? Kasi busy sila sa pag-solve ng 'merge conflicts' sa tiyan nila. 😂",
        "Knock knock! (Who's there?) ... [long silence] ... (Java 'yan, ang tagal mag-load e.) ☕",
        "Ano ang sabi ng C++ sa C? 'You have no class.' Ouch! 🤣",
      ];
      return devJokes[Math.floor(Math.random() * devJokes.length)];
    }

    if (input.includes("?")) {
      return "Hmm, di ko gets ang iyong tanong. Try mo itanong about my projects, skills, or even my inspiration! Haha. Or click mo na lang 'yung suggestions sa baba. 👇";
    }

    return "I don't know what you wanted to say. 😅 Pero try mong i-check 'yung suggestions ko sa baba!";
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
    }, 800);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[90] print:hidden">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-3rem)] sm:w-[320px] md:w-[350px] h-[60vh] min-h-[350px] max-h-[500px] bg-white dark:bg-[#0a0a0a] rounded-[2.5rem] shadow-2xl border border-slate-100 dark:border-slate-800 overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="p-6 bg-slate-950 dark:bg-white text-white dark:text-slate-950 flex justify-between items-center border-b border-slate-100/10 dark:border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl overflow-hidden border-2 border-blue-600 shadow-lg shadow-blue-600/20">
                  <img
                    src={gradImg}
                    alt="Alwyn"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-[0.2em]">
                    Alwyn Adriano
                  </div>
                  <div className="text-[10px] opacity-60 flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />{" "}
                    Active Now
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 dark:hover:bg-slate-100 rounded-full transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-50/30 dark:bg-transparent">
              {messages.map((msg) => (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  key={msg.id}
                  className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                      msg.sender === "user"
                        ? "bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-600/10"
                        : "bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-200 border border-slate-100 dark:border-slate-800 rounded-tl-none shadow-sm"
                    }`}
                  >
                    {msg.text}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl rounded-tl-none border border-slate-100 dark:border-slate-800 flex gap-1.5">
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6 }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.2,
                      }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                    />
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{
                        repeat: Infinity,
                        duration: 0.6,
                        delay: 0.4,
                      }}
                      className="w-1.5 h-1.5 bg-blue-600 rounded-full"
                    />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies / Suggestions */}
            {!isTyping && (
              <div className="px-6 pb-2 flex flex-wrap gap-2">
                {suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => handleSend(s.value)}
                    className="text-[9px] font-black uppercase tracking-widest px-3 py-1.5 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full text-slate-500 hover:text-blue-600 hover:border-blue-600/30 transition-all active:scale-95"
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Footer */}
            <div className="p-4 bg-white dark:bg-[#0a0a0a] border-t border-slate-100 dark:border-slate-800">
              <div className="relative flex items-center group">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Type a message..."
                  className="w-full bg-slate-100 dark:bg-slate-900 border-none rounded-2xl py-4 pl-6 pr-14 text-sm focus:ring-2 ring-blue-600/20 outline-none transition-all dark:text-white"
                />
                <button
                  onClick={() => handleSend()}
                  disabled={!inputValue.trim()}
                  className="absolute right-2 p-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:grayscale"
                >
                  <Send size={18} />
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
        className={`p-5 rounded-[2rem] shadow-2xl transition-all duration-500 flex items-center gap-3 ${
          isOpen
            ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950"
            : "bg-blue-600 text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <Minus size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              className="flex items-center gap-2"
            >
              <MessageSquare size={24} />
              <span className="text-xs font-black uppercase tracking-widest pr-2 hidden md:block">
                Chat with Alwyn
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default ChatBot;

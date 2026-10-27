import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizontal } from "lucide-react";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import Hero from "@/components/Hero";
import MouseGlow from "@/components/MouseGlow";

interface Message {
  sender: "user" | "ai";
  content: string;
  section?: string;
}

const VALID_SECTIONS = [
  "about",
  "skills",
  "projects",
  "experience",
  "contact",
  "fun",
  "greeting",
  "personal",
  "general",
] as const;

const normalizeSection = (value: unknown): string => {
  if (typeof value !== "string") return "";
  return value.trim().toLowerCase();
};

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [showFooter, setShowFooter] = useState(true);
  const [showInitialPopup, setShowInitialPopup] = useState(() => {
    return !localStorage.getItem("ai-popup-dismissed");
  });

  const [chatHistory, setChatHistory] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const hasInitialScroll = useRef(false);

  const handleQuery = async (query: string) => {
    const trimmedQuery = query.trim();
    if (!trimmedQuery) return;

    const userMessage: Message = { sender: "user", content: trimmedQuery };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setChatInput("");
    setIsTyping(true);
    if (!hasInteracted) setHasInteracted(true);

    try {
      const res = await fetch(
        "https://ai-portfolio-backend-647g.onrender.com/api/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmedQuery }),
        }
      );

      const data = await res.json().catch(() => ({}));
      const backendSection = normalizeSection(data?.section);
      const backendResponse = typeof data?.response === "string" ? data.response.trim() : "";

      const knownSection =
        backendSection && VALID_SECTIONS.includes(backendSection as (typeof VALID_SECTIONS)[number])
          ? backendSection
          : "general";

      const aiMessage: Message = {
        sender: "ai",
        content:
          backendResponse ||
          "I can help with my projects, skills, experience, and contact details. Ask me about my portfolio!",
        section: knownSection,
      };

      const newHistory = [...updatedHistory, aiMessage];
      setChatHistory(newHistory);
      localStorage.setItem("chatHistory", JSON.stringify(newHistory));
      setSelectedSection(knownSection);
    } catch (error) {
      console.error("AI request failed:", error);
      const errMessage: Message = {
        sender: "ai",
        content: "Something went wrong while contacting the AI. Please try again.",
        section: "general",
      };
      const errorHistory = [...updatedHistory, errMessage];
      setChatHistory(errorHistory);
      localStorage.setItem("chatHistory", JSON.stringify(errorHistory));
    }

    setIsTyping(false);
  };

  const handleClearChat = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  useEffect(() => {
    const container = chatContainerRef.current;

    const handleScroll = () => {
      if (!container) return;
      const { scrollTop, scrollHeight, clientHeight } = container;
      const atBottom = scrollTop + clientHeight >= scrollHeight - 10;
      setIsUserScrolling(!atBottom);
    };

    container?.addEventListener("scroll", handleScroll);

    return () => {
      container?.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const chatContainer = chatContainerRef.current;
      if (!chatContainer) return;

      const chatRect = chatContainer.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      const chatIsFullyVisible = chatRect.bottom <= windowHeight;
      const userScrolledBelowChat = chatRect.bottom < windowHeight - 50;

      if (!hasInteracted || userScrolledBelowChat) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasInteracted]);

  useEffect(() => {
    const container = chatContainerRef.current;
    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: hasInitialScroll.current ? "smooth" : "auto",
    });

    hasInitialScroll.current = true;
  }, [chatHistory.length]);

  const professions = [
    "A passionate Full Stack Developer who loves building end-to-end solutions 💻",
    "A creative MERN Stack Engineer focused on scalable web applications 🚀",
    "An AI Integration Specialist blending intelligence with user experience 🤖",
    "A detail-oriented Frontend Developer crafting pixel-perfect UIs with React ✨",
    "A Backend Developer experienced in building robust and secure APIs 🔐",

    "A UI/UX-Conscious Developer designing intuitive digital experiences 🎨",
    "A Cloud-Native Developer deploying apps on scalable infrastructures ☁️",
    "A Curious Technologist always exploring new tools and technologies 🔍",
    "A Performance-Driven Engineer optimizing every layer of the stack ⚙️",
    "A Team Player and fast learner with a love for problem-solving 🧠",
    "A Developer who bridges design and code to deliver engaging user journeys 🌐",
  ];

  const indexRef = useRef(0);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentProfession, setCurrentProfession] = useState(professions[0]);
  useEffect(() => {
    setCurrentProfession(professions[currentIndex]);
  }, [currentIndex]);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % professions.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      id="Home"
      className="min-h-screen flex flex-col overflow-x-hidden text-white bg-white text-black dark:bg-zinc-900 dark:text-white"
    >
      <Navbar />
      <MouseGlow />
      {showInitialPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="bg-gradient-to-br from-zinc-900 to-zinc-800 border border-gray-700 text-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-[90%] sm:w-full relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-yellow-400 text-black rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow-lg">
                ⚠️
              </div>
              <h2 className="text-xl font-semibold">Heads up!</h2>
            </div>
            <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
              The AI is ready to chat! ⚡ Responses usually come within a few
              seconds. If there’s a slight delay, don’t worry — it’s{" "}
              <strong className="text-white">warming</strong> up behind the
              scenes.
            </p>

            <button
              onClick={() => {
                setShowInitialPopup(false);
                localStorage.setItem("ai-popup-dismissed", "true");
              }}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 transition-colors duration-200 text-white font-medium px-4 py-2 rounded-lg shadow-md"
            >
              Got it, let’s chat!
            </button>
          </motion.div>
        </motion.div>
      )}

      <main className="flex-grow px-4 text-center" id="home">
        <div className="mt-32 md:mt-40 flex flex-col items-center justify-center gap-6 px-4 md:px-0">
          <motion.h1
            className="text-xl sm:text-xl md:text-3xl font-semibold bg-white text-zinc-700 dark:bg-zinc-900 dark:text-white"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hey, I'm Anand 👋
          </motion.h1>
          <motion.h2
            key={currentProfession}
            className="text-base sm:text-lg md:text-xl gradient-text font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, delay: currentIndex === 0 ? 0 : 0.2 }}
          >
            {currentProfession}
          </motion.h2>

          <motion.img
            src="img1.png"
            alt="avatar"
            className="w-44 h-44 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full"
            initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          />

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="relative border border-gray-600 px-5 py-3 rounded-2xl shadow-md max-w-fit text-sm sm:text-base md:text-lg mt-4 bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white"
          >
            Ask me anything about my{" "}
            <span className="text-blue-400 font-semibold">projects</span>,{" "}
            <span className="text-purple-400 font-semibold">skills</span>,{" "}
            <span className="text-pink-400 font-semibold">experience</span>,{" "}
            <span className="text-green-400 font-semibold">fun facts</span>, or{" "}
            <span className="text-amber font-semibold">how to reach me</span> ✨
            <div className="absolute -bottom-2 left-6 w-4 h-4 bg-zinc-800 border-l border-b border-gray-600 rotate-45"></div>
          </motion.div>
        </div>

        <div className="mt-10 mb-24 w-full  border-gray-700 rounded-xl  p-4 flex flex-col">
          <div
            className="overflow-y-auto max-h-[900px] pr-2"
            ref={chatContainerRef}
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 items-start my-3 ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "ai" && (
                  <img
                    src="bot.png"
                    alt="AI Avatar"
                    className="w-6 h-6 rounded-full mt-1"
                  />
                )}

                <div
                  className={`p-2 rounded-lg text-sm text-left max-w-6xl ${
                    msg.sender === "user"
                      ? "bg-blue-600 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-br-none"
                      : " rounded-bl-none w-full max-w-6xl text-left bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white"
                  }`}
                >
                  {[
                    "projects",
                    "about",
                    "experience",
                    "skills",
                    "contact",
                    "personal",
                  ].includes(msg.section || "") === false && (
                    <p>{msg.content}</p>
                  )}

                  {msg.section === "projects" && (
                    <div className="mt-4 w-full space-y-2">
                      <p>{msg.content}</p>
                      <Projects />
                    </div>
                  )}
                  {msg.section === "about" && (
                    <div className="mt-4 w-full space-y-2">
                      <p>{msg.content}</p>
                      <About />
                    </div>
                  )}
                  {msg.section === "experience" && (
                    <div className="mt-4 w-full space-y-2">
                      <p>{msg.content}</p>
                      <Experience />
                    </div>
                  )}
                  {msg.section === "skills" && (
                    <div className="mt-4 w-full space-y-2">
                      <p>{msg.content}</p>
                      <Skills />
                    </div>
                  )}
                  {msg.section === "contact" && (
                    <div className="mt-4 w-full space-y-2">
                      <p>{msg.content}</p>
                      <Contact />
                    </div>
                  )}
                  {msg.section === "personal" && (
                    <p>{msg.content}</p>
                  )}
                </div>

                {msg.sender === "user" && (
                  <img
                    src="user.png"
                    alt="User Avatar"
                    className="w-6 h-6 rounded-full"
                  />
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center gap-2 text-sm text-gray-300 px-2">
                <img
                  src="bot.png"
                  alt="AI Avatar"
                  className="w-6 h-6 rounded-full"
                />
                <span className="animate-pulse bg-white text-black dark:bg-zinc-900 dark:text-white">
                  AI is typing...
                </span>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="relative mt-4 w-full max-w-xl mx-auto">
            <input
              className="border border-gray-600 rounded-2xl px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-gray-800 pr-28 shadow-lg bg-white text-black dark:bg-zinc-900 dark:text-white"
              placeholder="Ask me anything..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && chatInput.trim() !== "") {
                  handleQuery(chatInput);
                }
              }}
            />

            <button
              onClick={() => chatInput.trim() && handleQuery(chatInput)}
              className="absolute top-1/2 right-3 transform -translate-y-1/2 hover:backdrop-brightness-90 transition-colors duration-200 p-2 rounded-full shadow-md"
            >
              <SendHorizontal className="w-5 h-5 text-black dark:text-white" />
            </button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {[
              { label: "👤 About", value: "about" },
              { label: "💼 Projects", value: "projects" },
              { label: "🛠 Skills", value: "skills" },
              { label: "📈 Experience", value: "experience" },
              { label: "📞 Contact", value: "contact" },
              { label: "🎉 Fun", value: "fun" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleQuery(btn.value)}
                className="hover:bg-gray-200 px-4 py-1 rounded-full text-sm border border-gray-600 bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white"
              >
                {btn.label}
              </button>
            ))}
            <button
              onClick={handleClearChat}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded-full text-sm border border-red-700"
            >
              🗑 Clear Chat
            </button>
          </div>
        </div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default Index;

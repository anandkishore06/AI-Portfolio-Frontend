import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";

interface Message {
  sender: "user" | "ai";
  content: string;
  section?: string;
}

const Index = () => {
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [chatInput, setChatInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Message[]>(() => {
    const saved = localStorage.getItem("chatHistory");
    return saved ? JSON.parse(saved) : [];
  });
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const handleQuery = async (query: string) => {
    const userMessage: Message = { sender: "user", content: query };
    const updatedHistory = [...chatHistory, userMessage];
    setChatHistory(updatedHistory);
    localStorage.setItem("chatHistory", JSON.stringify(updatedHistory));
    setChatInput("");
    setIsTyping(true);

    try {
      const res = await fetch(
        "https://ai-portfolio-backend-647g.onrender.com/api/ai",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: query }),
        }
      );

      const data = await res.json();
      const { section, response } = data;

      const validSections = [
        "about",
        "skills",
        "projects",
        "experience",
        "contact",
        "fun",
      ];
      const sectionExists = validSections.includes(section);

      const aiMessage: Message = {
        sender: "ai",
        content: sectionExists
          ? response
          : "Sorry, I didn’t understand that. Try again.",
        section: sectionExists ? section : "notfound",
      };

      const newHistory = [...updatedHistory, aiMessage];
      setChatHistory(newHistory);
      localStorage.setItem("chatHistory", JSON.stringify(newHistory));
      setSelectedSection(sectionExists ? section : "notfound");
    } catch (error) {
      console.error(error);
      const errMessage: Message = {
        sender: "ai",
        content: "Something went wrong while contacting the AI.",
      };
      const errorHistory = [...chatHistory, userMessage, errMessage];
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
    if (chatHistory.length > 0) {
      chatEndRef.current?.scrollIntoView({ behavior: "auto" });
    }
  }, [chatHistory, isTyping]);

  return (
    <div className="min-h-screen overflow-x-hidden text-center px-4 text-white">
      <Navbar />

      <div className="mt-32 md:mt-40 flex flex-col items-center justify-center gap-6 px-4 md:px-0">
        <motion.img
          src="/face.png"
          alt="avatar"
          className="w-28 h-28 sm:w-36 sm:h-36 md:w-48 md:h-48 rounded-full shadow-xl border-4 border-white object-cover"
          initial={{ scale: 0.7, rotate: -10, opacity: 0 }}
          animate={{ scale: 1, rotate: 0, opacity: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
        />
        <motion.h1
          className="text-xl sm:text-2xl md:text-4xl font-bold"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Hey, I'm Anand 👋
        </motion.h1>
        <motion.h2
          className="text-sm sm:text-lg md:text-2xl font-semibold text-gray-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Ask me anything about my portfolio
        </motion.h2>
      </div>

      {/* Embedded Chat Section */}
      <div className="mt-10 w-full border border-gray-700 rounded-xl shadow-xl p-4 flex flex-col">
        <div className="overflow-y-auto max-h-[700px] pr-2">
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
                  className="w-6 h-6 rounded-full"
                />
              )}
              <div
                className={`p-2 rounded-lg text-sm ${
                  msg.sender === "user"
                    ? "bg-blue-600 text-white max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl rounded-br-none"
                    : "text-gray-100 rounded-bl-none w-full max-w-6xl"
                }`}
              >
                {msg.content}
                {msg.section === "projects" && (
                  <div className="mt-4 w-full">
                    <Projects />
                  </div>
                )}
                {msg.section === "about" && (
                  <div className="mt-4 w-full">
                    <About />
                  </div>
                )}
                {msg.section === "experience" && (
                  <div className="mt-4 w-full">
                    <Experience />
                  </div>
                )}
                {msg.section === "skills" && (
                  <div className="mt-4 w-full">
                    <Skills />
                  </div>
                )}
                {msg.section === "contact" && (
                  <div className="mt-4 w-full">
                    <Contact />
                  </div>
                )}

                {msg.section === "fun" && (
                  <p>Here's something fun coming soon! 🎉</p>
                )}
                {msg.section === "notfound" && (
                  <p>Sorry, I didn’t understand that.</p>
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
              <span className="animate-pulse">AI is typing...</span>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        <div className="relative mt-4 w-full max-w-xl mx-auto">
          <input
            className="border border-gray-600 rounded-lg px-4 py-2 w-full text-white bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 pr-28 shadow-lg"
            placeholder="Ask me anything..."
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleQuery(chatInput)}
          />
          <button
            onClick={() => handleQuery(chatInput)}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-md text-sm font-medium shadow-md"
          >
            Ask
          </button>
        </div>

        {/* Restored Quick Buttons with Clear Chat */}
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
              onClick={() => handleQuery(btn.label)}
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-1 rounded-full text-sm border border-gray-600"
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

      <div className="pt-10">
        <Footer />
      </div>
    </div>
  );
};

export default Index;

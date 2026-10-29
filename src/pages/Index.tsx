import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { SendHorizontal, Trash2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Skills from "@/components/Skills";
import MouseGlow from "@/components/MouseGlow";
import AIIcon from "@/components/AIIcon";

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

const formatInlineText = (text: string) => {
  if (!text) return null;
  const regex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s<>()]+|\*[^*]+\*)/g;
  const parts = text.split(regex);

  return parts.map((part, partIdx) => {
    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length >= 4) {
      const inner = part.slice(2, -2);
      return (
        <strong
          key={partIdx}
          className="font-semibold text-zinc-950 dark:text-white"
        >
          {inner}
        </strong>
      );
    }

    // Inline code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={partIdx}
          className="px-1.5 py-0.5 mx-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-teal font-mono text-xs border border-zinc-200 dark:border-zinc-700 select-all"
        >
          {inner}
        </code>
      );
    }

    // Link: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={partIdx}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-teal hover:underline font-medium inline-flex items-center gap-0.5"
        >
          {linkText}
        </a>
      );
    }

    // Bare URL: https://...
    if (/^https?:\/\//.test(part)) {
      const cleanUrl = part.replace(/[.,;:)]$/, "");
      const trailing = part.slice(cleanUrl.length);
      return (
        <span key={partIdx}>
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-teal hover:underline font-medium inline-flex items-center gap-0.5 break-all"
          >
            {cleanUrl}
          </a>
          {trailing}
        </span>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <em key={partIdx} className="italic text-zinc-700 dark:text-zinc-300">
          {inner}
        </em>
      );
    }

    return <span key={partIdx}>{part}</span>;
  });
};

const renderFormattedText = (rawText: string, isUser: boolean = false) => {
  if (!rawText) return null;

  if (isUser) {
    return <p className="whitespace-pre-wrap leading-relaxed">{rawText}</p>;
  }

  const lines = rawText.split("\n");

  return lines.map((line, lineIdx) => {
    const trimmed = line.trim();

    // 1. Empty line -> clean paragraph separator
    if (!trimmed) {
      return <div key={lineIdx} className="h-2.5" />;
    }

    // 2. Heading Detection: ### Heading or ## Heading or # Heading
    const headingMatch = trimmed.match(/^(#{1,4})\s+(.*)$/);
    // Also standalone bold lines like **Featured Projects** or **VChat Application** (with or without colon)
    const standaloneBoldMatch = !headingMatch ? trimmed.match(/^\*\*([^*]+)\*\*:?$/) : null;

    if (headingMatch || standaloneBoldMatch) {
      const headingText = headingMatch ? headingMatch[2] : standaloneBoldMatch![1];
      return (
        <h3
          key={lineIdx}
          className="pt-4 pb-1 font-bold text-base sm:text-lg text-zinc-950 dark:text-white tracking-tight first:pt-0"
        >
          {formatInlineText(headingText)}
        </h3>
      );
    }

    // 3. Blockquote: > text
    if (/^>\s*/.test(trimmed)) {
      const quoteText = trimmed.replace(/^>\s*/, "");
      return (
        <div
          key={lineIdx}
          className="my-2 pl-3.5 pr-3 py-1.5 border-l-2 border-teal bg-teal/5 dark:bg-teal/10 rounded-r text-zinc-800 dark:text-zinc-200 text-sm italic"
        >
          {formatInlineText(quoteText)}
        </div>
      );
    }

    // 4. Bullet / List Item Detection: ONLY lines that explicitly start with a bullet or number!
    const bulletMatch = line.match(/^(\s*)([-*•◦–]|\d+\.)\s+(.*)$/);
    if (bulletMatch) {
      const leadingSpaces = bulletMatch[1] || "";
      const bulletSymbol = bulletMatch[2];
      const itemContent = bulletMatch[3];
      const isSubItem = leadingSpaces.length >= 2;
      const isNumbered = /^\d+\.$/.test(bulletSymbol);

      return (
        <div
          key={lineIdx}
          className={`flex items-start gap-2 my-1 ${
            isSubItem ? "pl-5 sm:pl-6 text-zinc-700 dark:text-zinc-300" : "text-zinc-800 dark:text-zinc-200"
          } text-sm leading-relaxed`}
        >
          {isNumbered ? (
            <span className="text-teal font-bold select-none text-xs sm:text-sm mt-0.5 flex-shrink-0">
              {bulletSymbol}
            </span>
          ) : (
            <span className="text-teal font-extrabold select-none mt-1.5 text-xs flex-shrink-0 leading-none">
              {isSubItem ? "–" : "•"}
            </span>
          )}
          <span className="flex-1 min-w-0">{formatInlineText(itemContent)}</span>
        </div>
      );
    }

    // 5. Normal Paragraph (Prose) - Aligned flush with the left margin (x = 0)
    return (
      <p
        key={lineIdx}
        className="leading-relaxed my-1.5 text-zinc-800 dark:text-zinc-200 text-sm first:mt-0"
      >
        {formatInlineText(trimmed)}
      </p>
    );
  });
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

  const BACKEND_API_URL =
    import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV
      ? "http://localhost:5000/api/ai"
      : "https://ai-portfolio-backend-647g.onrender.com/api/ai");

  const getClientFallback = (query: string): { section: string; response: string } => {
    const text = query.toLowerCase();
    if (/\b(project|projects|work|built|apps?|showcase)\b/.test(text)) {
      return {
        section: "projects",
        response: `Anand has engineered several production-grade full-stack applications with an emphasis on AI integration, real-time concurrency, and scalable cloud architectures. Here is an overview of his flagship projects:

### 1. SERBOSEVA — AI Powered Home Services & Digital Solutions Marketplace
A production-ready full-stack marketplace connecting **1,000+ users** with **500+ verified professionals** across **210+ home and digital services**.
• **Key Contributions:** Engineered 20+ RESTful APIs with Firebase Phone OTP, Google OAuth, and JWT RBAC. Integrated AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Razorpay payments, and AI service recommendations.
• **Impact:** Improved booking completion time by 60% and page performance by 35%.
• **Tech Stack:** React.js, TypeScript, Node.js, Express.js, PostgreSQL, Supabase, AWS, Razorpay
• **Status:** [Live Website](https://serboseva.com)

### 2. VChat — AI-Enabled Real-Time Communication Platform
A full-stack real-time chat application enabling 1:1 and group chats, online presence, typing indicators, and real-time delivery via WebSockets.
• **Key Features:** Integrated AI-powered smart replies, multilingual translation, emotion detection, conversation summarization, and WebRTC audio/video calling.
• **Tech Stack:** React.js, Node.js, Express.js, MongoDB, Socket.IO, WebRTC, JWT
• **Live Application:** [Launch VChat App](https://vchat-app-6.onrender.com) • [Source Code](https://github.com/anandkishore06/VChat-App)

### 3. Interactive Algorithm Sorting Visualizer
A pedagogical visualization tool animating Bubble Sort, Merge Sort, and Quick Sort with custom array sizing, dynamic execution speed, and color-coded state transitions.
• **Tech Stack:** TypeScript, React, HTML5 Canvas, Tailwind CSS
• **Live Application:** [Explore Sorting Visualizer](https://sorting-algorithm-app.onrender.com/) • [Source Code](https://github.com/anandkishore06/Sorting-Algorithm-App)

### 4. AI-Powered Meteorological Weather App
An intelligent forecasting dashboard delivering live weather metrics, severe alerts, interactive Chart.js historical trends, and automated AI climate synthesis.
• **Tech Stack:** React, OpenWeatherMap API, Chart.js, Tailwind CSS
• **Live Application:** [Experience Weather App](https://ai-powered-weather-app-kmai.onrender.com/) • [Source Code](https://github.com/anandkishore06/AI-Powered-Weather-App)

### 5. Winsome — Prompt-to-Full-Stack App Generator
An innovative developer tool transforming natural language prompts into production-ready web application scaffolds with state management and persistent database integration.
• **Tech Stack:** TypeScript, React, Supabase, Clerk Auth, Tailwind CSS

Feel free to ask for deeper technical breakdowns, architecture decisions, or source code insights on any of these projects!`,
      };
    }
    if (/\b(skill|skills|tech|stack|technologies|tools|languages?)\b/.test(text)) {
      return {
        section: "skills",
        response: `Anand's technical capabilities span enterprise full-stack development, modern AI/LLM engineering, distributed microservices, and cloud DevOps:

### AI & LLM Engineering
• **Frameworks & Concepts:** OpenAI API, RAG (Retrieval-Augmented Generation), LangChain, Agentic AI, MCP (Model Context Protocol), Prompt Engineering, Vector Search, Embeddings, Reranking
• **Vector Databases & Tools:** PostgreSQL / pgvector, Cursor, GitHub Copilot, ChatGPT, Claude, Gemini

### Backend & Enterprise APIs
• **Languages & Frameworks:** Spring Boot, Java, RESTful APIs, Hibernate ORM, Node.js, Express.js, Python
• **Core Principles:** Microservices architecture, Object-Oriented Programming, Data Structures & Algorithms, System Design

### Frontend Architecture & Interactive UI
• **Libraries & Frameworks:** React.js, Redux, Next.js, TypeScript, JavaScript (ES6+), HTML5, CSS3, Tailwind CSS
• **Design Systems & UX:** Modern component libraries, responsive design, micro-animations, accessible interfaces

### Databases & Cloud / DevOps
• **Databases:** Oracle DB, PostgreSQL, pgvector, MySQL, MongoDB, Supabase
• **Cloud & DevOps:** AWS (EC2, S3, Lambda, CloudFront, SES, RDS), Docker, Jenkins, CI/CD pipelines, Git, GitHub
• **Tools & Platforms:** LabVantage LIMS, IntelliJ IDEA, VS Code, JIRA, Confluence, Linux, Windows

Would you like to explore how Anand applies any of these technologies or check out his recent implementations?`,
      };
    }
    if (/\b(experience|career|job|intern(ship)?|company|labvantage|work)\b/.test(text)) {
      return {
        section: "experience",
        response: `Anand brings **3+ years of professional software engineering experience**, combining enterprise Laboratory Information Management Systems (LIMS) engineering with cutting-edge AI and full-stack development at **LabVantage Solutions, Inc**:

### AI Engineer / Associate Software Engineer — LabVantage Solutions, Inc.
*(Sep 2023 – Present | Kolkata, India)*
• **Enterprise LIMS Enhancements:** Developed and maintained enterprise LIMS applications, delivering 15+ feature enhancements and improving usability and customer satisfaction by 30%. Built full-stack functionality across React.js and Java-based backend services with Oracle integration.
• **Spring Boot Microservices:** Designed and implemented RESTful APIs using Spring Boot, enabling scalable backend services and seamless module integration.
• **RAG Chatbots & AI Agents:** Developing RAG-based chatbots and document agents to automate manual workflows within the LabVantage product using OpenAI and LangChain.
• **Document Intelligence Pipelines:** Built document intelligence pipelines for PDF/document ingestion, chunking, embeddings, vector retrieval, and reranking using PostgreSQL/pgvector.
• **Enterprise Platforms:** Collaborated with DevOps to build 4 internal enterprise platforms, streamlining workflows for 2,000+ users and reducing operational costs by 40%.
• **Automation & Reliability:** Automated installation and deployment workflows, slashing setup time from 10–12 hours to under 10 minutes; resolved 35+ production issues through root-cause analysis.

### Associate Solution Engineer — LabVantage Solutions, Inc.
*(Jan 2023 – Jul 2023 | Kolkata, India)*
• Contributed production-level code to enterprise LabVantage LIMS modules and supported feature implementations.
• Integrated 10+ RESTful APIs with frontend applications, improving responsiveness and user experience.
• Customized HTML reports and product labels to meet client-specific business requirements.
• Diagnosed and resolved 30+ configuration and functional issues, reducing support escalations and improving usability.

Ask me about any specific aspect of his work at LabVantage or the technical challenges he tackled!`,
      };
    }
    if (/\b(about|who are you|intro|bio|yourself|anand)\b/.test(text)) {
      return {
        section: "about",
        response: `Anand Kishore is an **AI Engineer & Full-Stack Software Engineer with 3+ years of experience** based in **Kolkata, India**.

He currently works at **LabVantage Solutions, Inc**, developing RAG-based chatbots, document intelligence agents, and enterprise LIMS applications using OpenAI, LangChain, Python, pgvector, MCP, Spring Boot, Java, and React.js.

He holds a **Bachelor of Technology in Computer Science Engineering** from **Haldia Institute of Technology** with an outstanding **CGPA of 9.23 / 10** (Aug 2019 – Aug 2023).

Beyond enterprise engineering, Anand architected **SERBOSEVA**, a cloud-native home services marketplace connecting 1,000+ users with 500+ professionals across 210+ services, and **VChat**, an AI-enabled real-time chat application with WebRTC and sentiment intelligence.

What would you like to know more about — his enterprise experience, projects, or technical skills?`,
      };
    }
    if (/\b(contact|email|phone|reach|hire|message|call|touch)\b/.test(text)) {
      return {
        section: "contact",
        response: `Anand is always open to discussing new software engineering roles, AI projects, or technical collaborations. Here are the best ways to connect directly:

### Direct Channels
• **Email:** [anandkishore060@gmail.com](mailto:anandkishore060@gmail.com)
• **Phone:** [+91 7070382594](tel:+917070382594)
• **Location:** Kolkata, India

### Professional Profiles & Code
• **LinkedIn:** [linkedin.com/in/anandkishore060](https://www.linkedin.com/in/anandkishore060/)
• **GitHub:** [github.com/anandkishore06](https://github.com/anandkishore06)
• **Twitter / X:** [@anandkishore06](https://x.com/anandkishore06)

Feel free to send an email or reach out on LinkedIn — he typically responds promptly!`,
      };
    }
    if (/\b(hi|hello|hey|hola|greetings?)\b/.test(text)) {
      return {
        section: "greeting",
        response: `Hello there! Welcome to Anand Kishore's interactive portfolio space 👋

I'm **Anand AI**, your intelligent guide. Whether you're interested in his full-stack software engineering background, want to explore featured projects like **VChat** and the **Sorting Visualizer**, or need details on his enterprise work at **LabVantage Solutions**, I'm here to provide comprehensive insights.

Here are a few great places to start:
• *"Can you give me an overview of Anand's core tech stack?"*
• *"What featured full-stack projects has Anand built?"*
• *"Tell me about his professional experience at LabVantage Solutions."*
• *"How can I get in touch with Anand for an opportunity?"*

What would you like to explore today?`,
      };
    }
    if (/\b(fun|joke|jokes|facts?|trivia|quote|quotes|laugh|humor)\b/.test(text)) {
      return {
        section: "fun",
        response: `Here is a relatable one for developers! 😄

**The Senior Developer Paradox:**
> A junior developer asks: *"Why do we always write code for 2 hours, and then spend 6 hours debugging the code we just wrote?"*
> 
> The senior developer smiles warmly: *"Because debugging is twice as hard as writing the code in the first place. Therefore, if you write code as cleverly as possible, you are, by definition, not smart enough to debug it!"*

☕ Click **🎉 Fun** again for another tech laugh, or ask me about Anand's real-world engineering work!`,
      };
    }
    return {
      section: "general",
      response: "I'm Anand AI! You can ask me anything about Anand's full-stack architecture, key projects, technical skillset, professional work at LabVantage, or how to get in touch. How can I assist you?",
    };
  };

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
      let res: Response | null = null;
      try {
        res = await fetch(BACKEND_API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: trimmedQuery }),
        });
      } catch (err) {
        console.warn("Primary API endpoint unreachable, attempting alternative:", err);
      }

      // If local failed (or primary failed), try the alternate endpoint
      if (!res || !res.ok) {
        const altUrl = BACKEND_API_URL.includes("localhost")
          ? "https://ai-portfolio-backend-647g.onrender.com/api/ai"
          : "http://localhost:5000/api/ai";
        try {
          res = await fetch(altUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: trimmedQuery }),
          });
        } catch {
          // both endpoints unreachable
        }
      }

      let backendSection = "";
      let backendResponse = "";

      if (res && res.ok) {
        const data = await res.json().catch(() => ({}));
        backendSection = normalizeSection(data?.section);
        backendResponse = typeof data?.response === "string" ? data.response.trim() : "";
      }

      // If backend returned valid section & response, use it; otherwise use client fallback
      let knownSection =
        backendSection && VALID_SECTIONS.includes(backendSection as (typeof VALID_SECTIONS)[number])
          ? backendSection
          : "";

      let finalContent = backendResponse;

      if (!knownSection || !finalContent || knownSection === "notfound") {
        const fallback = getClientFallback(trimmedQuery);
        knownSection = fallback.section;
        finalContent = fallback.response;
      }

      const aiMessage: Message = {
        sender: "ai",
        content: finalContent,
        section: knownSection,
      };

      const newHistory = [...updatedHistory, aiMessage];
      setChatHistory(newHistory);
      localStorage.setItem("chatHistory", JSON.stringify(newHistory));
      setSelectedSection(knownSection);
    } catch (error) {
      console.warn("Chat query fallback triggered:", error);
      const fallback = getClientFallback(trimmedQuery);
      const errMessage: Message = {
        sender: "ai",
        content: fallback.response,
        section: fallback.section,
      };
      const errorHistory = [...updatedHistory, errMessage];
      setChatHistory(errorHistory);
      localStorage.setItem("chatHistory", JSON.stringify(errorHistory));
      setSelectedSection(fallback.section);
    }

    setIsTyping(false);
  };

  const handleClearChat = () => {
    setChatHistory([]);
    localStorage.removeItem("chatHistory");
  };

  useEffect(() => {
    if (chatHistory.length === 0) return;

    // Smoothly scroll so the new response is visible without jumping or clipping
    chatEndRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [chatHistory.length]);

  useEffect(() => {
    setShowFooter(true);
  }, []);

  const professions = [
    "AI Engineer developing RAG chatbots & document intelligence agents 🤖",
    "Software Engineer with 3+ years experience building enterprise applications 🚀",
    "Spring Boot & Java Backend Developer engineering scalable REST APIs ⚙️",
    "Creator & Architect of SERBOSEVA: AI Home Services Marketplace 🛠️",
    "React.js & TypeScript Specialist crafting high-performance interfaces ✨",
    "Cloud & DevOps Practitioner deploying on AWS, Docker & CI/CD ☁️",
    "A Curious Technologist building intelligent, user-centric systems 🔍",
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
      className="min-h-screen flex flex-col overflow-x-hidden bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative transition-colors duration-300 selection:bg-teal/20 selection:text-teal"
    >
      <Navbar />
      <MouseGlow />

      {/* Ambient background lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] bg-gradient-to-b from-teal/15 via-teal/5 to-transparent blur-3xl pointer-events-none -z-10 rounded-full" />

      {showInitialPopup && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            className="bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 rounded-3xl shadow-2xl p-6 sm:p-8 max-w-md w-full relative"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-teal/10 text-teal flex items-center justify-center border border-teal/20">
                <AIIcon className="w-5 h-5 text-teal" />
              </div>
              <div>
                <h2 className="text-lg font-bold">Interactive AI Ready</h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">Powered by AI & Portfolio Knowledge</p>
              </div>
            </div>
            <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
              The AI assistant is warm and ready to answer any questions about my projects, stack, experience, and background. Feel free to type or click the action chips below!
            </p>

            <button
              onClick={() => {
                setShowInitialPopup(false);
                localStorage.setItem("ai-popup-dismissed", "true");
              }}
              className="mt-6 w-full bg-teal hover:bg-teal/90 text-zinc-950 font-semibold text-sm py-2.5 px-4 rounded-xl shadow-sm transition-all duration-200 active:scale-98"
            >
              Start Exploring
            </button>
          </motion.div>
        </motion.div>
      )}

      <main className="flex-grow px-3 sm:px-4 text-center overflow-x-hidden" id="home">
        <div className="pt-24 sm:pt-28 md:pt-36 flex flex-col items-center justify-center gap-4 sm:gap-5 px-0 sm:px-4 md:px-0 max-w-3xl mx-auto w-full">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
              Hey, I'm Anand
            </h1>
            <span className="text-2xl sm:text-3xl animate-bounce">👋</span>
          </motion.div>

          {/* Dynamic Profession Banner */}
          <motion.div
            key={currentProfession}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4 }}
            className="flex items-start sm:items-center gap-2 px-4 py-2 sm:py-1.5 rounded-2xl sm:rounded-full text-xs sm:text-sm font-medium bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 shadow-2xs max-w-full sm:max-w-[90%] text-left sm:text-center"
          >
            <AIIcon className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5 sm:mt-0" />
            <span className="gradient-text font-semibold leading-snug">{currentProfession}</span>
          </motion.div>

          {/* Avatar with Halo */}
          <div className="relative group my-1 sm:my-2">
            <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-teal via-teal/40 to-amber blur-md opacity-40 group-hover:opacity-75 transition-opacity duration-500" />
            <motion.img
              src="img1.png"
              alt="Anand Kishore"
              className="relative w-32 h-32 sm:w-44 sm:h-44 md:w-56 md:h-56 rounded-full object-cover ring-4 ring-white dark:ring-zinc-900 shadow-xl"
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            />
          </div>

          {/* Minimal Interactive Prompt Chip */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center justify-center gap-1 sm:gap-1.5 px-4 sm:px-5 py-2.5 rounded-2xl border border-zinc-200/90 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md shadow-xs text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 w-full max-w-md sm:max-w-xl"
          >
            <span>Ask me anything about my</span>
            <span className="font-semibold text-teal">projects</span>,
            <span className="font-semibold text-purple-500 dark:text-purple-400">skills</span>,
            <span className="font-semibold text-pink-500 dark:text-pink-400">experience</span>,
            <span>or</span>
            <span className="font-semibold text-amber">how to reach me</span>
            <span className="text-amber">✨</span>
          </motion.div>
        </div>

        <div className="mt-6 sm:mt-8 mb-24 w-full md:w-[75%] mx-auto px-0 sm:px-2 md:px-6 flex flex-col">
          <div
            className={cn("w-full space-y-6 transition-all", chatHistory.length > 0 && "py-4 sm:py-6")}
            ref={chatContainerRef}
          >
            {chatHistory.map((msg, index) => (
              <div
                key={index}
                className={`w-full flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                {msg.sender === "user" ? (
                  <div className="flex items-end gap-2.5 max-w-[85%] sm:max-w-[75%]">
                    <div className="bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900 rounded-2xl rounded-br-xs px-4 py-2.5 text-sm font-medium shadow-sm leading-relaxed text-left">
                      {msg.content}
                    </div>
                    <div className="w-7 h-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center flex-shrink-0 shadow-xs mb-0.5">
                      <img
                        src="user.png"
                        alt="User Avatar"
                        className="w-4.5 h-4.5 rounded-full object-contain"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="w-full flex flex-col gap-2.5 text-left">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center flex-shrink-0 shadow-xs">
                        <img
                          src="bot.png"
                          alt="AI Avatar"
                          className="w-4.5 h-4.5 rounded-full object-contain"
                        />
                      </div>
                      <span className="font-semibold text-xs tracking-wide text-zinc-900 dark:text-zinc-100">
                        Anand AI
                      </span>
                      <span className="text-[10px] font-medium text-teal bg-teal/10 dark:bg-teal/20 px-2 py-0.5 rounded-full border border-teal/20">
                        Assistant
                      </span>
                    </div>

                    <div className="text-sm text-zinc-800 dark:text-zinc-200 leading-relaxed pl-1 sm:pl-2">
                      {[
                        "projects",
                        "about",
                        "experience",
                        "skills",
                        "contact",
                        "personal",
                      ].includes(msg.section || "") === false && (
                        <div>{renderFormattedText(msg.content)}</div>
                      )}

                      {msg.section === "projects" && (
                        <div className="mt-2 w-full space-y-4">
                          <div>{renderFormattedText(msg.content)}</div>
                          <Projects />
                        </div>
                      )}
                      {msg.section === "about" && (
                        <div className="mt-2 w-full space-y-4">
                          <div>{renderFormattedText(msg.content)}</div>
                          <About />
                        </div>
                      )}
                      {msg.section === "experience" && (
                        <div className="mt-2 w-full space-y-4">
                          <div>{renderFormattedText(msg.content)}</div>
                          <Experience />
                        </div>
                      )}
                      {msg.section === "skills" && (
                        <div className="mt-2 w-full space-y-4">
                          <div>{renderFormattedText(msg.content)}</div>
                          <Skills />
                        </div>
                      )}
                      {msg.section === "contact" && (
                        <div className="mt-2 w-full space-y-4">
                          <div>{renderFormattedText(msg.content)}</div>
                          <Contact />
                        </div>
                      )}
                      {msg.section === "personal" && (
                        <div>{renderFormattedText(msg.content)}</div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2.5 text-sm pl-1 my-2">
                <div className="w-7 h-7 rounded-full bg-teal/15 border border-teal/30 flex items-center justify-center flex-shrink-0 animate-pulse shadow-xs">
                  <img
                    src="bot.png"
                    alt="AI Avatar"
                    className="w-4.5 h-4.5 rounded-full object-contain"
                  />
                </div>
                <div className="px-3 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 flex items-center gap-2 border border-zinc-200 dark:border-zinc-700/60 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-teal animate-bounce [animation-delay:0.4s]" />
                  <span className="ml-1 text-xs font-medium">Anand AI is thinking...</span>
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <div className="relative mt-8 w-full max-w-2xl mx-auto group">
            <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-teal/20 via-transparent to-amber/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 blur-sm pointer-events-none" />
            <div className="relative flex items-center bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl border border-zinc-200/90 dark:border-zinc-800 rounded-2xl shadow-lg shadow-zinc-900/5 group-focus-within:border-teal/50 transition-all">
              <div className="pl-4 text-teal/80 pointer-events-none">
                <AIIcon className="w-4 h-4 text-teal" />
              </div>
              <input
                className="w-full pl-3 pr-14 py-3.5 bg-transparent text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-500 focus:outline-none text-sm sm:text-base font-normal"
                placeholder="Ask me anything about my work, skills, or projects..."
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
                disabled={!chatInput.trim()}
                className="absolute right-2.5 p-2 rounded-xl bg-teal hover:bg-teal/90 text-zinc-950 font-medium transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-xs"
                aria-label="Send query"
              >
                <SendHorizontal className="w-4 h-4 text-zinc-950" />
              </button>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap justify-center items-center gap-2">
            {[
              { label: "About", emoji: "👤", value: "about" },
              { label: "Projects", emoji: "💼", value: "projects" },
              { label: "Skills", emoji: "🛠", value: "skills" },
              { label: "Experience", emoji: "📈", value: "experience" },
              { label: "Contact", emoji: "✉️", value: "contact" },
              { label: "Fun Facts", emoji: "✨", value: "fun" },
            ].map((btn) => (
              <button
                key={btn.value}
                onClick={() => handleQuery(btn.value)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-200/80 dark:border-zinc-800 bg-white/70 dark:bg-zinc-900/70 hover:bg-zinc-100 dark:hover:bg-zinc-800/90 hover:border-teal/40 dark:hover:border-teal/40 hover:text-teal dark:hover:text-teal text-zinc-600 dark:text-zinc-400 transition-all duration-150 shadow-2xs hover:scale-102 active:scale-97"
              >
                <span className="text-xs">{btn.emoji}</span>
                <span>{btn.label}</span>
              </button>
            ))}
            <button
              onClick={handleClearChat}
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium border border-zinc-200 dark:border-zinc-800 text-zinc-400 hover:text-red-500 hover:border-red-200 dark:hover:border-red-900/50 hover:bg-red-50/50 dark:hover:bg-red-950/20 transition-all duration-150 shadow-2xs"
            >
              <Trash2 className="w-3 h-3" />
              <span>Clear</span>
            </button>
          </div>
        </div>
      </main>

      {showFooter && <Footer />}
    </div>
  );
};

export default Index;

import React from "react";
import { motion } from "framer-motion";
import {
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaReact,
  FaNodeJs,
  FaDatabase,
  FaDocker,
  FaAws,
  FaJava,
  FaPython,
  FaGitAlt,
  FaJenkins,
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
  SiSpringboot,
  SiOpenai,
  SiMysql,
  SiLinux,
} from "react-icons/si";
import { Bot, Cpu, Layers } from "lucide-react";

const skillGroups = [
  {
    title: "AI & LLM Engineering",
    description: "RAG architectures, agentic systems & document intelligence",
    badgeColor: "text-teal bg-teal/10 border-teal/20",
    skills: [
      { name: "OpenAI API", icon: <SiOpenai className="text-teal" /> },
      { name: "RAG Architecture", icon: <Bot className="w-3.5 h-3.5 text-amber" /> },
      { name: "LangChain", icon: <Bot className="w-3.5 h-3.5 text-emerald-400" /> },
      { name: "Agentic AI & MCP", icon: <Cpu className="w-3.5 h-3.5 text-purple-400" /> },
      { name: "pgvector & Embeddings", icon: <SiPostgresql className="text-blue-400" /> },
      { name: "Vector Search & Reranking", icon: <FaDatabase className="text-teal" /> },
      { name: "Prompt Engineering", icon: <Layers className="w-3.5 h-3.5 text-amber" /> },
      { name: "AI Dev (Cursor, Copilot)", icon: <Bot className="w-3.5 h-3.5 text-teal" /> },
    ],
  },
  {
    title: "Backend & Enterprise APIs",
    description: "High-throughput services, RESTful APIs & ORMs",
    badgeColor: "text-amber bg-amber/10 border-amber/20",
    skills: [
      { name: "Spring Boot", icon: <SiSpringboot className="text-emerald-500" /> },
      { name: "Java", icon: <FaJava className="text-orange-500" /> },
      { name: "RESTful APIs", icon: <FaDatabase className="text-teal" /> },
      { name: "Hibernate ORM", icon: <Layers className="w-3.5 h-3.5 text-amber" /> },
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", icon: <FaNodeJs /> },
      { name: "Python", icon: <FaPython className="text-yellow-400" /> },
      { name: "Microservices", icon: <Layers className="w-3.5 h-3.5 text-purple-400" /> },
    ],
  },
  {
    title: "Frontend Engineering",
    description: "Modern, responsive, component-driven client architectures",
    badgeColor: "text-cyan-500 bg-cyan-500/10 border-cyan-500/20",
    skills: [
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-500" /> },
      { name: "JavaScript (ES6+)", icon: <FaJs className="text-amber" /> },
      { name: "Redux", icon: <Layers className="w-3.5 h-3.5 text-purple-500" /> },
      { name: "Tailwind CSS", icon: <SiTailwindcss className="text-teal" /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "HTML5 / CSS3", icon: <FaHtml5 className="text-orange-500" /> },
    ],
  },
  {
    title: "Databases & Storage",
    description: "Relational, document, and vector-enabled data stores",
    badgeColor: "text-blue-500 bg-blue-500/10 border-blue-500/20",
    skills: [
      { name: "Oracle DB", icon: <FaDatabase className="text-red-500" /> },
      { name: "PostgreSQL", icon: <SiPostgresql className="text-blue-400" /> },
      { name: "pgvector", icon: <SiPostgresql className="text-teal" /> },
      { name: "MongoDB", icon: <SiMongodb className="text-emerald-500" /> },
      { name: "MySQL", icon: <SiMysql className="text-blue-500" /> },
      { name: "Supabase", icon: <FaDatabase className="text-emerald-400" /> },
    ],
  },
  {
    title: "Cloud, DevOps & Tooling",
    description: "Automated pipelines, cloud platforms & enterprise tooling",
    badgeColor: "text-purple-500 bg-purple-500/10 border-purple-500/20",
    skills: [
      { name: "AWS (EC2, S3, Lambda)", icon: <FaAws className="text-amber" /> },
      { name: "Docker", icon: <FaDocker className="text-blue-500" /> },
      { name: "Jenkins & CI/CD", icon: <FaJenkins className="text-red-400" /> },
      { name: "Git & GitHub", icon: <FaGitAlt className="text-orange-500" /> },
      { name: "LabVantage LIMS", icon: <Layers className="w-3.5 h-3.5 text-teal" /> },
      { name: "Linux / Windows", icon: <SiLinux className="text-amber" /> },
      { name: "Agile / Scrum & JIRA", icon: <Layers className="w-3.5 h-3.5 text-blue-400" /> },
    ],
  },
];

const Skills = () => (
  <section className="py-8 sm:py-12">
    <div className="text-center mb-10">
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
        Technical <span className="gradient-text">Skills</span>
      </h2>
      <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal to-amber mx-auto mb-4" />
      <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
        Enterprise technologies, AI frameworks, and distributed system tools I use to build scalable products.
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
      {skillGroups.map((group, idx) => (
        <motion.div
          key={idx}
          className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all flex flex-col"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.08 }}
        >
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-base sm:text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {group.title}
            </h3>
            <span className={`text-[11px] font-mono px-2 py-0.5 rounded-md border ${group.badgeColor}`}>
              {group.skills.length} items
            </span>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">
            {group.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto">
            {group.skills.map((skill) => (
              <span
                key={skill.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-medium bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-800 dark:text-zinc-200 border border-zinc-200/70 dark:border-zinc-700/70 hover:border-teal/50 hover:text-teal dark:hover:text-teal transition-colors shadow-2xs"
              >
                <span className="text-sm">{skill.icon}</span>
                <span>{skill.name}</span>
              </span>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;

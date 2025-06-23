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
} from "react-icons/fa";
import {
  SiTypescript,
  SiNextdotjs,
  SiTailwindcss,
  SiPostgresql,
  SiMongodb,
} from "react-icons/si";

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "HTML", icon: <FaHtml5 /> },
      { name: "CSS", icon: <FaCss3Alt /> },
      { name: "JavaScript", icon: <FaJs /> },
      { name: "TypeScript", icon: <SiTypescript /> },
      { name: "React", icon: <FaReact /> },
      { name: "Next.js", icon: <SiNextdotjs /> },
      { name: "Tailwind", icon: <SiTailwindcss /> },
      { name: "Shadcn UI", icon: <SiTailwindcss /> },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js", icon: <FaNodeJs /> },
      { name: "Express.js", icon: <FaNodeJs /> },
      { name: "MongoDB", icon: <SiMongodb /> },
      { name: "PostgreSQL", icon: <SiPostgresql /> },
      { name: "REST APIs", icon: <FaDatabase /> },
      { name: "WebSockets", icon: <FaDatabase /> },
      { name: "JWT", icon: <FaDatabase /> },
    ],
  },
  {
    title: "Tools & Platforms",
    skills: [
      { name: "Git", icon: <FaDatabase /> },
      { name: "GitHub", icon: <FaDatabase /> },
      { name: "Docker", icon: <FaDocker /> },
      { name: "AWS", icon: <FaAws /> },
      { name: "CI/CD", icon: <FaDatabase /> },
      { name: "Vercel", icon: <FaDatabase /> },
      { name: "Netlify", icon: <FaDatabase /> },
      { name: "Postman", icon: <FaDatabase /> },
      { name: "Render", icon: <FaDatabase /> },
    ],
  },
];

const Skills = () => (
  <section className="py-16 px-4 sm:px-6 lg:px-8">
    <div className="max-w-6xl mx-auto">
      <motion.h3
        className="text-3xl sm:text-4xl font-bold mb-16 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        My <span className="gradient-text">Skills</span>
      </motion.h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {skillGroups.map((group, idx) => (
          <motion.div
            key={idx}
            className="border border-gray-700 rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
          >
            <h5 className="text-xl font-semibold mb-4 text-teal text-left">
              {group.title}
            </h5>
            <div className="flex flex-wrap gap-3">
              {group.skills.map((skill) => (
                <span
                  key={skill.name}
                  className="flex items-center gap-2 border border-gray-600 text-sm text-gray-200 rounded-full px-3 py-1 hover:bg-gray-700 transition-colors"
                >
                  <span className="text-md">{skill.icon}</span>
                  {skill.name}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Skills;

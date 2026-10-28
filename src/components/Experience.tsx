import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceItemProps {
  title: string;
  company: string;
  location?: string;
  period: string;
  description: string;
  bullets?: string[];
  skills: string[];
  index: number;
}

const ExperienceItem = ({
  title,
  company,
  location = "Kolkata, India",
  period,
  description,
  bullets = [],
  skills,
  index,
}: ExperienceItemProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.15 }}
      className="relative pl-7 sm:pl-8 pb-10 last:pb-0"
    >
      {/* Timeline connector & dot */}
      <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full bg-gradient-to-tr from-teal to-amber ring-4 ring-teal/20 dark:ring-teal/30 z-10" />
      <div className="absolute left-[6px] top-4 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800" />

      {/* Card Content */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-md transition-all text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
          <h3 className="text-base sm:text-lg font-bold text-zinc-900 dark:text-zinc-100">
            {title}
          </h3>
          <span className="inline-flex items-center gap-1.5 text-xs font-mono px-2.5 py-0.5 rounded-md bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200/80 dark:border-zinc-700/60 w-fit">
            <Calendar className="w-3 h-3 text-teal" />
            {period}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm font-semibold text-teal mb-3">
          <div className="flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-teal" />
            <span>{company}</span>
          </div>
          {location && (
            <div className="flex items-center gap-1 text-zinc-500 dark:text-zinc-400 font-normal text-xs">
              <MapPin className="w-3 h-3 text-amber" />
              <span>{location}</span>
            </div>
          )}
        </div>

        <p className="text-xs sm:text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed mb-3 font-medium">
          {description}
        </p>

        {bullets.length > 0 && (
          <div className="space-y-1.5 mb-4">
            {bullets.map((bullet, bIdx) => (
              <div key={bIdx} className="flex items-start gap-2 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                <CheckCircle2 className="w-3.5 h-3.5 text-teal flex-shrink-0 mt-0.5" />
                <span>{bullet}</span>
              </div>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-1.5 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
          {skills.map((skill, i) => (
            <span
              key={i}
              className="px-2.5 py-0.5 text-[11px] font-medium rounded-full bg-zinc-100/90 dark:bg-zinc-800/90 text-zinc-700 dark:text-zinc-300 border border-zinc-200/70 dark:border-zinc-700/70"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "AI Engineer / Associate Software Engineer",
      company: "LabVantage Solutions, Inc",
      location: "Kolkata, India",
      period: "Sep 2023 – Present",
      description:
        "Developing RAG-based AI agents and engineering scalable enterprise LIMS modules across modern React and Java services.",
      bullets: [
        "Developing RAG-based chatbots and document agents to automate manual workflows within the LabVantage product using OpenAI and LangChain.",
        "Built document intelligence pipelines for PDF/document ingestion, chunking, embeddings, vector retrieval, and reranking using PostgreSQL/pgvector.",
        "Developed and maintained enterprise LIMS applications, delivering 15+ feature enhancements and improving usability and customer satisfaction by 30%.",
        "Designed and implemented RESTful APIs using Spring Boot, enabling scalable backend services and seamless module integration.",
        "Collaborated with DevOps to build 4 internal enterprise platforms, streamlining workflows for 2,000+ users and reducing operational costs by 40%.",
        "Automated installation and deployment workflows, cutting setup time from 10–12 hours to under 10 minutes; resolved 35+ production issues via root-cause analysis.",
      ],
      skills: [
        "OpenAI API",
        "LangChain",
        "RAG",
        "pgvector",
        "Python",
        "MCP",
        "Spring Boot",
        "Java",
        "React.js",
        "Oracle DB",
        "AWS",
        "Docker",
        "REST APIs",
      ],
    },
    {
      title: "Associate Solution Engineer",
      company: "LabVantage Solutions, Inc",
      location: "Kolkata, India",
      period: "Jan 2023 – Jul 2023",
      description:
        "Contributed production-level code to core enterprise LabVantage LIMS modules and supported client feature implementations.",
      bullets: [
        "Contributed production-level code to enterprise LabVantage LIMS modules and supported feature implementations.",
        "Integrated 10+ RESTful APIs with frontend applications, improving responsiveness and user experience.",
        "Customized HTML reports and product labels to meet client-specific business requirements.",
        "Diagnosed and resolved 30+ configuration and functional issues, reducing support escalations and improving usability.",
      ],
      skills: ["Java", "JavaScript", "SQL", "REST APIs", "HTML Reports", "LabVantage LIMS"],
    },
  ];

  return (
    <section id="experience" className="py-8 sm:py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Work <span className="gradient-text">Experience</span>
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal to-amber mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          My professional track record building enterprise AI systems, production LIMS applications, and distributed platforms.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        {experiences.map((exp, index) => (
          <ExperienceItem
            key={index}
            index={index}
            title={exp.title}
            company={exp.company}
            location={exp.location}
            period={exp.period}
            description={exp.description}
            bullets={exp.bullets}
            skills={exp.skills}
          />
        ))}
      </div>
    </section>
  );
};

export default Experience;

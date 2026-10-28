import React from "react";
import { CheckCircle2, Code2, Bot, Database, GraduationCap } from "lucide-react";

const About = () => {
  const services = [
    {
      title: "AI & Document Intelligence",
      description:
        "Building RAG-based chatbots, document intelligence pipelines, embeddings, and agentic workflows using OpenAI, LangChain, pgvector, and MCP.",
      icon: <Bot className="w-6 h-6 text-teal" />,
    },
    {
      title: "Enterprise Backend & APIs",
      description:
        "Architecting high-throughput RESTful microservices with Spring Boot, Java, Node.js, Hibernate ORM, and Oracle / PostgreSQL databases.",
      icon: <Database className="w-6 h-6 text-amber" />,
    },
    {
      title: "Full-Stack Web Engineering",
      description:
        "Crafting responsive, high-performance web applications and cloud architectures with React.js, TypeScript, Redux, Tailwind CSS, and AWS.",
      icon: <Code2 className="w-6 h-6 text-teal" />,
    },
  ];

  const highlights = [
    "AI & RAG Document Pipelines (LangChain, pgvector)",
    "Enterprise Spring Boot & Java REST APIs",
    "Production Full-Stack React.js & TypeScript Apps",
    "AWS Cloud, Docker & CI/CD Automated Pipelines",
    "Database Engineering (PostgreSQL, Oracle, MongoDB)",
    "B.Tech CSE from Haldia Institute of Tech (9.23 CGPA)",
  ];

  return (
    <section id="about" className="py-8 sm:py-12">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          About <span className="gradient-text">Me</span>
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal to-amber mx-auto mb-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-16">
        {/* Profile Image Left */}
        <div className="lg:col-span-5 flex justify-center">
          <div className="relative group">
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-teal/30 via-transparent to-amber/30 blur-lg opacity-70 group-hover:opacity-100 transition duration-500" />
            <img
              src="picofme (5).png"
              alt="Anand Kishore"
              className="relative rounded-3xl w-64 sm:w-72 md:w-80 object-cover shadow-xl border border-zinc-200/80 dark:border-zinc-800 transition-transform duration-500 group-hover:scale-102"
            />
          </div>
        </div>

        {/* Bio Right */}
        <div className="lg:col-span-7 space-y-5 text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-teal/10 text-teal border border-teal/20">
            Professional Overview • 3+ Years Experience
          </div>
          <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 tracking-tight">
            I'm an <span className="gradient-text">AI & Full-Stack</span> Software Engineer
          </h3>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Software Engineer with 3+ years of experience building enterprise and full-stack applications using Java, Spring Boot, React, REST APIs, SQL, Hibernate, and Oracle. Currently working at <strong>LabVantage Solutions, Inc</strong> as an AI Engineer / Associate Software Engineer, developing RAG-based chatbots and document agents using OpenAI, LangChain, Python, pgvector, MCP, AWS, and Docker.
          </p>
          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Experienced in production troubleshooting, process automation, Agile delivery, and scalable application development. I also architected <strong>SERBOSEVA</strong>, an AI-powered home services marketplace serving 1,000+ users with 500+ professionals across 210+ services.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
            {highlights.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm font-medium text-zinc-700 dark:text-zinc-300">
                <CheckCircle2 className="w-4 h-4 text-teal flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {/* Education Snippet */}
          <div className="pt-3 border-t border-zinc-200/80 dark:border-zinc-800 flex items-center gap-3 text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
            <div className="w-8 h-8 rounded-lg bg-amber/10 text-amber flex items-center justify-center flex-shrink-0 border border-amber/20">
              <GraduationCap className="w-4 h-4" />
            </div>
            <div>
              <span className="font-semibold text-zinc-900 dark:text-zinc-100">B.Tech in Computer Science Engineering</span> — Haldia Institute of Technology (CGPA: 9.23 / 10)
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div className="mt-12 text-left">
        <h3 className="text-xl sm:text-2xl font-bold text-zinc-900 dark:text-zinc-100 mb-6 text-center">
          Core <span className="gradient-text">Competencies</span>
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-zinc-800/80 shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="w-12 h-12 rounded-xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mb-4">
                {service.icon}
              </div>
              <h4 className="text-base font-semibold text-zinc-900 dark:text-zinc-100 mb-2">
                {service.title}
              </h4>
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;

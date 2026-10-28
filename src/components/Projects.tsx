import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ComingSoonModal from "./ComingSoonModal";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const projects = [
    {
      title: "SERBOSEVA | AI Home Services Marketplace",
      description:
        "Production full-stack marketplace connecting 1,000+ users with 500+ verified professionals across 210+ services with AI recommendations, AWS cloud architecture, and Razorpay.",
      tags: [
        "React.js",
        "TypeScript",
        "Node.js",
        "PostgreSQL",
        "Supabase",
        "AWS",
        "Razorpay",
        "AI",
      ],
      imageUrl:
        "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      demoUrl: "https://serboseva.com",
      codeUrl: "https://github.com/anandkishore06?tab=repositories",
    },
    {
      title: "VChat | AI-Enabled Real-Time Platform",
      description:
        "Full-stack real-time communication platform featuring 1:1 and group chat, WebRTC audio/video calling, and AI smart replies, emotion detection, and summarization.",
      tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Socket.IO", "AI", "WebRTC"],
      imageUrl: "chat.png",
      demoUrl: "https://vchat-app-6.onrender.com",
      codeUrl: "https://github.com/anandkishore06/VChat-App",
    },
    {
      title: "Sorting Visualizer App",
      description:
        "Interactive algorithm visualizer animating Bubble, Merge, and Quick Sort with custom array sizing, dynamic execution speed, and color-coded state transitions.",
      tags: ["TypeScript", "React", "Data Structures", "Tailwind CSS"],
      imageUrl: "image.png",
      demoUrl: "https://sorting-algorithm-app.onrender.com/",
      codeUrl: "https://github.com/anandkishore06/Sorting-Algorithm-App",
    },
    {
      title: "AI-Powered Weather Application",
      description:
        "Meteorology dashboard delivering real-time forecasts, severe weather alerts, interactive Chart.js trends, and automated AI climate summaries.",
      tags: ["React", "API", "AI", "Chart.js"],
      imageUrl:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80",
      demoUrl: "https://ai-powered-weather-app-kmai.onrender.com/",
      codeUrl: "https://github.com/anandkishore06/AI-Powered-Weather-App",
    },
    {
      title: "Winsome App",
      description:
        "Innovative prompt-to-full-stack web application generator with state management, Clerk authentication, and persistent database scaffolding.",
      tags: [
        "TypeScript",
        "Supabase",
        "Clerk Auth",
        "React",
        "AI",
      ],
      imageUrl: "winsome.jpg",
      demoUrl: "#",
      codeUrl: "#",
    },
  ];

  return (
    <section id="projects" className="py-8 sm:py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 mb-3">
          Featured <span className="gradient-text">Projects</span>
        </h2>
        <div className="w-16 h-1 rounded-full bg-gradient-to-r from-teal to-amber mx-auto mb-4" />
        <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 max-w-xl mx-auto leading-relaxed">
          A showcase of full-stack web applications, AI utilities, and interactive platforms built with modern technology.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            index={index}
            title={project.title}
            description={project.description}
            tags={project.tags}
            imageUrl={project.imageUrl}
            demoUrl={project.demoUrl}
            codeUrl={project.codeUrl}
            onDemoClick={() => {
              if (project.demoUrl === "#") {
                setShowModal(true);
              } else {
                window.open(project.demoUrl, "_blank");
              }
            }}
            onCodeClick={() => {
              if (project.codeUrl === "#") {
                setShowModal(true);
              } else {
                window.open(project.codeUrl, "_blank");
              }
            }}
          />
        ))}
      </div>

      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
};

export default Projects;

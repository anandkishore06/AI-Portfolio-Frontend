import React, { useState } from "react";
import ProjectCard from "./ProjectCard";
import ComingSoonModal from "./ComingSoonModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

const Projects = () => {
  const [showModal, setShowModal] = useState(false);
  const projects = [
    {
      title: "VChat Application",
      description:
        "Smart real-time chat with AI-based suggestions, sentiment detection, and modern UI.",
      tags: ["React", "Node.js", "Express.js", "MongoDB", "AI"],
      imageUrl: "chat.png",
      demoUrl: "https://vchat-app-6.onrender.com",
      codeUrl: "https://github.com/anandkishore06/VChat-App",
    },
    {
      title: "Sorting Visualizer App",
      description:
        "Interactive sorting visualizer showcasing algorithms with speed and color transitions.",
      tags: ["TypeScript", "React", "Sorting Algorithm"],
      imageUrl: "image.png",
      demoUrl: "https://sorting-algorithm-app.onrender.com/",
      codeUrl: "https://github.com/anandkishore06/Sorting-Algorithm-App",
    },
    {
      title: "AI Portfolio Website",
      description:
        "A dynamic AI-powered portfolio showcasing skills, projects, and intelligent interaction.",
      tags: ["React", "Tailwind CSS", "Framer Motion"],
      imageUrl:
        "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      demoUrl: "#",
      codeUrl: "#",
    },
    {
      title: "Weather Application",
      description:
        "AI-powered weather app providing forecasts, alerts, and personalized insights.",
      tags: ["React", "API", "AI", "Chart.js"],
      imageUrl:
        "https://images.unsplash.com/photo-1592210454359-9043f067919b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1600&q=80",
      demoUrl: "https://ai-powered-weather-app-kmai.onrender.com/",
      codeUrl: "https://github.com/anandkishore06/AI-Powered-Weather-App",
    },
  ];

  const handleProjectClick = (project) => {
    if (project.demoUrl === "#" && project.codeUrl === "#") {
      // Just show the popup, no new tab
      setShowModal(true);
    } else {
      // Open the demo or code in a new tab
      const url = project.demoUrl !== "#" ? project.demoUrl : project.codeUrl;
      window.open(url, "_blank");
    }
  };

  return (
    <section id="projects" className="section-padding overflow-x-hidden">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            My <span className="gradient-text">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal to-amber mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            Showcasing my best work across web development and design. Each
            project represents unique challenges and creative solutions.
          </p>
        </div>

        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          grabCursor={true} // ✅ enables swipe cursor
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-10 overflow-hidden"
        >
          {projects.map((project, index) => (
            <SwiperSlide key={index}>
              <ProjectCard
                index={index}
                title={project.title}
                description={project.description}
                tags={project.tags}
                imageUrl={project.imageUrl}
                demoUrl={project.demoUrl}
                codeUrl={project.codeUrl}
                onDemoClick={() => {
                  if (project.demoUrl === "#") setShowModal(true);
                  else window.open(project.demoUrl, "_blank");
                }}
                onCodeClick={() => {
                  if (project.codeUrl === "#") setShowModal(true);
                  else window.open(project.codeUrl, "_blank");
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Modal Component */}
      <ComingSoonModal isOpen={showModal} onClose={() => setShowModal(false)} />
    </section>
  );
  // return (
  //   <Swiper
  //     modules={[Navigation, Pagination, Autoplay]}
  //     spaceBetween={30}
  //     slidesPerView={1}
  //     loop={true}
  //     pagination={{ clickable: true }}
  //     navigation={true}
  //     autoplay={{ delay: 3500 }}
  //     breakpoints={{
  //       640: { slidesPerView: 1 },
  //       768: { slidesPerView: 2 },
  //       1024: { slidesPerView: 3 },
  //     }}
  //     className="mySwiper"
  //   >
  //     {projects.map((project, index) => (
  //       <SwiperSlide key={index}>
  //         <ProjectCard
  //           index={index}
  //           title={project.title}
  //           description={project.description}
  //           tags={project.tags}
  //           imageUrl={project.imageUrl}
  //           demoUrl={project.demoUrl}
  //           codeUrl={project.codeUrl}
  //           onDemoClick={() => {
  //             if (project.demoUrl === "#") {
  //               setShowModal(true);
  //             } else {
  //               window.open(project.demoUrl, "_blank");
  //             }
  //           }}
  //           onCodeClick={() => {
  //             if (project.codeUrl === "#") {
  //               setShowModal(true);
  //             } else {
  //               window.open(project.codeUrl, "_blank");
  //             }
  //           }}
  //         />
  //       </SwiperSlide>
  //     ))}
  //   </Swiper>
  // );
};

export default Projects;

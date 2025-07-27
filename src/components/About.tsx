import React from "react";
import { cn } from "@/lib/utils";

const About = () => {
  const services = [
    {
      title: "Web Design",
      description:
        "Creating beautiful, responsive websites with a focus on user experience.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
    {
      title: "App Development",
      description:
        "Building cross-platform mobile applications with React Native.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <path d="M12 18h.01"></path>
        </svg>
      ),
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive interfaces and seamless user experiences.",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="text-teal"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon>
          <line x1="8" y1="2" x2="8" y2="18"></line>
          <line x1="16" y1="6" x2="16" y2="22"></line>
        </svg>
      ),
    },
  ];

  return (
    <section id="about" className="section-padding bg-dark-light">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white dark:text-white">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal to-amber mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Profile Image Left */}
          <div className="flex justify-center lg:justify-start">
            <img
              src="picofme (5).png"
              alt="Profile"
              className="rounded-3xl w-full max-w-xs shadow-xl hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Bio Right */}
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              I'm a <span className="gradient-text">Passionate</span> Full Stack
              Developer
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I am a dedicated web developer with over 2 years of experience in
              building functional and visually appealing websites and
              applications that deliver exceptional user experiences.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My approach combines aesthetic design principles with clean,
              efficient code to deliver solutions that not only look great but
              also perform exceptionally well. I'm constantly learning and
              exploring new technologies to stay at the forefront of web
              development.
            </p>
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              {[
                "UI/UX Design",
                "Web Development",
                "Mobile Apps",
                "Branding",
              ].map((item, idx) => (
                <div key={idx} className="flex gap-2 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    className="text-teal"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div className="mb-20">
          <h3 className="text-2xl font-semibold text-center mb-12 text-white">
            My <span className="gradient-text">Skills</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Frontend",
                skills: [
                  "HTML",
                  "CSS",
                  "JavaScript",
                  "TypeScript",
                  "React",
                  "Next.js",
                  "Tailwind",
                  "Shadcn UI",
                ],
              },
              {
                title: "Backend",
                skills: [
                  "Node.js",
                  "Express.js",
                  "MongoDB",
                  "PostgreSQL",
                  "REST APIs",
                  "WebSockets",
                  "JWT",
                ],
              },
              {
                title: "Tools & Platforms",
                skills: [
                  "Git",
                  "GitHub",
                  "Docker",
                  "AWS",
                  "CI/CD",
                  "Vercel",
                  "Netlify",
                  "Postman",
                  "Render",
                ],
              },
            ].map((group, index) => (
              <div key={index}>
                <h4 className="text-xl font-semibold mb-4 text-teal">
                  {group.title}
                </h4>
                <div className="flex flex-wrap gap-3">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 border border-gray-600 text-gray-300 text-sm rounded-full"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-12 text-white">
            Services I <span className="gradient-text">Offer</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg text-white"
              >
                <div className="mb-5 w-14 h-14 flex items-center justify-center rounded-full bg-dark-light">
                  {service.icon}
                </div>
                <h4 className="text-xl font-semibold mb-3">{service.title}</h4>
                <p className="text-gray-400">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

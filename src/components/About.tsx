
import React from 'react';
import { cn } from "@/lib/utils";

interface SkillProps {
  name: string;
  level: number;
}

const Skill = ({ name, level }: SkillProps) => {
  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-1">
        <span className="font-medium text-gray-300">{name}</span>
        <span className="text-xs text-gray-400">{level}%</span>
      </div>
      <div className="w-full bg-gray-dark rounded-full h-2">
        <div 
          className="bg-gradient-to-r from-teal to-amber h-2 rounded-full"
          style={{ width: `${level}%` }}
        ></div>
      </div>
    </div>
  );
};

const About = () => {
  const skills = [
    { name: 'UI/UX Design', level: 90 },
    { name: 'Front-end Development', level: 85 },
    { name: 'React & TypeScript', level: 80 },
    { name: 'Graphic Design', level: 75 },
    { name: 'Back-end Development', level: 70 },
  ];

  const services = [
    {
      title: 'Web Design',
      description: 'Creating beautiful, responsive websites with a focus on user experience.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
          <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
          <line x1="8" y1="21" x2="16" y2="21"></line>
          <line x1="12" y1="17" x2="12" y2="21"></line>
        </svg>
      ),
    },
    {
      title: 'App Development',
      description: 'Building cross-platform mobile applications with React Native.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
          <path d="M12 18h.01"></path>
        </svg>
      ),
    },
    {
      title: 'UI/UX Design',
      description: 'Designing intuitive interfaces and seamless user experiences.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About <span className="gradient-text">Me</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal to-amber mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">
              I'm a <span className="gradient-text">Creative Designer</span> & Developer
            </h3>
            <p className="text-gray-400 leading-relaxed">
              I am a passionate web designer and developer with over 5 years of experience. I love creating beautiful, functional websites and applications that provide an exceptional user experience.
            </p>
            <p className="text-gray-400 leading-relaxed">
              My approach combines aesthetic design principles with clean, efficient code to deliver solutions that not only look great but also perform exceptionally well. I'm constantly learning and exploring new technologies to stay at the forefront of web development.
            </p>
            
            <div className="grid grid-cols-2 gap-4 text-gray-300">
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>UI/UX Design</span>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Web Development</span>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Mobile Apps</span>
              </div>
              <div className="flex gap-2 items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-teal">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>Branding</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-2xl font-semibold mb-4">My <span className="gradient-text">Skills</span></h3>
            {skills.map((skill, index) => (
              <Skill key={index} name={skill.name} level={skill.level} />
            ))}
          </div>
        </div>
        
        <div className="mt-20">
          <h3 className="text-2xl font-semibold text-center mb-12">
            Services I <span className="gradient-text">Offer</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className="glass-card p-6 transition-all duration-300 hover:translate-y-[-5px] hover:shadow-lg"
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

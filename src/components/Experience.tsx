
import React, { useEffect, useRef } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ExperienceItemProps {
  title: string;
  company: string;
  period: string;
  description: string;
  skills: string[];
  index: number;
}

const ExperienceItem = ({ title, company, period, description, skills, index }: ExperienceItemProps) => {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [controls, isInView]);
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.2
      }
    }
  };
  
  const skillVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      transition: {
        delay: index * 0.2 + 0.3 + i * 0.1,
        duration: 0.3
      }
    })
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={itemVariants}
      className="relative pl-8 mb-12 last:mb-0"
    >
      {/* Timeline dot and line */}
      <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full bg-gradient-to-br from-teal to-amber"></div>
      <div className="absolute left-[7px] top-6 bottom-0 w-0.5 bg-gray-dark h-full"></div>
      
      {/* Content */}
      <div className="glass-card p-6 hover:border-teal/30 transition-colors duration-300">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
          <h3 className="text-xl font-bold">{title}</h3>
          <span className="text-sm text-gray-400 mt-1 md:mt-0">{period}</span>
        </div>
        <h4 className="text-teal mb-4">{company}</h4>
        <p className="text-gray-400 mb-5">{description}</p>
        
        {/* Skills */}
        <div className="flex flex-wrap gap-2 mt-3">
          {skills.map((skill, i) => (
            <motion.span
              key={i}
              custom={i}
              variants={skillVariants}
              className="px-3 py-1 text-xs rounded-full bg-dark border border-gray-dark text-gray-300"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const Experience = () => {
  const experiences = [
    {
      title: "Senior Frontend Developer",
      company: "Tech Innovations Inc.",
      period: "2021 - Present",
      description: "Led the development of multiple web applications using React and TypeScript. Implemented complex UI interactions and animations. Mentored junior developers and improved team workflow.",
      skills: ["React", "TypeScript", "Redux", "Framer Motion", "CI/CD"]
    },
    {
      title: "Web Developer",
      company: "Digital Solutions",
      period: "2018 - 2021",
      description: "Designed and developed responsive websites for various clients across different industries. Created reusable component libraries to improve development efficiency.",
      skills: ["JavaScript", "React", "CSS/SCSS", "Node.js", "REST APIs"]
    },
    {
      title: "UI/UX Developer",
      company: "Creative Agency",
      period: "2016 - 2018",
      description: "Collaborated with designers to transform visual designs into functional interfaces. Focused on creating animated, interactive user experiences across multiple platforms.",
      skills: ["HTML", "CSS", "JavaScript", "Adobe XD", "UI/UX"]
    }
  ];

  const titleRef = useRef(null);
  const isInView = useInView(titleRef, { once: true, amount: 0.2 });

  return (
    <section id="experience" className="section-padding bg-dark">
      <div className="container-custom">
        <motion.div 
          ref={titleRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Work <span className="gradient-text">Experience</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-teal to-amber mx-auto"></div>
          <p className="text-gray-400 mt-6 max-w-2xl mx-auto">
            My professional journey across different roles and companies, showcasing my growth and expertise in web development and design.
          </p>
        </motion.div>
        
        <div className="max-w-3xl mx-auto">
          {experiences.map((exp, index) => (
            <ExperienceItem
              key={index}
              index={index}
              title={exp.title}
              company={exp.company}
              period={exp.period}
              description={exp.description}
              skills={exp.skills}
            />
          ))}
          
          <div className="text-center mt-10">
            <Button 
              className="border border-teal text-teal hover:bg-teal/10"
              variant="outline"
            >
              Download Full Resume
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;

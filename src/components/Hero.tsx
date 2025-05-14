
import React, { useEffect, useState } from 'react';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const phrases = ["Developer", "Designer", "Creator"];

  useEffect(() => {
    setIsVisible(true);
    
    // Typing effect
    const typeText = () => {
      const phrase = phrases[currentIndex];
      const typingInterval = setInterval(() => {
        setCurrentText(prev => {
          const nextChar = phrase.charAt(prev.length);
          const nextText = prev + nextChar;
          
          if (prev.length === phrase.length - 1) {
            clearInterval(typingInterval);
            
            // After typing is complete, wait and then erase
            setTimeout(() => {
              const erasingInterval = setInterval(() => {
                setCurrentText(prev => {
                  const nextText = prev.substring(0, prev.length - 1);
                  
                  if (prev.length === 1) {
                    clearInterval(erasingInterval);
                    
                    // Move to next phrase after erasing
                    setTimeout(() => {
                      setCurrentIndex((prevIndex) => (prevIndex + 1) % phrases.length);
                    }, 500);
                  }
                  
                  return nextText;
                });
              }, 50);
            }, 1500);
          }
          
          return nextText;
        });
      }, 100);
    };
    
    typeText();
  }, [currentIndex]);

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark to-dark-light z-[-1]"></div>
      
      {/* Animated background elements */}
      <div className="absolute top-20 left-10 w-40 h-40 bg-teal/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-60 h-60 bg-amber/10 rounded-full blur-3xl"></div>
      
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className={cn(
            "text-4xl md:text-6xl lg:text-7xl font-bold mb-6 transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}>
            Hello, I'm a <span className="gradient-text">Professional</span>
            <br />
            <span className="gradient-text h-[1.2em] inline-block">{currentText}</span>
            <span className="animate-pulse text-teal">|</span>
          </h1>
          
          <p className={cn(
            "text-gray-400 text-lg md:text-xl mb-8 transition-all duration-1000 delay-300",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}>
            Crafting beautiful digital experiences with a focus on 
            clean design and seamless functionality.
          </p>
          
          <div className={cn(
            "flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-1000 delay-500",
            isVisible ? "opacity-100" : "opacity-0 translate-y-10"
          )}>
            <Button 
              className="bg-teal hover:bg-teal/80 text-dark font-medium px-8 py-6"
              asChild
            >
              <a href="#projects">View My Work</a>
            </Button>
            
            <Button 
              variant="outline" 
              className="border-gray-dark hover:bg-gray-dark/30 px-8 py-6"
              asChild
            >
              <a href="#contact">Contact Me</a>
            </Button>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <a href="#about" aria-label="Scroll down" className="text-gray-400 hover:text-white">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          >
            <path d="M12 5v14M5 12l7 7 7-7"/>
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;

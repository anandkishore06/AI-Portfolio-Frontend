import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Projects", href: "#projects" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8",
        scrolled
          ? "bg-dark-light/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between">
        <a href="#home" className="flex items-center">
          <span className="font-bold text-xl md:text-2xl gradient-text">
            &#123;AK&#125; Portfolio.
          </span>
        </a>

        {/* Desktop Navigation */}
        {/* <nav className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-teal transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </nav> */}

        {/* Mobile Menu Button */}
        {/* <button 
          className="md:hidden p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <div className="space-y-2">
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              mobileMenuOpen && "translate-y-1.5 rotate-45"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              mobileMenuOpen && "opacity-0"
            )}></span>
            <span className={cn(
              "block w-6 h-0.5 bg-white transition-all duration-300",
              mobileMenuOpen && "-translate-y-1.5 -rotate-45"
            )}></span>
          </div>
        </button> */}
      </div>

      {/* Mobile Navigation */}
      {/* <div className={cn(
        "fixed inset-x-0 top-[60px] bg-dark-light/95 backdrop-blur-sm transition-all duration-300 md:hidden",
        mobileMenuOpen ? "opacity-100 h-auto py-4" : "opacity-0 h-0 py-0 overflow-hidden"
      )}>
        <nav className="container-custom flex flex-col space-y-4">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-gray-300 hover:text-teal py-2 px-4 transition-colors duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
        </nav>
      </div> */}
    </header>
  );
};

export default Navbar;

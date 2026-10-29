import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme/ThemeContext";
import { MoonIcon, SunIcon, Download } from "lucide-react";
import AIIcon from "./AIIcon";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 left-0 right-0 w-full z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 pt-3 sm:pt-4">
      {/* Subtle top fade mask so content fading behind floating pill never harshly peeks through top gap */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-50/90 via-zinc-50/60 to-transparent dark:from-zinc-950/95 dark:via-zinc-950/60 dark:to-transparent pointer-events-none -z-10" />

      <div
        className={cn(
          "max-w-6xl mx-auto flex items-center justify-between transition-all duration-300 rounded-2xl relative",
          scrolled
            ? "py-2.5 px-4 sm:px-6 bg-white/85 dark:bg-zinc-900/85 backdrop-blur-xl shadow-md shadow-zinc-950/5 dark:shadow-black/30 border border-zinc-200/70 dark:border-zinc-800/80"
            : "py-3 px-3 sm:px-5 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-zinc-200/40 dark:border-zinc-800/40 shadow-xs"
        )}
      >
        {/* Brand / Logo */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
            if (window.location.hash) {
              history.replaceState(null, "", window.location.pathname);
            }
          }}
          className="group flex items-center gap-2.5 transition-transform duration-200 hover:scale-102 cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-teal to-amber flex items-center justify-center text-zinc-950 font-bold text-sm shadow-sm group-hover:shadow-teal/20 group-hover:shadow-md transition-all">
            AK
          </div>
          <div className="flex flex-col text-left">
            <span className="font-semibold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-zinc-100 group-hover:text-teal transition-colors">
              Anand Kishore
            </span>
            <span className="text-[10px] text-zinc-500 dark:text-zinc-400 font-medium -mt-0.5 flex items-center gap-1">
              <AIIcon className="w-2.5 h-2.5 text-amber" /> AI Portfolio
            </span>
          </div>
        </a>

        {/* Center: Status Indicator (Desktop) - perfectly centered */}
        <div className="hidden md:inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 backdrop-blur-sm md:absolute md:left-1/2 md:-translate-x-1/2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for opportunities</span>
        </div>

        {/* Right Actions: Theme Toggle + Resume */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors border border-transparent hover:border-zinc-200 dark:hover:border-zinc-700/60"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4.5 h-4.5 text-amber transition-transform duration-300 rotate-0 hover:rotate-45" />
            ) : (
              <MoonIcon className="w-4.5 h-4.5 text-zinc-600 transition-transform duration-300 hover:-rotate-12" />
            )}
          </button>

          <a
            href="Anand's_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 hover:bg-zinc-200/80 dark:bg-zinc-800/80 dark:hover:bg-zinc-800 border border-zinc-200 dark:border-zinc-700/80 transition-all duration-200 shadow-xs hover:shadow-sm active:scale-97"
          >
            <Download className="w-4 h-4 text-teal" />
            <span>Resume</span>
          </a>
        </div>

        {/* Mobile controls */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle theme mobile"
          >
            {theme === "dark" ? (
              <SunIcon className="w-4 h-4 text-amber" />
            ) : (
              <MoonIcon className="w-4 h-4 text-zinc-600" />
            )}
          </button>

          <a
            href="Anand's_Resume.pdf"
            download
            className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/80"
            aria-label="Download resume"
          >
            <Download className="w-4 h-4 text-teal" />
          </a>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800"
            aria-label="Toggle menu"
          >
            <div className="w-5 h-4 flex flex-col justify-between">
              <span
                className={cn(
                  "block h-0.5 w-full bg-current transform transition duration-300 ease-in-out",
                  mobileMenuOpen && "rotate-45 translate-y-1.5"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-current transition-opacity duration-300 ease-in-out",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block h-0.5 w-full bg-current transform transition duration-300 ease-in-out",
                  mobileMenuOpen && "-rotate-45 -translate-y-1.5"
                )}
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 max-w-6xl mx-auto p-4 rounded-2xl bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl border border-zinc-200 dark:border-zinc-800 shadow-xl space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center gap-2 px-2 py-1 text-xs text-emerald-600 dark:text-emerald-400 font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Available for opportunities
          </div>
          <a
            href="Anand's_Resume.pdf"
            download
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl text-sm font-medium text-zinc-900 dark:text-zinc-100 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700"
          >
            <Download className="w-4 h-4 text-teal" />
            Download Resume
          </a>
        </div>
      )}
    </header>
  );
};

export default Navbar;

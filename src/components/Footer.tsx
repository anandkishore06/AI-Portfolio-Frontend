import React from "react";
import { ArrowUp } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import AIIcon from "./AIIcon";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-zinc-200/80 dark:border-zinc-800/80 bg-zinc-100/50 dark:bg-zinc-950/50 py-12 mt-16 transition-colors">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left">
          {/* Brand */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-zinc-100">
                &#123;AK&#125; Anand Kishore
              </span>
              <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-teal/10 text-teal border border-teal/20 font-medium">
                <AIIcon className="w-2.5 h-2.5" /> AI Portfolio
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Crafting intelligent, high-performance digital experiences.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2.5">
            <a
              href="https://github.com/anandkishore06"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-teal dark:hover:text-teal border border-zinc-200/80 dark:border-zinc-800 transition-colors shadow-2xs"
              aria-label="GitHub profile"
            >
              <FaGithub className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/anandkishore060/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-teal dark:hover:text-teal border border-zinc-200/80 dark:border-zinc-800 transition-colors shadow-2xs"
              aria-label="LinkedIn profile"
            >
              <FaLinkedin className="w-4 h-4" />
            </a>
            <a
              href="https://x.com/anandkishore06"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:text-teal dark:hover:text-teal border border-zinc-200/80 dark:border-zinc-800 transition-colors shadow-2xs"
              aria-label="Twitter profile"
            >
              <FaTwitter className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Bottom divider and back to top */}
        <div className="mt-8 pt-6 border-t border-zinc-200/60 dark:border-zinc-800/60 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>&copy; {currentYear} Anand Kishore. All rights reserved.</p>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 hover:text-teal transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 transition-transform duration-200 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

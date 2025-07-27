// import React, { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 20;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   const navLinks = [
//     { name: "Home", href: "#home" },
//     { name: "About", href: "#about" },
//     { name: "Experience", href: "#experience" },
//     { name: "Projects", href: "#projects" },
//     { name: "Contact", href: "#contact" },
//   ];

//   return (
//     <header
//       className={cn(
//         "fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8",
//         scrolled
//           ? "bg-dark-light/95 backdrop-blur-sm shadow-md py-3"
//           : "bg-transparent py-5"
//       )}
//     >
//       <div className="container-custom flex items-center justify-between">
//         <a href="#home" className="flex items-center">
//           <span className="font-bold text-xl md:text-2xl gradient-text">
//             &#123;AK&#125; AI Portfolio.
//           </span>
//         </a>

//         {/* Desktop Navigation */}
//         {/* <nav className="hidden md:flex items-center space-x-10">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="text-gray-300 hover:text-teal transition-colors duration-200"
//             >
//               {link.name}
//             </a>
//           ))}
//         </nav> */}

//         {/* Mobile Menu Button */}
//         {/* <button
//           className="md:hidden p-2"
//           onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           <div className="space-y-2">
//             <span className={cn(
//               "block w-6 h-0.5 bg-white transition-all duration-300",
//               mobileMenuOpen && "translate-y-1.5 rotate-45"
//             )}></span>
//             <span className={cn(
//               "block w-6 h-0.5 bg-white transition-all duration-300",
//               mobileMenuOpen && "opacity-0"
//             )}></span>
//             <span className={cn(
//               "block w-6 h-0.5 bg-white transition-all duration-300",
//               mobileMenuOpen && "-translate-y-1.5 -rotate-45"
//             )}></span>
//           </div>
//         </button> */}
//       </div>

//       {/* Mobile Navigation */}
//       {/* <div className={cn(
//         "fixed inset-x-0 top-[60px] bg-dark-light/95 backdrop-blur-sm transition-all duration-300 md:hidden",
//         mobileMenuOpen ? "opacity-100 h-auto py-4" : "opacity-0 h-0 py-0 overflow-hidden"
//       )}>
//         <nav className="container-custom flex flex-col space-y-4">
//           {navLinks.map((link) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className="text-gray-300 hover:text-teal py-2 px-4 transition-colors duration-200"
//               onClick={() => setMobileMenuOpen(false)}
//             >
//               {link.name}
//             </a>
//           ))}
//         </nav>
//       </div> */}
//     </header>
//   );
// };

// export default Navbar;

// import React, { useState, useEffect } from "react";
// import { cn } from "@/lib/utils";
// import { useTheme } from "../theme/ThemeContext";

// const Navbar = () => {
//   const [scrolled, setScrolled] = useState(false);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const { theme, toggleTheme } = useTheme();

//   useEffect(() => {
//     const handleScroll = () => {
//       const isScrolled = window.scrollY > 20;
//       if (isScrolled !== scrolled) {
//         setScrolled(isScrolled);
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [scrolled]);

//   return (
//     <header
//       className={cn(
//         "fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8",
//         scrolled
//           ? "bg-dark-light/95 backdrop-blur-sm shadow-md py-3"
//           : "bg-transparent py-5"
//       )}
//     >
//       <div className="container-custom flex items-center justify-between">
//         <a href="#home" className="flex items-center">
//           <span className="font-bold text-xl md:text-2xl gradient-text">
//             &#123;AK&#125; AI Portfolio.
//           </span>
//         </a>

//         {/* Desktop Resume Button */}
//         <div className="hidden md:flex items-center">
//           <a
//             href="Resume_Anand.pdf"
//             download
//             className="ml-4 bg-zinc-800 border border-zinc-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2"
//           >
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="16"
//   height="16"
//   fill="currentColor"
//   className="bi bi-download"
//   viewBox="0 0 16 16"
// >
//   <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5V10.4a.5.5 0 0 1 1 0v2.6A1.5 1.5 0 0 1 14 14.5H2A1.5 1.5 0 0 1 .5 13V10.4a.5.5 0 0 1 .5-.5z" />
//   <path d="M5.354 6.646a.5.5 0 0 1 .707 0L8 8.586V1.5a.5.5 0 0 1 1 0v7.086l1.939-1.94a.5.5 0 1 1 .707.708l-2.646 2.647a.5.5 0 0 1-.707 0L5.354 7.354a.5.5 0 0 1 0-.708z" />
// </svg>
//             Resume
//           </a>
//         </div>

//         {/* Mobile Menu Toggle Button */}
{
  /* <button
  className="md:hidden p-2"
  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
  aria-label="Toggle menu"
>
  <div className="space-y-2">
    <span
      className={cn(
        "block w-6 h-0.5 bg-white transition-all duration-300",
        mobileMenuOpen && "translate-y-1.5 rotate-45"
      )}
    />
    <span
      className={cn(
        "block w-6 h-0.5 bg-white transition-all duration-300",
        mobileMenuOpen && "opacity-0"
      )}
    />
    <span
      className={cn(
        "block w-6 h-0.5 bg-white transition-all duration-300",
        mobileMenuOpen && "-translate-y-1.5 -rotate-45"
      )}
    />
  </div>
</button> */
}
//       </div>

//       {/* Mobile Resume Button */}
//       <div
//         className={cn(
//           "fixed inset-x-0 top-[60px] backdrop-blur-sm transition-all duration-300 md:hidden z-40",
//           mobileMenuOpen
//             ? "opacity-100 h-auto py-4"
//             : "opacity-0 h-0 py-0 overflow-hidden"
//         )}
//       >
//         <div className="container-custom">
//           <a
//             href="Resume_Anand.pdf"
// download
// className="mx-4 mt-2 text-center bg-zinc-800 border border-zinc-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
// >
// <svg
//   xmlns="http://www.w3.org/2000/svg"
//   width="16"
//   height="16"
//   fill="currentColor"
//   className="bi bi-download"
//   viewBox="0 0 16 16"
// >
//   <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5V10.4a.5.5 0 0 1 1 0v2.6A1.5 1.5 0 0 1 14 14.5H2A1.5 1.5 0 0 1 .5 13V10.4a.5.5 0 0 1 .5-.5z" />
//   <path d="M5.354 6.646a.5.5 0 0 1 .707 0L8 8.586V1.5a.5.5 0 0 1 1 0v7.086l1.939-1.94a.5.5 0 1 1 .707.708l-2.646 2.647a.5.5 0 0 1-.707 0L5.354 7.354a.5.5 0 0 1 0-.708z" />
// </svg>
// Resume
//           </a>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Navbar;

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useTheme } from "../theme/ThemeContext";
import { MoonIcon, StarIcon, SunIcon } from "lucide-react";

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
    <header
      className={cn(
        "fixed w-full top-0 z-50 transition-all duration-300 px-4 md:px-8",
        scrolled
          ? "bg-dark-light/95 backdrop-blur-sm shadow-md py-3  bg-white text-zinc-800 dark:bg-zinc-900 dark:text-white"
          : "bg-transparent py-5"
      )}
    >
      <div className="container-custom flex items-center justify-between relative">
        {/* Logo */}
        <a href="#home" className="font-bold text-xl md:text-2xl gradient-text">
          &#123;AK&#125; AI Portfolio.
        </a>

        {/* Desktop Menu */}

        {/* Right buttons (Resume + Theme toggle) */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={toggleTheme}
            className="text-white text-xl transition rounded-xl"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <SunIcon className="text-yellow-400" />
            ) : (
              <MoonIcon className="w-5 h-5 text-zinc-600" />
            )}
          </button>

          <a
            href="Resume_Anand_updated.pdf"
            download
            className="mx-4 mt-2 text-center border border-zinc-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-200 transition flex items-center justify-center gap-2  bg-white text-zinc-800 dark:bg-zinc-800 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5V10.4a.5.5 0 0 1 1 0v2.6A1.5 1.5 0 0 1 14 14.5H2A1.5 1.5 0 0 1 .5 13V10.4a.5.5 0 0 1 .5-.5z" />
              <path d="M5.354 6.646a.5.5 0 0 1 .707 0L8 8.586V1.5a.5.5 0 0 1 1 0v7.086l1.939-1.94a.5.5 0 1 1 .707.708l-2.646 2.647a.5.5 0 0 1-.707 0L5.354 7.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Resume
          </a>
        </div>

        {/* Mobile toggle (hamburger) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden z-[100] ml-auto"
          aria-label="Toggle menu"
        >
          <div className="space-y-1">
            <div className="space-y-1">
              <span
                className={cn(
                  "block w-6 h-0.5 transition-all",
                  "bg-zinc-800 dark:bg-white",
                  mobileMenuOpen && "translate-y-1.5 rotate-45"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 transition-all",
                  "bg-zinc-700 dark:bg-white",
                  mobileMenuOpen && "opacity-0"
                )}
              />
              <span
                className={cn(
                  "block w-6 h-0.5 transition-all",
                  "bg-zinc-800 dark:bg-white",
                  mobileMenuOpen && "-translate-y-1.5 -rotate-45"
                )}
              />
            </div>
          </div>
        </button>

        {/* Always visible theme toggle for mobile */}
        <button
          onClick={toggleTheme}
          className="md:hidden absolute right-14 top-1/2 -translate-y-1/2 text-white text-xl transition z-[90]"
          aria-label="Toggle theme mobile"
        >
          {theme === "dark" ? (
            <SunIcon className="text-yellow-400" />
          ) : (
            <MoonIcon className="w-5 h-5 text-zinc-600" />
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      <div
        className={cn(
          "md:hidden transition-all duration-300 overflow-hidden bg-dark-light absolute w-full left-0 top-full z-40 bg-white text-black dark:bg-zinc-900 dark:text-white",
          mobileMenuOpen
            ? "max-h-[200px] py-4 opacity-100"
            : "max-h-0 py-0 opacity-0"
        )}
      >
        <div className="px-4 space-y-3 bg-white text-black dark:bg-zinc-900 dark:text-white">
          <a
            href="Resume_Anand_updated.pdf"
            download
            className="mx-4 mt-2 text-center border border-zinc-400 px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2  bg-white text-black dark:bg-zinc-900 dark:text-white"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-download"
              viewBox="0 0 16 16"
            >
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.6a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5V10.4a.5.5 0 0 1 1 0v2.6A1.5 1.5 0 0 1 14 14.5H2A1.5 1.5 0 0 1 .5 13V10.4a.5.5 0 0 1 .5-.5z" />
              <path d="M5.354 6.646a.5.5 0 0 1 .707 0L8 8.586V1.5a.5.5 0 0 1 1 0v7.086l1.939-1.94a.5.5 0 1 1 .707.708l-2.646 2.647a.5.5 0 0 1-.707 0L5.354 7.354a.5.5 0 0 1 0-.708z" />
            </svg>
            Resume
          </a>
        </div>
      </div>
    </header>
  );
};

export default Navbar;

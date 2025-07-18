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
            &#123;AK&#125; AI Portfolio.
          </span>
        </a>

        {/* Desktop Resume Button */}
        <div className="hidden md:flex items-center">
          <a
            href="Resume_Anand.pdf"
            download
            className="ml-4 bg-zinc-800 border border-zinc-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition flex items-center gap-2"
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

        {/* Mobile Menu Toggle Button */}
        <button
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
        </button>
      </div>

      {/* Mobile Resume Button */}
      <div
        className={cn(
          "fixed inset-x-0 top-[60px] backdrop-blur-sm transition-all duration-300 md:hidden z-40",
          mobileMenuOpen
            ? "opacity-100 h-auto py-4"
            : "opacity-0 h-0 py-0 overflow-hidden"
        )}
      >
        <div className="container-custom">
          <a
            href="Resume_Anand.pdf"
            download
            className="mx-4 mt-2 text-center bg-zinc-800 border border-zinc-400 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition flex items-center justify-center gap-2"
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

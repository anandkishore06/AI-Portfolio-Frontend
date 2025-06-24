import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark py-12 border-t border-gray-dark">
      <div className="container-custom">
        <div className="flex flex-col gap-8 md:flex-row md:gap-0 justify-between items-start">
          {/* Left Column */}
          <div className="w-full md:w-1/2">
            <div className="font-bold text-2xl gradient-text mb-3">
              &#123;AK&#125; AI Portfolio.
            </div>
            <p className="text-gray-400 max-w-full md:max-w-md">
              Creating beautiful digital experiences that leave a lasting
              impression.
            </p>
          </div>

          {/* Right Column */}
          <div className="w-full md:w-1/2 text-center md:text-right">
            <div className="flex flex-wrap justify-center md:justify-end gap-4 mb-4">
              {/* Social Links */}
              <a
                href="https://www.linkedin.com/in/anandkishore060/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal transition-colors duration-200"
              >
                {/* LinkedIn Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                  <rect x="2" y="9" width="4" height="12"></rect>
                  <circle cx="4" cy="4" r="2"></circle>
                </svg>
              </a>

              <a
                href="https://github.com/anandkishore06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal transition-colors duration-200"
              >
                {/* GitHub Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2c-5.52 0-10 4.48-10 10 0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.47v-1.63c-2.69.58-3.26-1.31-3.26-1.31-.44-1.13-.88-1.43-.88-1.43-.72-.48.05-.47.05-.47 1.5.11 2.29 1.55 2.29 1.55 1.34 2.28 3.51 1.62 4.35 1.24.13-.97.52-1.62.95-2.00-2.84-.31-5.83-1.42-5.83-6.35 0-1.4.5-2.55 1.32-3.45-.13-.31-.58-1.55.12-3.24 0 0 1.08-.34 3.52 1.33 1.02-.29 2.1-.43 3.17-.43 1.07 0 2.14.14 3.16.43 2.43-1.67 3.51-1.33 3.51-1.33.7 1.7.25 2.93.12 3.24.82.89 1.32 2.05 1.32 3.45 0 4.94-3.01 6.04-5.85 6.35.54.46 1.03 1.37 1.03 2.73v4.1c0 .26.18.56.69.47C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"></path>
                </svg>
              </a>

              <a
                href="https://x.com/anandkishore06"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-teal transition-colors duration-200"
              >
                {/* Twitter Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
              </a>
            </div>

            <p className="text-gray-400">
              &copy; {currentYear} &#123;AK&#125; AI Portfolio. All rights
              reserved.
            </p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 pt-8 border-t border-gray-dark text-center px-4 sm:px-0">
          <a
            href="#home"
            className="text-gray-400 hover:text-teal inline-flex items-center transition-colors duration-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="m18 15-6-6-6 6"></path>
            </svg>
            Back to top
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

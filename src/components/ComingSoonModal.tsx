import React from "react";
import { motion, AnimatePresence } from "framer-motion";

const ComingSoonModal = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-lg max-w-sm text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-2xl font-bold text-amber-500 mb-2">
              🚧 Coming Soon!
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              This project's demo and source code will be available shortly.
              Stay tuned!
            </p>
            <button
              onClick={onClose}
              className="mt-4 px-4 py-2 bg-gradient-to-r from-teal to-amber text-white rounded-full hover:scale-105 transition-transform"
            >
              Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ComingSoonModal;

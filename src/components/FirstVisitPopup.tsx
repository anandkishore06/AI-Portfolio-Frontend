import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FirstVisitPopup = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const hasVisited = localStorage.getItem("hasVisited");
    if (!hasVisited) {
      setShow(true);
      localStorage.setItem("hasVisited", "true");
    }
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zinc-900 text-white rounded-xl shadow-xl p-6 w-full max-w-sm border border-gray-700"
          >
            <div className="text-4xl mb-2">⚡</div>
            <h2 className="text-xl font-semibold mb-2">Heads Up!</h2>
            <p className="text-gray-300 text-sm mb-4">
              The AI may take up to <strong>30 seconds</strong> to respond the
              first time. This happens because the server is hosted on free
              Render and might be waking up.
            </p>
            <button
              onClick={() => setShow(false)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md w-full"
            >
              Okay, Got it!
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FirstVisitPopup;

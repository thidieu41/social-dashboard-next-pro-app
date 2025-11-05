"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useProgressBar } from "./ProgressProvider";

const ProgressBar = () => {
  const { loading } = useProgressBar();

  return (
    <div className="relative overflow-hidden flex flex-col">
      {/* Khi loading xuất hiện màn hình bị mờ */}
      {loading && (
        <div className="fixed top-0 left-0 h-full w-full bg-black/20 z-40 transition-all" />
      )}

      {/* Loading xuất hiện từ trên xuống */}

      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="fixed top-2 left-1/2 z-3"
          >
            <div className="stack-wrapper bg-white w-[300px] border rounded-lg p-2 py-3">
              <p>Loading....</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProgressBar;

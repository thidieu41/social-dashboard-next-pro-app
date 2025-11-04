"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import React, { createContext, useContext, useState } from "react";

type Toast = {
  id: number;
  message: string;
  title?: string;
  type?: "success" | "error" | "info";
};

type ToastContextType = {
  toasts: Toast[];
  showToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: number) => void;
};

const ToastContext = createContext<ToastContextType | undefined>(undefined);
const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const removeToast = (id: number) => {
    const fillterToasts = toasts.filter((item) => item.id !== id);
    setToasts(fillterToasts);
  };

  const showToast = (
    message: string,
    type: Toast["type"] = "info",
    title?: string
  ) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, type, title }]);
    setTimeout(() => {
        removeToast(id);
    }, 3000);
  };
  return (
    <ToastContext.Provider
      value={{
        toasts,
        removeToast,
        showToast,
      }}
    >
      {children}
      <AnimatePresence>
        <div className="fixed top-5 right-5 ">
          {toasts.map((toast) => (
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              key={toast.id}
              className={`relative sidebar-section min-w-[300px] min-h-15 p-2 border rounded-lg mt-2 ${
                toast.type === "success"
                  ? "border-green-500"
                  : toast.type === "error"
                  ? "border-red-500"
                  : "border-blue-500"
              }`}
            >
              <div>
                <button
                  className="absolute top-1 right-2 border-none! w-6 h-6 rounded-full cursor-pointer!"
                  onClick={() => removeToast(toast.id)}
                >
                  <X />
                </button>
                <div className="mt-2">{toast.message}</div>
              </div>
            </motion.aside>
          ))}
        </div>
      </AnimatePresence>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return ctx.showToast;
};

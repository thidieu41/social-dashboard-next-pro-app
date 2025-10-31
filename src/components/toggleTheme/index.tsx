"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components-system/Button/Button";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <Button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={`relative inline-flex h-10 w-23! items-center rounded-full p-1 transition-colors duration-300 border-none`}
    >
      {/* Nút tròn */}
      <span
        className={`absolute left-1 flex h-8 w-8 items-center justify-center rounded-full shadow-md transition-transform duration-300 ${
          theme === "dark"
            ? "translate-x-12 bg-white"
            : "translate-x-0 bg-[#111827]"
        }`}
      />

      {/* Icon Sun bên trái */}
      <Sun
        className={`absolute left-2 h-6 w-6 transition-opacity duration-300 ${
          theme === "dark" ? "opacity-50" : "opacity-100"
        } text-yellow-500`}
      />

      {/* Icon Moon bên phải */}
      <Moon
        className={`absolute right-2 h-6 w-6 transition-opacity duration-300 ${
          theme === "dark" ? "opacity-100" : "opacity-50"
        } text-gray-700`}
      />
    </Button>
  );
}

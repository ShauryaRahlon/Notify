"use client";
import React from "react";
import { motion } from "framer-motion";

export default function ColourfulText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  // Define color palettes for light and dark themes
  const lightColors = [
    "#8B1A1A", // much darker red
    "#7A5C0E", // much darker yellow
    "#1B5E20", // much darker green
    "#12305B", // much darker blue
    "#3C2A5D", // much darker purple
    "#6B2E13", // much darker orange
    "#6E5A13", // much darker gold
    "#00263A", // much darker cyan/blue
    "#4B3B57", // much darker lavender
    "#6B6A0E", // much darker lime
  ];
  const darkColors = [
    "#FF8C8C",
    "#FFE066",
    "#7FFFD4",
    "#82B1FF",
    "#B388FF",
    "#FFB86B",
    "#FFD700",
    "#00BFFF",
    "#D1B3FF",
    "#FFFF99",
  ];
  

  // Detect theme using window.matchMedia
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const match = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDark(match.matches);
    const handler = (e: MediaQueryListEvent) => setIsDark(e.matches);
    match.addEventListener("change", handler);
    return () => match.removeEventListener("change", handler);
  }, []);

  const colors = isDark ? darkColors : lightColors;
  const [currentColors, setCurrentColors] = React.useState(colors);
  const [count, setCount] = React.useState(0);

  // Only update currentColors when theme changes, not on every render
  React.useEffect(() => {
    setCurrentColors(colors);
  }, [isDark]);

  React.useEffect(() => {
    const interval = setInterval(() => {
      const shuffled = [...colors].sort(() => Math.random() - 0.5);
      setCurrentColors(shuffled);
      setCount((prev) => prev + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, [colors]);

  return text.split("").map((char, index) => (
    <motion.span
      key={`${char}-${count}-${index}`}
      initial={{ y: 0 }}
      animate={{
        color: currentColors[index % currentColors.length],
        y: [0, -3, 0],
        scale: [1, 1.01, 1],
        filter: ["blur(0px)", `blur(5px)`, "blur(0px)"],
        opacity: [1, 0.8, 1],
      }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className={`inline-block whitespace-pre font-sans tracking-tight ${className ?? ""}`}
    >
      {char}
    </motion.span>
  ));
}

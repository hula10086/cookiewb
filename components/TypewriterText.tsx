"use client";

import { useState, useEffect } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 50,
  delay = 500,
  className = "",
}: TypewriterTextProps) {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    let index = 0;
    const interval = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(interval);
        // Blink cursor after typing
        const blinkInterval = setInterval(() => {
          setShowCursor((prev) => !prev);
        }, 530);
        return () => clearInterval(blinkInterval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [started, text, speed]);

  return (
    <span className={className}>
      {displayText}
      <span
        className={`inline-block w-[3px] h-[1em] bg-primary ml-1 align-middle transition-opacity duration-100 ${
          showCursor ? "opacity-100" : "opacity-0"
        }`}
      />
    </span>
  );
}

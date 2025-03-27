"use client"

import { useEffect, useState, useCallback } from "react"

// Define the props type
interface TypewriterEffectProps {
  text: string; // Specify that text is a string
  className?: string;
}

export function TypewriterEffect({ text, className = "" }: TypewriterEffectProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [isPaused, setIsPaused] = useState(false)

  // Handle mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const typewriterEffect = useCallback(() => {
    if (!text || text.length === 0) return;
    
    if (currentIndex === text.length && !isDeleting) {
      // Pause at the end when complete
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, 2000);
      return;
    }

    if (currentIndex === 0 && isDeleting) {
      // Pause when fully deleted
      setIsPaused(true);
      setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(false);
      }, 1000);
      return;
    }

    if (isPaused) return;

    const timeout = setTimeout(
      () => {
        setCurrentIndex((prevIndex) => (isDeleting ? prevIndex - 1 : prevIndex + 1))
        setDisplayText(text.substring(0, isDeleting ? currentIndex - 1 : currentIndex + 1))
      },
      isDeleting ? 100 : Math.random() * 150 + 50, // Random typing speed for more realistic effect
    )

    return () => clearTimeout(timeout)
  }, [currentIndex, isDeleting, text, isPaused]);

  useEffect(() => {
    if (!isMounted) return; // Skip effect until component is mounted
    typewriterEffect();
  }, [typewriterEffect, isMounted]);

  // SSR-safe rendering
  if (!isMounted) {
    return <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold ${className}`}>{text}</h1>;
  }

  return (
    <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold relative ${className}`}>
      <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">
        {displayText}
        <span className="animate-blink inline-block ml-1 w-[3px] h-[1em] bg-primary align-middle"></span>
      </span>
    </h1>
  )
}


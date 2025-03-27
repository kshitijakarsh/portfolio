"use client"

import { useEffect, useRef, ReactNode } from "react"

interface BlurFadeSectionProps {
  children: ReactNode
  className?: string
}

export function BlurFadeSection({ children, className = "" }: BlurFadeSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      { threshold: 0.1 }
    )
    
    observer.observe(section)
    return () => observer.unobserve(section)
  }, [])
  
  return (
    <div ref={sectionRef} className={`blur-fade ${className}`}>
      {children}
    </div>
  )
} 
"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"

interface ProgressBarProps {
  label: string
  percentage: number
  color?: string
  className?: string
  animate?: boolean
  delay?: number
}

export function ProgressBar({
  label,
  percentage,
  color = "hsl(var(--primary))",
  className = "",
  animate = true,
  delay = 0
}: ProgressBarProps) {
  const [progress, setProgress] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.3 }
    )

    if (barRef.current) {
      observer.observe(barRef.current)
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (isVisible && animate) {
      const timer = setTimeout(() => {
        setProgress(percentage)
      }, delay)
      
      return () => clearTimeout(timer)
    }
  }, [isVisible, percentage, animate, delay])

  const progressStyle = {
    width: `${progress}%`,
    backgroundColor: color,
    transition: "width 0.6s ease-out"
  }

  return (
    <div ref={barRef} className={cn("space-y-1", className)}>
      <div className="flex justify-between items-center">
        <span className="text-sm">{label}</span>
        <span className="text-xs text-muted-foreground">{progress}%</span>
      </div>
      <div className="h-1.5 w-full bg-secondary rounded-sm overflow-hidden">
        <div 
          className="h-full rounded-sm" 
          style={progressStyle}
        />
      </div>
    </div>
  )
}
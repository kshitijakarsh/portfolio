"use client"

import React, { useState, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface FloatingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "default" | "primary" | "outline" | "ghost"
  size?: "sm" | "md" | "lg"
  withPulse?: boolean
  withShadowHover?: boolean
  className?: string
}

export function FloatingButton({
  children,
  variant = "default",
  size = "md",
  withPulse = false,
  withShadowHover = true,
  className,
  ...props
}: FloatingButtonProps) {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    const rect = btn.getBoundingClientRect()
    
    // Calculate mouse position relative to the button
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    setMousePosition({ x, y })
  }
  
  if (!mounted) {
    return (
      <button
        className={cn(
          "relative overflow-hidden rounded-full font-medium transition-all",
          "transform hover:-translate-y-1 active:translate-y-0",
          {
            "bg-gray-800 text-white dark:bg-white dark:text-gray-900": variant === "default",
            "bg-primary text-white": variant === "primary",
            "border-2 border-gray-800 dark:border-white bg-transparent": variant === "outline",
            "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800": variant === "ghost",
            "px-3 py-1 text-sm": size === "sm",
            "px-4 py-2": size === "md",
            "px-6 py-3 text-lg": size === "lg",
          },
          className
        )}
        {...props}
      >
        {children}
      </button>
    )
  }
  
  const highlightStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)`,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: 0,
    pointerEvents: "none",
  } as React.CSSProperties
  
  return (
    <button
      className={cn(
        "relative overflow-hidden rounded-full font-medium transition-all",
        "transform hover:-translate-y-1 active:translate-y-0",
        {
          "bg-gray-800 text-white dark:bg-white dark:text-gray-900": variant === "default",
          "bg-primary text-white": variant === "primary",
          "border-2 border-gray-800 dark:border-white bg-transparent": variant === "outline",
          "bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800": variant === "ghost",
          "px-3 py-1 text-sm": size === "sm",
          "px-4 py-2": size === "md",
          "px-6 py-3 text-lg": size === "lg",
          "hover:shadow-lg": withShadowHover,
        },
        className
      )}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <div style={highlightStyle} />
      <span className="relative z-10">{children}</span>
      {withPulse && (
        <span className="absolute inset-0 rounded-full bg-white/10 animate-pulse" />
      )}
    </button>
  )
} 
"use client"

import { useRef, useState, useEffect, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface TiltCardProps {
  children: ReactNode
  className?: string
  maxTilt?: number
  scale?: number
  perspective?: number
  transitionSpeed?: number
  glare?: boolean
  glareOpacity?: number
}

export function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scale = 1.05,
  perspective = 1000,
  transitionSpeed = 300,
  glare = true,
  glareOpacity = 0.2
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null)
  const glareRef = useRef<HTMLDivElement>(null)
  const [isMounted, setIsMounted] = useState(false)
  const [tiltStyle, setTiltStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    transition: `${transitionSpeed}ms ease-out`
  })

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    
    const card = cardRef.current
    const cardRect = card.getBoundingClientRect()
    
    // Calculate mouse position relative to card
    const centerX = cardRect.left + cardRect.width / 2
    const centerY = cardRect.top + cardRect.height / 2
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
    // Calculate rotation (inverted)
    const rotateY = (-mouseX / (cardRect.width / 2)) * maxTilt
    const rotateX = (mouseY / (cardRect.height / 2)) * maxTilt
    
    // Update card transform
    setTiltStyle({
      transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
      transition: `${transitionSpeed}ms ease-out`
    })

    // Handle glare effect
    if (glare && glareRef.current) {
      const glareElement = glareRef.current
      const percentX = (e.clientX - cardRect.left) / cardRect.width * 100
      const percentY = (e.clientY - cardRect.top) / cardRect.height * 100
      
      // Update glare position
      glareElement.style.background = `radial-gradient(circle at ${percentX}% ${percentY}%, 
                                        rgba(255, 255, 255, ${glareOpacity}) 0%, 
                                        rgba(255, 255, 255, 0) 80%)`
    }
  }

  const handleMouseLeave = () => {
    // Reset to default state
    setTiltStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: `${transitionSpeed}ms ease-out`
    })
  }

  if (!isMounted) {
    return (
      <div className={cn("relative w-full rounded-lg overflow-hidden", className)}>
        {children}
      </div>
    )
  }

  return (
    <div
      ref={cardRef}
      className={cn("relative w-full rounded-lg overflow-hidden", className)}
      style={tiltStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            mixBlendMode: "overlay",
            opacity: 0.8
          }}
        />
      )}
    </div>
  )
} 
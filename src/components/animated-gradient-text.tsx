"use client"

import { useEffect, useRef, useState } from "react"

interface AnimatedGradientTextProps {
  text: string
  className?: string
}

export function AnimatedGradientText({ text, className = "" }: AnimatedGradientTextProps) {
  const textRef = useRef<HTMLHeadingElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!textRef.current) return
      
      const element = textRef.current
      const rect = element.getBoundingClientRect()
      
      // Calculate relative position within the element
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      
      setMousePosition({ x, y })
    }
    
    window.addEventListener('mousemove', handleMouseMove)
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  if (!isMounted) {
    return <h2 className={`text-3xl font-bold ${className}`}>{text}</h2>
  }

  const gradientStyle = {
    background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, 
      hsl(var(--primary)) 0%, 
      hsl(var(--accent)) 25%, 
      hsl(var(--secondary)) 50%, 
      hsl(var(--primary)) 75%)`,
    backgroundSize: '200% 200%',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
    textShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    position: 'relative',
    zIndex: 10,
    transform: 'translateZ(0)',
    filter: 'drop-shadow(0 0 15px rgba(var(--primary), 0.2))',
  } as React.CSSProperties

  return (
    <h2 
      ref={textRef}
      className={`text-3xl font-bold ${className}`}
      style={gradientStyle}
    >
      {text}
    </h2>
  )
} 
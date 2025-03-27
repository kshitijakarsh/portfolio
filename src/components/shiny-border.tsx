"use client"

import { ReactNode, useState, useEffect, useRef } from "react"

interface ShinyBorderProps {
  children: ReactNode
  className?: string
  borderWidth?: number
}

export function ShinyBorder({ 
  children, 
  className = "", 
  borderWidth = 2 
}: ShinyBorderProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [isHovering, setIsHovering] = useState(false)
  
  useEffect(() => {
    if (!containerRef.current) return
    
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        setDimensions({ width: rect.width, height: rect.height })
      }
    }
    
    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return
    
    const rect = containerRef.current.getBoundingClientRect()
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    })
  }
  
  // Calculate gradient position
  const gradientPosition = isHovering 
    ? `circle at ${mousePosition.x}px ${mousePosition.y}px`
    : 'circle at center'
  
  const borderStyle = {
    backgroundImage: `radial-gradient(${gradientPosition}, rgba(96, 165, 250, 0.8) 0%, rgba(96, 165, 250, 0.3) 25%, transparent 70%)`,
    padding: `${borderWidth}px`,
    position: 'relative' as const,
    borderRadius: 'inherit',
    transition: 'opacity 0.3s ease',
    opacity: isHovering ? 1 : 0.4,
  }
  
  // Create subtle moving animation when not hovering
  useEffect(() => {
    if (isHovering) return
    
    const interval = setInterval(() => {
      const time = Date.now() / 2000
      const x = (Math.sin(time) * 0.5 + 0.5) * dimensions.width
      const y = (Math.cos(time * 0.7) * 0.5 + 0.5) * dimensions.height
      setMousePosition({ x, y })
    }, 100)
    
    return () => clearInterval(interval)
  }, [isHovering, dimensions])
  
  return (
    <div
      ref={containerRef}
      className={`relative rounded-md ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div style={borderStyle}>
        <div className="bg-card/90 rounded-[inherit] overflow-hidden">
          {children}
        </div>
      </div>
    </div>
  )
} 
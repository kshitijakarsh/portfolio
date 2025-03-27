"use client"

import { useEffect, useRef } from "react"
import { useTheme } from "next-themes"

interface RetroGridProps {
  className?: string
}

export function RetroGrid({ className = "" }: RetroGridProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    
    const updateCanvasSize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      
      canvas.width = parent.offsetWidth
      canvas.height = parent.offsetHeight
      canvas.style.width = '100%'
      canvas.style.height = '100%'
    }
    
    window.addEventListener('resize', updateCanvasSize)
    updateCanvasSize()
    
    let animationFrame: number
    
    const draw = () => {
      if (!ctx || !canvas) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      const gridSize = 40
      const lineWidth = 0.5
      const gridColor = theme === 'dark' ? 'rgba(70, 130, 230, 0.08)' : 'rgba(0, 0, 0, 0.08)'
      
      // Draw vertical lines
      for (let x = 0; x <= canvas.width; x += gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, canvas.height)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = gridColor
        ctx.stroke()
      }
      
      // Draw horizontal lines
      for (let y = 0; y <= canvas.height; y += gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(canvas.width, y)
        ctx.lineWidth = lineWidth
        ctx.strokeStyle = gridColor
        ctx.stroke()
      }
      
      animationFrame = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      cancelAnimationFrame(animationFrame)
    }
  }, [theme])
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full ${className}`}
    />
  )
} 
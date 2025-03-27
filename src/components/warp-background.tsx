"use client"

import { useEffect, useRef, useState } from "react"
import { useTheme } from "next-themes"

interface WarpBackgroundProps {
  className?: string
  intensity?: number
  speed?: number
  backgroundColor?: string
  backgroundColorDark?: string
}

export function WarpBackground({
  className = "",
  intensity = 1,
  speed = 1,
  backgroundColor = "hsl(var(--background))",
  backgroundColorDark = "hsl(var(--background))"
}: WarpBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()
  const [particlesArray, setParticlesArray] = useState<any[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMounted, setIsMounted] = useState(false)
  const isDarkMode = theme === 'dark'
  const requestRef = useRef<number>()
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })

  // Make sure to use the appropriate background color based on theme
  const bgColor = isDarkMode ? backgroundColorDark : backgroundColor
  
  // and make the particles less intrusive in dark mode
  const particleColor = isDarkMode ? 
    'rgba(255, 255, 255, 0.2)' : 
    'rgba(0, 0, 0, 0.15)'

  useEffect(() => {
    // Check if dark mode is active
    const isDark = document.documentElement.classList.contains('dark')
    setIsMounted(isDark)

    // Add listener for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark')
          setIsMounted(isDark)
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Set canvas dimensions
    const updateSize = () => {
      const { width, height } = canvas.getBoundingClientRect()
      canvas.width = width
      canvas.height = height
      setDimensions({ width, height })
    }

    // Handle resize
    updateSize()
    window.addEventListener('resize', updateSize)

    // Initialize particles
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    class Particle {
      x: number
      y: number
      size: number
      baseX: number
      baseY: number
      density: number
      color: string
      life: number
      initialLife: number

      constructor(x: number, y: number) {
        this.x = x
        this.y = y
        this.baseX = x
        this.baseY = y
        this.size = Math.random() * 5 + 1
        this.density = Math.random() * 30 + 1
        this.color = particleColor
        this.life = Math.random() * 100 + 50
        this.initialLife = this.life
      }

      draw(context: CanvasRenderingContext2D) {
        if (!context) return
        const opacity = this.life / this.initialLife
        context.beginPath()
        context.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        context.closePath()
        context.fillStyle = this.color
        context.globalAlpha = opacity
        context.fill()
      }

      update() {
        const dx = mousePosition.x - this.x
        const dy = mousePosition.y - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const forceDirectionX = dx / distance
        const forceDirectionY = dy / distance
        const maxDistance = intensity * 10
        const force = (maxDistance - distance) / maxDistance
        const directionX = forceDirectionX * force * this.density * (isMounted ? 1 : 0.1)
        const directionY = forceDirectionY * force * this.density * (isMounted ? 1 : 0.1)

        if (distance < maxDistance) {
          this.x -= directionX
          this.y -= directionY
        } else {
          if (this.x !== this.baseX) {
            const dx = this.x - this.baseX
            this.x -= dx * speed
          }
          if (this.y !== this.baseY) {
            const dy = this.y - this.baseY
            this.y -= dy * speed
          }
        }

        this.life -= 0.5
        if (this.life <= 0) {
          this.life = 0
        }
      }
    }

    function init() {
      const particlesCount = Math.floor((canvas.width * canvas.height) / 8000)
      const newParticlesArray = []
      for (let i = 0; i < particlesCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        newParticlesArray.push(new Particle(x, y))
      }
      setParticlesArray(newParticlesArray)
    }

    function animate() {
      if (!ctx) return
      ctx.fillStyle = bgColor
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      for (const particle of particlesArray) {
        particle.draw(ctx)
        particle.update()
      }
      
      requestRef.current = requestAnimationFrame(animate)
    }

    init()
    animate()

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }

    canvas.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('resize', updateSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [particlesArray, mousePosition, intensity, speed, backgroundColor, backgroundColorDark, isMounted])

  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 w-full h-full -z-10 ${className}`}
    />
  )
} 
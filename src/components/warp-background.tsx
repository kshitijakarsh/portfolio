"use client"

import { useEffect, useRef } from "react"
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
  intensity = 50,
  speed = 0.5,
  backgroundColor = "#ffffff",
  backgroundColorDark = "#000000"
}: WarpBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const { theme } = useTheme()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId: number
    let mouseX = 0
    let mouseY = 0
    let particles: Particle[] = []

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      intensity: number

      constructor(x: number, y: number, size: number, intensity: number) {
        this.x = x
        this.y = y
        this.size = size
        this.speedX = (Math.random() - 0.5) * speed
        this.speedY = (Math.random() - 0.5) * speed
        this.intensity = intensity
      }

      update() {
        if (!canvas) return

        // Update position
        this.x += this.speedX
        this.y += this.speedY

        // Mouse interaction
        const dx = mouseX - this.x
        const dy = mouseY - this.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        const maxDistance = 100

        if (distance < maxDistance) {
          const force = (maxDistance - distance) / maxDistance
          this.x -= dx * force * 0.02
          this.y -= dy * force * 0.02
        }

        // Bounce off edges
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1
      }

      draw(ctx: CanvasRenderingContext2D) {
        const currentTheme = theme === 'dark' ? backgroundColorDark : backgroundColor
        ctx.fillStyle = currentTheme
        ctx.globalAlpha = this.intensity
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    function handleMouseMove(e: MouseEvent) {
      if (!canvas) return
      const rect = canvas.getBoundingClientRect()
      mouseX = e.clientX - rect.left
      mouseY = e.clientY - rect.top
    }

    function handleMouseLeave() {
      mouseX = canvas.width / 2
      mouseY = canvas.height / 2
    }

    function updateCanvasSize() {
      if (!canvas) return
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init() // Reinitialize particles when canvas size changes
    }

    function init() {
      if (!canvas) return
      const particlesCount = Math.floor((canvas.width * canvas.height) / 8000)
      const newParticlesArray = []
      for (let i = 0; i < particlesCount; i++) {
        const x = Math.random() * canvas.width
        const y = Math.random() * canvas.height
        const size = Math.random() * 2 + 1
        const particleIntensity = Math.random() * 0.5 + 0.2
        newParticlesArray.push(new Particle(x, y, size, particleIntensity))
      }
      particles = newParticlesArray
    }

    function animate() {
      if (!ctx || !canvas) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(particle => {
        particle.update()
        particle.draw(ctx)
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Initialize
    updateCanvasSize()
    window.addEventListener('resize', updateCanvasSize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    // Start animation
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', updateCanvasSize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
      cancelAnimationFrame(animationFrameId)
    }
  }, [theme, intensity, speed, backgroundColor, backgroundColorDark])

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 -z-10 h-full w-full ${className}`}
    />
  )
} 
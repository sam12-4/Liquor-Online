"use client"

import { useEffect, useRef } from "react"

const LiquidEffect = () => {
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, radius: 100 })
  const animationRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d")
    contextRef.current = ctx

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []

      const particleCount = Math.floor(window.innerWidth / 10)

      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 5 + 1,
          color: `rgba(170, 76, 64, ${Math.random() * 0.3})`,
          velocity: {
            x: (Math.random() - 0.5) * 2,
            y: (Math.random() - 0.5) * 2,
          },
          opacity: Math.random() * 0.5 + 0.2,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle) => {
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Update position
        particle.x += particle.velocity.x
        particle.y += particle.velocity.y

        // Boundary check
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.velocity.x = -particle.velocity.x
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.velocity.y = -particle.velocity.y
        }

        // Mouse interaction
        const dx = mouseRef.current.x - particle.x
        const dy = mouseRef.current.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < mouseRef.current.radius) {
          const angle = Math.atan2(dy, dx)
          const force = (mouseRef.current.radius - distance) / mouseRef.current.radius

          particle.velocity.x -= Math.cos(angle) * force * 0.5
          particle.velocity.y -= Math.sin(angle) * force * 0.5
        }
      })

      // Connect particles
      connectParticles()

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    const connectParticles = () => {
      const maxDistance = 100

      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const dx = particlesRef.current[i].x - particlesRef.current[j].x
          const dy = particlesRef.current[i].y - particlesRef.current[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < maxDistance) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(170, 76, 64, ${0.1 * (1 - distance / maxDistance)})`
            ctx.lineWidth = 0.5
            ctx.moveTo(particlesRef.current[i].x, particlesRef.current[i].y)
            ctx.lineTo(particlesRef.current[j].x, particlesRef.current[j].y)
            ctx.stroke()
          }
        }
      }
    }

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX
      mouseRef.current.y = e.clientY
    }

    const handleResize = () => {
      resizeCanvas()
    }

    // Initialize
    resizeCanvas()
    drawParticles()

    // Event listeners
    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", handleResize)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-30 opacity-30" />
}

export default LiquidEffect


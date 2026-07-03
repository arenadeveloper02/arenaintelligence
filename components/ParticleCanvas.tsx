"use client"

import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const glowRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId = 0
    const particles: Particle[] = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()

    for (let i = 0; i < 60; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: Math.random() * 1.8 + 0.6,
      })
    }

    const draw = () => {
      const c = canvasRef.current
      if (!c) return
      const context = c.getContext('2d')
      if (!context) return
      context.clearRect(0, 0, c.width, c.height)
      for (const p of particles) {
        p.x += p.vx
        p.y += p.vy
        if (p.x < 0) p.x = c.width
        if (p.x > c.width) p.x = 0
        if (p.y < 0) p.y = c.height
        if (p.y > c.height) p.y = 0
        context.beginPath()
        context.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        context.fillStyle = 'rgba(129, 140, 248, 0.5)'
        context.fill()
      }
      for (let i = 0; i < particles.length; i += 1) {
        for (let j = i + 1; j < particles.length; j += 1) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 120) {
            context.beginPath()
            context.moveTo(a.x, a.y)
            context.lineTo(b.x, b.y)
            context.strokeStyle = `rgba(99, 102, 241, ${0.12 * (1 - dist / 120)})`
            context.lineWidth = 0.6
            context.stroke()
          }
        }
      }
      animationId = requestAnimationFrame(draw)
    }

    animationId = requestAnimationFrame(draw)
    window.addEventListener('resize', resize)

    const onMove = (e: MouseEvent) => {
      const glow = glowRef.current
      if (!glow) return
      glow.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`
    }
    window.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="orb orb-indigo" />
      <div className="orb orb-cyan" />
      <div className="orb orb-purple" />
      <canvas ref={canvasRef} className="absolute inset-0" />
      <div
        ref={glowRef}
        className="absolute h-[400px] w-[400px] rounded-full bg-indigo-500/10 blur-3xl transition-transform duration-200 ease-out"
      />
    </div>
  )
}

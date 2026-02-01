"use client"

import { useEffect, useRef } from "react"

export default function StarField() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animationFrameId
    let stars = []

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      stars = []
      const numStars = Math.floor((canvas.width * canvas.height) / 5000)
      
      for (let i = 0; i < numStars; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5,
          opacity: Math.random(),
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          twinklePhase: Math.random() * Math.PI * 2,
        })
      }
    }

    const drawStars = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const star of stars) {
        star.twinklePhase += star.twinkleSpeed
        const opacity = 0.3 + Math.sin(star.twinklePhase) * 0.7 * star.opacity

        ctx.beginPath()
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`
        ctx.fill()
      }

      animationFrameId = requestAnimationFrame(drawStars)
    }

    resizeCanvas()
    drawStars()

    window.addEventListener("resize", resizeCanvas)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}

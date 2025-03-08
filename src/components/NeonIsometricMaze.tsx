"use client"
import type React from "react"
import { useEffect, useRef } from "react"

const NeonIsometricMaze: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d", { alpha: false })
    if (!ctx) return

    let t = 0
    let animationFrameId: number
    let lastRenderTime = 0
    const fps = 15 // Reduced target frames per second
    const interval = 1000 / fps

    const setupCanvas = () => {
      if (!canvas) return

      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      ctx.fillStyle = "rgb(5, 5, 15)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const drawMaze = () => {
      if (!canvas || !ctx) return

      const cellSize = Math.min(canvas.width, canvas.height) / 20 // Adjusted cell size for better visual density
      const gridWidth = Math.ceil(canvas.width / cellSize) * 1.5
      const gridHeight = Math.ceil(canvas.height / (cellSize * 0.5)) * 1.5
      const centerX = canvas.width / 2
      const centerY = canvas.height / 2
      const maxDistance = Math.sqrt(gridWidth * gridWidth + gridHeight * gridHeight)

      ctx.fillStyle = "#6b46c1"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      t += 0.03

      const visibleStartX = -gridWidth / 2 - 2
      const visibleEndX = gridWidth / 2 + 2
      const visibleStartY = -gridHeight / 2 - 2
      const visibleEndY = gridHeight / 2 + 2
      const step = 3 // Adjusted step size for better visual density

      for (let y = visibleStartY; y < visibleEndY; y += step) {
        for (let x = visibleStartX; x < visibleEndX; x += step) {
          const posX = centerX + ((x - y) * cellSize) / 2
          const posY = centerY + ((x + y) * cellSize) / 4

          if (posX < -cellSize * 2 || posX > canvas.width + cellSize * 2 ||
              posY < -cellSize * 2 || posY > canvas.height + cellSize * 2) {
            continue
          }

          const distance = Math.sqrt(x * x + y * y)
          const normalizedDistance = 1 - distance / maxDistance
          const heightFactor = Math.abs(Math.sin(distance * 0.3 + t)) * 0.7 + Math.abs(Math.cos(x * 0.2 + y * 0.2 + t * 0.8)) * 0.3
          const height = cellSize * normalizedDistance * heightFactor * 1.2

          ctx.beginPath()
          ctx.moveTo(posX, posY - height)
          ctx.lineTo(posX + cellSize / 2, posY - cellSize / 2 - height)
          ctx.lineTo(posX + cellSize, posY - height)
          ctx.lineTo(posX + cellSize, posY)
          ctx.lineTo(posX + cellSize / 2, posY + cellSize / 2)
          ctx.lineTo(posX, posY)
          ctx.closePath()

          const gradient = ctx.createLinearGradient(posX, posY - height, posX + cellSize, posY)
          gradient.addColorStop(0, `rgba(21, 0, 255, ${0.5 + normalizedDistance * 0.4})`)
          gradient.addColorStop(1, `rgba(255, 0, 255, ${0.5 + normalizedDistance * 0.4})`)
          ctx.fillStyle = gradient
          ctx.fill()

          if (normalizedDistance > 0.4) {
            ctx.shadowColor = 'rgba(120, 0, 255, 0.3)'
            ctx.shadowBlur = 10
          } else {
            ctx.shadowBlur = 0
          }

          ctx.strokeStyle = `rgba(255, 255, 0, ${0.2 + normalizedDistance * 0.3})`
          ctx.lineWidth = 1
          ctx.stroke()

          ctx.beginPath()
          ctx.moveTo(posX, posY)
          ctx.lineTo(posX, posY - height)
          ctx.moveTo(posX + cellSize, posY)
          ctx.lineTo(posX + cellSize, posY - height)
          ctx.moveTo(posX + cellSize / 2, posY + cellSize / 2)
          ctx.lineTo(posX + cellSize / 2, posY - cellSize / 2 - height)
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 + normalizedDistance * 0.2})`
          ctx.stroke()

          ctx.shadowBlur = 0
        }
      }

      const radialGlow = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, Math.max(canvas.width, canvas.height) * 0.7
      )
      radialGlow.addColorStop(0, 'rgba(60, 20, 120, 0.05)')
      radialGlow.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = radialGlow
      ctx.fillRect(0, 0, canvas.width, canvas.height)
    }

    const animate = (currentTime: number) => {
      if (!canvas || !ctx) return

      const deltaTime = currentTime - lastRenderTime
      if (deltaTime >= interval) {
        drawMaze()
        lastRenderTime = currentTime
      }

      animationFrameId = requestAnimationFrame(animate)
    }

    window.addEventListener("resize", setupCanvas)
    setupCanvas()
    animationFrameId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", setupCanvas)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
}

export default NeonIsometricMaze
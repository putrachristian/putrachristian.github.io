import { useEffect, useState } from "react"
import { memo } from "react"

// Performance monitoring component (only in development)
const PerformanceMonitor = memo(() => {
  const [metrics, setMetrics] = useState({
    renderTime: 0,
    scrollFPS: 0,
    memoryUsage: 0,
  })

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return

    let frameCount = 0
    let lastTime = performance.now()
    let scrollStartTime = 0

    const measureScrollPerformance = () => {
      frameCount++
      const currentTime = performance.now()

      if (currentTime - lastTime >= 1000) {
        setMetrics((prev) => ({
          ...prev,
          scrollFPS: Math.round((frameCount * 1000) / (currentTime - lastTime)),
        }))
        frameCount = 0
        lastTime = currentTime
      }

      requestAnimationFrame(measureScrollPerformance)
    }

    const measureMemory = () => {
      if (performance.memory) {
        setMetrics((prev) => ({
          ...prev,
          memoryUsage: Math.round(
            performance.memory.usedJSHeapSize / 1024 / 1024
          ),
        }))
      }
    }

    // Start monitoring
    measureScrollPerformance()
    const memoryInterval = setInterval(measureMemory, 2000)

    return () => {
      clearInterval(memoryInterval)
    }
  }, [])

  if (process.env.NODE_ENV !== "development") return null

  return (
    <div
      style={{
        position: "fixed",
        top: "40px",
        right: "10px",
        background: "rgba(0, 0, 0, 0.8)",
        color: "white",
        padding: "10px",
        borderRadius: "8px",
        fontSize: "12px",
        fontFamily: "monospace",
        zIndex: 9999,
        minWidth: "150px",
      }}
    >
      <div>Performance Monitor</div>
      <div>Scroll FPS: {metrics.scrollFPS}</div>
      <div>Memory: {metrics.memoryUsage}MB</div>
    </div>
  )
})

export default PerformanceMonitor

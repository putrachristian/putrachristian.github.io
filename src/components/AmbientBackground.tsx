import { useEffect } from 'react'

export function AmbientBackground() {
  useEffect(() => {
    let frame = 0

    const handlePointerMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const x = ((event.clientX / window.innerWidth) * 100).toFixed(2)
        const y = ((event.clientY / window.innerHeight) * 100).toFixed(2)
        document.documentElement.style.setProperty('--pointer-x', `${x}%`)
        document.documentElement.style.setProperty('--pointer-y', `${y}%`)
      })
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <div className="ambient-background" aria-hidden="true">
      <div className="ambient-grid" />
      <div className="ambient-orb ambient-orb-a" />
      <div className="ambient-orb ambient-orb-b" />
      <div className="ambient-orb ambient-orb-c" />
      <div className="ambient-spotlight" />
      <div className="ambient-noise" />
    </div>
  )
}

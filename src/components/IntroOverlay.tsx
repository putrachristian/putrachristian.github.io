import { useEffect, useRef, useState } from 'react'

const MIN_INTRO_DURATION = 2400
const INTRO_EXIT_DELAY = 320
const INTRO_EXIT_DURATION = 600

type IntroPhase = 'enter' | 'finishing' | 'exit'

type IntroOverlayProps = {
  name: string
  isLoading: boolean
  onDismiss: () => void
}

export function IntroOverlay({ name, isLoading, onDismiss }: IntroOverlayProps) {
  const [phase, setPhase] = useState<IntroPhase>('enter')
  const mountedAtRef = useRef<number>(Date.now())

  useEffect(() => {
    if (isLoading) {
      return
    }

    const elapsed = Date.now() - mountedAtRef.current
    const remaining = Math.max(0, MIN_INTRO_DURATION - elapsed)

    const finishTimer = window.setTimeout(() => setPhase('finishing'), remaining)
    const exitTimer = window.setTimeout(() => setPhase('exit'), remaining + INTRO_EXIT_DELAY)
    const dismissTimer = window.setTimeout(onDismiss, remaining + INTRO_EXIT_DELAY + INTRO_EXIT_DURATION)

    return () => {
      window.clearTimeout(finishTimer)
      window.clearTimeout(exitTimer)
      window.clearTimeout(dismissTimer)
    }
  }, [isLoading, onDismiss])

  const isWaiting = phase === 'enter'
  const status = isWaiting ? 'Loading portfolio…' : 'Ready'
  const progressVariant = isWaiting ? 'indeterminate' : 'complete'
  const stepMark = isWaiting ? '…' : 'OK'
  const pendingClass = isWaiting ? 'pending' : ''

  return (
    <div className={`intro-overlay intro-overlay--${phase}`} role="status" aria-live="polite">
      <div className="intro-grid" aria-hidden="true" />
      <div className="intro-glow" aria-hidden="true" />

      <div className="intro-content">
        <span className="intro-kicker">Creative Front-End Console</span>
        <h1 className="intro-name">{name}</h1>
        <span className="intro-tag">{status}</span>

        <div className={`intro-progress intro-progress--${progressVariant}`} aria-hidden="true">
          <span className="intro-progress-fill" />
        </div>

        <ul className="intro-checklist" aria-hidden="true">
          <li>
            <span>Initializing UI shell</span>
            <em>OK</em>
          </li>
          <li>
            <span>Fetching project library</span>
            <em className={pendingClass}>{stepMark}</em>
          </li>
          <li>
            <span>Calibrating interactions</span>
            <em className={pendingClass}>{stepMark}</em>
          </li>
        </ul>
      </div>
    </div>
  )
}

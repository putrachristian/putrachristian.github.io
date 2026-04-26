import type { ReactNode } from 'react'

type ConsoleShellProps = {
  timeText: string
  children: ReactNode
}

export function ConsoleShell({ timeText, children }: ConsoleShellProps) {
  return (
    <div className="console-shell static">
      <aside className="console-orbs" aria-hidden="true">
        <span className="orb orb-a" />
        <span className="orb orb-b" />
        <span className="orb orb-c" />
        <span className="orb orb-d" />
      </aside>

      <div className="console-meta console-meta-top-left">
        <span>longitude - 106.8456</span>
        <span>latitude - -6.2088</span>
      </div>

      <div className="console-meta console-meta-top-right">
        <span>Creative Front-End Console</span>
        <span>Portfolio v2026</span>
      </div>

      <div className="console-content">{children}</div>

      <div className="console-meta console-meta-bottom-left">
        <span>Local Time - {timeText || '--:--'}</span>
        <span>Time Spend - 2026</span>
      </div>

      <div className="console-meta console-meta-bottom-right">
        <span>103.216.153.998 - IP</span>
        <span>Jakarta, Indonesia - Location</span>
      </div>
    </div>
  )
}

import { Link, useLocation } from "react-router-dom"
import { GrApps, GrHome, GrFolderOpen, GrUser } from "react-icons/gr"
import { memo } from "react"

import "./style.scss"

const Dock = ({ startMenuOpen, setStartMenuOpen, startRef }) => {
  const location = useLocation()

  return (
    <nav className="dock">
      <div className="dock-container">
        <button
          ref={startRef}
          className={`dock-item start-button ${startMenuOpen ? "active" : ""}`}
          title="Start"
          onClick={() => setStartMenuOpen(!startMenuOpen)}
        >
          <GrApps size={28} />
        </button>

        <div className="dock-divider"></div>

        <Link
          to="/"
          className={`dock-item ${location.pathname === "/" ? "active" : ""}`}
          title="Home"
        >
          <GrHome size={28} />
        </Link>
        <Link
          to="/projects"
          className={`dock-item ${
            location.pathname === "/projects" ? "active" : ""
          }`}
          title="Projects"
        >
          <GrFolderOpen size={28} />
        </Link>
        <Link
          to="/about"
          className={`dock-item ${
            location.pathname === "/about" ? "active" : ""
          }`}
          title="About"
        >
          <GrUser size={28} />
        </Link>
      </div>
    </nav>
  )
}

export default memo(Dock)

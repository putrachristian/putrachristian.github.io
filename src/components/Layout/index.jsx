import { Link, useLocation } from "react-router-dom"
import { FaChevronDown } from "react-icons/fa"
import { useState, useRef, useEffect, useCallback, memo } from "react"
import { useProfile } from "../../hooks/useApiData"
import { useScrollOptimization } from "../../hooks/useScrollOptimization"
import profilePhoto from "../../assets/putra_photo.png"
import resumeThumbnail from "../../assets/putra_christian_resume.jpg"
import resumePDF from "../../assets/putra_christian_resume.pdf"
import Dock from "../Dock"
import StartMenu from "../StartMenu"
import "./style.scss"

const Layout = ({ children }) => {
  const location = useLocation()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const menuRef = useRef(null)
  const startRef = useRef(null)

  // API data hooks
  const { profile } = useProfile()

  // Scroll optimization
  const { optimizeScrollContainer } = useScrollOptimization()
  const mainContentRef = useRef(null)

  // Optimize timer to only update when needed
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Memoize click outside handler
  const handleClickOutside = useCallback((event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setProfileMenuOpen(false)
    }
    if (startRef.current && !startRef.current.contains(event.target)) {
      setStartMenuOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [handleClickOutside])

  // Optimize scroll container on mount
  useEffect(() => {
    if (mainContentRef.current) {
      optimizeScrollContainer(mainContentRef.current)
    }
  }, [optimizeScrollContainer])

  // Memoize expensive functions
  const formatDateTime = useCallback(
    (date) =>
      `${date.toLocaleDateString("en-US", {
        weekday: "long",
      })} ${date.getDate()} ${date.toLocaleDateString("en-US", {
        month: "long",
      })} ${date.getFullYear()} ${date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      })}`,
    []
  )

  const downloadResume = useCallback(() => {
    const link = document.createElement("a")
    link.href = resumePDF
    link.download = "putra_christian_resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }, [])

  return (
    <div className="layout">
      <div className="menu-bar">
        <div className="menu-bar-content">
          <div className="menu-bar-left" ref={menuRef}>
            <button
              className={`profile-button ${profileMenuOpen ? "active" : ""}`}
              onClick={() => setProfileMenuOpen(!profileMenuOpen)}
            >
              <div className="profile-avatar">
                <img src={profilePhoto} alt={profile?.name || "User"} />
              </div>
              <span className="profile-name">
                {profile?.name?.split(" ")[0] || "User"}
              </span>
              <FaChevronDown
                size={16}
                className={`chevron ${profileMenuOpen ? "rotate" : ""}`}
              />
            </button>

            {profileMenuOpen && (
              <div className="profile-dropdown">
                <div className="dropdown-header">
                  <div className="dropdown-avatar">
                    <img src={profilePhoto} alt={profile?.name || "User"} />
                  </div>
                  <div className="dropdown-info">
                    <h3>{profile?.name || "User"}</h3>
                    <p>{profile?.title || "Loading..."}</p>
                  </div>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section">
                  <h4>Contact</h4>
                  <a
                    href={`mailto:${profile?.email || ""}`}
                    className="dropdown-item"
                  >
                    <span>📧</span>
                    <span>{profile?.email || "Loading..."}</span>
                  </a>
                  <a
                    href={`https://wa.me/${(profile?.phone || "").replace(
                      /[^0-9]/g,
                      ""
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    <span>💬</span>
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href={`tel:${profile?.phone || ""}`}
                    className="dropdown-item"
                  >
                    <span>📱</span>
                    <span>{profile?.phone || "Loading..."}</span>
                  </a>
                  <a
                    href={`https://${profile?.linkedin || ""}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="dropdown-item"
                  >
                    <span>💼</span>
                    <span>LinkedIn</span>
                  </a>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-section">
                  <h4>Quick Access</h4>
                  <Link
                    to="/about"
                    className="dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <span>👤</span>
                    <span>View Full Profile</span>
                  </Link>
                  <Link
                    to="/projects"
                    className="dropdown-item"
                    onClick={() => setProfileMenuOpen(false)}
                  >
                    <span>💼</span>
                    <span>My Projects</span>
                  </Link>
                </div>

                <div className="dropdown-divider"></div>

                <div className="dropdown-footer">
                  <span>📍 {profile?.location || "Loading..."}</span>
                </div>
              </div>
            )}
          </div>

          <div className="menu-bar-center"></div>

          <div className="menu-bar-right">
            <div className="datetime-display">
              <span className="datetime-full">
                {formatDateTime(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="desktop-icons">
          <button className="desktop-icon" onClick={downloadResume}>
            <div className="icon-wrapper">
              <img src={resumeThumbnail} alt="Resume" />
            </div>
            <span>putra_christian_resume.pdf</span>
          </button>
        </div>
      )}

      <main className="main-content" ref={mainContentRef}>
        <div className="container">{children}</div>
      </main>

      <StartMenu
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        profile={profile}
      />

      <Dock
        startMenuOpen={startMenuOpen}
        setStartMenuOpen={setStartMenuOpen}
        startRef={startRef}
      />
    </div>
  )
}

export default memo(Layout)

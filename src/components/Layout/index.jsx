import { Link, useLocation } from "react-router-dom"
import {
  Home,
  FolderGit2,
  User,
  ChevronDown,
  Grid3x3,
  Code,
  Palette,
  Database,
  Settings,
  Monitor,
  Smartphone,
  Globe,
  Zap,
  GitBranch,
  Package,
  Shield,
  Users,
  Lightbulb,
  Clock,
  Target,
} from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { useProfile, useSkills } from "../../hooks/useApiData"
import profilePhoto from "../../assets/putra_photo.png"
import resumeThumbnail from "../../assets/putra_christian_resume.jpg"
import resumePDF from "../../assets/putra_christian_resume.pdf"
import "./style.scss"

function Layout({ children }) {
  const location = useLocation()
  const [profileMenuOpen, setProfileMenuOpen] = useState(false)
  const [startMenuOpen, setStartMenuOpen] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const menuRef = useRef(null)
  const startRef = useRef(null)

  // API data hooks
  const { profile } = useProfile()
  const { skills } = useSkills()

  const navItems = [
    { path: "/", label: "Home", icon: Home },
    { path: "/projects", label: "Projects", icon: FolderGit2 },
    { path: "/about", label: "About", icon: User },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setProfileMenuOpen(false)
      }
      if (startRef.current && !startRef.current.contains(event.target)) {
        setStartMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const formatFullDateTime = (date) => {
    const weekday = date.toLocaleDateString("en-US", { weekday: "long" })
    const day = date.getDate()
    const month = date.toLocaleDateString("en-US", { month: "long" })
    const year = date.getFullYear()
    const time = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    return `${weekday} ${day} ${month} ${year} ${time}`
  }

  const handleDownloadResume = () => {
    const link = document.createElement("a")
    link.href = resumePDF
    link.download = "putra_christian_resume.pdf"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getTechIcon = (skill) => {
    const iconMap = {
      "JavaScript (ES6+)": Code,
      HTML5: Globe,
      CSS3: Palette,
      "React.js": Zap,
      Redux: Settings,
      "Node.js (basic)": Database,
      Sass: Palette,
      "Styled-Components": Palette,
      "CSS-in-JS": Palette,
      Bootstrap: Monitor,
      Git: GitBranch,
      "npm/yarn/bun": Package,
      Webpack: Package,
      Babel: Package,
      "RESTful APIs": Globe,
      "Single-Page Applications (SPA)": Monitor,
      "Responsive Web Design": Smartphone,
      "Performance Optimization": Zap,
      "Cross-browser compatibility": Monitor,
      "Problem Solving": Lightbulb,
      "Collaboration & Teamwork": Users,
      Adaptability: Target,
      "Attention to Detail": Shield,
      "Time Management": Clock,
      "Communication (Written & Verbal)": Users,
    }
    return iconMap[skill] || Code
  }

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
              <ChevronDown
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
                {formatFullDateTime(currentTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {location.pathname === "/" && (
        <div className="desktop-icons">
          <button className="desktop-icon" onClick={handleDownloadResume}>
            <div className="icon-wrapper">
              <img src={resumeThumbnail} alt="Resume" />
            </div>
            <span>putra_christian_resume.pdf</span>
          </button>
        </div>
      )}

      <main className="main-content">
        <div className="container">{children}</div>
      </main>

      {startMenuOpen && (
        <div
          className="start-menu-overlay"
          onClick={() => setStartMenuOpen(false)}
        >
          <div className="start-menu" onClick={(e) => e.stopPropagation()}>
            {/* Main Content */}
            <div className="start-main-content">
              {skills && (
                <>
                  {/* Hard Skills Section */}
                  <div className="start-section">
                    <div className="section-header">
                      <h3>Hard Skills</h3>
                    </div>
                    <div className="pinned-grid">
                      {skills.hardSkills.hardSkills?.map((skill, index) => {
                        const IconComponent = getTechIcon(skill)
                        return (
                          <div key={index} className="pinned-item">
                            <div className="pinned-icon">
                              <IconComponent size={24} />
                            </div>
                            <span className="pinned-label">{skill}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>

                  {/* Soft Skills Section */}
                  <div className="start-section">
                    <div className="section-header">
                      <h3>Soft Skills</h3>
                    </div>
                    <div className="pinned-grid">
                      {skills.softSkills.softSkills?.map((skill, index) => {
                        const IconComponent = getTechIcon(skill)
                        return (
                          <div key={index} className="pinned-item">
                            <div className="pinned-icon">
                              <IconComponent size={24} />
                            </div>
                            <span className="pinned-label">{skill}</span>
                          </div>
                        )
                      })}
                      <div className="pinned-item">
                        <div className="pinned-icon">
                          <FolderGit2 size={24} />
                        </div>
                        <span className="pinned-label">My Projects</span>
                      </div>
                      <div className="pinned-item">
                        <div className="pinned-icon">
                          <User size={24} />
                        </div>
                        <span className="pinned-label">About Me</span>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Footer */}
            <div className="start-footer">
              <div className="footer-user">
                <div className="footer-avatar">
                  <img src={profilePhoto} alt={profile?.name || "User"} />
                </div>
                <span className="footer-name">{profile?.name || "User"}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <nav className="dock">
        <div className="dock-container">
          <button
            ref={startRef}
            className={`dock-item start-button ${
              startMenuOpen ? "active" : ""
            }`}
            title="Start"
            onClick={() => setStartMenuOpen(!startMenuOpen)}
          >
            <Grid3x3 size={28} />
          </button>

          <div className="dock-divider"></div>

          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`dock-item ${
                location.pathname === item.path ? "active" : ""
              }`}
              title={item.label}
            >
              <item.icon size={28} />
            </Link>
          ))}
        </div>
      </nav>
    </div>
  )
}

export default Layout

import {
  DiJavascript,
  DiHtml5,
  DiCss3,
  DiReact,
  DiNodejs,
  DiSass,
  DiBootstrap,
  DiGit,
  DiNpm,
  DiWebplatform,
  DiResponsive,
  DiJsBadge,
  DiPhp,
  DiMysql,
} from "react-icons/di"
import { useSkills } from "../../hooks/useApiData"
import profilePhoto from "../../assets/putra_photo.png"
import { memo, useMemo } from "react"
import "./style.scss"

const getTechIcon = (skill) =>
  ({
    "JavaScript (ES6+)": DiJsBadge,
    HTML5: DiHtml5,
    CSS3: DiCss3,
    "React.js": DiReact,
    Redux: DiReact,
    "Node.js (basic)": DiNodejs,
    Sass: DiSass,
    "Styled-Components": DiCss3,
    "CSS-in-JS": DiCss3,
    Bootstrap: DiBootstrap,
    Git: DiGit,
    "npm/yarn/bun": DiNpm,
    Webpack: DiWebplatform,
    Babel: DiWebplatform,
    "RESTful APIs": DiWebplatform,
    "Single-Page Applications (SPA)": DiWebplatform,
    "Responsive Web Design": DiResponsive,
    "Performance Optimization": DiWebplatform,
    "Cross-browser compatibility": DiWebplatform,
    NextJS: DiReact,
    PHP: DiPhp,
    MySQL: DiMysql,
  }[skill] || DiJavascript)

const SkillItem = memo(({ skill, Icon }) => (
  <div className="pinned-item">
    <div className="pinned-icon">
      <Icon size={24} />
    </div>
    <span className="pinned-label">{skill}</span>
  </div>
))

const StartMenu = ({ startMenuOpen, setStartMenuOpen, profile }) => {
  const { skills } = useSkills()

  // Memoize skills rendering
  const skillsList = useMemo(() => {
    if (!skills?.hardSkills?.hardSkills) return null

    return skills.hardSkills.hardSkills.map((skill, index) => (
      <SkillItem key={index} skill={skill} Icon={getTechIcon(skill)} />
    ))
  }, [skills])

  if (!startMenuOpen) return null

  return (
    <div className="start-menu-overlay" onClick={() => setStartMenuOpen(false)}>
      <div className="start-menu" onClick={(e) => e.stopPropagation()}>
        <div className="start-main-content">
          {skills && (
            <>
              <div className="start-section">
                <div className="section-header">
                  <h3>Tech Stack</h3>
                </div>
                <div className="pinned-grid">{skillsList}</div>
              </div>

              {/* <div className="start-section">
								<div className="section-header">
									<h3>Soft Skills</h3>
								</div>
								<div className="pinned-grid">
									{skills.softSkills.softSkills?.map((skill, index) => (
										<SkillItem
											key={index}
											skill={skill}
											Icon={getTechIcon(skill)}
										/>
									))}
									<SkillItem skill="My Projects" Icon={AiFillFolderOpen} />
									<SkillItem skill="About Me" Icon={DiUser} />
								</div>
							</div> */}
            </>
          )}
        </div>

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
  )
}

export default memo(StartMenu)

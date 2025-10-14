import { useState, useCallback, memo, useMemo } from "react"
import { Briefcase, Calendar } from "lucide-react"
import { useProjects } from "../../hooks/useApiData"
import ProjectModal from "../../components/ProjectModal"
import "./style.scss"

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const { projects } = useProjects()

  // Memoize event handlers
  const openModal = useCallback((project) => {
    setSelectedProject(project)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProject(null)
  }, [])

  // Memoize project cards to prevent unnecessary re-renders
  const projectCards = useMemo(() => {
    if (!projects) return null

    return projects.map((project) => (
      <ProjectCard key={project.id} project={project} onOpenModal={openModal} />
    ))
  }, [projects, openModal])

  if (!projects) {
    return (
      <div className="projects">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <span>Loading projects...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="projects">
      <div className="projects-header">
        <h1>My Projects</h1>
        <p>
          Web events and gamification features I've built during my time at
          Garena Indonesia
        </p>
      </div>

      <div className="projects-grid">{projectCards}</div>

      <ProjectModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={closeModal}
      />
    </div>
  )
}

// Memoized ProjectCard component
const ProjectCard = memo(({ project, onOpenModal }) => (
  <div className="project-card" onClick={() => onOpenModal(project)}>
    <div className="project-image">
      <img src={project.images[0].url} alt={project.title} />
      <div className="project-overlay">
        <span className="view-details">View Details</span>
      </div>
    </div>
    <div className="project-content">
      <h3>{project.title}</h3>
      <p>{project.description.substring(0, 120)}...</p>
    </div>
  </div>
))

export default memo(Projects)

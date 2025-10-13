import { useState } from "react"
import { ChevronLeft, ChevronRight, X, Briefcase, Calendar } from "lucide-react"
import { useProjects } from "../../hooks/useApiData"
import "./style.scss"

function Projects() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const { projects } = useProjects()

  const openModal = (project) => {
    setSelectedProject(project)
    setCurrentImageIndex(0)
  }

  const closeModal = () => {
    setSelectedProject(null)
    setCurrentImageIndex(0)
  }

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      )
    }
  }

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      )
    }
  }

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

      <div className="projects-grid">
        {projects?.map((project) => (
          <div
            key={project.id}
            className="project-card"
            onClick={() => openModal(project)}
          >
            <div className="project-image">
              <img src={project.images[0].url} alt={project.title} />
              <div className="project-overlay">
                <span className="view-details">View Details</span>
              </div>
            </div>
            <div className="project-content">
              <h3>{project.title}</h3>
              <p>{project.description.substring(0, 120)}...</p>
              <div className="project-meta">
                <span className="meta-item">
                  <Briefcase size={16} />
                  {project.company}
                </span>
                <span className="meta-item">
                  <Calendar size={16} />
                  {project.year}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedProject && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              <X size={24} />
            </button>

            <div className="modal-body">
              <div className="modal-gallery">
                <img
                  src={selectedProject.images[currentImageIndex].url}
                  alt={`${selectedProject.title} - ${currentImageIndex + 1}`}
                />
                {selectedProject.images.length > 1 && (
                  <>
                    <button className="gallery-btn prev" onClick={prevImage}>
                      <ChevronLeft size={24} />
                    </button>
                    <button className="gallery-btn next" onClick={nextImage}>
                      <ChevronRight size={24} />
                    </button>
                    <div className="gallery-indicators">
                      {selectedProject.images.map((_, index) => (
                        <button
                          key={index}
                          className={`indicator ${
                            index === currentImageIndex ? "active" : ""
                          }`}
                          onClick={() => setCurrentImageIndex(index)}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              <div className="modal-info">
                <h2>{selectedProject.title}</h2>
                <div className="modal-description">
                  <p>{selectedProject.description}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects

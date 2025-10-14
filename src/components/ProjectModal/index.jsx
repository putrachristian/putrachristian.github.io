import { useState, useCallback, memo, useEffect } from "react"
import { ChevronLeft, ChevronRight, Briefcase, Calendar } from "lucide-react"
import Modal from "../Modal"
import "./style.scss"

const ProjectModal = ({ project, isOpen, onClose }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // Reset image index when modal opens
  useEffect(() => {
    if (isOpen) {
      setCurrentImageIndex(0)
    }
  }, [isOpen])

  const nextImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) =>
        prev === project.images.length - 1 ? 0 : prev + 1
      )
    }
  }, [project])

  const prevImage = useCallback(() => {
    if (project) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? project.images.length - 1 : prev - 1
      )
    }
  }, [project])

  const goToImage = useCallback((index) => {
    setCurrentImageIndex(index)
  }, [])

  if (!project) return null

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="project-modal">
      <div className="project-modal-content">
        <div className="project-gallery">
          <div className="gallery-container">
            <img
              src={project.images[currentImageIndex].url}
              alt={`${project.title} - ${currentImageIndex + 1}`}
              className="gallery-image"
            />

            {project.images.length > 1 && (
              <>
                <button
                  className="gallery-btn prev"
                  onClick={prevImage}
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  className="gallery-btn next"
                  onClick={nextImage}
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>

                <div className="gallery-indicators">
                  {project.images.map((_, index) => (
                    <button
                      key={index}
                      className={`indicator ${
                        index === currentImageIndex ? "active" : ""
                      }`}
                      onClick={() => goToImage(index)}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="project-info">
          <div className="project-header">
            <h2 className="project-title">{project.title}</h2>
          </div>

          <div className="project-description">
            <p>{project.description}</p>
          </div>

          {project.technologies && (
            <div className="project-technologies">
              <h4>Technologies Used</h4>
              <div className="tech-tags">
                {project.technologies.map((tech, index) => (
                  <span key={index} className="tech-tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.links && (
            <div className="project-links">
              <h4>Links</h4>
              <div className="link-buttons">
                {project.links.live && (
                  <a
                    href={project.links.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn primary"
                  >
                    View Live Site
                  </a>
                )}
                {project.links.github && (
                  <a
                    href={project.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-btn secondary"
                  >
                    View Code
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </Modal>
  )
}

export default memo(ProjectModal)

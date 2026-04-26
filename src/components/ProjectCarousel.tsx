import { type CSSProperties, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import type { ProjectEntry } from '../types'

const VISIBLE_OFFSET = 1
const CARD_TRANSLATE_PERCENT = 62
const CARD_ROTATE_DEGREES = 22
const CARD_SCALE_STEP = 0.12
const NEIGHBOR_OPACITY = 0.55
const DEFAULT_ACCENT = '#8b7cff'

type ProjectCarouselProps = {
  projects: ProjectEntry[]
  isLoading?: boolean
}

type ProjectDetailModalProps = {
  project: ProjectEntry
  onClose: () => void
}

function getWrappedOffset(index: number, activeIndex: number, total: number) {
  const raw = index - activeIndex
  const half = Math.floor(total / 2)

  if (raw > half) {
    return raw - total
  }

  if (raw < -half) {
    return raw + total
  }

  return raw
}

function buildCardStyle(offset: number): CSSProperties {
  const distance = Math.abs(offset)

  return {
    transform: `translateX(calc(-50% + (${offset} * ${CARD_TRANSLATE_PERCENT}%))) rotateY(${
      offset * -CARD_ROTATE_DEGREES
    }deg) scale(${1 - distance * CARD_SCALE_STEP})`,
    opacity: distance === 0 ? 1 : NEIGHBOR_OPACITY,
    zIndex: `${20 - distance}`,
  }
}

function ProjectCarouselSkeleton() {
  return (
    <div
      className="project-carousel-shell project-carousel-shell--loading"
      aria-busy="true"
      aria-label="Loading projects"
    >
      <div className="project-carousel-stage">
        {[-1, 0, 1].map((offset) => (
          <div
            key={offset}
            className={`carousel-card skeleton-card ${offset === 0 ? 'active' : ''}`}
            style={buildCardStyle(offset)}
          >
            <div className="carousel-card-frame carousel-card-skeleton">
              <span className="skeleton-shimmer" />
            </div>
          </div>
        ))}
      </div>

      <div className="project-carousel-controls skeleton-controls" aria-hidden="true">
        <span className="skeleton-pill" />
        <span className="skeleton-counter" />
        <span className="skeleton-pill" />
      </div>

      <div className="project-carousel-caption project-carousel-caption--loading" aria-hidden="true">
        <span className="skeleton-line skeleton-line-title" />
        <span className="skeleton-line" />
        <span className="skeleton-line skeleton-line-short" />
        <span className="skeleton-pill skeleton-pill-action" />
      </div>
    </div>
  )
}

export function ProjectCarousel({ projects, isLoading = false }: ProjectCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openProject, setOpenProject] = useState<ProjectEntry | null>(null)

  const activeProject = projects[activeIndex]

  if (isLoading) {
    return <ProjectCarouselSkeleton />
  }

  if (!activeProject) {
    return null
  }

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + projects.length) % projects.length)
  }

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % projects.length)
  }

  return (
    <div className="project-carousel-shell">
      <div className="project-carousel-stage">
        {projects.map((project, index) => {
          const offset = getWrappedOffset(index, activeIndex, projects.length)
          const isVisible = Math.abs(offset) <= VISIBLE_OFFSET
          const isActive = offset === 0
          const preview = project.screenshots[0]
          const style = {
            ...buildCardStyle(offset),
            '--accent': project.accent ?? DEFAULT_ACCENT,
          } as CSSProperties

          return (
            <button
              key={project.slug}
              type="button"
              className={`carousel-card ${isActive ? 'active' : ''} ${!isVisible ? 'hidden' : ''}`}
              style={style}
              onClick={() => (isActive ? setOpenProject(project) : setActiveIndex(index))}
              aria-label={isActive ? `Open details for ${project.title}` : `Show project ${project.title}`}
            >
              <div className="carousel-card-frame">
                {preview?.src ? (
                  <img src={preview.src} alt={preview.alt ?? ''} className="carousel-card-image" />
                ) : (
                  <div
                    className="carousel-card-placeholder"
                    role="img"
                    aria-label={preview?.alt ?? `${project.title} placeholder`}
                  >
                    <div className="carousel-card-glow" />
                    <span className="carousel-card-index">{String(index + 1).padStart(2, '0')}</span>
                  </div>
                )}
              </div>
            </button>
          )
        })}
      </div>

      <div className="project-carousel-controls">
        <button type="button" className="carousel-nav" onClick={goPrev} aria-label="Previous project">
          Prev
        </button>
        <div className="carousel-indicator">
          <span>{String(activeIndex + 1).padStart(2, '0')}</span>
          <small>/ {String(projects.length).padStart(2, '0')}</small>
        </div>
        <button type="button" className="carousel-nav" onClick={goNext} aria-label="Next project">
          Next
        </button>
      </div>

      <div className="project-carousel-caption">
        <h3>{activeProject.title}</h3>
        <p>{activeProject.summary}</p>
        <button type="button" className="project-detail-trigger" onClick={() => setOpenProject(activeProject)}>
          View details
        </button>
      </div>

      {openProject ? <ProjectDetailModal project={openProject} onClose={() => setOpenProject(null)} /> : null}
    </div>
  )
}

function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const screenshots = project.screenshots.filter((screenshot) => screenshot.src)
  const activeScreenshot = screenshots[activeImageIndex]

  useEffect(() => {
    setActiveImageIndex(0)
  }, [project.slug])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  const goPrev = () => {
    setActiveImageIndex((current) => (current - 1 + screenshots.length) % screenshots.length)
  }

  const goNext = () => {
    setActiveImageIndex((current) => (current + 1) % screenshots.length)
  }

  return createPortal(
    <div
      className="project-detail-modal"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} details`}
      onClick={onClose}
    >
      <div className="project-detail-backdrop" />
      <article className="project-detail-panel" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="project-detail-close" onClick={onClose} aria-label="Close project details">
          Close
        </button>

        <div className="project-detail-body">
          <div className="project-detail-gallery">
            <div className="project-detail-media">
              {activeScreenshot?.src ? (
                <img
                  src={activeScreenshot.src}
                  alt={activeScreenshot.alt || project.title}
                  className="project-detail-image"
                />
              ) : (
                <div className="project-detail-placeholder">No preview</div>
              )}
            </div>

            {screenshots.length > 1 ? (
              <div className="project-detail-controls">
                <button type="button" onClick={goPrev}>
                  Prev
                </button>
                <span>
                  {String(activeImageIndex + 1).padStart(2, '0')} /{' '}
                  {String(screenshots.length).padStart(2, '0')}
                </span>
                <button type="button" onClick={goNext}>
                  Next
                </button>
              </div>
            ) : null}

            {screenshots.length > 1 ? (
              <div className="project-detail-thumbnails" aria-label="Project screenshots">
                {screenshots.map((screenshot, index) => (
                  <button
                    key={`${screenshot.src}-${index}`}
                    type="button"
                    className={index === activeImageIndex ? 'active' : ''}
                    onClick={() => setActiveImageIndex(index)}
                    aria-label={`Show screenshot ${index + 1}`}
                  >
                    {screenshot.src ? <img src={screenshot.src} alt="" /> : null}
                  </button>
                ))}
              </div>
            ) : null}
          </div>

          <div className="project-detail-copy">
            <h4>{project.title}</h4>
            <p>{project.summary}</p>
          </div>
        </div>
      </article>
    </div>,
    document.body,
  )
}

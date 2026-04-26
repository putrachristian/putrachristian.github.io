import type { PortfolioData } from '../../types'
import { ProjectCarousel } from '../ProjectCarousel'

type ProjectsSectionProps = {
  projects: PortfolioData['projects']
  isLoading: boolean
}

export function ProjectsSection({ projects, isLoading }: ProjectsSectionProps) {
  return (
    <section className="page page-projects">
      <div className="projects-heading-block">
        <span className="projects-kicker">Selected work</span>
        <h2>Projects Showcase</h2>
      </div>
      <ProjectCarousel projects={projects} isLoading={isLoading} />
    </section>
  )
}

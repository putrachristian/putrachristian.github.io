import { motion, useScroll, useTransform } from "motion/react"
import { useState, useRef } from "react"
import { ProjectCard } from "./ProjectCard/ProjectCard"
import { ProjectModal } from "./ProjectModal/ProjectModal"
import { useApiContext } from "../../../context/ApiContext"

export const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const ref = useRef(null)
  const { projects } = useApiContext()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  return (
    <>
      <section
        ref={ref}
        id="projects"
        className="py-12 px-6 relative -mt-16 bg-gradient-to-b from-black/30 via-black/50 to-black/60 z-20"
        style={{ perspective: "1500px" }}
      >
        <motion.div
          className="max-w-7xl mx-auto"
          style={{
            opacity,
            y,
            scale,
            willChange: "transform, opacity",
          }}
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20"
            style={{ willChange: "transform" }}
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-300 mb-4"
            >
              Portfolio
            </motion.span>
            <h2 className="text-5xl md:text-6xl mb-6">
              <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                Selected
              </span>
              <br />
              <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
                Projects
              </span>
            </h2>
            <p className="text-white/60 text-lg max-w-2xl">
              A collection of projects that showcase my skills in creating
              engaging and functional web experiences.
            </p>
          </motion.div>

          {/* Projects grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects?.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                onProjectClick={handleProjectClick}
              />
            ))}
          </div>
        </motion.div>
      </section>

      {/* Project Modal */}
      <ProjectModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setSelectedProject(null)
        }}
        project={selectedProject}
      />
    </>
  )
}

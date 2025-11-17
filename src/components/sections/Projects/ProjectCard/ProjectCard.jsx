import { motion } from "motion/react"

export const ProjectCard = ({ project, index, onProjectClick }) => {
  return (
    <motion.div
      key={project.title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -15,
        scale: 1.03,
      }}
      onClick={() => onProjectClick(project)}
      className="group cursor-pointer"
      style={{ willChange: "transform" }}
    >
      <motion.div
        whileHover={{ y: -10 }}
        className="relative backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 overflow-hidden"
      >
        <div className="relative overflow-hidden">
          <motion.img
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.6 }}
            src={project.images[0].url}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/20 group-hover:to-purple-500/20 transition-all duration-500" />

          {/* View details hint */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="px-6 py-3 bg-white/10 backdrop-blur-xl rounded-full border border-white/20">
              <span className="text-white">View Details</span>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="p-6">
          <h3 className="text-white text-xl group-hover:text-violet-300 transition-colors">
            {project.title}
          </h3>
        </div>

        {/* Bottom accent */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />
      </motion.div>
    </motion.div>
  )
}

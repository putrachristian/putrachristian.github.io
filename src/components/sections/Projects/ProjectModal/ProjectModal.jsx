import { motion, AnimatePresence } from "motion/react"
import { X, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

export const ProjectModal = ({ isOpen, onClose, project }) => {
  const [currentSlide, setCurrentSlide] = useState(0)

  if (!project) return null

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === project.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? project.images.length - 1 : prev - 1
    )
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-xl z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-4 md:inset-8 lg:inset-16 z-50 overflow-hidden"
          >
            <div className="relative h-full backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-3xl border border-white/20 overflow-hidden">
              {/* Close button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X className="w-5 h-5 text-white" />
              </motion.button>

              {/* Content */}
              <div className="h-full overflow-y-auto p-6 md:p-8 lg:p-12">
                <div className="max-w-6xl mx-auto space-y-8">
                  {/* Header */}
                  <div>
                    <h2 className="text-4xl md:text-5xl mb-4">
                      <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
                        {project.title}
                      </span>
                    </h2>
                    {/* <p className="text-white/70 text-lg">
                      {project.description}
                    </p> */}
                  </div>

                  {/* Screenshot carousel */}
                  <div className="relative aspect-video max-w-4xl mx-auto rounded-2xl overflow-hidden bg-black/20">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentSlide}
                        src={project.images[currentSlide].url}
                        alt={`${project.title} screenshot ${currentSlide + 1}`}
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -100 }}
                        transition={{ duration: 0.3 }}
                        className="w-full h-full object-cover"
                      />
                    </AnimatePresence>

                    {/* Navigation arrows */}
                    {project.images.length > 1 && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={prevSlide}
                          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <ChevronLeft className="w-6 h-6 text-white" />
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={nextSlide}
                          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors"
                        >
                          <ChevronRight className="w-6 h-6 text-white" />
                        </motion.button>

                        {/* Slide indicators */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                          {project.images.map((_, index) => (
                            <button
                              key={index}
                              onClick={() => setCurrentSlide(index)}
                              className={`w-2 h-2 rounded-full transition-all ${
                                index === currentSlide
                                  ? "w-8 bg-white"
                                  : "bg-white/40 hover:bg-white/60"
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}
                  </div>

                  {/* Description */}
                  <div className="backdrop-blur-xl bg-white/5 rounded-2xl p-6 border border-white/10 max-w-4xl mx-auto">
                    <h3 className="text-white text-xl mb-4">
                      About This Project
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

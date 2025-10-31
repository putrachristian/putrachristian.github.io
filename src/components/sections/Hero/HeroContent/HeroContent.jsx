import { motion } from "motion/react"
import { Sparkles } from "lucide-react"
import { useApiContext } from "../../../../context/ApiContext"

export const HeroContent = () => {
  const { profile } = useApiContext()

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      style={{ willChange: "transform" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 backdrop-blur-sm mb-6"
      >
        <Sparkles className="w-4 h-4 text-violet-400" />
        <span className="text-violet-300">Available for hire</span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-6"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl mb-4">
          <span className="bg-gradient-to-r from-white via-violet-200 to-purple-200 bg-clip-text text-transparent">
            Hello, I'm
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            {profile?.name}
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-white/70 text-lg mb-8 max-w-xl"
      >
        I craft web-app with modern web technologies. Specialized in React,
        JavaScript, and creating delightful user experiences.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-wrap gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl hover:shadow-lg hover:shadow-violet-500/50 transition-shadow"
        >
          <span className="text-white">View My Work</span>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() =>
            document
              .getElementById("contact")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-colors"
        >
          <span className="text-white">Get in Touch</span>
        </motion.button>
      </motion.div>
    </motion.div>
  )
}

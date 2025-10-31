import { motion } from "motion/react"
import { useApiContext } from "../../../../context/ApiContext"
import resumePDF from "../../../../assets/putra_christian_resume.pdf"

export const AboutContent = () => {
  const { profile } = useApiContext()
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
      style={{ willChange: "transform" }}
    >
      <p className="text-white/70 text-lg leading-relaxed">
        {profile?.summary}
      </p>
      <p className="text-white/70 text-lg leading-relaxed">
        My journey in web development started with a curiosity for how websites
        work, and it quickly turned into a passion for building beautiful,
        functional interfaces. I specialize in React, Javascript, and modern CSS
        frameworks, always staying on top of the latest trends and best
        practices.
      </p>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
      >
        <a
          className="text-white"
          download="putra_christian_resume.pdf"
          href={resumePDF}
        >
          Download Resume
        </a>
      </motion.button>
    </motion.div>
  )
}

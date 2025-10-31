import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { AboutImage } from "./AboutImage/AboutImage"
import { AboutContent } from "./AboutContent/AboutContent"

export const About = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-20%"])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5]
  )

  return (
    <section
      ref={ref}
      id="about"
      className="py-12 px-6 relative -mt-20 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-10"
      style={{ perspective: "1500px" }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-300 mb-4"
          >
            About Me
          </motion.span>
          <h2 className="text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Crafting Digital
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Experiences
            </span>
          </h2>
        </motion.div>

        <motion.div
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
          style={{ y, opacity, willChange: "transform, opacity" }}
        >
          <AboutImage />
          <AboutContent />
        </motion.div>
      </div>
    </section>
  )
}

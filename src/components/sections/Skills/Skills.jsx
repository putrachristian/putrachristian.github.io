import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import {
  SiReact,
  SiRedux,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiHtml5,
  SiCss3,
  SiSass,
  SiVite,
} from "react-icons/si"
import { SkillCard } from "./SkillCard/SkillCard"

export const Skills = () => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-15%"])
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.5]
  )

  const skills = [
    { name: "React", icon: SiReact, color: "#61DAFB" },
    { name: "Redux", icon: SiRedux, color: "#3178C6" },
    { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
    { name: "Next.js", icon: SiNextdotjs, color: "#000000" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "#06B6D4" },
    { name: "Node.js", icon: SiNodedotjs, color: "#339933" },
    { name: "Git", icon: SiGit, color: "#F05032" },
    { name: "Figma", icon: SiFigma, color: "#F24E1E" },
    { name: "HTML5", icon: SiHtml5, color: "#E34F26" },
    { name: "CSS3", icon: SiCss3, color: "#1572B6" },
    { name: "Sass", icon: SiSass, color: "#ec45f2" },
    { name: "Vite", icon: SiVite, color: "#646CFF" },
  ]

  return (
    <section
      ref={ref}
      id="skills"
      className="py-12 px-6 relative overflow-hidden -mt-16 bg-gradient-to-b from-black/40 via-black/60 to-black/70 z-30"
      style={{ perspective: "1500px" }}
    >
      {/* Floating orb background */}
      <motion.div
        style={{ rotate, willChange: "transform" }}
        className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-violet-500/20 to-purple-500/20 rounded-full blur-3xl -z-10"
      />

      <motion.div
        className="max-w-7xl mx-auto"
        style={{
          y,
          opacity,
          willChange: "transform, opacity",
        }}
      >
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
          style={{ willChange: "transform" }}
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/10 border border-violet-500/20 text-violet-300 mb-4"
          >
            Tech Stack
          </motion.span>
          <h2 className="text-5xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Skills &
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Technologies
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Tools and technologies I use to bring ideas to life
          </p>
        </motion.div>

        {/* Skills grid - floating cards */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          style={{ scale, willChange: "transform" }}
        >
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} {...skill} index={index} />
          ))}
        </motion.div>

        {/* Additional info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
          style={{ willChange: "transform" }}
        >
          <div className="inline-block backdrop-blur-xl bg-white/5 rounded-3xl p-8 border border-white/10">
            <p className="text-white/70 mb-4">
              Always learning and exploring new technologies to stay ahead of
              the curve
            </p>
            <div className="flex items-center justify-center gap-8 text-sm text-white/50">
              <div>
                <div className="text-2xl text-violet-400 mb-1">Garena</div>
                <div>Current Company</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-2xl text-purple-400 mb-1">12+</div>
                <div>Technologies</div>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <div className="text-2xl text-pink-400 mb-1">Indonesia</div>
                <div>Location</div>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

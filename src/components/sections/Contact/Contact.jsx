import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"
import { ContactForm } from "./ContactForm/ContactForm"
import { ContactInfo } from "./ContactInfo/ContactInfo"
import { useApiContext } from "../../../context/ApiContext"

export const Contact = () => {
  const { profile } = useApiContext()

  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], ["5%", "-10%"])
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0.7]
  )
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.98])

  return (
    <section
      ref={ref}
      id="contact"
      className="py-12 px-6 relative -mt-16 bg-gradient-to-b from-black/60 via-black/80 to-black z-40"
      style={{ perspective: "1500px" }}
    >
      <motion.div
        className="max-w-7xl mx-auto"
        style={{
          y,
          opacity,
          scale,
          willChange: "transform, opacity",
        }}
      >
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
            Get In Touch
          </motion.span>
          <h2 className="text-5xl md:text-6xl mb-6">
            <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">
              Let's Build
            </span>
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-purple-400 bg-clip-text text-transparent">
              Something Great
            </span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to
            bring your ideas to life.
          </p>
        </motion.div>

        <div className="grid gap-12 items-start">
          {/* <ContactForm /> */}
          <ContactInfo profile={profile} />
        </div>
      </motion.div>
    </section>
  )
}

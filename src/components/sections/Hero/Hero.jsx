import { motion, useScroll, useTransform } from "motion/react"
import { useEffect, useState, useRef } from "react"
import { ArrowDown } from "lucide-react"
import { HeroContent } from "./HeroContent/HeroContent"
import { HeroCard } from "./HeroCard/HeroCard"

export const Hero = () => {
  const [text, setText] = useState("")
  const fullText = "Front-End Web Developer"
  const [showCursor, setShowCursor] = useState(true)
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  })

  // Parallax transformations - optimized for performance
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85])

  useEffect(() => {
    let index = 0
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index))
        index++
      } else {
        clearInterval(typingInterval)
      }
    }, 100)

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev)
    }, 500)

    return () => {
      clearInterval(typingInterval)
      clearInterval(cursorInterval)
    }
  }, [])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
      style={{ perspective: "1500px" }}
    >
      {/* Animated grid background with parallax */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, willChange: "transform" }}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem]" />

        {/* Spotlight effect */}
        <motion.div
          animate={{
            opacity: [0.3, 0.5, 0.3],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, rgba(168, 85, 247, 0.1) 50%, transparent 100%)",
          }}
        />
      </motion.div>

      <motion.div
        className="max-w-7xl mx-auto w-full"
        style={{
          y,
          opacity,
          scale,
          willChange: "transform, opacity",
        }}
      >
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            style={{ willChange: "transform" }}
          >
            <HeroContent />

            <div className="flex items-center py-4 gap-2 text-2xl md:text-3xl text-white/60">
              <span>{text}</span>
              {showCursor && (
                <span className="w-0.5 h-8 bg-violet-400 animate-pulse" />
              )}
            </div>
          </motion.div>

          {/* Right content - Floating card */}
          <HeroCard />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        style={{ opacity }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-white/40 text-sm">Scroll down</span>
          <ArrowDown className="w-5 h-5 text-white/40" />
        </div>
      </motion.div>
    </section>
  )
}

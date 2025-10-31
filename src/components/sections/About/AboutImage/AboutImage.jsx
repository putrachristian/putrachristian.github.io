import { motion } from "motion/react"
import profilephoto from "../../../../assets/putra.jpeg"

export const AboutImage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative"
      style={{ willChange: "transform" }}
    >
      <div className="relative aspect-square rounded-[3rem] overflow-hidden">
        <img
          src={profilephoto}
          alt="Creative workspace"
          className="w-full h-full object-cover"
        />
        {/* <div className="absolute inset-0 bg-gradient-to-tr from-violet-500/30 to-transparent" /> */}
      </div>

      {/* Floating badge */}
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute -bottom-6 -right-6 px-8 py-4 bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl shadow-lg shadow-violet-500/50"
      >
        <div className="text-white text-xl">Garena</div>
        <div className="text-white/80 text-sm">Indonesia</div>
      </motion.div>
    </motion.div>
  )
}

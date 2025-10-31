import { motion } from "motion/react"

export const SkillCard = ({ name, icon: Icon, color, index }) => {
  return (
    <motion.div
      key={name}
      initial={{ opacity: 0, scale: 0 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{
        delay: index * 0.05,
        type: "spring",
        stiffness: 200,
        damping: 15,
      }}
      whileHover={{
        scale: 1.1,
        y: -10,
      }}
      className="group relative"
      style={{ willChange: "transform" }}
    >
      <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 overflow-hidden aspect-square flex flex-col items-center justify-center gap-4 cursor-pointer">
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at center, ${color}20, transparent)`,
          }}
        />

        {/* Icon container with animated border */}
        <div className="relative">
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.6 }}
            className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center relative z-10"
            style={{
              boxShadow: `0 0 30px ${color}30`,
            }}
          >
            <Icon className="w-8 h-8" style={{ color: color }} />
          </motion.div>

          {/* Animated ring */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 opacity-0 group-hover:opacity-100"
            style={{ borderColor: color }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </div>

        {/* Label */}
        <div className="relative z-10 text-center">
          <div className="text-white group-hover:scale-110 transition-transform">
            {name}
          </div>
        </div>

        {/* Corner accent */}
        <div
          className="absolute bottom-0 right-0 w-16 h-16 opacity-20 group-hover:opacity-40 transition-opacity"
          style={{
            background: `linear-gradient(135deg, transparent 50%, ${color} 50%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

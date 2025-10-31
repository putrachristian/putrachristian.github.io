import { motion } from "motion/react"

export const ValueCard = ({ icon: Icon, title, description, color, index }) => {
  return (
    <motion.div
      key={title}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      whileHover={{
        y: -15,
        scale: 1.03,
      }}
      className="group relative"
      style={{ willChange: "transform" }}
    >
      <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl p-6 border border-white/10 overflow-hidden h-full">
        {/* Gradient overlay on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
        />

        <div className="relative">
          <div
            className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>

          <h3 className="text-white mb-2">{title}</h3>
          <p className="text-white/60">{description}</p>
        </div>
      </div>
    </motion.div>
  )
}

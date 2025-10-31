import { motion } from "motion/react"
import { Zap, Target, Rocket, Heart } from "lucide-react"
import { ValueCard } from "../ValueCard/ValueCard"

const values = [
  {
    icon: Zap,
    title: "Fast & Efficient",
    description: "Optimized code for lightning-fast performance",
    color: "from-yellow-500 to-orange-500",
  },
  {
    icon: Target,
    title: "Pixel Perfect",
    description: "Attention to every detail in design implementation",
    color: "from-blue-500 to-cyan-500",
  },
  {
    icon: Rocket,
    title: "Innovation",
    description: "Always exploring cutting-edge technologies",
    color: "from-purple-500 to-pink-500",
  },
  {
    icon: Heart,
    title: "Passion Driven",
    description: "Love what I do and it shows in the work",
    color: "from-red-500 to-pink-500",
  },
]

export const ValuesGrid = ({ scale }) => {
  return (
    <motion.div
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
      style={{ scale, willChange: "transform" }}
    >
      {values.map((value, index) => (
        <ValueCard key={value.title} {...value} index={index} />
      ))}
    </motion.div>
  )
}

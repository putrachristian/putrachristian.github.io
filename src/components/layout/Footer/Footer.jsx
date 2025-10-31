import { motion } from "motion/react"
import { Heart } from "lucide-react"
import { useApiContext } from "../../../context/ApiContext"

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const { profile } = useApiContext()

  return (
    <footer className="relative py-12 px-6 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between gap-6"
        >
          {/* Logo/Brand */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
              <span className="text-white">PC</span>
            </div>
            <div>
              <div className="text-white">{profile?.name}</div>
              <div className="text-white/60 text-sm">{profile?.title}</div>
            </div>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 text-white/60">
            <span>© {currentYear} Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
            </motion.div>
            <span>by {profile?.name}</span>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

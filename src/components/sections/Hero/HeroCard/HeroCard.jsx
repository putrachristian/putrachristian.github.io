import { motion } from "motion/react"
import { Code } from "lucide-react"
import { useApiContext } from "../../../../context/ApiContext"

export const HeroCard = () => {
  const { profile } = useApiContext()
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.6, duration: 0.8 }}
      className="relative hidden lg:block"
      style={{ willChange: "transform" }}
    >
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="relative"
        style={{ willChange: "transform" }}
      >
        {/* Main card */}
        <div className="relative backdrop-blur-2xl bg-gradient-to-br from-white/10 to-white/5 rounded-[3rem] p-8 border border-white/20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 to-purple-500/10" />

          <div className="relative space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <Code className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-white/60 text-sm">Currently at</div>
                <div className="text-white text-xl">Garena Indonesia</div>
              </div>
            </div>

            <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-white/60">Position</span>
                <span className="text-white">{profile?.title}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Experience</span>
                <span className="text-white">5+ Years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-white/60">Status</span>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-green-400">Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

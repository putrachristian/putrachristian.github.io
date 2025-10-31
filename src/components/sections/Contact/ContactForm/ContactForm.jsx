import { motion } from "motion/react"
import { useState } from "react"
import { Send } from "lucide-react"

export const ContactForm = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isHovered, setIsHovered] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formState)
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      style={{ willChange: "transform" }}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white/80 mb-2">Your Name</label>
          <input
            type="text"
            value={formState.name}
            onChange={(e) =>
              setFormState({ ...formState, name: e.target.value })
            }
            className="w-full px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-colors"
            placeholder="John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-white/80 mb-2">Your Email</label>
          <input
            type="email"
            value={formState.email}
            onChange={(e) =>
              setFormState({ ...formState, email: e.target.value })
            }
            className="w-full px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-colors"
            placeholder="john@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-white/80 mb-2">Your Message</label>
          <textarea
            value={formState.message}
            onChange={(e) =>
              setFormState({ ...formState, message: e.target.value })
            }
            rows={6}
            className="w-full px-6 py-4 backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl text-white placeholder-white/40 focus:outline-none focus:border-violet-500/50 transition-colors resize-none"
            placeholder="Tell me about your project..."
            required
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
          className="group relative w-full px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 rounded-2xl overflow-hidden"
        >
          <span className="relative z-10 flex items-center justify-center gap-2 text-white">
            Send Message
            <motion.div
              animate={{ x: isHovered ? 5 : 0 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Send className="w-5 h-5" />
            </motion.div>
          </span>

          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-violet-600 to-purple-600"
            initial={{ x: "-100%" }}
            animate={{ x: isHovered ? 0 : "-100%" }}
            transition={{ duration: 0.3 }}
          />
        </motion.button>
      </form>
    </motion.div>
  )
}

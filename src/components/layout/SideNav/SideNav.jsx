import { motion, AnimatePresence } from "motion/react"
import { useState, useEffect } from "react"
import { Home, User, Briefcase, Code, Mail, ChevronRight } from "lucide-react"

export const SideNav = () => {
  const [activeSection, setActiveSection] = useState("hero")
  const [isHovered, setIsHovered] = useState(false)
  const [showInitialHint, setShowInitialHint] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialHint(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  const navItems = [
    { id: "hero", icon: Home, label: "Home" },
    { id: "about", icon: User, label: "About" },
    { id: "projects", icon: Briefcase, label: "Projects" },
    { id: "skills", icon: Code, label: "Skills" },
    { id: "contact", icon: Mail, label: "Contact" },
  ]

  const scrollToSection = (id) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    element?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => document.getElementById(item.id))
      const scrollPosition = window.scrollY + window.innerHeight / 2

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i]
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(navItems[i].id)
          break
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div
      className="fixed left-0 top-1/2 -translate-y-1/2 z-50 hidden lg:block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Hover trigger area */}
      <div className="absolute left-0 top-0 w-16 h-full" />

      {/* Edge indicator - always visible when not hovered */}
      {!isHovered && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute left-0 top-1/2 -translate-y-1/2"
        >
          {/* Pulsing dots */}
          <div className="flex flex-col gap-3">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
                className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-violet-400 to-purple-400"
              />
            ))}
          </div>

          {/* Animated chevron */}
          <motion.div
            animate={{
              x: [0, 4, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2"
          >
            <ChevronRight className="w-4 h-4 text-violet-400" />
          </motion.div>
        </motion.div>
      )}

      {/* Initial hint tooltip */}
      <AnimatePresence>
        {showInitialHint && !isHovered && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ delay: 1 }}
            className="absolute left-12 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r from-violet-500 to-purple-500 rounded-xl shadow-lg shadow-violet-500/50"
          >
            <div className="flex items-center gap-2">
              <span className="text-white text-sm">Hover here to navigate</span>
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <ChevronRight className="w-4 h-4 text-white" />
              </motion.div>
            </div>
            {/* Arrow pointer */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-3 h-3 bg-violet-500 rotate-45" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.nav
        initial={{ x: -100, opacity: 0 }}
        animate={{
          x: isHovered ? 32 : -48,
          opacity: isHovered ? 1 : 0.3,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="relative"
      >
        <div className="flex flex-col gap-6">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                whileHover={{ scale: 1.2, x: 10 }}
                whileTap={{ scale: 0.9 }}
                className="group relative"
              >
                <div
                  className={`w-12 h-12 rounded-2xl backdrop-blur-xl flex items-center justify-center transition-all duration-300 ${
                    activeSection === item.id
                      ? "bg-gradient-to-br from-violet-500 to-purple-500 shadow-lg shadow-purple-500/50"
                      : "bg-white/5 border border-white/10"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors ${
                      activeSection === item.id ? "text-white" : "text-white/60"
                    }`}
                  />
                </div>

                {/* Tooltip - only show when hovered */}
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ delay: 0.1 }}
                    className="absolute left-16 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-white/10 backdrop-blur-xl rounded-lg border border-white/20 whitespace-nowrap pointer-events-none"
                  >
                    <span className="text-white">{item.label}</span>
                  </motion.div>
                )}

                {/* Active indicator */}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-violet-500 to-purple-500 rounded-full"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </div>
  )
}

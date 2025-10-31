import { motion } from "motion/react"
import { Mail, MapPin, Phone, MessageCircle, Linkedin } from "lucide-react"

const contactInfo = (profile) => {
  return [
    {
      icon: Mail,
      label: "Email",
      value: profile?.email,
      href: `mailto:${profile?.email}`,
    },
    {
      icon: Phone,
      label: "Phone",
      value: profile?.phone,
      href: `tel:${profile?.phone}`,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: profile?.linkedin,
      href: `https://www.linkedin.com/in/${profile?.linkedin}`,
    },
    {
      icon: MapPin,
      label: "Location",
      value: profile?.location,
      href: "#",
    },
  ]
}

export const ContactInfo = ({ profile }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="space-y-6"
      style={{ willChange: "transform" }}
    >
      {/* Contact details */}
      <div className="grid lg:grid-cols-2 gap-4">
        {contactInfo(profile).map((info, index) => {
          const Icon = info.icon
          return (
            <motion.a
              key={info.label}
              href={info.href}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ x: 10, scale: 1.02 }}
              className="flex items-center gap-4 p-6 backdrop-blur-xl bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-white/60 text-sm">{info.label}</div>
                <div className="text-white">{info.value}</div>
              </div>
            </motion.a>
          )
        })}
      </div>

      {/* CTA Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative backdrop-blur-xl bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-2xl p-6 border border-violet-500/20 overflow-hidden"
      >
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 4, repeat: Infinity }}
          className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-violet-500/30 to-purple-500/30 rounded-full blur-3xl"
        />

        <div className="relative">
          <h3 className="text-white mb-2">Open to Opportunities</h3>
          <p className="text-white/70 mb-4">
            I'm currently available for freelance projects and full-time or
            part-time positions. Let's create something amazing together!
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span className="text-green-400 text-sm">Available Now</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

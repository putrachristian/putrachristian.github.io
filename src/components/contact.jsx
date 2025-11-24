import React from "react";
import { motion } from "framer-motion";
import { useApiContext } from "@/context/ApiContext";
import { Mail, Linkedin, MapPin, Phone } from 'lucide-react';
import ChatBox from "@/components/chat-box";

const Contact = () => {
  const { profile, loading } = useApiContext();

  if (loading || !profile) {
    return (
      <section id="contact" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  const email = profile.email;
  const phone = profile.phone;
  const location = profile.location;
  const linkedinUrl = profile.linkedin || profile.socials?.find(s => s.name === "LinkedIn")?.url || "#";

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center mb-16">
            <p className="text-primary font-mono mb-4">05. What's Next?</p>
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">Get In Touch</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
              Although I'm not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Info */}
            <div className="grid gap-6">
              {email && (
                <a 
                  href={`mailto:${email}`}
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all group"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">Email</p>
                    <p className="text-sm font-medium text-foreground">{email}</p>
                  </div>
                </a>
              )}

              {linkedinUrl && linkedinUrl !== "#" && (
                <a 
                  href={linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 hover:bg-muted/50 transition-all group"
                >
                  <div className="p-3 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">LinkedIn</p>
                    <p className="text-sm font-medium text-foreground">Connect with me</p>
                  </div>
                </a>
              )}

              {phone && (
                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group">
                  <div className="p-3 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">Phone</p>
                    <p className="text-sm font-medium text-foreground">{phone}</p>
                  </div>
                </div>
              )}

              {location && (
                <div className="flex items-center gap-4 p-4 bg-card border border-border rounded-lg hover:border-primary/50 transition-all group">
                  <div className="p-3 bg-primary/10 text-primary rounded-full group-hover:scale-110 transition-transform">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-xs font-mono text-muted-foreground mb-1">Location</p>
                    <p className="text-sm font-medium text-foreground">{location}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Chat Box */}
            <div className="w-full" id="chat-assistant">
              <ChatBox />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;

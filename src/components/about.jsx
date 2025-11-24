import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/partials/section-heading";
import { useApiContext } from "@/context/ApiContext";
import profilephoto from "../assets/images/putra.jpeg"

const About = () => {
  const { profile, loading } = useApiContext();

  if (loading || !profile) {
    return (
      <section id="about" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  const aboutText = profile.about || profile.summary;
  const technologies = profile.technologies || [];

  if (!aboutText && technologies.length === 0 && !profilephoto) {
    return null;
  }

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <SectionHeading number="01">About Me</SectionHeading>
          
          <div className="grid md:grid-cols-[3fr_2fr] gap-12">
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              {aboutText && <p dangerouslySetInnerHTML={{ __html: aboutText }} />}
              
              {technologies.length > 0 && (
                <ul className="grid grid-cols-2 gap-2 mt-4 font-mono text-sm">
                  {technologies.map((tech) => (
                    <li key={tech} className="flex items-center gap-2">
                      <span className="text-primary">▹</span> {tech}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            
            {profilephoto && (
              <div className="relative group mx-auto md:mx-0 max-w-xs">
                <div className="absolute inset-0 border-2 border-primary rounded translate-x-4 translate-y-4 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
                <div className="relative rounded overflow-hidden bg-primary/10">
                  <img
                    src={profilephoto}
                    alt="Profile"
                    className="w-full h-auto object-cover grayscale hover:grayscale-0 transition-all duration-300 mix-blend-luminosity hover:mix-blend-normal opacity-90 hover:opacity-100"
                  />
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;

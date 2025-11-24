import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Download } from 'lucide-react';
import { useApiContext } from "@/context/ApiContext";
import resumeFile from '../assets/putra-christian-resume.pdf';

const Hero = () => {
  const { profile, loading } = useApiContext();

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  if (loading || !profile) {
    return (
      <section id="home" className="min-h-screen flex items-center justify-center pt-16">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-primary font-mono mb-5 ml-1"
          >
            Hi, my name is
          </motion.p>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-bold text-foreground mb-4 tracking-tight"
          >
            {profile.name}.
          </motion.h1>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-bold text-muted-foreground mb-8 tracking-tight"
          >
            I build accessible, pixel-perfect digital experiences for the web.
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-muted-foreground text-lg max-w-xl mb-12 leading-relaxed"
          >
            Frontend Developer with 5+ years of experience, specializing in interactive web apps and gamification. Focused on building responsive, user-centered products with React.js and modern web technologies.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a
              href="#projects"
              onClick={(e) => handleLinkClick(e, '#projects')}
              className="px-8 py-4 bg-transparent border border-primary text-primary rounded hover:bg-primary/10 transition-all flex items-center justify-center gap-2 group"
            >
              Check out my work
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href={resumeFile}
              download="putra-christian-resume.pdf"
              className="px-8 py-4 bg-muted text-foreground rounded hover:bg-muted/80 transition-all flex items-center justify-center gap-2"
            >
              Download CV
              <Download size={18} />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;

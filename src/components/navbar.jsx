import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from 'lucide-react';
import { useTheme } from "next-themes";
import { links } from "@/lib/data";
import resumeFile from '../assets/putra-christian-resume.pdf';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = (e, hash) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "h-16 bg-[hsl(var(--background))]/95 backdrop-blur-md border-b border-border/50 shadow-sm" 
          : "h-20 md:h-24 bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-full flex items-center justify-between">
        <a href="#home" className="text-primary font-mono text-xl font-bold tracking-tighter">
          &lt;PC /&gt;
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <ul className="flex gap-6">
            {links.map((link, index) => (
              <motion.li
                key={link.name}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <a
                  href={link.hash}
                  onClick={(e) => handleLinkClick(e, link.hash)}
                  className="text-sm font-mono text-muted-foreground hover:text-primary transition-colors"
                >
                  <span className="text-primary mr-1">0{index + 1}.</span>
                  {link.name}
                </a>
              </motion.li>
            ))}
          </ul>
          
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground hover:text-primary"
              aria-label="Toggle theme"
            >
              {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <a
              href={resumeFile}
              download="putra-christian-resume.pdf"
              className="px-4 py-2 text-sm font-mono text-primary border border-primary rounded hover:bg-primary/10 transition-colors"
            >
              Resume
            </a>
          </motion.div>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full hover:bg-muted transition-colors text-muted-foreground"
          >
            {mounted && theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-primary p-1"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X size={32} /> : <Menu size={32} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed inset-0 top-0 right-0 w-full h-screen bg-[hsl(var(--background))]/95 backdrop-blur-lg z-40 flex flex-col items-center justify-center md:hidden"
          >
            <ul className="flex flex-col items-center gap-8">
              {links.map((link, index) => (
                <li key={link.name}>
                  <a
                    href={link.hash}
                    onClick={(e) => handleLinkClick(e, link.hash)}
                    className="text-xl font-mono text-foreground hover:text-primary transition-colors flex flex-col items-center gap-2"
                  >
                    <span className="text-primary text-sm">0{index + 1}.</span>
                    {link.name}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href={resumeFile}
                  download="putra-christian-resume.pdf"
                  className="px-8 py-3 text-primary border border-primary rounded hover:bg-primary/10 transition-colors font-mono mt-4 inline-block"
                >
                  Resume
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

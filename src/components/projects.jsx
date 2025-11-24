import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHeading from "@/components/partials/section-heading";
import { useApiContext } from "@/context/ApiContext";
import { Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Projects = () => {
  const { projects, loading } = useApiContext();
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedProject]);

  if (loading || !projects || !Array.isArray(projects) || projects.length === 0) {
    return (
      <section id="projects" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  const displayProjects = projects.map(project => {
    // Handle flattened Strapi v5 structure where images is directly an array
    const images = project.images?.map(img => img.url) || [];
    
    // Fallback to single image if no images array or add single image to array if it exists
    const mainImage = images.length > 0 ? images[0] : (project.imageUrl || "/placeholder.svg");

    if (images.length === 0 && mainImage && mainImage !== "/placeholder.svg") {
      images.push(mainImage);
    }

    return {
      ...project,
      imageUrl: mainImage,
      images: images,
      tags: project.tags || project.technologies || [],
      link: project.link || project.liveUrl || "#",
      github: project.github || project.githubUrl || "#",
      details: project.details || project.description || "",
    };
  });

  const totalPages = Math.ceil(displayProjects.length / itemsPerPage);
  const currentProjects = displayProjects.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const modalMainImage = selectedProject?.images?.[0] || selectedProject?.imageUrl || "/placeholder.svg";

  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <SectionHeading number="03">Some Things I've Built</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.id || index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedProject(project)}
                className="group cursor-pointer bg-card border border-border rounded-lg overflow-hidden hover:border-primary/50 transition-all duration-300 flex flex-col"
              >
                {/* Project Image */}
                <div className="relative h-48 w-full overflow-hidden bg-muted">
                  <div className="absolute inset-0 bg-primary/10 group-hover:bg-transparent transition-colors z-10 duration-300"></div>
                  <img
                    src={project.imageUrl || "/placeholder.svg"}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-105"
                  />
                </div>

                {/* Project Content */}
                <div className="p-6 flex flex-col flex-1 bg-card/80 backdrop-blur-sm">
                  <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  
                  <p className="text-foreground/80 text-sm leading-relaxed flex-1 line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-12">
              <button
                onClick={() => handlePageChange(Math.max(currentPage - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Previous page"
              >
                <ChevronLeft size={20} />
              </button>
              
              <span className="text-sm font-mono text-muted-foreground">
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => handlePageChange(Math.min(currentPage + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                aria-label="Next page"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </motion.div>
      </div>

      {/* Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl modal-bg border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
            >
              <div className="relative w-full shrink-0 bg-black/90">
                {selectedProject.images && selectedProject.images.length > 1 ? (
                  <div className="relative h-64 sm:h-96 group/slider">
                    <Slider
                      dots={true}
                      infinite={true}
                      speed={500}
                      slidesToShow={1}
                      slidesToScroll={1}
                      arrows={false}
                      className="h-full"
                      customPaging={(i) => (
                        <div className="w-2 h-2 rounded-full bg-white/50 hover:bg-white transition-colors mt-4" />
                      )}
                      ref={(slider) => (window.sliderRef = slider)}
                    >
                      {selectedProject.images.map((img, idx) => (
                        <div key={idx} className="h-64 sm:h-96 outline-none">
                          <div className="w-full h-full flex items-center justify-center bg-black">
                            <img
                              src={img}
                              alt={`${selectedProject.title} - ${idx + 1}`}
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        </div>
                      ))}
                    </Slider>
                    
                    {/* Custom Navigation Arrows */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.sliderRef?.slickPrev();
                      }}
                      className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover/slider:opacity-100 z-10"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        window.sliderRef?.slickNext();
                      }}
                      className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all opacity-0 group-hover/slider:opacity-100 z-10"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </div>
                ) : (
                  <div className="h-64 sm:h-96 w-full flex items-center justify-center bg-black">
                    <img
                      src={modalMainImage}
                      alt={selectedProject.title}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
                
                <button
                  onClick={() => setSelectedProject(null)}
                  className="absolute top-4 right-4 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors z-20"
                >
                  <X size={20} />
                </button>
              </div>
              
              <div className="p-6 sm:p-8 overflow-y-auto modal-bg">
                <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="text-xs font-mono text-primary bg-primary/10 px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="space-y-4">
                  {selectedProject.details && (
                    <p className="text-sm border-l-2 border-primary pl-4 italic">
                      {selectedProject.details}
                    </p>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;

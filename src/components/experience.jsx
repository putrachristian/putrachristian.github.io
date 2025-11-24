import React, { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/partials/section-heading";
import { useApiContext } from "@/context/ApiContext";

const Experience = () => {
  const { workExperience, loading } = useApiContext();
  const [activeTab, setActiveTab] = useState(0);

  if (loading || !workExperience || !Array.isArray(workExperience) || workExperience.length === 0) {
    return (
      <section id="experience" className="py-24 md:py-32">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  const currentExperience = workExperience[activeTab] || workExperience[workExperience.length - 1];

  return (
    <section id="experience" className="py-24 md:py-32">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          <SectionHeading number="02">Where I've Worked</SectionHeading>

          <div className="flex flex-col md:flex-row gap-8 mt-12">
            {/* Tabs List */}
            <div className="flex md:flex-col overflow-x-auto md:overflow-visible border-b md:border-b-0 md:border-l border-muted min-w-max md:min-w-[140px]">
              {workExperience.reverse().map((job, index) => (
                <button
                  key={job.id || index}
                  onClick={() => setActiveTab(index)}
                  className={`px-4 py-3 text-left font-mono text-sm transition-all border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:-mb-0 md:-ml-[2px] ${
                    activeTab === index
                      ? "text-primary border-primary bg-primary/5"
                      : "text-muted-foreground border-transparent hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {job.company}
                </button>
              ))}
            </div>

            {/* Content */}
            <div className="min-h-[300px]">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold text-foreground">
                  {currentExperience.position}{" "}
                  <span className="text-primary">@ {currentExperience.company}</span>
                </h3>
                <p className="font-mono text-sm text-muted-foreground mt-1 mb-6">
                  {currentExperience.period}
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {currentExperience.description}
                </p>
                {currentExperience.responsibilities && Array.isArray(currentExperience.responsibilities) && (
                  <ul className="space-y-2">
                    {currentExperience.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                        <span className="text-primary mt-1.5">▹</span>
                        <span>{responsibility.point}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;

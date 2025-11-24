import React from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/partials/section-heading";
import { useApiContext } from "@/context/ApiContext";

const Skills = () => {
  const { skills, loading } = useApiContext();

  // Handle both array (collection) and object (single type) responses
  // Based on user input, we are looking for hardSkills.hardSkills array
  const hardSkillsData = skills?.hardSkills?.hardSkills || [];
  
  // If skills is an array (legacy/fallback), try to map it, otherwise use the extracted hardSkills
  const displaySkills = Array.isArray(hardSkillsData) && hardSkillsData.length > 0
    ? hardSkillsData.map(skill => ({ name: skill, category: "Hard Skill" }))
    : (Array.isArray(skills) ? skills.map(skill => ({
        name: skill.name || skill.title || skill,
        category: skill.category || "",
      })) : []);

  if (loading || (!displaySkills.length && !skills)) {
    return (
      <section id="skills" className="py-24 md:py-32 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-muted-foreground">Loading...</div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="skills" className="py-24 md:py-32 bg-muted/30">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <SectionHeading number="04">Skills & Technologies</SectionHeading>
          
          <div className="mt-12">
            <div className="flex flex-wrap justify-center gap-3">
              {displaySkills.map((skill, index) => (
                <motion.span
                  key={skill.name || index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="px-4 py-2 bg-card text-muted-foreground rounded-md border border-border hover:text-primary hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-default text-sm md:text-base"
                >
                  {skill.name}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Skills;

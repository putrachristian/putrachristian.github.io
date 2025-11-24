import React from "react";

const SectionHeading = ({ children, className = "", number }) => {
  return (
    <h2 className={`flex items-center text-2xl md:text-3xl font-bold text-foreground mb-8 ${className}`}>
      {number && <span className="text-primary font-mono text-xl mr-2">{number}.</span>}
      {children}
      <span className="ml-4 h-px bg-muted w-32 md:w-64 hidden sm:block"></span>
    </h2>
  );
};

export default SectionHeading;


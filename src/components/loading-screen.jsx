import React from 'react';
import { motion } from 'framer-motion';

const LoadingScreen = ({ progress = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0,
        scale: 1.5,
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-background"
    >
      <div className="flex flex-col items-center gap-4">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2,
            ease: "easeInOut",
            times: [0, 0.5, 1],
            repeat: Infinity,
          }}
          className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
        />
        <div className="flex flex-col items-center gap-2">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-lg font-medium text-muted-foreground"
          >
            Loading...
          </motion.p>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm font-mono text-primary"
          >
            {progress}%
          </motion.p>
        </div>
        
        {/* Optional Progress Bar */}
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden mt-2">
          <motion.div 
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default LoadingScreen;

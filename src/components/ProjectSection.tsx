import React, { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { useInView } from 'react-intersection-observer';
import ProjectShowcase from './ProjectShowcase';

// Move projects data outside component to prevent recreation
const categories = ['all', 'react', 'angular', 'frontend'];

const ProjectsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  // Memoize the background pattern to prevent re-renders
  const BackgroundPattern = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      <div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />
    </div>
  ), []);

  // Memoize category change handler
  const handleCategoryChange = useCallback((category: string) => {
    setSelectedCategory(category);
  }, []);

  return (
    <section 
      ref={ref}
      className="relative py-16 bg-gradient-to-b from-black to-gray-900"
    >
      {BackgroundPattern}

      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header - Only animate when in view */}
        {inView && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-4xl font-bold font-mono flex items-center">
              <span className="text-emerald-400 mr-2">&gt;</span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">
                projects
              </span>
            </h2>
          </motion.div>
        )}

        {/* Category Filter - Use CSS transitions instead of Framer Motion for better performance */}
        <div className="mb-8 flex flex-wrap gap-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`
                px-4 py-2 rounded-full text-sm font-medium
                transition-all duration-300 ease-out
                ${selectedCategory === category
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50'
                }
              `}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Projects Grid - Use CSS Grid for better performance */}
        <div className="relative">
          {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10"> */}
            <ProjectShowcase selectedCategory={selectedCategory} />
          {/* </div> */}
        </div>

        {/* Navigation - Simple CSS transitions */}
        {/* <div className="flex justify-center mt-8 space-x-4">
          {['prev', 'next'].map((direction) => (
            <button
              key={direction}
              className="p-2 rounded-full bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 transition-colors duration-200"
            >
              {direction === 'prev' ? <ChevronLeft size={24} /> : <ChevronRight size={24} />}
            </button>
          ))}
        </div> */}
      </div>
    </section>
  );
};

export default ProjectsSection;
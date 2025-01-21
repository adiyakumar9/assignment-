import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { useScroll, motion } from 'framer-motion';
import Navigation from './components/Navigation';
import SocialLinks from './components/SocialLinks';

// Lazy load components
const HelloSection = lazy(() => import('./components/HelloSection'));
const AboutMe = lazy(() => import('./components/About'));
const ProjectsSection = lazy(() => import('./components/ProjectSection'));
const SkillsSection = lazy(() => import('./components/SkillSection'));
const ExperienceSection = lazy(() => import('./components/ExperienceSection'));
const EducationSection = lazy(() => import('./components/EducationSection'));
const ContactSection = lazy(() => import('./components/ContactSection'));

// Loading component
const LoadingSpinner: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="flex flex-col items-center gap-4">
      <div className="w-12 h-12 border-4 border-emerald-400/20 border-t-emerald-400 rounded-full animate-spin" />
      <p className="text-emerald-400 text-sm">Loading...</p>
    </div>
  </div>
);

// Section interface
interface Section {
  id: string;
  Component: React.ComponentType;
  className?: string;
}

const App: React.FC = () => {
  const typingRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll();

  // Typing animation effect
  useEffect(() => {
    const text = "Front-end developer";
    let index = 0;
    const element = typingRef.current;

    const typeText = () => {
      if (element && index < text.length) {
        element.textContent += text.charAt(index);
        index++;
        setTimeout(typeText, 100);
      }
    };

    typeText();

    return () => {
      if (element) {
        element.textContent = '';
      }
    };
  }, []);

  // Sections configuration
  const sections: Section[] = [
    { id: 'hello', Component: HelloSection },
    { 
      id: 'about-me', 
      Component: AboutMe,
      className: "py-24 min-h-screen flex items-center bg-gradient-to-b from-gray-900 to-black" 
    },
    { id: 'projects', Component: ProjectsSection },
    { id: 'skills', Component: SkillsSection },
    { id: 'experience', Component: ExperienceSection },
    { id: 'education', Component: EducationSection },
    { id: 'contact-me', Component: ContactSection },
  ];

  return (
<div className="bg-black min-h-screen relative"> {/* Added relative */}
  <Navigation />
  <main className="relative z-10">
      <SocialLinks />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-emerald-400/20 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />

      {/* Main Content */}
      <main className="relative z-10">
        {sections.map(({ id, Component, className }) => (
          <section
            key={id}
            id={id}
            className={className}
          >
            <Suspense fallback={<LoadingSpinner />}>
              <Component />
            </Suspense>
          </section>
        ))}
      </main>

      {/* Background Pattern */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)] opacity-20" />
      </div>

      {/* Signature */}
      {/* <motion.div 
        className="fixed bottom-8 right-8 text-gray-300 font-mono z-50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}

      >
        @aditya-kumar
      </motion.div> */}
      </main>
    </div>
  );
};

export default App;
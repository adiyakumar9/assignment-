import React, { useMemo, useCallback } from 'react';
// import { motion, usePresence, useReducedMotion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaAngular, FaJs, FaHtml5, FaCss3, FaGit } from 'react-icons/fa';
import { SiTypescript, SiNextdotjs, SiRedux, SiWebpack, SiFigma, SiPostman, SiMongodb, SiFirebase, SiMysql } from 'react-icons/si';

interface Skill {
  name: string;
  icon: JSX.Element;
}

interface SkillsData {
  [key: string]: Skill[];
}

// Move data outside component
const skillsData: SkillsData = {
  languages: [
    { name: 'JavaScript', icon: <FaJs /> },
    { name: 'TypeScript', icon: <SiTypescript /> },
    { name: 'HTML', icon: <FaHtml5 /> },
    { name: 'CSS', icon: <FaCss3 /> },
  ],
  frameworks: [
    { name: 'React', icon: <FaReact /> },
    { name: 'Angular', icon: <FaAngular /> },
    { name: 'Next.js', icon: <SiNextdotjs /> },
    { name: 'Redux', icon: <SiRedux /> },
  ],
  tools: [
    { name: 'Git', icon: <FaGit /> },
    { name: 'Webpack', icon: <SiWebpack /> },
    { name: 'Figma', icon: <SiFigma /> },
    { name: 'Postman', icon: <SiPostman /> },
  ],
  databases: [
    { name: 'MongoDB', icon: <SiMongodb /> },
    { name: 'Firebase', icon: <SiFirebase /> },
    { name: 'MySQL', icon: <SiMysql /> },
  ],
};

// Optimized Skill Item with CSS transitions instead of Framer Motion animations
// Update this part in the SkillItem component
const SkillItem = React.memo(({ name, icon }: Skill) => {
    return (
      <div
        className="flex flex-col items-center justify-center w-24 h-24 p-4 rounded-lg 
                   bg-gray-800/30 text-white backdrop-blur-xs border border-gray-700/30 
                   hover:border-emerald-500/30 hover:bg-emerald-500/10 hover:text-emerald-400
                   transform hover:scale-102 active:scale-98
                   transition-all duration-300 ease-bounce-sm"
      >
        <div className="text-3xl mb-2 transition-transform">{icon}</div>
        <p className="text-xxs font-medium text-center">{name}</p>
      </div>
    );
  });

SkillItem.displayName = 'SkillItem';

// Optimized Skill Category with reduced animations
const SkillCategory = React.memo(({ category, skills }: { category: string; skills: Skill[] }) => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div
      ref={ref}
      className={`p-6 bg-gray-800/20 rounded-xl backdrop-blur-sm border border-gray-700/30 
                  hover:border-emerald-500/20 transition-all duration-300 relative overflow-hidden
                  transform ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-blue-500/5 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-500" />
      
      <h3 className="text-xl font-bold text-emerald-400 mb-4 font-mono capitalize relative z-10">
        {category}
      </h3>
      
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 relative z-10">
        {skills.map((skill) => (
          <SkillItem key={skill.name} {...skill} />
        ))}
      </div>
    </div>
  );
});

SkillCategory.displayName = 'SkillCategory';

const SkillsSection: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  // Memoize background elements
  const BackgroundElements = useMemo(() => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute -left-1/4 -top-1/4 w-1/2 h-1/2 rounded-full opacity-20"
           style={{
             background: 'radial-gradient(circle, rgba(16,185,129,0.1) 0%, rgba(59,130,246,0.05) 100%)',
             filter: 'blur(64px)',
           }}
      />
    </div>
  ), []);

  const skillCategories = useMemo(() => (
    Object.entries(skillsData).map(([category, skills]) => (
      <SkillCategory 
        key={category} 
        category={category} 
        skills={skills} 
      />
    ))
  ), []);

  return (
    <section
      ref={ref}
      id="skills"
      className="relative min-h-screen py-24 bg-gradient-to-b from-gray-900 to-black overflow-hidden"
    >
      {BackgroundElements}

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        <div
          className={`mb-12 text-center transform transition-all duration-500 ease-out
                     ${inView ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
        >
          <h2 className="text-4xl font-bold font-mono inline-flex items-center group">
            <span className="text-emerald-400 mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
              &gt;
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              My Skills Arsenal
            </span>
          </h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            A curated collection of technologies I work with to bring ideas to life
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {skillCategories}
        </div>
      </div>
    </section>
  );
};

export default React.memo(SkillsSection);
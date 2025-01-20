import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Terminal from './Terminal';

const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);

  const skills = [
    'React', 'Angular', 'Node.js', 'TypeScript', 'Blockchain'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 w-full py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold text-white mb-16 font-mono flex items-center group">
          <span className="text-emerald-400 mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
            &gt;
          </span>
          <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
            about-me
          </span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-16 items-start">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <div 
            className="bg-gray-900/50 p-8 rounded-xl backdrop-blur-sm border border-gray-800/50 hover:border-emerald-500/50 transition-all duration-300 min-h-[400px] flex flex-col justify-between"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                Full-stack developer specializing in web applications and blockchain solutions. 
                Building scalable systems with focus on performance and exceptional user experiences.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Evolved from intern to Software Developer at
                <span className="text-emerald-400 mx-1">ITH Technologies</span>
                (2022-2024). Now freelancing 
                <span className="text-emerald-400 ml-1">(2024-Present)</span>, 
                crafting innovative solutions for global clients.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Experienced in building social platforms, event systems, and blockchain applications. 
                Always exploring new technologies and embracing challenges.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-8">
              {skills.map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-gray-800/30 rounded-full text-emerald-400 text-sm border border-gray-700/50 hover:border-emerald-500/30 transition-colors duration-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative min-h-[400px]"
        >
          <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative h-full">
            <Terminal  />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutMe;
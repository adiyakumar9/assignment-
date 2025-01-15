import React, { useState } from 'react';

import { motion } from 'framer-motion';
import Terminal from './Terminal';


const AboutMe = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (

      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold text-white mb-12 font-mono flex items-center group">
            <span className="text-emerald-400 mr-2 opacity-70 group-hover:opacity-100 transition-opacity">
              &gt;
            </span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              about-me
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            <div 
              className="bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Passionate front-end developer with expertise in building modern web applications.
                Focused on creating intuitive user experiences and writing clean, maintainable code.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Currently working on innovative projects at 
                <span className="text-emerald-400 ml-1">
                  ITH Technologies
                </span>
                , where I contribute to building scalable solutions and implementing best practices 
                in web development.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              {['React', 'TypeScript', 'Next.js', 'Tailwind CSS'].map((skill) => (
                <span 
                  key={skill}
                  className="px-4 py-2 bg-gray-800/30 rounded-full text-emerald-400 text-sm border border-gray-700/50"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative">
              <Terminal />
            </div>
          </motion.div>
        </div>
      </div>
  );
};

export default AboutMe;
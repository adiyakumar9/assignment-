import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const HelloSection = () => {
  const [text, setText] = useState('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const phrases = [
    'Front-end Developer',
    'UI/UX Enthusiast',
    'React Specialist',
    'Problem Solver'
  ];

  useEffect(() => {
    let currentText = '';
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: NodeJS.Timeout;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        currentText = currentPhrase.substring(0, currentIndex - 1);
        currentIndex--;
      } else {
        currentText = currentPhrase.substring(0, currentIndex + 1);
        currentIndex++;
      }

      setText(currentText);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at the end
        isDeleting = true;
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        typeSpeed = 500; // Pause before starting new word
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 1000);

    return () => clearTimeout(timeoutId);
  }, [currentPhraseIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className="relative text-center px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <p className="text-gray-400 mb-6 font-mono text-lg">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              Hi all. I am
            </motion.span>
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400"
        >
          Aditya Kumar
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="flex items-center justify-center font-mono text-xl md:text-2xl text-emerald-400"
        >
          <span className="mr-2">&gt;</span>
          <span>{text}</span>
          <span className="w-[2px] h-6 bg-emerald-400 animate-pulse ml-1"></span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="mt-12"
        >
          <button 
            className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full text-white font-semibold 
                     hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300 
                     hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
          >
            View My Work
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default HelloSection;
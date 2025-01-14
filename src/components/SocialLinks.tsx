import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const SocialLinks = () => {
  return (
    <div className="fixed bottom-8 left-8 flex flex-col space-y-4">
      <a
        href="https://github.com/yourusername"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-[#00ff9f] transition-colors duration-200"
      >
        <Github size={20} />
      </a>
      <a
        href="https://linkedin.com/in/aditya-kumar-singh-6b544418b/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-gray-300 hover:text-[#00ff9f] transition-colors duration-200"
      >
        <Linkedin size={20} />
      </a>
      <a
        href="mailto:adityakumar950489@gmail.com"
        className="text-gray-300 hover:text-[#00ff9f] transition-colors duration-200"
      >
        <Mail size={20} />
      </a>
      <div className="h-24 w-px bg-gray-300"></div>
    </div>
  );
};

export default SocialLinks;
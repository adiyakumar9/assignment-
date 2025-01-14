import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hello');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id') || '';

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hello', label: 'hello' },
    { id: 'about-me', label: 'about-me' },
    { id: 'projects', label: 'projects' },
    { id: 'skills', label: 'skills' },
    { id: 'experience', label: 'experience' },
    { id: 'education', label: 'education' },
    { id: 'contact-me', label: 'contact-me' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-opacity-90 bg-[#0d253f] backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <span className="text-[#00ff9f] font-mono">&gt; ak</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex space-x-8">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`${
                    activeSection === item.id
                      ? 'text-[#00ff9f] border-b-2 border-[#00ff9f]'
                      : 'text-gray-300 hover:text-[#00ff9f]'
                  } px-1 py-2 text-sm font-mono transition-colors duration-200`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-[#00ff9f] focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col space-y-4 pb-4">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`${
                    activeSection === item.id
                      ? 'text-[#00ff9f]'
                      : 'text-gray-300 hover:text-[#00ff9f]'
                  } px-2 py-1 text-sm font-mono`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
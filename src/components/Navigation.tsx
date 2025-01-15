import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring } from 'framer-motion';
import { Terminal, Menu, X, Circle } from 'lucide-react';

interface NavItem {
  id: string;
  label: string;
}

const navItems: NavItem[] = [
  { id: 'hello', label: 'hello' },
  { id: 'about-me', label: 'about-me' },
  { id: 'projects', label: 'projects' },
  { id: 'skills', label: 'skills' },
  { id: 'experience', label: 'experience' },
  { id: 'education', label: 'education' },
  { id: 'contact-me', label: 'contact-me' },
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hello');
  const [isHovering, setIsHovering] = useState<string | null>(null);

  // Scroll progress for background effect
  const { scrollYProgress } = useScroll();
  const scrollProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Background gradient transform based on scroll
  const gradientRotation = useTransform(
    scrollProgress,
    [0, 1],
    ['0deg', '360deg']
  );

  // Throttled scroll handler
  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + 100;
    
    // Using requestAnimationFrame for smooth performance
    requestAnimationFrame(() => {
      for (const section of document.querySelectorAll('section')) {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id') || '';

        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveSection(id);
          return;
        }
      }
      setActiveSection('hello');
    });
  }, []);

  useEffect(() => {
    let rafId: number;
    let lastScrollTop = 0;
    const threshold = 50;

    const onScroll = () => {
      const scrollTop = window.scrollY;
      if (Math.abs(scrollTop - lastScrollTop) > threshold) {
        lastScrollTop = scrollTop;
        rafId = requestAnimationFrame(handleScroll);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, [handleScroll]);

  const DesktopNavItem: React.FC<{ item: NavItem }> = ({ item }) => {
    const isActive = activeSection === item.id;
    const isHovered = isHovering === item.id;

    return (
      <motion.a
        href={`#${item.id}`}
        className="relative px-4 py-2 group"
        onHoverStart={() => setIsHovering(item.id)}
        onHoverEnd={() => setIsHovering(null)}
        whileHover={{ y: -2 }}
        whileTap={{ y: 0 }}
      >
        {/* Background glow effect */}
        <AnimatePresence>
          {(isActive || isHovered) && (
            <motion.div
              className="absolute inset-0 bg-emerald-500/10 rounded-lg -z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
            />
          )}
        </AnimatePresence>

        {/* Text with glitch effect on hover */}
        <span className={`
          font-mono text-sm relative transition-colors duration-200
          ${isActive ? 'text-emerald-400' : 'text-gray-300 group-hover:text-emerald-400'}
        `}>
          {isActive && (
            <motion.span
              className="absolute -left-3 text-emerald-400"
              initial={{ opacity: 0, x: -5 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              &gt;
            </motion.span>
          )}
          {item.label}
        </span>

        {/* Active indicator line */}
        {isActive && (
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
            layoutId="activeIndicator"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </motion.a>
    );
  };

  return (
    <>
      {/* Main Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Dynamic background */}
        <motion.div
          className="absolute inset-0 backdrop-blur-sm"
          style={{
            background: `linear-gradient(${gradientRotation}, rgba(17, 24, 39, 0.8), rgba(17, 24, 39, 0.9))`,
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.a
              href="#hello"
              className="flex items-center gap-2 text-emerald-400 font-mono"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Terminal className="w-5 h-5" />
              <span className="font-bold">ak</span>
            </motion.a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navItems.map((item) => (
                <DesktopNavItem key={item.id} item={item} />
              ))}
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden relative p-2"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "open"}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.2 }}
                  className="text-emerald-400"
                >
                  {isOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(8px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 z-40 bg-gray-900/80"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-64 bg-gray-900/95 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="pt-20 px-4 space-y-1">
                {navItems.map((item) => (
                  <motion.a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`
                      block px-4 py-3 rounded-lg font-mono text-sm transition-colors
                      ${activeSection === item.id 
                        ? 'text-emerald-400 bg-emerald-500/10' 
                        : 'text-gray-300 hover:text-emerald-400 hover:bg-emerald-500/5'
                      }
                    `}
                    onClick={() => setIsOpen(false)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {activeSection === item.id && (
                      <motion.span
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="absolute -left-2"
                      >
                        <Circle className="w-2 h-2 fill-emerald-400" />
                      </motion.span>
                    )}
                    {item.label}
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default React.memo(Navigation);
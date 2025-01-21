import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Github, Linkedin, Mail, ExternalLink, Sparkles } from 'lucide-react';

interface SocialLink {
  icon: JSX.Element;
  href: string;
  label: string;
  color: string;
  particle: string;
}

const socialLinks: SocialLink[] = [
  {
    icon: <Github className="w-5 h-5" />,
    href: "https://github.com/adiyakumar9",
    label: "GitHub",
    color: "#6e5494",
    particle: "⌨️"
  },
  {
    icon: <Linkedin className="w-5 h-5" />,
    href: "https://linkedin.com/in/aditya-kumar-singh-6b544418b/",
    label: "LinkedIn",
    color: "#0077b5",
    particle: "💼"
  },
  {
    icon: <Mail className="w-5 h-5" />,
    href: "mailto:adityakumar950489@gmail.com",
    label: "Email",
    color: "#ea4335",
    particle: "✉️"
  }
];

const ParticleEffect: React.FC<{ isActive: boolean; emoji: string }> = ({ isActive, emoji }) => {
  return (
    <AnimatePresence>
      {isActive && (
        <>
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute pointer-events-none"
              initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
              animate={{
                scale: [1, 0],
                x: [-20 * (i + 1), -40 * (i + 1)],
                y: [0, -20 * (i + 1)],
                opacity: [1, 0]
              }}
              transition={{
                duration: 0.8,
                delay: i * 0.1,
                ease: "easeOut"
              }}
            >
              {emoji}
            </motion.div>
          ))}
        </>
      )}
    </AnimatePresence>
  );
};

const SocialLinkItem: React.FC<{ link: SocialLink; index: number }> = ({ link, index }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <motion.a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center group"
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Icon Container - Removed rotation effects */}
        <motion.div
          className="relative p-3 rounded-full backdrop-blur-sm border border-gray-700/50"
          animate={{
            backgroundColor: isHovered ? `${link.color}33` : "transparent",
            borderColor: isHovered ? link.color : "rgba(255,255,255,0.1)",
          }}
        >
          <motion.div
            animate={{ color: isHovered ? link.color : "#94a3b8" }}
            transition={{ duration: 0.3 }}
          >
            {link.icon}
          </motion.div>
        </motion.div>

        {/* Label */}
        <motion.span
          className="absolute left-full ml-4 text-sm whitespace-nowrap opacity-0 group-hover:opacity-100"
          initial={{ x: -10 }}
          animate={{ x: isHovered ? 0 : -10 }}
          style={{ color: isHovered ? link.color : "#94a3b8" }}
        >
          {link.label}
        </motion.span>
      </motion.a>
    </motion.div>
  );
};
const SocialLinks: React.FC = () => {
  return (
    <div className="fixed bottom-8 left-8 z-50">
      {/* Links Container */}
      <div className="flex flex-col space-y-4">
        {socialLinks.map((link, index) => (
          <SocialLinkItem key={index} link={link} index={index} />
        ))}
        
        {/* Animated Line */}
        <motion.div
          className="h-24 w-px mx-auto overflow-hidden"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <motion.div
            className="h-full w-full bg-gradient-to-b from-emerald-500 via-emerald-500/50 to-transparent"
            animate={{
              y: ["0%", "100%"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </motion.div>
      </div>

      {/* Background Glow */}
      <motion.div
        className="absolute inset-0 -z-10"
        animate={{
          background: [
            "radial-gradient(circle at center, rgba(0,255,159,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at center, rgba(0,255,159,0.05) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      />
    </div>
  );
};

export default React.memo(SocialLinks);
import React, { useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Terminal, Code, GitBranch, Radio, Boxes } from 'lucide-react';

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  type: 'full-time' | 'internship';
  icon: JSX.Element;
  color: string;
  description: string;
  technologies: string[];
  highlights: string[];
}

const experiences: Experience[] = [
  {
    id: 'sde',
    title: "Software Developer",
    company: "ITH Technologies Pvt. Ltd.",
    period: "Feb 2022 – Present",
    type: 'full-time',
    icon: <Terminal className="w-6 h-6" />,
    color: "#10B981",
    description: "Leading development across multiple cutting-edge projects including T-Pro, a comprehensive project management system where I implemented secure routing authentication and real-time analytics dashboards. Architected Social Collider, a task-based social media platform integrating multiple APIs (Twitter, Telegram, YouTube) with a reward system for user engagement. Spearheaded the development of TDX Launchpad, a pioneering cross-chain superdApp that enables seamless transactions between blockchain ecosystems. Also developed the Event Management System (EMS) with multiple user roles and comprehensive features for sponsors, exhibitors, speakers, and attendees. Consistently focused on performance optimization and user experience, implementing responsive designs and reducing load times through efficient code architecture.",
    technologies: ['Angular', 'React', 'Node.js', 'MongoDB', 'Redis', 'TypeScript'],
    highlights: [
      "Architected T-Pro's frontend with React Query and Formik, implementing secure routing and real-time analytics visualization",
      "Developed TDX Launchpad's cross-chain protocol (CCP) enabling seamless multi-chain transactions and token management",
      "Built Social Collider platform integrating Twitter, Telegram, and YouTube APIs with reward system implementation"
    ]
  },
  {
    id: 'trainee',
    title: "Software Engineer Trainee",
    company: "ITH Technologies Pvt. Ltd.",
    period: "Feb 2022 – Aug 2022",
    type: 'internship',
    icon: <Code className="w-6 h-6" />,
    color: "#3B82F6",
    description: "Took ownership of the Oshodhara project, an event booking platform focused on Osho teachings, where I led the development of the admin panel and booking system from scratch. Implemented comprehensive event management features including complex booking systems for various program types, room reservations, and sadhak modules. Designed and developed the user interface using HTML, CSS, and JavaScript, while creating reusable components with AngularJS. Integrated secure authentication and role-based access control, along with RESTful APIs for seamless data flow. Also contributed to BizThon 2.0, implementing routing authentication and role-based functionality for admin, user, and judge panels, showcasing ability to handle multiple user interfaces and complex system interactions.",
    technologies: ['AngularJS', 'JavaScript', 'RESTful APIs', 'HTML/CSS'],
    highlights: [
      "Developed complete admin panel with booking management system for programs and events",
      "Implemented complex booking features for programs, sadhak modules, and room reservations",
      "Created dynamic forms and lists for event management, increasing admin efficiency by 35%"
    ]
  }
];

const ExperienceCard: React.FC<{ 
  experience: Experience;
  isActive: boolean;
  onClick: () => void;
  index: number;
}> = ({ experience, isActive, onClick, index }) => {
  const cardVariants = {
    hidden: { 
      opacity: 0,
      y: 10,
    },
    visible: { 
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    }
  };

  const expandedContentVariants = {
    hidden: { 
      opacity: 0,
      height: 0
    },
    visible: { 
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      className={`
        relative rounded-xl transition-all duration-500 ease-out
        ${isActive ? 'col-span-2 row-span-2' : 'col-span-1'}
      `}
    >
      <div
        className={`
          h-full p-6 rounded-xl border backdrop-blur-sm transition-all duration-500 cursor-pointer
          ${isActive 
            ? 'bg-gray-900/40 border-emerald-500/30 shadow-lg' 
            : 'bg-gray-900/20 border-gray-800/30 hover:border-emerald-500/20 hover:bg-gray-900/30'}
        `}
        onClick={onClick}
      >
        {/* Timeline Node */}
        <div
          className={`
            absolute -left-3 w-6 h-6 rounded-full flex items-center justify-center
            transition-colors duration-300
            ${isActive ? 'bg-emerald-500' : 'bg-gray-800'}
            border-4 ${isActive ? 'border-emerald-500/20' : 'border-gray-900'}
          `}
        >
          <div className="w-2 h-2 rounded-full bg-white" />
        </div>

        {/* Content */}
        <div className="ml-4">
          {/* Header - Always visible */}
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-3">
                <span className={`
                  p-2 rounded-lg transition-colors duration-300
                  ${experience.type === 'full-time' ? 'bg-emerald-500/20' : 'bg-blue-500/20'}
                `}>
                  {experience.icon}
                </span>
                {experience.title}
              </h3>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-emerald-400">{experience.company}</span>
                <span className="text-gray-500">•</span>
                <span className="text-gray-400">{experience.period}</span>
              </div>
            </div>

            <motion.div
              animate={{ rotate: isActive ? 90 : 0 }}
              transition={{ duration: 0.3 }}
              className="text-emerald-400"
            >
              →
            </motion.div>
          </div>

          {/* Technologies */}
          <div className="flex flex-wrap gap-2 mt-4">
            {experience.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs rounded-full bg-emerald-500/5 text-emerald-400 
                         border border-emerald-500/20 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Expanded Content */}
          <AnimatePresence>
            {isActive && (
              <motion.div
                variants={expandedContentVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="mt-6 overflow-hidden"
              >
                <p className="text-gray-300 mb-4">{experience.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {experience.highlights.map((highlight, index) => (
                    <div
                      key={highlight}
                      className="p-4 rounded-lg bg-gray-800/30 border border-gray-700/50
                               hover:border-emerald-500/20 transition-all duration-300"
                    >
                      <div className="text-emerald-400 mb-2">
                        {index === 0 && <GitBranch className="w-4 h-4" />}
                        {index === 1 && <Radio className="w-4 h-4" />}
                        {index === 2 && <Boxes className="w-4 h-4" />}
                      </div>
                      <p className="text-sm text-gray-300">{highlight}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>(experiences[0].id);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.5, 1, 1, 0.5]),
    springConfig
  );

  

  return (
    <section 
      ref={containerRef}
      className="min-h-screen py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/[0.03] to-transparent" />
      </div>

      <motion.div
        className="max-w-6xl mx-auto px-4"
        style={{ opacity }}
      >
        {/* Section Header */}
        <div className="mb-16 relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute -left-4 top-1/2 h-px bg-gradient-to-r from-emerald-500/50 to-transparent"
          />
          <h2 className="text-4xl font-mono font-bold relative inline-flex items-center">
            <span className="text-emerald-400 mr-2">{">"}</span>
            <span className="bg-gradient-to-r from-emerald-400 to-blue-500 bg-clip-text text-transparent">
              experience
            </span>
          </h2>
        </div>

        {/* Experience Timeline */}
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-emerald-500/20 to-transparent" />

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pl-8">
            {experiences.map((exp, index) => (
              <ExperienceCard
                key={exp.id}
                experience={exp}
                isActive={activeId === exp.id}
                onClick={() => setActiveId(exp.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default React.memo(ExperienceSection);
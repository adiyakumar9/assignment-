import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

type CommandFunction = (...args: string[]) => string | Promise<string>;

interface Commands {
  [key: string]: CommandFunction;
}

interface TerminalProps {
  initialMessage?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ 
  initialMessage = [
    'Welcome to Aditya Kumar\'s Interactive Terminal!', 
    'Type "help" for a list of commands.',
    'Software Development Engineer with expertise in Angular and React.'
  ]
}) => {
  const [command, setCommand] = useState<string>('');
  const [output, setOutput] = useState<string[]>(initialMessage);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const fetchProjects = async (): Promise<string> => {
    setIsLoading(true);
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`
            Projects:
            
            1. T-Pro Project (Lead Frontend Developer)
               • Led frontend development of comprehensive team/project management system
               • Implemented secure routing authentication for admin panel
               • Integrated React Query and Formik with Yup validation
               • Built real-time analytics visualization
               • Tech Stack: React, React Query, Formik
            
            2. Social Collider (Frontend Developer)
               • Developed task-based social media platform for cross-platform engagement
               • Created wireframes and mockups for platform UI
               • Integrated APIs for Twitter, Telegram, and YouTube
               • Implemented reward system increasing retention by 25%
               • Tech Stack: HTML, CSS, JavaScript, Angular, APIs

            3. TDX Launchpad (Frontend Developer)
               • Built cross-chain superdApp for blockchain ecosystems
               • Developed user interface components using Angular
               • Integrated complex blockchain APIs for seamless transactions
               • Optimized frontend achieving 50% load time reduction
               • Tech Stack: Angular, RESTful APIs, Blockchain Integration

            4. Event Management System (Frontend Developer)
               • Created event management platform with multiple user roles
               • Built modular AngularJS components for different user types
               • Integrated RESTful APIs for data flow
               • Improved mobile UX by 60%
               • Tech Stack: HTML, CSS, JavaScript, AngularJS, RESTful APIs

            5. Oshodhara (Frontend Developer)
               • Developed admin panel for event booking platform
               • Implemented complex booking systems for various programs
               • Created dynamic forms for event management
               • Increased admin efficiency by 35%
               • Tech Stack: HTML, CSS, JavaScript, AngularJS, RESTful APIs
          `);
        }, 1500);
      });
    } finally {
      setIsLoading(false);
    }
  };

  const commands: Commands = {
    help: () => `
      Available commands:

      - about:       Learn about my professional background
      - experience:  View my work experience
      - skills:      List my technical skills
      - projects:    View my notable projects
      - education:   See my educational background
      - contact:     Get my contact information
      - clear:       Clear the terminal output
      - certifications: View my technical certifications
    `,
    about: () => `
      Detail-oriented and organized Software Development Engineer with expertise in:
      • Frontend development using Angular and React
      • Building responsive and user-friendly web applications
      • API integration and performance optimization
      • Leading technical implementations and team collaborations
    `,
    experience: () => `
      Work Experience:

      Software Developer | ITH Technologies Pvt Ltd
      Feb 2022 - Present | Kanpur
      • Worked on T-Pro Project - Task Management System
      • Led integration in Angular for Refer and Earn module and Purchase Token module of TDX launchpad
      • Integration in Bizthon for Authorization and Judge/Admin Module
      • Integration in Osodhara to Complete Admin module and Booking desk
      • Worked on two crypto projects using Node.js, MongoDB, Redis, Angular, Python
      • Written REST APIs using Node.js, MongoDB for the complete Refer and earn module
      • Integration in Social-Collider for Project/Campaign Module and Authorization
      • Technologies: HTML, CSS, JavaScript, Angular, React, Node.js APIs
    `,
    skills: () => `
      Technical Skills:

      Languages: JavaScript, Python, TypeScript, HTML, CSS
      Frameworks & Libraries: Angular, React.js, Node.js, Express.js
      Databases: MongoDB, Redis
      Developer Tools: Git, VS Code, RESTful APIs, Webpack
      Backend: Node.js, Express.js, MongoDB, Mongoose
      Other: Web Scraping, Data Structures, Problem Solving, OOP
      Additional: Responsive Design, UI/UX Design, API Integration, Cross-browser Compatibility
    `,
    projects: async () => {
      return await fetchProjects();
    },
    education: () => `
      Education:

      B.Tech in Computer Science
      Amity University, Lucknow, Uttar Pradesh
      2018 - 2022

      Science Stream
      Rajkeswar Singh High School, Rohtash, Bihar
      2016 - 2017
    `,
    certifications: () => `
      Technical Certifications:

      • Python (Basic) - HackerRank
      • SQL (Basic) - HackerRank
      • Java (Basic) - HackerRank
      • Using Python to Access Web Data - University of Michigan (Coursera)
      • Angular - HackerRank (Valid from Nov '22)
    `,
    contact: () => `
      Contact Information:

      Phone: +91 9113400868
      Email: adityakumar950489@gmail.com
      LinkedIn: linkedin.com/in/aditya-kumar-singh-6b544418b
    `,
    clear: () => 'CLEAR'
  };

  const handleCommand = async (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && command.trim()) {
      const cmd = command.trim();
      const [baseCommand, ...args] = cmd.split(' ');
      const formattedBaseCommand = baseCommand.toLowerCase();

      setHistory((prev) => [...prev, command]);
      setHistoryIndex((prev) => prev + 1);

      let outputResult: string;
      try {
        if (formattedBaseCommand in commands) {
          const commandFunction = commands[formattedBaseCommand];
          const result = await commandFunction(...args);
          outputResult = result;
        } else {
          outputResult = `Command not found: ${formattedBaseCommand}. Type "help" for available commands.`;
        }

        if (outputResult === 'CLEAR') {
          setOutput([]);
        } else {
          setOutput((prev) => [
            ...prev,
            `> ${command}`,
            ...(outputResult ? outputResult.split('\n') : []),
          ]);
        }
      } catch (error) {
        console.error("Error executing command:", error);
        setOutput((prev) => [
          ...prev,
          `> ${command}`,
          "An error occurred while executing the command.",
        ]);
      }

      setCommand('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setCommand(history[newIndex]);
      } else {
        setHistoryIndex(history.length);
        setCommand('');
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCommand(e.target.value);
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [output]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div
      className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-sm"
      onClick={() => inputRef.current?.focus()}
    >
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="h-96 overflow-y-auto text-gray-300" ref={outputRef}>
        {output.map((line, i) => (
          <div 
            key={`${i}-${line}`} 
            className={line.startsWith('> ') ? 'text-[#00ff9f]' : ''}
          >
            {line}
          </div>
        ))}
        <div className="flex items-center text-[#00ff9f]">
          <span className="mr-2">$&nbsp;</span>
          <input
            type="text"
            value={command}
            onChange={handleChange}
            onKeyDown={handleCommand}
            className="bg-transparent outline-none flex-1"
            spellCheck="false"
            ref={inputRef}
            disabled={isLoading}
          />
          {isLoading && <span className="ml-2 animate-spin">⚙️</span>}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
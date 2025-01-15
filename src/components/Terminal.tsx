import React, { useState, useEffect, useRef, KeyboardEvent, ChangeEvent } from 'react';

// Define types for our commands and their return values
type CommandFunction = (...args: string[]) => string | Promise<string>;

interface Commands {
  [key: string]: CommandFunction;
}

interface TerminalProps {
  initialMessage?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ 
  initialMessage = ['Welcome to Aditya\'s Interactive Terminal!', 'Type "help" for a list of commands.']
}) => {
  const [command, setCommand] = useState<string>('');
  const [output, setOutput] = useState<string[]>(initialMessage);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Simulate fetching data from an external source
  const fetchProjects = async (): Promise<string> => {
    setIsLoading(true);
    try {
      return await new Promise((resolve) => {
        setTimeout(() => {
          resolve(`
            Projects:
            1. Project Chimera (React, Node.js, GraphQL, PostgreSQL): A cutting-edge web application revolutionizing... (more details soon!)
            2. Project Phoenix (Next.js, Tailwind CSS, Firebase): A blazing fast e-commerce platform with a focus on... (more details soon!)
            3. Quantum Leap (Angular, Spring Boot, MongoDB): A robust enterprise solution designed to... (more details soon!)
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

      - about:       Learn more about Aditya.
      - skills:      List Aditya's technical skills.
      - projects:    View a list of notable projects.
      - contact:     Get Aditya's contact information.
      - clear:       Clear the terminal output.
      - echo [text]: Repeat the given text.
      - history:     Show command history.
      - theme [dark/light]: Change the terminal's theme.
      - date:        Display the current date and time.
      - loading-test: Test the loading animation.
      - secret-agent: Enter the secret agent mode... 🤫
    `,
    about: () => 'Aditya is a passionate and driven front-end developer with a knack for building user-friendly and performant web applications. He is always eager to learn new technologies and tackle challenging problems.',
    skills: () => 'JavaScript, TypeScript, React, Next.js, Angular, Redux, Vue, HTML, CSS, SCSS, Tailwind CSS, Git, Jest, Cypress, Webpack, Node.js, GraphQL',
    projects: async () => {
      return await fetchProjects();
    },
    contact: () => `
      Email: adityakumar950489@gmail.com
      LinkedIn: linkedin.com/in/aditya-kumar-singh-6b544418b/
      GitHub: github.com/adityakumar950489
    `,
    clear: () => 'CLEAR',
    echo: (...args: string[]) => args.join(' '),
    history: () => {
      return history.length > 0 
        ? history.map((cmd, i) => `${i + 1}. ${cmd}`).join('\n') 
        : 'No commands in history yet.';
    },
    theme: (mode: string) => {
      return `Theme switching is a work in progress. Currently, only 'dark' mode is available.`;
    },
    date: () => new Date().toLocaleString(),
    'loading-test': async () => {
      setIsLoading(true);
      try {
        return await new Promise((resolve) => {
          setTimeout(() => {
            resolve('Loading test complete!');
          }, 2000);
        });
      } finally {
        setIsLoading(false);
      }
    },
    'secret-agent': () => `
      You have activated secret agent mode... but nothing seems to have changed. 
      Perhaps the changes are too subtle to detect. Keep exploring! 🕵️‍♂️
    `,
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
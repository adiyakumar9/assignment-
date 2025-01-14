import React, { useState, useEffect } from 'react';

const Terminal = () => {
  const [command, setCommand] = useState('');
  const [output, setOutput] = useState<string[]>(['Type "help" for available commands']);

  const commands = {
    help: 'Available commands: about, skills, contact, clear',
    about: 'Passionate front-end developer with expertise in building modern web applications.',
    skills: 'JavaScript, TypeScript, React, Angular, HTML, CSS, Git',
    contact: 'Email: adityakumar950489@gmail.com\nLinkedIn: linkedin.com/in/aditya-kumar-singh-6b544418b/',
    clear: 'CLEAR',
  };

  const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = command.toLowerCase().trim();
      
      if (cmd in commands) {
        if (cmd === 'clear') {
          setOutput([]);
        } else {
          setOutput([...output, `> ${command}`, commands[cmd as keyof typeof commands]]);
        }
      } else {
        setOutput([...output, `> ${command}`, 'Command not found. Type "help" for available commands']);
      }
      
      setCommand('');
    }
  };

  return (
    <div className="bg-[#1E1E1E] rounded-lg p-4 font-mono text-sm">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-3 h-3 rounded-full bg-red-500"></div>
        <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
        <div className="w-3 h-3 rounded-full bg-green-500"></div>
      </div>
      <div className="h-48 overflow-y-auto">
        {output.map((line, i) => (
          <div key={i} className="text-gray-300">
            {line}
          </div>
        ))}
        <div className="flex items-center text-[#00ff9f]">
          <span className="mr-2">$</span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            onKeyDown={handleCommand}
            className="bg-transparent outline-none flex-1"
            spellCheck="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
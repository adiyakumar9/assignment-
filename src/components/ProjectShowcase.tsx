// projectShowcase.tsx
import React, { useState } from 'react';
import ProjectCard from './ProjectCard';

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  dates: string;
  liveUrl?: string;
  codeSnippet?: string;
}

const projects: Project[] = [
  {
    id: 'social-collider',
    title: 'Social Collider',
    description:
      'A social media platform with real-time updates and interactive features.',
    technologies: ['Angular', 'TypeScript', 'RESTful APIs', 'Socket.io'],
    dates: 'Sep 2023 – Jan 2024',
    liveUrl: 'https://bizthon.com/',
    codeSnippet: `// Real-time message handling
socket.on('new-message', (data: Message) => {
  this.messages.push(data);
  this.notifyUser(data);
});`,
  },
  {
    id: 'tdx-launchpad',
    title: 'TDX Launchpad',
    description:
      'Trading platform with advanced charting and real-time market data.',
    technologies: ['React', 'Node.js', 'WebSocket', 'Chart.js'],
    dates: 'May 2023 – Aug 2023',
    liveUrl: 'https://example.com', 
    codeSnippet: `// WebSocket market data stream
ws.onmessage = (event) => {
  const data = JSON.parse(event.data);
  updateChart(data);
  calculateIndicators(data);
};`,
  },
];

const ProjectShowcase: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {projects.map((project) => (
        <ProjectCard
          key={project.id}
          title={project.title}
          description={project.description}
          technologies={project.technologies}
          dates={project.dates}
          liveUrl={project.liveUrl || ''}
        />
      ))}
    </div>
  );
};

export default ProjectShowcase;
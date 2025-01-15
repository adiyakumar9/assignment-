import React, { useState, useRef, useCallback, memo } from 'react';
import { ExternalLink, Play, X, Loader } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  dates: string;
  liveUrl?: string;
}

const ProjectCard = memo(({ title, description, technologies, dates, liveUrl }: ProjectCardProps) => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Memoize handlers
  const handleDemoClick = useCallback(() => {
    setIsDemoActive(true);
    setIsLoading(true);
    setShowError(false);
  }, []);

  const handleCloseDemo = useCallback(() => {
    setIsDemoActive(false);
    setIsLoading(false);
  }, []);

  const handleIframeLoad = useCallback(() => {
    setIsLoading(false);
    setShowError(false);
  }, []);

  const handleIframeError = useCallback(() => {
    setIsLoading(false);
    setShowError(true);
  }, []);

  // Use CSS transforms instead of Framer Motion for better performance
  return (
    <div className="group relative bg-gray-800/50 rounded-lg overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-emerald-500/50 transition-all duration-300 hover:-translate-y-1">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
            {title}
          </h3>
          <div className="flex space-x-4">
            {liveUrl && !isDemoActive && (
              <button
                onClick={handleDemoClick}
                className="flex items-center space-x-2 px-4 py-1.5 bg-gradient-to-r from-emerald-500 to-blue-500 text-white rounded-full transform transition-transform hover:scale-105 active:scale-95"
              >
                <Play size={16} />
                <span className="text-sm font-medium">Demo</span>
              </button>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-emerald-400 transition-colors"
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>

        <p className="text-sm text-emerald-400/70 mb-2">{dates}</p>
        <p className="text-gray-300 mb-4 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-2">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-gray-700/50 text-emerald-400 border border-emerald-500/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {isDemoActive && (
        <div className="relative h-96">
          {isLoading && (
            <div className="absolute inset-0 bg-gray-900/90 flex items-center justify-center z-20">
              <div className="flex flex-col items-center space-y-4">
                <Loader className="text-emerald-400 animate-spin" size={24} />
                <p className="text-emerald-400 text-sm">Loading preview...</p>
              </div>
            </div>
          )}

          <button
            onClick={handleCloseDemo}
            className="absolute top-4 right-4 p-2 bg-gray-800 rounded-lg text-emerald-400 hover:bg-gray-700 z-30 transition-colors"
          >
            <X size={16} />
          </button>

          <iframe
            ref={iframeRef}
            src={liveUrl}
            className="w-full h-full border-0"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            loading="lazy"
            title={`${title} Demo`}
            onLoad={handleIframeLoad}
            onError={handleIframeError}
          />
        </div>
      )}
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;
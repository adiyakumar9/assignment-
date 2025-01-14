// ProjectCard.tsx
import React, { useState, useRef, useEffect } from 'react';
import { ExternalLink, Play, X, Loader } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  technologies: string[];
  dates: string;
  liveUrl?: string;
  previewImage?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  technologies,
  dates,
  liveUrl,
  previewImage,
}) => {
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showError, setShowError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
      setShowError(false);
    }

    const handleError = () => {
      setIsLoading(false);
      setShowError(true);
    };

    if (isDemoActive && iframeRef.current) {
      iframeRef.current.addEventListener('load', handleLoad);
      iframeRef.current.addEventListener('error', handleError);
    }

    return () => {
      if (iframeRef.current) {
        iframeRef.current.removeEventListener('load', handleLoad);
        iframeRef.current.removeEventListener('error', handleError);
      }
    };
  }, [isDemoActive]);

  const handleDemoClick = () => {
    setIsDemoActive(true);
    setIsLoading(true);
    setShowError(false);
  };

  const handleCloseDemo = () => {
    setIsDemoActive(false);
    setIsLoading(false);
  };

  return (
    <div className="relative bg-[#1E1E1E] rounded-lg overflow-hidden transition-all duration-300 hover:scale-[1.03]">
      {/* Project Header */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-semibold text-[#00ff9f]">{title}</h3>
          <div className="flex space-x-4">
            {liveUrl && !isDemoActive && (
              <button
                onClick={handleDemoClick}
                className="flex items-center space-x-2 px-3 py-1 bg-[#00ff9f] text-[#1E1E1E] rounded-full hover:bg-[#00ff9f]/90 transition-colors"
              >
                <Play size={16} />
                <span className="text-sm font-medium">Try Demo</span>
              </button>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-[#00ff9f] transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <ExternalLink size={20} />
              </a>
            )}
          </div>
        </div>
        <p className="text-sm text-gray-400 mb-2">{dates}</p>
        <p className="text-gray-300 mb-4">{description}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {technologies.map((tech) => (
            <span
              key={tech}
              className="px-2 py-1 text-xs rounded-full bg-[#2A2A2A] text-gray-300"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Demo Area */}
      {isDemoActive && (
        <div className="relative h-96">
          {/* Loading Overlay */}
          {isLoading && (
            <div className="absolute inset-0 bg-[#1E1E1E] flex items-center justify-center z-20">
              <div className="flex flex-col items-center space-y-4">
                <Loader size={24} className="text-[#00ff9f] animate-spin" />
                <p className="text-[#00ff9f] text-sm">Loading preview...</p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="absolute inset-0 bg-[#1E1E1E] flex items-center justify-center z-20">
              <div className="flex flex-col items-center space-y-4 text-center px-4">
                <X size={24} className="text-red-500" />
                <p className="text-gray-300">Failed to load preview.</p>
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00ff9f] hover:underline text-sm"
                >
                  Open in new tab instead
                </a>
              </div>
            </div>
          )}

          {/* Demo Controls */}
          <div className="absolute top-4 right-4 flex space-x-2 z-30">
            <button
              onClick={handleCloseDemo}
              className="p-2 bg-[#2A2A2A] rounded-lg text-[#00ff9f] hover:bg-[#3A3A3A] transition-colors"
              title="Close Demo"
            >
              <X size={16} />
            </button>
          </div>

          {/* Demo iframe */}
          <div className="h-full w-full overflow-hidden">
            <iframe
              ref={iframeRef}
              src={isDemoActive ? liveUrl : ''}
              className={`w-full h-full border-0 transition-opacity duration-500 ${
                isLoading ? 'opacity-0' : 'opacity-100'
              }`}
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              loading="lazy"
              title={`${title} Demo`}
            />
          </div>
        </div>
      )}

      {/* Preview Image */}
      {!isDemoActive && previewImage && (
        <div
          className="relative w-full h-52 cursor-pointer overflow-hidden"
          onClick={handleDemoClick}
        >
          <img
            src={previewImage}
            alt={`${title} preview`}
            className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <button className="flex items-center space-x-2 px-4 py-2 bg-[#00ff9f] text-[#1E1E1E] rounded-full">
              <Play size={16} />
              <span className="font-medium">Try Demo</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;

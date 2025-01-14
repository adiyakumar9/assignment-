import React, { useState, useEffect, useRef } from 'react';
import { Mic, Send, X, Maximize2, Minimize2 } from 'lucide-react';

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
}

const AIAgent: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [isWaving, setIsWaving] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  const presetPrompts = [
    "Tell me about your projects",
    "What's your tech stack?",
    "How can I contact you?"
  ];

  useEffect(() => {
    // Wave animation every 10 seconds when minimized
    if (isMinimized) {
      const interval = setInterval(() => {
        setIsWaving(true);
        setTimeout(() => setIsWaving(false), 1000);
      }, 10000);
      return () => clearInterval(interval);
    }
  }, [isMinimized]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      type: 'user',
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsThinking(true);

    // Simulate a response
    setTimeout(() => {
      const botMessage: Message = {
        type: 'bot',
        content: "I'm an AI assistant that's still learning. Soon I'll be able to help you learn more about Aditya's work and experience!",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1000);
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  return (
    <div
      className={`fixed ${
        isMinimized ? 'bottom-4 right-4 sm:bottom-8 sm:right-8' : 'bottom-0 right-0 sm:bottom-8 sm:right-8'
      } z-50 transition-all duration-300 ${
        isMinimized ? 'w-16 h-16' : 'w-full sm:w-96 h-[90vh] sm:h-[32rem]'
      }`}
    >
      {/* AI Agent Icon/Button */}
      {isMinimized ? (
        <button
          onClick={() => {
            setIsMinimized(false);
            setIsWaving(false);
          }}
          className={`w-16 h-16 rounded-full bg-[#1E1E1E] border-2 border-[#00ff9f] flex items-center justify-center hover:scale-105 transition-transform ${
            isWaving ? 'animate-bounce' : ''
          }`}
        >
          <div className="relative w-12 h-12">
            {/* Animated Robot Face */}
            <div className="absolute inset-0">
              {/* Robot Head */}
              <div className="absolute inset-2 bg-[#2A2A2A] rounded-full border-2 border-[#00ff9f]">
                {/* Robot Eyes */}
                <div className="absolute top-3 left-2 w-2 h-2 bg-[#00ff9f] rounded-full animate-pulse" />
                <div className="absolute top-3 right-2 w-2 h-2 bg-[#00ff9f] rounded-full animate-pulse" />
                {/* Robot Mouth */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-1 bg-[#00ff9f] rounded" />
              </div>
              {/* Animated Ring */}
              <div className="absolute inset-0 border-2 border-[#00ff9f] rounded-full animate-spin-slow opacity-50" />
            </div>
          </div>
        </button>
      ) : (
        <div className="w-full h-full bg-[#1E1E1E] rounded-lg border-2 border-[#00ff9f] flex flex-col overflow-hidden">
          {/* Header */}
          <div className="p-4 bg-[#0d253f] border-b border-[#00ff9f] flex items-center justify-between">
            <h3 className="text-[#00ff9f] font-mono">AI Assistant</h3>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-gray-300 hover:text-[#00ff9f]"
              >
                {isExpanded ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-gray-300 hover:text-[#00ff9f]"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Chat Area */}
          <div
            ref={chatRef}
            className="flex-1 overflow-y-auto p-4 space-y-4"
          >
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-[#00ff9f] text-[#0d253f]'
                      : 'bg-[#2A2A2A] text-gray-300'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isThinking && (
              <div className="flex justify-start">
                <div className="bg-[#2A2A2A] p-3 rounded-lg">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-[#00ff9f] rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-[#00ff9f] rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-[#00ff9f] rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Preset Prompts */}
          <div className="p-4 border-t border-[#2A2A2A]">
            <div className="flex flex-wrap gap-2">
              {presetPrompts.map((prompt, index) => (
                <button
                  key={index}
                  onClick={() => handlePromptClick(prompt)}
                  className="px-3 py-1 text-sm bg-[#2A2A2A] text-gray-300 rounded-full hover:bg-[#3A3A3A] transition-colors"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#2A2A2A]">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 px-4 py-2 bg-[#2A2A2A] text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9f]"
              />
              <button
                onClick={() => {/* TODO: Implement voice input */}}
                className="p-2 text-gray-300 hover:text-[#00ff9f]"
              >
                <Mic size={20} />
              </button>
              <button
                onClick={handleSend}
                className="p-2 text-gray-300 hover:text-[#00ff9f]"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIAgent;
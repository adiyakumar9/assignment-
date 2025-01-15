import React, { useState, useEffect, useRef } from 'react';
import { Bot, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatMessage {
  type: 'user' | 'bot';
  content: string;
}

const presetPrompts = [
  "> What are your skills, Aditya?",
  "> Tell me about your projects.",
  "> How can I contact you?"
];

const HelloSection = () => {
  const [selectedPrompt, setSelectedPrompt] = useState(presetPrompts[0]);
  const [isEditing, setIsEditing] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);
  const [isThinking, setIsThinking] = useState(false);
  const [isIntroVisible, setIsIntroVisible] = useState(true);

  const handlePromptSubmit = async (prompt: string) => {
    if (prompt.trim() === '') return;
    
    setIsChatOpen(true);
    setIsIntroVisible(false);
    setIsThinking(true);
    
    setChatMessages(prev => [...prev, { type: 'user', content: prompt }]);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setChatMessages(prev => [
      ...prev,
      { type: 'bot', content: `Here's my response to: ${prompt}` }
    ]);
    
    setIsThinking(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white relative overflow-hidden">
      <AnimatePresence>
        {isIntroVisible && (
          <motion.div 
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Introduction
              presetPrompts={presetPrompts}
              selectedPrompt={selectedPrompt}
              isEditing={isEditing}
              onPromptSelect={setSelectedPrompt}
              onToggleEdit={() => setIsEditing(!isEditing)}
              onPromptSubmit={handlePromptSubmit}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isChatOpen && (
          <>
            <motion.div
              initial={{ opacity: 0, x: '-100%' }}
              animate={{ opacity: 1, x: 0 }}
              className="fixed left-6 top-6 flex items-center space-x-4"
            >
              <h1 className="text-2xl font-bold text-white">Aditya Kumar</h1>
              <RobotAvatar isThinking={isThinking} />
            </motion.div>

            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              className="fixed right-0 top-0 w-2/3 h-screen bg-gray-900/95 border-l border-[#00ff9f]/20"
            >
              <ChatInterface
                messages={chatMessages}
                isThinking={isThinking}
                onClose={() => {
                  setIsChatOpen(false);
                  setIsIntroVisible(true);
                  setChatMessages([]);
                }}
                onSendMessage={handlePromptSubmit}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

const Introduction: React.FC<{
  presetPrompts: string[];
  selectedPrompt: string;
  isEditing: boolean;
  onPromptSelect: (prompt: string) => void;
  onToggleEdit: () => void;
  onPromptSubmit: (prompt: string) => void;
}> = ({ presetPrompts, selectedPrompt, isEditing, onPromptSelect, onToggleEdit, onPromptSubmit }) => (
  <div className="text-center px-4">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-5xl md:text-7xl font-bold mb-8">
        <span className="text-gray-400">Hi all. I am</span>
        <br />
        <span className="text-[#00ff9f]">Aditya Kumar</span>
      </h1>

      <div className="flex flex-col items-center space-y-4 max-w-lg mx-auto">
        {!isEditing ? (
          presetPrompts.map((prompt, index) => (
            <motion.button
              key={prompt}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`w-full text-left font-mono p-4 rounded-lg transition-all duration-200
                ${selectedPrompt === prompt 
                  ? 'bg-[#00ff9f]/10 text-[#00ff9f]' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-[#00ff9f]'}`}
              onClick={() => {
                onPromptSelect(prompt);
                onPromptSubmit(prompt);
              }}
            >
              {prompt}
            </motion.button>
          ))
        ) : (
          <motion.input
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full bg-transparent text-[#00ff9f] font-mono p-4 rounded-lg border-2 border-[#00ff9f]/20 focus:border-[#00ff9f] focus:outline-none"
            placeholder="Type your question..."
            value={selectedPrompt}
            onChange={e => onPromptSelect(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && onPromptSubmit(selectedPrompt)}
            autoFocus
          />
        )}

        {!isEditing && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-gray-400 hover:text-[#00ff9f] font-mono"
            onClick={onToggleEdit}
          >
            or type your own question...
          </motion.button>
        )}
      </div>
    </motion.div>
  </div>
);

const RobotAvatar: React.FC<{ isThinking: boolean }> = ({ isThinking }) => (
  <div className="relative">
    <motion.div
      animate={isThinking ? {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0],
      } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
    >
      <Bot
        size={32}
        className={`text-[#00ff9f] ${isThinking ? 'animate-pulse' : ''}`}
      />
    </motion.div>
    {isThinking && (
      <motion.div
        className="absolute -top-1 -right-1 w-2 h-2 bg-[#00ff9f] rounded-full"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 1 }}
      />
    )}
  </div>
);

const ChatInterface: React.FC<{
  messages: ChatMessage[];
  isThinking: boolean;
  onClose: () => void;
  onSendMessage: (message: string) => void;
}> = ({ messages, isThinking, onClose, onSendMessage }) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-[#00ff9f]/20">
        <h2 className="text-lg font-mono text-[#00ff9f]">Chat Interface</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-[#00ff9f] transition-colors"
        >
          <X size={24} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-4 rounded-lg font-mono
                ${message.type === 'user' 
                  ? 'bg-[#00ff9f]/10 text-[#00ff9f]' 
                  : 'bg-white/5 text-gray-300'}`}
            >
              {message.content}
            </div>
          </motion.div>
        ))}
        {isThinking && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/5 p-4 rounded-lg text-[#00ff9f] font-mono animate-pulse">
              Thinking...
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-[#00ff9f]/20">
        <div className="flex space-x-2">
          <input
            type="text"
            value={newMessage}
            onChange={e => setNewMessage(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                onSendMessage(newMessage);
                setNewMessage('');
              }
            }}
            placeholder="Type a message..."
            className="flex-1 bg-gray-800 text-gray-300 p-3 rounded-lg border border-[#00ff9f]/20 focus:outline-none focus:border-[#00ff9f]"
          />
          <button
            onClick={() => {
              if (newMessage.trim()) {
                onSendMessage(newMessage);
                setNewMessage('');
              }
            }}
            className="p-3 bg-[#00ff9f]/10 text-[#00ff9f] rounded-lg hover:bg-[#00ff9f]/20 transition-colors"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default HelloSection;
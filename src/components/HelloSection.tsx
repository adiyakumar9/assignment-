import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Bot, Sparkles, Send, X, Pencil, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Types
interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface SubtitleConfig {
  text: string;
  color: string;
  icon: JSX.Element;
}

// Custom hook for typing animation
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    let i = 0;
    setIsTyping(true);

    const typing = setInterval(() => {
      if (i < text.length) {
        setDisplayText(prev => prev + text.charAt(i));
        i++;
      } else {
        setIsTyping(false);
        clearInterval(typing);
      }
    }, speed);

    return () => clearInterval(typing);
  }, [text, speed]);

  return { displayText, isTyping };
};

// Custom hook for cursor blink
const useCursorBlink = (blinkSpeed: number = 530) => {
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const blink = setInterval(() => {
      setShowCursor(prev => !prev);
    }, blinkSpeed);

    return () => clearInterval(blink);
  }, [blinkSpeed]);

  return showCursor;
};

const InteractivePortfolio: React.FC = () => {
  // State management
  const [subtitle, setSubtitle] = useState<SubtitleConfig>({
    text: 'Frontend Developer',
    color: '#00ff9f',
    icon: <Sparkles className="inline-block ml-2" size={20} />
  });
  const [isEditing, setIsEditing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const [isRobotActive, setIsRobotActive] = useState(false);

  // Refs
  const chatEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Animation states
  const showCursor = useCursorBlink();
  const welcomeMessage = "Hi! I'm an AI assistant. Ask me anything about Aditya's work!";
  const { displayText: typedWelcome, isTyping: isWelcomeTyping } = useTypewriter(welcomeMessage);

  // Scroll to bottom of chat
  const scrollToBottom = useCallback(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    if (messages.length) scrollToBottom();
  }, [messages, scrollToBottom]);

  // Simulate AI response
  const generateResponse = async (question: string): Promise<string> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    return `Thanks for asking about ${question}! Here's what I know about Aditya's experience...`;
  };

  // Handlers
  const handleSubtitleEdit = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubtitle(prev => ({ ...prev, text: e.target.value }));
  };

  const handleSubtitleSubmit = () => {
    setIsEditing(false);
    // Add fun icon based on content
    const hasCode = subtitle.text.toLowerCase().includes('developer');
    const hasDesign = subtitle.text.toLowerCase().includes('design');
    setSubtitle(prev => ({
      ...prev,
      icon: hasCode ? <Sparkles className="inline-block ml-2" size={20} /> :
            hasDesign ? <Pencil className="inline-block ml-2" size={20} /> :
            <Star className="inline-block ml-2" size={20} />
    }));
  };

  const handleMessageSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsThinking(true);
    setIsRobotActive(true);
    setIsChatOpen(true);

    try {
      const response = await generateResponse(inputText);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error generating response:', error);
    } finally {
      setIsThinking(false);
      setIsRobotActive(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-[#0d253f] to-[#01b074]">
      {/* Main content section */}
      <motion.div 
        className={`transition-all duration-500 ${isChatOpen ? 'w-1/2' : 'w-full'} p-8`}
        initial={{ width: '100%' }}
        animate={{ width: isChatOpen ? '50%' : '100%' }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      >
        <div className={`transition-transform duration-500 ${isChatOpen ? 'transform -translate-x-12' : ''}`}>
          <motion.p 
            className="text-gray-300 mb-4 font-mono"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Hi all. I am
          </motion.p>

          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Aditya Kumar
          </motion.h1>

          <div className="relative">
            {isEditing ? (
              <input
                ref={inputRef}
                type="text"
                value={subtitle.text}
                onChange={handleSubtitleEdit}
                onBlur={handleSubtitleSubmit}
                onKeyDown={e => e.key === 'Enter' && handleSubtitleSubmit()}
                className="bg-transparent text-[#00ff9f] font-mono text-xl border-b-2 border-[#00ff9f] focus:outline-none w-full"
                autoFocus
              />
            ) : (
              <motion.div 
                className="text-[#00ff9f] font-mono text-xl cursor-pointer flex items-center"
                onClick={() => setIsEditing(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="mr-2">&gt;</span>
                {subtitle.text}
                {subtitle.icon}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </motion.div>
            )}
          </div>

          {/* Robot Character */}
          <motion.div 
            className="mt-16 relative"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ 
              opacity: 1, 
              scale: isRobotActive ? 1.1 : 1,
              rotate: isThinking ? [0, -5, 5, -5, 0] : 0
            }}
            transition={{ 
              duration: 0.5, 
              delay: 0.4,
              rotate: { repeat: Infinity, duration: 2 }
            }}
          >
            <Bot 
              size={150} 
              className={`text-[#00ff9f] transition-all duration-300 ${
                isThinking ? 'animate-pulse' : ''
              }`}
            />
            
            {/* Robot's "thinking" particles */}
            <AnimatePresence>
              {isThinking && (
                <>
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute top-0 right-0 w-2 h-2 rounded-full bg-[#00ff9f]"
                      initial={{ opacity: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        y: -20,
                        x: i * 10
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2
                      }}
                    />
                  ))}
                </>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Question Input */}
          <motion.form 
            onSubmit={handleMessageSubmit}
            className="mt-8 max-w-md mx-auto relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask me anything..."
              className="w-full px-4 py-3 bg-[#1E1E1E] text-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00ff9f] pr-12"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-[#00ff9f] hover:text-white transition-colors"
            >
              <Send size={20} />
            </button>
          </motion.form>
        </div>
      </motion.div>

      {/* Chat Panel */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div 
            className="fixed right-0 top-0 h-full bg-[#1E1E1E] w-1/2 overflow-hidden"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="p-8 h-full flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-[#00ff9f] font-mono text-xl">Chat Assistant</h2>
                <button 
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-4 pb-4">
                {/* Welcome message */}
                <motion.div 
                  className="bg-[#2A2A2A] rounded-lg p-4 text-gray-300"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {typedWelcome}
                  {isWelcomeTyping && <span className="animate-pulse">|</span>}
                </motion.div>

                {/* Chat messages */}
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                  >
                    <div 
                      className={`max-w-[80%] rounded-lg p-4 ${
                        message.sender === 'user' 
                          ? 'bg-[#00ff9f] text-[#1E1E1E]' 
                          : 'bg-[#2A2A2A] text-gray-300'
                      }`}
                    >
                      {message.text}
                    </div>
                  </motion.div>
                ))}

                {/* Thinking indicator */}
                {isThinking && (
                  <motion.div 
                    className="flex space-x-2 p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-2 h-2 bg-[#00ff9f] rounded-full"
                        animate={{
                          y: ['0%', '-50%', '0%']
                        }}
                        transition={{
                          duration: 0.5,
                          repeat: Infinity,
                          delay: i * 0.1
                        }}
                      />
                    ))}
                  </motion.div>
                )}
                <div ref={chatEndRef} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InteractivePortfolio;
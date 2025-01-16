import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Loader } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'aditya';
  id: number;
  isTyping?: boolean;
}

interface ChatOverlayProps {
  isVisible: boolean;
  onClose: () => void;
  initialMessage?: string;
}

const ChatOverlay: React.FC<ChatOverlayProps> = ({ isVisible, onClose, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>(initialMessage || '');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isVisible) {
      inputRef.current?.focus();
      if (initialMessage) {
        handleSubmit(new Event('submit') as any);
      }
    }
  }, [isVisible]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const addTypingIndicator = () => {
    setMessages(prev => [...prev, {
      id: Date.now(),
      sender: 'aditya',
      text: 'typing...',
      isTyping: true
    }]);
  };

  const removeTypingIndicator = () => {
    setMessages(prev => prev.filter(msg => !msg.isTyping));
  };

  const simulateResponse = async (userMessage: string) => {
    addTypingIndicator();
    await new Promise(resolve => setTimeout(resolve, 1500));
    removeTypingIndicator();
    
    const responses = [
      `Thanks for reaching out! I'd love to chat about ${userMessage}`,
      "That's an interesting topic! Let me share my thoughts...",
      "Great question! I'm passionate about this area...",
    ];
    
    setMessages(prev => [...prev, {
      text: responses[Math.floor(Math.random() * responses.length)],
      sender: 'aditya',
      id: Date.now()
    }]);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      text: inputValue,
      sender: 'user',
      id: Date.now()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    
    await simulateResponse(inputValue);
  };

  const overlayVariants = {
    hidden: { x: '100%', opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30 
      }
    },
    exit: { 
      x: '100%', 
      opacity: 0,
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 30 
      }
    }
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 30
      }
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={overlayVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed right-0 top-16 bottom-0 w-1/2 bg-black/90 backdrop-blur-sm border-l border-emerald-500/20 shadow-2xl"
        >
          {/* Header */}
          <div className="absolute top-0 left-0 right-0 h-16 bg-black/50 backdrop-blur-sm border-b border-emerald-500/20 flex items-center justify-between px-6">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
              <span className="text-emerald-400 font-mono">Chat with Aditya</span>
            </div>
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <X size={20} />
            </motion.button>
          </div>

          <div className="h-full flex flex-col pt-16 pb-6">
            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-sm p-4 rounded-2xl ${
                      message.isTyping ? 'bg-gray-800 text-emerald-400' :
                      message.sender === 'user'
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                        : 'bg-emerald-500/10 text-white border border-emerald-500/20'
                    }`}
                  >
                    {message.isTyping ? (
                      <div className="flex items-center space-x-2">
                        <Loader size={16} className="animate-spin" />
                        <span>typing</span>
                      </div>
                    ) : message.text}
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="px-6">
              <form onSubmit={handleSubmit} className="relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white 
                           placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 
                           focus:ring-emerald-500/20 transition-all duration-300"
                />
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 border border-emerald-500/30
                           rounded-full text-emerald-400 hover:text-white hover:bg-emerald-500 
                           transition-all duration-300"
                >
                  <Send size={20} />
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ChatOverlay;
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'aditya';
  id: number;
  isTyping?: boolean;
  isClosing?: boolean;
}

interface ChatProps {
  onClose: () => void;
  initialMessage: string;
}

const Chat: React.FC<ChatProps> = ({ onClose, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Initial user message
    const userMessage: Message = {
      text: initialMessage,
      sender: 'user',
      id: Date.now(),
    };
    setMessages([userMessage]);
    
    // Simulate typing indicator
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'aditya',
          text: 'typing...',
          isTyping: true,
        },
      ]);

      // Simulate response after typing
      setTimeout(() => {
        setMessages((prev) =>
          prev.filter((msg) => !msg.isTyping).concat({
            text: `Thanks for reaching out! I'd love to chat about ${initialMessage}`,
            sender: 'aditya',
            id: Date.now(),
          })
        );
      }, 2000);
    }, 500);
  }, [initialMessage]);

  const handleClose = () => {
    setIsClosing(true);

    const messagesTimeout = setTimeout(() => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => ({
          ...msg,
          isClosing: true,
        }))
      );
    }, 100);

    const containerTimeout = setTimeout(() => {
      onClose();
      setIsClosing(false);
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const newMessage: Message = {
      text: inputValue,
      sender: 'user',
      id: Date.now(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    // Simulate a response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now(),
          sender: 'aditya',
          text: 'typing...',
          isTyping: true,
        },
      ]);

      setTimeout(() => {
        setMessages((prev) =>
          prev.filter((msg) => !msg.isTyping).concat({
            text: 'This is a placeholder response.',
            sender: 'aditya',
            id: Date.now(),
          })
        );
      }, 2000);
    }, 500);
  };

  const chatContainerVariants = {
    hidden: { opacity: 0, x: '100%' },
    visible: { opacity: 1, x: 0 },
    exit: {
      opacity: 0,
      x: '100%',
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        duration: 0.5,
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: {
      opacity: 0,
      y: isClosing ? -10 : 20,
      transition: {
        duration: isClosing ? 0.2 : 0.3,
      },
    },
  };

  return (
    <motion.div
      variants={chatContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-1/2 h-full flex flex-col justify-end p-8 border-l border-emerald-500/20 relative"
    >
      <div className="absolute top-4 right-4 z-50">
        <motion.button
          onClick={handleClose}
          className="p-2 rounded-full bg-emerald-500/10 border border-emerald-500/20
                   text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300"
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          disabled={isClosing}
        >
          <X size={20} />
        </motion.button>
      </div>

      <div className="flex-1 overflow-y-auto mb-4 space-y-4 z-10">
        <AnimatePresence mode="sync">
          {messages.map((message, index) => (
            <motion.div
              key={`${message.id}-${index}`}
              variants={messageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={`flex ${
                message.sender === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-sm p-4 rounded-2xl ${
                  message.isTyping
                    ? 'bg-gray-800 text-emerald-400'
                    : message.sender === 'user'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20'
                    : 'bg-emerald-500/10 text-white border border-emerald-500/20'
                }`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-2">
                    <Loader size={16} className="animate-spin" />
                    <span>typing</span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Type your message..."
          className="w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white
                   placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2
                   focus:ring-emerald-500/20 transition-all duration-300"
          disabled={isClosing}
        />
        <motion.button
          type="submit"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-emerald-500/20 border border-emerald-500/30
                   rounded-full text-emerald-400 hover:text-white hover:bg-emerald-500
                   transition-all duration-300"
          disabled={isClosing}
        >
          <Send size={20} />
        </motion.button>
      </form>
    </motion.div>
  );
};

export default Chat;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageSquare } from 'lucide-react';

interface ChatTriggerProps {
  onChatStart: (message: string) => void;
}

const ChatTrigger: React.FC<ChatTriggerProps> = ({ onChatStart }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onChatStart(inputValue);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mt-12 w-full max-w-md relative"
    >
      <motion.div
        animate={{
          scale: isFocused ? 1.02 : 1,
          boxShadow: isFocused 
            ? '0 0 20px rgba(16, 185, 129, 0.2)' 
            : '0 0 0 rgba(16, 185, 129, 0)'
        }}
        transition={{ duration: 0.2 }}
        className="relative"
      >
        <form onSubmit={handleSubmit} className="relative">
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400">
            <MessageSquare size={20} />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="What would you like to chat about? I'm all ears!"
            className="w-full pl-12 pr-24 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white 
                     placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 
                     focus:ring-emerald-500/20 transition-all duration-300"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2
                     bg-emerald-500/20 border border-emerald-500/30 rounded-full 
                     text-emerald-400 font-mono hover:bg-emerald-500 hover:text-white
                     transition-all duration-300"
          >
            Let's talk
          </motion.button>
        </form>
      </motion.div>

      {/* Decorative elements */}
      <div className="absolute -z-10 inset-0 opacity-50 blur-3xl">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-transparent rounded-full" />
      </div>
    </motion.div>
  );
};

export default ChatTrigger;
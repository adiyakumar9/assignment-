// src/components/Chat.tsx
import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, X, Loader } from "lucide-react";
import { chatService } from "../Services/chatService";
// import { chatService } from '../services/chatService';

interface Message {
  text: string;
  sender: "user" | "bot";
  id: string;
  isTyping?: boolean;
}

interface ChatProps {
  onClose: () => void;
  initialMessage?: string;
}

const containerVariants = {
  hidden: { opacity: 0, x: "100%" },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      type: "spring",
      damping: 25,
      stiffness: 200,
    },
  },
};

const Chat = ({ onClose, initialMessage }: ChatProps): JSX.Element => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const initialMessageProcessed = useRef(false);

  const scrollToBottom = useCallback(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, scrollToBottom]);

  const addMessage = useCallback(
    (
      text: string,
      sender: "user" | "bot",
      id: string,
      isTyping: boolean = false
    ) => {
      setMessages((prev) => [
        ...prev,
        {
          text,
          sender,
          id,
          isTyping,
        },
      ]);
    },
    []
  );

  const handleSendMessage = useCallback(
    async (messageText: string) => {
      try {
        setError(null);
        setIsLoading(true);

        // Add user message
        const userMessageId = `user-${Date.now()}`;
        addMessage(messageText, "user", userMessageId);

        // Show typing indicator
        const typingId = `typing-${Date.now()}`;
        addMessage("typing...", "bot", typingId, true);

        // Send message to backend
        const response = await chatService.sendMessage(messageText);

        // Remove typing indicator
        setMessages((prev) => prev.filter((msg) => !msg.isTyping));

        // Add bot response
        if (response.botResponse) {
          addMessage(
            response.botResponse.payload.text,
            "bot",
            response.botResponse.id
          );
        } else if (response.messages && response.messages.length > 0) {
          // Find bot message (should be the last one)
          const botMessage = response.messages.find(
            (msg) => msg.userId !== response.user.id
          );
          if (botMessage) {
            addMessage(botMessage.payload.text, "bot", botMessage.id);
          }
        }
      } catch (error) {
        console.error("Error in handleSendMessage:", error);
        setError("Failed to send message. Please try again.");
        setMessages((prev) => prev.filter((msg) => !msg.isTyping));
        addMessage(
          "I'm having trouble connecting. Please try again.",
          "bot",
          `error-${Date.now()}`
        );
      } finally {
        setIsLoading(false);
      }
    },
    [addMessage]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event propagation
    if (!inputValue.trim() || isLoading) return;

    const message = inputValue;
    setInputValue("");
    await handleSendMessage(message);
  };

  // Handle initial message
  useEffect(() => {
    if (initialMessage && !initialMessageProcessed.current) {
      initialMessageProcessed.current = true;
      handleSendMessage(initialMessage);
    }
  }, [initialMessage, handleSendMessage]);

  const handleClose = () => {
    chatService.resetChat();
    onClose();
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="w-1/2 h-full flex flex-col bg-gray-900/95 backdrop-blur-sm border-l border-emerald-500/20 overflow-hidden" // Added overflow-hidden
    >
      {/* Header */}
      <div className="p-4 border-b border-emerald-500/20 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
          <span className="text-emerald-400 font-mono">Chat with Aditya</span>
        </div>
        <motion.button
          whileHover={{ scale: 1.1, rotate: 90 }}
          whileTap={{ scale: 0.9 }}
          onClick={handleClose}
          className="p-2 rounded-full hover:bg-gray-800/50 text-emerald-400"
        >
          <X size={20} />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-emerald-500/20 scrollbar-track-transparent">
        <AnimatePresence mode="popLayout">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${
                message.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-xl ${
                  message.isTyping
                    ? "bg-gray-800/50 text-emerald-400"
                    : message.sender === "user"
                    ? "bg-emerald-500/20 text-emerald-400"
                    : "bg-gray-800/50 text-white"
                } border border-emerald-500/20`}
              >
                {message.isTyping ? (
                  <div className="flex items-center space-x-2">
                    <Loader className="w-4 h-4 animate-spin" />
                    <span>typing...</span>
                  </div>
                ) : (
                  message.text
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} className="h-0 w-full" />{" "}
        {/* Added height-0 */}
      </div>

      {/* Error Message */}
      {error && (
        <div className="px-4 py-2 bg-red-500/10 border-t border-red-500/20 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* Input */}
      <form
        onSubmit={handleSubmit}
        className="p-4 border-t border-emerald-500/20"
      >
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                if (inputValue.trim() && !isLoading) {
                  handleSubmit(e);
                }
              }
            }}
            placeholder="Type your message..."
            className="w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white 
               placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 
               focus:ring-emerald-500/20 pr-16 transition-all duration-300"
            disabled={isLoading}
          />
          <div className="absolute right-2 top-1/2 -translate-y-1/2">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !inputValue.trim()}
              className="p-3 bg-emerald-500/20 rounded-full text-emerald-400 
                 hover:text-white group transition-colors duration-300
                 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <div className="relative w-6 h-6 flex items-center justify-center">
                <Send
                  className="transform rotate-45 group-hover:text-white transition-colors duration-300"
                  size={20}
                  strokeWidth={2}
                />
              </div>
            </motion.button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};

export default Chat;

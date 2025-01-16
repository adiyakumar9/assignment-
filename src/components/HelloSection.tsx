import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, X, Loader } from 'lucide-react';

interface Message {
  text: string;
  sender: 'user' | 'aditya';
  id: number;
  isTyping?: boolean;
}

const HelloSection: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState<number>(0);
  const [isChatActive, setIsChatActive] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [isClosing, setIsClosing] = useState(false);
  
  const phrases: string[] = [
    'Front-end Developer',
    'UI/UX Enthusiast',
    'React Specialist',
    'Problem Solver'
  ];

  // Your existing typing animation effect
  useEffect(() => {
    // ... (keep your existing typing animation code)
    let currentText = '';
    let currentIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const type = () => {
      const currentPhrase = phrases[currentPhraseIndex];
      
      if (isDeleting) {
        currentText = currentPhrase.substring(0, currentIndex - 1);
        currentIndex--;
      } else {
        currentText = currentPhrase.substring(0, currentIndex + 1);
        currentIndex++;
      }

      setText(currentText);

      let typeSpeed = isDeleting ? 50 : 100;

      if (!isDeleting && currentIndex === currentPhrase.length) {
        typeSpeed = 2000;
        isDeleting = true;
      } else if (isDeleting && currentIndex === 0) {
        isDeleting = false;
        setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
        typeSpeed = 500;
      }

      timeoutId = setTimeout(type, typeSpeed);
    };

    timeoutId = setTimeout(type, 1000);
    return () => clearTimeout(timeoutId);


  }, [currentPhraseIndex]);

  const handleClose = () => {
    setIsClosing(true);
    // Animate messages away first
    const messagesTimeout = setTimeout(() => {
      setMessages(prevMessages => 
        prevMessages.map(msg => ({
          ...msg,
          isClosing: true
        }))
      );
    }, 100);
    
    // Then close the chat container
    const containerTimeout = setTimeout(() => {
      setIsChatActive(false);
      setIsClosing(false);
      setMessages([]);
    }, 500);

    return () => {
      clearTimeout(messagesTimeout);
      clearTimeout(containerTimeout);
    };
  };


  const chatContainerVariants = {
    hidden: { opacity: 0, x: "100%" },
    visible: { opacity: 1, x: 0 },
    exit: { 
      opacity: 0, 
      x: "100%",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30,
        duration: 0.5
      }
    }
  };

  // Message animation variants
  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { 
      opacity: 0, 
      y: isClosing ? -10 : 20,
      transition: {
        duration: isClosing ? 0.2 : 0.3
      }
    }
  };

  const handleInitialSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const initialMessage: Message = {
      text: inputValue,
      sender: 'user',
      id: Date.now()
    };

    setMessages([initialMessage]);
    setIsChatActive(true);
    setInputValue('');
    
    // Simulate typing indicator and response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now(),
        sender: 'aditya',
        text: 'typing...',
        isTyping: true
      }]);
    }, 500);

    setTimeout(() => {
      setMessages(prev => prev.filter(msg => !msg.isTyping).concat({
        text: `Thanks for reaching out! I'd love to chat about ${initialMessage.text}`,
        sender: 'aditya',
        id: Date.now()
      }));
    }, 2000);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-black to-gray-900 pt-16"> {/* Added pt-16 for nav offset */}
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 -left-48 -top-48 bg-emerald-500/10 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute w-96 h-96 -right-48 -bottom-48 bg-blue-500/10 rounded-full blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]"></div>

      <div className={`relative flex w-full h-[calc(100vh-4rem)] ${isChatActive ? 'justify-between' : 'justify-center'}`}>
        {/* Introduction Section */}
        <motion.div
          className={`text-center px-4 flex flex-col justify-center ${isChatActive ? 'w-1/2' : 'w-full'}`}
          animate={{ 
            width: isChatActive ? '50%' : '100%',
            x: isChatActive ? 0 : 0
          }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          {/* Your existing intro content */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-gray-400 mb-6 font-mono text-lg">
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.6 }}>
                Hi all. I am
              </motion.span>
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-6xl md:text-8xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400"
          >
            Aditya Kumar
          </motion.h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex items-center justify-center font-mono text-xl md:text-2xl text-emerald-400"
          >
            <span className="mr-2">&gt;</span>
            <span>{text}</span>
            <span className="w-2 h-6 bg-emerald-400 animate-pulse ml-1"></span>
          </motion.div>

          {!isChatActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="mt-12"
            >
              <form onSubmit={handleInitialSubmit} className="max-w-md mx-auto">
                <div className="relative">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="What would you like to chat about? I'm all ears!"
                    className="w-full px-6 py-4 bg-gray-900/50 border border-emerald-500/30 rounded-full text-white 
                             placeholder:text-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-2 
                             focus:ring-emerald-500/20 transition-all duration-300"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-gradient-to-r 
                             from-emerald-500 to-blue-500 rounded-full text-white font-semibold
                             hover:shadow-lg hover:shadow-emerald-500/25 transition-all duration-300"
                  >
                    Send
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </motion.div>

        {/* Chat Interface */}
        <AnimatePresence mode="wait">
          {isChatActive && (
            <motion.div
            variants={chatContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="w-1/2 h-full flex flex-col justify-end p-8 border-l border-emerald-500/20 relative"
          >
              {/* Close Button */}
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

               {/* Messages Container */}

              <div className="flex-1 overflow-y-auto mb-4 space-y-4 z-10">
                <AnimatePresence mode="sync">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      variants={messageVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
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
                </AnimatePresence>
              </div>
              
            {/* Chat Input Form - disabled during closing */}
            <form onSubmit={handleInitialSubmit} className="relative">
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
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default HelloSection;
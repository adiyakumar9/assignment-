// src/components/Toast.tsx
import { motion } from 'framer-motion';
import { CheckCircle, XCircle, X } from 'lucide-react';

interface ToastProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 50 }}
      className={`fixed bottom-8 right-8 p-4 rounded-lg shadow-lg backdrop-blur-sm
                 flex items-center gap-3 min-w-[300px] max-w-md border z-50 
                 ${type === 'success' 
                   ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                   : 'bg-red-500/20 border-red-500/50 text-red-400'}`}
    >
      {type === 'success' ? (
        <CheckCircle className="w-5 h-5 shrink-0" />
      ) : (
        <XCircle className="w-5 h-5 shrink-0" />
      )}
      <span className="text-sm font-medium">{message}</span>
      <button
        onClick={onClose}
        className="ml-auto hover:opacity-70 transition-opacity"
      >
        <X className="w-4 h-4" />
      </button>
    </motion.div>
  );
};
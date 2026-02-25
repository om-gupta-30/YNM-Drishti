import { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast Context
const ToastContext = createContext(null);

// Toast types with their styles
const toastTypes = {
  success: {
    icon: CheckCircle,
    bg: 'from-green-500/20 to-green-600/10',
    border: 'border-green-500/50',
    iconColor: 'text-green-400',
    progressColor: 'bg-green-500',
  },
  error: {
    icon: XCircle,
    bg: 'from-red-500/20 to-red-600/10',
    border: 'border-red-500/50',
    iconColor: 'text-red-400',
    progressColor: 'bg-red-500',
  },
  warning: {
    icon: AlertCircle,
    bg: 'from-yellow-500/20 to-yellow-600/10',
    border: 'border-yellow-500/50',
    iconColor: 'text-yellow-400',
    progressColor: 'bg-yellow-500',
  },
  info: {
    icon: Info,
    bg: 'from-gold-500/20 to-gold-600/10',
    border: 'border-gold-500/50',
    iconColor: 'text-gold-400',
    progressColor: 'bg-gold-500',
  },
};

// Single Toast Component
const ToastItem = ({ toast, onDismiss }) => {
  const { type = 'info', title, message, duration = 4000 } = toast;
  const config = toastTypes[type];
  const Icon = config.icon;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      transition={{ 
        type: 'spring', 
        stiffness: 500, 
        damping: 30,
        duration: 0.3 
      }}
      className={`relative overflow-hidden rounded-xl border ${config.border} backdrop-blur-xl min-w-[300px] max-w-[400px]`}
      style={{
        background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.95) 0%, rgba(26, 40, 71, 0.95) 100%)',
      }}
    >
      {/* Gradient overlay */}
      <div className={`absolute inset-0 bg-gradient-to-r ${config.bg} pointer-events-none`} />
      
      {/* Content */}
      <div className="relative z-10 p-4 flex items-start gap-3">
        {/* Icon with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20, delay: 0.1 }}
        >
          <Icon className={`w-5 h-5 ${config.iconColor} flex-shrink-0 mt-0.5`} />
        </motion.div>
        
        {/* Text */}
        <div className="flex-1 min-w-0">
          {title && (
            <motion.p 
              className="text-white font-semibold text-sm"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.p>
          )}
          {message && (
            <motion.p 
              className="text-[#8BA3C7] text-sm mt-0.5"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              {message}
            </motion.p>
          )}
        </div>
        
        {/* Close button */}
        <motion.button
          onClick={() => onDismiss(toast.id)}
          className="p-1 rounded-lg hover:bg-white/10 transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <X className="w-4 h-4 text-[#8BA3C7]" />
        </motion.button>
      </div>
      
      {/* Progress bar */}
      <motion.div
        className={`absolute bottom-0 left-0 h-0.5 ${config.progressColor}`}
        initial={{ width: '100%' }}
        animate={{ width: '0%' }}
        transition={{ duration: duration / 1000, ease: 'linear' }}
      />
    </motion.div>
  );
};

// Toast Provider Component
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((toast) => {
    const id = Date.now() + Math.random();
    const newToast = { ...toast, id };
    
    setToasts(prev => [...prev, newToast]);
    
    // Auto dismiss
    const duration = toast.duration || 4000;
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, duration);
    
    return id;
  }, []);

  const dismissToast = useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  const toast = {
    success: (title, message, duration) => addToast({ type: 'success', title, message, duration }),
    error: (title, message, duration) => addToast({ type: 'error', title, message, duration }),
    warning: (title, message, duration) => addToast({ type: 'warning', title, message, duration }),
    info: (title, message, duration) => addToast({ type: 'info', title, message, duration }),
  };

  return (
    <ToastContext.Provider value={toast}>
      {children}
      
      {/* Toast Container */}
      <div className="fixed bottom-4 right-4 z-[200] flex flex-col gap-2 pointer-events-none">
        <AnimatePresence mode="popLayout">
          {toasts.map(t => (
            <div key={t.id} className="pointer-events-auto">
              <ToastItem toast={t} onDismiss={dismissToast} />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

// Hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export default ToastProvider;

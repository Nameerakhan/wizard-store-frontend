'use client';

import { createContext, useContext, useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'gold';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => void;
}

const ToastContext = createContext<ToastContextValue>({
  toast: () => {},
});

export function useToast() {
  return useContext(ToastContext);
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timerRef = useRef<Record<string, ReturnType<typeof setTimeout>>>({});

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
    if (timerRef.current[id]) {
      clearTimeout(timerRef.current[id]);
      delete timerRef.current[id];
    }
  }, []);

  const toast = useCallback(
    (message: string, type: ToastType = 'success', duration = 2500) => {
      const id = Math.random().toString(36).slice(2);
      setToasts((prev) => [...prev.slice(-3), { id, message, type, duration }]);
      timerRef.current[id] = setTimeout(() => dismiss(id), duration);
    },
    [dismiss]
  );

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 pointer-events-none">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, x: 64, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 64, scale: 0.9 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="pointer-events-auto"
            >
              <ToastItem toast={t} onDismiss={() => dismiss(t.id)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
}

function ToastItem({ toast, onDismiss }: { toast: Toast; onDismiss: () => void }) {
  const styles: Record<ToastType, { bg: string; border: string; icon: React.ReactNode }> = {
    success: {
      bg: 'bg-green-950/90',
      border: 'border-green-500/40',
      icon: <CheckCircle2 size={16} className="text-green-400 shrink-0" />,
    },
    error: {
      bg: 'bg-red-950/90',
      border: 'border-red-500/40',
      icon: <AlertCircle size={16} className="text-red-400 shrink-0" />,
    },
    info: {
      bg: 'bg-[var(--bg-secondary)]/95',
      border: 'border-[var(--border-primary)]',
      icon: <Info size={16} className="text-[var(--text-secondary)] shrink-0" />,
    },
    gold: {
      bg: 'bg-[#1a1400]/90',
      border: 'border-[var(--gold-primary)]/40',
      icon: <span className="text-sm shrink-0">✨</span>,
    },
  };

  const s = styles[toast.type];

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border backdrop-blur-xl shadow-2xl min-w-[220px] max-w-[320px] ${s.bg} ${s.border}`}
    >
      {s.icon}
      <span className="text-sm text-[var(--text-primary)] flex-1">{toast.message}</span>
      <button
        onClick={onDismiss}
        className="p-0.5 text-[var(--text-tertiary)] hover:text-[var(--text-secondary)] transition-colors"
        aria-label="Dismiss"
      >
        <X size={13} />
      </button>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatWindow } from '@/components/chat/ChatWindow';
import { ChatInput } from '@/components/chat/ChatInput';
import { ContextPanel } from '@/components/chat/ContextPanel';
import { useChatStore } from '@/lib/store';
import { checkBackendHealth } from '@/lib/api';
import { Wand2, Trash2 } from 'lucide-react';

export default function ChatPage() {
  const { messages, isLoading, error, setError, clearMessages } = useChatStore();
  const [showClearModal, setShowClearModal] = useState(false);

  const handleRetry = async () => {
    setError(null);
    const isHealthy = await checkBackendHealth();
    if (!isHealthy) {
      setError('Backend is still unavailable. Please start the server.');
    }
  };

  const handleClearConfirm = () => {
    clearMessages();
    setShowClearModal(false);
  };

  return (
    <div className="h-[calc(100vh-8rem)]">
      {/* Error Banner */}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            role="alert"
            aria-live="assertive"
            className="mb-4 p-4 bg-gradient-to-r from-red-900/30 to-orange-900/30 border border-red-500/50 rounded-xl backdrop-blur-sm"
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl" aria-hidden="true">⚠️</span>
                <div>
                  <h2 className="text-red-300 font-semibold text-sm mb-1">Backend Connection Error</h2>
                  <p className="text-red-200/80 text-xs">Unable to connect to the server. Please ensure the backend is running on port 8000.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleRetry}
                  aria-label="Retry connection to backend"
                  className="px-4 py-2 bg-red-500/20 hover:bg-red-500/30 border border-red-400/50 text-red-200 font-medium rounded-lg text-sm transition-all flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Retry
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setError(null)}
                  aria-label="Dismiss error"
                  className="px-3 py-2 hover:bg-red-500/20 text-red-200 rounded-lg text-sm transition-all focus:outline-none focus:ring-2 focus:ring-red-400"
                >
                  <span aria-hidden="true">✕</span>
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 70/30 Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-4 h-[calc(100%-1rem)]">
        {/* Chat Section */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4 }}
          aria-label="Chat conversation"
          className="flex flex-col bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] shadow-2xl overflow-hidden"
        >
          {/* Chat Header */}
          <header className="relative p-5 border-b border-[var(--border-primary)] bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--bg-secondary)]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <motion.div
                  animate={{ rotate: [0, -10, 10, -5, 5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  aria-hidden="true"
                >
                  <Wand2 size={26} className="text-[var(--gold-primary)]" />
                </motion.div>
                <div>
                  <h1 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)]">
                    Wizard Chat Assistant
                  </h1>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Ask me anything about wizard merchandise, policies, or recommendations
                  </p>
                </div>
              </div>

              {/* Clear Conversation Button */}
              <AnimatePresence>
                {messages.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowClearModal(true)}
                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[var(--text-tertiary)] hover:text-red-400 hover:bg-red-500/10 border border-transparent hover:border-red-500/30 transition-all duration-200"
                    aria-label="Clear conversation"
                  >
                    <Trash2 size={14} />
                    <span className="hidden sm:inline">Clear</span>
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
            {/* Decorative line */}
            <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-50" />
          </header>

          {/* Messages Container */}
          <div className="flex-1 overflow-hidden w-full">
            <ChatWindow messages={messages} isLoading={isLoading} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[var(--border-primary)] w-full">
            <ChatInput />
          </div>
        </motion.section>

        {/* Context Panel - Hidden on Mobile */}
        <motion.aside
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          aria-label="Context sources"
          className="hidden lg:block"
        >
          <ContextPanel />
        </motion.aside>
      </div>

      {/* Clear Confirmation Modal */}
      <AnimatePresence>
        {showClearModal && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearModal(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-sm"
            >
              <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-6 shadow-2xl mx-4">
                <div className="text-center mb-6">
                  <div className="text-4xl mb-3">🗑️</div>
                  <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">Clear Conversation?</h3>
                  <p className="text-sm text-[var(--text-secondary)]">
                    This will permanently remove all {messages.length} message{messages.length !== 1 ? 's' : ''}. This cannot be undone.
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setShowClearModal(false)}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-[var(--border-primary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)] transition-colors text-sm font-medium"
                  >
                    Cancel
                  </button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleClearConfirm}
                    className="flex-1 px-4 py-2.5 rounded-xl bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-300 hover:text-red-200 transition-all text-sm font-medium"
                  >
                    Clear All
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

'use client';

import { useEffect, useRef, useState } from 'react';
import { MessageBubble } from './MessageBubble';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import type { Variants } from 'framer-motion';
import type { Message } from '@/lib/store';
import { useChatStore } from '@/lib/store';
import { sendChatQuery } from '@/lib/api';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [showScrollButton, setShowScrollButton] = useState(false);

  // Smooth auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }
  }, [messages, isLoading]);

  const handleScroll = () => {
    if (!scrollRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
    setShowScrollButton(scrollHeight - scrollTop - clientHeight > 120);
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  return (
    <div className="relative h-full">
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="h-full overflow-y-auto w-full px-6 py-6 scroll-smooth flex justify-center"
      >
        <div className="w-full max-w-[720px] space-y-5">
          {messages.length === 0 ? (
            <EmptyState />
          ) : (
            messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: Math.min(index * 0.05, 0.3) }}
              >
                <MessageBubble
                  message={message}
                  isLatest={index === messages.length - 1}
                />
              </motion.div>
            ))
          )}

          {isLoading && <LoadingIndicator />}

          {/* Invisible anchor for smooth scrolling */}
          <div ref={bottomRef} />
        </div>
      </div>

      {/* Scroll-to-bottom floating button */}
      <AnimatePresence>
        {showScrollButton && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 10 }}
            transition={{ duration: 0.2 }}
            onClick={scrollToBottom}
            className="absolute bottom-4 right-6 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-[var(--gold-primary)] text-black shadow-lg hover:bg-[var(--gold-secondary)] transition-colors"
            aria-label="Scroll to bottom"
          >
            <ChevronDown size={18} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}

function EmptyState() {
  const { addMessage, setLoading, setError } = useChatStore();

  const exampleQuestions = [
    "What wands are available for Gryffindor?",
    "Do you sell limited edition collectibles?",
    "Explain the difference between wizard robes",
    "What is your return policy?"
  ];

  const handleQuestion = async (question: string) => {
    addMessage({ role: 'user', content: question });
    setLoading(true);
    setError(null);
    try {
      const response = await sendChatQuery({ query: question });
      addMessage({ role: 'assistant', content: response.answer, context: response.context });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
      addMessage({ role: 'assistant', content: "I'm having trouble connecting to the server. Please ensure the backend is running." });
    } finally {
      setLoading(false);
    }
  };

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 16 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4"
    >
      <motion.div variants={itemVariants} className="text-5xl mb-4 animate-wizard-float">
        🧙‍♂️
      </motion.div>

      <motion.h2 variants={itemVariants} className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        Wizard Assistant
      </motion.h2>

      <motion.p variants={itemVariants} className="text-sm text-[var(--text-secondary)] mb-8 max-w-md">
        Ask about magical products, store policies, or get recommendations.
      </motion.p>

      <motion.div variants={itemVariants} className="w-full max-w-md space-y-2">
        {exampleQuestions.map((question, index) => (
          <motion.button
            key={index}
            whileHover={{ scale: 1.02, borderColor: 'var(--gold-primary)' }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleQuestion(question)}
            className="w-full text-left px-4 py-3 text-sm rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-card)] transition-all duration-200 text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
          >
            ✨ {question}
          </motion.button>
        ))}
      </motion.div>
    </motion.div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)] flex items-center justify-center text-sm flex-shrink-0">
        🤖
      </div>
      <div className="flex-1 bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-primary)]">
        <div className="flex gap-2 items-center">
          {[0, 0.2, 0.4].map((delay, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay }}
              className="w-2 h-2 bg-[var(--gold-primary)] rounded-full"
            />
          ))}
          <span className="text-xs text-[var(--text-tertiary)] ml-1 animate-waiting">Casting spell...</span>
        </div>
      </div>
    </div>
  );
}

'use client';

import { useEffect, useRef } from 'react';
import { MessageBubble } from './MessageBubble';
import { motion } from 'framer-motion';
import type { Message } from '@/lib/store';

interface ChatWindowProps {
  messages: Message[];
  isLoading: boolean;
}

export function ChatWindow({ messages, isLoading }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Smooth auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ 
        behavior: 'smooth',
        block: 'end'
      });
    }
  }, [messages, isLoading]);

  return (
    <div
      ref={scrollRef}
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
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <MessageBubble message={message} />
          </motion.div>
        ))
      )}

      {isLoading && <LoadingIndicator />}
      
      {/* Invisible anchor for smooth scrolling */}
      <div ref={bottomRef} />
      </div>
    </div>
  );
}

function EmptyState() {
  const exampleQuestions = [
    "What wands are available for Gryffindor?",
    "Do you sell limited edition collectibles?",
    "Explain the difference between wizard robes",
    "What is your return policy?"
  ];

  return (
    <div className="flex flex-col items-center justify-center h-full text-center px-4">
      <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
        Wizard Assistant
      </h2>

      <p className="text-sm text-[var(--text-secondary)] mb-6 max-w-md">
        Ask about magical products, store policies, or get recommendations.
      </p>

      <div className="w-full max-w-md space-y-2">
        {exampleQuestions.map((question, index) => (
          <button
            key={index}
            className="w-full text-left px-4 py-3 text-sm rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:border-[var(--gold-primary)] hover:bg-[var(--bg-card)] transition"
          >
            {question}
          </button>
        ))}
      </div>
    </div>
  );
}

function LoadingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-full bg-[var(--gold-primary)] flex items-center justify-center text-sm">
        🤖
      </div>
      <div className="flex-1 bg-[var(--bg-tertiary)] rounded-lg p-4 border border-[var(--border-primary)]">
        <div className="flex gap-2">
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-2 h-2 bg-[var(--gold-primary)] rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
            className="w-2 h-2 bg-[var(--gold-primary)] rounded-full"
          />
          <motion.div
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
            className="w-2 h-2 bg-[var(--gold-primary)] rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

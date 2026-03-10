'use client';

import { motion } from 'framer-motion';
import { Wand2, User, BookOpen } from 'lucide-react';
import type { Message } from '@/lib/store';

interface MessageBubbleProps {
  message: Message;
}

export function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  const isSystem = message.role === 'system';

  if (isSystem) {
    return (
      <div className="flex justify-center">
        <div className="
          px-4 py-2
          text-xs
          rounded-full
          border border-[var(--border-primary)]
          bg-[var(--bg-tertiary)]
          text-[var(--text-tertiary)]
        ">
          {message.content}
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-start gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}>

      {/* Assistant Avatar */}
      {!isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="
            w-9 h-9
            rounded-full
            flex items-center justify-center
            bg-[var(--gold-primary)]
            text-black
            shadow-md
            flex-shrink-0
          "
        >
          <Wand2 size={16} />
        </motion.div>
      )}

      {/* Message Container */}
      <div className={`max-w-[640px] ${isUser ? 'order-first items-end' : ''}`}>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.18 }}
          className={`
            px-4 py-3
            rounded-xl
            text-sm
            leading-relaxed
            whitespace-pre-wrap
            ${
              isUser
                ? `
                bg-[var(--gold-primary)]
                text-black
                `
                : `
                bg-[var(--bg-tertiary)]
                border border-[var(--border-primary)]
                text-[var(--text-primary)]
                `
            }
          `}
        >
          {message.content}
        </motion.div>

        {/* Context / Sources */}
        {!isUser && message.context && message.context.length > 0 && (
          <div className="
            mt-2
            flex items-center gap-2
            text-xs
            text-[var(--text-tertiary)]
          ">
            <BookOpen size={14} />
            <span>{message.context.length} sources retrieved</span>
          </div>
        )}

        {/* Timestamp */}
        <div
          className={`mt-1 text-xs text-[var(--text-tertiary)] ${
            isUser ? 'text-right' : 'text-left'
          }`}
        >
          {formatTimestamp(message.timestamp)}
        </div>

      </div>

      {/* User Avatar */}
      {isUser && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="
            w-9 h-9
            rounded-full
            flex items-center justify-center
            bg-[var(--bg-tertiary)]
            border border-[var(--border-primary)]
            text-[var(--text-primary)]
            flex-shrink-0
          "
        >
          <User size={16} />
        </motion.div>
      )}
    </div>
  );
}

function formatTimestamp(timestamp: Date): string {
  const now = new Date();
  const diff = now.getTime() - timestamp.getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);

  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes}m`;
  if (hours < 24) return `${hours}h`;

  return timestamp.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
}
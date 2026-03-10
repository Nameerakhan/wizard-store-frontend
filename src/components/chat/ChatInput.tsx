'use client';

import { useState, useRef, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';
import { useChatStore } from '@/lib/store';
import { sendChatQuery } from '@/lib/api';

export function ChatInput() {
  const [input, setInput] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const { addMessage, setLoading, setError, isLoading } = useChatStore();

  const maxCharacters = 1000;

  const handleSubmit = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');

    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    addMessage({
      role: 'user',
      content: userMessage
    });

    setLoading(true);
    setError(null);

    try {
      const response = await sendChatQuery({ query: userMessage });

      addMessage({
        role: 'assistant',
        content: response.answer,
        context: response.context
      });

    } catch (error) {
      console.error(error);

      setError(error instanceof Error ? error.message : 'Request failed');

      addMessage({
        role: 'assistant',
        content:
          "I'm having trouble connecting to the server. Please ensure the backend is running."
      });

    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    const textarea = e.target;

    textarea.style.height = 'auto';
    textarea.style.height = `${Math.min(textarea.scrollHeight, 180)}px`;
  };

  const characterCount = input.length;

  return (
    <div className="flex flex-col gap-2 w-full max-w-[720px] mx-auto">

      {/* Input Row */}
      <div className="
        flex items-end gap-3
        border border-[var(--border-primary)]
        bg-[var(--bg-tertiary)]
        rounded-xl
        px-4 py-3
        focus-within:border-[var(--gold-primary)]
        transition
      ">

        {/* Textarea */}
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask about products, policies, or recommendations..."
          disabled={isLoading}
          maxLength={maxCharacters}
          rows={1}
          className="
            flex-1
            bg-transparent
            resize-none
            outline-none
            text-sm
            text-[var(--text-primary)]
            placeholder-[var(--text-tertiary)]
            max-h-[180px]
          "
        />

        {/* Send Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={handleSubmit}
          disabled={!input.trim() || isLoading}
          className="
            h-10 w-10
            flex items-center justify-center
            rounded-lg
            bg-[var(--gold-primary)]
            text-black
            disabled:opacity-40
            disabled:cursor-not-allowed
            transition
          "
        >
          {isLoading ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </motion.button>

      </div>

      {/* Footer Row */}
      <div className="
        flex justify-between
        text-xs
        text-[var(--text-tertiary)]
        px-1
      ">

        <span>
          Press <kbd className="px-1 border rounded">Enter</kbd> to send •
          <kbd className="px-1 border rounded ml-1">Shift+Enter</kbd> for newline
        </span>

        <span
          className={
            characterCount > maxCharacters * 0.9
              ? 'text-red-400'
              : ''
          }
        >
          {characterCount}/{maxCharacters}
        </span>

      </div>
    </div>
  );
}
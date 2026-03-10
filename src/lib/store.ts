/**
 * Zustand Store for Wizard Store AI
 * Global state management
 */

import { create } from 'zustand';

export interface Message {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  context?: any[];
}

interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  theme: 'dark' | 'light';
  
  // Actions
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  toggleTheme: () => void;
}

export const useChatStore = create<ChatState>((set) => ({
  messages: [],
  isLoading: false,
  error: null,
  theme: 'dark',
  
  addMessage: (message) => set((state) => ({
    messages: [
      ...state.messages,
      {
        ...message,
        id: `${Date.now()}-${Math.random()}`,
        timestamp: new Date(),
      },
    ],
  })),
  
  setLoading: (loading) => set({ isLoading: loading }),
  
  setError: (error) => set({ error }),
  
  clearMessages: () => set({ messages: [] }),
  
  toggleTheme: () => set((state) => ({
    theme: state.theme === 'dark' ? 'light' : 'dark',
  })),
}));

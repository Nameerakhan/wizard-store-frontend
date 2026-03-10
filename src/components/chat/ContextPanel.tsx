'use client';

import { motion } from 'framer-motion';
import { useChatStore } from '@/lib/store';
import { useState } from 'react';

export function ContextPanel() {
  const { messages } = useChatStore();
  
  // Get context from the last assistant message
  const lastAssistantMessage = [...messages]
    .reverse()
    .find(m => m.role === 'assistant' && m.context);
  
  const context = lastAssistantMessage?.context || [];

  return (
    <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] h-full flex flex-col overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative p-5 border-b border-[var(--border-primary)] bg-gradient-to-r from-[var(--bg-tertiary)] to-[var(--bg-secondary)]">
        <div className="flex items-center gap-3">
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
            className="text-2xl"
          >
            📚
          </motion.span>
          <div>
            <h2 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)]">
              Context Sources
            </h2>
            <p className="text-xs text-[var(--text-secondary)] mt-0.5">
              Retrieved documents used for the response
            </p>
          </div>
        </div>
        {/* Decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-50"></div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {context.length === 0 ? (
          <EmptyContextState />
        ) : (
          context.map((doc, index) => (
            <ContextCard key={index} document={doc} index={index} />
          ))
        )}
      </div>
    </div>
  );
}

function EmptyContextState() {
  const knowledgeSources = [
    { icon: '🛍️', name: 'Product Catalog' },
    { icon: '📋', name: 'Store Policies' },
    { icon: '📚', name: 'Wizard Archives' },
    { icon: '❓', name: 'FAQ Knowledge Base' }
  ];

  return (
    <div className="flex flex-col h-full px-4 py-6">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4">
        Knowledge Sources
      </h3>
      
      <div className="space-y-2 mb-6">
        {knowledgeSources.map((source, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-3 py-2 rounded-lg bg-[var(--bg-tertiary)]/50 border border-[var(--border-primary)]/50"
          >
            <span className="text-lg">{source.icon}</span>
            <span className="text-sm text-[var(--text-secondary)]">{source.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto">
        <p className="text-xs text-[var(--text-tertiary)] leading-relaxed">
          Sources used in answers will appear here.
        </p>
      </div>
    </div>
  );
}

interface ContextDocument {
  content: string;
  metadata?: {
    source?: string;
    category?: string;
  };
  score?: number;
}

interface ContextCardProps {
  document: ContextDocument;
  index: number;
}

function ContextCard({ document, index }: ContextCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate relevance score (0-100)
  const relevanceScore = document.score 
    ? Math.round((1 - document.score) * 100) // Assuming score is distance (lower is better)
    : 85; // Default fallback

  // Determine color based on relevance
  const getRelevanceColor = (score: number) => {
    if (score >= 80) return 'var(--status-success)';
    if (score >= 60) return 'var(--gold-primary)';
    return 'var(--status-warning)';
  };

  // Get source icon
  const getSourceIcon = (source?: string) => {
    if (!source) return '📄';
    if (source.includes('product')) return '🛍️';
    if (source.includes('policy')) return '📋';
    if (source.includes('faq')) return '❓';
    return '📄';
  };

  const sourceIcon = getSourceIcon(document.metadata?.source);
  const source = document.metadata?.source || 'Unknown';
  const category = document.metadata?.category || 'General';

  // Truncate content for preview
  const preview = document.content.length > 150 
    ? document.content.substring(0, 150) + '...'
    : document.content;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ scale: 1.02, boxShadow: '0 8px 30px rgba(0,0,0,0.3)' }}
      className="bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-4 hover:border-[var(--gold-primary)] transition-all duration-300 relative overflow-hidden group"
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
      
      <div className="relative z-10">{/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-2">
          <span className="text-xl">{sourceIcon}</span>
          <div>
            <div className="text-sm font-semibold text-[var(--text-primary)]">
              {category}
            </div>
            <div className="text-xs text-[var(--text-tertiary)]">{source}</div>
          </div>
        </div>
        
        {/* Relevance Badge */}
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 + 0.2 }}
          className="text-xs font-semibold px-2 py-1 rounded-lg" 
          style={{ 
            backgroundColor: `${getRelevanceColor(relevanceScore)}20`,
            color: getRelevanceColor(relevanceScore),
            boxShadow: `0 0 10px ${getRelevanceColor(relevanceScore)}40`
          }}
        >
          {relevanceScore}%
        </motion.div>
      </div>

      {/* Relevance Bar */}
      <div className="w-full h-1.5 bg-[var(--bg-secondary)] rounded-full overflow-hidden mb-3">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${relevanceScore}%` }}
          transition={{ duration: 0.8, delay: index * 0.1 + 0.2 }}
          className="h-full rounded-full"
          style={{ backgroundColor: getRelevanceColor(relevanceScore) }}
        />
      </div>

      {/* Content */}
      <div className="text-sm text-[var(--text-secondary)]">
        <p className="leading-relaxed">
          {isExpanded ? document.content : preview}
        </p>
      </div>

      {/* Expand Button */}
      {document.content.length > 150 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-3 text-xs text-[var(--gold-primary)] hover:text-[var(--gold-secondary)] transition-colors flex items-center gap-1 font-medium"
        >
          <span>{isExpanded ? 'Show less' : 'Show more'}</span>
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            ▼
          </motion.span>
        </button>
      )}
      </div>
    </motion.div>
  );
}

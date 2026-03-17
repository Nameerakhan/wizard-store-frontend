'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Github, Mail, Sparkles } from 'lucide-react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/chat', label: 'Chat' },
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
];

export default function Footer() {
  return (
    <footer className="relative mt-20 border-t border-[var(--border-primary)] bg-[var(--bg-secondary)]">
      {/* Gold gradient top border */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.6) 30%, rgba(212,175,55,0.9) 50%, rgba(212,175,55,0.6) 70%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="inline-flex items-center gap-3 group">
              <span className="text-2xl">🧙‍♂️</span>
              <span className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                Wizard Store AI
              </span>
            </Link>
            <p className="text-sm text-[var(--text-secondary)] leading-relaxed max-w-xs">
              AI-powered magical shopping. Ask anything about wizard merchandise and get grounded answers from a real product catalog.
            </p>
            <Link href="/about">
              <motion.span
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border border-[var(--gold-primary)]/30 text-[var(--gold-primary)] bg-[var(--gold-primary)]/10 cursor-pointer hover:bg-[var(--gold-primary)]/20 transition-colors"
              >
                <Sparkles size={11} />
                Built with AI
              </motion.span>
            </Link>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Navigation
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-200 flex items-center gap-2 group"
                  >
                    <span className="w-1 h-1 rounded-full bg-[var(--gold-primary)]/40 group-hover:bg-[var(--gold-primary)] transition-colors" />
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-4">
            <h3 className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)]">
              Connect
            </h3>
            <div className="space-y-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center group-hover:border-[var(--gold-primary)] transition-colors">
                  <Github size={15} />
                </span>
                GitHub
              </a>
              <a
                href="mailto:hello@wizardstore.ai"
                className="flex items-center gap-3 text-sm text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-200 group"
              >
                <span className="w-8 h-8 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] flex items-center justify-center group-hover:border-[var(--gold-primary)] transition-colors">
                  <Mail size={15} />
                </span>
                hello@wizardstore.ai
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border-primary)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--text-tertiary)]">
            © 2026 Wizard Store AI · Built with ✨ AI
          </p>
          <div className="flex items-center gap-4 text-xs text-[var(--text-tertiary)]">
            <span className="hover:text-[var(--gold-primary)] cursor-pointer transition-colors">Privacy</span>
            <span className="w-1 h-1 rounded-full bg-[var(--border-primary)]" />
            <span className="hover:text-[var(--gold-primary)] cursor-pointer transition-colors">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

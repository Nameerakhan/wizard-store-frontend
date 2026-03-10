'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/lib/store';
import { useState } from 'react';

export default function Navbar() {
  const { theme, toggleTheme } = useChatStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] backdrop-blur-lg bg-opacity-95"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group flex-shrink-0"
              onClick={closeMobileMenu}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-2xl transition-all duration-300 group-hover:rotate-12"
              >
                🧙‍♂️
              </motion.div>
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                Wizard Store AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <NavLink href="/">Home</NavLink>
              <NavLink href="/chat">Chat</NavLink>
              <NavLink href="/products">Products</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className="p-2 rounded-lg bg-[var(--bg-tertiary)] border border-[var(--border-primary)] hover:border-[var(--gold-primary)] transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? '🌙' : '☀️'}
              </motion.button>

              {/* CTA Button - Hidden on mobile when menu is open */}
              <Link href="/chat" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 sm:px-6 py-2 bg-[var(--gold-primary)] text-[var(--bg-primary)] font-semibold rounded-lg hover:bg-[var(--gold-secondary)] transition-all duration-300 hover:shadow-[var(--glow-gold)] text-sm sm:text-base"
                >
                  Try Now
                </motion.button>
              </Link>

              {/* Mobile menu button */}
              <button 
                onClick={toggleMobileMenu}
                className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg 
                  className="w-6 h-6" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  {mobileMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-0 right-0 z-40 md:hidden bg-[var(--bg-secondary)] border-b border-[var(--border-primary)] overflow-hidden"
          >
            <div className="px-4 py-4 space-y-3">
              <MobileNavLink href="/" onClick={closeMobileMenu}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/chat" onClick={closeMobileMenu}>
                Chat
              </MobileNavLink>
              <MobileNavLink href="/products" onClick={closeMobileMenu}>
                Products
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={closeMobileMenu}>
                About
              </MobileNavLink>
              
              {/* Mobile CTA */}
              <Link href="/chat" onClick={closeMobileMenu} className="block">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-[var(--gold-primary)] text-[var(--bg-primary)] font-semibold rounded-lg hover:bg-[var(--gold-secondary)] transition-all duration-300 text-center"
                >
                  Try Now 🧙‍♂️
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeMobileMenu}
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            style={{ top: '64px' }}
          />
        )}
      </AnimatePresence>
    </>
  );
}

// Desktop NavLink component
function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -2 }}
        className="text-base text-[var(--text-secondary)] hover:text-[var(--gold-primary)] transition-colors duration-300 font-medium cursor-pointer relative group inline-block px-1"
      >
        {children}
        <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] group-hover:w-full transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.5)]"></span>
      </motion.span>
    </Link>
  );
}

// Mobile NavLink component
function MobileNavLink({ 
  href, 
  children, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="block px-4 py-3 text-[var(--text-secondary)] hover:text-[var(--gold-primary)] hover:bg-[var(--bg-tertiary)] rounded-lg transition-all duration-300 font-medium"
      >
        {children}
      </motion.div>
    </Link>
  );
}

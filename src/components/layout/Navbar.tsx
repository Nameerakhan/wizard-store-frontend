'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '@/lib/store';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { theme, toggleTheme } = useChatStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 border-b border-[var(--border-primary)] transition-all duration-300 ${
          scrolled
            ? 'bg-[var(--bg-primary)]/95 backdrop-blur-xl shadow-lg shadow-black/20'
            : 'bg-[var(--bg-secondary)]/90 backdrop-blur-lg'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group flex-shrink-0"
              onClick={closeMobileMenu}
            >
              <span className="text-2xl animate-wizard-float inline-block">
                🧙‍♂️
              </span>
              <span className="text-lg sm:text-xl font-bold text-[var(--text-primary)] group-hover:text-[var(--gold-primary)] transition-colors duration-300">
                Wizard Store AI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <NavLink href="/" active={pathname === '/'}>Home</NavLink>
              <NavLink href="/chat" active={pathname === '/chat'}>Chat</NavLink>
              <NavLink href="/products" active={pathname === '/products'}>Products</NavLink>
              <NavLink href="/about" active={pathname === '/about'}>About</NavLink>
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

              {/* CTA Button */}
              <Link href="/chat" className="hidden sm:block">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-pulse px-4 sm:px-6 py-2 bg-[var(--gold-primary)] text-[var(--bg-primary)] font-semibold rounded-lg hover:bg-[var(--gold-secondary)] transition-all duration-300 text-sm sm:text-base"
                >
                  Try Now
                </motion.button>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Toggle mobile menu"
                aria-expanded={mobileMenuOpen}
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Mobile Menu */}
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
              <MobileNavLink href="/" active={pathname === '/'} onClick={closeMobileMenu}>Home</MobileNavLink>
              <MobileNavLink href="/chat" active={pathname === '/chat'} onClick={closeMobileMenu}>Chat</MobileNavLink>
              <MobileNavLink href="/products" active={pathname === '/products'} onClick={closeMobileMenu}>Products</MobileNavLink>
              <MobileNavLink href="/about" active={pathname === '/about'} onClick={closeMobileMenu}>About</MobileNavLink>
              <Link href="/chat" onClick={closeMobileMenu} className="block">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="w-full px-6 py-3 bg-[var(--gold-primary)] text-[var(--bg-primary)] font-semibold rounded-lg transition-all duration-300 text-center"
                >
                  Try Now 🧙‍♂️
                </motion.button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile overlay */}
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

function NavLink({ href, children, active }: { href: string; children: React.ReactNode; active: boolean }) {
  return (
    <Link href={href}>
      <motion.span
        whileHover={{ y: -2 }}
        className={`text-base font-medium cursor-pointer relative group inline-block px-1 transition-colors duration-300 ${
          active ? 'text-[var(--gold-primary)]' : 'text-[var(--text-secondary)] hover:text-[var(--gold-primary)]'
        }`}
      >
        {children}
        {/* Underline — always visible when active, animates in on hover */}
        <span
          className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] transition-all duration-300 shadow-[0_0_8px_rgba(212,175,55,0.5)] ${
            active ? 'w-full' : 'w-0 group-hover:w-full'
          }`}
        />
      </motion.span>
    </Link>
  );
}

function MobileNavLink({
  href,
  children,
  active,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileTap={{ scale: 0.98 }}
        className={`block px-4 py-3 rounded-lg transition-all duration-300 font-medium ${
          active
            ? 'text-[var(--gold-primary)] bg-[var(--bg-tertiary)] border border-[var(--gold-primary)]/30'
            : 'text-[var(--text-secondary)] hover:text-[var(--gold-primary)] hover:bg-[var(--bg-tertiary)]'
        }`}
      >
        {children}
      </motion.div>
    </Link>
  );
}

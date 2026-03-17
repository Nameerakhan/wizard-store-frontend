'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LogIn } from 'lucide-react';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [notice, setNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setNotice(true);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🧙‍♂️</div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Welcome Back</h1>
          <p className="text-[var(--text-secondary)] mt-2">Sign in to your Wizard Store account</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-8">
          {notice && (
            <div className="mb-5 p-4 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/30 text-sm text-[var(--gold-primary)]">
              ✨ Authentication is coming soon! Full sign-in will be available once OAuth is set up.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="harry@hogwarts.edu"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
              />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-xl shadow-lg"
            >
              <LogIn size={16} />
              Sign In
            </motion.button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--border-primary)] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Don&apos;t have an account?{' '}
              <Link href="/auth/signup" className="text-[var(--gold-primary)] hover:underline font-medium">
                Create one
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-4 text-center">
          <Link href="/checkout" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--gold-primary)] transition-colors">
            ← Back to Checkout
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

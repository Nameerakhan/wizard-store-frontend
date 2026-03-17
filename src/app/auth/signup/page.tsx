'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { UserPlus } from 'lucide-react';

export default function SignUpPage() {
  const [form, setForm] = useState({ fullName: '', email: '', password: '', confirm: '' });
  const [notice, setNotice] = useState(false);

  const set = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

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
          <div className="text-5xl mb-3">⚡</div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">Create Account</h1>
          <p className="text-[var(--text-secondary)] mt-2">Join the Wizard Store community</p>
        </div>

        <div className="bg-[var(--bg-secondary)] border border-[var(--border-primary)] rounded-2xl p-8">
          {notice && (
            <div className="mb-5 p-4 rounded-xl bg-[var(--gold-primary)]/10 border border-[var(--gold-primary)]/30 text-sm text-[var(--gold-primary)]">
              ✨ Account creation is coming soon! Authentication with Google &amp; GitHub will be available shortly.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Full Name <span className="text-[var(--gold-primary)]">*</span>
              </label>
              <input
                type="text"
                value={form.fullName}
                onChange={set('fullName')}
                placeholder="Harry Potter"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Email Address <span className="text-[var(--gold-primary)]">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={set('email')}
                placeholder="harry@hogwarts.edu"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Password <span className="text-[var(--gold-primary)]">*</span>
              </label>
              <input
                type="password"
                value={form.password}
                onChange={set('password')}
                placeholder="••••••••"
                required
                className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
                Confirm Password <span className="text-[var(--gold-primary)]">*</span>
              </label>
              <input
                type="password"
                value={form.confirm}
                onChange={set('confirm')}
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
              <UserPlus size={16} />
              Create Account
            </motion.button>
          </form>

          <div className="mt-6 pt-5 border-t border-[var(--border-primary)] text-center">
            <p className="text-sm text-[var(--text-secondary)]">
              Already have an account?{' '}
              <Link href="/auth/signin" className="text-[var(--gold-primary)] hover:underline font-medium">
                Sign in
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

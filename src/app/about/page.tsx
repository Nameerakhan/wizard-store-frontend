'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Link from 'next/link';

/* ──────────────────── Count-up hook ──────────────────── */
function useCountUp(target: number, duration = 1800) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });

  useEffect(() => {
    if (!inView) return;
    let start: number | null = null;
    const step = (ts: number) => {
      if (!start) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { value, ref };
}

/* ──────────────────── Fade-in-up helper ──────────────────── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

/* ──────────────────── How It Works steps ──────────────────── */
const STEPS = [
  { icon: '💬', label: 'Query', desc: 'You ask a question in plain language' },
  { icon: '🔢', label: 'Embed', desc: 'Your query is converted to a vector embedding' },
  { icon: '🔍', label: 'Search', desc: 'Nearest knowledge chunks are retrieved from ChromaDB' },
  { icon: '📖', label: 'Ground', desc: 'Context is injected into the GPT-4o-mini prompt' },
  { icon: '✨', label: 'Respond', desc: 'A grounded, accurate answer is returned to you' },
];

/* ──────────────────── Tech badges ──────────────────── */
const TECH = [
  { name: 'OpenAI GPT-4o-mini', color: '#10a37f', bg: '#10a37f20', icon: '🤖' },
  { name: 'ChromaDB', color: '#f97316', bg: '#f9731620', icon: '🗄️' },
  { name: 'FastAPI', color: '#009688', bg: '#00968820', icon: '⚡' },
  { name: 'Next.js 16', color: '#a78bfa', bg: '#7c3aed15', icon: '▲' },
  { name: 'Framer Motion', color: '#8b5cf6', bg: '#8b5cf620', icon: '🎬' },
  { name: 'Tailwind v4', color: '#38bdf8', bg: '#38bdf820', icon: '🎨' },
];

export default function AboutPage() {
  const { value: productsVal, ref: productsRef } = useCountUp(42);
  const { value: faqsVal, ref: faqsRef } = useCountUp(45);
  const { value: accuracyVal, ref: accuracyRef } = useCountUp(100);

  return (
    <div className="py-12 space-y-24">

      {/* ── Header ── */}
      <motion.header
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-secondary)] to-[var(--gold-primary)] mb-6">
          About Wizard Store AI
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-3xl mx-auto">
          Your magical shopping companion powered by advanced AI
        </p>
      </motion.header>

      {/* ── What We Do ── */}
      <motion.section
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        <div className="space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)]">What We Do</h2>
          <p className="text-lg text-[var(--text-secondary)] leading-relaxed">
            Wizard Store AI helps you discover magical merchandise effortlessly through intelligent conversation and advanced search capabilities.
          </p>
          <ul className="space-y-4 text-[var(--text-secondary)]">
            {[
              ['✨', 'Discover magical products faster using AI-powered semantic search'],
              ['💬', 'Ask questions and receive grounded, accurate answers backed by our knowledge base'],
              ['🎯', 'Get personalized recommendations based on your house preferences and shopping needs'],
            ].map(([icon, text]) => (
              <li key={text} className="flex items-start gap-3">
                <span className="text-[var(--gold-primary)] text-xl mt-1">{icon}</span>
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Animated crystal ball */}
        <div className="relative flex items-center justify-center min-h-[320px]">
          {/* Rotating aura */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
            className="absolute w-64 h-64 rounded-full"
            style={{
              background: 'conic-gradient(from 0deg, transparent 0%, rgba(212,175,55,0.15) 25%, rgba(107,70,193,0.2) 50%, transparent 75%)',
            }}
          />
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute w-48 h-48 rounded-full"
            style={{
              background: 'conic-gradient(from 180deg, transparent 0%, rgba(139,92,246,0.15) 30%, rgba(212,175,55,0.1) 60%, transparent 80%)',
            }}
          />
          <div className="relative bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-primary)] p-12 text-center z-10">
            <motion.div
              animate={{ y: [-6, 6, -6], scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="text-8xl mb-4"
              aria-hidden="true"
            >
              🔮
            </motion.div>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-xs">
              Powered by advanced RAG technology and vector search for lightning-fast, accurate responses
            </p>
          </div>
        </div>
      </motion.section>

      {/* ── How It Works ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 text-center">
          How It Works
        </h2>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12 max-w-2xl mx-auto">
          Five steps from your question to a grounded answer
        </p>

        {/* Timeline */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-12 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--gold-primary)] to-transparent opacity-30" />

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {STEPS.map((step, i) => (
              <motion.div
                key={step.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.45, ease: 'easeOut' }}
                className="flex flex-col items-center text-center"
              >
                {/* Step number + icon */}
                <div className="relative mb-4">
                  <motion.div
                    whileHover={{ scale: 1.15 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-card)] border-2 border-[var(--gold-primary)]/40 flex items-center justify-center text-3xl shadow-lg"
                  >
                    {step.icon}
                  </motion.div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[var(--gold-primary)] text-black text-xs font-bold flex items-center justify-center">
                    {i + 1}
                  </span>
                </div>
                <h3 className="text-base font-bold text-[var(--gold-primary)] mb-1">{step.label}</h3>
                <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* ── Key Features ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 text-center">Key Features</h2>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12 max-w-3xl mx-auto">
          Everything you need for an intelligent shopping experience
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            ['🤖', 'AI-Powered Search', 'Advanced semantic search to find exactly what you need'],
            ['💬', 'Natural Conversations', 'Chat naturally and get instant, helpful responses'],
            ['📚', 'Grounded Responses', 'All answers backed by our verified knowledge base'],
            ['🎨', 'House Preferences', 'Get recommendations based on your Hogwarts house'],
            ['⚡', 'Lightning Fast', 'Responses in under 3 seconds guaranteed'],
            ['🔒', 'Reliable & Accurate', '100% grounded in our product catalog and policies'],
          ].map(([icon, title, description], i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.45 }}
              whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(0,0,0,0.4)' }}
              className="card-shimmer flex flex-col p-8 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] rounded-2xl border border-[var(--border-primary)] hover:border-[var(--gold-primary)]/60 transition-all duration-300"
            >
              <div className="text-5xl mb-6">{icon}</div>
              <h3 className="text-xl font-bold text-[var(--text-primary)] mb-3">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Stats ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-60px' }}
        variants={fadeUp}
        className="bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-2xl border border-[var(--gold-primary)]/30 p-12"
        aria-labelledby="stats-heading"
      >
        <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div ref={productsRef} className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)] mb-2">{productsVal}+</div>
            <div className="text-[var(--text-secondary)] text-sm">Products</div>
          </div>
          <div ref={faqsRef} className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)] mb-2">{faqsVal}+</div>
            <div className="text-[var(--text-secondary)] text-sm">FAQs</div>
          </div>
          <div ref={accuracyRef} className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)] mb-2">{accuracyVal}%</div>
            <div className="text-[var(--text-secondary)] text-sm">AI Grounded</div>
          </div>
          <motion.div whileHover={{ scale: 1.05 }} className="p-4">
            <div className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)] mb-2">&lt;3s</div>
            <div className="text-[var(--text-secondary)] text-sm">Response Time</div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Tech Stack ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4 text-center">Tech Stack</h2>
        <p className="text-lg text-[var(--text-secondary)] text-center mb-12 max-w-3xl mx-auto">
          Built on cutting-edge AI infrastructure
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          {TECH.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.35 }}
              whileHover={{ scale: 1.08, y: -3 }}
              className="flex items-center gap-2.5 px-5 py-3 rounded-full border font-semibold text-sm transition-all duration-200"
              style={{
                backgroundColor: t.bg,
                borderColor: t.color + '60',
                color: t.color,
              }}
            >
              <span>{t.icon}</span>
              <span>{t.name}</span>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* ── Founder Note ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="relative"
      >
        <div className="rounded-2xl border border-[var(--gold-primary)]/25 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] p-8 md:p-12 overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-[var(--gold-primary)] to-[var(--purple-primary)] rounded-l-2xl" />
          <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[var(--gold-primary)]/5 blur-[80px] pointer-events-none" />
          <div className="relative pl-4">
            <div className="text-3xl mb-4">👨‍💻</div>
            <blockquote className="text-xl md:text-2xl font-medium text-[var(--text-primary)] leading-relaxed mb-6 italic">
              "I built this to show that AI can make shopping smarter without being gimmicky. Every answer the wizard gives is grounded in real data — no hallucinations, no fluff."
            </blockquote>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-black font-bold text-sm">
                WS
              </div>
              <div>
                <div className="text-sm font-semibold text-[var(--text-primary)]">The Builder</div>
                <div className="text-xs text-[var(--text-tertiary)]">Wizard Store AI · Built with FastAPI, Next.js &amp; OpenAI</div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── Infrastructure badges ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="text-center"
      >
        <p className="text-xs font-semibold uppercase tracking-widest text-[var(--text-tertiary)] mb-6">Powered by</p>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            { label: 'FastAPI', color: '#009688', bg: '#00968815', icon: '⚡' },
            { label: 'PostgreSQL', color: '#336791', bg: '#33679115', icon: '🐘' },
            { label: 'OpenAI', color: '#10a37f', bg: '#10a37f15', icon: '🤖' },
            { label: 'ChromaDB', color: '#f97316', bg: '#f9731615', icon: '🗄️' },
            { label: 'Next.js', color: '#a78bfa', bg: '#7c3aed15', icon: '▲' },
            { label: 'Vercel', color: '#818cf8', bg: '#6366f115', icon: '🔺' },
            { label: 'Tailwind', color: '#38bdf8', bg: '#38bdf815', icon: '🎨' },
            { label: 'Framer Motion', color: '#8b5cf6', bg: '#8b5cf615', icon: '🎬' },
          ].map((b, i) => (
            <motion.span
              key={b.label}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.3 }}
              whileHover={{ scale: 1.08, y: -2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all duration-200"
              style={{ backgroundColor: b.bg, borderColor: b.color + '50', color: b.color }}
            >
              <span>{b.icon}</span>
              <span>{b.label}</span>
            </motion.span>
          ))}
        </div>
      </motion.section>

      {/* ── CTA ── */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeUp}
        className="text-center bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-2xl border border-[var(--gold-primary)]/30 p-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-6">
          Ready to Explore Magical Products?
        </h2>
        <p className="text-lg text-[var(--text-secondary)] mb-10 max-w-2xl mx-auto">
          Start chatting with our AI assistant and discover the perfect magical merchandise for you
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/chat">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-lg text-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300"
            >
              Start Chatting ✨
            </motion.button>
          </Link>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold rounded-lg text-lg border-2 border-[var(--border-primary)] hover:border-[var(--gold-primary)] transition-all duration-300"
            >
              View Products
            </motion.button>
          </Link>
        </div>
      </motion.section>
    </div>
  );
}

'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Wand2, Sparkles, Search, MessageCircle, ShieldCheck, Zap, Star } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

/* ── Floating hero particles ── */
const PARTICLES = [
  { left: '12%', top: '28%', delay: 0,   size: 5 },
  { left: '78%', top: '18%', delay: 1.4, size: 3 },
  { left: '55%', top: '62%', delay: 0.8, size: 4 },
  { left: '88%', top: '52%', delay: 2.2, size: 3 },
  { left: '22%', top: '72%', delay: 1.6, size: 4 },
  { left: '65%', top: '35%', delay: 0.4, size: 3 },
  { left: '40%', top: '80%', delay: 1.9, size: 2 },
];

/* ── Word-by-word typewriter variants ── */
const sentenceVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' as const } },
};

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    const start = Date.now();
    const step = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, target, duration]);

  return { count, ref };
}

/* ── Featured products (hardcoded for speed) ── */
const FEATURED = [
  { id: '1', name: 'Elder Wand Replica', category: 'Wands', house: 'All', price: 49.99, emoji: '🪄', gradient: 'from-[#2d1a0e] to-[#5a3320]', accentColor: '#d4af37' },
  { id: '2', name: 'Gryffindor House Robe', category: 'Robes', house: 'Gryffindor', price: 89.99, emoji: '🧙‍♂️', gradient: 'from-[#740001] to-[#ae0001]', accentColor: '#ffd700' },
  { id: '6', name: "Marauder's Map", category: 'Collectibles', house: 'All', price: 39.99, emoji: '📜', gradient: 'from-[#1a0e2d] to-[#3d2060]', accentColor: '#8b5cf6' },
];

/* ── Testimonials ── */
const TESTIMONIALS = [
  { initials: 'HP', name: 'Harry P.', house: 'Gryffindor', rating: 5, text: 'The AI knew exactly which wand would suit my needs. It even mentioned the Elder Wand\'s history — genuinely impressive.' },
  { initials: 'HG', name: 'Hermione G.', house: 'Gryffindor', rating: 5, text: 'I asked about house robes and got a perfectly grounded comparison. No hallucinations, just facts from the actual catalog.' },
  { initials: 'DM', name: 'Draco M.', house: 'Slytherin', rating: 4, text: 'Fast, accurate, and it knew the Slytherin scarf details without me even filtering. The recommendations were spot on.' },
];

export default function HomePage() {
  const line1Words = ['Discover', 'Magical', 'Products'];
  const line2Words = ['with'];

  return (
    <div className="min-h-screen">

      {/* ── HERO ── */}
      <section className="relative flex items-center justify-center pt-10 pb-24 overflow-hidden">

        {/* Rotating magical aura */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(107,70,193,0.06) 25%, rgba(212,175,55,0.04) 50%, transparent 75%)',
            animation: 'rotateAura 20s linear infinite',
          }}
        />

        {/* Background glow blobs */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/20 blur-[140px]" />
          <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-[var(--gold-primary)]/5 blur-[100px]" />
        </div>

        {/* Floating gold particles */}
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="absolute rounded-full bg-[var(--gold-primary)] pointer-events-none"
            aria-hidden="true"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.35,
              animation: `floatParticle ${4 + i * 0.5}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}

        <div className="relative z-10 w-full text-center flex flex-col items-center gap-8">

          {/* Animated live badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,175,55,0.3)] bg-[rgba(212,175,55,0.06)] text-[var(--gold-primary)] text-sm backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
            </span>
            LIVE · AI-Powered Wizard Commerce
          </motion.div>

          {/* Typewriter heading */}
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight">
            <motion.div
              className="flex flex-wrap justify-center gap-x-4"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {line1Words.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariant}
                  className="text-transparent bg-clip-text inline-block" style={{ backgroundImage: 'var(--heading-gradient)' }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.div>
            <motion.div
              className="flex flex-wrap justify-center gap-x-4 mt-2"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {line2Words.map((word) => (
                <motion.span
                  key={word}
                  variants={wordVariant}
                  className="text-transparent bg-clip-text inline-block" style={{ backgroundImage: 'var(--heading-gradient)' }}
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={wordVariant}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#D4AF37] inline-block"
              >
                AI Intelligence
              </motion.span>
            </motion.div>
          </div>

          {/* Sub-copy — more compelling */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-2xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            Ask our AI anything about wizard merchandise. Get grounded answers from a real product catalog — not hallucinations.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 mt-2"
          >
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-lg font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] shadow-lg hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] transition flex items-center gap-2"
              >
                <Wand2 size={18} />
                Ask the Wizard
              </motion.button>
            </Link>
            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:border-[var(--gold-primary)] text-[var(--text-primary)] transition"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>

          {/* Floating chat preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="w-full max-w-md"
          >
            <div className="rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]/80 backdrop-blur-xl shadow-2xl overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-primary)] bg-[var(--bg-tertiary)]/50">
                <span className="text-base">🧙‍♂️</span>
                <span className="text-xs font-semibold text-[var(--text-secondary)]">Wizard Assistant</span>
                <span className="ml-auto flex items-center gap-1 text-[10px] text-green-400 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  Online
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div className="flex justify-end">
                  <div className="px-3 py-2 rounded-2xl rounded-tr-sm bg-[var(--gold-primary)]/15 border border-[var(--gold-primary)]/20 text-xs text-[var(--text-primary)] max-w-[80%]">
                    Do you have any Gryffindor robes under $100?
                  </div>
                </div>
                <div className="flex gap-2">
                  <span className="text-sm mt-0.5">🔮</span>
                  <div className="px-3 py-2 rounded-2xl rounded-tl-sm bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs text-[var(--text-secondary)] max-w-[85%] leading-relaxed">
                    Yes! The <span className="text-[var(--gold-primary)] font-medium">Gryffindor House Robe</span> is $89.99 — officially embroidered crest, in stock. Want me to add it to your cart?
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Trust badges */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="flex flex-wrap justify-center gap-4 mt-2"
          >
            {[
              { icon: <ShieldCheck size={13} />, text: 'No account required to browse' },
              { icon: <Zap size={13} />, text: '<3s AI responses' },
              { icon: <Sparkles size={13} />, text: '100% grounded answers' },
            ].map(({ icon, text }) => (
              <span
                key={text}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[var(--border-primary)] bg-[var(--bg-secondary)]/60 text-xs text-[var(--text-secondary)] backdrop-blur"
              >
                <span className="text-[var(--gold-primary)]">{icon}</span>
                {text}
              </span>
            ))}
          </motion.div>

          {/* Feature cards */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <FeatureCard icon={<Sparkles size={24} />} title="AI Product Discovery" description="Find magical items instantly with semantic search powered by vector embeddings." delay={0} />
            <FeatureCard icon={<MessageCircle size={24} />} title="Conversational Shopping" description="Ask natural questions and receive grounded answers from product knowledge." delay={0.1} />
            <FeatureCard icon={<Search size={24} />} title="Smart Knowledge Retrieval" description="Powered by retrieval-augmented generation for accurate product insights." delay={0.2} />
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="py-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-8">
          <StatCounter target={42} suffix="+" label="Products Indexed" />
          <StatCounter target={45} suffix="+" label="Knowledge Entries" />
          <StatCounter target={100} suffix="%" label="Grounded AI" />
          <StatSpecial value="<3s" label="Response Time" />
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">How It Works</h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">Three simple steps from curiosity to the perfect magical item</p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* connecting line */}
          <div className="hidden md:block absolute top-10 left-[calc(16.666%+1rem)] right-[calc(16.666%+1rem)] h-px bg-gradient-to-r from-[var(--gold-primary)]/20 via-[var(--gold-primary)]/60 to-[var(--gold-primary)]/20" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', icon: '🔍', title: 'Browse or Ask', desc: 'Browse our catalog or ask the AI anything about wizard products in plain language.' },
              { step: '02', icon: '🧠', title: 'AI Retrieves', desc: 'The AI searches a vector-embedded knowledge base to find the most relevant products.' },
              { step: '03', icon: '✨', title: 'Get Exact Answers', desc: 'Receive grounded, accurate answers — no hallucinations, straight from the product catalog.' },
            ].map(({ step, icon, title, desc }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                className="flex flex-col items-center text-center"
              >
                <div className="relative mb-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-[var(--bg-tertiary)] to-[var(--bg-card)] border border-[var(--gold-primary)]/30 flex items-center justify-center text-3xl shadow-lg">
                    {icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5D76E] text-black text-xs font-bold flex items-center justify-center shadow">
                    {i + 1}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-[var(--gold-muted)] mb-2 tracking-widest">{step}</div>
                <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">{title}</h3>
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED PRODUCTS ── */}
      <section className="py-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="flex items-end justify-between mb-8 flex-wrap gap-4"
        >
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-2">Featured Products</h2>
            <p className="text-[var(--text-secondary)]">Hand-picked magical items from our catalog</p>
          </div>
          <Link href="/products">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-5 py-2.5 text-sm border border-[var(--gold-primary)]/50 text-[var(--gold-primary)] rounded-lg hover:bg-[var(--gold-primary)]/10 transition-all"
            >
              View All →
            </motion.button>
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {FEATURED.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.45 }}
            >
              <Link href="/products">
                <motion.div
                  whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212,175,55,0.15)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                  className="card-shimmer rounded-xl border border-[var(--border-primary)] bg-[var(--bg-card)] overflow-hidden hover:border-[var(--gold-primary)] transition-colors duration-300 cursor-pointer"
                >
                  {/* Image area */}
                  <div className={`relative h-28 bg-gradient-to-br ${p.gradient} flex items-center justify-center overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20" />
                    <span className="text-5xl relative z-10 drop-shadow-lg">{p.emoji}</span>
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                      style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.05) 0%, transparent 60%)' }} />
                  </div>
                  <div className="p-4">
                    <div className="text-xs text-[var(--text-tertiary)] mb-1">{p.category}</div>
                    <h3 className="font-semibold text-[var(--text-primary)] mb-3 leading-snug">{p.name}</h3>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-[var(--gold-primary)]">${p.price.toFixed(2)}</span>
                      <span className="text-xs px-2 py-1 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-[var(--text-tertiary)]">View →</span>
                    </div>
                  </div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">What Wizards Are Saying</h2>
          <p className="text-[var(--text-secondary)]">Trusted by students across all Hogwarts houses</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.45 }}
              whileHover={{ y: -4 }}
              className="p-6 rounded-2xl border border-[var(--border-primary)] bg-[var(--bg-card)] flex flex-col gap-4"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={14} className="text-[var(--gold-primary)] fill-[var(--gold-primary)]" />
                ))}
              </div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#F5D76E] flex items-center justify-center text-black font-bold text-xs">
                  {t.initials}
                </div>
                <div>
                  <div className="text-sm font-semibold text-[var(--text-primary)]">{t.name}</div>
                  <div className="text-xs text-[var(--text-tertiary)]">{t.house}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-6 pb-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-[var(--gold-primary)]/30 bg-gradient-to-r from-[var(--bg-secondary)] via-[var(--bg-tertiary)] to-[var(--bg-secondary)] p-12 text-center overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-[var(--gold-primary)]/5 blur-[80px]" />
          </div>
          <div className="relative z-10">
            <div className="text-4xl mb-4">🔮</div>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-4">Ready to find your magical item?</h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-xl mx-auto">
              Chat with our AI wizard assistant or browse the full catalog. No account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-lg text-lg shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Wand2 size={20} /> Ask the Wizard
                </motion.button>
              </Link>
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold rounded-lg text-lg border border-[var(--border-primary)] hover:border-[var(--gold-primary)] transition-all duration-300"
                >
                  Browse Products
                </motion.button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}

function FeatureCard({ icon, title, description, delay }: { icon: React.ReactNode; title: string; description: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -6 }}
      className="card-shimmer p-6 rounded-xl border border-[var(--border-primary)] bg-[rgba(255,255,255,0.02)] backdrop-blur hover:border-[var(--gold-primary)] hover:shadow-[0_0_30px_rgba(212,175,55,0.15)] transition text-left"
    >
      <div className="text-[var(--gold-primary)] mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">{title}</h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
    </motion.div>
  );
}

function StatCounter({ target, suffix, label }: { target: number; suffix: string; label: string }) {
  const { count, ref } = useCountUp(target);
  return (
    <div ref={ref}>
      <div className="text-4xl font-bold text-[var(--gold-primary)] mb-2">{count}{suffix}</div>
      <div className="text-[var(--text-secondary)] text-sm">{label}</div>
    </div>
  );
}

function StatSpecial({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-4xl font-bold text-[var(--gold-primary)] mb-2"
      >
        {value}
      </motion.div>
      <div className="text-[var(--text-secondary)] text-sm">{label}</div>
    </div>
  );
}

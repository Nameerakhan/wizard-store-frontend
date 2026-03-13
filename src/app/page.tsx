'use client';

import { motion, useInView } from 'framer-motion';
import Link from 'next/link';
import { Wand2, Sparkles, Search, MessageCircle } from 'lucide-react';
import { useRef, useEffect, useState } from 'react';

/* ── Floating hero particles ── */
const PARTICLES = [
  { left: '12%', top: '28%', delay: 0,   size: 5 },
  { left: '78%', top: '18%', delay: 1.4, size: 3 },
  { left: '55%', top: '62%', delay: 0.8, size: 4 },
  { left: '88%', top: '52%', delay: 2.2, size: 3 },
  { left: '22%', top: '72%', delay: 1.6, size: 4 },
];

/* ── Word-by-word typewriter variants ── */
const sentenceVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};
const wordVariant = {
  hidden: { opacity: 0, y: 18, filter: 'blur(4px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.4, ease: 'easeOut' } },
};

/* ── Count-up hook ── */
function useCountUp(target: number, duration = 1800) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = Date.now();
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

export default function HomePage() {
  const line1Words = ['Discover', 'Magical', 'Products'];
  const line2Words = ['with'];

  return (
    <div className="min-h-screen">

      {/* HERO */}
      <section className="relative flex items-center justify-center pt-16 pb-24 overflow-hidden">

        {/* Rotating magical aura */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: 'conic-gradient(from 0deg, transparent 0%, rgba(107,70,193,0.06) 25%, rgba(212,175,55,0.04) 50%, transparent 75%)',
            animation: 'rotateAura 20s linear infinite',
          }}
        />

        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/20 blur-[140px]" />
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

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(212,175,55,0.25)] text-[var(--gold-primary)] text-sm backdrop-blur"
          >
            <Sparkles size={16} />
            AI Powered Wizard Commerce
          </motion.div>

          {/* Typewriter heading */}
          <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight tracking-tight text-white">
            <motion.div
              className="flex flex-wrap justify-center gap-x-4"
              variants={sentenceVariants}
              initial="hidden"
              animate="visible"
            >
              {line1Words.map((word) => (
                <motion.span key={word} variants={wordVariant}>
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
                <motion.span key={word} variants={wordVariant}>
                  {word}
                </motion.span>
              ))}
              <motion.span
                variants={wordVariant}
                className="text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#F5D76E] to-[#D4AF37]"
              >
                AI Intelligence
              </motion.span>
            </motion.div>
          </div>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="max-w-3xl text-lg text-[var(--text-secondary)] leading-relaxed"
          >
            Ask questions, explore magical merchandise, and receive intelligent
            product recommendations powered by an AI wizard assistant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-lg font-semibold text-black bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] shadow-lg hover:shadow-[0_0_25px_rgba(212,175,55,0.5)] transition flex items-center gap-2"
              >
                <Wand2 size={18} />
                Ask the Wizard
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-3 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] hover:border-[var(--gold-primary)] text-[var(--text-primary)] transition"
              >
                Browse Products
              </motion.button>
            </Link>
          </motion.div>

          {/* Feature cards — whileInView */}
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl">
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="AI Product Discovery"
              description="Find magical items instantly with semantic search powered by vector embeddings."
              delay={0}
            />
            <FeatureCard
              icon={<MessageCircle size={24} />}
              title="Conversational Shopping"
              description="Ask natural questions and receive grounded answers from product knowledge."
              delay={0.1}
            />
            <FeatureCard
              icon={<Search size={24} />}
              title="Smart Knowledge Retrieval"
              description="Powered by retrieval-augmented generation for accurate product insights."
              delay={0.2}
            />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-16 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-primary)]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 text-center px-8">
          <StatCounter target={42} suffix="+" label="Products Indexed" />
          <StatCounter target={45} suffix="+" label="Knowledge Entries" />
          <StatCounter target={100} suffix="%" label="Grounded AI" />
          <StatSpecial value="<3s" label="Response Time" />
        </div>
      </section>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
  delay,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}) {
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
      <div className="text-4xl font-bold text-[var(--gold-primary)] mb-2">
        {count}{suffix}
      </div>
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

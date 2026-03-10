'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Wand2, Sparkles, Search, MessageCircle } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)]">

      {/* HERO */}
      <section className="relative flex items-center justify-center pt-32 pb-24 px-6">

        {/* Background Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-32 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-purple-700/20 blur-[140px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto text-center flex flex-col items-center gap-8">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="
            inline-flex items-center gap-2
            px-4 py-2
            rounded-full
            border border-[rgba(212,175,55,0.25)]
            text-[var(--gold-primary)]
            text-sm
            backdrop-blur
            "
          >
            <Sparkles size={16} />
            AI Powered Wizard Commerce
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="
            text-4xl
            sm:text-5xl
            md:text-6xl
            lg:text-7xl
            font-bold
            leading-tight
            tracking-tight
            text-white
            "
          >
            Discover Magical Products
            <br />
            with{' '}
            <span className="
            text-transparent
            bg-clip-text
            bg-gradient-to-r
            from-[#D4AF37]
            via-[#F5D76E]
            to-[#D4AF37]
            ">
              AI Intelligence
            </span>
          </motion.h1>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="
            max-w-2xl
            text-lg
            text-[var(--text-secondary)]
            leading-relaxed
            "
          >
            Ask questions, explore magical merchandise, and receive intelligent
            product recommendations powered by an AI wizard assistant.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-4"
          >

            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="
                px-8 py-3
                rounded-lg
                font-semibold
                text-black
                bg-gradient-to-r
                from-[#D4AF37]
                to-[#F5D76E]
                shadow-lg
                hover:shadow-[0_0_25px_rgba(212,175,55,0.5)]
                transition
                flex items-center gap-2
                "
              >
                <Wand2 size={18} />
                Ask the Wizard
              </motion.button>
            </Link>

            <Link href="/products">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="
                px-8 py-3
                rounded-lg
                border
                border-[var(--border-primary)]
                bg-[var(--bg-tertiary)]
                hover:border-[var(--gold-primary)]
                text-[var(--text-primary)]
                transition
                "
              >
                Browse Products
              </motion.button>
            </Link>

          </motion.div>

          {/* Feature Grid */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="
            mt-14
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            gap-6
            w-full
            "
          >
            <FeatureCard
              icon={<Sparkles size={24} />}
              title="AI Product Discovery"
              description="Find magical items instantly with semantic search powered by vector embeddings."
            />

            <FeatureCard
              icon={<MessageCircle size={24} />}
              title="Conversational Shopping"
              description="Ask natural questions and receive grounded answers from product knowledge."
            />

            <FeatureCard
              icon={<Search size={24} />}
              title="Smart Knowledge Retrieval"
              description="Powered by retrieval-augmented generation for accurate product insights."
            />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-20 px-6 bg-[var(--bg-secondary)]">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">

          <Stat number="42+" label="Products Indexed" />
          <Stat number="45+" label="Knowledge Entries" />
          <Stat number="100%" label="Grounded AI" />
          <Stat number="<3s" label="Response Time" />

        </div>
      </section>

    </main>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className="
      p-6
      rounded-xl
      border
      border-[var(--border-primary)]
      bg-[rgba(255,255,255,0.02)]
      backdrop-blur
      hover:border-[var(--gold-primary)]
      hover:shadow-[0_0_30px_rgba(212,175,55,0.15)]
      transition
      text-left
      "
    >
      <div className="text-[var(--gold-primary)] mb-3">{icon}</div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

function Stat({
  number,
  label,
}: {
  number: string;
  label: string;
}) {
  return (
    <div>
      <div className="text-4xl font-bold text-[var(--gold-primary)] mb-2">
        {number}
      </div>
      <div className="text-[var(--text-secondary)] text-sm">{label}</div>
    </div>
  );
}
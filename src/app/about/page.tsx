'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

// TypeScript interfaces
interface FeatureItemProps {
  icon: string;
  title: string;
  description: string;
}

interface TechItemProps {
  title: string;
  description: string;
}

interface StatItemProps {
  number: string;
  label: string;
}

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[var(--bg-primary)] py-20">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-secondary)] to-[var(--gold-primary)] mb-6">
            About Wizard Store AI
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Your magical shopping companion powered by advanced AI
          </p>
        </motion.header>

        {/* Main Content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="space-y-20"
        >
          {/* What We Do */}
          <motion.section
            variants={fadeInUp}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
          >
            <div>
              <h2 className="text-3xl font-bold text-[var(--gold-primary)] mb-6">
                What We Do
              </h2>
              <p className="text-[var(--text-secondary)] mb-6 leading-relaxed">
                Wizard Store AI helps you discover magical merchandise effortlessly:
              </p>
              <ul className="space-y-4 text-[var(--text-secondary)]">
                <li className="flex items-start gap-3">
                  <span className="text-[var(--gold-primary)] mt-1">•</span>
                  <span>Discover magical products faster using AI-powered semantic search</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--gold-primary)] mt-1">•</span>
                  <span>Ask questions and receive grounded, accurate answers backed by our knowledge base</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[var(--gold-primary)] mt-1">•</span>
                  <span>Get personalized recommendations based on your house preferences and shopping needs</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] p-8 text-center">
              <div className="text-6xl mb-4" aria-hidden="true">🔮</div>
              <p className="text-[var(--text-secondary)] text-sm">
                Powered by advanced RAG technology and vector search
              </p>
            </div>
          </motion.section>

          {/* Features */}
          <motion.section
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
              Key Features
            </h2>
            <p className="text-[var(--text-secondary)] text-center mb-10 max-w-3xl mx-auto">
              Everything you need for an intelligent shopping experience
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <FeatureItem
                icon="🤖"
                title="AI-Powered Search"
                description="Advanced semantic search to find exactly what you need"
              />
              <FeatureItem
                icon="💬"
                title="Natural Conversations"
                description="Chat naturally and get instant, helpful responses"
              />
              <FeatureItem
                icon="📚"
                title="Grounded Responses"
                description="All answers backed by our verified knowledge base"
              />
              <FeatureItem
                icon="🎨"
                title="House Preferences"
                description="Get recommendations based on your Hogwarts house"
              />
              <FeatureItem
                icon="⚡"
                title="Lightning Fast"
                description="Responses in under 3 seconds guaranteed"
              />
              <FeatureItem
                icon="🔒"
                title="Reliable & Accurate"
                description="100% grounded in our product catalog and policies"
              />
            </div>
          </motion.section>

          {/* Technology */}
          <motion.section
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-6 text-center">
              The Technology
            </h2>
            <p className="text-[var(--text-secondary)] text-center mb-10 max-w-3xl mx-auto">
              Built on cutting-edge AI infrastructure
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <TechCard
                title="RAG Architecture"
                description="Context grounded answers using Retrieval Augmented Generation"
              />
              <TechCard
                title="Vector Database"
                description="Semantic similarity search powered by ChromaDB"
              />
              <TechCard
                title="AI Embeddings"
                description="Meaning-based retrieval with GPT-4o-mini"
              />
            </div>
          </motion.section>

          {/* Stats */}
          <motion.section
            variants={fadeInUp}
            className="bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--gold-primary)]/30 p-8"
            aria-labelledby="stats-heading"
          >
            <h2 id="stats-heading" className="sr-only">Platform Statistics</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <StatItem number="42+" label="Products" />
              <StatItem number="45+" label="FAQs" />
              <StatItem number="100%" label="AI Grounded" />
              <StatItem number="<3s" label="Response Time" />
            </div>
          </motion.section>

          {/* CTA */}
          <motion.section
            variants={fadeInUp}
            className="text-center bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--gold-primary)]/30 p-12"
          >
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Ready to Explore Magical Products?
            </h2>
            <p className="text-[var(--text-secondary)] mb-8 max-w-2xl mx-auto">
              Start chatting with our AI assistant and discover the perfect magical merchandise for you
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/chat">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-lg text-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300 inline-flex items-center justify-center gap-2 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
                >
                  <span>Start Chatting</span>
                </motion.button>
              </Link>
              
              <Link href="/products">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-[var(--bg-tertiary)] text-[var(--text-primary)] font-semibold rounded-lg text-lg border-2 border-[var(--border-primary)] hover:border-[var(--gold-primary)] transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[var(--gold-primary)] focus:ring-offset-2 focus:ring-offset-[var(--bg-secondary)]"
                >
                  View Products
                </motion.button>
              </Link>
            </div>
          </motion.section>
        </motion.div>
      </div>
    </main>
  );
}

// Feature Item Component
function FeatureItem({ icon, title, description }: FeatureItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      transition={{ type: "spring", stiffness: 300 }}
      className="flex flex-col p-6 bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] hover:border-[var(--gold-primary)]/40 transition-colors"
    >
      <div className="text-4xl mb-4" aria-hidden="true">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Tech Card Component
function TechCard({ title, description }: TechItemProps) {
  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: '0 10px 30px rgba(0,0,0,0.3)' }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-6 bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--border-primary)] hover:border-[var(--gold-primary)]/40 transition-colors text-center"
    >
      <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3">
        {title}
      </h3>
      <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
}

// Stat Item Component
function StatItem({ number, label }: StatItemProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="p-4"
    >
      <div className="text-3xl sm:text-4xl font-bold text-[var(--gold-primary)] mb-2">
        {number}
      </div>
      <div className="text-[var(--text-secondary)] text-sm">
        {label}
      </div>
    </motion.div>
  );
}

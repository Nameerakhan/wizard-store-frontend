'use client';

import { use, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckCircle2, Package, MapPin, ArrowRight } from 'lucide-react';
import { getGuestOrder } from '@/lib/api';

interface OrderItem {
  product_name: string;
  product_price: number;
  quantity: number;
  line_total: number;
}

interface Order {
  order_id: string;
  status: string;
  subtotal: number;
  shipping_cost: number;
  total: number;
  customer_email: string;
  shipping_address: {
    full_name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  items: OrderItem[];
  created_at: string;
}

/* CSS-only confetti pieces — no library */
const CONFETTI = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  left: `${(i * 4.5 + 3) % 100}%`,
  delay: `${(i * 0.12) % 2}s`,
  duration: `${1.8 + (i % 5) * 0.3}s`,
  color: i % 5 === 0 ? '#d4af37' : i % 5 === 1 ? '#8b5cf6' : i % 5 === 2 ? '#4ade80' : i % 5 === 3 ? '#f472b6' : '#60a5fa',
  size: 6 + (i % 3) * 3,
  rotate: i * 37,
}));

export default function ConfirmationPage({ params }: { params: Promise<{ orderId: string }> }) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confettiVisible, setConfettiVisible] = useState(true);

  useEffect(() => {
    getGuestOrder(orderId)
      .then(setOrder)
      .catch(() => setError('Could not load order details.'))
      .finally(() => setLoading(false));
  }, [orderId]);

  useEffect(() => {
    const t = setTimeout(() => setConfettiVisible(false), 3000);
    return () => clearTimeout(t);
  }, []);

  if (loading) {
    return (
      <div className="py-20 text-center">
        <div className="inline-block w-8 h-8 border-2 border-[var(--gold-primary)] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)] mb-4">{error ?? 'Order not found.'}</p>
        <Link href="/products" className="text-[var(--gold-primary)] hover:underline text-sm">
          Back to Products
        </Link>
      </div>
    );
  }

  const addr = order.shipping_address;

  return (
    <div className="py-10 max-w-2xl mx-auto relative">

      {/* Confetti burst */}
      {confettiVisible && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-[100]" aria-hidden="true">
          {CONFETTI.map((c) => (
            <span
              key={c.id}
              className="absolute top-0 rounded-sm"
              style={{
                left: c.left,
                width: c.size,
                height: c.size,
                backgroundColor: c.color,
                transform: `rotate(${c.rotate}deg)`,
                animation: `confettiFall ${c.duration} ease-in ${c.delay} forwards`,
                opacity: 1,
              }}
            />
          ))}
        </div>
      )}

      {/* Success header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        {/* Animated ring + checkmark */}
        <div className="relative inline-flex items-center justify-center mb-6">
          {/* Outer pulse ring */}
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1.2, delay: 0.3, repeat: 2, repeatType: 'loop' }}
            className="absolute w-28 h-28 rounded-full border-2 border-green-400/40"
          />
          {/* Middle ring */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 14, stiffness: 180, delay: 0.1 }}
            className="absolute w-24 h-24 rounded-full border border-green-500/30 bg-green-500/5"
          />
          {/* Icon circle */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.2 }}
            className="relative w-20 h-20 rounded-full bg-green-500/20 border-2 border-green-500/50 flex items-center justify-center"
          >
            <CheckCircle2 size={40} className="text-green-400" />
          </motion.div>
        </div>

        <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-2">Order Placed! ✨</h1>
        <p className="text-[var(--text-secondary)]">
          Thank you! Your order has been received and is being prepared.
        </p>
        <div className="mt-3 inline-block px-4 py-1.5 rounded-full bg-[var(--bg-tertiary)] border border-[var(--border-primary)] text-xs font-mono text-[var(--text-tertiary)]">
          Order #{order.order_id.slice(0, 8).toUpperCase()}
        </div>
      </motion.div>

      <div className="space-y-4">
        {/* Items */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-primary)]">
            <Package size={15} className="text-[var(--gold-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)] text-sm">Items Ordered</h2>
          </div>
          <ul className="divide-y divide-[var(--border-primary)]">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between px-5 py-3 text-sm">
                <span className="text-[var(--text-secondary)]">{item.product_name} × {item.quantity}</span>
                <span className="font-medium text-[var(--text-primary)]">${Number(item.line_total).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div className="px-5 py-3 bg-[var(--bg-tertiary)] space-y-1 text-sm">
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Subtotal</span><span>${Number(order.subtotal).toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-[var(--text-secondary)]">
              <span>Shipping</span>
              <span className={Number(order.shipping_cost) === 0 ? 'text-green-400' : ''}>
                {Number(order.shipping_cost) === 0 ? 'FREE' : `$${Number(order.shipping_cost).toFixed(2)}`}
              </span>
            </div>
            <div className="flex justify-between font-bold text-[var(--text-primary)] pt-1.5 border-t border-[var(--border-primary)]">
              <span>Total</span><span className="text-[var(--gold-primary)]">${Number(order.total).toFixed(2)}</span>
            </div>
          </div>
        </motion.div>

        {/* Shipping address */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden"
        >
          <div className="flex items-center gap-2 px-5 py-3 border-b border-[var(--border-primary)]">
            <MapPin size={15} className="text-[var(--gold-primary)]" />
            <h2 className="font-semibold text-[var(--text-primary)] text-sm">Shipping To</h2>
          </div>
          <div className="px-5 py-4 text-sm text-[var(--text-secondary)] leading-relaxed">
            <p className="font-semibold text-[var(--text-primary)]">{addr.full_name}</p>
            <p>{addr.line1}{addr.line2 ? `, ${addr.line2}` : ''}</p>
            <p>{addr.city}, {addr.state} {addr.postal_code}</p>
            <p>{addr.country}</p>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.35 }}
        className="mt-8 text-center"
      >
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.5)] transition-all"
          >
            Continue Shopping <ArrowRight size={16} />
          </motion.button>
        </Link>
      </motion.div>
    </div>
  );
}

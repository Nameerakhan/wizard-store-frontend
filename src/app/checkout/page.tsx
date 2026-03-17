'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ShoppingBag, User, MapPin, CheckCircle2, LogIn, UserPlus, AlertTriangle } from 'lucide-react';
import { useCartStore } from '@/lib/store';
import { placeGuestOrder } from '@/lib/api';

const STEPS = [
  { id: 0, label: 'Account', icon: User },
  { id: 1, label: 'Cart Review', icon: ShoppingBag },
  { id: 2, label: 'Your Info', icon: User },
  { id: 3, label: 'Shipping', icon: MapPin },
];

interface FormData {
  fullName: string;
  email: string;
  line1: string;
  line2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCartStore();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [placing, setPlacing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    line1: '',
    line2: '',
    city: '',
    state: '',
    postalCode: '',
    country: 'United States',
  });

  const subtotal = totalPrice();
  const shipping = subtotal >= 75 ? 0 : 9.99;
  const total = subtotal + shipping;

  const set = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [field]: e.target.value }));

  const canProceedStep1 = items.length > 0;
  const canProceedStep2 = form.fullName.trim() && form.email.trim() && form.email.includes('@');
  const canProceedStep3 = form.line1.trim() && form.city.trim() && form.state.trim() && form.postalCode.trim();

  const handlePlaceOrder = async () => {
    setPlacing(true);
    setError(null);
    try {
      const result = await placeGuestOrder({
        customer_name: form.fullName,
        customer_email: form.email,
        shipping_address: {
          full_name: form.fullName,
          line1: form.line1,
          line2: form.line2 || undefined,
          city: form.city,
          state: form.state,
          postal_code: form.postalCode,
          country: form.country,
        },
        items: items.map((i) => ({
          product_name: i.name,
          product_price: i.price,
          quantity: i.quantity,
        })),
      });
      clearCart();
      router.push(`/checkout/confirmation/${result.order_id}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
      setPlacing(false);
    }
  };

  if (items.length === 0 && step === 1) {
    return (
      <div className="py-20 text-center">
        <div className="text-6xl mb-4">🛒</div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-2">Your cart is empty</h1>
        <p className="text-[var(--text-secondary)] mb-6">Add some magical items before checking out.</p>
        <Link href="/products">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-3 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg"
          >
            Browse Products ✨
          </motion.button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-10 max-w-4xl mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {STEPS.map((s, idx) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isDone = s.id < step;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black shadow-lg'
                  : isDone
                  ? 'bg-[var(--gold-primary)]/20 text-[var(--gold-primary)] border border-[var(--gold-primary)]/40'
                  : 'bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] border border-[var(--border-primary)]'
              }`}>
                {isDone ? <CheckCircle2 size={14} /> : <Icon size={14} />}
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {idx < STEPS.length - 1 && (
                <ChevronRight size={14} className="text-[var(--text-tertiary)]" />
              )}
            </div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* ── Step 0: Account Gate ────────────────────────────────────── */}
        {step === 0 && (
          <motion.div key="step0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="max-w-md mx-auto">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-full bg-yellow-500/20 border border-yellow-500/30">
                  <AlertTriangle size={20} className="text-yellow-400" />
                </div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)]">Account Required</h1>
              </div>
              <p className="text-[var(--text-secondary)] mb-8">
                Please sign in or create an account to place your order. This lets us save your order history and send you updates.
              </p>

              <div className="space-y-3">
                <Link href="/auth/signin" className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 w-full px-5 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-xl shadow-lg"
                  >
                    <LogIn size={18} />
                    <div>
                      <p className="font-bold">Sign In</p>
                      <p className="text-xs font-normal opacity-70">I already have an account</p>
                    </div>
                  </motion.div>
                </Link>

                <Link href="/auth/signup" className="block">
                  <motion.div
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-3 w-full px-5 py-4 border-2 border-[var(--gold-primary)] text-[var(--gold-primary)] font-semibold rounded-xl hover:bg-[var(--gold-primary)]/10 transition-colors"
                  >
                    <UserPlus size={18} />
                    <div>
                      <p className="font-bold">Create Account</p>
                      <p className="text-xs font-normal opacity-70">New to Wizard Store</p>
                    </div>
                  </motion.div>
                </Link>

                <div className="relative flex items-center gap-3 py-2">
                  <div className="flex-1 h-px bg-[var(--border-primary)]" />
                  <span className="text-xs text-[var(--text-tertiary)]">or</span>
                  <div className="flex-1 h-px bg-[var(--border-primary)]" />
                </div>

                <button
                  onClick={() => setStep(1)}
                  className="w-full px-5 py-3 border border-[var(--border-primary)] text-[var(--text-tertiary)] rounded-xl text-sm hover:border-[var(--gold-primary)]/40 transition-colors"
                >
                  Continue without account
                  <span className="block text-xs opacity-60 mt-0.5">You won&apos;t be able to view your order history</span>
                </button>
              </div>

              <div className="mt-6 text-center">
                <Link href="/products" className="text-sm text-[var(--text-tertiary)] hover:text-[var(--gold-primary)] transition-colors">
                  ← Back to Products
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* ── Step 1: Cart Review ─────────────────────────────────────── */}
        {step === 1 && (
          <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Review Your Cart</h1>
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden mb-6">
              <ul className="divide-y divide-[var(--border-primary)]">
                {items.map((item) => (
                  <li key={item.productId} className="flex items-center justify-between px-5 py-4">
                    <div>
                      <p className="font-medium text-[var(--text-primary)]">{item.name}</p>
                      <p className="text-sm text-[var(--text-tertiary)] mt-0.5">Qty: {item.quantity}</p>
                    </div>
                    <p className="font-semibold text-[var(--gold-primary)]">${(item.price * item.quantity).toFixed(2)}</p>
                  </li>
                ))}
              </ul>
              <div className="px-5 py-4 bg-[var(--bg-tertiary)] space-y-1.5 text-sm">
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-[var(--text-secondary)]">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-400 font-medium' : ''}>
                    {shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                {subtotal < 75 && (
                  <p className="text-xs text-[var(--text-tertiary)] pt-1">
                    Add ${(75 - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Link href="/products" className="flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--gold-primary)] transition-colors">
                <ChevronLeft size={14} /> Back to Products
              </Link>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setStep(2)}
                disabled={!canProceedStep1}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg shadow-lg disabled:opacity-50"
              >
                Continue <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Step 2: Your Info ───────────────────────────────────────── */}
        {step === 2 && (
          <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Your Information</h1>
            <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 mb-6 space-y-4">
              <Field label="Full Name" value={form.fullName} onChange={set('fullName')} placeholder="Harry Potter" required />
              <Field label="Email Address" type="email" value={form.email} onChange={set('email')} placeholder="harry@hogwarts.edu" required />
              <p className="text-xs text-[var(--text-tertiary)]">You&apos;ll receive your order confirmation at this email address.</p>
            </div>
            <div className="flex items-center justify-between">
              <button onClick={() => setStep(1)} className="flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--gold-primary)] transition-colors">
                <ChevronLeft size={14} /> Back
              </button>
              <motion.button
                whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                onClick={() => setStep(3)}
                disabled={!canProceedStep2}
                className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg shadow-lg disabled:opacity-50"
              >
                Continue <ChevronRight size={16} />
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* ── Step 3: Shipping + Order Review ─────────────────────────── */}
        {step === 3 && (
          <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
            <div className="grid md:grid-cols-2 gap-6">
              {/* Shipping form */}
              <div>
                <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Shipping Address</h1>
                <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] p-6 space-y-4">
                  <Field label="Address Line 1" value={form.line1} onChange={set('line1')} placeholder="4 Privet Drive" required />
                  <Field label="Address Line 2" value={form.line2} onChange={set('line2')} placeholder="Apt, suite, etc. (optional)" />
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="City" value={form.city} onChange={set('city')} placeholder="Little Whinging" required />
                    <Field label="State / Province" value={form.state} onChange={set('state')} placeholder="Surrey" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Field label="Postal Code" value={form.postalCode} onChange={set('postalCode')} placeholder="GU1 2XX" required />
                    <Field label="Country" value={form.country} onChange={set('country')} placeholder="United States" required />
                  </div>
                </div>
              </div>

              {/* Order summary */}
              <div>
                <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">Order Summary</h2>
                <div className="rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] overflow-hidden">
                  <ul className="divide-y divide-[var(--border-primary)]">
                    {items.map((item) => (
                      <li key={item.productId} className="flex justify-between px-4 py-3 text-sm">
                        <span className="text-[var(--text-secondary)] truncate mr-3">{item.name} × {item.quantity}</span>
                        <span className="font-medium text-[var(--text-primary)] whitespace-nowrap">${(item.price * item.quantity).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="px-4 py-3 bg-[var(--bg-tertiary)] space-y-1.5 text-sm">
                    <div className="flex justify-between text-[var(--text-secondary)]">
                      <span>Subtotal</span><span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[var(--text-secondary)]">
                      <span>Shipping</span>
                      <span className={shipping === 0 ? 'text-green-400 font-medium' : ''}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-[var(--text-primary)] text-base pt-2 border-t border-[var(--border-primary)]">
                      <span>Total</span><span className="text-[var(--gold-primary)]">${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                  onClick={handlePlaceOrder}
                  disabled={!canProceedStep3 || placing}
                  className="mt-4 w-full py-3.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-xl shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all disabled:opacity-50 text-base"
                >
                  {placing ? 'Placing Order...' : `Place Order · $${total.toFixed(2)}`}
                </motion.button>
                <p className="text-xs text-[var(--text-tertiary)] text-center mt-2">No payment required — this is a demo order</p>
              </div>
            </div>

            <div className="mt-6">
              <button onClick={() => setStep(2)} className="flex items-center gap-1 text-sm text-[var(--text-tertiary)] hover:text-[var(--gold-primary)] transition-colors">
                <ChevronLeft size={14} /> Back
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  label, value, onChange, placeholder, type = 'text', required = false,
}: {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-[var(--text-secondary)] mb-1.5 uppercase tracking-wide">
        {label}{required && <span className="text-[var(--gold-primary)] ml-0.5">*</span>}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-2.5 rounded-lg border border-[var(--border-primary)] bg-[var(--bg-tertiary)] text-[var(--text-primary)] placeholder-[var(--text-tertiary)] text-sm focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
      />
    </div>
  );
}

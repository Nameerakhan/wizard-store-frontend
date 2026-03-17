'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingBag, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/lib/store';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, totalItems, totalPrice } = useCartStore();
  const router = useRouter();

  const handleCheckout = () => {
    onClose();
    router.push('/checkout');
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full max-w-sm bg-[var(--bg-secondary)] border-l border-[var(--border-primary)] shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border-primary)]">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-[var(--gold-primary)]" />
                <h2 className="font-bold text-[var(--text-primary)] text-lg">
                  Your Cart
                  {totalItems() > 0 && (
                    <span className="ml-2 text-sm font-normal text-[var(--text-tertiary)]">
                      ({totalItems()} {totalItems() === 1 ? 'item' : 'items'})
                    </span>
                  )}
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-tertiary)] text-[var(--text-tertiary)] hover:text-[var(--text-primary)] transition-colors"
                aria-label="Close cart"
              >
                <X size={18} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                  <div className="text-5xl">🛒</div>
                  <p className="text-[var(--text-secondary)] font-medium">Your cart is empty</p>
                  <p className="text-sm text-[var(--text-tertiary)]">Add some magical items to get started</p>
                  <Link href="/products" onClick={onClose}>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="mt-2 px-5 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg text-sm"
                    >
                      Browse Products ✨
                    </motion.button>
                  </Link>
                </div>
              ) : (
                <ul className="space-y-3">
                  {items.map((item) => (
                    <li
                      key={item.productId}
                      className="flex items-center gap-3 p-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-primary)]"
                    >
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-[var(--text-primary)] truncate">{item.name}</p>
                        <p className="text-xs text-[var(--gold-primary)] font-medium mt-0.5">
                          ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>

                      {/* Qty controls */}
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-[var(--bg-tertiary)] hover:bg-[var(--gold-primary)]/20 hover:text-[var(--gold-primary)] transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center rounded-md bg-[var(--bg-tertiary)] hover:bg-[var(--gold-primary)]/20 hover:text-[var(--gold-primary)] transition-colors"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.productId)}
                        className="p-1 text-[var(--text-tertiary)] hover:text-red-400 transition-colors"
                        aria-label={`Remove ${item.name}`}
                      >
                        <X size={14} />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="px-5 py-4 border-t border-[var(--border-primary)] space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[var(--text-secondary)]">Subtotal</span>
                  <span className="font-bold text-[var(--text-primary)] text-base">${totalPrice().toFixed(2)}</span>
                </div>
                {totalPrice() < 75 && (
                  <p className="text-xs text-[var(--text-tertiary)]">
                    Add ${(75 - totalPrice()).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex gap-2">
                  <Link href="/products" onClick={onClose} className="flex-1">
                    <button className="w-full px-4 py-2.5 border border-[var(--border-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--gold-primary)] rounded-lg text-sm font-medium transition-colors">
                      Continue Shopping
                    </button>
                  </Link>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={handleCheckout}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg text-sm shadow-lg"
                  >
                    Checkout <ArrowRight size={14} />
                  </motion.button>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

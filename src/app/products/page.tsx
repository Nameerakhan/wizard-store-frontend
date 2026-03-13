'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import { getProductRecommendations } from '@/lib/api';

interface Product {
  id: string;
  name: string;
  category: string;
  house: string;
  price: number;
  description: string;
  tags: string[];
  stock_status: string;
}

interface ProductCardProps {
  product: Product;
  getHouseColor: (house: string) => string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'Elder Wand Replica', category: 'Wands', house: 'All', price: 49.99, description: 'Authentic replica of the most powerful wand in wizarding history', tags: ['replica', 'collectible'], stock_status: 'In Stock' },
  { id: '2', name: 'Gryffindor House Robe', category: 'Robes', house: 'Gryffindor', price: 89.99, description: 'Official Gryffindor house robe with embroidered crest', tags: ['clothing', 'official'], stock_status: 'In Stock' },
  { id: '3', name: 'Slytherin House Scarf', category: 'Accessories', house: 'Slytherin', price: 29.99, description: 'Warm winter scarf in Slytherin house colors', tags: ['accessories', 'winter'], stock_status: 'In Stock' },
  { id: '4', name: 'Ravenclaw House Robe', category: 'Robes', house: 'Ravenclaw', price: 89.99, description: 'Official Ravenclaw house robe with embroidered crest', tags: ['clothing', 'official'], stock_status: 'In Stock' },
  { id: '5', name: 'Hufflepuff House Scarf', category: 'Accessories', house: 'Hufflepuff', price: 29.99, description: 'Cozy scarf in Hufflepuff house colors', tags: ['accessories', 'winter'], stock_status: 'Low Stock' },
  { id: '6', name: "Marauder's Map", category: 'Collectibles', house: 'All', price: 39.99, description: "Interactive replica of the famous Marauder's Map", tags: ['collectible', 'interactive'], stock_status: 'In Stock' },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedHouse, setSelectedHouse] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Wands', 'Robes', 'Accessories', 'Collectibles'];
  const houses = ['All', 'Gryffindor', 'Slytherin', 'Ravenclaw', 'Hufflepuff'];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductRecommendations('list all available products');
        if (data && data.length > 0) {
          setProducts(
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.map((p: any, i: number) => ({
              id: String(p.id ?? i),
              name: p.name ?? 'Unknown Product',
              category: p.category ?? 'General',
              house: p.house ?? 'All',
              price: p.price ?? 0,
              description: p.description ?? '',
              tags: p.tags ?? [],
              stock_status: p.stock_status ?? 'In Stock',
            }))
          );
        } else {
          setProducts(MOCK_PRODUCTS);
        }
      } catch {
        setProducts(MOCK_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((p) => {
    const catMatch = selectedCategory === 'All' || p.category === selectedCategory;
    const houseMatch = selectedHouse === 'All' || p.house === selectedHouse || p.house === 'All';
    const q = searchQuery.toLowerCase();
    const searchMatch =
      q === '' ||
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.tags.some((t) => t.toLowerCase().includes(q));
    return catMatch && houseMatch && searchMatch;
  });

  const getHouseColor = (house: string): string => {
    const colors: Record<string, string> = {
      Gryffindor: '#740001',
      Slytherin: '#1a472a',
      Ravenclaw: '#0e1a40',
      Hufflepuff: '#ecb939',
    };
    return colors[house] || 'var(--gold-primary)';
  };

  return (
    <div className="py-10">
      {/* Header */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[var(--gold-primary)] via-[var(--gold-secondary)] to-[var(--gold-primary)] mb-4">
          Wizard Products
        </h1>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Discover our magical collection of wizard merchandise - from authentic wands to house robes
        </p>
      </motion.section>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="mb-4 relative"
      >
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products, descriptions, tags…"
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] placeholder-[var(--text-tertiary)] focus:outline-none focus:border-[var(--gold-primary)] transition-colors"
        />
      </motion.div>

      {/* Filters */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        aria-label="Product filters"
        className="mb-6"
      >
        <div className="flex flex-col gap-4 p-4 rounded-xl border border-[var(--border-primary)] bg-[var(--bg-secondary)]">
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap w-20">Category</label>
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  aria-pressed={selectedCategory === cat}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-[var(--bg-primary)] shadow-lg'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--gold-primary)] border border-[var(--border-primary)]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <label className="text-sm font-semibold text-[var(--text-primary)] whitespace-nowrap w-20">House</label>
            <div className="flex flex-wrap gap-2">
              {houses.map((house) => (
                <button
                  key={house}
                  onClick={() => setSelectedHouse(house)}
                  aria-pressed={selectedHouse === house}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-300 whitespace-nowrap ${
                    selectedHouse === house
                      ? 'bg-gradient-to-r from-[var(--gold-primary)] to-[var(--gold-secondary)] text-[var(--bg-primary)] shadow-lg'
                      : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--gold-primary)] border border-[var(--border-primary)]'
                  }`}
                >
                  {house}
                </button>
              ))}
            </div>
          </div>
        </div>
      </motion.section>

      {/* Product count badge */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="mb-6 flex items-center gap-2"
      >
        <span className="text-sm text-[var(--text-tertiary)]">
          Showing{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={filteredProducts.length}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.2 }}
              className="inline-block font-semibold text-[var(--gold-primary)]"
            >
              {filteredProducts.length}
            </motion.span>
          </AnimatePresence>{' '}
          {filteredProducts.length === 1 ? 'product' : 'products'}
        </span>
      </motion.div>

      {/* Products Grid */}
      {loading ? (
        <LoadingState />
      ) : (
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          aria-label="Product catalog"
          className="mb-16"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.length > 0 ? (
              <motion.div layout className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {filteredProducts.map((product) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                  >
                    <ProductCard product={product} getHouseColor={getHouseColor} />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-16"
              >
                <div className="text-6xl mb-4" aria-hidden="true">🔮</div>
                <p className="text-xl text-[var(--text-secondary)]">No products found with these filters</p>
                <button
                  onClick={() => { setSelectedCategory('All'); setSelectedHouse('All'); setSearchQuery(''); }}
                  className="mt-4 text-sm text-[var(--gold-primary)] hover:underline"
                >
                  Clear filters
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>
      )}

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="text-center bg-gradient-to-r from-[var(--bg-secondary)] to-[var(--bg-tertiary)] rounded-xl border border-[var(--gold-primary)]/30 p-8"
      >
        <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-4">Need Help Finding Something?</h2>
        <p className="text-[var(--text-secondary)] mb-6">Our AI assistant can help you find the perfect magical merchandise</p>
        <Link href="/chat">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-bold rounded-lg text-lg shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all duration-300 inline-flex items-center gap-2"
          >
            Ask the Assistant
          </motion.button>
        </Link>
      </motion.section>
    </div>
  );
}

function ProductCard({ product, getHouseColor }: ProductCardProps) {
  return (
    <motion.article
      whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.3), 0 0 30px rgba(212,175,55,0.2)' }}
      transition={{ type: 'spring', stiffness: 300 }}
      className="card-shimmer relative bg-gradient-to-br from-[var(--bg-card)] to-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded-xl overflow-hidden hover:border-[var(--gold-primary)] transition-colors duration-300 group h-full flex flex-col"
    >
      <div className="absolute top-3 right-3 z-10">
        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
          product.stock_status === 'In Stock'
            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
        }`}>
          {product.stock_status}
        </span>
      </div>

      <div className="absolute top-3 left-3 z-10">
        {product.house !== 'All' ? (
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold border inline-block"
            style={{
              backgroundColor: `${getHouseColor(product.house)}40`,
              borderColor: `${getHouseColor(product.house)}60`,
              color: getHouseColor(product.house),
            }}
          >
            {product.house}
          </span>
        ) : (
          <span className="px-3 py-1 rounded-full text-xs font-semibold border bg-[var(--gold-primary)]/20 border-[var(--gold-primary)]/40 text-[var(--gold-primary)] inline-block">
            {product.category}
          </span>
        )}
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-[var(--gold-primary)]/10 via-[var(--gold-primary)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative p-6 flex flex-col h-full">
        <div className="text-4xl mb-4 mt-4" aria-hidden="true">
          {product.category === 'Wands' && '🪄'}
          {product.category === 'Robes' && '🧙‍♂️'}
          {product.category === 'Accessories' && '🧣'}
          {product.category === 'Collectibles' && '📜'}
        </div>
        <div className="flex-grow">
          <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-3 group-hover:text-[var(--gold-primary)] transition-colors leading-snug">
            {product.name}
          </h3>
          <p className="text-sm text-[var(--text-secondary)] opacity-80 mb-4 leading-relaxed">{product.description}</p>
          <div className="flex flex-wrap gap-2">
            {product.tags.slice(0, 2).map((tag) => (
              <span key={tag} className="px-2 py-0.5 bg-[var(--bg-tertiary)] border border-[var(--border-primary)] rounded text-xs text-[var(--text-tertiary)]">
                #{tag}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 pt-4 border-t border-[var(--border-primary)]">
          <div className="flex items-center justify-between gap-4">
            <div className="text-2xl font-bold text-[var(--gold-primary)]">${product.price.toFixed(2)}</div>
            <Link href="/chat">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-gradient-to-r from-[#D4AF37] to-[#F5D76E] text-black font-semibold rounded-lg text-sm shadow-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.6)] transition-all whitespace-nowrap"
                aria-label={`Ask about ${product.name}`}
              >
                Ask About This
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
}

function LoadingState() {
  return (
    <div className="mb-16">
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" role="status" aria-live="polite">
        <span className="sr-only">Loading products...</span>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-[var(--bg-card)] border border-[var(--border-primary)] rounded-xl p-6 animate-pulse" aria-hidden="true">
            <div className="w-16 h-16 bg-[var(--bg-tertiary)] rounded-lg mb-4"></div>
            <div className="h-6 bg-[var(--bg-tertiary)] rounded mb-3 w-3/4"></div>
            <div className="h-4 bg-[var(--bg-tertiary)] rounded mb-2"></div>
            <div className="h-4 bg-[var(--bg-tertiary)] rounded mb-4 w-5/6"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 w-16 bg-[var(--bg-tertiary)] rounded"></div>
              <div className="h-6 w-16 bg-[var(--bg-tertiary)] rounded"></div>
            </div>
            <div className="flex justify-between items-center pt-4 border-t border-[var(--border-primary)]">
              <div className="h-8 w-20 bg-[var(--bg-tertiary)] rounded"></div>
              <div className="h-10 w-32 bg-[var(--bg-tertiary)] rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

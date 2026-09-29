import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, ArrowUpRight } from 'lucide-react';
import { PRODUCTS, type Product } from '../../data/products';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  currency,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  const filtered = query.trim() === ''
    ? PRODUCTS.slice(0, 4)
    : PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(query.toLowerCase()))
      );

  const formatPrice = (p: Product) => {
    if (currency === 'INR') {
      return `₹${p.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${p.priceUSD.toLocaleString('en-US')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#070709]/85 backdrop-blur-xl"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed top-16 left-1/2 -translate-x-1/2 z-50 w-full max-w-2xl px-6"
          >
            <div className="rounded-2xl bg-[#0b0b10] border border-[#d4af37]/40 shadow-2xl p-6 md:p-8">
              
              {/* Search Bar */}
              <div className="relative flex items-center mb-6">
                <Search className="w-5 h-5 text-[#d4af37] absolute left-4" />
                <input
                  type="text"
                  placeholder="Search gold Kundan, emeralds, solitaire rings, bangles..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  autoFocus
                  className="w-full pl-12 pr-10 py-3.5 rounded-xl bg-[#070709] border border-white/10 text-white placeholder-gray-500 font-sans-clean text-sm focus:outline-none focus:border-[#d4af37]"
                />
                <button
                  onClick={onClose}
                  className="absolute right-3 p-1.5 text-gray-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Suggestions / Results */}
              <div className="space-y-4 max-h-[60vh] overflow-y-auto no-scrollbar">
                <span className="text-[10px] font-sans-clean uppercase tracking-widest text-[#d4af37] font-semibold block">
                  {query ? 'SEARCH RESULTS' : 'RECOMMENDED FINE CREATIONS'}
                </span>

                {filtered.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="flex items-center justify-between p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20 hover:border-[#d4af37] transition-all cursor-pointer group"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-14 h-14 rounded-lg object-cover bg-[#070709]"
                      />
                      <div>
                        <h4 className="font-heading-brand text-sm text-white group-hover:text-[#d4af37] transition-colors font-light">
                          {product.name}
                        </h4>
                        <span className="font-sans-clean text-[11px] text-gray-400">
                          {product.category} • {product.goldPurity.split(' ')[0]}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="font-heading-brand text-sm text-gold-gradient font-bold">
                        {formatPrice(product)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

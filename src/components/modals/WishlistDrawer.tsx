import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react';
import type { Product } from '../../data/products';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  currency: 'INR' | 'USD';
  onAddToCart: (product: Product) => void;
  onRemoveFromWishlist: (productId: string) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  currency,
  onAddToCart,
  onRemoveFromWishlist
}) => {
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
            className="fixed inset-0 z-50 bg-[#070709]/80 backdrop-blur-md"
          />

          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0b0b10] border-l border-[#d4af37]/30 flex flex-col justify-between shadow-2xl p-6 md:p-8"
          >
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Heart className="w-5 h-5 text-[#d4af37] fill-[#d4af37]" />
                <h3 className="font-heading-brand text-lg text-white uppercase tracking-widest font-light">
                  SAVED WISHLIST
                </h3>
              </div>
              <button onClick={onClose} className="p-2 text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6 space-y-6 no-scrollbar">
              {wishlistProducts.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <Heart className="w-12 h-12 text-gray-600 mb-4 stroke-1" />
                  <p className="font-serif-luxury text-lg italic mb-2 text-gray-300">Your wishlist is empty.</p>
                  <p className="font-sans-clean text-xs font-light max-w-xs">
                    Save your favorite royal jewellery pieces to review later.
                  </p>
                </div>
              ) : (
                wishlistProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex gap-4 p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20 items-center justify-between"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-16 h-16 rounded-lg object-cover bg-[#070709] border border-white/10"
                    />

                    <div className="flex-1 min-w-0">
                      <h4 className="font-heading-brand text-sm text-white truncate font-light">
                        {product.name}
                      </h4>
                      <span className="font-heading-brand text-xs text-gold-gradient font-bold block mb-1">
                        {formatPrice(product)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          onAddToCart(product);
                          onRemoveFromWishlist(product.id);
                        }}
                        className="p-2.5 rounded-full bg-[#d4af37] text-[#070709] hover:bg-[#e8d08d] transition-colors"
                        title="Move to Bag"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onRemoveFromWishlist(product.id)}
                        className="p-2.5 rounded-full glass-panel-dark text-gray-500 hover:text-red-400"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

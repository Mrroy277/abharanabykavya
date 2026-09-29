import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag, ShieldCheck, ArrowRight } from 'lucide-react';
import type { Product } from '../../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: 'INR' | 'USD';
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const subtotal = items.reduce((acc, item) => {
    const price = currency === 'INR' ? item.product.priceINR : item.product.priceUSD;
    return acc + price * item.quantity;
  }, 0);

  const formatPrice = (amount: number) => {
    if (currency === 'INR') {
      return `₹${amount.toLocaleString('en-IN')}`;
    }
    return `$${amount.toLocaleString('en-US')}`;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#070709]/80 backdrop-blur-md"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-md bg-[#0b0b10] border-l border-[#d4af37]/30 flex flex-col justify-between shadow-2xl p-6 md:p-8"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between pb-6 border-b border-white/10">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-5 h-5 text-[#d4af37]" />
                <h3 className="font-heading-brand text-lg text-white uppercase tracking-widest font-light">
                  YOUR SHOPPING BAG
                </h3>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Close cart"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Item List */}
            <div className="flex-1 overflow-y-auto py-6 space-y-6 no-scrollbar">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400">
                  <ShoppingBag className="w-12 h-12 text-gray-600 mb-4 stroke-1" />
                  <p className="font-serif-luxury text-lg italic mb-2 text-gray-300">Your bag is empty.</p>
                  <p className="font-sans-clean text-xs font-light max-w-xs">
                    Explore our fine jewellery collections to select handcrafted heirloom pieces.
                  </p>
                </div>
              ) : (
                items.map(({ product, quantity }) => (
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
                      <span className="font-sans-clean text-[10px] text-[#d4af37] block mb-2">
                        {product.goldPurity}
                      </span>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(product.id, Math.max(1, quantity - 1))}
                          className="w-5 h-5 rounded border border-white/20 text-xs text-gray-300 hover:border-[#d4af37]"
                        >
                          -
                        </button>
                        <span className="text-xs text-white font-bold">{quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                          className="w-5 h-5 rounded border border-white/20 text-xs text-gray-300 hover:border-[#d4af37]"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col items-end gap-2">
                      <span className="font-heading-brand text-sm text-gold-gradient font-bold">
                        {formatPrice((currency === 'INR' ? product.priceINR : product.priceUSD) * quantity)}
                      </span>
                      <button
                        onClick={() => onRemoveItem(product.id)}
                        className="text-gray-500 hover:text-red-400 transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer Subtotal & Checkout */}
            {items.length > 0 && (
              <div className="pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-sans-clean text-xs text-gray-400 uppercase tracking-wider">Subtotal</span>
                  <span className="font-heading-brand text-2xl text-gold-gradient font-bold">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center gap-2 p-3 rounded-lg glass-panel-dark text-[11px] text-[#e8d08d]">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Complimentary Insured Courier & White-Glove Box</span>
                </div>

                <button
                  onClick={() => alert('Proceeding to Secure Royal Checkout...')}
                  className="w-full py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] font-sans-clean text-xs tracking-[0.2em] font-bold uppercase hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
                >
                  PROCEED TO SECURE CHECKOUT
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

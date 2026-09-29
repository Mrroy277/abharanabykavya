import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, ShoppingBag, Sparkles, Check, Box, Image as ImageIcon } from 'lucide-react';
import type { Product } from '../../data/products';
import { PhotorealisticStudioViewer } from '../3d/PhotorealisticStudioViewer';

interface ProductDetailModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  currency: 'INR' | 'USD';
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  currency,
  isWishlisted,
  onToggleWishlist,
  onAddToCart
}) => {
  const [addedNotice, setAddedNotice] = useState(false);
  const [viewMode, setViewMode] = useState<'3d' | 'photo'>('3d');

  if (!product) return null;

  const priceFormatted = currency === 'INR'
    ? `₹${product.priceINR.toLocaleString('en-IN')}`
    : `$${product.priceUSD.toLocaleString('en-US')}`;

  const handleAddCart = () => {
    onAddToCart(product);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#070709]/90 backdrop-blur-xl"
          />

          {/* Luxury Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-4 md:inset-8 lg:inset-12 z-50 rounded-3xl bg-[#0b0b10] border border-[#d4af37]/40 shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto my-auto max-h-[90vh]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-5 right-5 z-40 p-2.5 rounded-full glass-panel-dark text-gray-400 hover:text-white hover:border-[#d4af37] transition-all"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {/* View Mode Toggle Header */}
            <div className="absolute top-5 left-5 z-40 flex items-center gap-2 p-1 rounded-full glass-panel-dark border border-[#d4af37]/30">
              <button
                onClick={() => setViewMode('3d')}
                className={`px-3 py-1.5 rounded-full text-xs font-sans-clean tracking-wider uppercase font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === '3d'
                    ? 'bg-[#d4af37] text-[#070709] shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                3D Interactive Inspector
              </button>
              <button
                onClick={() => setViewMode('photo')}
                className={`px-3 py-1.5 rounded-full text-xs font-sans-clean tracking-wider uppercase font-semibold flex items-center gap-1.5 transition-all ${
                  viewMode === 'photo'
                    ? 'bg-[#d4af37] text-[#070709] shadow-[0_0_12px_rgba(212,175,55,0.5)]'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                Studio Photo
              </button>
            </div>

            {/* Left Column: Photorealistic 3D Inspector / Studio Photo */}
            <div className="lg:w-7/12 h-[420px] lg:h-full relative bg-[#070709] flex items-center justify-center p-4">
              {viewMode === '3d' ? (
                <PhotorealisticStudioViewer
                  product={product}
                  className="w-full h-full rounded-2xl"
                />
              ) : (
                <div className="relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center p-6 bg-radial-dark border border-[#d4af37]/20">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.9)]"
                  />
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark text-xs text-gray-300 border border-[#d4af37]/20">
                    <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                    Studio Lighting Portrait
                  </div>
                </div>
              )}
            </div>

            {/* Right Column: Full Specifications & Purchase Actions */}
            <div className="lg:w-5/12 p-6 lg:p-10 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#0b0b10] border-t lg:border-t-0 lg:border-l border-white/10">
              <div>
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark border border-[#d4af37]/30 w-fit mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#e8d08d]">
                    ATELIER LUXURY SPECIFICATION
                  </span>
                </div>

                <h2 className="font-heading-brand text-2xl lg:text-3xl text-[#fcfaf7] uppercase tracking-wide font-light mb-2">
                  {product.name}
                </h2>

                <p className="font-serif-luxury text-lg text-[#f5ebd9]/90 italic font-light mb-4">
                  {product.subtitle}
                </p>

                <p className="font-sans-clean text-xs text-gray-300 leading-relaxed font-light mb-6">
                  {product.description} {product.craftsmanshipDetails}
                </p>

                {/* Specs Cards Grid */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20">
                    <span className="font-sans-clean text-[10px] text-gray-400 uppercase block mb-1">Gold Purity</span>
                    <span className="font-sans-clean text-xs font-semibold text-white">{product.goldPurity}</span>
                  </div>

                  <div className="p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20">
                    <span className="font-sans-clean text-[10px] text-gray-400 uppercase block mb-1">Gross Weight</span>
                    <span className="font-sans-clean text-xs font-semibold text-white">{product.weight}</span>
                  </div>

                  {product.diamondClarity && (
                    <div className="col-span-2 p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20">
                      <span className="font-sans-clean text-[10px] text-gray-400 uppercase block mb-1">Diamonds & Gemstones</span>
                      <span className="font-sans-clean text-xs font-semibold text-[#e8d08d]">{product.diamondClarity}</span>
                    </div>
                  )}
                </div>

                {/* Assurance Badges */}
                <div className="p-3 rounded-xl bg-[#d4af37]/[0.06] border border-[#d4af37]/20 flex items-center justify-between text-[11px] text-gray-300 font-sans-clean mb-6">
                  <span>✨ 100% BIS Hallmarked 22K Gold</span>
                  <span>🔒 Insured Delivery</span>
                </div>
              </div>

              {/* Price & Purchase Actions */}
              <div className="pt-4 border-t border-white/10 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-400 font-sans-clean uppercase block">Price (Inc. Taxes & Duties)</span>
                    <span className="font-heading-brand text-2xl lg:text-3xl text-gold-gradient font-bold">
                      {priceFormatted}
                    </span>
                  </div>

                  <button
                    onClick={() => onToggleWishlist(product)}
                    className={`p-3 rounded-full border transition-all ${
                      isWishlisted
                        ? 'border-[#d4af37] bg-[#d4af37] text-[#070709]'
                        : 'border-white/20 glass-panel-dark text-white hover:text-[#d4af37]'
                    }`}
                    aria-label="Wishlist"
                  >
                    <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-[#070709]' : ''}`} />
                  </button>
                </div>

                <button
                  onClick={handleAddCart}
                  className={`w-full py-4 rounded-full font-sans-clean text-xs tracking-[0.2em] font-bold uppercase transition-all flex items-center justify-center gap-2 shadow-xl ${
                    addedNotice
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] hover:brightness-110 shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  {addedNotice ? (
                    <>
                      <Check className="w-4 h-4" />
                      ADDED TO SHOPPING BAG
                    </>
                  ) : (
                    <>
                      <ShoppingBag className="w-4 h-4" />
                      ADD TO SHOPPING BAG
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, type Product } from '../../data/products';
import { ShieldCheck, Award, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';

interface CinematicProductProps {
  currency: 'INR' | 'USD';
  onAddToCart: (product: Product) => void;
  onOpenCustomizer: (product: Product) => void;
}

export const CinematicProductSection: React.FC<CinematicProductProps> = ({
  currency,
  onAddToCart,
  onOpenCustomizer
}) => {
  const heroProduct = PRODUCTS[0]; // Royal Maharani Emerald Choker
  const [isHovered, setIsHovered] = useState(false);

  const priceFormatted = currency === 'INR'
    ? `₹${heroProduct.priceINR.toLocaleString('en-IN')}`
    : `$${heroProduct.priceUSD.toLocaleString('en-US')}`;

  // Multiple product views using our real images
  const productImages = [
    { src: '/assets/maharani_necklace_real.jpg', label: 'Front View' },
    { src: '/assets/hero_necklace_premium.jpg', label: 'Detail View' },
    { src: '/assets/maharani_necklace.jpg', label: 'Studio Shot' },
  ];

  const [activeView, setActiveView] = useState(0);

  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#070709] via-[#0f0f18] to-[#070709] border-t border-[#d4af37]/20 overflow-hidden">
      
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#d4af37]/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#d4af37]/[0.06] rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Top Section Badge */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel-dark border border-[#d4af37]/40 mb-3">
            <Sparkles className="w-4 h-4 text-[#d4af37]" />
            <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#e8d08d] font-medium">
              CINEMATIC MASTERPIECE SPOTLIGHT
            </span>
          </div>
          <h2 className="font-heading-brand text-3xl sm:text-5xl lg:text-6xl text-[#fcfaf7] uppercase tracking-wider font-light">
            THE HERITAGE MAHARANI HARAM
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Premium Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="lg:col-span-7"
          >
            <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c0c12] via-[#070709] to-[#12121c] border border-[#d4af37]/20 shadow-2xl group">
              
              {/* Main Image Display */}
              <div 
                className="relative h-[520px] md:h-[600px] w-full overflow-hidden cursor-pointer"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <motion.img
                  key={activeView}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: isHovered ? 1.08 : 1 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  src={productImages[activeView].src}
                  alt={`${heroProduct.name} — ${productImages[activeView].label}`}
                  className="w-full h-full object-cover"
                />
                
                {/* Subtle gold reflection overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-t from-[#d4af37]/[0.06] via-transparent to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

                {/* Bottom gradient for text readability */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-[#070709]/80 to-transparent" />
              </div>

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark text-xs font-sans-clean text-[#e8d08d] border border-[#d4af37]/30">
                <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
                <span className="font-medium tracking-wider uppercase">Studio Showcase</span>
              </div>

              {/* View Switcher Thumbnails */}
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {productImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveView(idx)}
                      className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300 ${
                        activeView === idx
                          ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.4)] scale-105'
                          : 'border-white/10 opacity-60 hover:opacity-90 hover:border-white/30'
                      }`}
                    >
                      <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => onOpenCustomizer(heroProduct)}
                  className="p-2.5 rounded-full glass-panel-dark border border-[#d4af37]/30 text-[#d4af37] hover:bg-[#d4af37]/15 transition-all"
                  title="View Full Screen"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Detailed Story & Specifications */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 flex flex-col items-start"
          >
            <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-2">
              ROYAL COLLECTION • EDITION 01
            </span>

            <h3 className="font-heading-brand text-3xl md:text-4xl text-[#fcfaf7] uppercase tracking-wide font-light mb-4">
              {heroProduct.name}
            </h3>

            <p className="font-serif-luxury text-xl text-[#f5ebd9]/90 italic font-light mb-6">
              "A celebration of timeless Indian craftsmanship, reimagined for the modern woman."
            </p>

            <p className="font-sans-clean text-sm text-gray-300 leading-relaxed font-light mb-8">
              {heroProduct.description} {heroProduct.craftsmanshipDetails}
            </p>

            {/* Spec Cards */}
            <div className="grid grid-cols-2 gap-4 w-full mb-8">
              <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20">
                <ShieldCheck className="w-5 h-5 text-[#d4af37] mb-2" />
                <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400 block">Purity</span>
                <span className="text-xs font-semibold text-white font-sans-clean">{heroProduct.goldPurity}</span>
              </div>

              <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20">
                <Award className="w-5 h-5 text-[#d4af37] mb-2" />
                <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400 block">Diamonds</span>
                <span className="text-xs font-semibold text-white font-sans-clean">{heroProduct.diamondClarity}</span>
              </div>
            </div>

            {/* Price & Primary Action */}
            <div className="w-full flex items-center justify-between pt-6 border-t border-white/10">
              <div>
                <span className="text-xs text-gray-400 font-sans-clean uppercase block">Price</span>
                <span className="font-heading-brand text-2xl md:text-3xl text-gold-gradient font-bold">
                  {priceFormatted}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => onOpenCustomizer(heroProduct)}
                  className="px-5 py-3 rounded-full glass-panel-dark border border-[#d4af37]/40 text-[#fcfaf7] font-sans-clean text-xs uppercase tracking-wider hover:border-[#d4af37] transition-all"
                >
                  VIEW DETAIL
                </button>

                <button
                  onClick={() => onAddToCart(heroProduct)}
                  className="px-6 py-3 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] font-sans-clean text-xs uppercase tracking-wider font-bold shadow-[0_0_25px_rgba(212,175,55,0.3)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all flex items-center gap-2"
                >
                  RESERVE PIECE
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};

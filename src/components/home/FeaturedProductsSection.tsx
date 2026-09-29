import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { PRODUCTS, type Product } from '../../data/products';
import { Heart, Eye, ShoppingBag, Check } from 'lucide-react';

interface FeaturedProductsProps {
  currency: 'INR' | 'USD';
  wishlistIds: string[];
  onToggleWishlist: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onQuickInspect: (product: Product) => void;
}

export const FeaturedProductsSection: React.FC<FeaturedProductsProps> = ({
  currency,
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onQuickInspect
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [addedItemNotice, setAddedItemNotice] = useState<string | null>(null);

  const categories = ['All', 'Bridal', 'Necklaces', 'Earrings', 'Bangles', 'Rings', 'Everyday Elegance'];

  const filteredProducts = activeCategory === 'All'
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const formatPrice = (p: Product) => {
    if (currency === 'INR') {
      return `₹${p.priceINR.toLocaleString('en-IN')}`;
    }
    return `$${p.priceUSD.toLocaleString('en-US')}`;
  };

  const handleAddCart = (product: Product) => {
    onAddToCart(product);
    setAddedItemNotice(product.id);
    setTimeout(() => setAddedItemNotice(null), 2000);
  };

  return (
    <section id="featured" className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#070709] via-[#0b0b10] to-[#070709] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Title */}
        <div className="flex flex-col items-center text-center mb-12">
          <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-3">
            EXQUISITE CRAFTSMANSHIP
          </span>
          <h2 className="font-heading-brand text-3xl sm:text-5xl text-[#fcfaf7] uppercase tracking-wider font-light mb-4">
            FEATURED PIECES
          </h2>
          <p className="font-serif-luxury text-xl text-[#f5ebd9]/80 italic max-w-lg">
            Rare 22K hallmarked gold & certified gemstone creations.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full font-sans-clean text-xs tracking-wider uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-[#d4af37] text-[#070709] font-bold shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                  : 'glass-panel-dark text-gray-300 hover:text-white border border-[#d4af37]/20 hover:border-[#d4af37]/50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, idx) => {
            const isWishlisted = wishlistIds.includes(product.id);
            const isJustAdded = addedItemNotice === product.id;

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group relative rounded-2xl overflow-hidden glass-panel-dark border border-[#d4af37]/20 hover:border-[#d4af37]/60 transition-all duration-500 flex flex-col justify-between"
              >
                {/* Product Image Box */}
                <div className="relative aspect-square overflow-hidden bg-[#0c0c12]">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60" />

                  {/* Top Floating Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                    <span className="px-3 py-1 rounded-full bg-[#070709]/80 backdrop-blur-md border border-[#d4af37]/30 text-[10px] font-sans-clean font-semibold tracking-widest text-[#d4af37] uppercase">
                      {product.goldPurity.split(' ')[0]} GOLD
                    </span>

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product)}
                      className={`p-2.5 rounded-full backdrop-blur-md transition-all ${
                        isWishlisted
                          ? 'bg-[#d4af37] text-[#070709]'
                          : 'bg-[#070709]/70 text-white hover:text-[#d4af37]'
                      }`}
                      aria-label="Add to Wishlist"
                    >
                      <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-[#070709]' : ''}`} />
                    </button>
                  </div>

                  {/* Quick 3D Inspect Hover Overlay */}
                  <div className="absolute inset-0 bg-[#070709]/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                    <button
                      onClick={() => onQuickInspect(product)}
                      className="px-4 py-2.5 rounded-full bg-white text-[#070709] font-sans-clean text-xs font-bold tracking-wider flex items-center gap-2 hover:bg-[#d4af37] transition-colors shadow-lg"
                    >
                      <Eye className="w-4 h-4" />
                      3D INSPECT
                    </button>
                  </div>
                </div>

                {/* Product Info Footer */}
                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="font-sans-clean text-[10px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold block mb-1">
                      {product.category}
                    </span>
                    <h3 className="font-heading-brand text-xl text-[#fcfaf7] uppercase tracking-wide font-light mb-2">
                      {product.name}
                    </h3>
                    <p className="font-sans-clean text-xs text-gray-400 font-light line-clamp-2 mb-4">
                      {product.subtitle}
                    </p>
                  </div>

                  {/* Pricing & Add to Bag */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="font-sans-clean text-[10px] text-gray-400 block uppercase">Price</span>
                      <span className="font-heading-brand text-lg text-gold-gradient font-bold">
                        {formatPrice(product)}
                      </span>
                    </div>

                    <button
                      onClick={() => handleAddCart(product)}
                      className={`px-4 py-2.5 rounded-full font-sans-clean text-xs font-bold tracking-wider flex items-center gap-2 transition-all shadow-md ${
                        isJustAdded
                          ? 'bg-emerald-600 text-white'
                          : 'bg-gradient-to-r from-[#d4af37] to-[#b89225] text-[#070709] hover:brightness-110'
                      }`}
                    >
                      {isJustAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          ADDED
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-3.5 h-3.5" />
                          ADD TO BAG
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

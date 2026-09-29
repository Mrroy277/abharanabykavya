import React from 'react';
import { CATEGORIES } from '../../data/products';
import { CurvedHorizontalCarousel } from '../common/CurvedHorizontalCarousel';

interface CollectionSectionProps {
  onSelectCategory: (categoryId: string) => void;
}

export const CollectionSection: React.FC<CollectionSectionProps> = ({ onSelectCategory }) => {
  return (
    <section id="collections" className="relative py-28 bg-[#070709] border-t border-[#d4af37]/15 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-6">
          <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-3">
            ROYAL HERITAGE CURATIONS
          </span>
          <h2 className="font-heading-brand text-3xl sm:text-5xl lg:text-6xl text-[#fcfaf7] uppercase tracking-wider font-light mb-4">
            THE COLLECTION SHOWCASE
          </h2>
          <p className="font-serif-luxury text-xl sm:text-2xl text-[#f5ebd9]/80 italic max-w-xl">
            “CRAFTED TO BECOME PART OF YOUR STORY.”
          </p>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-6" />
        </div>

      </div>

      {/* Curved 3D Horizontal Carousel Slider */}
      <CurvedHorizontalCarousel
        items={CATEGORIES}
        onSelectCategory={onSelectCategory}
      />
    </section>
  );
};

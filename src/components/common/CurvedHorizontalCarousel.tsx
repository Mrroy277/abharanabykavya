import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import type { CategoryCardData } from '../../data/products';

interface CurvedHorizontalCarouselProps {
  items: CategoryCardData[];
  onSelectCategory?: (slug: string) => void;
}

export const CurvedHorizontalCarousel: React.FC<CurvedHorizontalCarouselProps> = ({
  items,
  onSelectCategory
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleScroll = () => {
    if (!containerRef.current) return;
    const { scrollLeft } = containerRef.current;
    setScrollX(scrollLeft);
    const centerIdx = Math.round(scrollLeft / 320);
    setActiveIndex(Math.min(items.length - 1, Math.max(0, centerIdx)));
  };

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.addEventListener('scroll', handleScroll, { passive: true });
      return () => el.removeEventListener('scroll', handleScroll);
    }
  }, [items]);

  const scrollBy = (offset: number) => {
    if (containerRef.current) {
      containerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative w-full py-8">
      {/* Scroll Controls Navigation Buttons */}
      <div className="absolute -top-14 right-6 z-20 flex items-center gap-3">
        <button
          onClick={() => scrollBy(-360)}
          className="p-3 rounded-full glass-panel-dark border border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 shadow-lg"
          aria-label="Previous Collection"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => scrollBy(360)}
          className="p-3 rounded-full glass-panel-dark border border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] hover:border-[#d4af37] transition-all duration-300 shadow-lg"
          aria-label="Next Collection"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 3D Perspective Curved Container */}
      <div
        ref={containerRef}
        className="flex items-center gap-6 overflow-x-auto no-scrollbar px-6 md:px-16 py-8 snap-x snap-mandatory"
        style={{ perspective: '1200px' }}
      >
        {items.map((cat, idx) => {
          // Calculate relative position to active centered item for 3D curve rotation
          const cardWidth = 320;
          const cardCenter = idx * cardWidth;
          const distanceFromCenter = Math.abs(scrollX - cardCenter);
          const maxDistance = 600;
          const relativeOffset = Math.min(1, distanceFromCenter / maxDistance);

          // 3D Curve Math: Rotate Y based on side position, scale down edges
          const isLeft = scrollX > cardCenter;
          const rotateY = isLeft ? Math.min(22, (scrollX - cardCenter) * 0.08) : Math.max(-22, (scrollX - cardCenter) * 0.08);
          const scale = Math.max(0.88, 1.05 - relativeOffset * 0.18);
          const opacity = Math.max(0.65, 1 - relativeOffset * 0.35);

          const isSelected = activeIndex === idx;

          return (
            <motion.div
              key={cat.id}
              onClick={() => onSelectCategory?.(cat.slug)}
              className="snap-center shrink-0 w-[290px] sm:w-[340px] cursor-pointer"
              style={{
                transform: `rotateY(${rotateY}deg) scale(${scale})`,
                opacity: opacity,
                transformStyle: 'preserve-3d',
                transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease'
              }}
            >
              <div
                className={`relative h-[440px] rounded-3xl overflow-hidden glass-panel-dark border transition-all duration-500 group shadow-2xl ${
                  isSelected
                    ? 'border-[#d4af37] shadow-[0_0_35px_rgba(212,175,55,0.35)] scale-[1.02]'
                    : 'border-[#d4af37]/20 hover:border-[#d4af37]/60'
                }`}
              >
                {/* Background Image with Dynamic Parallax & Zoom */}
                <div className="absolute inset-0 overflow-hidden bg-[#070709]">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/40 to-transparent" />
                </div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full glass-panel-dark border border-[#d4af37]/30 text-[10px] font-sans-clean font-semibold tracking-widest text-[#d4af37] uppercase">
                    {cat.count} PIECES
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col justify-end">
                  <span className="font-sans-clean text-[10px] uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-1">
                    EDITORIAL CURATION
                  </span>
                  <h3 className="font-heading-brand text-2xl text-[#fcfaf7] uppercase tracking-wide font-light mb-2 group-hover:text-[#f7e7c4] transition-colors">
                    {cat.title}
                  </h3>
                  <p className="font-serif-luxury text-sm text-gray-300 italic line-clamp-2 mb-4 font-light">
                    {cat.subtitle}
                  </p>

                  <div className="flex items-center gap-2 text-xs font-sans-clean font-bold tracking-widest text-[#d4af37] uppercase group-hover:translate-x-1 transition-transform">
                    <span>Explore Collection</span>
                    <Sparkles className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

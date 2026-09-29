import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TESTIMONIALS } from '../../data/products';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';

export const TestimonialsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const item = TESTIMONIALS[currentIndex];

  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#070709] via-[#0b0b10] to-[#070709] border-t border-[#d4af37]/15 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <Quote className="w-12 h-12 text-[#d4af37]/40 mb-6" />

        <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-8">
          PATRON VOICES & WORDS OF PRAISE
        </span>

        {/* Carousel Container */}
        <div className="relative min-h-[180px] flex items-center justify-center w-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col items-center"
            >
              <p className="font-serif-luxury text-2xl md:text-3xl lg:text-4xl text-[#fcfaf7] italic leading-relaxed font-light mb-8">
                “{item.quote}”
              </p>

              <h4 className="font-heading-brand text-lg text-gold-gradient uppercase tracking-widest font-semibold">
                {item.author}
              </h4>
              <span className="font-sans-clean text-xs text-gray-400 font-light mt-1">
                {item.role} • {item.location}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-4 mt-10">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full glass-panel-dark border border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] transition-colors"
            aria-label="Previous quote"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all ${
                  idx === currentIndex ? 'w-8 bg-[#d4af37]' : 'w-2 bg-white/20'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={handleNext}
            className="p-3 rounded-full glass-panel-dark border border-[#d4af37]/30 text-gray-300 hover:text-[#d4af37] transition-colors"
            aria-label="Next quote"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

      </div>
    </section>
  );
};

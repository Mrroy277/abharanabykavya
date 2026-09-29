import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

interface FinalCTASectionProps {
  onExploreClick: () => void;
}

/* Lightweight CSS-only floating gold particles for background ambiance */
const FloatingOrbs: React.FC = () => {
  const orbs = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${5 + Math.random() * 90}%`,
    top: `${5 + Math.random() * 90}%`,
    size: 2 + Math.random() * 5,
    delay: Math.random() * 8,
    duration: 5 + Math.random() * 7,
    opacity: 0.1 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {orbs.map((o) => (
        <span
          key={o.id}
          className="absolute rounded-full animate-sparkle-float"
          style={{
            left: o.left,
            top: o.top,
            width: o.size,
            height: o.size,
            background: `radial-gradient(circle, #f7e7c4, #d4af37)`,
            opacity: o.opacity,
            animationDelay: `${o.delay}s`,
            animationDuration: `${o.duration}s`,
            boxShadow: `0 0 ${o.size * 4}px rgba(212,175,55,0.5)`,
          }}
        />
      ))}
    </div>
  );
};

export const FinalCTASection: React.FC<FinalCTASectionProps> = ({ onExploreClick }) => {
  return (
    <section className="relative py-32 px-6 md:px-12 bg-[#070709] border-t border-[#d4af37]/20 overflow-hidden flex items-center justify-center min-h-[70vh]">
      
      {/* Background: Subtle ring image at low opacity */}
      <div className="absolute inset-0 z-0 flex items-center justify-center opacity-[0.12] pointer-events-none">
        <img
          src="/assets/celestial_ring_real.jpg"
          alt=""
          className="w-[500px] h-[500px] object-contain animate-float-hero blur-[1px]"
          aria-hidden="true"
        />
      </div>

      {/* Radial ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/[0.06] rounded-full blur-[140px] pointer-events-none" />

      {/* CSS Gold Particles */}
      <FloatingOrbs />

      {/* Content Overlay */}
      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="font-sans-clean text-xs uppercase tracking-[0.4em] text-[#d4af37] font-semibold mb-4"
        >
          BECOME PART OF OUR LEGACY
        </motion.span>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.1 }}
          className="font-heading-brand text-4xl sm:text-6xl lg:text-7xl text-[#fcfaf7] uppercase tracking-wider font-light mb-6"
        >
          YOUR NEXT STORY <br />
          <span className="text-gold-gradient font-normal">STARTS HERE.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif-luxury text-xl sm:text-2xl text-[#f5ebd9]/90 italic max-w-2xl font-light mb-10"
        >
          Discover jewellery designed to become part of your most unforgettable moments.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          onClick={onExploreClick}
          className="group relative px-9 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] font-sans-clean text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-3"
        >
          <span>EXPLORE COLLECTION</span>
          <ArrowUpRight className="w-4 h-4 text-[#070709] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>

      </div>
    </section>
  );
};

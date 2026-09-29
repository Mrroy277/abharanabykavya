import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Sparkles as SparkleIcon } from 'lucide-react';

interface HeroSectionProps {
  onExploreClick: () => void;
  onStoryClick: () => void;
}

/* CSS-only sparkle particles */
const GoldParticles: React.FC = () => {
  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 1.5 + Math.random() * 3,
    delay: Math.random() * 6,
    duration: 4 + Math.random() * 5,
    opacity: 0.15 + Math.random() * 0.45,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full animate-sparkle-float"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: `radial-gradient(circle, #f7e7c4, #d4af37)`,
            opacity: p.opacity,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            boxShadow: `0 0 ${p.size * 3}px rgba(212,175,55,0.6)`,
          }}
        />
      ))}
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onStoryClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const img = new Image();
    img.src = '/assets/hero_necklace_premium.jpg';
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section id="hero" className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-[#070709]">
      
      {/* Background Ambient Layers */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.12)_0%,rgba(15,15,21,0.7)_45%,#070709_100%)] pointer-events-none z-[1]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-[#d4af37]/[0.06] rounded-full blur-[180px] pointer-events-none z-[1]" />

      {/* Gold Shimmer Line at Top */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37]/50 to-transparent z-[3]" />

      {/* Photorealistic Hero Jewellery Image */}
      <motion.div
        initial={{ opacity: 0, scale: 1.08 }}
        animate={imageLoaded ? { opacity: 1, scale: 1 } : {}}
        transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0 z-[2] flex items-center justify-center"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          {/* The Hero Jewellery Image with Premium Treatment */}
          <div className="relative w-[85vw] max-w-[900px] aspect-[16/10] animate-float-hero">
            <img
              src="/assets/hero_necklace_premium.jpg"
              alt="Royal Maharani Emerald Gold Choker — ABHARANA BY KAVYA Signature Collection"
              className="w-full h-full object-contain drop-shadow-[0_20px_60px_rgba(212,175,55,0.25)] select-none"
              draggable={false}
              loading="eager"
            />
            {/* Golden glow underneath the jewellery */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[70%] h-[40%] bg-[#d4af37]/[0.08] rounded-full blur-[80px] pointer-events-none" />
          </div>
        </div>
      </motion.div>

      {/* CSS Gold Sparkle Particles */}
      <GoldParticles />

      {/* Dark Vignette Overlay for Crisp Readability */}
      <div className="absolute inset-0 z-[8] pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(7,7,9,0.75) 0%, rgba(7,7,9,0.2) 35%, rgba(7,7,9,0.2) 55%, rgba(7,7,9,0.7) 80%, rgba(7,7,9,0.95) 100%),
            linear-gradient(to right, rgba(7,7,9,0.6) 0%, transparent 25%, transparent 75%, rgba(7,7,9,0.6) 100%)
          `
        }}
      />

      {/* Hero Overlay Content */}
      <div className="relative z-[15] max-w-6xl mx-auto px-6 pt-24 pb-16 flex flex-col items-center text-center pointer-events-none">
        
        {/* Seamless Transparent Official Brand Emblem */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="mb-4 pointer-events-auto"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex items-center justify-center">
            {/* Soft Ambient Gold Radial Backlight */}
            <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl animate-pulse" />
            
            <img
              src="/assets/brand_logo_transparent.png"
              alt="ABHARANA BY KAVYA Official Peacock Logo"
              className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
            />
          </div>
        </motion.div>

        {/* Top Tagline */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.35 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full glass-panel-dark border border-[#d4af37]/40 mb-6 pointer-events-auto shadow-[0_0_20px_rgba(0,0,0,0.8)]"
        >
          <SparkleIcon className="w-3.5 h-3.5 text-[#d4af37]" />
          <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#e8d08d] font-medium">
            Haute Indian Fine Jewellery
          </span>
        </motion.div>

        {/* Main Brand Title Typography */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.5 }}
          className="flex flex-col items-center"
        >
          <h1 className="font-heading-brand text-5xl sm:text-7xl lg:text-9xl font-light tracking-[0.2em] text-[#fcfaf7] uppercase leading-none drop-shadow-[0_10px_40px_rgba(0,0,0,0.95)]">
            ABHARANA
          </h1>
          
          {/* HIGH VISIBILITY "BY KAVYA" BADGE LINE */}
          <div className="mt-4 mb-6 px-8 py-2 rounded-full glass-panel-dark border border-[#d4af37]/60 shadow-[0_4px_25px_rgba(0,0,0,0.9)] bg-[#070709]/80 backdrop-blur-md">
            <span className="font-sans-clean text-sm sm:text-lg md:text-xl text-gold-bright font-bold tracking-[0.5em] uppercase drop-shadow-[0_2px_10px_rgba(0,0,0,0.9)]">
              BY KAVYA
            </span>
          </div>
        </motion.div>

        {/* Subtitle with Clean Quotes */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="font-serif-luxury text-xl sm:text-2xl md:text-3xl text-[#f5ebd9] italic font-normal tracking-wide max-w-2xl mb-10 drop-shadow-[0_4px_25px_rgba(0,0,0,0.95)]"
        >
          "TIMELESS CRAFTSMANSHIP. MODERN ELEGANCE."
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="flex flex-col sm:flex-row items-center gap-5 pointer-events-auto"
        >
          <button
            onClick={onExploreClick}
            className="group relative px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] font-sans-clean text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_35px_rgba(212,175,55,0.4)] hover:shadow-[0_0_55px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:-translate-y-0.5"
          >
            <span className="relative z-10 flex items-center gap-2">
              EXPLORE COLLECTION
            </span>
          </button>

          <button
            onClick={onStoryClick}
            className="px-8 py-4 rounded-full glass-panel-dark border border-[#d4af37]/40 text-[#fcfaf7] font-sans-clean text-xs tracking-[0.25em] uppercase font-medium hover:bg-[#d4af37]/10 hover:border-[#d4af37] transition-all duration-300 shadow-lg"
          >
            DISCOVER OUR STORY
          </button>
        </motion.div>
      </div>

      {/* Bottom Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 text-[#d4af37]/80"
      >
        <span className="font-sans-clean text-[10px] uppercase tracking-[0.3em] font-light">Scroll to Explore</span>
        <ArrowDown className="w-4 h-4 animate-bounce text-[#d4af37]" />
      </motion.div>
    </section>
  );
};

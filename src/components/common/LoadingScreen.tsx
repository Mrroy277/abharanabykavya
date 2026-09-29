import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsVisible(false);
            if (onComplete) onComplete();
          }, 600);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#070709] text-[#fcfaf7] pointer-events-auto"
        >
          {/* Subtle Ambient Gold Particle Glow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.08)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center px-6">
            
            {/* Gold Emblem Monogram Icon */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1, ease: 'easeOut' }}
              className="w-24 h-24 mb-6 flex items-center justify-center relative"
            >
              <div className="absolute inset-0 bg-[#d4af37]/20 rounded-full blur-xl animate-pulse" />
              <img
                src="/assets/brand_logo_transparent.png"
                alt="ABHARANA BY KAVYA"
                className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"
              />
            </motion.div>

            {/* Brand Title */}
            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-heading-brand text-2xl md:text-4xl tracking-[0.25em] text-[#fcfaf7] uppercase font-light mb-2"
            >
              ABHARANA
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="font-sans-clean text-xs md:text-sm text-[#e8d08d] tracking-[0.4em] uppercase mb-10 font-light"
            >
              BY KAVYA
            </motion.p>

            {/* Loading Progress Indicator */}
            <div className="w-48 md:w-64 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-[#d4af37] via-[#fff2cb] to-[#d4af37] rounded-full shadow-[0_0_10px_#d4af37]"
                style={{ width: `${progress}%` }}
              />
            </div>

            <span className="font-sans-clean text-[11px] text-gray-400 tracking-[0.25em] uppercase font-light">
              Crafting Your Experience — {progress}%
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

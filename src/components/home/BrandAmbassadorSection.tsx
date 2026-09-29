import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ShieldCheck, Gem } from 'lucide-react';

interface BrandAmbassadorSectionProps {
  onInspectSignaturePiece: () => void;
}

export const BrandAmbassadorSection: React.FC<BrandAmbassadorSectionProps> = ({
  onInspectSignaturePiece
}) => {
  return (
    <section className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#070709] via-[#0f0f16] to-[#070709] border-t border-[#d4af37]/15 overflow-hidden">
      
      {/* Background Decorative Gold Radial Light */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#d4af37]/10 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        
        {/* Left Editorial Image Frame (Featuring Kavya / Model with Kundan Mango Set) */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="lg:col-span-6 relative"
        >
          {/* Gold Glowing Outer Frame */}
          <div className="relative rounded-2xl p-2 bg-gradient-to-b from-[#d4af37]/40 via-transparent to-[#d4af37]/20 shadow-[0_0_50px_rgba(212,175,55,0.15)]">
            <div className="relative rounded-xl overflow-hidden aspect-[3/4] bg-[#070709]">
              <img
                src="/assets/kavya_brand_ambassador.jpg"
                alt="Kavya wearing the Signature Royal Kundan Mango Haram"
                className="w-full h-full object-cover object-top hover:scale-105 transition-transform duration-700"
              />
              
              {/* Subtle Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60" />

              {/* Bottom Floating Badge on Photo */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl glass-panel-dark border border-[#d4af37]/30 flex items-center justify-between">
                <div>
                  <span className="font-heading-brand text-xs text-[#d4af37] tracking-widest block uppercase">
                    SIGNATURE HERITAGE LOOK
                  </span>
                  <h4 className="font-serif-luxury text-lg text-white font-medium">
                    The Mango Kundan & Emerald Haram
                  </h4>
                </div>
                <button
                  onClick={onInspectSignaturePiece}
                  className="px-3.5 py-1.5 rounded-full bg-[#d4af37] text-[#070709] text-[11px] font-sans-clean font-bold tracking-wider hover:bg-[#e8d08d] transition-colors"
                >
                  VIEW 3D
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right Content Column */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
          className="lg:col-span-6 flex flex-col items-start"
        >
          <div className="flex items-center gap-2 px-3.5 py-1 rounded-full glass-panel-dark border border-[#d4af37]/30 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="font-sans-clean text-xs uppercase tracking-[0.25em] text-[#e8d08d]">
              FOUNDER & CREATIVE DIRECTRESS
            </span>
          </div>

          <h2 className="font-heading-brand text-3xl md:text-5xl text-[#fcfaf7] uppercase tracking-wider font-light mb-6 leading-tight">
            MEET KAVYA <br />
            <span className="text-gold-gradient font-normal">& HER VISION</span>
          </h2>

          <p className="font-serif-luxury text-xl md:text-2xl text-[#f5ebd9]/90 italic mb-8 leading-relaxed font-light">
            “Jewellery in India is not merely an ornament; it is a sacred archive of memories, passed from mother to daughter across generations.”
          </p>

          <p className="font-sans-clean text-sm text-gray-300 leading-relaxed font-light mb-8">
            Abharana was born out of Kavya’s passion for revitalizing royal South Indian and Jaipuri temple craft. Each piece—like the signature Mango Kundan Haram shown here—combines 22K solid hallmarked gold, uncut Polki diamonds, and hand-carved Zambian emeralds.
          </p>

          {/* Key Brand Pillars Grid */}
          <div className="grid grid-cols-2 gap-4 w-full mb-10">
            <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-sans-clean text-xs font-semibold text-[#fcfaf7] uppercase tracking-wider">100% BIS Hallmarked</h5>
                <p className="text-[11px] text-gray-400 mt-1 font-light">916 Certified pure gold assurance.</p>
              </div>
            </div>

            <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-start gap-3">
              <Gem className="w-5 h-5 text-[#d4af37] shrink-0 mt-0.5" />
              <div>
                <h5 className="font-sans-clean text-xs font-semibold text-[#fcfaf7] uppercase tracking-wider">Carved Gemstones</h5>
                <p className="text-[11px] text-gray-400 mt-1 font-light">Ethically sourced Zambian emeralds.</p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button
            onClick={onInspectSignaturePiece}
            className="px-8 py-4 rounded-full bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] font-sans-clean text-xs tracking-[0.25em] uppercase font-bold shadow-[0_0_30px_rgba(212,175,55,0.3)] hover:shadow-[0_0_45px_rgba(212,175,55,0.5)] transition-all duration-300"
          >
            EXPLORE KAVYA'S SIGNATURE HARAM
          </button>
        </motion.div>

      </div>
    </section>
  );
};

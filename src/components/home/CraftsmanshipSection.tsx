import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CRAFTSMANSHIP_STEPS } from '../../data/products';
import { CheckCircle2 } from 'lucide-react';

export const CraftsmanshipSection: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const currentStep = CRAFTSMANSHIP_STEPS[activeStepIndex];

  return (
    <section id="craftsmanship" className="relative py-28 px-6 md:px-12 bg-gradient-to-b from-[#070709] via-[#0b0b12] to-[#070709] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-3">
            MASTER GOLDSMITHS AT WORK
          </span>
          <h2 className="font-heading-brand text-3xl sm:text-5xl text-[#fcfaf7] uppercase tracking-wider font-light mb-4">
            THE CRAFTSMANSHIP JOURNEY
          </h2>
          <p className="font-serif-luxury text-xl text-[#f5ebd9]/80 italic max-w-lg">
            Five meticulous stages of royal creation.
          </p>
        </div>

        {/* Step Navigation Bar */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-12 overflow-x-auto no-scrollbar gap-4">
          {CRAFTSMANSHIP_STEPS.map((step, idx) => {
            const isActive = idx === activeStepIndex;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStepIndex(idx)}
                className={`flex items-center gap-3 px-4 py-2 rounded-full transition-all shrink-0 font-sans-clean text-xs font-bold tracking-wider ${
                  isActive
                    ? 'bg-[#d4af37] text-[#070709] shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="font-heading-brand text-sm">{step.number}</span>
                <span className="uppercase">{step.title.split(' ')[1] || step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step Visual Showcase */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep.number}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center"
          >
            {/* Left: Step Image */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-[#070709] border border-[#d4af37]/30 shadow-2xl">
                <img
                  src={currentStep.image}
                  alt={currentStep.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-60" />
                <div className="absolute top-6 left-6 font-heading-brand text-5xl font-extrabold text-gold-gradient opacity-80">
                  {currentStep.number}
                </div>
              </div>
            </div>

            {/* Right: Step Description */}
            <div className="lg:col-span-6 flex flex-col items-start">
              <span className="font-sans-clean text-xs uppercase tracking-[0.3em] text-[#d4af37] font-semibold mb-2">
                STAGE {currentStep.number} • {currentStep.subtitle}
              </span>

              <h3 className="font-heading-brand text-3xl md:text-4xl text-[#fcfaf7] uppercase tracking-wide font-light mb-6">
                {currentStep.title}
              </h3>

              <p className="font-sans-clean text-base text-gray-300 leading-relaxed font-light mb-8">
                {currentStep.description}
              </p>

              <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-center gap-3 w-full">
                <CheckCircle2 className="w-5 h-5 text-[#d4af37] shrink-0" />
                <span className="font-sans-clean text-xs text-white font-medium">
                  {currentStep.detail}
                </span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
};

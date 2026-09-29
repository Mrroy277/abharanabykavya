import React from 'react';
import { motion } from 'framer-motion';
import { Feather, HeartHandshake } from 'lucide-react';

export const BrandStorySection: React.FC = () => {
  return (
    <section id="brand-story" className="relative py-28 px-6 md:px-12 bg-[#070709] border-t border-[#d4af37]/15">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="font-sans-clean text-xs uppercase tracking-[0.35em] text-[#d4af37] font-semibold mb-3">
            OUR PHILOSOPHY
          </span>
          <h2 className="font-heading-brand text-3xl sm:text-5xl lg:text-6xl text-[#fcfaf7] uppercase tracking-wider font-light mb-6">
            THE ART OF ABHARANA
          </h2>
          <h3 className="font-serif-luxury text-2xl sm:text-4xl text-gold-bright italic font-normal max-w-3xl leading-relaxed">
            “JEWELLERY IS NOT JUST WORN. IT IS REMEMBERED.”
          </h3>
          <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mt-8" />
        </div>

        {/* Editorial Layout: Image + Narrative */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-6 relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] bg-[#0c0c12] border border-[#d4af37]/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&q=80&w=1200"
                alt="Jewellery Craftsman at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-transparent to-transparent opacity-70" />
              
              <div className="absolute bottom-8 left-8 right-8 p-6 rounded-xl glass-panel-dark border border-[#d4af37]/30">
                <span className="font-heading-brand text-xs text-[#d4af37] tracking-widest block uppercase mb-1">
                  HERITAGE ATELIER
                </span>
                <p className="font-serif-luxury text-lg text-white font-light italic">
                  Preserving 400-year-old royal Karigar goldsmithing secrets.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-6 flex flex-col justify-center gap-6"
          >
            <p className="font-sans-clean text-base text-gray-300 leading-relaxed font-light">
              Founded under the creative vision of Kavya, <strong className="text-[#fcfaf7] font-semibold">Abharana</strong> is dedicated to creating heirloom jewellery that captures the soul of Indian majesty while embracing modern global sophistication.
            </p>

            <p className="font-sans-clean text-base text-gray-300 leading-relaxed font-light">
              Every curve of 22K gold, every hand-carved emerald leaf, and every flawless diamond facet is meticulously crafted in our private workshops by master artisans whose lineage dates back to royal court goldsmiths.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-start gap-3">
                <Feather className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans-clean text-xs font-semibold text-white uppercase tracking-wider">Uncompromising Detail</h4>
                  <p className="text-[11px] text-gray-400 font-light mt-1">Intricate Meenakari enameling hand-painted on every reverse side.</p>
                </div>
              </div>

              <div className="p-4 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-start gap-3">
                <HeartHandshake className="w-5 h-5 text-[#d4af37] shrink-0 mt-1" />
                <div>
                  <h4 className="font-sans-clean text-xs font-semibold text-white uppercase tracking-wider">Ethical Sourcing</h4>
                  <p className="text-[11px] text-gray-400 font-light mt-1">100% conflict-free diamonds and ethically mined Zambian emeralds.</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

import React, { useState } from 'react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';

const InstagramIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const FacebookIcon: React.FC<{ className?: string }> = ({ className = "w-4 h-4" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-[#050507] text-[#fcfaf7] border-t border-[#d4af37]/20 pt-20 pb-12 px-6 md:px-12 font-sans-clean">
      <div className="max-w-7xl mx-auto">
        
        {/* Top VIP Newsletter Banner */}
        <div className="rounded-2xl glass-panel-dark border border-[#d4af37]/30 p-8 md:p-12 mb-16 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#d4af37]" />
              <span className="text-xs uppercase tracking-[0.3em] text-[#e8d08d] font-semibold">
                THE INNER CIRCLE
              </span>
            </div>
            <h3 className="font-heading-brand text-2xl md:text-3xl text-white uppercase tracking-wider font-light mb-2">
              JOIN THE PRIVATE CONNOISSEURS
            </h3>
            <p className="text-xs text-gray-400 font-light">
              Receive private invitations to new high-jewellery releases, private atelier previews, and bespoke gem updates.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex items-center gap-2">
            <input
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="px-5 py-3.5 rounded-full bg-[#070709] border border-[#d4af37]/30 text-white placeholder-gray-500 text-xs focus:outline-none focus:border-[#d4af37] w-full sm:w-72"
            />
            <button
              type="submit"
              className="px-6 py-3.5 rounded-full bg-[#d4af37] text-[#070709] font-bold text-xs tracking-wider uppercase hover:bg-[#e8d08d] transition-colors shrink-0 flex items-center gap-1.5"
            >
              {subscribed ? 'JOINED' : 'SUBSCRIBE'}
              {!subscribed && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </div>

        {/* Footer Navigation Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10">
          
          {/* Brand Info Column */}
          <div className="lg:col-span-2 flex flex-col items-start pr-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 flex items-center justify-center relative">
                <img
                  src="/assets/brand_logo_transparent.png"
                  alt="ABHARANA Logo"
                  className="w-full h-full object-contain filter drop-shadow-[0_0_10px_rgba(212,175,55,0.4)]"
                />
              </div>
              <div>
                <h4 className="font-heading-brand text-lg tracking-[0.2em] font-semibold text-white">
                  ABHARANA
                </h4>
                <span className="text-[9px] tracking-[0.35em] text-[#d4af37] uppercase block font-bold">
                  BY KAVYA
                </span>
              </div>
            </div>

            <p className="text-xs text-gray-400 font-light leading-relaxed mb-6 max-w-sm">
              Handcrafted 22K hallmarked gold, certified uncut Polki diamonds, and carved emeralds created for connoisseurs of Indian heritage.
            </p>

            <div className="flex items-center gap-2 text-xs text-[#e8d08d]">
              <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
              <span>100% BIS 916 Hallmarked & IGI Certified</span>
            </div>
          </div>

          {/* SHOP */}
          <div>
            <h5 className="font-heading-brand text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-4">
              SHOP
            </h5>
            <ul className="space-y-3 text-xs text-gray-400 font-light">
              <li><a href="#collections" className="hover:text-white transition-colors">Collections</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">New Arrivals</a></li>
              <li><a href="#featured" className="hover:text-white transition-colors">Best Sellers</a></li>
              <li><a href="#collections" className="hover:text-white transition-colors">Bridal Heirloom</a></li>
            </ul>
          </div>

          {/* ABOUT */}
          <div>
            <h5 className="font-heading-brand text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-4">
              ABOUT
            </h5>
            <ul className="space-y-3 text-xs text-gray-400 font-light">
              <li><a href="#brand-story" className="hover:text-white transition-colors">Our Story</a></li>
              <li><a href="#craftsmanship" className="hover:text-white transition-colors">Craftsmanship</a></li>
              <li><a href="#social" className="hover:text-white transition-colors">Journal</a></li>
              <li><a href="#brand-story" className="hover:text-white transition-colors">Bespoke Atelier</a></li>
            </ul>
          </div>

          {/* HELP & SOCIAL */}
          <div>
            <h5 className="font-heading-brand text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-4">
              HELP
            </h5>
            <ul className="space-y-3 text-xs text-gray-400 font-light mb-6">
              <li><a href="#footer" className="hover:text-white transition-colors">Contact Atelier</a></li>
              <li><a href="#footer" className="hover:text-white transition-colors">Insured Shipping</a></li>
              <li><a href="#footer" className="hover:text-white transition-colors">Returns & Appraisal</a></li>
            </ul>

            <h5 className="font-heading-brand text-xs uppercase tracking-[0.25em] text-[#d4af37] font-semibold mb-3">
              SOCIAL
            </h5>
            <div className="flex items-center gap-3">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-panel-dark text-gray-400 hover:text-[#d4af37] transition-colors">
                <InstagramIcon className="w-4 h-4" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-full glass-panel-dark text-gray-400 hover:text-[#d4af37] transition-colors">
                <FacebookIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-gray-500 font-light gap-4">
          <span>© 2026 ABHARANA BY KAVYA. ALL RIGHTS RESERVED.</span>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-gray-300">PRIVACY POLICY</a>
            <a href="#terms" className="hover:text-gray-300">TERMS OF SERVICE</a>
            <a href="#authenticity" className="hover:text-gray-300">BIS HALLMARK DIRECTORY</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

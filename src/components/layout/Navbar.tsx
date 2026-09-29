import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, Menu, X, Globe, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  currency: 'INR' | 'USD';
  onToggleCurrency: () => void;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenTryOn: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  currency,
  onToggleCurrency,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenTryOn
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#hero' },
    { name: 'COLLECTIONS', href: '#collections' },
    { name: 'FEATURED', href: '#featured' },
    { name: 'CRAFTSMANSHIP', href: '#craftsmanship' },
    { name: 'ABOUT KAVYA', href: '#brand-story' },
    { name: 'JOURNAL', href: '#social' }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-3 bg-[#070709]/85 backdrop-blur-md border-b border-[#d4af37]/20 shadow-[0_4px_30px_rgba(0,0,0,0.8)]'
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          
          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="lg:hidden p-2 text-[#fcfaf7] hover:text-[#d4af37] transition-colors"
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Brand Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="w-10 h-10 flex items-center justify-center relative">
              <img
                src="/assets/brand_logo_transparent.png"
                alt="ABHARANA Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgba(212,175,55,0.5)] group-hover:scale-105 transition-transform"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-heading-brand text-base md:text-lg tracking-[0.2em] font-semibold text-[#fcfaf7] group-hover:text-[#e8d08d] transition-colors">
                ABHARANA
              </span>
              <span className="font-sans-clean text-[9px] tracking-[0.35em] text-[#d4af37] uppercase font-bold">
                BY KAVYA
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="font-sans-clean text-xs tracking-[0.2em] font-medium text-[#fcfaf7]/80 hover:text-[#d4af37] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-300"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action Icons & Tools */}
          <div className="flex items-center gap-3 md:gap-5">
            
            {/* Virtual Try-On Launch Button */}
            <button
              onClick={onOpenTryOn}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#d4af37]/50 text-xs font-sans-clean text-[#e8d08d] hover:bg-[#d4af37]/15 transition-all glass-panel-dark"
              title="Virtual Try-On Fitting Room"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
              <span className="font-semibold tracking-wider text-[11px] uppercase hidden sm:inline">TRY ON AR</span>
            </button>

            {/* Currency Switcher */}
            <button
              onClick={onToggleCurrency}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border border-white/10 hover:border-[#d4af37]/40 text-xs font-sans-clean text-[#e8d08d] transition-colors bg-white/5"
              title="Switch Currency"
            >
              <Globe className="w-3.5 h-3.5 text-[#d4af37]" />
              <span className="font-medium tracking-wider">{currency === 'INR' ? '₹ INR' : '$ USD'}</span>
            </button>

            {/* Search Trigger */}
            <button
              onClick={onOpenSearch}
              className="p-2 text-[#fcfaf7]/80 hover:text-[#d4af37] transition-colors relative"
              aria-label="Search items"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={onOpenWishlist}
              className="p-2 text-[#fcfaf7]/80 hover:text-[#d4af37] transition-colors relative"
              aria-label="View Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-[#d4af37] text-[#070709] text-[10px] font-bold flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Shopping Cart Drawer Trigger */}
            <button
              onClick={onOpenCart}
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-[#d4af37] to-[#b89225] text-[#070709] font-sans-clean text-xs font-semibold tracking-wider hover:brightness-110 transition-all shadow-[0_0_15px_rgba(212,175,55,0.3)]"
              aria-label="View Shopping Cart"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">BAG</span>
              {cartCount > 0 && (
                <span className="px-1.5 py-0.5 rounded-full bg-[#070709] text-[#e8d08d] text-[10px] font-bold">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#070709]/95 backdrop-blur-xl lg:hidden flex flex-col justify-between p-8"
          >
            <div className="flex items-center justify-between border-b border-[#d4af37]/20 pb-6">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full border border-[#d4af37] flex items-center justify-center">
                  <span className="font-heading-brand text-sm text-[#d4af37]">A</span>
                </div>
                <span className="font-heading-brand text-lg tracking-widest text-[#fcfaf7]">
                  ABHARANA
                </span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-gray-400 hover:text-white"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="flex flex-col gap-6 py-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.08 }}
                  className="font-heading-brand text-xl tracking-[0.2em] text-[#fcfaf7] hover:text-[#d4af37] transition-colors"
                >
                  {link.name}
                </motion.a>
              ))}

              <button
                onClick={() => { setMobileMenuOpen(false); onOpenTryOn(); }}
                className="w-full py-3 rounded-full bg-[#d4af37] text-[#070709] font-sans-clean font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 mt-4"
              >
                <Sparkles className="w-4 h-4" />
                VIRTUAL TRY-ON FITTING ROOM
              </button>
            </nav>

            <div className="border-t border-[#d4af37]/20 pt-6 flex items-center justify-between text-xs text-gray-400 font-sans-clean">
              <span>Haute Jewellery Showroom</span>
              <button onClick={onToggleCurrency} className="text-[#d4af37]">
                Currency: {currency}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

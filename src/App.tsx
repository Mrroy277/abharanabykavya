import React, { useState } from 'react';
import { LoadingScreen } from './components/common/LoadingScreen';
import { CustomCursor } from './components/common/CustomCursor';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { BrandAmbassadorSection } from './components/home/BrandAmbassadorSection';
import { CollectionSection } from './components/home/CollectionSection';
import { FeaturedProductsSection } from './components/home/FeaturedProductsSection';
import { CinematicProductSection } from './components/home/CinematicProductSection';
import { BrandStorySection } from './components/home/BrandStorySection';
import { CraftsmanshipSection } from './components/home/CraftsmanshipSection';
import { InstagramSection } from './components/home/InstagramSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { FinalCTASection } from './components/home/FinalCTASection';

import { CartDrawer, type CartItem } from './components/modals/CartDrawer';
import { WishlistDrawer } from './components/modals/WishlistDrawer';
import { SearchModal } from './components/modals/SearchModal';
import { ProductDetailModal } from './components/modals/ProductDetailModal';
import { VirtualTryOnModal } from './components/modals/VirtualTryOnModal';
import { PRODUCTS, type Product } from './data/products';

export const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState<'INR' | 'USD'>('INR');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 } // Pre-loaded with Maharani Emerald Choker
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([PRODUCTS[1].id]);

  // Modal open states
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [tryOnOpen, setTryOnOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const toggleCurrency = () => {
    setCurrency((prev) => (prev === 'INR' ? 'USD' : 'INR'));
  };

  const handleAddToCart = (product: Product) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.product.id === productId ? { ...item, quantity } : item))
    );
  };

  const handleRemoveFromCart = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (product: Product) => {
    setWishlistIds((prev) =>
      prev.includes(product.id) ? prev.filter((id) => id !== product.id) : [...prev, product.id]
    );
  };

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#070709] text-[#fcfaf7] font-sans-clean selection:bg-[#d4af37]/30 selection:text-[#fdfbf7] overflow-x-hidden">
      
      {/* 1. Loading Reveal Experience */}
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}

      {/* 2. Desktop Custom Followers Cursor */}
      <CustomCursor />

      {/* 3. Navigation Header */}
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistIds.length}
        currency={currency}
        onToggleCurrency={toggleCurrency}
        onOpenCart={() => setCartOpen(true)}
        onOpenWishlist={() => setWishlistOpen(true)}
        onOpenSearch={() => setSearchOpen(true)}
        onOpenTryOn={() => setTryOnOpen(true)}
      />

      {/* Main Page Content */}
      <main>
        {/* 4. Fullscreen Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('collections')}
          onStoryClick={() => scrollToSection('brand-story')}
        />

        {/* 5. Founder & Model Ambassador Spotlight (Featuring User's Photo) */}
        <BrandAmbassadorSection
          onInspectSignaturePiece={() => setSelectedProduct(PRODUCTS[0])}
        />

        {/* 6. Collections Curated Editorial Section (Curved 3D Horizontal Carousel) */}
        <CollectionSection
          onSelectCategory={() => scrollToSection('featured')}
        />

        {/* 7. Featured Products Grid */}
        <FeaturedProductsSection
          currency={currency}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
          onQuickInspect={(product) => setSelectedProduct(product)}
        />

        {/* 8. Cinematic Spotlight Product Section */}
        <CinematicProductSection
          currency={currency}
          onAddToCart={handleAddToCart}
          onOpenCustomizer={(product) => setSelectedProduct(product)}
        />

        {/* 9. Brand Philosophy & Story */}
        <BrandStorySection />

        {/* 10. Craftsmanship 5-Step Journey */}
        <CraftsmanshipSection />

        {/* 11. Instagram Social Gallery */}
        <InstagramSection />

        {/* 12. Patron Testimonials */}
        <TestimonialsSection />

        {/* 13. Final CTA Banner */}
        <FinalCTASection
          onExploreClick={() => scrollToSection('collections')}
        />
      </main>

      {/* 14. Luxury Footer */}
      <Footer />

      {/* Modals & Drawers */}
      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveFromCart}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        currency={currency}
        onAddToCart={handleAddToCart}
        onRemoveFromWishlist={(id) => setWishlistIds((prev) => prev.filter((i) => i !== id))}
      />

      <SearchModal
        isOpen={searchOpen}
        onClose={() => setSearchOpen(false)}
        currency={currency}
        onSelectProduct={(product) => setSelectedProduct(product)}
      />

      <ProductDetailModal
        product={selectedProduct}
        isOpen={selectedProduct !== null}
        onClose={() => setSelectedProduct(null)}
        currency={currency}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      <VirtualTryOnModal
        isOpen={tryOnOpen}
        onClose={() => setTryOnOpen(false)}
        initialProduct={selectedProduct || PRODUCTS[0]}
      />
    </div>
  );
};

export default App;

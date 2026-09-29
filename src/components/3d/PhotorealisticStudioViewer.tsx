import React, { useState, useRef } from 'react';
import { Sparkles, RotateCcw, ZoomIn, ZoomOut, Sun } from 'lucide-react';
import type { Product } from '../../data/products';

interface PhotorealisticStudioViewerProps {
  product: Product;
  className?: string;
}

export const PhotorealisticStudioViewer: React.FC<PhotorealisticStudioViewerProps> = ({
  product,
  className = 'h-[500px] w-full'
}) => {
  // Metal Color Shift Overlay Filters
  const [metalFilter, setMetalFilter] = useState<'yellow' | 'rose' | 'white'>('yellow');
  
  // Gemstone Color Shift Filters
  const [gemGlow, setGemGlow] = useState<'original' | 'emerald' | 'ruby' | 'sapphire' | 'diamond'>('original');
  
  // Lighting Environment Presets
  const [lighting, setLighting] = useState<'dark' | 'gold' | 'diamond'>('dark');
  
  // Interactive 3D Perspective Rotation & Zoom State
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [autoRotate, setAutoRotate] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });

  // Mouse Drag 3D Rotation Handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setAutoRotate(false);
    dragStart.current = { x: e.clientX - rotation.y, y: e.clientY - rotation.x };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const newY = e.clientX - dragStart.current.x;
    const newX = e.clientY - dragStart.current.y;
    // Constrain X rotation to realistic tilt angles (-25 deg to 25 deg)
    const constrainedX = Math.max(-25, Math.min(25, newX));
    setRotation({ x: constrainedX, y: newY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleReset = () => {
    setRotation({ x: 0, y: 0 });
    setZoom(1);
    setMetalFilter('yellow');
    setGemGlow('original');
    setLighting('dark');
    setAutoRotate(true);
  };

  // Metal Filter CSS style mappings
  const getMetalCssFilter = () => {
    switch (metalFilter) {
      case 'rose':
        return 'sepia(0.5) hue-rotate(315deg) saturate(1.4) contrast(1.05)';
      case 'white':
        return 'saturate(0.25) contrast(1.15) brightness(1.1)';
      case 'yellow':
      default:
        return 'none';
    }
  };

  // Lighting Background Gradients
  const getLightingBackground = () => {
    switch (lighting) {
      case 'gold':
        return 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.2) 0%, rgba(15,15,21,0.95) 70%, #070709 100%)';
      case 'diamond':
        return 'radial-gradient(circle at 50% 40%, rgba(255,255,255,0.18) 0%, rgba(20,25,35,0.95) 70%, #070709 100%)';
      case 'dark':
      default:
        return 'radial-gradient(circle at 50% 40%, rgba(212,175,55,0.08) 0%, rgba(12,12,18,0.95) 60%, #070709 100%)';
    }
  };

  return (
    <div
      className={`relative rounded-2xl overflow-hidden border border-[#d4af37]/30 shadow-2xl group select-none ${className}`}
      style={{ background: getLightingBackground() }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Status & Mode Indicator */}
      <div className="absolute top-4 left-4 z-30 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark text-xs font-sans-clean text-[#e8d08d] border border-[#d4af37]/30">
        <Sparkles className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
        <span className="font-semibold tracking-wider uppercase text-[11px]">
          REALISTIC 3D STUDIO INSPECTOR
        </span>
      </div>

      {/* Top Right Zoom Controls */}
      <div className="absolute top-4 right-4 z-30 flex items-center gap-1 p-1 rounded-xl glass-panel-dark border border-[#d4af37]/20">
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.min(3, z + 0.3)); }}
          className="p-1.5 rounded-lg text-gray-300 hover:text-[#d4af37] transition-colors"
          title="Zoom In (Macro)"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <span className="text-[10px] font-sans-clean font-bold text-gray-400 px-1">
          {Math.round(zoom * 100)}%
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); setZoom((z) => Math.max(1, z - 0.3)); }}
          className="p-1.5 rounded-lg text-gray-300 hover:text-[#d4af37] transition-colors"
          title="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
      </div>

      {/* Main Photorealistic 3D Perspective Stage */}
      <div className="absolute inset-0 flex items-center justify-center cursor-grab active:cursor-grabbing p-8">
        
        {/* Dynamic Shadow underneath piece */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[65%] h-[20%] rounded-full bg-black/80 blur-2xl transition-all duration-300 pointer-events-none"
          style={{
            transform: `translateX(-50%) rotate(${rotation.y * 0.2}deg) scale(${1 + Math.abs(rotation.x) * 0.01})`,
            opacity: 0.7 - Math.abs(rotation.x) * 0.01
          }}
        />

        {/* Photorealistic High-Res Jewellery Image with 3D Tilt & Lighting Shader */}
        <div
          className={`relative max-w-[85%] max-h-[85%] flex items-center justify-center transition-transform ${
            autoRotate ? 'animate-float-hero' : ''
          }`}
          style={{
            transform: `perspective(1000px) rotateX(${-rotation.x}deg) rotateY(${rotation.y}deg) scale(${zoom})`,
            transition: isDragging ? 'none' : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
          }}
        >
          {/* Main Jewellery Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.85)] pointer-events-none"
            style={{
              filter: `${getMetalCssFilter()} drop-shadow(0 10px 25px rgba(212,175,55,0.25))`
            }}
            draggable={false}
          />

          {/* Dynamic Gemstone Glow Layer */}
          {gemGlow !== 'original' && (
            <div
              className="absolute inset-0 pointer-events-none rounded-full blur-xl opacity-40 mix-blend-screen transition-opacity duration-500"
              style={{
                background:
                  gemGlow === 'emerald'
                    ? 'radial-gradient(circle, #06633b 0%, transparent 70%)'
                    : gemGlow === 'ruby'
                    ? 'radial-gradient(circle, #a80c2e 0%, transparent 70%)'
                    : gemGlow === 'sapphire'
                    ? 'radial-gradient(circle, #0f3885 0%, transparent 70%)'
                    : 'radial-gradient(circle, #ffffff 0%, transparent 70%)'
              }}
            />
          )}

          {/* Dynamic Light Specular Reflection Highlight */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 mix-blend-overlay"
            style={{
              background: `radial-gradient(circle at ${50 + rotation.y * 0.5}% ${
                50 + rotation.x * 0.5
              }%, rgba(255,255,255,0.9) 0%, transparent 60%)`
            }}
          />
        </div>
      </div>

      {/* Floating Sparkle Dust */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 15 }).map((_, i) => (
          <span
            key={i}
            className="absolute rounded-full animate-sparkle-float"
            style={{
              left: `${10 + (i * 6) % 80}%`,
              top: `${15 + (i * 11) % 70}%`,
              width: `${1.5 + (i % 3)}px`,
              height: `${1.5 + (i % 3)}px`,
              background: '#f7e7c4',
              opacity: 0.3 + (i % 5) * 0.1,
              animationDelay: `${(i * 0.4) % 4}s`
            }}
          />
        ))}
      </div>

      {/* Bottom Interactive Control Toolbar */}
      <div className="absolute bottom-4 left-4 right-4 z-30 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl glass-panel-dark border border-[#d4af37]/25 backdrop-blur-md">
        
        {/* Metal Finish Customizer */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400">Metal:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setMetalFilter('yellow'); }}
                title="22K Yellow Gold Finish"
                className={`w-5 h-5 rounded-full border transition-all ${
                  metalFilter === 'yellow' ? 'border-[#d4af37] scale-110 shadow-[0_0_10px_#d4af37]' : 'border-transparent opacity-60'
                }`}
                style={{ background: 'linear-gradient(135deg, #f7e7c4, #d4af37)' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setMetalFilter('rose'); }}
                title="18K Rose Gold Finish"
                className={`w-5 h-5 rounded-full border transition-all ${
                  metalFilter === 'rose' ? 'border-[#e8af9e] scale-110 shadow-[0_0_10px_#e8af9e]' : 'border-transparent opacity-60'
                }`}
                style={{ background: 'linear-gradient(135deg, #fce2d9, #e8af9e)' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setMetalFilter('white'); }}
                title="Platinum White Gold Finish"
                className={`w-5 h-5 rounded-full border transition-all ${
                  metalFilter === 'white' ? 'border-white scale-110 shadow-[0_0_10px_#ffffff]' : 'border-transparent opacity-60'
                }`}
                style={{ background: 'linear-gradient(135deg, #ffffff, #c2c9d6)' }}
              />
            </div>
          </div>

          {/* Gemstone Radiance Selector */}
          <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
            <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400">Gem Glow:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={(e) => { e.stopPropagation(); setGemGlow('emerald'); }}
                title="Zambian Emerald Radiance"
                className={`w-4 h-4 rounded-full border transition-all ${
                  gemGlow === 'emerald' ? 'border-emerald-400 scale-110 shadow-[0_0_8px_#06633b]' : 'border-transparent opacity-60'
                }`}
                style={{ backgroundColor: '#06633b' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setGemGlow('ruby'); }}
                title="Burmese Ruby Radiance"
                className={`w-4 h-4 rounded-full border transition-all ${
                  gemGlow === 'ruby' ? 'border-red-400 scale-110 shadow-[0_0_8px_#a80c2e]' : 'border-transparent opacity-60'
                }`}
                style={{ backgroundColor: '#a80c2e' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setGemGlow('sapphire'); }}
                title="Ceylon Sapphire Radiance"
                className={`w-4 h-4 rounded-full border transition-all ${
                  gemGlow === 'sapphire' ? 'border-blue-400 scale-110 shadow-[0_0_8px_#0f3885]' : 'border-transparent opacity-60'
                }`}
                style={{ backgroundColor: '#0f3885' }}
              />
              <button
                onClick={(e) => { e.stopPropagation(); setGemGlow('diamond'); }}
                title="Diamond Brilliance"
                className={`w-4 h-4 rounded-full border transition-all ${
                  gemGlow === 'diamond' ? 'border-white scale-110 shadow-[0_0_8px_#ffffff]' : 'border-transparent opacity-60'
                }`}
                style={{ backgroundColor: '#ffffff' }}
              />
            </div>
          </div>
        </div>

        {/* Right Toolbar Action Buttons */}
        <div className="flex items-center gap-2">
          {/* Lighting Environment Switcher */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setLighting((l) => (l === 'dark' ? 'gold' : l === 'gold' ? 'diamond' : 'dark'));
            }}
            className="p-1.5 rounded-lg text-xs text-gray-300 hover:text-[#d4af37] transition-colors flex items-center gap-1 glass-panel-dark"
            title={`Lighting Studio: ${lighting.toUpperCase()}`}
          >
            <Sun className="w-3.5 h-3.5 text-[#d4af37]" />
            <span className="text-[10px] uppercase font-sans-clean font-semibold hidden sm:inline">{lighting} Studio</span>
          </button>

          {/* Reset View Button */}
          <button
            onClick={(e) => { e.stopPropagation(); handleReset(); }}
            className="p-1.5 rounded-lg text-xs text-gray-300 hover:text-[#d4af37] transition-colors glass-panel-dark"
            title="Reset 3D Perspective & Filters"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};

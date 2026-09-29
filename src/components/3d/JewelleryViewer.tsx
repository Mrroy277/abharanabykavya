import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Sparkles, ContactShadows } from '@react-three/drei';
import { MasterJewellery3D } from './Jewellery3DModels';
import type { Product3DConfig } from '../../data/products';
import { Sparkles as SparkleIcon, RotateCcw, Maximize2, Layers } from 'lucide-react';

interface JewelleryViewerProps {
  type?: Product3DConfig['type'];
  initialConfig?: Partial<Product3DConfig>;
  posterImage?: string;
  className?: string;
  showControls?: boolean;
  onExpandFullScreen?: () => void;
}

export const JewelleryViewer: React.FC<JewelleryViewerProps> = ({
  type = 'necklace',
  initialConfig = { goldColor: 'yellow', gemColor: 'emerald' },
  posterImage,
  className = 'h-[500px] w-full',
  showControls = true,
  onExpandFullScreen
}) => {
  const [config, setConfig] = useState<Partial<Product3DConfig>>({
    goldColor: initialConfig.goldColor || 'yellow',
    gemColor: initialConfig.gemColor || 'emerald'
  });
  const [autoRotate, setAutoRotate] = useState(true);
  const [lightingPreset, setLightingPreset] = useState<'city' | 'studio' | 'sunset'>('city');

  return (
    <div className={`relative rounded-2xl overflow-hidden bg-gradient-to-b from-[#0c0c12] via-[#070709] to-[#12121c] border border-[#d4af37]/20 shadow-2xl group ${className}`}>
      
      {/* Canvas R3F 3D View */}
      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#070709] text-[#d4af37]">
            {posterImage ? (
              <img src={posterImage} alt="3D Model Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm" />
            ) : null}
            <div className="relative z-10 flex flex-col items-center gap-3">
              <div className="w-10 h-10 border-2 border-[#d4af37] border-t-transparent rounded-full animate-spin"></div>
              <span className="font-heading-brand text-xs tracking-widest text-[#e6cf8b] uppercase">Loading 3D Luxury Model...</span>
            </div>
          </div>
        }
      >
        <Canvas
          camera={{ position: [0, 0, 4.2], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          {/* Studio Lighting */}
          <ambientLight intensity={0.8} />
          <directionalLight position={[5, 8, 5]} intensity={2.5} color="#fff8e7" castShadow />
          <spotLight position={[-5, -5, -2]} intensity={1.2} color="#d4af37" />
          <pointLight position={[0, 3, 2]} intensity={1.5} color="#ffffff" />
          
          <Environment preset={lightingPreset} />

          {/* Floating particle sparkle dust */}
          <Sparkles count={35} scale={6} size={2} speed={0.4} color="#d4af37" opacity={0.6} />

          {/* Floating animated 3D object */}
          <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.4}>
            <MasterJewellery3D type={type} config={config} autoRotate={autoRotate} />
          </Float>

          {/* Realistic Floor Shadow */}
          <ContactShadows position={[0, -1.8, 0]} opacity={0.45} scale={8} blur={2.5} far={4} color="#000000" />

          {/* Camera Orbit Controls */}
          <OrbitControls
            enableZoom={true}
            minDistance={2.5}
            maxDistance={7}
            enablePan={false}
            autoRotate={false}
            rotateSpeed={0.8}
            zoomSpeed={0.8}
          />
        </Canvas>
      </Suspense>

      {/* Top Floating Badge */}
      <div className="absolute top-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark text-xs font-sans-clean text-[#e8d08d] border border-[#d4af37]/30">
        <SparkleIcon className="w-3.5 h-3.5 text-[#d4af37] animate-pulse" />
        <span className="font-medium tracking-wider uppercase">Interactive 3D Showroom</span>
      </div>

      {/* Control Panel Toolbar (Optional Overlay) */}
      {showControls && (
        <div className="absolute bottom-4 left-4 right-4 z-20 flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20 transition-all duration-300">
          
          {/* Customizer Toggles */}
          <div className="flex items-center gap-4">
            
            {/* Metal Selector */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400">Metal:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, goldColor: 'yellow' }))}
                  title="22K Yellow Gold"
                  className={`w-5 h-5 rounded-full border transition-all ${config.goldColor === 'yellow' ? 'border-[#d4af37] scale-110 shadow-[0_0_8px_#d4af37]' : 'border-transparent opacity-60'}`}
                  style={{ background: 'linear-gradient(135deg, #f7e7c4, #d4af37)' }}
                />
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, goldColor: 'rose' }))}
                  title="18K Rose Gold"
                  className={`w-5 h-5 rounded-full border transition-all ${config.goldColor === 'rose' ? 'border-[#e8af9e] scale-110 shadow-[0_0_8px_#e8af9e]' : 'border-transparent opacity-60'}`}
                  style={{ background: 'linear-gradient(135deg, #fce2d9, #e8af9e)' }}
                />
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, goldColor: 'white' }))}
                  title="Platinum White Gold"
                  className={`w-5 h-5 rounded-full border transition-all ${config.goldColor === 'white' ? 'border-white scale-110 shadow-[0_0_8px_#ffffff]' : 'border-transparent opacity-60'}`}
                  style={{ background: 'linear-gradient(135deg, #ffffff, #c2c9d6)' }}
                />
              </div>
            </div>

            {/* Gemstone Selector */}
            <div className="flex items-center gap-1.5 border-l border-white/10 pl-3">
              <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400">Gem:</span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, gemColor: 'emerald' }))}
                  title="Zambian Emerald"
                  className={`w-5 h-5 rounded-full border transition-all ${config.gemColor === 'emerald' ? 'border-[#06633b] scale-110 shadow-[0_0_8px_#06633b]' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: '#06633b' }}
                />
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, gemColor: 'ruby' }))}
                  title="Burmese Ruby"
                  className={`w-5 h-5 rounded-full border transition-all ${config.gemColor === 'ruby' ? 'border-[#a80c2e] scale-110 shadow-[0_0_8px_#a80c2e]' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: '#a80c2e' }}
                />
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, gemColor: 'sapphire' }))}
                  title="Ceylon Sapphire"
                  className={`w-5 h-5 rounded-full border transition-all ${config.gemColor === 'sapphire' ? 'border-[#0f3885] scale-110 shadow-[0_0_8px_#0f3885]' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: '#0f3885' }}
                />
                <button
                  onClick={() => setConfig((prev) => ({ ...prev, gemColor: 'diamond' }))}
                  title="Ideal Cut Diamond"
                  className={`w-5 h-5 rounded-full border transition-all ${config.gemColor === 'diamond' ? 'border-white scale-110 shadow-[0_0_8px_#ffffff]' : 'border-transparent opacity-60'}`}
                  style={{ backgroundColor: '#ffffff' }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              className={`p-1.5 rounded-lg text-xs transition-colors ${autoRotate ? 'text-[#d4af37] bg-[#d4af37]/10' : 'text-gray-400 hover:text-white'}`}
              title="Toggle Auto Rotation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>

            <button
              onClick={() => setLightingPreset((prev) => (prev === 'city' ? 'studio' : prev === 'studio' ? 'sunset' : 'city'))}
              className="p-1.5 rounded-lg text-xs text-gray-400 hover:text-[#d4af37] transition-colors"
              title={`Lighting: ${lightingPreset}`}
            >
              <Layers className="w-4 h-4" />
            </button>

            {onExpandFullScreen && (
              <button
                onClick={onExpandFullScreen}
                className="p-1.5 rounded-lg text-xs text-gray-400 hover:text-[#d4af37] transition-colors"
                title="View Fullscreen 3D Inspector"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

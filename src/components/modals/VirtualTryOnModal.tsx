import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Camera, Upload, Sparkles, Move, RotateCw, ZoomIn, Download, RefreshCw, Check, Sun, Sliders } from 'lucide-react';
import { PRODUCTS, type Product } from '../../data/products';

interface VirtualTryOnModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialProduct?: Product;
}

export const VirtualTryOnModal: React.FC<VirtualTryOnModalProps> = ({
  isOpen,
  onClose,
  initialProduct
}) => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(initialProduct || PRODUCTS[0]);
  
  // User Photo State (Preset / Uploaded / Webcam)
  const [userPhoto, setUserPhoto] = useState<string>('/assets/kavya_brand_ambassador.jpg');
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Photorealistic AR Fitting Adjustments
  const [position, setPosition] = useState({ x: 0, y: 80 });
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [tiltX, setTiltX] = useState(0);
  const [opacity, setOpacity] = useState(0.95);
  const [skinWarmth, setSkinWarmth] = useState<'natural' | 'warm' | 'cool' | 'vivid'>('natural');
  const [shadowDepth, setShadowDepth] = useState(0.5);
  const [blendMode, setBlendMode] = useState<'normal' | 'soft-light' | 'overlay'>('normal');

  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  // Auto-anchor position based on jewellery category when product changes
  useEffect(() => {
    if (initialProduct) {
      setSelectedProduct(initialProduct);
    }
  }, [initialProduct]);

  useEffect(() => {
    // Smart Positioning Anchors
    switch (selectedProduct.category) {
      case 'Earrings':
        setPosition({ x: 0, y: -40 });
        setScale(0.85);
        break;
      case 'Rings':
        setPosition({ x: 0, y: 140 });
        setScale(0.65);
        break;
      case 'Bangles':
        setPosition({ x: 0, y: 120 });
        setScale(0.75);
        break;
      case 'Bridal':
      case 'Necklaces':
      default:
        setPosition({ x: 0, y: 70 });
        setScale(1.0);
        break;
    }
  }, [selectedProduct]);

  // Clean up webcam stream
  const stopWebcam = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    setIsWebcamActive(false);
  };

  const handleClose = () => {
    stopWebcam();
    onClose();
  };

  // Start Live Camera
  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720, facingMode: 'user' } });
      streamRef.current = stream;
      setIsWebcamActive(true);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.warn('Webcam permission denied or unavailable:', err);
      alert('Camera access unavailable. You can upload your photo or select a model.');
    }
  };

  // Capture Photo from Camera
  const captureWebcamPhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth || 640;
      canvas.height = videoRef.current.videoHeight || 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/jpeg');
        setUserPhoto(dataUrl);
        stopWebcam();
      }
    }
  };

  // Upload Custom Photo
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUserPhoto(event.target.result as string);
          stopWebcam();
        }
      };
      reader.readAsDataURL(file);
    }
  };

  // Mouse Drag Fitting Controls
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragStart.current = { x: e.clientX - position.x, y: e.clientY - position.y };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetFitting = () => {
    setPosition({ x: 0, y: 70 });
    setScale(1);
    setRotation(0);
    setTiltX(0);
    setOpacity(0.95);
    setSkinWarmth('natural');
    setShadowDepth(0.5);
    setBlendMode('normal');
  };

  // Filter effect CSS for realistic skin light matching
  const getLightingFilterCss = () => {
    switch (skinWarmth) {
      case 'warm':
        return 'sepia(0.2) saturate(1.25) contrast(1.02)';
      case 'cool':
        return 'saturate(0.9) contrast(1.08) hue-rotate(345deg)';
      case 'vivid':
        return 'saturate(1.3) contrast(1.1) brightness(1.05)';
      case 'natural':
      default:
        return 'none';
    }
  };

  // Download Composite Photo
  const handleDownloadPortrait = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 1080;
    canvas.height = 1080;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const baseImg = new Image();
    baseImg.crossOrigin = 'anonymous';
    baseImg.src = userPhoto;

    baseImg.onload = () => {
      ctx.drawImage(baseImg, 0, 0, 1080, 1080);

      const itemImg = new Image();
      itemImg.crossOrigin = 'anonymous';
      itemImg.src = selectedProduct.image;

      itemImg.onload = () => {
        // Draw Soft Contact Shadow underneath
        ctx.save();
        ctx.translate(540 + position.x * 1.5, 540 + position.y * 1.5 + 15);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = shadowDepth * 0.4;
        ctx.filter = 'blur(12px) contrast(0.5)';
        const shadowW = 460 * scale;
        const shadowH = 460 * scale;
        ctx.drawImage(itemImg, -shadowW / 2, -shadowH / 2, shadowW, shadowH);
        ctx.restore();

        // Draw Main Realistic Jewellery Overlay
        ctx.save();
        ctx.translate(540 + position.x * 1.5, 540 + position.y * 1.5);
        ctx.rotate((rotation * Math.PI) / 180);
        ctx.globalAlpha = opacity;
        const itemW = 450 * scale;
        const itemH = 450 * scale;
        ctx.drawImage(itemImg, -itemW / 2, -itemH / 2, itemW, itemH);
        ctx.restore();

        // Add Luxury Watermark
        ctx.fillStyle = 'rgba(212, 175, 55, 0.9)';
        ctx.font = 'bold 24px "Cinzel", serif';
        ctx.fillText('ABHARANA BY KAVYA • VIRTUAL TRY-ON ATELIER', 40, 1040);

        const link = document.createElement('a');
        link.download = `abharana-tryon-${selectedProduct.id}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();

        setDownloadSuccess(true);
        setTimeout(() => setDownloadSuccess(false), 3000);
      };
    };
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 z-50 bg-[#070709]/90 backdrop-blur-xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-4 md:inset-8 z-50 rounded-3xl bg-[#0b0b10] border border-[#d4af37]/40 shadow-2xl flex flex-col lg:flex-row overflow-hidden max-w-7xl mx-auto my-auto max-h-[92vh]"
          >
            {/* Close Button */}
            <button
              onClick={handleClose}
              className="absolute top-5 right-5 z-40 p-2.5 rounded-full glass-panel-dark text-gray-400 hover:text-white hover:border-[#d4af37] transition-all"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Live AR Interactive Fitting Canvas Stage */}
            <div className="lg:w-7/12 h-[460px] lg:h-full relative bg-[#070709] overflow-hidden flex items-center justify-center select-none">
              
              {/* Active Webcam Feed OR User Photo Background */}
              {isWebcamActive ? (
                <div className="relative w-full h-full flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover transform -scale-x-100"
                  />
                  <button
                    onClick={captureWebcamPhoto}
                    className="absolute bottom-6 px-6 py-3 rounded-full bg-[#d4af37] text-[#070709] font-sans-clean font-bold text-xs uppercase tracking-widest flex items-center gap-2 shadow-2xl hover:brightness-110 transition-all z-30"
                  >
                    <Camera className="w-4 h-4" />
                    SNAP PORTRAIT FOR FITTING
                  </button>
                </div>
              ) : (
                <div
                  className="relative w-full h-full flex items-center justify-center overflow-hidden cursor-move"
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                >
                  {/* User Model Portrait Background */}
                  <img
                    src={userPhoto}
                    alt="Try-On Model Portrait"
                    className="w-full h-full object-cover pointer-events-none"
                    draggable={false}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070709]/50 via-transparent to-transparent pointer-events-none" />

                  {/* Real Contact Shadow Layer underneath piece */}
                  <div
                    className="absolute pointer-events-none rounded-full bg-black/60 blur-xl transition-transform"
                    style={{
                      transform: `translate(${position.x}px, ${position.y + 12}px) rotate(${rotation}deg) scale(${scale * 0.95})`,
                      width: '280px',
                      height: '280px',
                      opacity: shadowDepth,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                  />

                  {/* Overlaid Fitted Jewellery Piece with Photorealistic Skin Blend & Perspective Tilt */}
                  <div
                    className="absolute pointer-events-none transition-transform"
                    style={{
                      transform: `perspective(1000px) translate(${position.x}px, ${position.y}px) rotateX(${tiltX}deg) rotate(${rotation}deg) scale(${scale})`,
                      opacity: opacity,
                      mixBlendMode: blendMode,
                      filter: `${getLightingFilterCss()} drop-shadow(0 12px 25px rgba(0,0,0,0.7))`,
                      transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                    }}
                  >
                    <img
                      src={selectedProduct.image}
                      alt={selectedProduct.name}
                      className="w-[280px] sm:w-[350px] max-w-none object-contain"
                      draggable={false}
                    />
                  </div>

                  {/* Overlay Drag Guide Helper */}
                  <div className="absolute bottom-4 left-4 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full glass-panel-dark text-xs text-[#e8d08d] border border-[#d4af37]/30">
                    <Move className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Drag jewellery to position on your portrait</span>
                  </div>
                </div>
              )}

              {/* Photo Source Switcher Bar */}
              <div className="absolute top-4 left-4 z-30 flex items-center gap-2">
                <button
                  onClick={startWebcam}
                  className="px-3.5 py-1.5 rounded-full glass-panel-dark border border-[#d4af37]/30 text-xs font-sans-clean font-medium text-white hover:text-[#d4af37] flex items-center gap-1.5 transition-all"
                >
                  <Camera className="w-3.5 h-3.5 text-[#d4af37]" />
                  Open Camera
                </button>

                <label className="px-3.5 py-1.5 rounded-full glass-panel-dark border border-[#d4af37]/30 text-xs font-sans-clean font-medium text-white hover:text-[#d4af37] flex items-center gap-1.5 transition-all cursor-pointer">
                  <Upload className="w-3.5 h-3.5 text-[#d4af37]" />
                  Upload Photo
                  <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                </label>
              </div>

            </div>

            {/* Right Column: Product Selector & Realism Controls */}
            <div className="lg:w-5/12 p-6 lg:p-8 flex flex-col justify-between overflow-y-auto no-scrollbar bg-[#0b0b10] border-t lg:border-t-0 lg:border-l border-white/10">
              
              <div>
                {/* Section Badge */}
                <div className="flex items-center gap-2 px-3 py-1 rounded-full glass-panel-dark border border-[#d4af37]/30 w-fit mb-4">
                  <Sparkles className="w-3.5 h-3.5 text-[#d4af37]" />
                  <span className="font-sans-clean text-[10px] uppercase tracking-widest text-[#e8d08d]">
                    PHOTOREALISTIC VIRTUAL TRY-ON
                  </span>
                </div>

                <h2 className="font-heading-brand text-2xl text-[#fcfaf7] uppercase tracking-wide font-light mb-2">
                  TRY ON FINE JEWELLERY
                </h2>

                <p className="font-serif-luxury text-sm text-[#f5ebd9]/80 italic mb-5">
                  Select any masterpiece to fit on your portrait in real-time.
                </p>

                {/* Product Selection Horizontal Grid */}
                <div className="mb-5">
                  <span className="text-[10px] uppercase font-sans-clean tracking-wider text-gray-400 block mb-2 font-semibold">
                    SELECT PIECE TO TRY ON:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
                    {PRODUCTS.map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setSelectedProduct(p)}
                        className={`w-16 h-16 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                          selectedProduct.id === p.id
                            ? 'border-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.5)] scale-105'
                            : 'border-white/10 opacity-60 hover:opacity-90'
                        }`}
                      >
                        <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Active Product Details */}
                <div className="p-3 rounded-xl glass-panel-dark border border-[#d4af37]/20 flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[10px] text-[#d4af37] font-sans-clean uppercase font-semibold block">Active Piece</span>
                    <span className="font-heading-brand text-sm text-white">{selectedProduct.name}</span>
                  </div>
                  <span className="font-heading-brand text-sm text-gold-gradient font-bold">
                    ₹{selectedProduct.priceINR.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Realism & Fitting Precision Controls */}
                <div className="space-y-3.5 p-4 rounded-2xl glass-panel-dark border border-white/10 mb-5">
                  <div className="flex items-center justify-between text-xs text-gray-300 font-sans-clean">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-400 uppercase text-[10px]">
                      <ZoomIn className="w-3.5 h-3.5 text-[#d4af37]" /> Size Scale
                    </span>
                    <span>{Math.round(scale * 100)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.4"
                    max="2.2"
                    step="0.05"
                    value={scale}
                    onChange={(e) => setScale(parseFloat(e.target.value))}
                    className="w-full accent-[#d4af37] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                  />

                  <div className="flex items-center justify-between text-xs text-gray-300 font-sans-clean">
                    <span className="flex items-center gap-1.5 font-semibold text-gray-400 uppercase text-[10px]">
                      <RotateCw className="w-3.5 h-3.5 text-[#d4af37]" /> Rotation & Tilt
                    </span>
                    <span>{rotation}° / {tiltX}°</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="range"
                      min="-45"
                      max="45"
                      step="1"
                      value={rotation}
                      onChange={(e) => setRotation(parseInt(e.target.value))}
                      className="w-full accent-[#d4af37] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                    />
                    <input
                      type="range"
                      min="-30"
                      max="30"
                      step="1"
                      value={tiltX}
                      onChange={(e) => setTiltX(parseInt(e.target.value))}
                      className="w-full accent-[#d4af37] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Skin Tone Lighting Matching Selector */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-[10px] uppercase font-sans-clean text-gray-400 font-semibold mb-2">
                      <span className="flex items-center gap-1">
                        <Sun className="w-3.5 h-3.5 text-[#d4af37]" /> Skin Lighting Match:
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1.5">
                      {(['natural', 'warm', 'cool', 'vivid'] as const).map((w) => (
                        <button
                          key={w}
                          onClick={() => setSkinWarmth(w)}
                          className={`py-1 rounded-md text-[10px] font-sans-clean uppercase font-semibold transition-all ${
                            skinWarmth === w
                              ? 'bg-[#d4af37] text-[#070709]'
                              : 'bg-white/5 text-gray-400 hover:text-white'
                          }`}
                        >
                          {w}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Contact Shadow Depth */}
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs text-gray-300 font-sans-clean mb-1">
                      <span className="flex items-center gap-1.5 font-semibold text-gray-400 uppercase text-[10px]">
                        <Sliders className="w-3.5 h-3.5 text-[#d4af37]" /> Skin Contact Shadow
                      </span>
                      <span>{Math.round(shadowDepth * 100)}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.05"
                      value={shadowDepth}
                      onChange={(e) => setShadowDepth(parseFloat(e.target.value))}
                      className="w-full accent-[#d4af37] bg-white/10 h-1.5 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3 pt-3 border-t border-white/10">
                <button
                  onClick={handleResetFitting}
                  className="p-3.5 rounded-full glass-panel-dark border border-white/20 text-gray-300 hover:text-[#d4af37] transition-colors"
                  title="Reset Fitting"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>

                <button
                  onClick={handleDownloadPortrait}
                  className={`flex-1 py-4 rounded-full font-sans-clean text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-xl ${
                    downloadSuccess
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gradient-to-r from-[#d4af37] via-[#f7e7c4] to-[#d4af37] text-[#070709] hover:brightness-110 shadow-[0_0_25px_rgba(212,175,55,0.4)]'
                  }`}
                >
                  {downloadSuccess ? (
                    <>
                      <Check className="w-4 h-4" />
                      FITTED PORTRAIT DOWNLOADED
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      DOWNLOAD FITTED PORTRAIT
                    </>
                  )}
                </button>
              </div>

            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

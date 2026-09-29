import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'view'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
      setIsTouchDevice(true);
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      if (!target) return;

      if (target.closest('button, a, input, [role="button"], .interactive-element')) {
        setCursorVariant('hover');
      } else if (target.closest('.canvas-container, canvas, [data-cursor="view"]')) {
        setCursorVariant('view');
      } else {
        setCursorVariant('default');
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* Small Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#d4af37] rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          x: mousePosition.x - 5,
          y: mousePosition.y - 5,
          scale: cursorVariant === 'hover' ? 0.4 : cursorVariant === 'view' ? 0.3 : 1
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Outer Follower Ring */}
      <motion.div
        className="fixed top-0 left-0 border border-[#d4af37]/60 rounded-full pointer-events-none z-50 flex items-center justify-center backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (cursorVariant === 'hover' ? 24 : cursorVariant === 'view' ? 36 : 16),
          y: mousePosition.y - (cursorVariant === 'hover' ? 24 : cursorVariant === 'view' ? 36 : 16),
          width: cursorVariant === 'hover' ? 48 : cursorVariant === 'view' ? 72 : 32,
          height: cursorVariant === 'hover' ? 48 : cursorVariant === 'view' ? 72 : 32,
          borderColor: cursorVariant === 'hover' ? '#e8d08d' : cursorVariant === 'view' ? '#d4af37' : 'rgba(212, 175, 55, 0.4)',
          backgroundColor: cursorVariant === 'view' ? 'rgba(212, 175, 55, 0.15)' : 'transparent'
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28, mass: 0.2 }}
      >
        {cursorVariant === 'view' && (
          <span className="font-heading-brand text-[9px] tracking-widest text-[#d4af37] font-semibold uppercase">
            VIEW
          </span>
        )}
      </motion.div>
    </>
  );
};

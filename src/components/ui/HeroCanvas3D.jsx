import React, { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

/**
 * Premium 3D Interactive Sneaker Showcase for Hero Section
 * Uses the local sneaker image from public/images/products/sneakers/Air Jordan Sneakers.png
 * - Immediate static rendering (preloaded, fetchpriority="high", CLS-safe aspect ratio)
 * - Seamless transition into real-time 3D tilt & physics without flicker or blank states
 * - Fallback resilience & reduced-motion accessibility support
 */
const HeroCanvas3D = () => {
  const containerRef = useRef(null);
  const [imageError, setImageError] = useState(false);
  const [is3DReady, setIs3DReady] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);

      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      // Initialize 3D physics smoothly after first paint has occurred
      const raf = requestAnimationFrame(() => {
        setIs3DReady(true);
      });

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
        cancelAnimationFrame(raf);
      };
    }
  }, []);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery-smooth 3D reaction
  const springConfig = { damping: 22, stiffness: 190, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], is3DReady && !prefersReducedMotion ? [16, -16] : [0, 0]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], is3DReady && !prefersReducedMotion ? [-24, 24] : [0, 0]);
  const shineX = useTransform(smoothX, [-0.5, 0.5], ['-20%', '120%']);
  const shadowTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const sneakerSrc = imageError
    ? '/images/products/sneakers/sneaker-1.svg'
    : '/images/products/sneakers/Air Jordan Sneakers.png';

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full min-h-[380px] sm:min-h-[460px] lg:min-h-[520px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
      style={{ perspective: 1200 }}
    >
      {/* Background Radial Ambient Lighting */}
      <div className="absolute w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-gradient-to-tr from-purple-700/25 via-indigo-600/15 to-transparent blur-[100px] pointer-events-none" />
      <div className="absolute w-56 h-56 rounded-full bg-purple-500/10 blur-[80px] pointer-events-none" />

      {/* Cyber Tech Circle Frame */}
      <div className="absolute w-[320px] sm:w-[420px] aspect-square rounded-full border border-purple-500/20 pointer-events-none animate-[spin_60s_linear_infinite]" />
      <div className="absolute w-[260px] sm:w-[340px] aspect-square rounded-full border border-purple-500/10 border-dashed pointer-events-none animate-[spin_40s_linear_infinite_reverse]" />

      {/* 3D Floating Sneaker Wrapper */}
      <motion.div
        animate={!prefersReducedMotion ? { y: [-12, 12, -12] } : { y: 0 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
        }}
        className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] aspect-[540/440] flex items-center justify-center p-4 transition-transform duration-300"
      >
        {/* Dynamic Light Reflection Sheen */}
        {is3DReady && !prefersReducedMotion && (
          <motion.div
            style={{ x: shineX }}
            className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-300/15 to-transparent skew-x-12 pointer-events-none opacity-60 rounded-3xl"
          />
        )}

        {/* Sneaker Image: Instant Display, Zero Shift, High Priority */}
        <img
          src={sneakerSrc}
          alt="Air Jordan Cyber Sneaker 3D Showcase"
          fetchPriority="high"
          loading="eager"
          decoding="async"
          width="540"
          height="440"
          onError={() => setImageError(true)}
          className="w-full h-full max-h-[380px] sm:max-h-[440px] object-contain drop-shadow-[0_20px_35px_rgba(139,92,246,0.35)] drop-shadow-[0_45px_70px_rgba(0,0,0,0.85)] filter select-none pointer-events-none"
          style={{
            transform: is3DReady ? 'translateZ(40px)' : 'none',
            transition: 'transform 0.4s ease-out',
          }}
        />
      </motion.div>

      {/* Ground Reactive Contact Shadow */}
      <motion.div
        style={{ x: shadowTranslateX }}
        animate={!prefersReducedMotion ? {
          scale: [0.9, 1.1, 0.9],
          opacity: [0.6, 0.8, 0.6],
        } : { scale: 1, opacity: 0.7 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 sm:bottom-10 w-[240px] sm:w-[340px] h-8 sm:h-12 bg-black/85 rounded-full blur-xl pointer-events-none"
      />
      
      {/* Secondary Purple Neon Glow Shadow */}
      <motion.div
        animate={!prefersReducedMotion ? {
          scale: [0.85, 1.05, 0.85],
          opacity: [0.35, 0.55, 0.35],
        } : { scale: 1, opacity: 0.45 }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 sm:bottom-10 w-[200px] sm:w-[280px] h-6 sm:h-10 bg-purple-600/35 rounded-full blur-2xl pointer-events-none"
      />

      {/* Interactive 3D Status Pill */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 sm:left-6 sm:translate-x-0 glass-panel border border-purple-500/30 px-3.5 py-1.5 rounded-full flex items-center gap-2 pointer-events-none z-20 shadow-glow-purple">
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-[10px] font-mono tracking-wider text-purple-300 font-bold uppercase">
          3D DEPTH INTERACTION &bull; HOVER TO TILT
        </span>
      </div>
    </div>
  );
};

export default HeroCanvas3D;

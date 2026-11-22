import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Sparkles, Zap, ShieldCheck } from 'lucide-react';

/**
 * Premium 3D Interactive Sneaker Showcase for Hero Section
 * Uses the local sneaker image from public/images/products/sneakers/Air Jordan Sneakers.png
 * Features realistic 3D perspective tilt, mouse tracking, floating animation,
 * dynamic multi-layer purple neon glow, and responsive ground contact shadow.
 */
const HeroCanvas3D = () => {
  const containerRef = useRef(null);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Mouse position values for 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Spring physics for buttery-smooth 3D reaction
  const springConfig = { damping: 20, stiffness: 180, mass: 0.6 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // 3D rotation transforms
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [16, -16]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-24, 24]);
  const shineX = useTransform(smoothX, [-0.5, 0.5], ['0%', '100%']);
  const shadowTranslateX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
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
      className="relative w-full h-full min-h-[400px] sm:min-h-[480px] lg:min-h-[560px] flex items-center justify-center select-none cursor-grab active:cursor-grabbing"
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
        animate={{
          y: [-12, 12, -12],
        }}
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
        className="relative z-10 w-full max-w-[480px] sm:max-w-[540px] flex items-center justify-center p-4"
      >
        {/* Dynamic Light Reflection Sheen */}
        <motion.div
          style={{ x: shineX }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-400/10 to-transparent skew-x-12 pointer-events-none opacity-50"
        />

        {/* Sneaker Image from public/images/products/sneakers/ */}
        <img
          src={sneakerSrc}
          alt="Air Jordan Cyber Sneaker 3D Showcase"
          onError={() => setImageError(true)}
          onLoad={() => setImageLoaded(true)}
          className={`w-full max-h-[380px] sm:max-h-[440px] object-contain transition-all duration-700 drop-shadow-[0_20px_35px_rgba(139,92,246,0.35)] drop-shadow-[0_45px_70px_rgba(0,0,0,0.85)] filter ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
          style={{
            transform: 'translateZ(40px)',
          }}
        />
      </motion.div>

      {/* Ground Reactive Contact Shadow */}
      <motion.div
        style={{ x: shadowTranslateX }}
        animate={{
          scale: [0.9, 1.1, 0.9],
          opacity: [0.6, 0.8, 0.6],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-6 sm:bottom-10 w-[240px] sm:w-[340px] h-8 sm:h-12 bg-black/85 rounded-full blur-xl pointer-events-none"
      />
      
      {/* Secondary Purple Neon Glow Shadow */}
      <motion.div
        animate={{
          scale: [0.85, 1.05, 0.85],
          opacity: [0.35, 0.55, 0.35],
        }}
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

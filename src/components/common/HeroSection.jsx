import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, ShieldCheck, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import HeroCanvas3D from '../ui/HeroCanvas3D';

const HeroSection = () => {
  return (
    <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden py-12 lg:py-6">
      {/* Background glowing gradients */}
      <div className="absolute top-1/4 -left-48 w-96 h-96 bg-purple-700/20 rounded-full blur-[128px] pointer-events-none" />
      <div className="absolute top-1/3 -right-48 w-96 h-96 bg-indigo-600/20 rounded-full blur-[128px] pointer-events-none" />

      {/* Cyber Grid Subtle Overlay */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          
          {/* Left Text Column (7 Cols on LG) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 flex flex-col justify-center text-left"
          >
            {/* Hologram Status Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 backdrop-blur-md self-start shadow-glow-purple">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping" />
              <Sparkles className="w-3.5 h-3.5 text-purple-300" />
              <span>NOVA CYBER-GLIDE X1 // 3D FLAGSHIP RELEASE</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.08] mb-6">
              STYLE THAT{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-400">
                DEFINES YOU.
              </span>
            </h1>

            {/* Supporting description */}
            <p className="text-base sm:text-lg text-nova-muted max-w-xl leading-relaxed mb-8">
              Discover premium sneakers, fashion, accessories and lifestyle essentials — curated for your everyday style.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-12">
              <Link
                to="/shop"
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm tracking-wide text-white bg-gradient-to-r from-purple-600 via-purple-500 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition-all duration-300 hover:scale-[1.02]"
              >
                <span>Shop Now &bull; In PKR</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>

              <a
                href="#categories"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold text-sm tracking-wide text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/30 transition-all duration-300 backdrop-blur-md"
              >
                Explore Categories
              </a>
            </div>

            {/* Key Metrics / Highlights in PKR */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10 max-w-lg">
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">45K+</p>
                <p className="text-xs text-nova-muted mt-0.5">Orders Delivered</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">99.8%</p>
                <p className="text-xs text-nova-muted mt-0.5">Satisfaction</p>
              </div>
              <div>
                <p className="text-2xl sm:text-3xl font-extrabold text-white">PKR</p>
                <p className="text-xs text-nova-muted mt-0.5">Official Currency</p>
              </div>
            </div>
          </motion.div>

          {/* Right 3D Sneaker Column (5 Cols on LG) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative flex items-center justify-center"
          >
            {/* 3D Canvas Box */}
            <div className="relative w-full aspect-square max-w-[520px]">
              <HeroCanvas3D />

              {/* Floating Spatial Tech Tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="absolute top-4 left-0 sm:-left-4 glass-panel border border-purple-500/30 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg shadow-purple-900/30 pointer-events-none"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <Zap className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-purple-400">Carbon Fiber Shank</p>
                  <p className="text-xs font-semibold text-white">Dynamic Energy Return</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute bottom-6 right-0 sm:-right-4 glass-panel border border-purple-500/30 px-3.5 py-2 rounded-xl flex items-center gap-2.5 shadow-lg shadow-purple-900/30 pointer-events-none"
              >
                <div className="w-7 h-7 rounded-lg bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-[10px] uppercase font-bold text-purple-400">Purple Neon LED</p>
                  <p className="text-xs font-semibold text-white">Adaptive Sole Glow</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import React from 'react';
import { motion } from 'framer-motion';
import { Zap, ShieldCheck, Box, RotateCcw, Headphones, Leaf, Sparkles } from 'lucide-react';

const valuePillars = [
  {
    icon: Zap,
    title: 'Hyper-Speed Logistics',
    description: 'Autonomous global fulfillment nodes ensure next-day dispatch and real-time biometric tracking across 120+ countries.',
  },
  {
    icon: ShieldCheck,
    title: 'Quantum-Grade Security',
    description: 'Every checkout and user profile is guarded with zero-knowledge cryptographic encryption protocols.',
  },
  {
    icon: Box,
    title: 'Spatial 3D Preview',
    description: 'Inspect hardware in real-time WebGL 3D, analyzing material reflections and micro-tolerances before purchasing.',
  },
  {
    icon: RotateCcw,
    title: '30-Day Holographic Return',
    description: 'Hassle-free return policy with instant QR pickup and instant digital refunds to your preferred payment method.',
  },
  {
    icon: Headphones,
    title: '24/7 Concierge Support',
    description: 'Direct priority assistance from our specialized product specialists, ready to assist day and night.',
  },
  {
    icon: Leaf,
    title: 'Carbon-Neutral Impact',
    description: '100% of our packaging is biodegradable mycelium foam, and all server compute is solar-powered.',
  },
];

const WhyChooseNova = () => {
  return (
    <section className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The NOVA Standard</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Why Choose NOVA
          </h2>
          <p className="text-sm sm:text-base text-nova-muted leading-relaxed">
            Engineered from the ground up for pioneers who demand superior craftsmanship,
            cutting-edge digital interaction, and uncompromising reliability.
          </p>
        </div>

        {/* 6 Value Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {valuePillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="group relative p-8 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition-all duration-300 hover:shadow-glow-purple flex flex-col justify-between"
              >
                {/* Subtle top corner ambient glow */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-purple-600/10 rounded-full blur-2xl group-hover:bg-purple-600/20 transition-all pointer-events-none" />

                <div>
                  <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:text-purple-300 transition-all duration-300 mb-6 shadow-glow-purple">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-nova-muted leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-purple-400/60">
                  <span>SYSTEM PILLAR 0{idx + 1}</span>
                  <span className="w-2 h-2 rounded-full bg-purple-500/40 group-hover:bg-purple-400 transition-colors" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseNova;

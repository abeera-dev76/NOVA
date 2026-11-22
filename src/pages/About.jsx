import React from 'react';
import { Sparkles, Eye, Target, Compass, Award } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          <span>About NOVA</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Pioneering the Next Era of Digital Couture
        </h1>
        <p className="text-sm sm:text-base text-nova-muted leading-relaxed">
          Born at the intersection of aerospace materials, cybernetic ergonomics, and WebGL 3D rendering,
          NOVA is redefining e-commerce luxury for collectors and pioneers across Pakistan and beyond.
        </p>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <div className="p-8 rounded-3xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-glow-purple">
            <Eye className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
          <p className="text-xs sm:text-sm text-nova-muted leading-relaxed">
            To eliminate the boundary between digital interaction and physical luxury, allowing consumers to inspect micro-tolerances in real-time 3D before delivery.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-glow-purple">
            <Target className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
          <p className="text-xs sm:text-sm text-nova-muted leading-relaxed">
            Engineering products that balance maximum athletic performance with timeless cybernetic aesthetics, manufactured under carbon-neutral principles.
          </p>
        </div>

        <div className="p-8 rounded-3xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition">
          <div className="w-12 h-12 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-glow-purple">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">The NOVA Guarantee</h3>
          <p className="text-xs sm:text-sm text-nova-muted leading-relaxed">
            Every product shipped across Pakistan comes with an official certificate of authenticity, 30-day return coverage, and 24/7 concierge priority support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

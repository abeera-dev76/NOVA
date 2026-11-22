import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote, CheckCircle2, Sparkles } from 'lucide-react';
import { reviews } from '../../data/reviews';

const enhancedTestimonials = [
  ...reviews,
  {
    id: 'rev-04',
    author: 'Kaelen Thorne',
    role: 'Cybersecurity Architect',
    rating: 5,
    date: '2026-11-12',
    title: 'Exceeded every high expectation',
    comment: 'The mechanical keyboard switches feel astronomical. Build heft, illumination, and response speed are genuinely unrivaled in today’s market.',
    verifiedPurchase: true,
  },
  {
    id: 'rev-05',
    author: 'Seraphina Lin',
    role: 'Industrial Designer',
    rating: 5,
    date: '2026-11-18',
    title: 'Flawless 3D previews and fast delivery',
    comment: 'What you see in the real-time 3D viewport matches the physical titanium hardware down to the micron. Incredible attention to design detail.',
    verifiedPurchase: true,
  },
];

const CustomerTestimonials = () => {
  return (
    <section className="py-20 lg:py-28 relative bg-[#09090e]/70 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Verified Sentiments</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            Customer Testimonials
          </h2>
          <p className="text-sm sm:text-base text-nova-muted leading-relaxed">
            Discover what innovators, creators, and cyber-enthusiasts say about the NOVA ecosystem.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {enhancedTestimonials.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="p-8 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between hover:shadow-glow-purple"
            >
              <div>
                {/* Rating & Quote Icon */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-1">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-purple-500/30" />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-white mb-2">
                  &ldquo;{item.title}&rdquo;
                </h3>

                {/* Comment */}
                <p className="text-sm text-gray-300 leading-relaxed mb-6">
                  {item.comment}
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 border-t border-white/5 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white flex items-center gap-1.5">
                    <span>{item.author}</span>
                    {item.verifiedPurchase && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" title="Verified Purchase" />
                    )}
                  </h4>
                  <p className="text-xs text-nova-muted">
                    {item.role || 'Verified Collector'} &bull; {item.date}
                  </p>
                </div>

                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center font-bold text-xs text-white">
                  {item.author.charAt(0)}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default CustomerTestimonials;

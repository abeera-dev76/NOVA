import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowUpRight, Footprints, Headphones, Watch, Briefcase, Gamepad2, Glasses, Speaker, Sparkles } from 'lucide-react';
import { categories } from '../../data/categories';
import ImageWithFallback from '../ui/ImageWithFallback';

const iconMap = {
  sneakers: Footprints,
  headphones: Headphones,
  watches: Watch,
  handbags: Briefcase,
  gaming: Gamepad2,
  sunglasses: Glasses,
  speakers: Speaker,
};

const FeaturedCategories = () => {
  return (
    <section id="categories" className="py-20 lg:py-28 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Curated Ecosystem</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured Categories
            </h2>
          </div>
          <Link
            to="/shop"
            className="inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <span>View All Collections</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => {
            const IconComponent = iconMap[category.id] || Sparkles;

            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
              >
                <Link
                  to={`/shop?category=${category.slug}`}
                  className="group relative block p-5 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/50 transition-all duration-300 overflow-hidden hover:shadow-glow-purple h-full flex flex-col justify-between"
                >
                  {/* Background Ambient Glow */}
                  <div className="absolute -top-16 -right-16 w-32 h-32 bg-purple-600/10 group-hover:bg-purple-600/20 rounded-full blur-2xl transition-all duration-500 pointer-events-none" />

                  <div>
                    {/* Category Image Preview Box */}
                    <div className="relative w-full h-36 rounded-xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                      <ImageWithFallback
                        src={category.image}
                        alt={category.name}
                        category={category.id}
                        className="group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-2.5 right-2.5 z-10 text-[10px] font-mono text-white/70 bg-black/70 px-2 py-0.5 rounded-full border border-white/10">
                        {category.itemCount} items
                      </div>
                    </div>

                    {/* Title & Icon Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-8 h-8 rounded-lg bg-purple-900/30 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:text-purple-300">
                        <IconComponent className="w-4 h-4" />
                      </div>
                      <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                        {category.name}
                      </h3>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-nova-muted leading-relaxed line-clamp-2">
                      {category.description}
                    </p>
                  </div>

                  {/* Bottom Link Arrow */}
                  <div className="mt-5 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-semibold text-purple-400/80 group-hover:text-purple-300">
                    <span>Explore Collection</span>
                    <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FeaturedCategories;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';

const filterCategories = [
  { id: 'all', label: 'All Gear' },
  { id: 'sneakers', label: 'Sneakers' },
  { id: 'headphones', label: 'Audio' },
  { id: 'watches', label: 'Watches' },
  { id: 'handbags', label: 'Handbags' },
  { id: 'gaming', label: 'Gaming' },
  { id: 'sunglasses', label: 'Sunglasses' },
  { id: 'speakers', label: 'Speakers' },
];

const TrendingProducts = () => {
  const [activeTab, setActiveTab] = useState('all');

  const filteredProducts = activeTab === 'all'
    ? products
    : products.filter(p => p.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section className="py-20 lg:py-28 relative bg-[#09090e]/60 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Title and Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-2">
              <Flame className="w-3.5 h-3.5 text-purple-400" />
              <span>In High Demand</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Trending Products
            </h2>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#12121b] border border-white/10 self-start lg:self-auto">
            {filterCategories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`relative px-4 py-2 text-xs font-semibold rounded-xl transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-white'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {activeTab === tab.id && (
                  <motion.div
                    layoutId="trendingTabActive"
                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-glow-purple"
                    transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence>
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Link
            to="/shop"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-sm font-semibold text-white bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/40 transition-all duration-300 backdrop-blur-md hover:scale-105"
          >
            <span>Explore All {products.length} Products</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
          </Link>
        </div>

      </div>
    </section>
  );
};

export default TrendingProducts;

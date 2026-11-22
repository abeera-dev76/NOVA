import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, ShoppingBag } from 'lucide-react';
import { products } from '../../data/products';
import ProductCard from './ProductCard';
import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/currency';
import ImageWithFallback from '../ui/ImageWithFallback';

const NewArrivals = () => {
  const { addToCart } = useCart();
  const newProducts = products.filter((p) => p.isNew);
  const spotlightProduct = newProducts[0] || products[0];
  const sideProducts = newProducts.slice(1, 5);

  return (
    <section className="py-16 lg:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold tracking-widest text-nova-purple uppercase mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Just Dropped</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              New Arrivals
            </h2>
          </div>
          <Link
            to="/shop?sort=newest"
            className="inline-flex items-center gap-1 text-sm font-semibold text-purple-400 hover:text-purple-300 transition-colors group"
          >
            <span>See Latest Drops</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Compact & Proportional Spotlight Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Spotlight Card - Reduced & Balanced */}
          {spotlightProduct && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -4 }}
              className="lg:col-span-6 rounded-2xl bg-gradient-to-br from-[#12121c] to-[#0a0a10] border border-purple-500/30 p-5 sm:p-6 flex flex-col justify-between relative overflow-hidden group hover:border-purple-400/60 transition-all duration-300 shadow-glow-purple"
            >
              {/* Background Ambient Radial */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/15 rounded-full blur-3xl pointer-events-none group-hover:bg-purple-600/25 transition-all" />

              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                    Spotlight Edition
                  </span>
                  <span className="text-xs font-mono text-purple-300">
                    LIMITED RELEASE
                  </span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black text-white mb-2 group-hover:text-purple-300 transition-colors">
                  {spotlightProduct.name}
                </h3>
                <p className="text-xs sm:text-sm text-nova-muted max-w-md mb-4 leading-relaxed line-clamp-2">
                  {spotlightProduct.description}
                </p>

                {/* Compact Specs Row */}
                {spotlightProduct.specs && (
                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {Object.entries(spotlightProduct.specs).slice(0, 3).map(([key, val], idx) => (
                      <div key={idx} className="p-2 rounded-lg bg-white/5 border border-white/5">
                        <p className="text-[9px] uppercase font-bold text-purple-400 tracking-wider">
                          {key}
                        </p>
                        <p className="text-[11px] font-semibold text-white mt-0.5 truncate">
                          {val}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Proportionate Image Box */}
              <div className="w-full h-44 sm:h-48 rounded-xl overflow-hidden mb-4 border border-white/10 bg-black/40 flex items-center justify-center p-3">
                <ImageWithFallback
                  src={spotlightProduct.images?.[0]}
                  alt={spotlightProduct.name}
                  category={spotlightProduct.category}
                  className="max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Price & Action Row */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/10">
                <div>
                  <span className="text-[10px] text-white/40 block">Special Launch Price</span>
                  <span className="text-xl sm:text-2xl font-black text-white">
                    {formatPrice(spotlightProduct.price)}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Link
                    to={`/product/${spotlightProduct.id}`}
                    className="px-3.5 py-2 rounded-xl text-xs font-bold text-gray-300 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 transition"
                  >
                    View Specs
                  </Link>

                  <button
                    onClick={() => addToCart(spotlightProduct, 1)}
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center gap-1.5 shadow-glow-purple transition hover:scale-105"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Secure</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* 4 Companion Product Cards (2x2 Grid, Equal Proportion) */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            {sideProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};

export default NewArrivals;

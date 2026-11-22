import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Star, Check, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { formatPrice } from '../../utils/currency';
import ImageWithFallback from '../ui/ImageWithFallback';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAdded, setIsAdded] = useState(false);

  const isFavorited = wishlistItems?.some((item) => item.id === product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#0e0e15] rounded-2xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 flex flex-col overflow-hidden hover:shadow-glow-purple"
    >
      {/* Top Media Container */}
      <Link
        to={`/product/${product.id}`}
        className="relative block w-full aspect-square overflow-hidden bg-[#12121c]"
      >
        <ImageWithFallback
          src={product.images?.[0]}
          alt={product.name}
          category={product.category}
          className="group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
          {product.isNew && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm">
              NEW
            </span>
          )}
          {product.originalPrice && product.originalPrice > product.price && (
            <span className="px-2.5 py-1 text-[10px] font-bold tracking-wider uppercase rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-purple-300">
              {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Toggle Button */}
        <button
          onClick={handleWishlistToggle}
          aria-label="Toggle wishlist"
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md border transition-all duration-300 ${
            isFavorited
              ? 'bg-purple-600/90 border-purple-400 text-white shadow-glow-purple'
              : 'bg-black/40 border-white/10 text-gray-300 hover:text-white hover:bg-black/60'
          }`}
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-white' : ''}`} />
        </button>

        {/* Quick View Corner Hint */}
        <div className="absolute bottom-3 right-3 z-10 w-8 h-8 rounded-full bg-black/60 border border-white/10 backdrop-blur-md flex items-center justify-center text-white/60 opacity-0 group-hover:opacity-100 transition-opacity">
          <ArrowUpRight className="w-4 h-4" />
        </div>
      </Link>

      {/* Info Container */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-nova-muted mb-2">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-purple-400">
              {product.category}
            </span>
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              <span className="text-white font-medium">{product.rating}</span>
              <span className="text-white/40">({product.reviewsCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.id}`}>
            <h3 className="text-base font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Color swatches preview */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center gap-1.5 mt-2.5">
              {product.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="w-3 h-3 rounded-full border border-white/20"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Price & Action Button */}
        <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between gap-3">
          <div className="flex flex-col">
            <span className="text-[11px] text-white/40">Price (PKR)</span>
            <div className="flex items-baseline gap-2">
              <span className="text-base sm:text-lg font-extrabold text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-white/40 line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold tracking-wide flex items-center gap-1.5 transition-all duration-300 shadow-md ${
              isAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white shadow-glow-purple'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;

import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!wishlistItems || wishlistItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-glow-purple">
          <Heart className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Your Wishlist is Empty</h1>
        <p className="text-nova-muted max-w-sm mb-8">
          Save your favorite cyber gear to your personal wishlist for easy tracking.
        </p>
        <Link
          to="/shop"
          className="px-8 py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition"
        >
          Explore Shop
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 pb-4 border-b border-white/10">
        <h1 className="text-3xl font-black text-white">Your Saved Wishlist</h1>
        <p className="text-sm text-nova-muted">{wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved in PKR</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlistItems.map((product) => (
          <div
            key={product.id}
            className="p-5 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition flex flex-col justify-between"
          >
            <div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-black/40 mb-4 border border-white/5">
                <ImageWithFallback
                  src={product.images?.[0]}
                  alt={product.name}
                  category={product.category}
                />
                <button
                  onClick={() => removeFromWishlist(product.id)}
                  className="absolute top-2.5 right-2.5 p-2 rounded-full bg-black/60 hover:bg-rose-900/60 text-white/80 hover:text-white transition"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                {product.category}
              </span>
              <Link to={`/product/${product.id}`}>
                <h3 className="text-base font-bold text-white hover:text-purple-300 transition line-clamp-1 mt-1">
                  {product.name}
                </h3>
              </Link>
              <p className="text-base font-extrabold text-white mt-2">
                {formatPrice(product.price)}
              </p>
            </div>

            <button
              onClick={() => {
                addToCart(product, 1);
                removeFromWishlist(product.id);
              }}
              className="mt-5 w-full py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2 transition shadow-glow-purple"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Move to Cart</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;

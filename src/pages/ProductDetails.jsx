import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ShoppingBag, Heart, Check, ArrowLeft, ShieldCheck, Zap, RotateCcw, Truck, Minus, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { formatPrice } from '../utils/currency';
import ImageWithFallback from '../components/ui/ImageWithFallback';
import ProductCard from '../components/product/ProductCard';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const { wishlistItems, addToWishlist, removeFromWishlist } = useWishlist();

  const product = products.find((p) => p.id === id || p.slug === id) || products[0];
  const [selectedImage, setSelectedImage] = useState(product?.images?.[0]);
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const [activeTab, setActiveTab] = useState('specs'); // specs | details | warranty

  useEffect(() => {
    setSelectedImage(product?.images?.[0]);
    setSelectedSize(product?.sizes?.[0] || '');
    setSelectedColor(product?.colors?.[0] || '');
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [id, product]);

  const isFavorited = wishlistItems?.some((item) => item.id === product?.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const handleWishlistToggle = () => {
    if (isFavorited) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Back link */}
      <Link
        to="/shop"
        className="inline-flex items-center gap-2 text-xs font-semibold text-purple-400 hover:text-purple-300 mb-8 transition group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        <span>Back to Collections</span>
      </Link>

      {/* Main Product Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-16">
        
        {/* Left Column: Image Gallery (6 cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="rounded-3xl overflow-hidden bg-[#0c0c14] border border-white/10 p-6 aspect-square flex items-center justify-center relative shadow-glow-purple">
            <ImageWithFallback
              src={selectedImage || product.images?.[0]}
              alt={product.name}
              category={product.category}
              className="w-full h-full object-contain"
            />
            {product.isNew && (
              <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-600 text-white shadow-sm">
                Spotlight Edition
              </span>
            )}
          </div>

          {/* Thumbnails if available */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 rounded-2xl overflow-hidden border p-1 transition ${
                    selectedImage === img
                      ? 'border-purple-500 bg-purple-950/40 shadow-glow-purple'
                      : 'border-white/10 bg-black/40 hover:border-white/20'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Info & Purchase Controls (6 cols) */}
        <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-900/40 border border-purple-500/30 text-purple-300">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5 text-xs">
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-white font-bold">{product.rating}</span>
                <span className="text-nova-muted">({product.reviewsCount} customer reviews)</span>
              </div>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white mb-4">
              {product.name}
            </h1>

            {/* Price in PKR */}
            <div className="flex items-baseline gap-4 mb-4">
              <span className="text-3xl font-black text-white">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-base text-nova-muted line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
              <span className="text-xs text-purple-400 font-semibold uppercase tracking-wider">
                Official Pakistan Warranty
              </span>
            </div>

            {/* Stock status */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>In Stock &bull; 24 units ready for dispatch in Pakistan</span>
            </div>

            <p className="text-sm text-nova-muted leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Color selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="mb-5">
                <span className="text-xs font-bold uppercase text-white block mb-2">Color Variant</span>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedColor(c)}
                      className={`w-7 h-7 rounded-full border-2 transition ${
                        selectedColor === c ? 'border-purple-400 scale-110 shadow-glow-purple' : 'border-white/20'
                      }`}
                      style={{ backgroundColor: c }}
                      aria-label={c}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes selection */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="mb-6">
                <span className="text-xs font-bold uppercase text-white block mb-2">Select Size</span>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                        selectedSize === s
                          ? 'bg-purple-600 text-white shadow-glow-purple'
                          : 'bg-white/5 border border-white/10 text-gray-300 hover:text-white'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity modifier */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-xs font-bold uppercase text-white">Quantity</span>
              <div className="flex items-center gap-2 bg-[#14141f] border border-white/10 rounded-xl p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-8 text-center text-sm font-bold text-white font-mono">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-4 pt-6 border-t border-white/10">
            <button
              onClick={handleAddToCart}
              className={`flex-1 py-4 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2 transition shadow-glow-purple ${
                isAdded
                  ? 'bg-emerald-600'
                  : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500'
              }`}
            >
              {isAdded ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added {quantity} to Cart</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart &bull; {formatPrice(product.price * quantity)}</span>
                </>
              )}
            </button>

            <button
              onClick={handleWishlistToggle}
              className={`p-4 rounded-xl border transition ${
                isFavorited
                  ? 'bg-purple-600/90 border-purple-400 text-white shadow-glow-purple'
                  : 'bg-white/5 border-white/10 text-gray-300 hover:text-white'
              }`}
              aria-label="Save to Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current text-white' : ''}`} />
            </button>
          </div>

          {/* Trust Value Badges */}
          <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/5 text-xs text-nova-muted">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>Free Delivery over Rs. 20,000</span>
            </div>
            <div className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-purple-400 shrink-0" />
              <span>30-Day Return Guarantee</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
              <span>100% Genuine Certified</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs (Specs, Materials, Care) */}
      <div className="p-8 rounded-3xl bg-[#0c0c14] border border-white/10 mb-16">
        <div className="flex items-center gap-4 border-b border-white/10 pb-4 mb-6">
          <button
            onClick={() => setActiveTab('specs')}
            className={`text-sm font-bold pb-2 transition relative ${
              activeTab === 'specs' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Technical Specs
          </button>
          <button
            onClick={() => setActiveTab('details')}
            className={`text-sm font-bold pb-2 transition relative ${
              activeTab === 'details' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Product Materials
          </button>
          <button
            onClick={() => setActiveTab('warranty')}
            className={`text-sm font-bold pb-2 transition relative ${
              activeTab === 'warranty' ? 'text-purple-400 border-b-2 border-purple-400' : 'text-gray-400 hover:text-white'
            }`}
          >
            Shipping & Warranty
          </button>
        </div>

        {activeTab === 'specs' && product.specs && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {Object.entries(product.specs).map(([k, v]) => (
              <div key={k} className="p-4 rounded-xl bg-black/40 border border-white/5">
                <span className="text-[10px] uppercase font-bold text-purple-400 block mb-1">{k}</span>
                <span className="text-sm font-semibold text-white">{v}</span>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'details' && (
          <div className="text-sm text-nova-muted space-y-3 leading-relaxed">
            <p>
              Engineered with advanced materials tailored for durability and ergonomics. Designed in the NOVA Innovation Lab, each unit undergoes multi-stage stress calibration and surface anodization to ensure flawless performance.
            </p>
            <p>
              Cleaning & Maintenance: Wipe clean with a soft microfiber cloth. Store in the complimentary protective holographic sleeve when not in use.
            </p>
          </div>
        )}

        {activeTab === 'warranty' && (
          <div className="text-sm text-nova-muted space-y-3 leading-relaxed">
            <p>
              Every NOVA item is backed by a 1-year comprehensive replacement warranty covering manufacturing defects across all major cities in Pakistan (Karachi, Lahore, Islamabad, etc.).
            </p>
            <p>
              Orders placed before 2:00 PM PKT are dispatched the same day via express tracked courier service.
            </p>
          </div>
        )}
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="border-t border-white/10 pt-12">
          <h2 className="text-2xl font-black text-white mb-6">Related Gear in {product.category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((rel) => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;

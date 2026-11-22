import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/currency';
import ImageWithFallback from '../components/ui/ImageWithFallback';

const Cart = () => {
  const { cartItems, updateQuantity, removeFromCart, clearCart, subtotal, totalItems } = useCart();
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'NOVA35') {
      setDiscountPercent(35);
      setPromoMessage('Promo code NOVA35 applied: 35% discount activated!');
    } else if (promoCode.trim().toUpperCase() === 'NOVA15') {
      setDiscountPercent(15);
      setPromoMessage('Promo code NOVA15 applied: 15% discount activated!');
    } else {
      setPromoMessage('Invalid promo code. Try NOVA35 for 35% off.');
    }
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-6 shadow-glow-purple">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-extrabold text-white mb-2">Your Cart is Empty</h1>
        <p className="text-nova-muted max-w-sm mb-8">
          You have not added any cybernetic gear or wearables to your cart yet.
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

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const discountedSubtotal = subtotal - discountAmount;
  const shipping = discountedSubtotal > 20000 ? 0 : 1500;
  const grandTotal = discountedSubtotal + shipping;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
        <div>
          <h1 className="text-3xl font-black text-white">Shopping Cart</h1>
          <p className="text-sm text-nova-muted">{totalItems} {totalItems === 1 ? 'item' : 'items'} in your cyber cart</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-rose-400 hover:text-rose-300 font-semibold transition"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Cart Items List (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 rounded-2xl bg-[#0c0c14] border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-black/40 border border-white/10 shrink-0">
                  <ImageWithFallback
                    src={item.images?.[0]}
                    alt={item.name}
                    category={item.category}
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-purple-400">
                    {item.category}
                  </span>
                  <Link to={`/product/${item.id}`}>
                    <h3 className="text-base font-bold text-white hover:text-purple-300 transition">
                      {item.name}
                    </h3>
                  </Link>
                  <p className="text-sm font-black text-white mt-1">
                    {formatPrice(item.price)}
                  </p>
                </div>
              </div>

              {/* Quantity controls & Delete */}
              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-white/5">
                <div className="flex items-center gap-2 bg-[#14141f] border border-white/10 rounded-xl p-1">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-8 text-center text-sm font-bold text-white font-mono">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white transition"
                    aria-label="Increase quantity"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-right min-w-[90px]">
                  <p className="text-sm font-black text-white">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-gray-400 hover:text-rose-400 transition"
                  aria-label="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary with Promo (4 cols) */}
        <div className="lg:col-span-4 p-6 rounded-2xl bg-[#0c0c14] border border-purple-500/30 shadow-glow-purple">
          <h2 className="text-lg font-bold text-white mb-4">Order Summary</h2>

          {/* Promo code box */}
          <form onSubmit={handleApplyPromo} className="mb-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Promo Code (NOVA35)"
                className="flex-1 px-3 py-2 rounded-xl bg-black/60 border border-white/10 text-xs text-white uppercase focus:border-purple-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition"
              >
                Apply
              </button>
            </div>
            {promoMessage && (
              <p className={`text-[11px] mt-1.5 ${discountPercent > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                {promoMessage}
              </p>
            )}
          </form>

          <div className="space-y-3 text-sm pb-4 border-b border-white/10">
            <div className="flex justify-between text-nova-muted">
              <span>Subtotal</span>
              <span className="text-white font-bold">{formatPrice(subtotal)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>Discount ({discountPercent}%)</span>
                <span>-{formatPrice(discountAmount)}</span>
              </div>
            )}
            <div className="flex justify-between text-nova-muted">
              <span>Estimated Shipping</span>
              <span className="text-white font-bold">
                {shipping === 0 ? 'FREE' : formatPrice(shipping)}
              </span>
            </div>
            <div className="flex justify-between text-nova-muted">
              <span>Currency</span>
              <span className="text-purple-400 font-bold">Pakistani Rupee (PKR)</span>
            </div>
          </div>

          <div className="flex justify-between text-base font-black text-white py-4">
            <span>Total Amount</span>
            <span className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">
              {formatPrice(grandTotal)}
            </span>
          </div>

          <Link
            to="/checkout"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 flex items-center justify-center gap-2 shadow-glow-purple transition hover:scale-[1.02] mt-2"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, CheckCircle2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';

const Checkout = () => {
  const { cartItems, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [createdOrderId, setCreatedOrderId] = useState('');

  const [formData, setFormData] = useState({
    name: user?.name || 'Ali Raza',
    phone: user?.phone || '+92 300 1234567',
    address: 'House # 42, Block B, Main Boulevard',
    city: user?.city || 'Lahore',
    postalCode: '54000',
    paymentMethod: 'Cash on Delivery (PKR)',
  });

  const shipping = subtotal > 20000 ? 0 : 1500;
  const grandTotal = subtotal + shipping;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newOrderId = `NOV-${Math.floor(10000 + Math.random() * 90000)}`;

    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString().split('T')[0],
      items: cartItems.map((item) => ({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      total: grandTotal,
      status: 'Processing',
      trackingNumber: `TRX-${Math.floor(100000 + Math.random() * 900000)}PK`,
      courier: 'Trax Express Logistics',
      deliveryAddress: `${formData.address}, ${formData.city}`,
      paymentMethod: formData.paymentMethod,
    };

    const existingOrders = JSON.parse(localStorage.getItem('nova_orders') || '[]');
    localStorage.setItem('nova_orders', JSON.stringify([newOrder, ...existingOrders]));

    setCreatedOrderId(newOrderId);
    setSubmitted(true);
    clearCart();
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-glow-purple">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold mb-2">
          Order ID: {createdOrderId}
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">Order Confirmed!</h1>
        <p className="text-nova-muted max-w-md mb-8 text-sm leading-relaxed">
          Thank you for ordering with NOVA. Your package is scheduled for next-day dispatch.
          You can track its status live in your profile dashboard.
        </p>

        <div className="flex items-center gap-4">
          <Link
            to="/profile"
            className="px-6 py-3.5 rounded-xl font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 shadow-glow-purple transition"
          >
            Track in Profile
          </Link>
          <Link
            to="/shop"
            className="px-6 py-3.5 rounded-xl font-bold text-xs text-gray-300 hover:text-white bg-white/5 border border-white/10 transition"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
        <ShoppingBag className="w-12 h-12 text-purple-400 mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">Your Cart is Empty</h2>
        <p className="text-xs text-nova-muted mb-6">Add items before checking out.</p>
        <Link to="/shop" className="px-6 py-3 rounded-xl bg-purple-600 text-white text-xs font-bold">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="mb-8 pb-4 border-b border-white/10">
        <h1 className="text-3xl font-black text-white">Quantum Checkout</h1>
        <p className="text-sm text-nova-muted">Official billing in Pakistani Rupees (PKR)</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Checkout Form (7 cols) */}
        <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6">
          <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Delivery Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Recipient Name</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ali Raza"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Contact Phone</label>
                <input
                  required
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+92 300 1234567"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-gray-300 mb-1">Street Address</label>
                <input
                  required
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="House 42, Block B, Main Boulevard"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">City</label>
                <input
                  required
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="Lahore / Karachi / Islamabad"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Postal Code</label>
                <input
                  required
                  type="text"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="54000"
                  className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
            <h2 className="text-lg font-bold text-white mb-4">Payment Method</h2>
            <div className="space-y-3">
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/40 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'Cash on Delivery (PKR)'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Cash on Delivery (PKR)' })}
                  className="accent-purple-600"
                />
                <div>
                  <span className="text-sm font-bold text-white block">Cash on Delivery (COD)</span>
                  <span className="text-xs text-nova-muted">Pay securely at your doorstep anywhere in Pakistan</span>
                </div>
              </label>
              <label className="flex items-center gap-3 p-3.5 rounded-xl bg-black/40 border border-white/10 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  checked={formData.paymentMethod === 'Online Raast / Card'}
                  onChange={() => setFormData({ ...formData, paymentMethod: 'Online Raast / Card' })}
                  className="accent-purple-600"
                />
                <div>
                  <span className="text-sm font-bold text-white block">Raast / JazzCash / EasyPaisa / Debit Card</span>
                  <span className="text-xs text-nova-muted">Instant zero-fee quantum encrypted payment</span>
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2"
          >
            <span>Confirm Order &bull; {formatPrice(grandTotal)}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Order Summary (5 cols) */}
        <div className="lg:col-span-5 p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
          <h2 className="text-lg font-bold text-white mb-4">Items Summary</h2>
          <div className="space-y-3 max-h-80 overflow-y-auto mb-6 pr-2">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between gap-3 text-sm">
                <span className="text-gray-300 truncate max-w-[200px]">
                  {item.name} &times; {item.quantity}
                </span>
                <span className="text-white font-bold shrink-0">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-2 pt-4 border-t border-white/10 text-sm">
            <div className="flex justify-between text-nova-muted">
              <span>Subtotal</span>
              <span className="text-white font-bold">{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between text-nova-muted">
              <span>Shipping</span>
              <span className="text-white font-bold">{shipping === 0 ? 'FREE' : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between text-base font-black text-white pt-2 border-t border-white/5">
              <span>Total Payable</span>
              <span className="text-xl text-purple-400 font-extrabold">{formatPrice(grandTotal)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

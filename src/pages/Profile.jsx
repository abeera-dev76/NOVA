import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Package, MapPin, LogOut, CheckCircle2, Clock, Truck, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { formatPrice } from '../utils/currency';

const Profile = () => {
  const { user, logout, updateUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('orders'); // orders | profile | address

  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || 'Customer',
    phone: user?.phone || '+92 300 1234567',
    city: user?.city || 'Karachi, Pakistan',
  });
  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const savedOrders = localStorage.getItem('nova_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    } else {
      // Provide initial mock order
      const initialOrders = [
        {
          id: 'NOV-84291',
          date: '2026-11-20',
          items: [
            { name: 'Air Jordan Cyber Sneaker', quantity: 1, price: 24500 }
          ],
          total: 24500,
          status: 'Dispatched',
          trackingNumber: 'TRX-948201PK',
          courier: 'Trax Express Logistics',
          deliveryAddress: 'House 42-B, Gulberg III, Lahore',
          paymentMethod: 'Cash on Delivery (PKR)'
        }
      ];
      setOrders(initialOrders);
      localStorage.setItem('nova_orders', JSON.stringify(initialOrders));
    }
  }, [isAuthenticated, navigate]);

  const handleProfileSave = (e) => {
    e.preventDefault();
    updateUser(profileForm);
    setIsEditing(false);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Banner Profile Summary */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-white/10 mb-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glow-purple">
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-600 flex items-center justify-center font-black text-2xl text-white shadow-glow-purple">
            {user.name?.charAt(0) || 'U'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              {user.role === 'admin' && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white">
                  Admin
                </span>
              )}
            </div>
            <p className="text-sm text-nova-muted">{user.email}</p>
            <p className="text-xs text-purple-400 font-mono mt-0.5">Member since {user.joinedDate || '2026'}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {user.role === 'admin' && (
            <Link
              to="/admin"
              className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-glow-purple"
            >
              Open Admin Portal
            </Link>
          )}
          <button
            onClick={handleLogout}
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-rose-950/40 border border-white/10 hover:border-rose-500/40 text-gray-300 hover:text-rose-300 text-xs font-semibold flex items-center gap-2 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-8 overflow-x-auto">
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-purple-600 text-white shadow-glow-purple'
              : 'text-gray-400 hover:text-white bg-white/5'
          }`}
        >
          <Package className="w-4 h-4" />
          <span>Orders & Tracking ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-purple-600 text-white shadow-glow-purple'
              : 'text-gray-400 hover:text-white bg-white/5'
          }`}
        >
          <User className="w-4 h-4" />
          <span>Personal Info</span>
        </button>

        <button
          onClick={() => setActiveTab('address')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'address'
              ? 'bg-purple-600 text-white shadow-glow-purple'
              : 'text-gray-400 hover:text-white bg-white/5'
          }`}
        >
          <MapPin className="w-4 h-4" />
          <span>Saved Address</span>
        </button>
      </div>

      {/* Tab Content: Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          {orders.length === 0 ? (
            <div className="text-center py-16 bg-[#0c0c14] rounded-2xl border border-white/10">
              <Package className="w-12 h-12 text-purple-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-white mb-2">No Orders Placed Yet</p>
              <p className="text-xs text-nova-muted mb-6">Explore our catalog to place your first order.</p>
              <Link to="/shop" className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold">
                Go to Shop
              </Link>
            </div>
          ) : (
            orders.map((ord) => (
              <div
                key={ord.id}
                className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10 hover:border-purple-500/40 transition"
              >
                {/* Order Top Bar */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div>
                    <span className="text-xs font-mono text-purple-400 font-bold uppercase tracking-wider block">
                      Order #{ord.id}
                    </span>
                    <span className="text-xs text-nova-muted">Placed on {ord.date} &bull; {ord.paymentMethod}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="text-lg font-black text-white">{formatPrice(ord.total)}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-950/60 border border-emerald-500/40 text-emerald-400'
                        : 'bg-purple-950/60 border border-purple-500/40 text-purple-300'
                    }`}>
                      {ord.status}
                    </span>
                  </div>
                </div>

                {/* Tracking Stepper */}
                <div className="py-6">
                  <div className="flex items-center justify-between max-w-xl mx-auto relative">
                    <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-white/10 -translate-y-1/2 z-0" />
                    
                    {['Confirmed', 'Processing', 'Dispatched', 'Delivered'].map((step, idx) => {
                      const isComplete =
                        (ord.status === 'Dispatched' && idx <= 2) ||
                        (ord.status === 'Delivered' && idx <= 3) ||
                        (ord.status === 'Processing' && idx <= 1) ||
                        idx === 0;

                      return (
                        <div key={step} className="relative z-10 flex flex-col items-center">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border ${
                            isComplete
                              ? 'bg-purple-600 border-purple-400 text-white shadow-glow-purple'
                              : 'bg-dark-800 border-white/20 text-gray-500'
                          }`}>
                            {isComplete ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                          </div>
                          <span className={`text-[11px] font-semibold mt-2 ${isComplete ? 'text-white' : 'text-gray-500'}`}>
                            {step}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Items & Courier Info */}
                <div className="pt-4 border-t border-white/5 flex flex-col sm:flex-row justify-between text-xs text-nova-muted gap-3">
                  <div>
                    <span className="font-bold text-gray-300 block mb-1">Items in this package:</span>
                    <ul className="space-y-1">
                      {ord.items?.map((it, i) => (
                        <li key={i} className="text-white">
                          &bull; {it.name} &times; {it.quantity} &bull; {formatPrice(it.price * it.quantity)}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {ord.trackingNumber && (
                    <div className="sm:text-right">
                      <span className="font-bold text-gray-300 block">Courier Tracking:</span>
                      <p className="text-purple-400 font-mono font-semibold">{ord.courier}</p>
                      <p className="text-white font-mono">{ord.trackingNumber}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab Content: Profile Settings */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10">
          <h2 className="text-lg font-bold text-white mb-6">Personal Account Details</h2>

          {saveSuccess && (
            <div className="mb-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 font-medium">
              Profile details updated successfully!
            </div>
          )}

          <form onSubmit={handleProfileSave} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Full Name</label>
              <input
                type="text"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Email (Primary)</label>
              <input
                type="email"
                disabled
                value={user.email}
                className="w-full px-4 py-2.5 rounded-xl bg-black/30 border border-white/5 text-gray-400 text-sm cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">Phone Number</label>
              <input
                type="tel"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">City / Region</label>
              <input
                type="text"
                value={profileForm.city}
                onChange={(e) => setProfileForm({ ...profileForm, city: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-bold shadow-glow-purple transition"
            >
              Save Profile Changes
            </button>
          </form>
        </div>
      )}

      {/* Tab Content: Saved Address */}
      {activeTab === 'address' && (
        <div className="max-w-xl p-6 sm:p-8 rounded-2xl bg-[#0c0c14] border border-white/10">
          <h2 className="text-lg font-bold text-white mb-2">Default Shipping Address</h2>
          <p className="text-xs text-nova-muted mb-6">Used automatically during quantum one-click checkout.</p>

          <div className="p-4 rounded-xl bg-black/50 border border-white/10 space-y-2 text-sm text-gray-300">
            <p className="font-bold text-white">{user.name}</p>
            <p>House 42-B, Sector F-7 / Gulberg III</p>
            <p>{user.city || 'Lahore, Pakistan'}</p>
            <p className="text-xs text-purple-400">{user.phone || '+92 300 1234567'}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;

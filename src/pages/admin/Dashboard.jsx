import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, Package, ShoppingCart, TrendingUp, AlertCircle, ArrowUpRight, ShieldCheck, UserCheck } from 'lucide-react';
import { products } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currency';

const Dashboard = () => {
  const { user, isAdmin, login } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const saved = localStorage.getItem('nova_orders');
    if (saved) {
      setOrders(JSON.parse(saved));
    } else {
      setOrders([
        {
          id: 'NOV-84291',
          date: '2026-11-20',
          customer: 'Ali Raza',
          items: [{ name: 'Air Jordan Cyber Sneaker', quantity: 1 }],
          total: 24500,
          status: 'Dispatched',
        },
        {
          id: 'NOV-84292',
          date: '2026-11-21',
          customer: 'Zainab Bibi',
          items: [{ name: 'Wireless Headphones Pro', quantity: 1 }],
          total: 34000,
          status: 'Processing',
        },
      ]);
    }
  }, []);

  // Admin access gate
  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-amber-950/40 border border-amber-500/40 flex items-center justify-center text-amber-400 mb-6">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-black text-white mb-2">Admin Portal Restricted</h1>
        <p className="text-sm text-nova-muted max-w-md mb-6">
          You must have administrator privileges to view analytics and manage catalog inventory.
        </p>
        <button
          onClick={() => {
            login({
              name: 'Zayn Malik (Admin)',
              email: 'admin@nova.pk',
              role: 'admin',
              city: 'Islamabad',
            });
          }}
          className="px-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-2 shadow-glow-purple transition"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Authorize Admin Access Demo</span>
        </button>
      </div>
    );
  }

  const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 185000);
  const totalStockCount = products.reduce((acc, p) => acc + (p.stockQuantity || 15), 0);

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-purple-600 text-white">
              Restricted Portal
            </span>
            <span className="text-xs text-nova-muted font-mono">NOVA v2.4 Admin Console</span>
          </div>
          <h1 className="text-3xl font-black text-white mt-1">Store Dashboard</h1>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-white transition"
          >
            Manage Products
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-xs font-bold text-white shadow-glow-purple transition"
          >
            Manage Orders
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
          <div className="flex items-center justify-between text-xs text-nova-muted mb-2">
            <span>Gross Revenue</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-2xl font-black text-white">{formatPrice(totalRevenue)}</p>
          <p className="text-[11px] text-emerald-400 mt-1 font-semibold">+18.4% vs last month</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
          <div className="flex items-center justify-between text-xs text-nova-muted mb-2">
            <span>Total Orders</span>
            <ShoppingCart className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-2xl font-black text-white">{orders.length + 42}</p>
          <p className="text-[11px] text-purple-400 mt-1 font-semibold">Across all Pakistan regions</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
          <div className="flex items-center justify-between text-xs text-nova-muted mb-2">
            <span>Catalog Items</span>
            <Package className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-2xl font-black text-white">{products.length}</p>
          <p className="text-[11px] text-gray-400 mt-1">7 Categories active</p>
        </div>

        <div className="p-6 rounded-2xl bg-[#0c0c14] border border-white/10">
          <div className="flex items-center justify-between text-xs text-nova-muted mb-2">
            <span>Total Units In Stock</span>
            <AlertCircle className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-2xl font-black text-white">{totalStockCount}</p>
          <p className="text-[11px] text-amber-400 mt-1 font-semibold">All units certified</p>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#0c0c14] border border-white/10 mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Recent Customer Orders</h2>
          <Link to="/admin/orders" className="text-xs font-bold text-purple-400 hover:text-purple-300 flex items-center gap-1">
            <span>View All</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-white/10 text-nova-muted uppercase tracking-wider">
                <th className="pb-3 font-semibold">Order ID</th>
                <th className="pb-3 font-semibold">Date</th>
                <th className="pb-3 font-semibold">Customer</th>
                <th className="pb-3 font-semibold">Amount (PKR)</th>
                <th className="pb-3 font-semibold">Fulfillment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.slice(0, 5).map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition">
                  <td className="py-3 font-mono font-bold text-purple-400">{ord.id}</td>
                  <td className="py-3 text-gray-400">{ord.date}</td>
                  <td className="py-3 text-white font-medium">{ord.customer || 'Valued Customer'}</td>
                  <td className="py-3 font-black text-white">{formatPrice(ord.total)}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                      ord.status === 'Delivered'
                        ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                        : 'bg-purple-950/60 text-purple-300 border border-purple-500/30'
                    }`}>
                      {ord.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

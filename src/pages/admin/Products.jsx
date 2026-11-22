import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Plus, Edit2, Trash2, ArrowLeft, Check, ShieldAlert } from 'lucide-react';
import { products as initialProducts } from '../../data/products';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currency';
import ImageWithFallback from '../../components/ui/ImageWithFallback';

const AdminProducts = () => {
  const { isAdmin } = useAuth();
  const [productList, setProductList] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [successToast, setSuccessToast] = useState('');

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShieldAlert className="w-12 h-12 text-amber-400 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Admin Authorization Required</h1>
        <p className="text-sm text-nova-muted mb-6">Please log in with admin privileges.</p>
        <Link to="/login" className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleStockUpdate = (id, delta) => {
    setProductList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newQty = Math.max(0, (item.stockQuantity || 15) + delta);
          return { ...item, stockQuantity: newQty };
        }
        return item;
      })
    );
    setSuccessToast('Inventory stock updated!');
    setTimeout(() => setSuccessToast(''), 1800);
  };

  const filteredProducts = productList.filter((p) => {
    const matchesCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = !searchTerm || p.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white">Catalog & Inventory Management</h1>
        </div>

        {successToast && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{successToast}</span>
          </div>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search inventory items..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0c14] border border-white/10 text-xs text-white focus:border-purple-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl bg-[#0c0c14] border border-white/10 text-xs text-white focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="sneakers">Sneakers</option>
            <option value="headphones">Headphones</option>
            <option value="watches">Watches</option>
            <option value="handbags">Handbags</option>
            <option value="gaming">Gaming</option>
            <option value="sunglasses">Sunglasses</option>
            <option value="speakers">Speakers</option>
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div className="rounded-2xl bg-[#0c0c14] border border-white/10 overflow-hidden shadow-glow-purple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/40 border-b border-white/10 text-nova-muted uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Product</th>
                <th className="py-3.5 px-4 font-semibold">Category</th>
                <th className="py-3.5 px-4 font-semibold">Price (PKR)</th>
                <th className="py-3.5 px-4 font-semibold">Stock Quantity</th>
                <th className="py-3.5 px-4 font-semibold">Stock Status</th>
                <th className="py-3.5 px-4 font-semibold text-right">Quick Stock Modifier</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((p) => {
                const stock = p.stockQuantity ?? 15;
                const isLow = stock <= 10;

                return (
                  <tr key={p.id} className="hover:bg-white/5 transition">
                    <td className="py-3 px-4 flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg overflow-hidden bg-black/40 border border-white/10 shrink-0">
                        <ImageWithFallback src={p.images?.[0]} alt={p.name} category={p.category} />
                      </div>
                      <div>
                        <span className="font-bold text-white block text-sm">{p.name}</span>
                        <span className="text-[10px] text-nova-muted font-mono">{p.id}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] uppercase font-bold bg-purple-950/60 border border-purple-500/20 text-purple-300">
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 font-black text-white text-sm">
                      {formatPrice(p.price)}
                    </td>
                    <td className="py-3 px-4 font-mono font-bold text-white text-sm">
                      {stock} units
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                        isLow
                          ? 'bg-amber-950/60 text-amber-400 border border-amber-500/30'
                          : 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/30'
                      }`}>
                        {isLow ? 'Low Stock' : 'Optimal'}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center gap-1.5 bg-black/40 border border-white/10 rounded-lg p-1">
                        <button
                          onClick={() => handleStockUpdate(p.id, -1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                          title="Decrease stock"
                        >
                          -
                        </button>
                        <span className="w-6 text-center font-mono font-bold text-white">{stock}</span>
                        <button
                          onClick={() => handleStockUpdate(p.id, 1)}
                          className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 flex items-center justify-center text-gray-300 hover:text-white"
                          title="Increase stock"
                        >
                          +
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;

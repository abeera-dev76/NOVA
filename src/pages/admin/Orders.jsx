import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check, Package, ShieldAlert, Truck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { formatPrice } from '../../utils/currency';

const AdminOrders = () => {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState([]);
  const [toastMessage, setToastMessage] = useState('');

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
          deliveryAddress: 'House 42-B, Gulberg III, Lahore',
          items: [{ name: 'Air Jordan Cyber Sneaker', quantity: 1, price: 24500 }],
          total: 24500,
          status: 'Dispatched',
          courier: 'Trax Express Logistics',
          trackingNumber: 'TRX-948201PK',
          paymentMethod: 'Cash on Delivery (PKR)',
        },
        {
          id: 'NOV-84292',
          date: '2026-11-21',
          customer: 'Zainab Bibi',
          deliveryAddress: 'Apartment 12, Block 4, Clifton, Karachi',
          items: [{ name: 'Wireless Headphones Pro', quantity: 1, price: 34000 }],
          total: 34000,
          status: 'Processing',
          courier: 'TCS Courier Express',
          trackingNumber: 'TCS-558291PK',
          paymentMethod: 'Raast Online Payment',
        },
      ]);
    }
  }, []);

  if (!isAdmin) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
        <ShieldAlert className="w-12 h-12 text-amber-400 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Admin Authorization Required</h1>
        <p className="text-sm text-nova-muted mb-6">Please log in with administrator privileges.</p>
        <Link to="/login" className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold">
          Go to Sign In
        </Link>
      </div>
    );
  }

  const handleStatusChange = (id, newStatus) => {
    const updated = orders.map((ord) => (ord.id === id ? { ...ord, status: newStatus } : ord));
    setOrders(updated);
    localStorage.setItem('nova_orders', JSON.stringify(updated));
    setToastMessage(`Order #${id} status updated to ${newStatus}`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-1.5 text-xs text-purple-400 hover:text-purple-300 mb-2">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Dashboard</span>
          </Link>
          <h1 className="text-3xl font-black text-white">Order Fulfillment & Logistics</h1>
        </div>

        {toastMessage && (
          <div className="px-4 py-2 rounded-xl bg-emerald-950/60 border border-emerald-500/40 text-xs text-emerald-300 font-semibold flex items-center gap-2">
            <Check className="w-4 h-4 text-emerald-400" />
            <span>{toastMessage}</span>
          </div>
        )}
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-[#0c0c14] border border-white/10 overflow-hidden shadow-glow-purple">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-black/40 border-b border-white/10 text-nova-muted uppercase tracking-wider">
                <th className="py-3.5 px-4 font-semibold">Order ID & Date</th>
                <th className="py-3.5 px-4 font-semibold">Customer & Destination</th>
                <th className="py-3.5 px-4 font-semibold">Ordered Gear</th>
                <th className="py-3.5 px-4 font-semibold">Total (PKR)</th>
                <th className="py-3.5 px-4 font-semibold">Payment</th>
                <th className="py-3.5 px-4 font-semibold text-right">Update Fulfillment</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {orders.map((ord) => (
                <tr key={ord.id} className="hover:bg-white/5 transition">
                  <td className="py-4 px-4">
                    <span className="font-mono font-bold text-purple-400 block text-sm">{ord.id}</span>
                    <span className="text-[10px] text-gray-400">{ord.date}</span>
                    {ord.trackingNumber && (
                      <span className="text-[10px] text-emerald-400 font-mono block mt-1">{ord.trackingNumber}</span>
                    )}
                  </td>
                  <td className="py-4 px-4">
                    <span className="font-bold text-white block text-sm">{ord.customer || 'Customer'}</span>
                    <span className="text-[11px] text-nova-muted block max-w-xs truncate">{ord.deliveryAddress}</span>
                  </td>
                  <td className="py-4 px-4">
                    <ul className="space-y-0.5">
                      {ord.items?.map((it, idx) => (
                        <li key={idx} className="text-gray-200">
                          {it.name} <span className="text-purple-400 font-bold">&times; {it.quantity}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                  <td className="py-4 px-4 font-black text-white text-sm">
                    {formatPrice(ord.total)}
                  </td>
                  <td className="py-4 px-4 text-gray-300">
                    {ord.paymentMethod || 'COD'}
                  </td>
                  <td className="py-4 px-4 text-right">
                    <select
                      value={ord.status}
                      onChange={(e) => handleStatusChange(ord.id, e.target.value)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold border focus:outline-none ${
                        ord.status === 'Delivered'
                          ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-300'
                          : ord.status === 'Dispatched'
                          ? 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                          : 'bg-black/60 border-white/20 text-gray-200'
                      }`}
                    >
                      <option value="Confirmed">Confirmed</option>
                      <option value="Processing">Processing</option>
                      <option value="Dispatched">Dispatched</option>
                      <option value="Delivered">Delivered</option>
                    </select>
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

export default AdminOrders;

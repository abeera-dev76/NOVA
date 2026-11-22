import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both email and password.');
      return;
    }

    const isAdmin = email.toLowerCase().includes('admin');
    const userData = {
      name: isAdmin ? 'Admin Operator' : email.split('@')[0],
      email,
      role: isAdmin ? 'admin' : 'customer',
      avatar: '',
      joinedDate: 'November 2026',
    };

    login(userData);
    navigate(isAdmin ? '/admin' : '/profile');
  };

  const handleDemoCustomer = () => {
    login({
      name: 'Ali Raza',
      email: 'customer@nova.pk',
      role: 'customer',
      city: 'Lahore, Pakistan',
      phone: '+92 300 1234567',
      joinedDate: 'November 2026',
    });
    navigate('/profile');
  };

  const handleDemoAdmin = () => {
    login({
      name: 'Zayn Malik (Admin)',
      email: 'admin@nova.pk',
      role: 'admin',
      city: 'Islamabad, Pakistan',
      phone: '+92 321 7654321',
      joinedDate: 'October 2026',
    });
    navigate('/admin');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 p-8 rounded-3xl bg-[#0c0c14] border border-purple-500/30 shadow-glow-purple">
        {/* Header */}
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 mx-auto flex items-center justify-center font-black text-2xl text-white shadow-glow-purple mb-4">
            N
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Sign In to NOVA
          </h2>
          <p className="text-xs sm:text-sm text-nova-muted mt-2">
            Access your saved wishlist, orders, and quantum checkout.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 font-medium text-center">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="&bull;&bull;&bull;&bull;&bull;&bull;&bull;&bull;"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-1">
            <label className="flex items-center gap-2 cursor-pointer text-nova-muted">
              <input type="checkbox" defaultChecked className="accent-purple-600 rounded" />
              <span>Remember me</span>
            </label>
            <a href="#forgot" className="text-purple-400 hover:text-purple-300 transition">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2 mt-2"
          >
            <span>Sign In</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Logins for Testing */}
        <div className="pt-4 border-t border-white/10">
          <p className="text-[11px] uppercase font-bold text-center text-purple-400 tracking-wider mb-3">
            Quick 1-Click Demo Logins
          </p>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              onClick={handleDemoCustomer}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-semibold text-gray-200 flex items-center justify-center gap-1.5 transition"
            >
              <UserCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Customer Demo</span>
            </button>
            <button
              onClick={handleDemoAdmin}
              type="button"
              className="py-2.5 px-3 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/30 text-xs font-semibold text-purple-300 flex items-center justify-center gap-1.5 transition"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Admin Demo</span>
            </button>
          </div>
        </div>

        {/* Switch to Register */}
        <p className="text-center text-xs text-nova-muted">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-purple-400 font-bold hover:text-purple-300 transition">
            Create NOVA Account
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;

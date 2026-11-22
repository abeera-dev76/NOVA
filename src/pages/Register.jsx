import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, MapPin, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    city: 'Karachi',
    password: '',
    confirmPassword: '',
    agreed: false,
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!formData.agreed) {
      setError('You must agree to the Terms & Privacy Policy.');
      return;
    }

    const userData = {
      name: formData.name,
      email: formData.email,
      city: formData.city,
      role: 'customer',
      joinedDate: 'November 2026',
    };

    login(userData);
    navigate('/profile');
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6 p-8 rounded-3xl bg-[#0c0c14] border border-purple-500/30 shadow-glow-purple">
        <div className="text-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 mx-auto flex items-center justify-center font-black text-2xl text-white shadow-glow-purple mb-4">
            N
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Create NOVA Account
          </h2>
          <p className="text-xs sm:text-sm text-nova-muted mt-2">
            Join Pakistan's premier futuristic lifestyle ecosystem.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-rose-950/40 border border-rose-500/40 text-xs text-rose-300 font-medium text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Full Name</label>
            <div className="relative">
              <User className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Hamza Ahmed"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="hamza@domain.pk"
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1.5">City (Pakistan)</label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="Karachi">Karachi</option>
                <option value="Lahore">Lahore</option>
                <option value="Islamabad">Islamabad</option>
                <option value="Rawalpindi">Rawalpindi</option>
                <option value="Faisalabad">Faisalabad</option>
                <option value="Peshawar">Peshawar</option>
                <option value="Quetta">Quetta</option>
                <option value="Multan">Multan</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1.5">Confirm</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-purple-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="&bull;&bull;&bull;&bull;&bull;&bull;"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>

          <label className="flex items-start gap-2 text-xs text-nova-muted pt-1 cursor-pointer">
            <input
              type="checkbox"
              name="agreed"
              checked={formData.agreed}
              onChange={handleChange}
              className="mt-0.5 accent-purple-600 rounded"
            />
            <span>
              I agree to the <Link to="/terms" className="text-purple-400 underline">Terms</Link> and{' '}
              <Link to="/privacy-policy" className="text-purple-400 underline">Privacy Policy</Link>.
            </span>
          </label>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2 mt-4"
          >
            <span>Create Account</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <p className="text-center text-xs text-nova-muted pt-2 border-t border-white/10">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-400 font-bold hover:text-purple-300 transition">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;

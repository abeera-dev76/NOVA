import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const { totalItems } = useCart() || { totalItems: 0 };
  const { wishlistItems } = useWishlist() || { wishlistItems: [] };

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop', path: '/shop' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 bg-[#070709]/85 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center font-black text-xl tracking-wider text-white shadow-glow-purple group-hover:scale-105 transition-transform">
              N
            </div>
            <span className="font-extrabold text-2xl tracking-widest text-white">
              NOVA<span className="text-nova-purple">.</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `text-sm font-medium tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-nova-purple font-semibold'
                      : 'text-gray-300 hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <motion.div
                        layoutId="navIndicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-nova-purple rounded-full"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Action Icons & Mobile Hamburger */}
          <div className="flex items-center space-x-3 sm:space-x-5">
            {/* Search Trigger */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition"
              aria-label="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistItems?.length > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-nova-purple text-white rounded-full flex items-center justify-center shadow-glow-purple">
                  {wishlistItems.length}
                </span>
              )}
            </Link>

            {/* Cart Link */}
            <Link
              to="/cart"
              className="relative p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition"
              aria-label="Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalItems > 0 && (
                <span className="absolute top-1 right-1 w-4 h-4 text-[10px] font-bold bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full flex items-center justify-center animate-pulse shadow-glow-purple">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* User Account Link */}
            <Link
              to="/login"
              className="hidden sm:flex p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Expandable Search Bar Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="overflow-hidden border-t border-white/5 bg-[#0d0d14]"
            >
              <div className="max-w-3xl mx-auto px-4 py-3">
                <form onSubmit={handleSearchSubmit} className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-purple-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search futuristic sneakers, cyber headphones, titanium watches..."
                    className="w-full pl-12 pr-24 py-2.5 bg-[#14141f] border border-purple-500/30 rounded-xl text-sm text-white placeholder-gray-500 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition"
                    autoFocus
                  />
                  <button
                    type="submit"
                    className="absolute right-2 px-3 py-1 bg-nova-purple hover:bg-nova-purple-hover text-white text-xs font-semibold rounded-lg transition"
                  >
                    Search
                  </button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 bg-[#070709]/98 backdrop-blur-2xl border-b border-white/10 px-6 py-8 md:hidden shadow-2xl"
          >
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `text-lg font-semibold tracking-wide flex items-center justify-between py-2 border-b border-white/5 ${
                      isActive ? 'text-nova-purple' : 'text-gray-200'
                    }`
                  }
                >
                  <span>{link.name}</span>
                  <ArrowRight className="w-4 h-4 text-white/40" />
                </NavLink>
              ))}

              <div className="pt-4 flex flex-col gap-3">
                <Link
                  to="/shop"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-sm shadow-glow-purple"
                >
                  Explore Collection
                </Link>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-3 text-center rounded-xl bg-white/5 border border-white/10 text-white font-medium text-sm hover:bg-white/10 transition"
                >
                  Sign In / Register
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

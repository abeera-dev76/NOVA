import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, Instagram, Twitter, Github, Youtube, Shield, Cpu, Sparkles } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050508] border-t border-white/10 mt-auto relative overflow-hidden">
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 mb-12">
          
          {/* Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-4 group inline-flex">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-700 via-purple-600 to-indigo-500 flex items-center justify-center font-black text-lg tracking-wider text-white shadow-glow-purple group-hover:scale-105 transition-transform">
                N
              </div>
              <span className="font-extrabold text-2xl tracking-widest text-white">
                NOVA<span className="text-nova-purple">.</span>
              </span>
            </Link>

            <p className="text-nova-muted text-sm leading-relaxed max-w-sm mb-6">
              Next-generation 3D e-commerce platform blending cybernetic aesthetics, precision engineering, and spatial computing.
            </p>

            {/* Social Icons */}
            <div className="flex items-center space-x-3">
              {[
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Github, href: '#', label: 'Github' },
                { icon: Youtube, href: '#', label: 'Youtube' },
              ].map((social, idx) => {
                const Icon = social.icon;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 hover:border-purple-500/40 hover:bg-purple-600/20 text-gray-400 hover:text-white flex items-center justify-center transition-all duration-200"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Shop Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-widest uppercase">
              Shop Collections
            </h4>
            <ul className="space-y-2.5 text-sm text-nova-muted">
              <li>
                <Link to="/shop" className="hover:text-purple-300 transition">
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop?category=sneakers" className="hover:text-purple-300 transition">
                  Cyber Sneakers
                </Link>
              </li>
              <li>
                <Link to="/shop?category=headphones" className="hover:text-purple-300 transition">
                  Spatial Audio
                </Link>
              </li>
              <li>
                <Link to="/shop?category=watches" className="hover:text-purple-300 transition">
                  Titanium Watches
                </Link>
              </li>
              <li>
                <Link to="/shop?category=gaming" className="hover:text-purple-300 transition">
                  Gaming Peripherals
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-widest uppercase">
              Company
            </h4>
            <ul className="space-y-2.5 text-sm text-nova-muted">
              <li>
                <Link to="/about" className="hover:text-purple-300 transition">
                  About NOVA
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-300 transition">
                  Contact Support
                </Link>
              </li>
              <li>
                <Link to="/privacy-policy" className="hover:text-purple-300 transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-purple-300 transition">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-purple-300 transition">
                  Returns & Exchanges
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Care Column */}
          <div>
            <h4 className="text-white font-bold mb-4 text-xs tracking-widest uppercase">
              Customer Care
            </h4>
            <ul className="space-y-2.5 text-sm text-nova-muted mb-6">
              <li>
                <Link to="/profile" className="hover:text-purple-300 transition">
                  Track Your Order
                </Link>
              </li>
              <li>
                <Link to="/returns" className="hover:text-purple-300 transition">
                  30-Day Returns Policy
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-purple-300 transition">
                  24/7 Helpline Support
                </Link>
              </li>
              <li>
                <Link to="/shop" className="hover:text-purple-300 transition">
                  Verified Genuine Gear
                </Link>
              </li>
            </ul>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5 flex items-center gap-2 text-xs text-purple-300">
              <Shield className="w-4 h-4 text-purple-400 shrink-0" />
              <span>TLS 1.3 End-to-End Secure</span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-nova-muted gap-4">
          <p>&copy; {new Date().getFullYear()} NOVA Inc. Engineered for the future.</p>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline text-white/30">&bull;</span>
            <span className="text-gray-400">WebGL 3D Enabled</span>
            
            <button
              onClick={scrollToTop}
              className="p-2 rounded-xl bg-white/5 hover:bg-purple-600/20 border border-white/10 hover:border-purple-500/40 text-gray-300 hover:text-white transition flex items-center gap-1.5 ml-2"
              aria-label="Scroll to top"
            >
              <span>Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;

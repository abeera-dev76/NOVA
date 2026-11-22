import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, ArrowRight, CheckCircle2, Sparkles, Shield } from 'lucide-react';

const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    setStatus('loading');
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 800);
  };

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl bg-gradient-to-b from-[#11111a] to-[#09090f] border border-purple-500/30 p-8 sm:p-14 text-center shadow-glow-purple"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-semibold tracking-wider uppercase mb-6 shadow-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE INNER CIRCLE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
            UNLOCK <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-purple-300 to-indigo-300">15% OFF</span> YOUR FIRST DROP
          </h2>

          <p className="text-sm sm:text-base text-nova-muted max-w-xl mx-auto leading-relaxed mb-8">
            Subscribe to receive confidential launch alerts, early access to limited edition 3D models,
            and exclusive member discounts straight to your inbox.
          </p>

          {/* Form */}
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 max-w-md mx-auto flex items-center justify-center gap-3"
            >
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span className="text-sm font-semibold">
                Welcome to NOVA. Your 15% discount code has been dispatched.
              </span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="relative flex flex-col sm:flex-row items-stretch gap-3">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-purple-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder="Enter your email address"
                    className={`w-full pl-12 pr-4 py-4 rounded-xl bg-black/60 border text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 transition ${
                      status === 'error'
                        ? 'border-rose-500 focus:ring-rose-500'
                        : 'border-purple-500/30 focus:border-purple-400 focus:ring-purple-400/40'
                    }`}
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="px-7 py-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2 hover:scale-105 shrink-0"
                >
                  {status === 'loading' ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Join Now</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>

              {status === 'error' && (
                <p className="text-xs text-rose-400 mt-2 font-medium">
                  Please enter a valid email address.
                </p>
              )}
            </form>
          )}

          {/* Privacy Note */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-nova-muted">
            <Shield className="w-3.5 h-3.5 text-purple-400/80" />
            <span>Encrypted with zero-spam policy. Unsubscribe anytime with 1 click.</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default NewsletterSection;

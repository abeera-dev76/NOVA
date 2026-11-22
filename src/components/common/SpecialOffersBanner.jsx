import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Timer, ArrowRight, Copy, Check, Sparkles } from 'lucide-react';

const SpecialOffersBanner = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 42,
    seconds: 18,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 24, minutes: 0, seconds: 0 };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleCopyCode = () => {
    navigator.clipboard.writeText('NOVA35');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatNumber = (num) => String(num).padStart(2, '0');

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl bg-gradient-to-r from-purple-950/70 via-[#100d23] to-[#0a0a14] border border-purple-500/40 p-8 sm:p-12 lg:p-16 overflow-hidden shadow-glow-purple-lg"
        >
          {/* Cyber glowing ambient lights */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-600/30 rounded-full blur-[90px] pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-600/30 rounded-full blur-[90px] pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10">
            
            {/* Left Offer Text */}
            <div className="text-center lg:text-left max-w-xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-4">
                <Timer className="w-3.5 h-3.5 text-purple-400" />
                <span>Limited Quantum Drop</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight mb-4">
                GET UP TO <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-300">35% OFF</span> ON CYBER COLLECTION
              </h2>

              <p className="text-sm sm:text-base text-gray-300 leading-relaxed mb-6">
                Use code <span className="font-mono text-purple-300 font-bold">NOVA35</span> at checkout to unlock instant discounts on revolutionary wearables and accessories.
              </p>

              {/* Coupon Copy Pill */}
              <div className="inline-flex items-center gap-3 p-2 rounded-xl bg-black/50 border border-purple-500/30 backdrop-blur-md">
                <span className="font-mono text-sm tracking-wider text-white font-bold px-3">
                  NOVA35
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1.5 rounded-lg bg-purple-600 hover:bg-purple-500 text-white text-xs font-semibold flex items-center gap-1.5 transition"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Countdown & CTA */}
            <div className="flex flex-col items-center lg:items-end gap-6 shrink-0">
              {/* Countdown Clocks */}
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-white shadow-inner">
                    {formatNumber(timeLeft.hours)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-2">
                    Hours
                  </span>
                </div>

                <span className="text-2xl font-bold text-purple-400 -mt-6">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-white shadow-inner">
                    {formatNumber(timeLeft.minutes)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-2">
                    Minutes
                  </span>
                </div>

                <span className="text-2xl font-bold text-purple-400 -mt-6">:</span>

                <div className="flex flex-col items-center">
                  <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-black/60 border border-purple-500/30 flex items-center justify-center font-mono text-2xl sm:text-3xl font-black text-purple-400 shadow-inner">
                    {formatNumber(timeLeft.seconds)}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-2">
                    Seconds
                  </span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition hover:scale-105"
              >
                <span>Shop Promotional Deals</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default SpecialOffersBanner;

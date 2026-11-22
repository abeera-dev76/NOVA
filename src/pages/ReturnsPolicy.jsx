import React from 'react';
import { Link } from 'react-router-dom';
import { RotateCcw, ShieldCheck, Truck, CheckCircle2 } from 'lucide-react';

const ReturnsPolicy = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-glow-purple">
          <RotateCcw className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">30-Day Holographic Returns</h1>
        <p className="text-sm text-nova-muted mt-2">
          Effortless returns, doorstep pickups, and instant refunds across Pakistan.
        </p>
      </div>

      <div className="space-y-8 text-sm text-gray-300 leading-relaxed bg-[#0c0c14] border border-white/10 p-8 sm:p-10 rounded-3xl">
        <section>
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-purple-400" />
            <span>Eligibility for Returns</span>
          </h2>
          <p>
            Items must be in original unworn condition with tags attached and packed in the original protective box. Returns must be initiated within 30 days of package delivery.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Truck className="w-4 h-4 text-purple-400" />
            <span>Doorstep Pickup Service</span>
          </h2>
          <p>
            We provide free doorstep reverse pickup in major Pakistani metropolitan areas including Karachi, Lahore, Islamabad, Rawalpindi, Faisalabad, and Peshawar via our courier partners (TCS & Trax).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-purple-400" />
            <span>Refunds & Processing Speed</span>
          </h2>
          <p>
            Once received and inspected at our logistics fulfillment facility, refunds are processed within 24 to 48 hours directly to your Raast ID, Bank Account, JazzCash, EasyPaisa, or issued as instant store credit in Pakistani Rupees.
          </p>
        </section>

        <div className="pt-6 border-t border-white/10 text-center">
          <p className="text-xs text-nova-muted mb-4">Need help initiating a return or exchange?</p>
          <Link
            to="/contact"
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-glow-purple"
          >
            Contact 24/7 Concierge
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReturnsPolicy;

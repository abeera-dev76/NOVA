import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4">
          Contact Concierge Support
        </h1>
        <p className="text-sm sm:text-base text-nova-muted leading-relaxed">
          Have inquiries regarding product sizing, order tracking, or custom orders in Pakistan?
          Our specialized specialists are at your disposal 24/7.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 p-8 rounded-3xl bg-[#0c0c14] border border-white/10 space-y-6">
          <h2 className="text-xl font-bold text-white mb-4">Direct Channels</h2>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-nova-muted">Email Us</p>
              <p className="text-sm font-bold text-white">concierge@nova.pk</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-nova-muted">Helpline (Pakistan)</p>
              <p className="text-sm font-bold text-white">+92 (042) 111-00-6682</p>
              <p className="text-[11px] text-purple-400 font-mono">Mon - Sat: 9:00 AM - 9:00 PM PKT</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-nova-muted">Headquarters</p>
              <p className="text-sm font-bold text-white">NOVA Spatial Labs, Gulberg III, Lahore, Pakistan</p>
            </div>
          </div>
        </div>

        {/* Contact Form (7 cols) */}
        <div className="lg:col-span-7 p-8 rounded-3xl bg-[#0c0c14] border border-purple-500/30 shadow-glow-purple">
          {submitted ? (
            <div className="text-center py-12">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Message Dispatched!</h3>
              <p className="text-xs text-nova-muted max-w-sm mx-auto mb-6">
                Thank you for reaching out. A dedicated concierge specialist will respond within 2 to 4 business hours.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-purple-600 text-white text-xs font-bold"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name</label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Ali Raza"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="ali@domain.pk"
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Inquiry / Message</label>
                <textarea
                  required
                  rows={4}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell us how we can assist you..."
                  className="w-full px-4 py-3 rounded-xl bg-black/60 border border-white/10 text-white text-sm focus:border-purple-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2"
              >
                <span>Dispatch Message</span>
                <Send className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

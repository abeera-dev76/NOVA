import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';

const WEBHOOK_URL = 'https://abeeraimtiaz.app.n8n.cloud/webhook-test/custom';

const Contact = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [validationErrors, setValidationErrors] = useState({});
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const validate = () => {
    const errors = {};
    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedMessage = form.message.trim();

    if (!trimmedName) {
      errors.name = 'Please enter your name.';
    }

    if (!trimmedEmail) {
      errors.email = 'Please enter your email address.';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedEmail)) {
        errors.email = 'Please enter a valid email address.';
      }
    }

    if (!trimmedMessage) {
      errors.message = 'Please enter your message.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent duplicate submissions while request is processing
    if (loading) return;

    setErrorMessage('');

    // Validate inputs
    const errors = validate();
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    setValidationErrors({});
    setLoading(true);

    try {
      const response = await fetch(WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          message: form.message.trim(),
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setForm({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(
          'Unable to deliver your message at this moment. Please try again or reach out to us at concierge@nova.pk.'
        );
      }
    } catch (err) {
      setErrorMessage(
        'A network error occurred while submitting your message. Please check your internet connection and try again.'
      );
    } finally {
      setLoading(false);
    }
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
              <h3 className="text-xl font-bold text-white mb-2">
                Thank you! Your message has been received.
              </h3>
              <p className="text-xs text-nova-muted max-w-sm mx-auto mb-6">
                A dedicated concierge specialist will review your inquiry and respond within 2 to 4 business hours.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setErrorMessage('');
                  setValidationErrors({});
                }}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition shadow-glow-purple"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Submission Error Banner */}
              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-red-950/40 border border-red-500/30 flex items-start gap-2.5 text-xs text-red-300">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submission Loading Banner */}
              {loading && (
                <div className="p-3.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center gap-2.5 text-xs text-purple-300 animate-pulse">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400 shrink-0" />
                  <span>Submitting your message to NOVA Concierge...</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Name</label>
                <input
                  type="text"
                  disabled={loading}
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (validationErrors.name) {
                      setValidationErrors((prev) => ({ ...prev, name: '' }));
                    }
                  }}
                  placeholder="Ali Raza"
                  className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white text-sm focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.name
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-purple-500'
                  }`}
                />
                {validationErrors.name && (
                  <p className="text-[11px] text-red-400 mt-1">{validationErrors.name}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Email Address</label>
                <input
                  type="email"
                  disabled={loading}
                  value={form.email}
                  onChange={(e) => {
                    setForm({ ...form, email: e.target.value });
                    if (validationErrors.email) {
                      setValidationErrors((prev) => ({ ...prev, email: '' }));
                    }
                  }}
                  placeholder="ali@domain.pk"
                  className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white text-sm focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.email
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-purple-500'
                  }`}
                />
                {validationErrors.email && (
                  <p className="text-[11px] text-red-400 mt-1">{validationErrors.email}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">Your Inquiry / Message</label>
                <textarea
                  rows={4}
                  disabled={loading}
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (validationErrors.message) {
                      setValidationErrors((prev) => ({ ...prev, message: '' }));
                    }
                  }}
                  placeholder="Tell us how we can assist you..."
                  className={`w-full px-4 py-3 rounded-xl bg-black/60 border text-white text-sm focus:outline-none transition disabled:opacity-50 disabled:cursor-not-allowed ${
                    validationErrors.message
                      ? 'border-red-500/60 focus:border-red-500'
                      : 'border-white/10 focus:border-purple-500'
                  }`}
                />
                {validationErrors.message && (
                  <p className="text-[11px] text-red-400 mt-1">{validationErrors.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 shadow-glow-purple transition flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin text-purple-200" />
                    <span>Submitting message...</span>
                  </>
                ) : (
                  <>
                    <span>Dispatch Message</span>
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;

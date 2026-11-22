import React from 'react';
import { Shield } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-glow-purple">
          <Shield className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Privacy Policy</h1>
        <p className="text-sm text-nova-muted mt-2">
          Your personal data is encrypted with zero-knowledge protocols.
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0c0c14] border border-white/10 p-8 sm:p-10 rounded-3xl">
        <section>
          <h2 className="text-base font-bold text-white mb-2">1. Information We Collect</h2>
          <p>
            When you purchase from NOVA in Pakistan or create an account, we collect necessary contact and delivery information (Full Name, Shipping Address, Phone Number, and Email). We do not store unencrypted payment card details.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">2. How We Protect Your Data</h2>
          <p>
            All communications between your device and NOVA servers are secured using TLS 1.3 encryption. Your account and orders are protected against unauthorized access.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">3. Zero Spam Guarantee</h2>
          <p>
            We strictly respect your digital sovereignty. You will only receive order updates, courier tracking notifications, and opt-in secret cyber drops. You can unsubscribe with one click at any time.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">4. Contacting Our Data Officer</h2>
          <p>
            For inquiries regarding your stored records or request for complete deletion, reach out to <span className="text-purple-400 font-mono">privacy@nova.pk</span>.
          </p>
        </section>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

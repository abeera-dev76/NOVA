import React from 'react';
import { FileText } from 'lucide-react';

const TermsConditions = () => {
  return (
    <div className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <div className="w-14 h-14 rounded-2xl bg-purple-950/60 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto mb-4 shadow-glow-purple">
          <FileText className="w-7 h-7" />
        </div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Terms & Conditions</h1>
        <p className="text-sm text-nova-muted mt-2">
          Effective Date: November 2026 &bull; NOVA Retail Pakistan
        </p>
      </div>

      <div className="space-y-6 text-sm text-gray-300 leading-relaxed bg-[#0c0c14] border border-white/10 p-8 sm:p-10 rounded-3xl">
        <section>
          <h2 className="text-base font-bold text-white mb-2">1. Acceptance of Terms</h2>
          <p>
            By accessing or ordering from the NOVA website, you agree to comply with these Terms of Service, applicable laws, and regulations governing consumer transactions within Pakistan.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">2. Pricing and Currency</h2>
          <p>
            All listed prices are denominated in Pakistani Rupees (PKR) and include standard sales tax. Shipping charges (if applicable) are clearly itemized prior to final order confirmation.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">3. Intellectual Property</h2>
          <p>
            All designs, 3D interactive interfaces, trademarks, and multimedia assets are the proprietary intellectual property of NOVA Inc. Unauthorized reproduction is strictly prohibited.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-white mb-2">4. Governing Law</h2>
          <p>
            These terms are governed and construed in accordance with the laws of the Islamic Republic of Pakistan. Any dispute shall be resolved in the competent courts of Lahore / Islamabad.
          </p>
        </section>
      </div>
    </div>
  );
};

export default TermsConditions;

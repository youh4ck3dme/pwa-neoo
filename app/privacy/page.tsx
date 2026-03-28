import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-700 leading-relaxed">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b pb-4">Privacy Policy</h1>
      <p className="mb-6 font-semibold">Last updated: March 28, 2026</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Information We Collect</h2>
        <p>At MA.GI.CA s.r.o., we prioritize your data security. When you use our AI PWA platform, we collect technical metadata from your uploads to facilitate the analysis process. We do not store your raw source code permanently unless explicitly requested for long-term hosting.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Cybersecurity Commitment</h2>
        <p>Our infrastructure is hardened with WAF, DNSSEC, and enterprise-grade encryption. We utilize rate limiting and automated auditing to protect against DDoS and unauthorized access.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Data Residency</h2>
        <p>All data is processed within highly secure EU-based data centers (Vercel/AWS Edge) to ensure compliance with GDPR and local regulations.</p>
      </section>

      <div className="bg-slate-50 p-6 rounded-[7px] border border-slate-100">
        <p className="font-bold mb-2">Contact Security Team:</p>
        <p>Email: magicasro@hotmail.com</p>
        <p>Phone: +421 917 488 903</p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;

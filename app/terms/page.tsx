import React from "react";

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-24 text-slate-700 leading-relaxed">
      <h1 className="text-4xl font-extrabold text-slate-900 mb-8 border-b pb-4">Terms of Service</h1>
      <p className="mb-6 font-semibold">Last updated: March 28, 2026</p>
      
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">1. Service Definition</h2>
        <p>MA.GI.CA provides Enterprise PWA development, cybersecurity auditing, and AI-driven portfolio generation services.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">2. Enterprise Usage</h2>
        <p>Our Pro and Government packages are subject to specific Service Level Agreements (SLA) regarding availability and incident response times.</p>
      </section>

      <section className="mb-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">3. Intellectual Property</h2>
        <p>Clients retain full ownership of their source code. MA.GI.CA retains ownership of the underlying AI processing logic and the platform infrastructure.</p>
      </section>

      <footer className="mt-20 pt-8 border-t text-sm text-slate-400">
        <p>© 2026 MA.GI.CA s.r.o. | Business ID: 31677517</p>
      </footer>
    </div>
  );
};

export default TermsOfService;

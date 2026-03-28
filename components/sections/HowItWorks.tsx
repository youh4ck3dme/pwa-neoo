import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      id: 1,
      title: "Auditing & Analysis",
      desc: "Hĺbková analýza zdrojového kódu, identifikácia bezpečnostných vzorov a technologického stacku projektu.",
      icon: "fa-laptop-code",
      color: "bg-blue-50 text-primary-600"
    },
    {
      id: 2,
      title: "Hardened Content",
      desc: "Automatické generovanie technickej dokumentácie, bezpečnostných profilov a optimalizovaného README.",
      icon: "fa-pencil-alt",
      color: "bg-accent-50 text-accent-600"
    },
    {
      id: 3,
      title: "Cyber Identity",
      desc: "Vytvorenie unikátnej vizuálnej identity a vizuálov pre najnáročnejšie inštitucionálne prostredia.",
      icon: "fa-image",
      color: "bg-slate-50 text-slate-900"
    },
    {
      id: 4,
      title: "Secure Deployment",
      desc: "Okamžité nasadenie do hardened PWA infraštruktúry s failover riešením a SEO optimalizáciou.",
      icon: "fa-rocket",
      color: "bg-green-50 text-green-600"
    }
  ];

  return (
    <section id="ako-to-funguje" className="py-24 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center mb-20">
        <div className="inline-block px-4 py-1.5 bg-white border border-slate-100 rounded-[7px] mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Ako to funguje</div>
        <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6">Náš automatizovaný proces pre <span className="text-primary-600">prezentáciu projektov</span></h2>
        <p className="text-lg text-slate-500 max-w-2xl mx-auto">Využívame AI na to, aby sme váš kód premenili na profesionálne portfólio v štyroch jednoduchých krokoch.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div key={step.id} className="feature-card bg-white p-8 rounded-[7px] border border-slate-100 shadow-sm group hover:scale-[1.02] transition-all">
              <div className={`w-14 h-14 ${step.color} rounded-[7px] flex items-center justify-center text-2xl mb-6 font-bold group-hover:bg-primary-600 group-hover:text-white transition-colors`}>{step.id}</div>
              <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">{step.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed font-medium">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

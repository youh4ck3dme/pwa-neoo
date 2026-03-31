"use client";
import React from "react";
import Link from "next/link";
import { Check, Shield, Globe, Lock, Cpu, Server, Activity, ArrowRight } from "lucide-react";

const pricingPackages = [
  {
    name: "Standard Web",
    id: "standard",
    description: "Spoľahlivý web pre klientov, ktorí chcú profesionálnu prezentáciu s dôrazom na rýchlosť a moderný vzhľad.",
    icon: <Globe className="w-8 h-8 text-primary-600" />,
    features: [
      "Produkčný web hosting",
      "HTTPS / SSL certifikát",
      "Responzívny frontend (PWA Ready)",
      "Kontaktný formulár",
      "Základná ochrana proti spamu",
      "Základné zálohovanie",
    ],
    cta: "Vybrať Standard",
    highlighted: false,
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Pro / Institutional",
    id: "pro",
    description: "Architektúra pripravená pre firmy a úrady vyžadujúce oddelené vrstvy a vysokú bezpečnosť.",
    icon: <Shield className="w-8 h-8 text-accent-600" />,
    features: [
      "Dedicated clean IP",
      "Oddelené služby (Web / Mail / API)",
      "DNSSEC & WAF ochrana",
      "Advanced Security headers",
      "Monitoring dostupnosti a reputácie",
      "Minimalizácia 3rd party skriptov",
      "Self-hosted assety (Fonts/JS)",
      "Quarterly security review",
    ],
    cta: "Vybrať Pro",
    highlighted: true,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
  },
  {
    name: "Government / Executive",
    id: "executive",
    description: "Maximálna dôveryhodnosť, auditovateľnosť a pripravenosť pre reštriktívne štátne a firemné siete.",
    icon: <Lock className="w-8 h-8 text-slate-900" />,
    features: [
      "Všetko z balíka Pro",
      "Government-Safe Mode",
      "Statický safe-render fallback",
      "Failover infraštruktúra",
      "Status page & Audit logy",
      "Acceptance checklist pre inštitúcie",
      "Hardened admin access (MFA/2FA)",
      "Readonly emergency mode",
    ],
    cta: "Vybrať Executive",
    highlighted: false,
    image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
  },
];

const extraFeatures = [
  { name: "Reputation Shield", description: "Ochrana dobrého mena domény.", icon: <Activity className="w-5 h-5" /> },
  { name: "DMARC/SPF Setup", description: "Zabezpečenie firemných e-mailov.", icon: <Globe className="w-5 h-5" /> },
  { name: "DDoS Protection", description: "Obrana proti masívnym útokom.", icon: <Shield className="w-5 h-5" /> },
  { name: "Rate Limiting", description: "Ochrana pred zahltitím API.", icon: <Cpu className="w-5 h-5" /> },
  { name: "Privacy Analytics", description: "GDPR-friendly meranie dát.", icon: <Server className="w-5 h-5" /> },
  { name: "Vulnerability Scan", description: "Pravidelné hľadanie slabín.", icon: <Lock className="w-5 h-5" /> },
  { name: "Backup Testing", description: "Pravidelné testy obnovy dát.", icon: <Activity className="w-5 h-5" /> },
  { name: "Incident Response", description: "Pohotovostná podpora 24/7.", icon: <Shield className="w-5 h-5" /> },
];

const Pricing = () => {
  return (
    <section id="enterprise-packages" className="py-24 bg-[#fcfcfc] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-20">
          <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-[7px] mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">Enterprise Solutions</div>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">
            Dôveryhodná platforma pre <br /><span className="text-primary-600">profesionálny biznis</span>
          </h2>
          <p className="text-lg text-slate-500 font-medium max-w-3xl">
            Nevyvíjame len web, ale bezpečnú digitálnu bránu pripravenú aj pre prostredia s najprísnejšími pravidlami.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {pricingPackages.map((pkg) => (
            <div
              key={pkg.id}
              className={`relative flex flex-col p-8 rounded-[2.5rem] transition-all duration-500 hover:scale-[1.02] ${
                pkg.highlighted
                  ? "bg-white shadow-2xl shadow-primary-200/50 border-2 border-primary-100"
                  : "bg-white/50 backdrop-blur-xl border border-slate-100 hover:shadow-xl"
              }`}
            >
              {pkg.highlighted && (
                <div className="absolute top-0 right-10 -translate-y-1/2 px-4 py-1.5 bg-primary-600 text-white text-xs font-bold rounded-full uppercase tracking-wider">
                  Odporúčané
                </div>
              )}
              
              <div className="mb-8">
                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${pkg.highlighted ? "bg-primary-50" : "bg-slate-50"}`}>
                  {pkg.icon}
                </div>
                <h4 className="text-2xl font-bold text-slate-900 mb-3">{pkg.name}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{pkg.description}</p>
              </div>

              <ul className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start text-sm text-slate-600 font-medium">
                    <Check className="w-5 h-5 text-primary-600 mr-3 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>

              <Link
                href={`/${pkg.id}`}
                className={`w-full py-4 rounded-[7px] font-bold transition-all flex items-center justify-center gap-2 ${
                  pkg.highlighted
                    ? "bg-primary-600 text-white hover:bg-primary-700 shadow-lg shadow-primary-500/20"
                    : "bg-slate-900 text-white hover:bg-slate-800"
                }`}
              >
                {pkg.cta}
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ))}
        </div>

        <div className="bg-slate-900 rounded-[3rem] p-10 lg:p-16 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/20 rounded-full blur-[100px] -z-0"></div>
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h4 className="text-3xl font-bold mb-6 italic">Extra <span className="text-primary-400">Security</span> Moduly</h4>
              <p className="text-slate-400 font-medium mb-10 leading-relaxed">
                Tieto položky vieme predávať aj samostatne ako doplnky pre váš existujúci systém. Zabezpečte si kontinuitu a reputáciu vašej digitálnej infraštruktúry.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {extraFeatures.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-colors group">
                    <div className="text-primary-400 group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold">{feature.name}</h5>
                      <p className="text-xs text-slate-500">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 rounded-[2rem]">
              <h4 className="text-xl font-bold mb-6 flex items-center gap-3">
                <Cpu className="text-primary-400" /> Dashboard predajnej logiky
              </h4>
              <ul className="space-y-4">
                {[
                  { title: "Dostupnosť", desc: "Prístup aj v reštriktívnych sieťach." },
                  { title: "Dôveryhodnosť", desc: "Žiadne blokovania a čistá reputácia." },
                  { title: "Stabilita", desc: "Failover ochrana pred výpadkom." },
                  { title: "Bezpečnosť", desc: "WAF a proaktívny monitoring." },
                  { title: "Auditovateľnosť", desc: "Kompletné audit logy prístupov." },
                  { title: "Prestíž", desc: "Pripravenosť pre štátny sektor." },
                ].map((item, idx) => (
                  <li key={idx} className="flex justify-between items-center border-b border-white/5 pb-3">
                    <span className="text-sm font-bold text-slate-300">{item.title}</span>
                    <span className="text-xs text-slate-500">{item.desc}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 p-4 bg-primary-900/40 rounded-xl border border-primary-500/30">
                <p className="text-sm font-bold text-center italic">
                  "Nevyvíjame len web, ale dôveryhodnú a bezpečnú platformu."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;

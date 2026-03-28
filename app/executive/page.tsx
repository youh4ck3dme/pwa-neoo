"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Globe2, Landmark, Fingerprint, ArrowRight, Database, Users, Terminal } from "lucide-react";
import Link from "next/link";

const ExecutivePage = () => {
  const blueprint = [
    { title: "MFA & Hardened Access", desc: "Prístup do administrácie chránený hardvérovými kľúčmi a multi-faktorom." },
    { title: "Static Safe-Render Fallback", desc: "Aplikácia vygeneruje statickú verziu, ktorá funguje aj pri kompletnom výpadku backendu." },
    { title: "Failover Infrastructure", desc: "Automatické prepnutie na záložný server v inom regióne v prípade katastrofy." },
    { title: "Audit Log Integrity", desc: "Nezmazateľné záznamy o každej akcii v systéme pre potreby auditu." },
  ];

  return (
    <div className="bg-[#050505] min-h-screen text-slate-200 selection:bg-primary-500 selection:text-white">
      {/* Hero Section - The Vault */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ duration: 3 }}
          className="absolute inset-0 z-0 scale-110"
        >
          <img 
            src="/C:/Users/42195/.gemini/antigravity/brain/e4ddb9d9-ea98-4fc4-baa0-8efe3faf4d66/executive_government_storyweb_hero_1774658018590.png" 
            alt="Executive Hero" 
            className="w-full h-full object-cover grayscale opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/70 to-[#050505]"></div>
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-3 px-8 py-3 rounded-full bg-primary-950/40 border border-primary-500/30 backdrop-blur-2xl text-primary-400 text-xs font-black tracking-[0.3em] uppercase mb-12 shadow-[0_0_50px_rgba(59,130,246,0.1)]"
          >
            <ShieldAlert size={16} />
            <span>Highest Clearance Level</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-6xl md:text-9xl font-black mb-10 tracking-tight leading-[0.9]"
          >
            Government <br />
            <span className="text-white drop-shadow-[0_0_30px_rgba(255,255,255,0.2)]">Executive</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto font-medium leading-relaxed"
          >
            Maximálna dôveryhodnosť, auditovateľnosť a pripravenosť pre reštriktívne štátne a firemné siete. Navrhnuté pre nulové riziko.
          </motion.p>
        </div>
      </section>

      {/* The Story - "The Zero Trust Standard" */}
      <section className="py-40 px-6 max-w-7xl mx-auto relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary-500/5 blur-[120px] rounded-full -z-10"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <motion.div
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
            >
                <div className="bg-white/5 border border-white/10 p-2 rounded-xl inline-block mb-10">
                    <Fingerprint className="w-10 h-10 text-primary-500" />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-10 leading-tight">Suverenita dát a infraštruktúry.</h2>
                <p className="text-xl text-slate-400 mb-10 font-light leading-relaxed">
                  Balík **Executive** nie je len hosting. Je to komplexný ekosystém navrhnutý pre organizácie, kde každá sekunda výpadku alebo únik bajtu dát znamená katastrofu. 
                  S implementovaným **Government-Safe Mode** prechádzate najprísnejšími bezpečnostnými filtrami štátnych inštitúcií.
                </p>
                <div className="space-y-6">
                    {[
                        "24/7 Dedicated Security Concierge",
                        "Auditovateľný Open-Source Stack",
                        "Mesačné penetračné testy",
                        "Acceptance Checklist pre inštitúcie"
                    ].map((text, i) => (
                        <div key={i} className="flex items-center space-x-4">
                            <div className="w-2 h-2 rounded-full bg-primary-500 shadow-[0_0_10px_rgba(59,130,246,1)]"></div>
                            <span className="text-slate-300 font-bold">{text}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-6">
                {[
                    { icon: Landmark, label: "Compliance", val: "EU/SK Ready" },
                    { icon: Globe2, label: "Uptime", val: "99.99% SLA" },
                    { icon: Terminal, label: "Logs", val: "Immutable" },
                    { icon: Users, label: "Access", val: "L3 MFA" },
                ].map((stat, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-3xl text-center"
                    >
                        <stat.icon className="w-8 h-8 mx-auto text-primary-400 mb-4 opacity-50" />
                        <div className="text-2xl font-black mb-1">{stat.val}</div>
                        <div className="text-xs text-slate-500 uppercase tracking-widest">{stat.label}</div>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* Blueprint - Story Section */}
      <section className="bg-white text-slate-900 py-32">
        <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-12">
                <div className="max-w-2xl">
                    <h2 className="text-5xl font-black mb-6">Technický Blueprint</h2>
                    <p className="text-lg text-slate-600 font-medium">Od readonly núdzového režimu až po off-site failover v reálnom čase.</p>
                </div>
                <div className="hidden md:block">
                    <div className="text-8xl font-black text-slate-100 uppercase select-none tracking-tighter">Hardened</div>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                {blueprint.map((b, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group"
                    >
                        <div className="text-primary-600 font-black mb-4 text-3xl opacity-20 group-hover:opacity-100 transition-opacity">0{i+1}</div>
                        <h4 className="text-xl font-bold mb-4 border-b border-slate-100 pb-4">{b.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{b.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA - The Final Call */}
      <section className="py-40 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-primary-600 opacity-[0.03] -z-10"></div>
        <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-4xl md:text-6xl font-black mb-12 text-white">Objednajte si bezpečnosť bez kompromisov.</h2>
            <Link 
            href="/#kontakt" 
            className="group relative inline-flex items-center space-x-6 px-16 py-8 bg-primary-600 rounded-full text-white font-black text-2xl hover:bg-primary-500 overflow-hidden transition-all shadow-2xl shadow-primary-500/20"
            >
                <span className="relative z-10">Aktivovať EXECUTIVE</span>
                <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform" />
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
            <p className="mt-12 text-slate-500 font-medium uppercase tracking-widest text-xs">
              Vyžaduje podpis SLA a NDA pred začatím prác.
            </p>
        </div>
      </section>
    </div>
  );
};

export default ExecutivePage;

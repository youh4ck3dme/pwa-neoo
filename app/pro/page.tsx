"use client";

import React from "react";
import { motion } from "framer-motion";
import { Shield, Server, Lock, Cpu, ArrowRight, Activity, Database } from "lucide-react";
import Link from "next/link";

const ProPage = () => {
  const steps = [
    { title: "Architektonický Audit", desc: "Hĺbková analýza vašich súčasných dátových tokov a návrh izolácie." },
    { title: "Hardened Infrastructure", desc: "Nasadenie na dedicated IP a konfigurácia DNSSEC/WAF." },
    { title: "Institutional Identity", desc: "Migrácia na self-hosted assety pre maximálnu kontrolu." },
    { title: "Security Lifecycle", desc: "Spustenie 24/7 monitoringu a kvartálnych auditov." },
  ];

  return (
    <div className="bg-slate-950 min-h-screen text-white">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden border-b border-white/10">
        <motion.div 
          initial={{ opacity: 0, scale: 1.2 }}
          animate={{ opacity: 0.4, scale: 1 }}
          transition={{ duration: 2 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/images/pro-hero.png" 
            alt="Pro Hero" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center space-x-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl text-primary-400 text-sm font-bold tracking-widest uppercase mb-10 shadow-2xl"
          >
            <Shield size={16} />
            <span>Institutional Grade Architecture</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-6xl md:text-8xl font-black mb-8 leading-tight tracking-tighter"
          >
            Pro <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-indigo-500">Institutional</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-2xl text-slate-400 max-w-3xl mx-auto font-light"
          >
            Pre firmy, ktoré neponechávajú bezpečnosť na náhodu. Izolované služby, dedikovaná infraštruktúra a inštitucionálna stabilita.
          </motion.p>
        </div>
      </section>

      {/* The Difference Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {[
            { icon: Server, title: "Dedikovaná IP", text: "Vlastná, čistá IP adresa bez zdieľania s inými projektmi. Kľúčové pre reputáciu a mailing." },
            { icon: Activity, title: "Reputačný Monitoring", text: "Sledujeme vašu online stopu a proaktívne riešime akýkoľvek pokles v trust-score." },
            { icon: Cpu, title: "Self-Hosted Assets", text: "Nulová závislosť na externých CDN. Fonty aj knižnice bežia priamo u vás." },
          ].map((feature, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[30px] bg-white/5 border border-white/10 backdrop-blur-md"
            >
              <feature.icon className="w-12 h-12 text-primary-500 mb-6" />
              <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
              <p className="text-slate-400 font-medium leading-relaxed">{feature.text}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Story Narrative: The Hardened Core */}
      <section className="py-24 bg-white text-slate-900 rounded-t-[50px]">
        <div className="max-w-5xl mx-auto px-6 text-center">
            <h2 className="text-5xl font-black mb-12">Filozofia Oddelených Vrstiev</h2>
            <p className="text-xl text-slate-600 mb-16 leading-relaxed">
              V balíku **Pro / Institutional** nerozlišujeme len dizajn. Rozlišujeme infraštruktúru. 
              Vaše API, databáza a maily bežia na izolovaných službách, aby prípadný incident na jednej vrstve neohrozil celok.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                <div className="p-8 border-l-4 border-primary-500 bg-slate-50">
                    <h4 className="font-bold text-lg mb-2">DNSSEC & WAF</h4>
                    <p className="text-slate-500 text-sm">Vaša doména je podpísaná kryptograficky. Útoky sú filtrované ešte pred bránami servera.</p>
                </div>
                <div className="p-8 border-l-4 border-indigo-500 bg-slate-50">
                    <h4 className="font-bold text-lg mb-2">Quarterly Review</h4>
                    <p className="text-slate-500 text-sm">Každé 3 mesiace prejdeme vašu architektúru so security špecialistom.</p>
                </div>
            </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-24 bg-white text-slate-900 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-4xl font-extrabold mb-20">Proces Nasadenia</h2>
            <div className="relative">
                <div className="absolute left-8 top-0 h-full w-1 bg-slate-100"></div>
                {steps.map((s, i) => (
                    <motion.div 
                        key={i}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="relative pl-24 mb-16"
                    >
                        <div className="absolute left-0 w-16 h-16 rounded-[15px] bg-slate-950 text-white flex items-center justify-center font-black text-xl z-10 border-4 border-white">
                            {i + 1}
                        </div>
                        <h4 className="text-2xl font-bold mb-2">{s.title}</h4>
                        <p className="text-slate-500 italic max-w-xl">{s.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center bg-slate-950">
        <h2 className="text-4xl font-black mb-12">Potrebujete inštitucionálnu stabilitu?</h2>
        <Link 
          href="/#kontakt" 
          className="inline-flex items-center space-x-4 px-12 py-6 bg-white text-slate-950 rounded-[15px] font-black text-xl hover:bg-slate-200 transition-all hover:scale-105 active:scale-95"
        >
          <span>Aktivovať plán PRO</span>
          <ArrowRight size={24} />
        </Link>
      </section>
    </div>
  );
};

export default ProPage;

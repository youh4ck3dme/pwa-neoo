"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Zap, Globe, Shield, ArrowRight } from "lucide-react";
import Link from "next/link";

const StandardPage = () => {
  const roadmap = [
    { title: "Analýza & Setup", desc: "Príprava prostredia a analýza cieľov." },
    { title: "Dizajn & PWA", desc: "Premena na offline-ready aplikáciu." },
    { title: "SEO Optima", desc: "Základné nastavenia pre Google." },
    { title: "Launch", desc: "Rýchly bleskový štart na vašej doméne." },
  ];

  return (
    <div className="bg-white min-h-screen text-slate-900">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden bg-slate-950">
        <motion.div 
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <img 
            src="/C:/Users/42195/.gemini/antigravity/brain/e4ddb9d9-ea98-4fc4-baa0-8efe3faf4d66/standard_web_storyweb_hero_1774657984179.png" 
            alt="Standard Hero" 
            className="w-full h-full object-cover"
          />
        </motion.div>
        
        <div className="relative z-10 text-center px-6">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary-600/20 text-primary-400 text-sm font-bold tracking-wider uppercase mb-6"
          >
            Svižnosť & Modernosť
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6"
          >
            Standard <span className="text-primary-500">Web</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-slate-300 max-w-2xl mx-auto"
          >
            Vaša vstupenka do sveta moderných PWA. Rýchlosť, ktorú pocítite, a dizajn, ktorý predáva.
          </motion.p>
        </div>
      </section>

      {/* The Story */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
             initial={{ opacity: 0, x: -50 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true }}
          >
            <h2 className="text-4xl font-bold mb-8 italic text-slate-800">Cesta k rýchlosti...</h2>
            <p className="text-lg text-slate-600 mb-6 font-medium">
              V dnešnom svete je 3 sekundy večnosť. Preto sme balík **Standard Web** od základu postavili na maximálnej efektivite.
            </p>
            <div className="space-y-4">
              {[
                "Rýchly Next.js 15 frontend",
                "PWA readiness (offline prístup)",
                "Automatické zálohy dát",
                "Certifikovaná bezpečnosť (SSL)"
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-3 text-slate-700">
                  <div className="w-6 h-6 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
                    <Check size={14} />
                  </div>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-slate-50 p-12 rounded-[20px] border border-slate-100 relative"
          >
            <Zap className="absolute -top-6 -right-6 text-primary-500 w-16 h-16 opacity-20" />
            <h3 className="text-2xl font-bold mb-6">Technický Stack</h3>
            <ul className="space-y-4 text-slate-600">
              <li><strong>Core:</strong> React / Next.js Hybrid</li>
              <li><strong>Hosting:</strong> Vercel Global Edge Store</li>
              <li><strong>Security:</strong> Basic WAF & Automated SSL</li>
              <li><strong>PWA:</strong> Standard Manifest & SW</li>
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Roadmap - Storyweb style */}
      <section className="bg-slate-950 py-32 text-white">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-24">Roadmapa k Vášmu úspechu</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            {/* Connecting line */}
            <div className="hidden md:block absolute top-10 left-0 w-full h-0.5 bg-slate-800 z-0"></div>
            
            {roadmap.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                className="relative z-10 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-primary-600 border-4 border-slate-950 flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <span className="text-2xl font-black">{i + 1}</span>
                </div>
                <h4 className="text-xl font-bold mb-3">{step.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 text-center bg-white border-t border-slate-100">
        <h2 className="text-4xl font-black mb-8">Pripravený začať?</h2>
        <Link 
          href="/#kontakt" 
          className="inline-flex items-center space-x-3 px-10 py-5 bg-primary-600 text-white rounded-full font-bold hover:bg-primary-700 transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-primary-500/30"
        >
          <span>Vybrať Standard</span>
          <ArrowRight size={20} />
        </Link>
      </section>
    </div>
  );
};

export default StandardPage;

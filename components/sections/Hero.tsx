import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="domov" data-testid="hero-section" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[800px] h-[800px] bg-slate-100 rounded-full blur-[120px] -z-10 opacity-50"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[600px] h-[600px] bg-primary-50 rounded-full blur-[120px] -z-10 opacity-30"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full mb-8">
          <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
          <span className="text-[10px] font-black text-slate-500 tracking-widest uppercase">Dôveryhodná platforma pre profesionálny biznis</span>
        </div>
        
        <h1 data-testid="hero-title" className="text-5xl lg:text-8xl font-black text-slate-900 mb-8 tracking-tighter leading-[1.1] flex flex-col items-center">
          <span>Tvoríme PWA aplikácie</span>
          <span className="text-primary-600">čo jednoducho fungujú.</span>
        </h1>

        <p className="text-lg lg:text-2xl text-slate-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
          Premieňame nápady na produkčné Progressive Web Apps — rýchle, offline-ready a hardened bezpečnosťou pre firmy, ktoré chcú byť vždy o krok vpred.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-4.5 bg-slate-900 text-white rounded-[7px] font-bold text-lg hover:bg-primary-600 transition-all shadow-xl hover:shadow-primary-500/20 hover:scale-[1.02]">
            Vstúpiť do Centrály
          </a>
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-4.5 bg-white text-slate-900 border border-slate-200 rounded-[7px] font-bold text-lg hover:bg-slate-50 transition-all hover:scale-[1.02]">
            Preskúmať Systém
          </a>
        </div>

        <div className="mt-20 relative max-w-6xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary-400 to-accent-400 rounded-[2.5rem] blur opacity-10 group-hover:opacity-20 transition duration-1000"></div>
          <Image src="/hero.png"
               alt="MA.GI.CA Enterprise Interface Showcase"
               width={1200} height={675} priority
               className="rounded-[2rem] shadow-2xl relative border border-slate-100 opacity-100 transition-all duration-700" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <section id="domov" data-testid="hero-section" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-[600px] h-[600px] bg-primary-100/50 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-[400px] h-[400px] bg-accent-500/10 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary-50 border border-primary-100 rounded-[7px] mb-8 animate-bounce-slow">
          <span className="flex h-2 w-2 rounded-full bg-primary-600"></span>
          <span className="text-xs font-bold text-primary-700 tracking-wider uppercase">AI-POWERED WORKFLOW</span>
        </div>
        
        <h1 data-testid="hero-title" className="text-5xl lg:text-7xl font-extrabold text-slate-900 mb-8 tracking-tighter leading-[1.05]">
          MA.GI.CA — <span className="gradient-text">Enterprise PWA</span> & Cybersecurity
        </h1>
        
        <p className="text-lg lg:text-xl text-slate-500 max-w-3xl mx-auto mb-12 leading-relaxed font-medium">
          Produkčné PWA aplikácie a kybernetická bezpečnosť pre najnáročnejších klientov. Od vývoja po hardened deployment.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center items-center gap-6 mb-4">
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-5 bg-primary-600 text-white rounded-[7px] font-bold text-lg hover:bg-primary-700 transition-all shadow-xl shadow-primary-500/20 hover:scale-[1.02]">
            Pridať projekt
          </a>
          <a href="#portfolio" className="w-full sm:w-auto px-10 py-5 bg-white text-slate-700 border border-slate-200 rounded-[7px] font-bold text-lg hover:bg-slate-50 transition-all hover:scale-[1.02]">
            Preskúmať prácu
          </a>
        </div>
        <p className="text-sm text-slate-400 italic mb-12">
          *Nahraj ZIP, my spracujeme kód, vygenerujeme popis a profesionálny thumbnail — pripravené do portfólia za pár minút.*
        </p>

        <div className="mt-20 relative max-w-5xl mx-auto">
          <div className="absolute inset-0 bg-gradient-to-t from-[#fcfcfc] via-transparent to-transparent z-10"></div>
          <Image src="/hero.png"
               alt="MA.GI.CA Enterprise PWA Interface Showcase - Secure Cyber Infrastructure"
               width={1200} height={675} priority
               className="rounded-[2.5rem] shadow-2xl border border-white/20 opacity-100 hover:scale-[1.01] transition-transform duration-700" />
        </div>
      </div>
    </section>
  );
};

export default Hero;

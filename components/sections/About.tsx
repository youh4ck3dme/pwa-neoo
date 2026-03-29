import React from "react";
import Image from "next/image";
import { Cpu } from "lucide-react";

const About = () => {
  return (
    <section id="o-nas" data-testid="about-section" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="inline-block px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-[7px] mb-6 text-sm font-bold text-slate-500 uppercase tracking-widest">O nás</div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-slate-900 mb-8">MA.GI.CA ENTERPRISE</h2>
            
            <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
              <p className="font-semibold text-slate-900">
                Špecializujeme sa na enterprise PWA aplikácie a kybernetickú bezpečnosť.
              </p>
              <p>
                Kombinujeme precízny engineering s AI‑driven prezentáciou projektov, aby vaše práce vyzerali profesionálne a predávali hodnotu.
              </p>
              <p className="bg-primary-50 p-4 border-l-4 border-primary-600 rounded-r-[7px] text-primary-900 font-semibold italic">
                Naša automatizovaná platforma transformuje kód na vizuálne zážitky v reálnom čase.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 mt-12 bg-slate-50 p-8 rounded-[7px] border border-slate-100">
              <div>
                <p className="text-5xl font-extrabold text-primary-600 mb-1">100%</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">AI Integration</p>
              </div>
              <div>
                <p className="text-5xl font-extrabold text-primary-600 mb-1">24/7</p>
                <p className="text-sm font-bold text-slate-400 uppercase tracking-wider">PWA Deployment</p>
              </div>
            </div>
          </div>
          
          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 bg-primary-100/30 rounded-[2.5rem] rotate-3 -z-10"></div>
            <Image src="https://images.pexels.com/photos/374559/pexels-photo-374559.jpeg"
                 alt="AI Research" width={800} height={600} className="rounded-[7px] shadow-2xl w-full object-cover aspect-[4/3]" />
            
            <div className="absolute -bottom-10 -right-6 lg:-right-10 bg-white p-8 rounded-[7px] shadow-2xl border border-slate-100 animate-float">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-accent-50 text-accent-600 rounded-[7px] flex items-center justify-center text-3xl">
                  <Cpu size={28} />
                </div>
                <div>
                  <p className="font-extrabold text-slate-900 text-xl">Future-Ready</p>
                  <p className="text-sm text-slate-400 font-bold uppercase tracking-tighter">PWA & AI Experts</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

"use client";
import React, { useState } from "react";

const Contact = () => {
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("loading");
    setTimeout(() => {
      setFormStatus("success");
      setTimeout(() => setFormStatus("idle"), 3000);
    }, 1500);
  };

  return (
    <section id="kontakt" data-testid="contact-section" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <div className="inline-block px-4 py-1.5 bg-purple-900/30 border border-purple-700/50 rounded-[7px] mb-6 text-sm font-bold uppercase tracking-widest"><span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-violet-300 bg-clip-text text-transparent">Kontakt a spolupráca</span></div>
            <h2 className="text-4xl lg:text-5xl font-extrabold text-white mb-8">Pripravení na <span className="gradient-text">spoluprácu</span>?</h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-12 font-medium">
              Máte nápad alebo projekt? Pomôžeme ho pretaviť do funkčnej PWA alebo full‑stack riešenia.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-slate-800 text-primary-50 rounded-[7px] flex items-center justify-center text-3xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <i className="fas fa-phone"></i>
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Zavolajte nám</h4>
                  <a href="tel:0917488903" className="text-white font-bold text-xl hover:text-primary-400 transition-colors">0917 488 903</a>
                </div>
              </div>

              <div className="flex items-center gap-5 group">
                <div className="w-16 h-16 bg-slate-800 text-primary-50 rounded-[7px] flex items-center justify-center text-3xl group-hover:bg-primary-600 group-hover:text-white transition-all">
                  <i className="fas fa-envelope"></i>
                </div>
                <div>
                  <h4 className="text-slate-500 font-bold text-xs uppercase tracking-widest mb-1">Napíšte nám</h4>
                  <a href="mailto:magicasro@hotmail.com" className="text-white font-bold text-lg hover:text-primary-400 transition-colors">magicasro@hotmail.com</a>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2">
            <div className="bg-white p-10 md:p-14 rounded-[7px] shadow-2xl relative overflow-hidden">
              <h3 className="text-3xl font-extrabold text-slate-900 mb-8">Napíšte nám</h3>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <input type="text" placeholder="Vaše meno" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary-500" required />
                  <input type="email" placeholder="E-mail" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary-500" required />
                </div>
                <textarea rows={4} placeholder="Vaša správa" className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-primary-500 resize-none" required></textarea>
                <button 
                  disabled={formStatus !== "idle"}
                  className={`w-full py-5 rounded-[7px] text-lg font-bold transition-all ${formStatus === "success" ? "bg-green-500" : "bg-slate-900 hover:bg-primary-600"} text-white`}
                >
                  {formStatus === "idle" && "Odoslať dopyt"}
                  {formStatus === "loading" && <i className="fas fa-spinner fa-spin mr-2"></i>}
                  {formStatus === "success" && "Odoslané!"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

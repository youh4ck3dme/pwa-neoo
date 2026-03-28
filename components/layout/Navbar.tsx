"use client";
import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`fixed w-full top-0 z-50 transition-all duration-500 ${isScrolled ? "glass-header shadow-xl shadow-slate-200/50" : ""}`}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <a href="#" className="text-2xl font-extrabold tracking-tight text-slate-900 group">
              MA.GI.CA <span className="text-primary-600 group-hover:text-accent-600 transition-colors">STUDIO</span>
            </a>
          </div>

          <nav className="hidden md:flex items-center space-x-10">
            <a href="#domov" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Domov</a>
            <a href="#o-nas" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">O nás</a>
            <a href="#ako-to-funguje" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Proces</a>
            <a href="#enterprise-packages" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Enterprise</a>
            <a href="#portfolio" className="text-sm font-semibold text-slate-600 hover:text-primary-600 transition-colors">Portfólio</a>
            <a href="#kontakt" className="px-5 py-2.5 bg-slate-900 text-white text-sm font-bold rounded-[7px] hover:bg-primary-600 transition-all shadow-lg hover:shadow-primary-500/20">Kontakt</a>
          </nav>

          <div className="md:hidden flex items-center">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 hover:text-primary-600 focus:outline-none p-2">
              <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars-staggered'} text-2xl`}></i>
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-b border-slate-100 absolute w-full shadow-2xl transition-all duration-300">
          <div className="px-6 pt-6 pb-8 space-y-4">
            <a href="#domov" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-900 hover:text-primary-600">Domov</a>
            <a href="#o-nas" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-900 hover:text-primary-600">O nás</a>
            <a href="#ako-to-funguje" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-900 hover:text-primary-600">Proces</a>
            <a href="#enterprise-packages" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-900 hover:text-primary-600">Enterprise</a>
            <a href="#portfolio" onClick={() => setIsMobileMenuOpen(false)} className="block text-lg font-semibold text-slate-900 hover:text-primary-600">Portfólio</a>
            <a href="#kontakt" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-4 bg-primary-600 text-white font-bold rounded-[7px]">Kontaktujte nás</a>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

"use client";
import React from "react";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-[#fcfcfc] flex flex-col items-center justify-center px-6 py-20">
      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
          MA.GI.CA <span className="text-primary-600">STUDIO</span>
        </h1>
      </div>

      {/* Offline Icon */}
      <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-6">
        <svg className="w-10 h-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M18.364 5.636a9 9 0 010 12.728M5.636 18.364a9 9 0 010-12.728M8.464 15.536a5 5 0 010-7.072M15.536 8.464a5 5 0 010 7.072M12 12h.01" />
          <line x1="4" y1="4" x2="20" y2="20" strokeWidth={2} strokeLinecap="round" />
        </svg>
      </div>

      {/* Message */}
      <h2 className="text-2xl font-bold text-slate-900 mb-3 text-center">Ste offline</h2>
      <p className="text-slate-500 text-center max-w-md mb-8 leading-relaxed">
        Zdá sa, že nemáte pripojenie k internetu. Skontrolujte si sieť a skúste to znova.
      </p>

      {/* Retry Button */}
      <button
        onClick={() => window.location.reload()}
        className="px-8 py-3 bg-primary-600 text-white font-bold rounded-[7px] hover:bg-primary-700 transition-all shadow-lg shadow-primary-500/20 hover:scale-[1.02] mb-12"
      >
        Skúsiť znova
      </button>

      {/* Skeleton Cards */}
      <div className="w-full max-w-4xl">
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 text-center">
          Portfólio — dostupné po pripojení
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-slate-100 p-5 animate-pulse">
              <div className="h-32 bg-slate-100 rounded-xl mb-4" />
              <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
              <div className="h-3 bg-slate-50 rounded w-full mb-2" />
              <div className="h-3 bg-slate-50 rounded w-5/6 mb-4" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-slate-100 rounded-full" />
                <div className="h-5 w-12 bg-slate-100 rounded-full" />
                <div className="h-5 w-14 bg-slate-100 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p className="mt-12 text-[10px] text-slate-400 uppercase font-bold tracking-widest">
        MA.GI.CA Enterprise PWA • Offline Mode
      </p>
    </div>
  );
}

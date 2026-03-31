import React from "react";

const techs = [
  { name: "Next.js",     icon: "▲",  color: "text-slate-900" },
  { name: "React",       icon: "⚛",  color: "text-cyan-500"  },
  { name: "Angular",     icon: "◈",  color: "text-red-500"   },
  { name: "TypeScript",  icon: "TS", color: "text-blue-600"  },
  { name: "Vue.js",      icon: "◆",  color: "text-emerald-500"},
  { name: "Tailwind CSS",icon: "✦",  color: "text-sky-500"   },
  { name: "Node.js",     icon: "⬡",  color: "text-green-600" },
  { name: "Supabase",    icon: "⚡",  color: "text-emerald-600"},
  { name: "Vercel",      icon: "▲",  color: "text-slate-700" },
  { name: "PWA",         icon: "◉",  color: "text-primary-600"},
];

const TechStack = () => (
  <section className="py-16 bg-slate-50 border-y border-slate-100">
    <div className="max-w-7xl mx-auto px-6 lg:px-8">
      <p className="text-center text-xs font-black text-slate-400 uppercase tracking-[0.25em] mb-10">
        Technológie, ktorým dôverujeme
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        {techs.map((t) => (
          <div
            key={t.name}
            className="flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-200 rounded-full shadow-sm hover:shadow-md hover:border-slate-300 hover:-translate-y-0.5 transition-all duration-200"
          >
            <span className={`text-sm font-black ${t.color}`}>{t.icon}</span>
            <span className="text-sm font-bold text-slate-700">{t.name}</span>
          </div>
        ))}
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div className="p-6">
          <p className="text-4xl font-black text-slate-900 mb-2">React + Next.js</p>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Frontend & Full-Stack</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Moderné SSR a SSG aplikácie s bleskovou rýchlosťou. Server Components, App Router a edge deployment pre maximálny výkon.
          </p>
        </div>
        <div className="p-6 border-x border-slate-100">
          <p className="text-4xl font-black text-slate-900 mb-2">Angular + Vue</p>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Enterprise SPA</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Škálovateľné single-page aplikácie pre korporátne prostredie. Typovo bezpečný kód, modulárna architektúra a dlhodobá udržiavateľnosť.
          </p>
        </div>
        <div className="p-6">
          <p className="text-4xl font-black text-slate-900 mb-2">PWA + Security</p>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-3">Offline & Hardened</p>
          <p className="text-slate-600 text-sm leading-relaxed">
            Progressive Web Apps s offline režimom, push notifikáciami a hardened bezpečnosťou. WAF, CSP, DNSSEC — pripravené na produkciu.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default TechStack;

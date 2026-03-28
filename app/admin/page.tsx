"use client";
import { useState } from "react";

type PageId = "dashboard" | "roadmap" | "tools" | "templates" | "widgets";
type WidgetTabId = "wow" | "conversion" | "data" | "community" | "utils";

interface WidgetItem {
  name: string;
  desc: string;
  tags: string[];
  url: string;
}
interface WidgetCategory {
  title: string;
  desc: string;
  items: WidgetItem[];
}

const widgetsData: Record<WidgetTabId, WidgetCategory> = {
  wow: {
    title: "Vizuálny 'Wow' Efekt (Animácie & 3D)",
    desc: "Klient kupuje očami. Pridaj do nudného webu 3D kartu alebo plynulý efekt pri scrollovaní a tvoja práca zrazu vyzerá 3x drahšie. Tieto knižnice urobia ťažkú prácu za teba.",
    items: [
      { name: "Framer Motion", desc: "Absolútny kráľ animácií v Reacte. Ak chceš, aby prvky na stránke 'naskakovali' ako vo videohrách, toto je cesta.", tags: ["React", "Animations", "Pro"], url: "https://www.framer.com/motion/" },
      { name: "AutoAnimate", desc: "Nulová konfigurácia. Pridáš do kódu 1 riadok a zrazu sa ti všetky zoznamy a tabuľky pri filtrovaní plynule presúvajú (bez trhania).", tags: ["Zero-Config", "Smooth"], url: "https://auto-animate.formkit.com/" },
      { name: "Vanilla-Tilt.js", desc: "Zober obyčajnú kartičku (napr. cenovku), aplikuj toto a zrazu sa karta nakláňa podľa toho, kam užívateľ hýbe myšou. Brutálny 3D efekt.", tags: ["3D", "Hover", "Vanilla"], url: "https://micku7zu.github.io/vanilla-tilt.js/" },
      { name: "LottieFiles", desc: "Namiesto ťažkých GIFov. Stiahneš si vektorovú animáciu (zadarmo), hodíš na web a máš profi animovanú ilustráciu bez straty kvality.", tags: ["Illustrations", "Lightweight"], url: "https://lottiefiles.com/" },
      { name: "GSAP (ScrollTrigger)", desc: "Štandard pre weby ocenené na Awwwards. Keď scrolluješ a veci sa lepia, točia a menia veľkosť podľa tvojho kolieska myši, je to GSAP.", tags: ["Scroll", "Awards", "Pro"], url: "https://gsap.com/scroll/" },
      { name: "Aceternity UI", desc: "Chceš urobiť web pre AI startup? Zober si ich 'Tracing Beam' (čiara, ktorá nasleduje scroll) alebo 'Meteors' efekt na pozadie.", tags: ["AI Style", "Tailwind"], url: "https://ui.aceternity.com/" },
      { name: "Particles.js / tsParticles", desc: "Klasika, ktorá nikdy nesklame. Pridá ti na pozadie pohybujúce sa častice, ktoré reagujú na myš. Vhodné pre Krypto/Tech weby.", tags: ["Background", "Tech"], url: "https://particles.js.org/" },
      { name: "Typed.js", desc: "Efekt písacieho stroja. Ideálne na úvodnú stránku (Hero section), kde sa mení text: 'Vytvárame weby pre [Reštaurácie / Startupy / E-shopy]'.", tags: ["Text", "Typing"], url: "https://mattboldt.com/demos/typed-js/" },
      { name: "Hover.css", desc: "Kolekcia CSS3 efektov pre tlačidlá a odkazy. Stiahneš triedu, pridáš na button a ten pri hoveri zaiskrí, zatrasie sa alebo preblikne.", tags: ["CSS", "Buttons"], url: "https://ianlunn.github.io/Hover/" },
      { name: "React Three Fiber", desc: "Ak chceš byť boh. 3D modely priamo vo webe (napríklad rotujúce tenisky alebo auto). Zložitejšie, ale predáš to za majland.", tags: ["3D", "WebGL", "React"], url: "https://docs.pmnd.rs/react-three-fiber" },
    ],
  },
  conversion: {
    title: "Konverzia & Biznis (Peniaze)",
    desc: "Nástroje, vďaka ktorým klienti získavajú leady, maily a reálne platby. Za toto ti zaplatia najradšej, lebo im to vracia investíciu.",
    items: [
      { name: "Stripe Payment Element", desc: "Drop-in widget na platby. Len to vložíš na stránku a klient vie prijímať Apple Pay, Google Pay a karty bez toho, aby si musel riešiť PCI bezpečnosť.", tags: ["Payments", "Money"], url: "https://stripe.com/docs/payments/payment-element" },
      { name: "Tally.so", desc: "Najkrajšie formuláre zadarmo (ako Typeform, ale s 99% funkcií vo free tieri). Vložíš iframe na web a zbieraš leady do tabuľky.", tags: ["Forms", "Leads", "Free"], url: "https://tally.so/" },
      { name: "Sonner", desc: "Najlepší 'Toast' (vyskakovacia hláška v rohu) pre React. Keď užívateľ niečo kúpi, vybehne mu krásna animovaná hláška 'Úspešne zaplatené'.", tags: ["Notifications", "UI"], url: "https://sonner.emilkowal.ski/" },
      { name: "React-Confetti", desc: "Psychológia predaja! Po odoslaní formulára alebo zaplatení objednávky nechaj cez obrazovku spadnúť konfety. Užívatelia to milujú.", tags: ["Gamification", "Fun"], url: "https://github.com/alampros/react-confetti" },
      { name: "Calendly Embed", desc: "Zákazník povie: 'Chcem rezervačný systém'. Ty povieš: 'Iste'. Založíš mu Calendly, vložíš ich widget na web a za 5 minút si vyúčtuješ 100€.", tags: ["Booking", "Meetings"], url: "https://calendly.com/pages/integrations" },
      { name: "Crisp Chat", desc: "Free live chat widget. Vložíš 1 script do HTML a na webe sa vpravo dole objaví bublina, cez ktorú môže majiteľ odpisovať zákazníkom z mobilu.", tags: ["Chat", "Support"], url: "https://crisp.chat/" },
      { name: "React Hook Form", desc: "Absolútny štandard na formuláre v Reacte. Ak kódiš custom form, bez tohto to ani neskúšaj. Rýchle, bez lagov, super validácia.", tags: ["Forms", "React", "Standard"], url: "https://react-hook-form.com/" },
      { name: "Lemon Squeezy", desc: "Alternatíva ku Stripe. Majú krásne 'Checkout Overlays' - tlačidlo, ktoré na webe otvorí platobné okno bez presmerovania preč.", tags: ["Checkout", "SaaS"], url: "https://www.lemonsqueezy.com/" },
      { name: "SweetAlert2", desc: "Nahraď tie škaredé základné prehliadačové alert() boxy za krásne animované popup okná s tlačidlami. Funguje aj bez Reactu.", tags: ["Popups", "Vanilla JS"], url: "https://sweetalert2.github.io/" },
      { name: "Mailchimp Embed", desc: "Jednoduchý formulár na zber emailov do newslettera. Zákazníci chcú budovať databázu mien, toto im tam hoď.", tags: ["Newsletter", "Marketing"], url: "https://mailchimp.com/" },
    ],
  },
  data: {
    title: "UI & Práca s Dátami",
    desc: "Keď buduješ interné systémy (CRM, admin panely). Zákazník chce triediť dáta, hľadať v nich a nahrávať súbory.",
    items: [
      { name: "TanStack Table", desc: "Najlepšia tabuľka na svete (bývalý React Table). Stránkovanie, filtrovanie, zoraďovanie. Zvládne 100 000 riadkov bez seknutia.", tags: ["Tables", "Data", "Heavy"], url: "https://tanstack.com/table" },
      { name: "CommandK (cmdk)", desc: "Ten krásny modal, čo ti vyskočí, keď stlačíš Cmd+K / Ctrl+K. Vyhľadávanie v celej appke ako to má Notion alebo Vercel.", tags: ["Search", "Navigation", "UX"], url: "https://cmdk.paco.me/" },
      { name: "Swiper.js", desc: "Jediný slider (kolotoč na fotky), ktorý kedy budeš potrebovať. Funguje všade, je prispôsobený na potiahnutie prstom na mobile.", tags: ["Sliders", "Mobile-first"], url: "https://swiperjs.com/" },
      { name: "PhotoSwipe", desc: "Ak robíš galériu pre fotografa alebo realitku. Klikneš na fotku, zväčší sa na celú obrazovku s luxusnou animáciou a vieš zoomovať.", tags: ["Gallery", "Images"], url: "https://photoswipe.com/" },
      { name: "React-Dropzone", desc: "Widget na nahrávanie súborov ('Potiahnite a pustite súbory sem'). Vyzerá to 100x lepšie ako ten trápny natívny input file.", tags: ["Upload", "Files"], url: "https://react-dropzone.js.org/" },
      { name: "Plyr", desc: "Jednoduchý, prístupný a prispôsobiteľný video prehrávač pre HTML5, YouTube a Vimeo. Nechaj si videá vyzerať u každého klienta rovnako luxusne.", tags: ["Video", "Media"], url: "https://plyr.io/" },
      { name: "Algolia DocSearch", desc: "Ak robíš dokumentáciu alebo blog. Algolia prebehne tvoj web a dá ti search bar, ktorý hľadá výsledky v milisekundách.", tags: ["Search", "Fast"], url: "https://docsearch.algolia.com/" },
      { name: "Day.js", desc: "Práca s dátumami v JavaScripte je peklo. Táto mini knižnica (2kB) ti umožní robiť veci ako 'Pridané pred 3 hodinami' úplne easy.", tags: ["Dates", "Utility"], url: "https://day.js.org/" },
      { name: "SortableJS", desc: "Chce klient usporiadať položky? Pridaj mu 'Drag and Drop' (chyť a potiahni). Funguje to magicky dobre a klient bude nadšený.", tags: ["Drag&Drop", "UX"], url: "https://sortablejs.github.io/Sortable/" },
      { name: "React-Datepicker", desc: "Základ pre akékoľvek filtre dátumov. Výber od-do, kalendárové zobrazenie, blokovanie víkendov.", tags: ["Calendar", "Forms"], url: "https://reactdatepicker.com/" },
    ],
  },
  community: {
    title: "Komunita, Recenzie & AI",
    desc: "Sociálny dôkaz a umelá inteligencia. Tieto prvky budujú dôveru na weboch tvojich klientov.",
    items: [
      { name: "Vercel AI SDK", desc: "Chceš pridať ChatGPT funkciu do webu klienta? Tento balíček obsahuje hotové UI komponenty pre chat, streaming odpovedí atď.", tags: ["AI", "Chatbots"], url: "https://sdk.vercel.ai/" },
      { name: "Testimonial.to", desc: "Vygeneruj iframe s 'Múrom lásky' (Wall of Love). Zobrazuje video a textové recenzie z Twitteru a Googlu. Extrémny trust builder.", tags: ["Reviews", "Trust"], url: "https://testimonial.to/" },
      { name: "Giscus", desc: "Chceš pridať komentáre pod články (zadarmo)? Giscus využíva 'GitHub Discussions'. Je to open-source, bez reklám a nevyzerá to ako spam.", tags: ["Comments", "Blog", "Free"], url: "https://giscus.app/" },
      { name: "Botpress", desc: "Naklikaj si AI chatbota pre klienta (napr. na zákaznícku podporu) a vlož ho na web ako malý script. Free tier postačuje na štart.", tags: ["AI", "Support"], url: "https://botpress.com/" },
      { name: "React-Share", desc: "Tlačidlá na zdieľanie na FB, X, LinkedIn, WhatsApp... Vyriešené na 1 import s počítadlami zdieľaní.", tags: ["Social", "Buttons"], url: "https://github.com/nygardk/react-share" },
      { name: "Disqus", desc: "Klasika pre komentáre, ak Giscus nevyhovuje. Má free tier (s reklamami), ale na základné blogy je to bezbolestný setup.", tags: ["Comments", "Classic"], url: "https://disqus.com/" },
      { name: "CountUp.js", desc: "Zákazník chce sekciu s číslami: '1500 spokojných klientov'. Namiesto nudného textu použi toto a číslo sa po nascrollovaní 'natočí' od nuly do 1500.", tags: ["Stats", "Animation"], url: "https://inorganik.github.io/countUp.js/" },
      { name: "Trustpilot Widget", desc: "Ak má klient profil na Trustpilote, použi ich free widget a natiahni mu hviezdičky priamo do hlavičky webu.", tags: ["Trust", "Reviews"], url: "https://support.trustpilot.com/hc/en-us/articles/201726696" },
      { name: "Flowise AI", desc: "Nástroj na drag&drop budovanie AI botov (LangChain). Zostroj si vlastného GPT bota na firemných dátach klienta a vlož na web.", tags: ["AI", "LangChain"], url: "https://flowiseai.com/" },
      { name: "Buy Me a Coffee", desc: "Ak staviaš malý free nástroj a chceš, aby ti ľudia mohli hodiť 5€ na kávu. Ikonický žltý widget.", tags: ["Monetization", "Creator"], url: "https://buymeacoffee.com/" },
    ],
  },
  utils: {
    title: "Mapy, Analytika & Tajné Utility",
    desc: "Nástroje, ktoré fungujú na pozadí, ale sú pre produkčné weby nevyhnutné.",
    items: [
      { name: "Leaflet.js", desc: "Zabudni na platené Google Mapy (ktoré pýtajú od klientov kreditku). Leaflet s OpenStreetMap je 100% zadarmo, interaktívny a krásny.", tags: ["Maps", "Free", "Alternative"], url: "https://leafletjs.com/" },
      { name: "Plausible Analytics", desc: "Klienti neznášajú zložité Google Analytics a otravné Cookie bannery. Plausible nevyžaduje cookies (privacy friendly) a štatistiky sú jasné.", tags: ["Analytics", "Privacy"], url: "https://plausible.io/" },
      { name: "Chart.js / Recharts", desc: "Musíš spraviť graf tržieb alebo vývoja hmotnosti do appky? Tieto dve knižnice sú zadarmo, responzívne a vyzerajú profi.", tags: ["Charts", "Data"], url: "https://www.chartjs.org/" },
      { name: "NProgress", desc: "Tá tenučká modrá čiara, ktorá beží na vrchu obrazovky, keď sa načíta ďalšia podstránka (ako to má YouTube). Brutálne to zlepšuje pocit z rýchlosti.", tags: ["Loading", "UX"], url: "https://ricostacruz.com/nprogress/" },
      { name: "Tippy.js", desc: "Najlepšie Tooltipy (malé bubliny s nápovedou, keď prejdeš myšou cez ikonku). Extrémne prispôsobiteľné.", tags: ["Tooltips", "Help"], url: "https://atomiks.github.io/tippyjs/" },
      { name: "QRCode.js / qrcode.react", desc: "Klient chce z webu tlačiť letáky? Vygeneruj mu QR kód dynamicky priamo v prehliadači.", tags: ["QR", "Print"], url: "https://github.com/zpao/qrcode.react" },
      { name: "PostHog", desc: "Analytika pre appky. Umožní ti nahrať si obrazovku (Session replay), ako sa užívatelia správajú vo vnútri tvojej aplikácie. Free tier je super.", tags: ["Analytics", "Replay"], url: "https://posthog.com/" },
      { name: "Sonner Toast", desc: "Moderné 'Toast' notifikácie. Vyzerajú lepšie ako staré React-Toastify a zaberajú menej miesta v kóde.", tags: ["Alerts", "UX"], url: "https://sonner.emilkowal.ski/" },
      { name: "Html2Canvas", desc: "Užívateľ má vo web appke nejaký pekný graf alebo lístok a ty mu ho chceš dovoliť stiahnuť ako .PNG obrázok na 1 klik. Toto to urobí za teba.", tags: ["Export", "Image"], url: "https://html2canvas.hertzen.com/" },
      { name: "Clsx / Tailwind-Merge", desc: "Píšeš podmienené Tailwind triedy ('Ak je error, buď červený, inak buď modrý')? Bez tejto mini knižnice bude tvoj kód jeden obrovský nečitateľný bordel.", tags: ["Tailwind", "Dev Experience"], url: "https://github.com/dcastil/tailwind-merge" },
    ],
  },
};

const tabConfig: Record<WidgetTabId, { label: string; emoji: string; topBar: string; titleHover: string; btnHover: string }> = {
  wow:        { label: "Wow Animácie",      emoji: "✨", topBar: "bg-fuchsia-500", titleHover: "group-hover:text-fuchsia-600", btnHover: "hover:border-fuchsia-400 hover:bg-fuchsia-50 hover:text-fuchsia-700" },
  conversion: { label: "Konverzia & Platby", emoji: "💰", topBar: "bg-emerald-500", titleHover: "group-hover:text-emerald-600", btnHover: "hover:border-emerald-400 hover:bg-emerald-50 hover:text-emerald-700" },
  data:       { label: "UI & Search",        emoji: "🗂️", topBar: "bg-blue-500",    titleHover: "group-hover:text-blue-600",    btnHover: "hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700" },
  community:  { label: "Komunita & AI",      emoji: "🗣️", topBar: "bg-rose-500",    titleHover: "group-hover:text-rose-600",    btnHover: "hover:border-rose-400 hover:bg-rose-50 hover:text-rose-700" },
  utils:      { label: "Mapy & Utility",     emoji: "🛠️", topBar: "bg-amber-500",   titleHover: "group-hover:text-amber-600",   btnHover: "hover:border-amber-400 hover:bg-amber-50 hover:text-amber-700" },
};

const navItems: { id: PageId; label: string; emoji: string }[] = [
  { id: "dashboard",  label: "Prehľad '26",      emoji: "🔥" },
  { id: "roadmap",    label: "Master Roadmapa",   emoji: "📍" },
  { id: "tools",      label: "Real Free Stack",   emoji: "🧰" },
  { id: "templates",  label: "Top 50 Šablón",     emoji: "📦" },
  { id: "widgets",    label: "Top 50 Widgetov",   emoji: "🧩" },
];

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<PageId>("widgets");
  const [activeWidgetTab, setActiveWidgetTab] = useState<WidgetTabId>("wow");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.35s ease-out forwards; }
        .widget-card { transition: transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease; }
        .widget-card:hover { transform: translateY(-3px); box-shadow: 0 16px 30px -8px rgba(0,0,0,0.12); }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 3px; }
      `}</style>

      <div className="min-h-screen flex flex-col md:flex-row bg-slate-50 text-slate-700">

        {/* ── MOBILE TOPBAR ── */}
        <div className="md:hidden flex items-center justify-between bg-slate-900 px-4 py-3 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-base">⚡</div>
            <span className="text-white font-extrabold text-lg tracking-tight">Hustle<span className="text-purple-400">Dev</span></span>
          </div>
          <button onClick={() => setMobileMenuOpen(o => !o)} className="text-white p-2 rounded-lg hover:bg-slate-700 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />}
            </svg>
          </button>
        </div>

        {/* ── MOBILE NAV DRAWER ── */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-slate-200 shadow-lg z-20">
            {navItems.map(item => (
              <button
                key={item.id}
                onClick={() => { setCurrentPage(item.id); setMobileMenuOpen(false); }}
                className={`w-full text-left px-5 py-3.5 flex items-center gap-3 text-sm font-semibold transition-colors border-l-4 ${
                  currentPage === item.id
                    ? "bg-purple-50 text-purple-800 border-purple-500"
                    : "text-slate-600 border-transparent hover:bg-slate-50"
                }`}
              >
                <span className="text-base">{item.emoji}</span>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {/* ── DESKTOP SIDEBAR ── */}
        <aside className="hidden md:flex w-64 bg-white border-r border-slate-200 flex-shrink-0 flex-col shadow-sm sticky top-0 h-screen">
          <div className="p-5 border-b border-slate-100 flex items-center gap-3 bg-slate-900">
            <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-lg">⚡</div>
            <h1 className="text-xl font-extrabold text-white tracking-tight">Hustle<span className="text-purple-400">Dev</span></h1>
          </div>

          <nav className="flex-1 overflow-y-auto py-3">
            <ul className="space-y-0.5 px-2">
              {navItems.map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => setCurrentPage(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl flex items-center gap-3 text-sm font-semibold transition-all ${
                      currentPage === item.id
                        ? "bg-purple-50 text-purple-800 border border-purple-200 shadow-sm"
                        : "text-slate-500 hover:bg-slate-50 hover:text-slate-800 border border-transparent"
                    }`}
                  >
                    <span className="text-base">{item.emoji}</span>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className="p-4 border-t border-slate-100 bg-slate-50 text-center">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Wow Efekt na Počkanie</p>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="flex-1 overflow-y-auto">
          {currentPage === "widgets"   && <WidgetsPage activeTab={activeWidgetTab} setActiveTab={setActiveWidgetTab} />}
          {currentPage === "dashboard" && <PlaceholderPage title="🔥 Prehľad '26" subtitle="Tvoj freelance dashboard príde čoskoro." />}
          {currentPage === "roadmap"   && <PlaceholderPage title="📍 Master Roadmapa" subtitle="Krok za krokom k prvým €1000/mesiac." />}
          {currentPage === "tools"     && <PlaceholderPage title="🧰 Real Free Stack" subtitle="Najlepšie free nástroje pre freelancerov." />}
          {currentPage === "templates" && <PlaceholderPage title="📦 Top 50 Šablón" subtitle="Hotové šablóny na okamžité spustenie." />}
        </main>
      </div>
    </>
  );
}

/* ── WIDGETS PAGE ── */
function WidgetsPage({ activeTab, setActiveTab }: { activeTab: WidgetTabId; setActiveTab: (t: WidgetTabId) => void }) {
  const data = widgetsData[activeTab];
  const cfg  = tabConfig[activeTab];

  return (
    <div className="p-4 sm:p-6 lg:p-10 xl:p-12 max-w-7xl mx-auto pb-20 fade-in">
      {/* Header */}
      <div className="space-y-3 mb-8 sm:mb-10">
        <div className="inline-block px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-bold uppercase tracking-widest border border-purple-200">
          Drop-ins & Knižnice
        </div>
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Top 50 Widgetov<br className="sm:hidden" /> <span className="text-purple-600">(Wow Efekt)</span>
        </h2>
        <p className="text-base sm:text-lg text-slate-600 max-w-3xl leading-relaxed">
          Toto je tajné korenie. Keď zoberieš bežnú šablónu a pridáš do nej 3D kartu alebo plynulý slider,{" "}
          <strong>hodnota tvojej práce stúpne v očiach klienta o stovky eur.</strong>
        </p>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 mb-6 sm:mb-8 bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 overflow-x-auto">
        {(Object.keys(widgetsData) as WidgetTabId[]).map(key => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex-shrink-0 flex items-center gap-1.5 px-3 sm:px-4 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wide transition-all whitespace-nowrap ${
              activeTab === key
                ? "bg-slate-900 text-white shadow-md"
                : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
            }`}
          >
            <span>{tabConfig[key].emoji}</span>
            <span className="hidden sm:inline">{tabConfig[key].label}</span>
            <span className="sm:hidden">{tabConfig[key].label.split(" ")[0]}</span>
          </button>
        ))}
      </div>

      {/* Category Panel */}
      <div className="bg-white rounded-2xl sm:rounded-3xl shadow-lg border border-slate-200 overflow-hidden fade-in">
        <div className={`h-1.5 ${cfg.topBar}`} />
        <div className="p-5 sm:p-8 lg:p-10">
          <div className="mb-7 sm:mb-10">
            <h3 className="text-xl sm:text-3xl font-extrabold text-slate-800 mb-2">{data.title}</h3>
            <p className="text-slate-500 text-sm sm:text-base max-w-2xl leading-relaxed">{data.desc}</p>
          </div>

          {/* Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
            {data.items.map((item, i) => (
              <WidgetCard key={item.name} item={item} index={i} tabCfg={cfg} />
            ))}
          </div>
        </div>
      </div>

      {/* Hustle Tip */}
      <div className="mt-8 sm:mt-10 bg-purple-50 border border-purple-200 rounded-2xl p-5 sm:p-6 flex gap-4 shadow-sm">
        <span className="text-2xl sm:text-3xl flex-shrink-0">🧲</span>
        <div>
          <h4 className="font-bold text-purple-900 text-base sm:text-lg mb-1">Ako pýtať viac peňazí? (Hustle Tip)</h4>
          <p className="text-purple-800 text-sm leading-relaxed">
            Ak ti klient povie: <em>&quot;Tu je 500€ za informačný web&quot;</em>, tvoja odpoveď:{" "}
            <strong>&quot;Môžem vám to urobiť za 500€. ALE ak pridáme 150€, integrujem Calendly, padajúce konfety po odoslaní dopytu a elegantnú 3D galériu. Budete sa javiť 3x drahšie ako konkurencia.&quot;</strong>{" "}
            Ty použiješ Swiper.js, Calendly a React-Confetti (všetko zadarmo) a za hodinu práce máš o 150€ viac.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── WIDGET CARD ── */
function WidgetCard({ item, index, tabCfg }: { item: WidgetItem; index: number; tabCfg: typeof tabConfig[WidgetTabId] }) {
  return (
    <div className={`widget-card bg-slate-50 rounded-xl sm:rounded-2xl p-5 border border-slate-200 flex flex-col justify-between group relative overflow-hidden hover:border-slate-300`}>
      <div>
        <div className="flex justify-between items-start mb-2.5">
          <h4 className={`text-base sm:text-lg font-bold text-slate-900 leading-snug ${tabCfg.titleHover} transition-colors`}>
            {item.name}
          </h4>
          <span className="text-xs font-black text-slate-300 ml-2 flex-shrink-0">#{index + 1}</span>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {item.tags.map(tag => (
            <span key={tag} className="px-2 py-0.5 bg-white border border-slate-200 text-slate-500 text-[10px] font-bold uppercase tracking-wide rounded-md shadow-sm">
              {tag}
            </span>
          ))}
        </div>

        <p className="text-sm text-slate-600 leading-relaxed mb-5">{item.desc}</p>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-between w-full py-2.5 px-4 bg-white border-2 border-slate-200 ${tabCfg.btnHover} text-slate-700 font-bold rounded-xl transition-all shadow-sm text-sm group/btn`}
      >
        <span>Preskúmať Dokumentáciu</span>
        <svg className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </a>
    </div>
  );
}

/* ── PLACEHOLDER PAGES ── */
function PlaceholderPage({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="min-h-screen flex items-center justify-center p-8 fade-in">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-4">{title.split(" ")[0]}</div>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-3">{title.slice(3)}</h2>
        <p className="text-slate-500">{subtitle}</p>
        <p className="mt-4 text-sm text-slate-400">Prejdi na <strong>Top 50 Widgetov</strong> v ľavom menu.</p>
      </div>
    </div>
  );
}

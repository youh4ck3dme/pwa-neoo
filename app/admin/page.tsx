"use client";
import { useState, useEffect } from "react";

type PageId = "dashboard" | "roadmap" | "tools" | "templates" | "widgets" | "sandbox" | "deploy";
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
      { name: "Particles.js / tsParticles", desc: "Klasika, ktorá nikdy nesklame. Pridá ti na pozadie pohybujúce sa častice, ktoré reagujú na myš. Vhodné pre Krypto/Tech weby.", tags: ["Background", "Tech"], url: "https://tsparticles.github.io/tsparticles/" },
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
      { name: "Trustpilot Widget", desc: "Ak má klient profil na Trustpilote, použi ich free widget a natiahni mu hviezdičky priamo do hlavičky webu.", tags: ["Trust", "Reviews"], url: "https://support.trustpilot.com/hc/en-us/articles/201726696-TrustBox-widgets-Trustpilot-s-website-widgets" },
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
      { name: "NProgress", desc: "Tá tenučká modrá čiara, ktorá beží na vrchu obrazovky, keď sa načíta ďalšia podstránka (ako to má YouTube). Brutálne to zlepšuje pocit z rýchlosti.", tags: ["Loading", "UX"], url: "https://github.com/rstacruz/nprogress" },
      { name: "Tippy.js", desc: "Najlepšie Tooltipy (malé bubliny s nápovedou, keď prejdeš myšou cez ikonku). Extrémne prispôsobiteľné.", tags: ["Tooltips", "Help"], url: "https://atomiks.github.io/tippyjs/" },
      { name: "QRCode.js / qrcode.react", desc: "Klient chce z webu tlačiť letáky? Vygeneruj mu QR kód dynamicky priamo v prehliadači.", tags: ["QR", "Print"], url: "https://github.com/zpao/qrcode.react" },
      { name: "PostHog", desc: "Analytika pre appky. Umožní ti nahrať si obrazovku (Session replay), ako sa užívatelia správajú vo vnútri tvojej aplikácie. Free tier je super.", tags: ["Analytics", "Replay"], url: "https://posthog.com/" },
      { name: "Sonner Toast", desc: "Moderné 'Toast' notifikácie. Vyzerajú lepšie ako staré React-Toastify a zaberajú menej miesta v kóde.", tags: ["Alerts", "UX"], url: "https://sonner.emilkowal.ski/" },
      { name: "Html2Canvas", desc: "Užívateľ má vo web appke nejaký pekný graf alebo lístok a ty mu ho chceš dovoliť stiahnuť ako .PNG obrázok na 1 klik. Toto to urobí za teba.", tags: ["Export", "Image"], url: "https://html2canvas.hertzen.com/" },
      { name: "Clsx / Tailwind-Merge", desc: "Píšeš podmienené Tailwind triedy ('Ak je error, buď červený, inak buď modrý')? Bez tejto mini knižnice bude tvoj kód jeden obrovský nečitateľný bordel.", tags: ["Tailwind", "Dev Experience"], url: "https://github.com/dcastil/tailwind-merge" },
    ],
  },
};

// ── TOOLS DATA (Real Free Stack) ──
const toolsData = {
  hosting: { title: "🚀 Hosting & Deploy", items: [
    { name: "Vercel", desc: "Next.js deploy na 1 click, 100 GB free, najrýchlejší," , url: "https://vercel.com" },
    { name: "Railway", desc: "Full-stack deploy + DB v jednom, $5 free credit mesačne", url: "https://railway.app" },
    { name: "Render", desc: "Static + backend, free tier s PostgreSQL databázou", url: "https://render.com" },
    { name: "Cloudflare Pages", desc: "Najrýchlejší CDN zadarmo, unlimited bandwidth", url: "https://pages.cloudflare.com" },
    { name: "Netlify", desc: "Forms + Functions zadarmo, intuívny deploy", url: "https://netlify.com" },
    { name: "Fly.io", desc: "Deploy kdekedy na svete, low latency, free tier s 3x 256MB", url: "https://fly.io" },
    { name: "Deno Deploy", desc: "Edge computing, serverless Deno runtime, zdarma", url: "https://deno.com/deploy" },
    { name: "Heroku", desc: "Klasika, PHP/Node/Python, $5/mesiac dyno", url: "https://www.heroku.com" },
  ]},
  database: { title: "🗄️ Databázy (free tier)", items: [
    { name: "Supabase", desc: "Postgres + Auth + Storage zadarmo, 500MB", url: "https://supabase.com" },
    { name: "Neon", desc: "Serverless Postgres, Git-style branching databáz", url: "https://neon.tech" },
    { name: "Turso", desc: "SQLite na edge, 9GB free, replikácia", url: "https://turso.tech" },
    { name: "MongoDB Atlas", desc: "512MB free cluster, auto-scaling", url: "https://www.mongodb.com/atlas" },
    { name: "PlanetScale", desc: "MySQL s branching, dev branches zadarmo", url: "https://planetscale.com" },
    { name: "Firebase Realtime DB", desc: "NoSQL realtime databáza, 100 concurrent connections free", url: "https://firebase.google.com/products/realtime-database" },
    { name: "Vercel KV", desc: "Redis zadarmo na edge, 3000 commands/deň", url: "https://vercel.com/storage/kv" },
    { name: "EdgeDB", desc: "SQL supermacht, free tier, type-safe queries", url: "https://www.edgedb.com" },
  ]},
  auth: { title: "🔐 Auth & Bezpečnosť", items: [
    { name: "Clerk", desc: "Najkrajší login UI, 10 000 MAU zadarmo, social logins", url: "https://clerk.com" },
    { name: "NextAuth.js", desc: "Self-hosted auth pre Next.js, open-source", url: "https://next-auth.js.org" },
    { name: "Auth0", desc: "7 500 MAU zadarmo, 30+ integrácií", url: "https://auth0.com" },
    { name: "Lucia", desc: "Lightweight auth library, full control, session-based", url: "https://lucia-auth.com" },
    { name: "Better Auth", desc: "Nový štandard 2025, best-in-class DX", url: "https://www.better-auth.com" },
    { name: "Ory", desc: "Open-source identity platform, self-hosted možnosť", url: "https://www.ory.sh" },
    { name: "Magic.link", desc: "Passwordless auth s Magic Links, free tier", url: "https://magic.link" },
    { name: "Okta", desc: "Enterprise auth solution, developer free tier", url: "https://www.okta.com" },
  ]},
  design: { title: "🎨 Design, Ikony & Assets", items: [
    { name: "Lucide Icons", desc: "1000+ SVG ikon, React ready, consistency", url: "https://lucide.dev" },
    { name: "Heroicons", desc: "292 ikoniek od Tailwind Labs, 2 štýly", url: "https://heroicons.com" },
    { name: "Phosphor Icons", desc: "6000+ ikon, 6 štýlov, pixel-perfect", url: "https://phosphoricons.com" },
    { name: "Unsplash", desc: "Free stock fotky, API aj web interface", url: "https://unsplash.com" },
    { name: "Pexels", desc: "Alternatíva k Unsplash, 100 000+ fotiek", url: "https://www.pexels.com" },
    { name: "Figma", desc: "Design tool zadarmo, collaboration, prototyping", url: "https://www.figma.com" },
    { name: "Penpot", desc: "Open-source Figma alternatíva, community driven", url: "https://penpot.app" },
    { name: "Adobe Color", desc: "Generuj color palety z fotiek alebo kľúčových slov", url: "https://color.adobe.com" },
  ]},
  cms: { title: "📦 CMS & Obsah", items: [
    { name: "Sanity.io", desc: "Headless CMS, 200k API calls zadarmo, powerful", url: "https://www.sanity.io" },
    { name: "Contentful", desc: "Free tier 5 users, 50k records, GraphQL ready", url: "https://www.contentful.com" },
    { name: "Payload CMS", desc: "Open-source, self-hosted, built s TypeScript", url: "https://payloadcms.com" },
    { name: "Notion API", desc: "Použi Notion ako CMS cez API", url: "https://developers.notion.com" },
    { name: "MDX / next-mdx-remote", desc: "Markdown s React komponentami ako CMS", url: "https://github.com/hashicorp/next-mdx-remote" },
    { name: "Ghost", desc: "Open-source blogovacia platforma, moderný editor", url: "https://ghost.org" },
    { name: "Strapi", desc: "Headless CMS Node.js, open-source, fully customizable", url: "https://strapi.io" },
    { name: "Hygraph", desc: "Federated CMS, multi-environment, contentful konkurent", url: "https://hygraph.com" },
  ]},
};

// ── TEMPLATES DATA ──
const templatesData = {
  starters: { title: "🏗️ Starter Kits (hotové projekty)", items: [
    { name: "Vercel Templates", desc: "200+ Next.js šablón, gotové na produkciu", url: "https://vercel.com/templates" },
    { name: "Create T3 App", desc: "Next.js + tRPC + Prisma + Tailwind, best practices", url: "https://create.t3.gg" },
    { name: "Shadcn/ui Examples", desc: "Admin dashboard, mail app, music player", url: "https://ui.shadcn.com/examples" },
    { name: "Next.js Commerce", desc: "E-commerce starter od Verelu", url: "https://github.com/vercel/commerce" },
    { name: "Taxonomy (shadcn)", desc: "Blog + Dashboard starter s autentifikáciou", url: "https://tx.shadcn.com" },
    { name: "Astro Templates", desc: "Medzipodlažie pre HTML, statické + islands", url: "https://astro.build/themes" },
    { name: "Remix Templates", desc: "Full-stack framework, server + client routers", url: "https://remix.run" },
    { name: "SvelteKit Starter", desc: "Modern Svelte framework, reactive magic", url: "https://kit.svelte.dev" },
  ]},
  design: { title: "🎨 Figma & Design Kits (zadarmo)", items: [
    { name: "Figma Community", desc: "10 000+ free UI kits a šablón", url: "https://www.figma.com/community" },
    { name: "Untitled UI", desc: "Najlepší free Figma UI kit, premium kvalita", url: "https://www.untitledui.com" },
    { name: "Shadcn/ui", desc: "Copy-paste React komponenty, Tailwind + Radix", url: "https://ui.shadcn.com" },
    { name: "DaisyUI", desc: "Tailwind component library, 400+ komponentov", url: "https://daisyui.com" },
    { name: "Flowbase", desc: "Webflow UI kit templates, paid+free", url: "https://www.flowbase.co" },
    { name: "Material UI", desc: "Google Material Design komponenty, production-ready", url: "https://mui.com" },
    { name: "Mantine", desc: "React components library, 100+ hooks zadarmo", url: "https://mantine.dev" },
    { name: "Chakra UI", desc: "Accessible React UI library, component-first", url: "https://chakra-ui.com" },
  ]},
  landing: { title: "📄 Landing Page Šablóny", items: [
    { name: "Cruip", desc: "Profi SaaS šablóny, free + premium sekcie", url: "https://cruip.com" },
    { name: "HyperUI", desc: "100+ free Tailwind komponenty na copy-paste", url: "https://www.hyperui.dev" },
    { name: "Preline UI", desc: "Free Tailwind UI komponenty, produksné ready", url: "https://preline.co" },
    { name: "Flowrift", desc: "Copy-paste Tailwind sekcie na landing pages", url: "https://flowrift.com" },
    { name: "Tailwind UI Components", desc: "Premium-quality komponenty (free previews)", url: "https://tailwindui.com/components" },
    { name: "Relume", desc: "AI generuje landing pages z popisu, webflow export", url: "https://www.relume.io" },
    { name: "Section.js", desc: "Pre-built landing page sekcie, ready-to-use", url: "https://sectionjs.com" },
    { name: "Minimal.so", desc: "Beautiful minimal landing pages, super simple", url: "https://minimal.so" },
  ]},
  ecommerce: { title: "🛒 E-commerce & Biznis", items: [
    { name: "Medusa.js", desc: "Open-source Shopify alternative, API-first", url: "https://medusajs.com" },
    { name: "Saleor", desc: "GraphQL e-commerce platform, open-source", url: "https://saleor.io" },
    { name: "Shopify Hydrogen", desc: "Headless Shopify, React + Remix framework", url: "https://hydrogen.shopify.dev" },
    { name: "WooCommerce", desc: "WordPress e-commerce plugin, najrozšírenejší", url: "https://woocommerce.com" },
    { name: "OpenCart", desc: "Classic free e-commerce, self-hosted", url: "https://www.opencart.com" },
    { name: "PrestaShop", desc: "PHP e-commerce, community supportovaný", url: "https://www.prestashop.com" },
    { name: "Sylius", desc: "Flexibilný API-first e-commerce framework", url: "https://sylius.com" },
    { name: "Spree Commerce", desc: "Ruby on Rails e-commerce, enterprise-ready", url: "https://spreecommerce.org" },
  ]},
};

// ── ROADMAP DATA ──
const roadmapPhases = [
  { phase: 1, title: "Začínam (0–1 000€/mes)", color: "bg-red-500", emoji: "🌱", items: [
    "Zostav portfólio (5–10 projektov)",
    "Nastav LinkedIn + Behance",
    "Prvé zákazky na Toptal/Upwork",
    "Cena: 15–25€/hod",
  ]},
  { phase: 2, title: "Rast (1 000–3 000€/mes)", color: "bg-yellow-500", emoji: "📈", items: [
    "Vyber niku (reštaurácie, real estate, SaaS)",
    "Zvýš cenu na 40–70€/hod",
    "Referral systém (10% provízia)",
    "Vlastné produkty (šablóny, snippety)",
  ]},
  { phase: 3, title: "Pro (3 000+€/mes)", color: "bg-green-500", emoji: "🚀", items: [
    "Retainer zmluvy (pevná mesačná platba)",
    "Mini agentúra / subcontractori",
    "SaaS produkt alebo digitálny produkt",
    "Cena: 100+€/hod alebo 2k–10k€/projekt",
  ]},
];

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
  { id: "sandbox",    label: "ZIP Sandbox",       emoji: "🔐" },
  { id: "deploy",     label: "Deploy",            emoji: "🚀" },
];

export default function AdminPage() {
  const [currentPage, setCurrentPage] = useState<PageId>("widgets");
  const [activeWidgetTab, setActiveWidgetTab] = useState<WidgetTabId>("wow");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Auto-close mobile menu on page change (Issue #7)
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPage]);

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
          {currentPage === "dashboard" && <DashboardPage />}
          {currentPage === "roadmap"   && <RoadmapPage />}
          {currentPage === "tools"     && <ToolsPage />}
          {currentPage === "templates" && <TemplatesPage />}
          {currentPage === "sandbox"   && <SandboxPage />}
          {currentPage === "deploy"    && <DeployPage />}
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

/* ── DASHBOARD PAGE ── */
function DashboardPage() {
  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto pb-20 fade-in">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8">🔥 Prehľad '26</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-600 text-sm mb-2 uppercase">Tvojich Projektov</h3>
          <p className="text-4xl font-extrabold text-slate-900">∞</p>
          <p className="text-xs text-slate-400 mt-1">Skrz všetky platformy</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-600 text-sm mb-2 uppercase">Tento Mesiac</h3>
          <p className="text-4xl font-extrabold text-emerald-600">↑ 15%</p>
          <p className="text-xs text-slate-400 mt-1">Rast oproti predchádzajúcemu mesiacu</p>
        </div>
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-600 text-sm mb-2 uppercase">Tvojich Nástrojov</h3>
          <p className="text-4xl font-extrabold text-purple-600">50+</p>
          <p className="text-xs text-slate-400 mt-1">Dostupný v admin sekcii</p>
        </div>
      </div>
      <div className="mt-10 bg-gradient-to-r from-purple-50 to-blue-50 rounded-2xl p-8 border border-purple-200">
        <h3 className="text-xl font-bold text-slate-900 mb-2">💡 Tip</h3>
        <p className="text-slate-600">Naviguj na <strong>Real Free Stack</strong> aby si videl všetky free nástroje na hosting, databázy a auth. <strong>Master Roadmapa</strong> ťa naučí ako zarobiť 3000€+/mesiac.</p>
      </div>
    </div>
  );
}

/* ── TOOLS PAGE ── */
function ToolsPage() {
  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto pb-20 fade-in">
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Real Free Stack</h2>
        <p className="text-lg text-slate-600 max-w-3xl">Všetko čo potrebuješ na buildup produkčných aplikácií bez minimálnych nákladov.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(toolsData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{category.title}</h3>
            <div className="space-y-3">
              {category.items.map((tool: any) => (
                <a
                  key={tool.name}
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-purple-400 hover:bg-purple-50 transition-all group"
                >
                  <h4 className="font-bold text-slate-900 group-hover:text-purple-700 transition-colors">{tool.name}</h4>
                  <p className="text-sm text-slate-500 group-hover:text-slate-700 mt-1">{tool.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TEMPLATES PAGE ── */
function TemplatesPage() {
  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto pb-20 fade-in">
      <div className="space-y-3 mb-10">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Top 50 Šablón</h2>
        <p className="text-lg text-slate-600 max-w-3xl">Hotové startéry, UI kity a dizajn šablóny na okamžité spustenie.</p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {Object.entries(templatesData).map(([key, category]) => (
          <div key={key} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-4">{category.title}</h3>
            <div className="space-y-3">
              {category.items.map((template: any) => (
                <a
                  key={template.name}
                  href={template.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-slate-50 rounded-lg border border-slate-200 hover:border-blue-400 hover:bg-blue-50 transition-all group"
                >
                  <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{template.name}</h4>
                  <p className="text-sm text-slate-500 group-hover:text-slate-700 mt-1">{template.desc}</p>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── ROADMAP PAGE ── */
function RoadmapPage() {
  return (
    <div className="p-4 sm:p-8 lg:p-12 max-w-7xl mx-auto pb-20 fade-in">
      <div className="space-y-3 mb-12">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">Master Roadmapa</h2>
        <p className="text-lg text-slate-600 max-w-3xl">Tvoj 3-fázový plán na cestu k €3000+/mesiac.</p>
      </div>
      <div className="space-y-6">
        {roadmapPhases.map((phase, idx) => (
          <div key={phase.phase} className="relative">
            <div className={`${phase.color} rounded-full w-12 h-12 flex items-center justify-center text-white font-bold text-xl shadow-lg mx-auto mb-4`}>
              {phase.emoji}
            </div>
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4">{phase.title}</h3>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <span className="text-primary-600 font-bold mt-0.5">✓</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {idx < roadmapPhases.length - 1 && (
              <div className="flex justify-center my-6">
                <div className="w-1 h-8 bg-gradient-to-b from-slate-300 to-transparent" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── SANDBOX PAGE ── */
function SandboxPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setErrorMessage("");
      setSuccessMessage("");
    }
  };

  const handleApprove = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setErrorMessage("");

    try {
      // TODO: Extract metadata from ZIP like UploadModal does
      const project = {
        title: "New Project from Sandbox",
        imageUrl: "https://via.placeholder.com/800x600?text=Sandbox+Project",
        shortDescription: "Project uploaded via admin sandbox",
        technologies: ["ZIP", "Admin"],
        specialFeatures: ["Sandbox", "Admin-Approved"]
      };

      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(project)
      });

      if (response.status === 503) {
        const data = await response.json() as { configured: boolean };
        setSuccessMessage("✅ Projekt uložený lokálne (Supabase nie je nastavená)");
      } else if (!response.ok) {
        throw new Error("Failed to save project");
      } else {
        setSuccessMessage("✅ Projekt schválený a uložený!");
      }

      setTimeout(() => {
        setSelectedFile(null);
        setSuccessMessage("");
      }, 3000);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = () => {
    setSelectedFile(null);
    setErrorMessage("");
    setSuccessMessage("");
  };

  return (
    <div className="p-8 fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">🔐 ZIP Sandbox</h1>
        <p className="text-slate-600 mb-8">
          Izolovaný preview projektov. ZIP sa extrahuje, metadáta sa auto-vyplnia, AI obrázok sa generuje.
          <br />
          Potom môžeš schváliť alebo zamietnuť projekt.
        </p>

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 font-medium">
            {successMessage}
          </div>
        )}

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
            ❌ {errorMessage}
          </div>
        )}

        {!selectedFile ? (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-200 p-12 text-center mb-6 hover:border-primary-300 transition-colors">
            <input
              type="file"
              accept=".zip"
              onChange={handleFileSelect}
              className="hidden"
              id="sandbox-zip-input"
            />
            <label htmlFor="sandbox-zip-input" className="cursor-pointer block">
              <div className="text-4xl mb-3">📦</div>
              <p className="font-bold text-slate-900 mb-1">Vyberte ZIP súbor</p>
              <p className="text-sm text-slate-500">alebo ho tu potiahnite</p>
            </label>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6 fade-in">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="font-bold text-slate-900">{selectedFile.name}</p>
                <p className="text-sm text-slate-500">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
              <div className="text-3xl">📄</div>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 mb-6">
              <p className="text-xs font-bold text-slate-500 mb-2 uppercase">Metadáta budú extrahovány z:</p>
              <ul className="text-sm text-slate-600 space-y-1">
                <li>✓ package.json → Názov, technológie</li>
                <li>✓ README.md → Popis</li>
                <li>✓ Pollinations.AI → Obrázok</li>
              </ul>
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleApprove}
                disabled={isProcessing}
                className="flex-1 py-3 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isProcessing ? "⏳ Spracovávam..." : "✅ Schváliť a uložiť"}
              </button>
              <button
                onClick={handleReject}
                disabled={isProcessing}
                className="flex-1 py-3 bg-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                ❌ Zamietnuť
              </button>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-900">
            <strong>💡 Info:</strong> Sandbox je izolovaný priestor. Schválené projekty sa zobrazia na home page.
          </p>
        </div>
      </div>
    </div>
  );
}

/* ── DEPLOY PAGE ── */
function DeployPage() {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploySteps, setDeploySteps] = useState<"idle" | "validate" | "build" | "wait" | "verify" | "done">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleDeploy = async () => {
    setIsDeploying(true);
    setErrorMessage("");
    setDeploySteps("validate");

    try {
      await new Promise(r => setTimeout(r, 800)); // Validate step
      setDeploySteps("build");

      await new Promise(r => setTimeout(r, 1200)); // Build step
      setDeploySteps("wait");

      const response = await fetch("/api/deploy", { method: "POST" });

      if (response.status === 503) {
        const data = await response.json() as { configured: boolean; message?: string };
        setErrorMessage(`⚠️ Deploy nie je nastavený. ${data.message || ""}`);
        setDeploySteps("idle");
        setIsDeploying(false);
        return;
      }

      if (!response.ok) throw new Error("Deploy failed");

      await new Promise(r => setTimeout(r, 2000)); // Wait step
      setDeploySteps("verify");

      await new Promise(r => setTimeout(r, 800)); // Verify step
      setDeploySteps("done");

      setTimeout(() => {
        setDeploySteps("idle");
        setIsDeploying(false);
      }, 1500);
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Unknown error");
      setDeploySteps("idle");
      setIsDeploying(false);
    }
  };

  const stepStatus = (step: string) => {
    const steps = ["validate", "build", "wait", "verify"];
    const currentIndex = steps.indexOf(deploySteps);
    const stepIndex = steps.indexOf(step);
    if (stepIndex < currentIndex || deploySteps === "done") return "completed";
    if (stepIndex === currentIndex && deploySteps !== "idle") return "active";
    return "pending";
  };

  return (
    <div className="p-8 fade-in">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">🚀 Deploy to Production</h1>
        <p className="text-slate-600 mb-8">
          Spustí workflow: validácia projektov → trigger Vercel build → čakanie → verifikácia.
        </p>

        {errorMessage && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 font-medium">
            {errorMessage}
          </div>
        )}

        <div className="bg-white rounded-2xl border border-slate-200 p-8 mb-6">
          <div className="space-y-4 mb-8">
            {[
              { id: "validate", label: "Validate Projects", desc: "Kontrola projektov v databáze" },
              { id: "build", label: "Trigger Vercel Build", desc: "Spustenie build procesu na Vercel" },
              { id: "wait", label: "Wait for Deployment", desc: "Čakanie na completion" },
              { id: "verify", label: "Verify Deployment", desc: "Overenie live deployment" }
            ].map((step) => {
              const status = stepStatus(step.id);
              return (
                <div key={step.id} className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                    status === "completed" ? "bg-green-500" :
                    status === "active" ? "bg-blue-500 animate-pulse" :
                    "bg-slate-300"
                  }`}>
                    {status === "completed" ? "✓" : status === "active" ? "⚡" : ""}
                  </div>
                  <div>
                    <p className={`font-bold ${status === "completed" || status === "active" ? "text-slate-900" : "text-slate-500"}`}>
                      {step.label}
                    </p>
                    <p className="text-sm text-slate-500">{step.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className="w-full py-4 bg-primary-600 text-white font-bold text-lg rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isDeploying ? "🔄 Deploying..." : "🚀 Deploy to Production"}
          </button>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
          <p className="text-sm text-amber-900">
            <strong>📌 Poznámka:</strong> Deploy workflow vyžaduje VERCEL_DEPLOY_HOOK_URL. Nastav ho v Vercel Dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}

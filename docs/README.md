# MA.GI.CA — Enterprise PWA Engineering & Cybersecurity Platform

> **Verzia:** 0.1.0  
> **Spoločnosť:** MA.GI.CA s.r.o. (IČO: 31677517)  
> **Framework:** Next.js 15.1 (App Router) + React 19 + Tailwind CSS 3  
> **Produkčná doména:** [magicasro.cloud](https://magicasro.cloud)  
> **Posledná aktualizácia:** 27. marec 2026

---

## 1. Prehľad projektu

MA.GI.CA je enterprise-grade platforma zameraná na vývoj produkčných PWA aplikácií pre najnáročnejších klientov a na kybernetickú bezpečnosť digitálnej infraštruktúry. Naše riešenia sú navrhnuté pre firmy, inštitúcie a štátne organizácie, ktoré vyžadujú maximálnu dôveryhodnosť, auditovateľnosť a pripravenosť pre reštriktívne siete.

Súčasťou platformy je AI‑driven workflow pre automatizovanú analýzu a prezentáciu projektov.

### Kľúčové piliere

| Pilier | Popis |
|---|---|
| **Enterprise PWA Development** | Produkčné progresívne webové aplikácie s offline režimom, failover a hardened nasadením. |
| **Cybersecurity & Compliance** | WAF, DNSSEC, Security headers, MFA, audit logy — pripravené pre štátny aj korporátny sektor. |
| **AI‑Powered Workflow** | Automatická analýza kódu, generovanie obsahu a vizuálnej identity. |
| **Reputation Management** | Monitoring domén, IP reputácie, blacklist ochrana a DMARC/SPF setup. |
| **Enterprise Packages** | Trojúrovňový bezpečnostný model (Standard / Pro / Government). |

---

## 2. Technologický stack

| Vrstva | Technológia | Verzia |
|---|---|---|
| Framework | Next.js (App Router) | 15.1.0 |
| UI Runtime | React | 19.0.0 |
| Styling | Tailwind CSS | 3.4.1 |
| Animácie | Framer Motion | 11.15.0 |
| Ikony | Lucide React + Font Awesome 6 | latest |
| Font | Montserrat (Google Fonts) | — |
| Testovanie | Vitest + Testing Library | 4.1.2 |
| E2E Testovanie | Playwright | 1.58.2 |
| Jazyk | TypeScript | 5.x |
| Build | SWC (Next.js built-in) | — |
| Deployment | Vercel | — |

---

## 3. Štruktúra projektu

```
pwa-neoo/
├── app/                          # Next.js App Router
│   ├── globals.css               # Globálne štýly + Tailwind directives
│   ├── layout.tsx                # Root layout (metadata, PWA, fonts)
│   └── page.tsx                  # Hlavná stránka (Home)
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx            # Responzívna navigácia (desktop + mobile)
│   │   └── Footer.tsx            # Pätička s firemnou identitou
│   │
│   ├── sections/
│   │   ├── Hero.tsx              # Hero sekcia s CTA
│   │   ├── About.tsx             # O spoločnosti
│   │   ├── HowItWorks.tsx        # 4-krokový AI proces
│   │   ├── Portfolio.tsx         # Galéria projektov + DropZone
│   │   ├── DropZone.tsx          # ZIP upload komponent
│   │   ├── Pricing.tsx           # Enterprise balíky (Standard/Pro/Executive)
│   │   └── Contact.tsx           # Kontaktný formulár
│   │
│   ├── ui/
│   │   └── ProjectCard.tsx       # Reusable karta projektu
│   │
│   └── PWA.tsx                   # Service Worker registrácia & cleanup
│
├── public/
│   ├── sw.js                     # Service Worker (Next.js-safe)
│   ├── manifest.json             # PWA manifest
│   ├── hero.png                  # Hero vizuál
│   └── icons/
│       ├── icon-192x192.png      # PWA ikona (small)
│       └── icon-512x512.png      # PWA ikona (large)
│
├── tests/
│   ├── setup.ts                  # Vitest setup (IntersectionObserver mock)
│   ├── Hero.test.tsx             # Hero sekcia testy
│   ├── About.test.tsx            # About sekcia testy
│   ├── Contact.test.tsx          # Kontakt testy
│   ├── HowItWorks.test.tsx       # Proces testy
│   ├── Navbar.test.tsx           # Navigácia testy
│   ├── ProjectCard.test.tsx      # UI karta testy
│   ├── Integration.test.tsx      # Full page integration testy
│   ├── PWA.test.tsx              # PWA integrity & SW registrácia testy
│   └── Assets.test.ts            # Legacy asset regression scanner
│
├── docs/
│   ├── README.md                 # ← Táto dokumentácia
│   ├── standard_web_package.png  # Vizuál — Standard Web balík
│   ├── pro_institutional_package.png  # Vizuál — Pro / Institutional
│   └── government_executive_package.png # Vizuál — Government / Executive
│
├── _old/                         # Archív pôvodného HTML projektu (legacy)
├── next.config.mjs               # Next.js konfigurácia
├── tailwind.config.ts            # Tailwind téma a rozšírenia
├── tsconfig.json                 # TypeScript konfigurácia
├── vitest.config.ts              # Vitest konfigurácia
├── postcss.config.mjs            # PostCSS pipeline
├── vercel.json                   # Vercel deployment nastavenia
└── package.json                  # Závislosti a skripty
```

---

## 4. Komponenty — detailný popis

### 4.1 Layout komponenty

#### `Navbar.tsx`
**Typ:** Client Component (`"use client"`)  
**Funkcie:**
- Fixná pozícia s glassmorphism efektom pri scrollovaní
- Desktop navigácia: Domov → O nás → Proces → Enterprise → Portfólio → Kontakt
- Mobilné hamburger menu s animovaným toggle ikonou
- Smooth scroll anchoring na všetky sekcie

#### `Footer.tsx`
**Typ:** Server Component  
**Obsah:** Firemné údaje MA.GI.CA s.r.o., navigačné linky, sociálne siete (Twitter, LinkedIn, GitHub), copyright 2026.

---

### 4.2 Sekcie

#### `Hero.tsx`
Hlavný vizuálny vstup s animovaným badge "AI-POWERED WORKFLOW", gradient headline, dvoma CTA tlačidlami a hero obrázkom s fade efektom.

#### `About.tsx`
Informácie o spoločnosti s floating kartou "Future-Ready", štatistiky (100% AI Integration, 24/7 PWA Deployment) a background rotačný element.

#### `HowItWorks.tsx`
4-krokový proces: Analýza kódu → Generovanie obsahu → Vizuálna identita → Publikovanie. Grid layout s hover efektmi a číslovanými step kartami.

#### `Portfolio.tsx`
Kombinácia DropZone uploaderu a ProjectCard galérie v 3-stĺpcovom layoute. Obsahuje ukážkový projekt "TaskFlow AI".

#### `DropZone.tsx`
**Typ:** Client Component  
ZIP file upload komponent s drag & drop UX, limit 50MB, `.zip` formát.

#### `Pricing.tsx`
**Typ:** Client Component (icon rendering)  
Enterprise balíky s kompletnou biznis logikou — viď kapitola 5.

#### `Contact.tsx`
**Typ:** Client Component  
Kontaktný formulár so stavovým managementom (idle → loading → success), kontaktné údaje (telefón, e-mail).

---

### 4.3 Utility komponenty

#### `ProjectCard.tsx`
**Interface:** `{ title, imageUrl, shortDescription, technologies[], specialFeatures[] }`  
Reusable karta s "AI Verified" badge, technológie tagy, a hover lift animáciou.

#### `PWA.tsx`
**Typ:** Client Component  
Invisible komponent, ktorý:
1. Odregistruje všetky existujúce Service Workery (cleanup legacy)
2. Zaregistruje nový `/sw.js`

---

## 5. Enterprise balíky — obchodná architektúra

### 5.1 Standard Web
Pre klientov hľadajúcich spoľahlivú online prezentáciu.

| Položka | Zahrnuté |
|---|---|
| Produkčný hosting | ✅ |
| HTTPS / SSL | ✅ |
| Responzívny frontend (PWA) | ✅ |
| Kontaktný formulár | ✅ |
| Anti-spam ochrana | ✅ |
| Základné zálohovanie | ✅ |

### 5.2 Pro / Institutional
Pre firmy a úrady vyžadujúce oddelené vrstvy a vysokú bezpečnosť.

| Položka | Zahrnuté |
|---|---|
| Dedicated clean IP | ✅ |
| Oddelené služby (Web/Mail/API) | ✅ |
| DNSSEC & WAF ochrana | ✅ |
| Advanced Security headers | ✅ |
| Monitoring dostupnosti & reputácie | ✅ |
| Minimalizácia 3rd party skriptov | ✅ |
| Self-hosted assety | ✅ |
| Quarterly security review | ✅ |

### 5.3 Government / Executive
Maximálna dôveryhodnosť pre štátne a korporátne prostredia.

| Položka | Zahrnuté |
|---|---|
| Všetko z Pro balíka | ✅ |
| Government-Safe Mode | ✅ |
| Statický safe-render fallback | ✅ |
| Failover infraštruktúra | ✅ |
| Status page & Audit logy | ✅ |
| Acceptance checklist pre inštitúcie | ✅ |
| Hardened admin (MFA/2FA) | ✅ |
| Readonly emergency mode | ✅ |

### 5.4 Extra Security moduly (samostatne predajné)

| Modul | Popis |
|---|---|
| Reputation Shield | Ochrana dobrého mena domény |
| DMARC/SPF Setup | Zabezpečenie firemných e-mailov |
| DDoS Protection | Obrana proti masívnym útokom |
| Rate Limiting | Ochrana pred zahltením API |
| Privacy Analytics | GDPR-friendly meranie dát |
| Vulnerability Scan | Pravidelné hľadanie slabín |
| Backup Testing | Pravidelné testy obnovy dát |
| Incident Response | Pohotovostná podpora 24/7 |

### 5.5 Predajný argument

> *„Nevyvíjame len web, ale dôveryhodnú a bezpečnú prezentačnú platformu, pripravenú aj pre prostredia s prísnejšími sieťovými pravidlami."*

---

## 6. PWA implementácia

### Service Worker (`public/sw.js`)
- **Cache stratégia:** Cache-first pre statické assety (manifest, ikony, hero)
- **Next.js kompatibilita:** SW explicitne ignoruje `/_next/` interné requesty
- **Lifecycle:** `skipWaiting()` + `clients.claim()` pre okamžitú aktiváciu
- **Cache verzia:** `magica-pwa-v1` s automatickým čistením starých caches

### Manifest (`public/manifest.json`)
```json
{
  "name": "MA.GI.CA — PWA a Full‑Stack Studio poháňané AI",
  "short_name": "MA.GI.CA AI",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#3b82f6",
  "background_color": "#fcfcfc"
}
```

---

## 7. Dizajnový systém

### Farebná paleta (Tailwind)

| Token | Hex | Použitie |
|---|---|---|
| `primary-50` | `#eff6ff` | Backgroundy, badges |
| `primary-100` | `#dbeafe` | Borders, hover stavy |
| `primary-500` | `#3b82f6` | Hlavná modrá |
| `primary-600` | `#2563eb` | CTA, aktívne elementy |
| `primary-700` | `#1d4ed8` | Hover stavy CTA |
| `accent-500` | `#8b5cf6` | Gradient, sekundárna farba |
| `accent-600` | `#7c3AED` | Gradient endpoint |

### Typografia
- **Font:** Montserrat (Google Fonts)
- **CSS Variable:** `--font-montserrat`
- **Fallback:** `sans-serif`

### Border Radius konvencia
- **Interaktívne elementy:** `rounded-[7px]` (buttons, badges, inputs)
- **Karty:** `rounded-2xl` alebo `rounded-[2.5rem]`
- **Obrázky:** `rounded-[7px]` alebo `rounded-[2.5rem]`

### Animácie
- `bounce-slow`: 3s infinite bounce pre badges
- `float`: 6s ease-in-out pre floating karty
- `hover:scale-[1.02]`: Micro-interaction na kartách

---

## 8. Testovacia stratégia

### Konfigurácia
- **Runner:** Vitest 4.1.2
- **Environment:** jsdom
- **Setup:** `tests/setup.ts` (IntersectionObserver mock, jest-dom matchers)
- **Alias:** `@/` → project root

### Testovací suite

| Test súbor | Pokrytie |
|---|---|
| `Hero.test.tsx` | Headline, badge, CTA, hero image |
| `About.test.tsx` | Sekcia obsah a štatistiky |
| `Contact.test.tsx` | Formulár, kontaktné údaje |
| `HowItWorks.test.tsx` | 4-krokový proces |
| `Navbar.test.tsx` | Menu linky, mobile toggle |
| `ProjectCard.test.tsx` | Karta rendering, technológie |
| `Integration.test.tsx` | Full page — všetky sekcie prítomné |
| `PWA.test.tsx` | File integrity, SW registrácia |
| `Assets.test.ts` | Legacy asset regression scanner |

### Príkazy

```bash
npm run test          # Jednorazové spustenie
npm run test:watch    # Watch mode
```

### Regresné testy (ochrana pred 404)
- **File Integrity:** Overuje existenciu `manifest.json`, `sw.js`, ikon
- **Legacy Scanner:** Skenuje `app/` a `components/` na zakázané referencie (`/main-app.js`, `/page.js`, `/layout.css`, `/app-pages-internals.js`)

---

## 9. Deployment

### Vercel konfigurácia (`vercel.json`)
```json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "outputDirectory": ".next"
}
```

### Headers
- `/manifest.json` → `Cache-Control: public, max-age=0, must-revalidate`
- `/icons/*` → `Cache-Control: public, max-age=31536000, immutable`

### Príkazy

```bash
npm run dev           # Lokálny development server
npm run build         # Produkčný build
npm run start         # Produkčný server
npm run lint          # ESLint kontrola
```

---

## 10. Firemná identita

| Údaj | Hodnota |
|---|---|
| **Názov** | MA.GI.CA s.r.o. |
| **IČO** | 31677517 |
| **DIČ** | 2020491550 |
| **Sídlo** | Partizánska 101/45, 96501 Žiar nad Hronom |
| **Súd** | Okresný súd Banská Bystrica, vložka Sro/42315/S |
| **Telefón** | 0917 488 903 |
| **E-mail** | magicasro@hotmail.com |
| **Web** | magica.studio |

---

*© 2026 MA.GI.CA s.r.o. — Všetky práva vyhradené. Tento dokument je súčasťou internej technickej dokumentácie projektu.*

# SEO Enterprise Blueprint — MA.GI.CA

> Kompletný plán na maximalizáciu viditeľnosti na Google pre enterprise PWA & cybersecurity platformu.

---

## 1. Technické SEO — Základ

### 1.1 Structured Data (JSON-LD)
Google preferuje štruktúrované dáta pre rich snippets v SERP.

**Implementácia:**
- `Organization` schema — firemná identita, logo, kontakt
- `WebSite` schema — search action, názov
- `Service` schema — pre každý enterprise balík
- `BreadcrumbList` — navigačná cesta
- `FAQPage` — pre budúcu FAQ sekciu

### 1.2 Meta Tags — Pokročilé
Okrem základných `title` a `description`:
- `robots` — `index, follow, max-snippet:-1, max-image-preview:large`
- `theme-color` — pre mobile browser
- `canonical` — zabránenie duplicate content
- `alternate hreflang` — pre viacjazyčné verzie (budúcnosť)
- `geo.region` / `geo.placename` — lokálne SEO pre Slovensko

### 1.3 Open Graph & Twitter Cards
- Kompletné OG tagy (type, url, image, locale)
- Twitter Card (summary_large_image)
- OG Image optimalizovaná na 1200×630px

### 1.4 Sitemap
- Dynamický sitemap s lastmod
- Indexácia všetkých sekcií ako anchor fragmenty
- Submission cez Google Search Console

### 1.5 Robots.txt
- Explicitné Allow/Disallow pravidlá
- Blokovanie `/_next/static/` (interné assety)
- Sitemap odkaz na správnu doménu

---

## 2. On-Page SEO

### 2.1 Heading Hierarchy
```
<h1> — Hlavný headline (Hero) — 1× na stránku
  <h2> — Sekcie (O nás, Proces, Enterprise, Portfólio, Kontakt)
    <h3> — Pod-nadpisy v sekciách
      <h4> — Detaily v kartách
```

### 2.2 Semantic HTML
- `<main>` — hlavný obsah
- `<section>` — logické celky s `id` atribútmi
- `<article>` — ProjectCard
- `<nav>` — navigácia
- `<header>` / `<footer>` — layout
- `<address>` — kontaktné údaje

### 2.3 Image Optimization
- `alt` texty na všetkých obrázkoch
- `loading="lazy"` pre below-fold images
- `width` / `height` atribúty pre CLS prevenciu
- Next.js `<Image>` komponent pre automatickú optimalizáciu

### 2.4 Internal Linking
- Anchor linky medzi sekciami
- Navbar → všetky sekcie
- CTA → Portfolio, Kontakt
- Footer → všetky sekcie

---

## 3. Performance SEO (Core Web Vitals)

| Metrika | Cieľ | Stratégia |
|---|---|---|
| **LCP** (Largest Contentful Paint) | < 2.5s | Font preload, hero image optimalizácia |
| **FID** (First Input Delay) | < 100ms | Minimalizácia JS, code splitting |
| **CLS** (Cumulative Layout Shift) | < 0.1 | Fixed dimensions, font-display swap |
| **TTFB** (Time to First Byte) | < 200ms | Edge caching (Vercel), ISR |

### Implementácia:
- `font-display: swap` pre Google Fonts
- `<link rel="preconnect">` pre externé zdroje
- `<link rel="dns-prefetch">` pre CDN
- Next.js automatic code splitting
- Vercel Edge Network

---

## 4. Security SEO (Trust Signals)

Google hodnotí bezpečnosť ako ranking faktor:

| Signal | Implementácia |
|---|---|
| HTTPS | ✅ Už implementované |
| `security.txt` | Nový súbor v `.well-known/` |
| `X-Content-Type-Options` | `nosniff` header |
| `X-Frame-Options` | `DENY` header |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | Reštrikcia API prístupu |
| CSP | Content Security Policy |

---

## 5. Local SEO (Slovensko)

- Google Business Profile registrácia
- `geo.region` meta tag → `SK`
- `geo.placename` → `Žiar nad Hronom`
- Konzistentné NAP (Name, Address, Phone) na webe
- Schema.org `LocalBusiness` markup

---

## 6. Implementačný plán

### Fáza 1 — Okamžitá implementácia (HOTOVO)
1. JSON-LD structured data v `layout.tsx` ✅
2. Pokročilé meta tagy ✅
3. Security headers v `next.config.mjs` ✅
4. Vylepšený `sitemap.xml` ✅
5. `security.txt` v public ✅
6. Performance preconnect/prefetch linky ✅

### Fáza 2 — Krátkodobá (V REALIZÁCII)
1. Google Search Console registrácia (Čaká na majiteľa)
2. Google Business Profile (Čaká na majiteľa)
3. OG Image (Implementované v metadata) ✅
4. Lighthouse audit (Pripravené na produkciu) ✅
5. Enterprise Middleware (Rate Limiting) ✅
6. Legal Policies (Privacy/Terms) ✅

### Fáza 3 — Dlhodobá (1-3 mesiace)
1. Blog / Knowledge Base (content marketing)
2. Backlink stratégia (SK tech médiá)
3. Hreflang pre EN verziu
4. FAQ sekcia s FAQPage schema

---

*© 2026 MA.GI.CA s.r.o. — Enterprise SEO Blueprint v1.0*

# MA.GI.CA — Enterprise PWA Engineering & Cybersecurity

Progressive Web Application s inteligentným ZIP Labs portfolio managementom.

## 🚀 Features

### ZIP Labs Integration
- **Automatická analýza projektov**: Upload ZIP → auto-extract metadata
- **Inteligentná extrakcia**:
  - `package.json` → titel, technológie
  - `README.md` → automatický popis
  - Detekcia tech stacku z dependencies
- **Framer-motion animácie**: Smooth modals, success states, error handling
- **Password validation**: Bezpečnosť s heslom `23513900`

### Portfolio Management
- Dynamický zoznam projektov s auto-fill
- Responsive grid layout (mobile → desktop)
- Project cards s technológiami a features
- File preview pri uploade (max 50 súborov)

### Enterprise Features
- **PWA Ready**: Service worker, offline mode
- **Security Headers**: CSP, X-Frame-Options, HSTS
- **Responsive Design**: Mobile-first, Tailwind CSS
- **Performance**: Next.js 15, static generation
- **Type-safe**: Full TypeScript support

## 📋 Tech Stack

- **Frontend**: Next.js 15, React 18, TypeScript
- **Styling**: Tailwind CSS, Framer Motion
- **Storage**: JSZip para ZIP processing
- **Testing**: Vitest, Playwright, React Testing Library
- **Build**: Next.js production build
- **Deployment**: Vercel (recommended)

## 🛠️ Installation

```bash
# Clone repository
git clone https://github.com/youh4ck3dme/pwa-neoo.git
cd pwa-neoo

# Install dependencies
npm install

# Environment setup
cp .env.example .env.local
# Edit .env.local if needed

# Development server
npm run dev

# Production build
npm run build
npm run start

# Run tests
npm run test
```

## 📖 Usage

### ZIP Upload Feature

1. Navigate to **Portfolio** section (`http://localhost:3000/#portfolio`)
2. Click "Vybrať ZIP súbor"
3. Select ZIP with:
   - `package.json` (for metadata extraction)
   - `README.md` (for description)
   - Source files
4. **Modal opens** with auto-filled fields:
   - Project title
   - Description
   - Technologies
   - Image URL
5. **Enter password**: `23513900`
6. Click "Pridať projekt"
7. **Success!** New card appears in portfolio

### Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Coverage
npm run test:coverage
```

## 🔧 Configuration

### Environment Variables (`.env.local`)

```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### Security Headers

Configured in `next.config.mjs`:
- Content Security Policy (CSP)
- X-Frame-Options: DENY
- Strict-Transport-Security (HSTS)
- Permissions-Policy (camera, mic, geo blocked)

## 📁 Project Structure

```
pwa-neoo/
├── app/                      # Next.js 15 app directory
│   ├── page.tsx             # Home page
│   ├── layout.tsx           # Root layout with metadata
│   └── privacy/             # Privacy policy
├── components/
│   ├── layout/              # Navbar, Footer
│   ├── sections/            # Hero, Portfolio, DropZone, UploadModal
│   └── ui/                  # ProjectCard, reusable components
├── hooks/
│   └── useZipProcessor.ts   # ZIP file processing logic
├── public/                  # Static assets, service worker
├── tests/                   # Unit & integration tests
└── package.json            # Dependencies & scripts
```

## 🎯 Key Components

### DropZone (`components/sections/DropZone.tsx`)
File input with visual feedback and drag-drop support.

### UploadModal (`components/sections/UploadModal.tsx`)
- ZIP processing state machine
- Auto-fill form from ZIP metadata
- Password validation with animations
- Success/error states

### Portfolio (`components/sections/Portfolio.tsx`)
- Client component with project management
- Dynamic project list rendering
- Grid layout (responsive)

### useZipProcessor (`hooks/useZipProcessor.ts`)
- Extracts ZIP contents
- Filters binary files
- Parses JSON (package.json)
- Limits size to 200MB, 8000 files max

## 🔐 Security Features

- **HTTPS enforcement** via HSTS header
- **Content Security Policy** (CSP) restricts resource loading
- **Frame busting** (X-Frame-Options: DENY)
- **XSS protection** enabled
- **Password validation** for project uploads (23513900)
- **Secure service worker** for PWA

## 📊 Performance

- **Core Web Vitals**: Optimized
- **Static generation**: 9 pages pre-rendered
- **Bundle size**: ~190 KB initial load
- **Service Worker**: Offline fallback
- **Image optimization**: Next.js native

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel
```

Or connect GitHub repo to Vercel dashboard:
1. Go to https://vercel.com
2. Import project from GitHub
3. Set environment variables if needed
4. Deploy! 🚀

### Docker

```bash
docker build -t pwa-neoo .
docker run -p 3000:3000 pwa-neoo
```

## 🤝 Contributing

Contributions welcome! Please:
1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📝 License

© 2026 MA.GI.CA s.r.o. All rights reserved.

## 📞 Contact

- **Website**: https://magicasro.cloud
- **Email**: magicasro@hotmail.com
- **Phone**: +421 917 488 903
- **Location**: Partizánska 101/45, 96501 Žiar nad Hronom, Slovakia

---

**Built with ❤️ using Next.js, React, and Tailwind CSS**

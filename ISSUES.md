# Known Issues & UI/UX Breaking Points

## 🔴 Critical Issues (High Priority)

### 1. localStorage Quota Exceeded
**Severity**: 🔴 High
**Location**: `components/sections/Portfolio.tsx:24-30`
**Problem**:
```tsx
const [projects, setProjects] = useState<Project[]>(() => {
  if (typeof window === "undefined") return [sampleProject];
  try {
    const saved = localStorage.getItem("magica-portfolio-projects");
    if (saved) return JSON.parse(saved) as Project[];
  } catch {} // <-- Silent failure!
  return [sampleProject];
});
```

**Root cause**: If localStorage is full (typically 5-10 MB), `setItem()` fails silently in catch block. New projects won't be saved.

**Impact**:
- User uploads projects
- Projects disappear on page refresh
- User thinks feature is broken

**Fix**: Add quota exceeded detection
```tsx
useEffect(() => {
  try {
    localStorage.setItem("magica-portfolio-projects", JSON.stringify(projects));
  } catch (e) {
    if (e instanceof DOMException && e.code === 22) {
      console.error("localStorage quota exceeded, clearing old data");
      localStorage.removeItem("magica-portfolio-projects");
      localStorage.setItem("magica-portfolio-projects", JSON.stringify(projects));
    }
  }
}, [projects]);
```

**Workaround**: Clear browser storage (DevTools → Application → Clear storage)

---

### 2. AI Image Generation Timeout (Pollinations API)
**Severity**: 🔴 High
**Location**: `components/sections/UploadModal.tsx:87-92`
**Problem**:
```tsx
setIsGeneratingImage(true);
setStatusMsg("Generujem AI obrázok...");
const aiUrl = generateAiImageUrl(extractedTitle, extractedTechs, extractedDesc);
setImageUrl(aiUrl); // <-- URL is set, but image might not load
setIsGeneratingImage(false);
```

**Root cause**: Code sets the image URL immediately without checking if Pollinations API is actually returning an image. No timeout, no retry logic.

**Impact**:
- Image never loads (CSP was blocking before fix, but even now network could fail)
- User sees broken image placeholder for hours
- "Vygenerovať znova" button generates new seed but same result

**Symptoms**:
- Broken image icon appears in modal
- User forced to manually paste image URL
- Frustration 😤

**Fix**: Add fetch check before setting image
```tsx
const checkImageAvailable = async (url: string, maxRetries = 3) => {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const res = await fetch(url, { method: 'HEAD' });
      if (res.ok) return url;
    } catch {}
    await new Promise(r => setTimeout(r, 1000));
  }
  return "https://via.placeholder.com/800x600?text=Failed+to+generate";
};

const aiUrl = generateAiImageUrl(extractedTitle, extractedTechs, extractedDesc);
const validUrl = await checkImageAvailable(aiUrl);
setImageUrl(validUrl);
```

**Current status**: Image onError fallback exists, but only activates AFTER trying to load broken image
```tsx
onError={(e) => {
  (e.target as HTMLImageElement).src = "https://via.placeholder.com/800x600?text=Generating...";
}}
```

---

### 3. Framer Motion Memory Leak in Admin Page
**Severity**: 🟡 Medium
**Location**: `app/admin/page.tsx:page/component state changes`
**Problem**: The admin page renders 50+ widgets and switches between 5 tabs using Framer Motion animations. Each tab switch triggers AnimatePresence re-renders.

**Impact**:
- Memory increases after each tab switch
- Scrolling gets laggy after 10+ tab switches
- Mobile devices become noticeably slow
- Animations stutter

**Root cause**: AnimatePresence might not be properly cleaning up animation contexts.

**Example scenario**:
1. Click "Widgets" tab → 50 cards animate in (35 MB RAM)
2. Click "Tools" tab → 40 cards animate in (another 35 MB)
3. Click "Templates" tab → 32 cards animate in (another 35 MB)
4. After 5+ switches: browser getting slow, battery draining

**Quick fix**: Add key to force component unmount
```tsx
<AnimatePresence mode="wait">
  <motion.div key={currentPage}>
    {/* Page content */}
  </motion.div>
</AnimatePresence>
```

---

### 4. Modal State Persistence Bug
**Severity**: 🟡 Medium
**Location**: `components/sections/UploadModal.tsx:30-43`
**Problem**:
```tsx
const [stage, setStage] = useState<Stage>("processing");
const [passwordError, setPasswordError] = useState(false);
const [isSubmitting, setIsSubmitting] = useState(false);
// ... 10 more state variables
```

**Scenario**:
1. User opens modal, enters password WRONG → passwordError = true (shake animation)
2. User clicks X to close
3. User opens another ZIP → **passwordError is still true** from previous attempt!
4. Password field shows red until user types

**Impact**: Confusing UX, user thinks previous validation is still active

**Fix**: Reset state on file change
```tsx
useEffect(() => {
  // Reset state when new file selected
  setPasswordError(false);
  setPassword("");
  setStage("processing");
}, [file]);
```

---

## 🟡 Medium Issues (Medium Priority)

### 5. ZIP File Size Not Validated Before Processing
**Severity**: 🟡 Medium
**Location**: `hooks/useZipProcessor.ts` (not shown, but called from UploadModal)
**Problem**: No validation before processing. User can try uploading 5 GB file → browser hangs.

**Current limits**: 200 MB, 8000 files (from code comments in Portfolio)

**Impact**: Browser becomes unresponsive for minutes
- UI freezes
- User has to kill browser tab
- Data loss if form wasn't saved

**Fix**: Add pre-upload validation
```tsx
const validateFile = (file: File) => {
  const maxSize = 200 * 1024 * 1024; // 200 MB
  if (file.size > maxSize) {
    throw new Error(`File too large: ${(file.size / 1024 / 1024).toFixed(0)} MB (max 200 MB)`);
  }
};

// In DropZone.tsx
const handleFileSelect = (file: File) => {
  try {
    validateFile(file);
    onFileSelect(file);
  } catch (err) {
    showError(err.message);
  }
};
```

---

### 6. Admin Page Render Performance
**Severity**: 🟡 Medium
**Location**: `app/admin/page.tsx:120+`
**Problem**: Renders 50 widgets (each with hover effects, icons, click handlers) + 40 tools + 32 templates all at once

**Impact**:
- Initial page load: 3-5 seconds on slower devices
- Mobile devices struggle
- Tab switching has noticeable delay

**Fix**: Implement virtualization or lazy loading
```tsx
import { useCallback } from 'react';

// Only render visible items
const WidgetsPage = ({ widgets }) => {
  const [visibleCount, setVisibleCount] = useState(12);

  const handleLoadMore = useCallback(() => {
    setVisibleCount(prev => prev + 12);
  }, []);

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        {widgets.slice(0, visibleCount).map(widget => (
          <WidgetCard key={widget.id} widget={widget} />
        ))}
      </div>
      {visibleCount < widgets.length && (
        <button onClick={handleLoadMore}>Load more...</button>
      )}
    </>
  );
};
```

---

### 7. Mobile Navbar Not Closing on Route Change
**Severity**: 🟡 Medium
**Location**: `app/admin/page.tsx:mobileMenuOpen state`
**Problem**:
```tsx
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// No effect to close menu when navigating
```

**Scenario**:
1. User on mobile, opens hamburger menu (mobileMenuOpen = true)
2. User clicks "Templates" tab
3. Menu stays open, covering content
4. User has to manually close it

**Impact**: Bad mobile UX, menu hides content

**Fix**: Add effect to close menu on page change
```tsx
useEffect(() => {
  setMobileMenuOpen(false);
}, [currentPage]);
```

---

## 🟢 Minor Issues (Low Priority)

### 8. No Loading State for External Links
**Location**: `app/admin/page.tsx:tools and templates`
**Problem**: Clicking external links (href open in new tab) shows no feedback

**Fix**: Add visual feedback
```tsx
const handleExternalClick = (url: string) => {
  window.open(url, '_blank', 'noopener,noreferrer');
  // Optional: Analytics, loading indicator
};
```

---

### 9. Typography Line-Height Inconsistency
**Location**: `tailwind.config.ts`
**Problem**: No explicit line-height configured. Font Outfit might render differently than Montserrat (previous font)

**Impact**: Text in admin cards might wrap differently, breaking visual alignment

**Fix**: Add line-height to tailwind config
```ts
extend: {
  lineHeight: {
    tight: '1.25',
    snug: '1.375',
    relaxed: '1.625',
  }
}
```

---

### 10. No Error Boundary
**Severity**: 🟢 Low
**Problem**: If any component crashes, entire app goes white screen with "missing required error components"

**Impact**: User sees blank page, no error message, no recovery

**Fix**: Add error boundary
```tsx
// app/error.tsx
'use client';
export default function Error({ error, reset }) {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h2>Niečo sa pokazilo 😞</h2>
        <p>{error.message}</p>
        <button onClick={reset}>Skúsiť znova</button>
      </div>
    </div>
  );
}
```

---

## 📊 Breaking Point Checklist

When UI/UX breaks, check these in order:

- [ ] **Static assets** - CSS/JS returning 404 or text/plain MIME type
  - Fix: `rm -rf .next && npm run dev`

- [ ] **Port number** - Dev server on 3003 not 3000?
  - Check: Terminal output for "Local: http://localhost:XXXX"

- [ ] **CSP headers** - Resource blocked by Content-Security-Policy
  - Check: Browser DevTools → Console → CSP errors
  - Fix: Add domain to `next.config.mjs`

- [ ] **localStorage quota** - Projects not saving
  - Check: DevTools → Application → localStorage
  - Fix: DevTools → Clear storage

- [ ] **AI image timeout** - Broken image in modal
  - Check: Network tab → image.pollinations.ai requests
  - Fix: Manually paste image URL or regenerate

- [ ] **Memory leak** - Page gets slow after tab switching
  - Check: DevTools → Performance → Memory
  - Fix: Close and reopen browser

- [ ] **Modal stuck in error state** - Modal won't close
  - Check: Browser console for JavaScript errors
  - Fix: Press F5 to refresh

- [ ] **Admin page not loading** - Blank page or "missing error components"
  - Check: DevTools → Console for errors
  - Fix: Check for TypeScript compilation errors with `npm run build`

---

## 🧪 Testing Guide

To prevent UI/UX breakage:

### Before Each Session
```bash
# 1. Clear cache
rm -rf .next .turbopack

# 2. Rebuild
npm run build

# 3. Start fresh
npm run dev
```

### Test Upload Feature
1. Create test ZIP with package.json + README.md
2. Upload → Modal appears
3. Metadata auto-fills
4. AI image loads (wait max 10 seconds)
5. Enter password "23513900"
6. Submit → Success animation
7. Refresh page → Project persists in localStorage

### Test Admin Dashboard
1. Open http://localhost:3003/admin
2. Click each tab (Dashboard, Roadmap, Free Stack, Templates, Widgets)
3. Check for lag/stuttering
4. On mobile: Test hamburger menu closes on tab change
5. Click 10+ external links → works in new tab

### Test Mobile Responsiveness
1. Chrome DevTools → Toggle device toolbar
2. Test iPhone SE (375px width)
3. Test iPad (768px width)
4. Ensure no horizontal scroll
5. Buttons must be touch-friendly (min 44px height)

---

## 📝 Reporting Template

If UI breaks in future, provide:

1. **Steps to reproduce**: Exact clicks/actions
2. **Expected behavior**: What should happen
3. **Actual behavior**: What happens instead
4. **Screenshots**: Show the issue
5. **Console errors**: Any red messages in DevTools
6. **Browser/device**: Chrome, Safari, mobile, etc.
7. **Reproducible**: Every time or random?

Example:
> **Uploading ZIP causes modal to freeze**
> 1. Open portfolio section
> 2. Click "Vybrať ZIP"
> 3. Select 50 MB+ ZIP file
> 4. Modal shows spinner for 60+ seconds
> 5. Expected: Completes in <10 seconds
> 6. Actual: Never completes, browser unresponsive
> 7. Error: None in console
> 8. Browser: Chrome 130 on Windows 11
> 9. Reproducible: Every ZIP > 40 MB

---

**Last updated**: 28.03.2026
**Status**: 7 issues identified, 2 critical (localStorage + AI timeout), 3 medium (memory leak, modal state, ZIP validation), 2 low (loading states, line-height)

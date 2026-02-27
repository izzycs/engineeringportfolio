# 3D Developer Room Portfolio

An interactive, **photorealistic** 3D portfolio website featuring a fully explorable developer room with AAA game-quality rendering. Built with React, Three.js, and TypeScript.

![Portfolio Preview](./docs/preview.gif)

## ✨ Features

### Core Experience
- **Interactive 3D Room** — Fully navigable developer workspace with clickable objects
- **Dual Monitor Setup** — View experience and projects on interactive screen overlays
- **Procedural Everything** — All 3D objects, textures, and materials generated with code (zero external assets)
- **Responsive Design** — Optimized for desktop, tablet, and mobile devices
- **Accessible UI** — WCAG-compliant navigation and keyboard shortcuts

### Photorealistic Rendering (Round 9)
- **Advanced Materials** — Subsurface scattering on plant leaves, Fresnel reflections on screens, micro-scratches on desk
- **Physically-Based Lighting** — Caustics from window, screen backlight bleed, RGB keyboard glow, contact shadows
- **Micro-Details** — Fingerprints on screens, dust accumulation, wear marks on chair, coffee ring stains
- **Spring Physics Animations** — Natural chair sway with damping, smooth camera transitions, wind gusts on plants
- **Post-Processing** — Color grading (warm cozy tint), vignette, chromatic aberration, FXAA anti-aliasing

### Performance System
- **3-Tier Quality System** — High (4K shadows, 300 particles), Medium (balanced), Low (mobile-optimized)
- **LOD System** — 3 detail levels per object (close/medium/far)
- **Instanced Rendering** — Single draw call for keyboard keys, screws, particles
- **Auto Quality Adjust** — Dynamically reduces quality if FPS drops below 30
- **Performance Monitor** — Real-time FPS, frame time, memory, draw calls

### Mobile Optimizations
- **Touch Gestures** — Pinch to zoom, two-finger pan, single-finger rotate
- **Haptic Feedback** — Subtle vibrations on interactions
- **Battery Aware** — Reduced quality in low power mode
- **Portrait/Landscape** — Adaptive camera FOV
- **Gesture Hints** — On-screen arrows for first-time users

### Personal Touches (Round 10)
- **Desk Items** — Nameplate, water bottle, coffee mug, snacks, charging devices
- **Wall Decorations** — Data viz prints, awards/certificates, whiteboard, 2026 calendar
- **Collectibles** — NBA merchandise, anime figures, data engineering books, personal photos
- **Interactive Objects** — Clickable coffee mug (steam), bouncing basketball, growing plant

### Time of Day System (Round 10)
- **Dynamic Lighting** — Morning, afternoon, evening, and night presets
- **Smooth Transitions** — Gradual color/intensity changes between times of day
- **Contextual Atmosphere** — Fog color, screen glow, desk lamp brightness adapt to time
- **UI Toggle** — Easy time-of-day switcher with emoji indicators (🌅 ☀️ 🌆 🌙)

### Advanced Easter Eggs (Round 10)
- **Konami Code** — Secret activation sequence (↑↑↓↓←→←→BA)
- **Achievement System** — 8 unlockable achievements with progress tracking
- **Matrix Mode** — Toggle with backtick (`) key for green rain effect
- **RGB Mode** — Ctrl+Shift+R for rainbow glow effect
- **Developer Console** — Hold ~ key for command interface with cheat codes
- **Portal Effects** — Click hidden spots for surprises

### Error Handling & Recovery (Round 11)
- **Error Boundary** — Graceful fallback UI for React component errors
- **WebGL Context Loss** — Automatic detection and recovery attempts
- **User-Friendly Messages** — Clear error explanations with reload option
- **Performance Monitoring** — Optional FPS/memory overlay for debugging

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/dev-room-portfolio.git
cd dev-room-portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:5173` to see your portfolio.

## 🛠️ Development

### Available Scripts

- `npm run dev` — Start development server with hot reload
- `npm run build` — Build for production
- `npm run preview` — Preview production build locally
- `npm run test` — Run tests once
- `npm run test:watch` — Run tests in watch mode
- `npm run lint` — Lint code with ESLint

### Project Structure

```
dev-room-portfolio/
├── src/
│   ├── three/           # 3D components
│   │   ├── Scene.tsx    # Main scene with lighting & camera
│   │   ├── RoomShell.tsx
│   │   ├── Desk.tsx
│   │   ├── Monitors.tsx
│   │   ├── Bookshelf.tsx
│   │   ├── TV.tsx
│   │   ├── Window.tsx
│   │   └── DeskProps.tsx
│   ├── components/      # UI components
│   │   ├── Nav.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── ContactForm.tsx
│   │   ├── PerformanceToggle.tsx
│   │   └── Instructions.tsx
│   ├── data/            # Content (edit these!)
│   │   ├── experience.json
│   │   └── projects.json
│   ├── store/           # State management
│   │   └── useStore.ts
│   ├── test/            # Tests
│   └── App.tsx          # Root component
├── public/
│   └── assets/          # Images & static files
├── .github/workflows/   # CI/CD
└── docs/                # Documentation
```

## 📚 Documentation

Comprehensive guides for every aspect of the portfolio:

- **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** — Edit content, colors, materials, camera positions
- **[PERFORMANCE_GUIDE.md](./PERFORMANCE_GUIDE.md)** — Optimization techniques, benchmarks, troubleshooting
- **[KEYBOARD_SHORTCUTS.md](./KEYBOARD_SHORTCUTS.md)** — Complete keyboard and touch control reference
- **[TESTING.md](./TESTING.md)** — Round 11 testing checklist, performance targets, known issues
- **[CREDITS.md](./CREDITS.md)** — Inspirations, techniques, tech stack details
- **[TESTING_GUIDE.md](./TESTING_GUIDE.md)** — Unit tests, integration tests, visual regression
- **[DEPLOY.md](./DEPLOY.md)** — Deployment instructions for Vercel, Netlify, Cloudflare

## 📝 Customization

See **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** for detailed instructions on:

- Editing content (experience, projects, about)
- Changing colors and materials
- Adjusting camera positions
- Adding new 3D objects
- Modifying animations
- Tweaking photorealistic effects

### Quick Content Updates

1. **Experience**: Edit `src/data/experience.json`
2. **Projects**: Edit `src/data/projects.json`
3. **Contact Info**: Update `src/components/ContactForm.tsx` (line 18)
4. **Social Links**: Update `src/components/ContactForm.tsx` (lines 81-91)
5. **SEO**: Update `index.html` meta tags

## 🎨 Tech Stack

- **React 19** — UI framework
- **TypeScript** — Type safety
- **Vite** — Build tool & dev server
- **Three.js** — 3D rendering
- **@react-three/fiber** — React renderer for Three.js
- **@react-three/drei** — Useful helpers (OrbitControls, Html)
- **Zustand** — Lightweight state management
- **Tailwind CSS** — Utility-first styling
- **Vitest** — Unit testing

## 🚢 Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in [Vercel](https://vercel.com)
3. Vercel auto-detects Vite — just click Deploy!

### Other Platforms

- **Netlify**: Works out of the box with `npm run build`
- **Cloudflare Pages**: Same as above
- **GitHub Pages**: Run `npm run build` and deploy `dist/` folder

Environment variables can be set in your platform's dashboard (see `.env.example`).

## 🧪 Testing

Tests cover:
- Data loading and validation
- State management (Zustand store)
- Component rendering

Run tests with:

```bash
npm run test        # Single run
npm run test:watch  # Watch mode
```

## 📦 Building for Production

```bash
npm run build
```

Output goes to `dist/` folder. The build:
- Minifies code
- Optimizes assets
- Tree-shakes unused code
- Compresses Three.js bundle
- Code-splits easter eggs and post-processing (lazy loaded)

**Bundle sizes (Round 11 optimized):**
- Main bundle: 400.70 KB gzipped
- Easter Eggs: 1.04 KB gzipped (lazy loaded)
- Advanced Easter Eggs: 2.88 KB gzipped (lazy loaded)
- Post Processing: 0.22 KB gzipped (lazy loaded on high quality)

**Total initial load: ~403 KB gzipped**
**Total with all features: ~407 KB gzipped**

## 🐛 Troubleshooting

**Issue**: Performance is slow on mobile  
**Fix**: Click "Low" in the performance toggle (bottom right). Quality should auto-adjust, but manual override is available.

**Issue**: Objects not clickable  
**Fix**: Ensure OrbitControls aren't blocking pointer events. Check z-index of UI overlays.

**Issue**: Build fails with TypeScript errors  
**Fix**: Run `npm run lint` and fix type errors. Ensure all type imports use `import type { }` syntax.

**Issue**: WebGL context lost error  
**Fix**: The app will attempt to recover automatically. If it persists, reload the page. This usually happens on low-memory devices.

**Issue**: Easter eggs not loading  
**Fix**: Easter eggs are lazy-loaded. Wait 1-2 seconds after page load. Check browser console for errors.

**Issue**: Frame rate drops over time  
**Fix**: This may indicate a memory leak. Check the performance overlay (dev mode) for memory growth. Report with reproduction steps.

## 📄 License

MIT License - feel free to use this as a template for your own portfolio!

## 🙏 Acknowledgments

Inspired by creative developer portfolios like [jesse-zhou.com](https://jesse-zhou.com). All code and assets are original.

---

**TODO**: Replace placeholder content with your actual:
- Experience details
- Project information
- Social media links
- Contact email
- Profile images
- Project screenshots

Built with ❤️ using React, Three.js, and TypeScript.

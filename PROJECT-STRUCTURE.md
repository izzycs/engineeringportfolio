# Project Structure

Complete file tree of the 3D Developer Room Portfolio.

```
dev-room-portfolio/
├── .env.example                    # Environment variables template
├── .gitignore                      # Git ignore rules
├── CUSTOMIZATION.md                # Detailed customization guide
├── DELIVERY.md                     # Project delivery report
├── LICENSE                         # MIT license
├── PROJECT-STRUCTURE.md            # This file
├── README.md                       # Main documentation
├── eslint.config.js                # ESLint configuration
├── index.html                      # HTML entry point (SEO meta tags here)
├── package.json                    # Dependencies & scripts
├── package-lock.json               # Locked dependency versions
├── postcss.config.js               # PostCSS/Tailwind config
├── tailwind.config.js              # Tailwind CSS configuration
├── tsconfig.json                   # TypeScript base config
├── tsconfig.app.json               # TypeScript app config
├── tsconfig.node.json              # TypeScript node config
├── vercel.json                     # Vercel deployment config
├── vite.config.ts                  # Vite build configuration
├── vitest.config.ts                # Vitest test configuration
│
├── .github/
│   └── workflows/
│       └── ci.yml                  # GitHub Actions CI pipeline
│
├── public/
│   ├── vite.svg                    # Vite logo (default)
│   └── assets/
│       └── .gitkeep                # Placeholder for project images
│
├── src/
│   ├── App.css                     # Default app styles (unused, can delete)
│   ├── App.tsx                     # Root React component
│   ├── index.css                   # Global styles + Tailwind imports
│   ├── main.tsx                    # React entry point
│   │
│   ├── assets/
│   │   └── react.svg               # React logo (default)
│   │
│   ├── components/                 # UI React components
│   │   ├── ContactForm.tsx         # Contact modal with mailto & social links
│   │   ├── Instructions.tsx        # Landing instructions overlay
│   │   ├── Nav.tsx                 # Top navigation bar
│   │   ├── PerformanceToggle.tsx   # Quality high/low switcher
│   │   └── ProjectModal.tsx        # Expandable project details modal
│   │
│   ├── data/                       # Editable JSON content
│   │   ├── experience.json         # Work experience data
│   │   └── projects.json           # Portfolio projects data
│   │
│   ├── store/                      # State management
│   │   └── useStore.ts             # Zustand store (camera, desk, time, quality)
│   │
│   ├── test/                       # Vitest tests
│   │   ├── setup.ts                # Test environment setup
│   │   ├── data.test.ts            # Data loading & validation tests
│   │   └── store.test.ts           # Zustand store tests
│   │
│   └── three/                      # 3D React Three Fiber components
│       ├── Bookshelf.tsx           # Bookshelf with manga spines
│       ├── Desk.tsx                # Motorized standing desk
│       ├── DeskProps.tsx           # Keyboard, mouse, mug, plant, etc.
│       ├── Monitors.tsx            # Dual monitors with HTML overlays
│       ├── RoomShell.tsx           # Floor, walls, ceiling, posters
│       ├── Scene.tsx               # Main 3D scene (lights, camera, controls)
│       ├── TV.tsx                  # Wall-mounted TV with shader animation
│       └── Window.tsx              # Window with day/night cycle
│
└── dist/                           # Production build output (git-ignored)
    ├── index.html
    └── assets/
        ├── index-[hash].css
        └── index-[hash].js
```

## 📁 Directory Purposes

### Root Config Files
- **package.json**: Dependencies, scripts, project metadata
- **vite.config.ts**: Vite build tool configuration
- **vitest.config.ts**: Test runner setup
- **tailwind.config.js**: Tailwind CSS customization
- **postcss.config.js**: PostCSS plugins (Tailwind, Autoprefixer)
- **tsconfig.*.json**: TypeScript compiler settings
- **vercel.json**: Deployment configuration for Vercel

### Source Directories

#### `src/three/`
All 3D objects and the main scene. Each file exports a React component that renders Three.js meshes.

- **Scene.tsx**: Orchestrates lighting, camera, and all objects
- **RoomShell.tsx**: The room container (walls, floor, ceiling)
- **Desk.tsx**: Animated standing desk
- **Monitors.tsx**: Interactive screens with data overlays
- **DeskProps.tsx**: Small details (keyboard, mouse, plant)
- **Bookshelf.tsx**: Manga collection with clickable interaction
- **TV.tsx**: Animated display with GLSL shader
- **Window.tsx**: Sky with day/night transitions

#### `src/components/`
Traditional React UI components overlaid on the 3D scene.

- **Nav.tsx**: Top navigation with camera shortcuts
- **Instructions.tsx**: Welcome message for first-time visitors
- **ProjectModal.tsx**: Modal for project details
- **ContactForm.tsx**: Contact form with mailto links
- **PerformanceToggle.tsx**: Quality setting control

#### `src/data/`
**This is where you edit content!**

- **experience.json**: Your work history
- **projects.json**: Your portfolio projects

#### `src/store/`
State management via Zustand. Single store for:
- Camera target
- Desk height
- Time of day
- Quality setting
- UI state (modals, instructions)

#### `src/test/`
Vitest unit tests. Run with `npm test`.

### Build Output

#### `dist/`
Generated by `npm run build`. Deploy this folder to any static host.

- `index.html`: HTML entry
- `assets/`: Hashed CSS and JS bundles

---

## 🔍 File Relationships

**Data Flow**:
```
experience.json ──────┐
                      ├─→ Monitors.tsx (left screen)
projects.json ────────┼─→ Monitors.tsx (right screen)
                      └─→ ProjectModal.tsx

useStore.ts ──────────┬─→ Scene.tsx (camera, lighting)
                      ├─→ Desk.tsx (height)
                      ├─→ Window.tsx (time)
                      ├─→ All components (quality)
                      └─→ UI components (state)

Scene.tsx ────────────┬─→ RoomShell
                      ├─→ Desk
                      ├─→ Monitors
                      ├─→ DeskProps
                      ├─→ Bookshelf
                      ├─→ TV
                      └─→ Window

App.tsx ──────────────┬─→ Canvas (Three.js renderer)
                      │   └─→ Scene
                      ├─→ Nav
                      ├─→ Instructions
                      ├─→ ProjectModal
                      ├─→ ContactForm
                      └─→ PerformanceToggle
```

---

## 📝 Quick File Reference

| File | Purpose | Edit? |
|------|---------|-------|
| `index.html` | SEO meta tags, title | ✅ Yes |
| `src/data/*.json` | Portfolio content | ✅ Yes |
| `src/components/ContactForm.tsx` | Email & social links | ✅ Yes |
| `src/store/useStore.ts` | Camera positions | ⚠️ Optional |
| `src/three/*.tsx` | 3D objects | ⚠️ Optional |
| Config files (`*.config.*`) | Build settings | ❌ Rarely |

---

## 🎯 What to Edit

**Essential**:
1. `src/data/experience.json` — Your jobs
2. `src/data/projects.json` — Your projects
3. `src/components/ContactForm.tsx` — Email address (line 18)
4. `index.html` — Meta tags for SEO

**Optional**:
5. `src/three/RoomShell.tsx` — Room colors
6. `src/three/Window.tsx` — Day/night colors
7. `src/store/useStore.ts` — Camera positions

**Images**:
8. `public/assets/` — Add project screenshots, OG image, favicon

---

## 🚀 Commands

```bash
npm run dev          # Start dev server (http://localhost:5173)
npm run build        # Build for production → dist/
npm run preview      # Preview production build
npm run test         # Run tests once
npm run test:watch   # Run tests in watch mode
npm run lint         # Check code style
```

---

See **CUSTOMIZATION.md** for detailed editing instructions.

**Total Files**: 44 (excluding node_modules, dist, .git)  
**Lines of Code**: ~2,500 (TypeScript + React + Three.js)  
**Bundle Size**: 313 KB gzipped

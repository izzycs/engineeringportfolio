# 3D Developer Room Portfolio

An interactive 3D portfolio website featuring a fully explorable developer room. Built with React, Three.js, and TypeScript.

![Portfolio Preview](./docs/preview.gif)

## ✨ Features

- **Interactive 3D Room** — Fully navigable developer workspace with clickable objects
- **Dual Monitor Setup** — View experience and projects on interactive screen overlays
- **Day/Night Cycle** — Automated lighting transitions with window view
- **Motorized Standing Desk** — Animated height adjustment
- **Procedural Meshes** — All 3D objects generated with code (no external models)
- **Performance Toggle** — High/Low quality modes for optimal performance
- **Responsive Design** — Works on desktop and mobile devices
- **Accessible UI** — Clean navigation and modal system

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

## 📝 Customization

See **[CUSTOMIZATION.md](./CUSTOMIZATION.md)** for detailed instructions on:

- Editing content (experience, projects, about)
- Changing colors and materials
- Adjusting camera positions
- Adding new 3D objects
- Modifying animations

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

Typical bundle size: ~400KB gzipped (varies with Three.js version).

## 🐛 Troubleshooting

**Issue**: Performance is slow on mobile  
**Fix**: Click "Low" in the performance toggle (bottom right)

**Issue**: Objects not clickable  
**Fix**: Ensure OrbitControls aren't blocking pointer events

**Issue**: Build fails with TypeScript errors  
**Fix**: Run `npm run lint` and fix type errors

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

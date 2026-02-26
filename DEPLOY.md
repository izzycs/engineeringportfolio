# Deployment Guide for Izzy Amaya's 3D Developer Portfolio

## Project Status ✅

All code changes have been completed and tested:
- ✅ Personalized for "Izzy Amaya" (index.html, Nav, ContactForm)
- ✅ Desk updated with rustic brown wood and black rectangular legs
- ✅ Desk props customized (RGB keyboard, pen holder, figurine, smart speaker, laptop stand)
- ✅ Monitors updated to dual-arm mount setup with wider 27" displays
- ✅ Project builds successfully (`npm run build`)
- ✅ All tests passing (`npm run test`)
- ✅ Git repository initialized with initial commit

## Next Steps - Manual Deployment

### 1. Push to GitHub

The repository is ready but needs credentials to push:

```bash
# Option A: Create repo on GitHub first
# Go to https://github.com/new
# Create repo: izzycs/dev-room-portfolio (public or private)
# Then push:
cd /data/.openclaw/workspace/dev-room-portfolio
git push -u origin main
```

```bash
# Option B: Use GitHub CLI (if authenticated)
gh repo create izzycs/dev-room-portfolio --public --source=. --remote=origin --push
```

### 2. Deploy to Vercel

The project is configured for Vercel (see `vercel.json`). Deploy using:

```bash
# Option A: Using Vercel token
cd /data/.openclaw/workspace/dev-room-portfolio
export VERCEL_TOKEN="your-vercel-token-here"
vercel --token $VERCEL_TOKEN --yes --prod
```

```bash
# Option B: Interactive login
vercel login
vercel --prod
```

### 3. Post-Deployment

After deployment, update these placeholders:
- Replace `TODO-REPLACE-WITH-ACTUAL-EMAIL@example.com` in ContactForm.tsx with actual email
- Add LinkedIn URL in ContactForm.tsx if desired
- Update OG image path in index.html (currently `/assets/og-image.png`)

## Local Development

```bash
npm run dev     # Start development server
npm run build   # Build for production
npm run test    # Run tests
npm run preview # Preview production build locally
```

## What Changed

### Personalization
- **index.html**: Title, meta tags, and descriptions updated with "Izzy Amaya"
- **Nav.tsx**: Added "Izzy Amaya" brand name on the left of navigation
- **ContactForm.tsx**: GitHub link points to https://github.com/izzycs

### Visual Updates
- **Desk.tsx**: 
  - Surface: Rustic brown wood (#5C4033, roughness 0.75)
  - Legs: Black rectangular tubes instead of cylinders
  - Crossbars connecting leg pairs
  - Slightly wider desk surface (2.6 units)

- **DeskProps.tsx**:
  - RGB mechanical keyboard with randomized key colors
  - Black wireless mouse
  - Glass pen/pencil holder with colorful pens (left side)
  - Small humanoid figurine
  - Black smart speaker (Echo Dot style)
  - Laptop on vertical stand with colored stickers (right side)
  - Removed: desk mat, coffee mug, plant

- **Monitors.tsx**:
  - Dual monitor arm setup with center post
  - Two arm extensions (left and right)
  - Wider monitor frames (27" style, 0.7 x 0.42)
  - Removed individual stands
  - LED strip widened to match

## Repository Structure

```
dev-room-portfolio/
├── src/
│   ├── three/          # 3D scene components
│   │   ├── Desk.tsx    # ✅ Updated
│   │   ├── DeskProps.tsx # ✅ Updated
│   │   └── Monitors.tsx  # ✅ Updated
│   ├── components/
│   │   ├── Nav.tsx       # ✅ Updated
│   │   └── ContactForm.tsx # ✅ Updated
│   └── ...
├── index.html          # ✅ Updated
├── vercel.json         # ✅ Ready
└── package.json

```

---

**Built by DevBro 🤖 for Izzy Amaya**

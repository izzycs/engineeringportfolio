# Round 9 Testing Checklist

## Pre-Deployment Testing

### ✅ Build & TypeScript
- [x] `npm run build` completes without errors
- [x] All TypeScript types resolve correctly
- [x] No console warnings during build
- [x] Bundle size acceptable (~350KB gzipped)

### 🎨 Visual Quality (Desktop - High Quality)
Test on Chrome with dedicated GPU:

- [ ] **Materials**
  - [ ] Plant leaves show subtle translucency when backlit
  - [ ] Monitor screens have realistic Fresnel reflections
  - [ ] Desk surface shows micro-scratches (subtle, not distracting)
  - [ ] Chair fabric has visible normal map detail
  - [ ] Coffee ring stain visible on desk near mug
  - [ ] Metal surfaces reflect environment properly
  - [ ] Ceramic mug has glaze reflection

- [ ] **Lighting**
  - [ ] Caustics animation visible on floor near window
  - [ ] Screen backlight creates blue glow on desk
  - [ ] RGB keyboard reflection cycles through colors
  - [ ] Shadows are crisp and well-defined (4K quality)
  - [ ] Objects touching surfaces have contact shadows
  - [ ] Window light appears warmer than interior lighting
  - [ ] Dust particles float naturally in light beams (300+ visible)

- [ ] **Animations**
  - [ ] Chair sway is gentle and settles naturally (not perpetual)
  - [ ] Plant leaves move with wind gusts (not constant)
  - [ ] Ceiling fan accelerates smoothly, not instant
  - [ ] Camera transitions between views are smooth (no snapping)
  - [ ] RGB keyboard wave is smooth and continuous

- [ ] **Post-Processing**
  - [ ] Overall image has warm, cozy tint
  - [ ] Vignette (darker corners) is subtle
  - [ ] No obvious visual artifacts
  - [ ] Anti-aliasing is effective (no jagged edges)

### ⚡ Performance (Desktop)
Test with Performance Monitor (press `P` if implemented, or use browser DevTools):

- [ ] **High Quality Mode**
  - [ ] 60 FPS maintained during rotation
  - [ ] 60 FPS maintained during camera transitions
  - [ ] No stuttering or frame drops
  - [ ] Memory usage < 500MB
  - [ ] Frame time < 16.67ms (for 60fps)

- [ ] **Medium Quality Mode**
  - [ ] 60 FPS easily maintained
  - [ ] Shadow quality reduced but acceptable
  - [ ] Post-processing disabled (check tone mapping)
  - [ ] Dust particles reduced (150 instead of 300)

- [ ] **Low Quality Mode**
  - [ ] Very high FPS (90+ on good hardware)
  - [ ] Shadows low res but functional
  - [ ] Minimal particles (50)
  - [ ] No fog or post-processing

### 📱 Mobile Testing (iOS/Android)

#### iOS Safari (iPhone/iPad)
- [ ] Touch gestures work:
  - [ ] Single finger drag = rotate camera
  - [ ] Two finger pinch = zoom in/out
  - [ ] Two finger drag = pan camera
- [ ] Auto-detects mobile device
- [ ] Quality defaults to medium or low
- [ ] Frame rate acceptable (30-60 FPS)
- [ ] No crashes or freezes
- [ ] UI buttons accessible (not hidden by notch)
- [ ] Loading screen displays properly
- [ ] No console errors in Safari Web Inspector

#### Android Chrome
- [ ] Touch gestures work smoothly
- [ ] Performance acceptable on mid-range device
- [ ] No lag during camera rotation
- [ ] Quality adapts based on device

### 🎮 Interactions
- [ ] Click on monitors opens project/experience modals
- [ ] Click on TV shows content
- [ ] Click on bookshelf items (if interactive)
- [ ] Click on desk items (if interactive)
- [ ] Easter eggs still work after Round 9 changes
- [ ] Back button returns to previous view
- [ ] Navigation menu functional

### ⌨️ Keyboard Shortcuts
- [ ] `1-6` keys switch camera views smoothly
- [ ] `H` key enables high quality
- [ ] `M` key enables medium quality (NEW)
- [ ] `L` key enables low quality
- [ ] `F` key toggles fullscreen
- [ ] `I` key toggles instructions
- [ ] `ESC` resets camera to default view
- [ ] All shortcuts documented in KEYBOARD_SHORTCUTS.md

### 🌐 Browser Compatibility

#### Chrome (Desktop)
- [ ] All features work
- [ ] High quality mode performs well
- [ ] Post-processing active
- [ ] No console errors

#### Firefox (Desktop)
- [ ] All features work
- [ ] Performance comparable to Chrome
- [ ] No console errors
- [ ] WebGL 2.0 features work

#### Safari (Desktop)
- [ ] All features work
- [ ] Performance may be slightly lower (expected)
- [ ] Environment maps load correctly
- [ ] No console errors

#### Edge (Desktop)
- [ ] All features work (Chromium-based, should match Chrome)

### 🐛 Error Handling
- [ ] WebGL not supported: Shows error message (if implemented)
- [ ] Low memory: Quality auto-reduces (if auto-adjust enabled)
- [ ] Slow performance: Quality auto-reduces (if enabled)
- [ ] Network issues: Loading screen handles gracefully

### 📊 Performance Profiling

Use Chrome DevTools Performance tab:

1. Record 10 seconds of camera rotation
2. Check for:
   - [ ] No long tasks (>50ms)
   - [ ] No forced reflows
   - [ ] No excessive garbage collection
   - [ ] GPU usage consistent
   - [ ] Draw calls reasonable (<100 per frame)

### 🔍 Code Quality
- [ ] No TypeScript errors
- [ ] No ESLint warnings
- [ ] All new files follow project conventions
- [ ] Comments are clear and helpful
- [ ] No unused imports or variables

### 📚 Documentation
- [ ] PERFORMANCE_GUIDE.md is complete
- [ ] KEYBOARD_SHORTCUTS.md lists all controls
- [ ] CREDITS.md acknowledges inspirations
- [ ] ROUND_9_SUMMARY.md documents all changes
- [ ] README.md updated with new features

### 🚀 Deployment Readiness
- [ ] Build succeeds: `npm run build`
- [ ] Preview works: `npm run preview`
- [ ] Environment variables set (if any)
- [ ] Vercel/Netlify config correct
- [ ] No sensitive data in code
- [ ] Git repo clean (all changes committed)

## Post-Deployment Testing

### Production Environment
- [ ] Site loads within 5 seconds on 3G
- [ ] HTTPS certificate valid
- [ ] All assets load correctly
- [ ] No 404 errors in Network tab
- [ ] Performance matches local testing
- [ ] Mobile devices can access
- [ ] Desktop browsers can access
- [ ] Social media preview (og:image) displays

### Analytics (if implemented)
- [ ] Page views tracking
- [ ] Quality setting distribution (high/medium/low)
- [ ] Average FPS (if tracked)
- [ ] Device types (desktop/mobile ratio)
- [ ] Browser distribution

## Known Issues to Document

### Expected Behaviors
- Bundle size warning (normal with Three.js)
- Slightly lower FPS on Safari (WebGL performance)
- Mobile devices default to lower quality (intentional)

### Workarounds
- If FPS is low: Press `L` for low quality mode
- If screen is black: Check WebGL support at webglreport.com
- If controls don't work: Try refreshing page

## Testing Sign-Off

| Tester | Device | Browser | Quality | FPS | Pass/Fail | Notes |
|--------|--------|---------|---------|-----|-----------|-------|
| Example | MacBook Pro M1 | Chrome 130 | High | 60 | ✅ Pass | Perfect |
| Example | iPhone 14 Pro | Safari | Medium | 55 | ✅ Pass | Great |
| Example | Android (SD665) | Chrome | Low | 30 | ✅ Pass | Acceptable |
|  |  |  |  |  |  |  |
|  |  |  |  |  |  |  |

## Regression Testing

### Previous Features Still Work
- [ ] Round 1-8 features unchanged
- [ ] Basic room structure intact
- [ ] All objects render correctly
- [ ] Previous animations still work
- [ ] UI components functional
- [ ] Data loading (projects, experience)

## Final Approval

- [ ] Lead developer sign-off
- [ ] Design review complete
- [ ] Performance targets met
- [ ] Mobile experience acceptable
- [ ] Documentation complete
- [ ] Ready for production deployment

---

**Testing Status:** ⚠️ NOT STARTED

**Last Updated:** February 27, 2026

**Next Action:** Begin manual testing on real devices

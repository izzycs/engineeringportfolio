# Pre-Deployment Checklist

Use this checklist before deploying to production. Test on staging first!

## 🏗️ Build Verification

- [ ] `npm run build` passes without errors
- [ ] `npm run preview` shows the site working correctly
- [ ] No console errors in browser console (except WebGL warnings on old devices)
- [ ] All lazy chunks load (check Network tab in DevTools)

## 🌐 Cross-Browser Testing

### Desktop Browsers
- [ ] **Chrome 90+** - Primary target, should be perfect
- [ ] **Firefox 88+** - Check colors/shadows render correctly
- [ ] **Safari 14+** - Test on macOS if possible
- [ ] **Edge 90+** - Chromium-based, should match Chrome

### Mobile Browsers
- [ ] **Safari iOS 14+** - Most important mobile browser
- [ ] **Chrome Android** - Second most important
- [ ] **Samsung Internet** - Popular on Samsung devices

## 📱 Mobile Device Testing

### Touch Gestures
- [ ] Single finger drag rotates camera
- [ ] Pinch to zoom works
- [ ] Two finger pan works
- [ ] No accidental zooms/scrolls

### UI Responsiveness
- [ ] Time-of-day buttons visible and clickable
- [ ] Achievement panel opens properly
- [ ] Navigation menu works
- [ ] Modals display correctly
- [ ] No overlapping UI elements

### Performance
- [ ] Loads in <5 seconds on 4G
- [ ] Maintains 30+ FPS
- [ ] Quality auto-adjusts on low-end devices
- [ ] No crashes or freezes

## 🎮 Interactive Elements Testing

### Core Interactions
- [ ] Monitors clickable (show experience/projects)
- [ ] Project modal opens with correct content
- [ ] Contact form displays
- [ ] Back button returns to overview

### Round 10 Interactive Objects
- [ ] Coffee mug shows steam when clicked
- [ ] Basketball bounces realistically
- [ ] Plant grows when "watered"
- [ ] Time-of-day toggle works (all 4 times)

### Easter Eggs (Not Critical but Nice to Verify)
- [ ] Konami code (↑↑↓↓←→←→BA) triggers achievement
- [ ] Matrix mode (` key) shows green rain
- [ ] RGB mode (Ctrl+Shift+R) activates rainbow
- [ ] Developer console (~hold) opens
- [ ] Achievement system tracks unlocks

## 🎨 Visual Quality

### Lighting
- [ ] Morning lighting (cool blue tones)
- [ ] Afternoon lighting (warm natural tones)
- [ ] Evening lighting (golden hour orange)
- [ ] Night lighting (dark with screen glow)
- [ ] Transitions are smooth (not jarring)

### Materials
- [ ] Desk has realistic wood texture
- [ ] Monitors have screen glare
- [ ] Window shows outside environment
- [ ] Shadows render correctly (high quality)
- [ ] No missing textures or pink materials

## 🛡️ Error Handling

### Intentional Error Tests
- [ ] Disconnect network mid-load → Loading screen handles gracefully
- [ ] Force WebGL context loss (DevTools) → Error boundary catches it
- [ ] Low memory device → Quality auto-reduces
- [ ] Unsupported WebGL → Error message displays

### Error Recovery
- [ ] Error boundary shows friendly message
- [ ] Reload button works
- [ ] Error details are collapsible
- [ ] Console logs full error for debugging

## ⚡ Performance Verification

### Metrics (Use DevTools Performance Tab)
- [ ] FPS: 55-60 on desktop (high quality)
- [ ] FPS: 30+ on mobile
- [ ] Memory: <200 MB on desktop
- [ ] Memory: <150 MB on mobile
- [ ] No memory leaks over 5 minutes
- [ ] Frame drops only during quality transitions

### Bundle Loading
- [ ] Initial bundle loads first
- [ ] Easter eggs lazy load after scene
- [ ] Post-processing lazy loads on high quality
- [ ] No waterfall loading delays

## 📊 Analytics & Tracking

- [ ] Vercel Analytics loads (check Network tab)
- [ ] No analytics errors in console
- [ ] Page views tracked correctly

## ♿ Accessibility (Basic Check)

- [ ] Skip to content link works
- [ ] Tab key navigates UI elements
- [ ] Escape key closes modals
- [ ] Keyboard shortcuts work (press ? to see list)
- [ ] Reduced motion setting respected (if enabled in OS)

## 📝 Content Verification

- [ ] Experience section shows correct jobs/roles
- [ ] Projects section shows correct projects
- [ ] Contact info is YOUR info (not placeholder)
- [ ] Social links point to YOUR profiles
- [ ] Page title/meta tags are correct (see index.html)
- [ ] Favicon displays

## 🔒 Security & Privacy

- [ ] No API keys in client-side code
- [ ] Contact form doesn't expose email directly
- [ ] No console.logs with sensitive data
- [ ] HTTPS enabled on deployment

## 🚀 Deployment Platform Verification

### Vercel (Recommended)
- [ ] Environment variables set (if any)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Node version: 18+
- [ ] Analytics enabled

### Other Platforms
- [ ] Build settings match Vercel
- [ ] Static file serving configured
- [ ] Compression (gzip/brotli) enabled
- [ ] CDN caching configured

## 🎯 Final Checks

- [ ] README.md updated with YOUR info
- [ ] CHANGELOG.md reviewed
- [ ] No placeholder content remains
- [ ] Git repo clean (no uncommitted changes)
- [ ] Version tag created (optional)

---

## 🚦 Deployment Decision

**Ready to deploy?**

✅ **YES** - All critical checks passed (mobile, cross-browser, performance)  
⚠️ **STAGING FIRST** - Some issues found, deploy to staging to verify fixes  
❌ **NOT READY** - Critical issues remain, address before deploying

---

## 📞 Troubleshooting

**Issue:** Low FPS on mobile  
**Fix:** Check that quality auto-adjust is working. May need to default mobile to "low" quality.

**Issue:** Easter eggs not working  
**Fix:** Check that lazy chunks loaded (Network tab). Might be CDN issue.

**Issue:** WebGL context lost errors on iOS  
**Fix:** Known iOS limitation. Error boundary should handle it gracefully.

**Issue:** Colors look different in Safari  
**Fix:** Safari uses different color profiles. Consider adding color space conversion.

**Issue:** Touch gestures not working  
**Fix:** Check that OrbitControls touch configuration is correct in Scene.tsx.

---

## 📅 Post-Deployment

After deploying to production:

- [ ] Monitor error rates (Vercel Dashboard or Sentry)
- [ ] Check analytics for drop-off points
- [ ] Test on real devices (not just emulators)
- [ ] Gather user feedback
- [ ] Track performance over time
- [ ] Update documentation with any production issues

---

**Last updated:** Round 11 completion (2026-02-27)  
**Next review:** After first production deployment

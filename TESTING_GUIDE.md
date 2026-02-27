# Testing Guide - Round 4 Features

## 🧪 How to Test New Features

### Quick Start
```bash
npm run dev
```

Then open http://localhost:5173 (or the port shown)

---

## ✨ Feature Testing Checklist

### 1. Loading Screen
**Expected Behavior:**
- ✅ Shows immediately on page load
- ✅ Progress bar fills from 0-100%
- ✅ "IZZY" name displays prominently
- ✅ Loading percentage updates smoothly
- ✅ Animated dots appear
- ✅ Fades out smoothly when complete
- ✅ Completely disappears (not just hidden)

**How to Test:**
- Hard refresh the page (Ctrl+Shift+R / Cmd+Shift+R)
- Loading should complete in ~3-4 seconds

---

### 2. Keyboard Shortcuts
**Expected Behavior:**
- ✅ "?" button appears in bottom-right corner
- ✅ Clicking "?" or pressing '?' key opens modal
- ✅ ESC key closes modal
- ✅ Backdrop click closes modal
- ✅ All shortcuts are listed
- ✅ Keys displayed in styled kbd elements

**How to Test:**
1. Look for "?" button in bottom-right
2. Click it or press '?' key
3. Try each keyboard shortcut listed
4. Close with ESC or click outside
5. Press '?' again to verify toggle

**Shortcuts to Test:**
- ESC → Should zoom out to default view
- 1 → Focus left monitor
- 2 → Focus right monitor
- 3 → View bookshelf
- 4 → View TV
- 5 → View window

---

### 3. Desk Chair
**Expected Behavior:**
- ✅ Chair visible in front of desk
- ✅ Black/grey color scheme
- ✅ 5-star base with wheels
- ✅ Seat, backrest, armrests all present
- ✅ Looks like a professional office chair

**How to Test:**
1. Default view should show chair
2. Zoom in to inspect details
3. Rotate camera to see all sides
4. Check materials look realistic

---

### 4. Ceiling Fan
**Expected Behavior:**
- ✅ Fan visible on ceiling
- ✅ 4 blades rotating slowly
- ✅ Rotation is smooth (not jerky)
- ✅ Wood-tone blades
- ✅ Silver/metallic hardware
- ✅ Light fixture underneath

**How to Test:**
1. Look up at ceiling
2. Watch blades rotate
3. Verify smooth motion at 60fps
4. Check from different angles

---

### 5. Easter Eggs

#### Basketball
**Expected Behavior:**
- ✅ Small orange basketball in back-right corner
- ✅ Cursor changes to pointer on hover
- ✅ Bounces when clicked
- ✅ Multiple bounces with decreasing height
- ✅ Eventually stops
- ✅ Rotates while bouncing
- ✅ Can be clicked again after stopping

**How to Test:**
1. Rotate camera to see back-right corner (position [3.2, 0.15, 3.2])
2. Look for orange basketball on floor
3. Hover over it (cursor should change)
4. Click it and watch it bounce
5. Wait for it to stop
6. Click again to verify it works repeatedly

#### Portal
**Expected Behavior:**
- ✅ Purple glowing ring near bookshelf
- ✅ Cursor changes to pointer on hover
- ✅ Glows brighter on hover
- ✅ Changes colors when hovered
- ✅ Alert appears on click showing interaction count
- ✅ Inner circle visible

**How to Test:**
1. Rotate camera to see bookshelf area
2. Look for purple glowing portal (position [-2.8, 1.5, -2.8])
3. Hover over it (should glow brighter and cycle colors)
4. Click it to see alert with interaction count
5. Click basketball, then portal again to verify counter

---

### 6. Enhanced Contact Form
**Expected Behavior:**
- ✅ Opens when clicking "Contact" in nav
- ✅ Gradient background
- ✅ Floating labels animate up when focused/filled
- ✅ Labels turn green on focus
- ✅ Input borders turn green on focus
- ✅ Success message appears after submit
- ✅ Form resets and closes after success
- ✅ Social links have hover effects
- ✅ Button has hover scale effect

**How to Test:**
1. Click "Contact" in navigation
2. Click in each field without typing (label should move up)
3. Type in each field (label should stay up, turn green)
4. Click outside field (label should stay up if filled)
5. Submit form (should show success banner)
6. Watch form close automatically
7. Re-open and hover over social links
8. Hover over submit button (should scale)

---

### 7. Improved Project Modal
**Expected Behavior:**
- ✅ Opens when clicking projects on monitors
- ✅ Gradient title text
- ✅ Main screenshot placeholder visible
- ✅ 4-image gallery grid below
- ✅ Tech stack tags have gradient backgrounds
- ✅ Tech tags hover effect (scale + glow)
- ✅ "Visit Project" button has gradient
- ✅ "View Code" button has outline
- ✅ Buttons have hover effects
- ✅ Modal scrolls if content is long
- ✅ Header and footer stay fixed

**How to Test:**
1. Click either monitor to open project
2. Scroll through modal content
3. Verify header/footer stay in place
4. Hover over tech stack tags (should scale and glow)
5. Hover over buttons (should scale)
6. Click buttons to verify links work
7. Close and try with different project

---

### 8. Performance
**Expected Behavior:**
- ✅ Maintains 60fps at all times
- ✅ No lag when interacting
- ✅ Smooth camera movements
- ✅ Smooth animations
- ✅ No console errors
- ✅ Fast load time

**How to Test:**
1. Open browser DevTools (F12)
2. Go to Performance tab
3. Start recording
4. Interact with various features
5. Stop recording
6. Check FPS stays around 60
7. Check console for any errors
8. Monitor memory usage (should stay stable)

**FPS Counter (optional):**
Add to Scene.tsx temporarily:
```tsx
useFrame(({ gl }) => {
  console.log('FPS:', Math.round(1000 / gl.info.render.frame));
});
```

---

## 🐛 Known Issues / Expected Behavior

### Not Bugs:
- Basketball can clip through objects if thrown too hard (expected)
- Portal position fixed near bookshelf (by design)
- Loading screen simulates progress (not actual asset loading)
- "TODO-REPLACE-WITH-ACTUAL-EMAIL" needs your real email
- Project screenshots say "Coming Soon" (placeholders)

### If You Find Bugs:
1. Check browser console for errors
2. Try hard refresh (Ctrl+Shift+R)
3. Verify you ran `npm install`
4. Check that build succeeded (`npm run build`)

---

## 📊 Performance Benchmarks

**Expected Stats:**
- **FPS:** 60 (55+ acceptable on lower-end hardware)
- **Load Time:** 2-4 seconds on fast connection
- **Memory:** ~150-200MB WebGL memory
- **Draw Calls:** 30-40 per frame
- **Triangles:** ~50,000 total (very reasonable)

**To Check Stats:**
Add this to Scene.tsx:
```tsx
useFrame(({ gl }) => {
  console.log({
    calls: gl.info.render.calls,
    triangles: gl.info.render.triangles,
    textures: gl.info.memory.textures,
    geometries: gl.info.memory.geometries
  });
});
```

---

## 🎯 Quick Test Sequence

**5-Minute Full Test:**
1. ✅ Load page → Watch loading screen
2. ✅ Press '?' → Check keyboard shortcuts
3. ✅ Press 1-5 → Test all camera positions
4. ✅ Look up → Verify ceiling fan rotates
5. ✅ Look down at chair → Verify it's there
6. ✅ Rotate to corner → Click basketball
7. ✅ Rotate to bookshelf → Hover/click portal
8. ✅ Click monitor → Test project modal
9. ✅ Click Contact → Test contact form
10. ✅ Check DevTools → Verify no errors

**Time:** ~5 minutes
**Coverage:** All features
**Pass Criteria:** Everything works, smooth 60fps, no errors

---

## 🚀 Ready to Test!

Run `npm run dev` and go through the checklist above. All features should work flawlessly!

**Have fun finding the easter eggs! 🏀✨**

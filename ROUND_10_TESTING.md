# Round 10 Testing Guide

## Quick Test Checklist

### 🖱️ Interactive Elements (Must Test)

1. **Coffee Mug** (desk, front-right)
   - Click → Should see rising steam particles for 5 seconds
   - Particles should fade and dissipate as they rise

2. **Basketball** (desk, back-right)
   - Click → Should bounce with realistic physics
   - Bounces should decrease in height (energy loss)
   - Should hit walls and bounce off
   - Eventually settles back to resting position

3. **Plant** (desk, back-right corner)
   - Click → Should grow larger (max 130% size)
   - Shows water droplets when growing
   - Each click adds 10% growth

4. **Books** (desk, back-left)
   - Hover → Should lift slightly and glow
   - Click → Shows book titles on spines
   - Stack of 4 data engineering books

5. **TV** (wall behind desk)
   - Click → Cycles through 3 content types:
     - S&P 500 chart
     - NBA scores
     - Anime recommendation

6. **Window** (right wall)
   - Click → Changes time of day in cycle:
     - Morning (blue/cool) → Afternoon (golden) → Evening (orange) → Night (dark blue)
   - Lighting should transition smoothly over ~2 seconds

7. **Headphones** (on stand)
   - Click → Shows 8-bar sound visualizer
   - Bars should pulse up and down

### ⌨️ Keyboard Shortcuts

1. **Arrow Keys**
   - Left/Right → Rotate camera horizontally
   - Up/Down → Tilt camera vertically

2. **Zoom**
   - `+` or `=` → Zoom in
   - `-` → Zoom out

3. **View Reset**
   - `Space` → Return to default view

4. **Matrix Mode**
   - Press `` ` `` (backtick) → Green code rain falls
   - Press again to toggle off

5. **RGB Mode**
   - `Ctrl + Shift + R` → Rainbow color cycling
   - All lights become rainbow

6. **Developer Console**
   - Hold `~` (tilde) for 500ms → Opens dev console
   - Type commands:
     - `help` → Show available commands
     - `clear` → Clear console
     - `matrix` → Toggle Matrix mode
     - `unlock [achievement_id]` → Unlock achievement

7. **Konami Code**
   - ↑ ↑ ↓ ↓ ← → ← → B A → Special effect + achievement

### 🎨 Time of Day Controls

Located at **bottom-center** of screen:

1. **Morning (🌅)**
   - Cool blue lighting
   - Bright window
   - Birds chirping (if sound enabled)

2. **Afternoon (☀️)**
   - Warm golden lighting
   - Strong sunlight
   - Default setting

3. **Evening (🌆)**
   - Orange/red sunset glow
   - Desk lamp becomes primary light
   - Crickets (if sound enabled)

4. **Night (🌙)**
   - Deep blue moonlight
   - Desk lamp at full brightness
   - Screens glow brighter
   - Dense fog effect

### ♿ Accessibility Panel

Located at **top-left** (♿ icon):

1. **Reduce Motion**
   - Toggle on → All animations stop
   - Respects system preferences

2. **High Contrast**
   - Toggle on → Increases color contrast
   - Improves visibility

3. **Color Blind Modes**
   - None / Protanopia / Deuteranopia / Tritanopia
   - Adjusts color palette

4. **Text Scale**
   - Slider from 80% to 150%
   - Affects all UI text

5. **Screen Reader**
   - Enables ARIA announcements
   - Provides descriptions for all elements

6. **Keyboard Navigation**
   - Enables full keyboard control
   - Tab through interactive elements

### 🔊 Sound Controls

Located at **bottom-right**:

1. **Toggle Button**
   - 🔊 (on) / 🔇 (muted)
   - Click to enable/disable all sounds

2. **Volume Slider**
   - 0-100% control
   - Affects all sound effects

### 🏆 Achievement System

Located at **bottom-left** (trophy icon):

Test achievements by:

1. **Old School** - Enter Konami code
2. **Portal Master** - Click portal/room 10 times
3. **Neo** - Activate Matrix mode
4. **Unicorn Mode** - Activate RGB mode
5. **Kobe!** - Make basketball bounce 100 times
6. **Caffeine Addict** - Click coffee 50 times
7. **Green Thumb** - Water plant 20 times
8. **Time Lord** - Cycle through all 4 times of day

Unlocking shows:
- Green notification popup
- Achievement icon and description
- Updated trophy counter

## 📊 Visual Elements to Verify

### Personal Touches
- [ ] Desk nameplate says "IZZY • DATA ENG"
- [ ] 4 data engineering books stacked
- [ ] Photo frame on desk
- [ ] Lakers pennant on wall (purple/gold)
- [ ] 3 anime figurines with different colors
- [ ] Water bottle with transparency
- [ ] Energy drink can (blue metallic)
- [ ] Protein bar wrapper
- [ ] Phone on wireless charger (glowing green ring)
- [ ] Smartwatch on charger
- [ ] Coiled USB-C cable
- [ ] 3 post-it notes with task text
- [ ] Powered laptop with glowing screen

### Wall Decorations
- [ ] S&P 500 chart showing +24.8%
- [ ] Pipeline metrics heatmap (7x7 grid)
- [ ] Data sources pie chart
- [ ] AWS certificate (orange logo)
- [ ] Data Science certificate (ribbon)
- [ ] Golden trophy on shelf
- [ ] Whiteboard with ETL diagram
- [ ] February 2026 calendar (27th highlighted)

### Monitor Screens
- [ ] Left monitor shows terminal with colored output
- [ ] Progress bars visible (████ style)
- [ ] Right monitor shows VS Code with Python code
- [ ] Syntax highlighting (purple, green, blue colors)
- [ ] Both screens have emissive glow

## 🐛 Bug Testing

### Edge Cases
1. **Rapid Clicking**
   - Click basketball 10x rapidly
   - Should queue physics, not break

2. **Multiple Easter Eggs**
   - Activate Matrix + RGB simultaneously
   - Both should work together

3. **Window Resizing**
   - Resize browser window
   - All UI should remain visible and functional

4. **Mobile/Touch**
   - Test on mobile device or emulator
   - Touch controls should work
   - UI buttons should be tappable

5. **Performance**
   - Check FPS in stats (if available)
   - Should maintain 30+ FPS on decent hardware
   - No stuttering during animations

## 🎯 Acceptance Criteria

### Minimum Requirements
- ✅ Build completes without errors
- ✅ Page loads without console errors
- ✅ At least 6 interactive elements work
- ✅ Time of day controls function
- ✅ Accessibility panel is usable
- ✅ No major visual glitches
- ✅ Runs at acceptable FPS

### Polish Requirements
- ✅ All 9 interactive elements work perfectly
- ✅ Smooth transitions for time of day
- ✅ Easter eggs are discoverable and fun
- ✅ Achievements unlock correctly
- ✅ Personal items are recognizable
- ✅ Screen content is readable
- ✅ Materials look realistic

### Excellence Requirements
- ✅ Physics feels natural and realistic
- ✅ Lighting is beautiful in all presets
- ✅ No performance issues on target hardware
- ✅ Accessibility features work completely
- ✅ Every detail is polished
- ✅ Easter eggs are surprising and delightful
- ✅ Room feels lived-in and personal

## 📸 Screenshot Checklist

Take screenshots of:
1. Default view (afternoon lighting)
2. Morning lighting preset
3. Evening lighting preset
4. Night lighting preset with screen glow
5. Matrix mode active
6. RGB mode active
7. Achievement unlocked notification
8. Developer console open
9. Accessibility panel open
10. All personal items visible

## 🎬 Video Recording Suggestions

Record short clips of:
1. Basketball bouncing physics
2. Time-of-day smooth transition
3. Coffee steam animation
4. Plant watering and growth
5. Sound visualizer on headphones
6. Matrix rain falling
7. RGB mode color cycling

## 💬 User Testing Questions

Ask testers:
1. Did you find any hidden easter eggs?
2. Which interactive element was most fun?
3. Did the room feel personal and lived-in?
4. Was the time-of-day transition smooth?
5. Were accessibility features easy to find?
6. Did anything feel broken or buggy?
7. What surprised you most?
8. What would you add next?

## 🚀 Pre-Deployment Checklist

Before deploying:
- [ ] All tests pass
- [ ] No console errors in production build
- [ ] File size is reasonable (<2MB total)
- [ ] Mobile version works
- [ ] All links work
- [ ] Contact form functions
- [ ] GitHub calendar loads
- [ ] Performance is acceptable
- [ ] Accessibility score is high
- [ ] Cross-browser testing done

## 🔍 Browser Compatibility Testing

Test in:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

Check for:
- WebGL support
- Touch events
- Keyboard events
- CSS animations
- Audio support (when implemented)

## 📈 Performance Targets

### Desktop (High-End)
- FPS: 60 (stable)
- Load time: <2s
- Memory: <500MB

### Desktop (Mid-Range)
- FPS: 45+ (stable)
- Load time: <3s
- Memory: <350MB

### Mobile (Modern)
- FPS: 30+ (stable)
- Load time: <5s
- Memory: <250MB

### Mobile (Older)
- FPS: 20+ (acceptable)
- Load time: <8s
- Memory: <200MB

## ✅ Final Sign-Off

When all tests pass:
1. Document any known issues
2. Create deployment notes
3. Update README with new features
4. Tag release as v2.0 (Round 10)
5. Deploy to production
6. Test production deployment
7. Monitor for errors
8. Celebrate! 🎉

---

**Testing Complete?** Mark the date and tester name:

- Tested by: ________________
- Date: ________________
- Build version: ________________
- Result: ☐ Pass ☐ Fail ☐ Needs fixes

**Notes:**
_________________________________
_________________________________
_________________________________

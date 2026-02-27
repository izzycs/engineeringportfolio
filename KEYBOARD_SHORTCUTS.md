# Keyboard Shortcuts

Complete reference for all keyboard controls in the dev-room portfolio.

## Camera Controls

### Preset Views
| Key | Action | Description |
|-----|--------|-------------|
| `1` | Default View | Overview of entire room |
| `2` | Desk View | Close-up of desk and monitors |
| `3` | Monitor View | Focus on screens |
| `4` | Bookshelf View | View bookshelf and decorations |
| `5` | TV View | Focus on wall-mounted TV |
| `6` | Window View | View out the window |

### Manual Camera Movement
| Key | Action | Description |
|-----|--------|-------------|
| **Left Mouse** | Rotate | Click and drag to orbit around scene |
| **Right Mouse** | Pan | Click and drag to move camera horizontally |
| **Mouse Wheel** | Zoom | Scroll to zoom in/out |
| `ESC` | Reset View | Return to default camera position |

## Quality Settings

| Key | Action | Description |
|-----|--------|-------------|
| `H` | High Quality | Enable all effects (4K shadows, post-processing) |
| `M` | Medium Quality | Balanced performance and visuals |
| `L` | Low Quality | Maximum performance (mobile-friendly) |
| `Q` | Quick Toggle | Cycle through quality levels |

## Display Options

| Key | Action | Description |
|-----|--------|-------------|
| `F` | Fullscreen | Toggle fullscreen mode |
| `I` | Instructions | Show/hide help overlay |
| `P` | Performance Stats | Show FPS, frame time, memory |
| `D` | Debug Mode | Show wireframes and bounding boxes |
| `G` | Grid | Toggle floor grid |

## Easter Eggs & Interactions

| Key | Action | Description |
|-----|--------|-------------|
| `SPACE` | Pause Animations | Freeze all moving elements |
| `B` | Basketball Shot | Make the basketball bounce |
| `K` | Keyboard RGB | Cycle RGB lighting effects |
| `T` | Time of Day | Cycle lighting presets (morning/afternoon/evening) |
| `R` | Rain | Toggle window rain effect |
| `S` | Screenshot | Capture current view (downloads PNG) |

## Developer Tools

| Key | Action | Description |
|-----|--------|-------------|
| `CTRL + SHIFT + D` | Debug Panel | Advanced diagnostics |
| `CTRL + SHIFT + P` | Performance | Detailed performance metrics |
| `CTRL + SHIFT + L` | Lighting Debug | Visualize light positions |
| `CTRL + SHIFT + M` | Material Inspector | View material properties |
| `CTRL + SHIFT + S` | Save State | Export camera position to console |

## Mobile Touch Controls

### Gestures
| Gesture | Action | Description |
|---------|--------|-------------|
| **Single Finger Drag** | Rotate | Orbit camera around scene |
| **Two Finger Pinch** | Zoom | Pinch to zoom in/out |
| **Two Finger Drag** | Pan | Move camera horizontally |
| **Double Tap** | Reset View | Return to default position |
| **Long Press** | Context Menu | Show available interactions |

### On-Screen Buttons
- **Camera Icon**: Cycle through preset views
- **Settings Icon**: Open quality settings
- **Info Icon**: Show instructions
- **Fullscreen Icon**: Toggle fullscreen

## Accessibility

### Screen Reader
| Key | Action | Description |
|-----|--------|-------------|
| `TAB` | Navigate | Move between interactive elements |
| `ENTER` | Activate | Click focused element |
| `SHIFT + TAB` | Navigate Backward | Move to previous element |

### Reduced Motion
If "Reduce Motion" is enabled in OS settings, all animations will be simplified or disabled.

## Tips & Tricks

### Quick Actions
- **Double-press `ESC`**: Exit and refresh page
- **Hold `SHIFT` while rotating**: Snap to 45° angles
- **Hold `CTRL` while zooming**: Slow zoom (precise)
- **Hold `ALT` while panning**: Constrain to one axis

### Efficiency
- Use number keys (`1-6`) for quick camera changes instead of clicking UI buttons
- `H` + `F` (high quality + fullscreen) for best viewing experience
- `L` (low quality) before taking screenshots on slow devices

### Hidden Features
- Press keys in sequence: `K` → `O` → `N` → `A` → `M` → `I` for secret message
- Hold `SHIFT` while clicking objects for alternate interactions
- `CTRL + Click` on monitor screens to cycle content

## Custom Shortcuts (Advanced)

You can customize shortcuts by editing `src/components/KeyboardShortcuts.tsx`:

```typescript
const shortcuts = {
  camera: {
    default: '1',
    desk: '2',
    // ... add your own
  },
  quality: {
    high: 'h',
    // ... customize
  }
};
```

## Browser Compatibility

### Chrome/Edge
All shortcuts work as expected.

### Firefox
All shortcuts work. Note: `F` for fullscreen may require extra permission.

### Safari
Most shortcuts work. Known issues:
- Fullscreen (`F`) may not work on macOS < 13.0
- Screenshots (`S`) may require manual save

### Mobile Browsers
- iOS Safari: Touch controls only (keyboard shortcuts not applicable)
- Android Chrome: Touch controls recommended
- Samsung Internet: Touch controls work, some keyboard shortcuts available

## Conflicts

Some shortcuts may conflict with browser defaults:

| Key | Browser Default | Solution |
|-----|----------------|----------|
| `F` | Find | Click "Allow" when prompted for fullscreen |
| `S` | Save Page | Use `CTRL + S` for page save, `S` alone for screenshot |
| `H` | History | Only conflicts on Firefox; use menu instead |

## Learning Mode

Press `?` (question mark) to show an overlay with shortcuts while you use the app.

---

**Pro Tip**: Print this page or keep it open in another tab while you explore the portfolio!

## Quick Reference Card

```
┌─────────────────────────────────────┐
│   ESSENTIAL SHORTCUTS               │
├─────────────────────────────────────┤
│  1-6    Camera views                │
│  H      High quality                │
│  F      Fullscreen                  │
│  ESC    Reset view                  │
│  I      Help                        │
│  SPACE  Pause animations            │
└─────────────────────────────────────┘
```

Copy this and paste it in a text file for offline reference!

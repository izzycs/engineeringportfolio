# Performance Guide

## Overview

The dev-room portfolio uses a sophisticated 3-tier quality system with automatic optimizations for different devices and performance capabilities.

## Quality Levels

### High Quality
- **Target**: Desktop with dedicated GPU
- **FPS Target**: 60 FPS
- **Features**:
  - 4K shadow maps (4096×4096)
  - 300+ dust particles
  - Caustics simulation
  - Screen backlight effects
  - Post-processing (color grading, vignette, chromatic aberration, FXAA)
  - Full LOD system (close: high detail)
  - 15 active light sources
  - Enhanced RGB keyboard effects
  - Contact shadows

### Medium Quality
- **Target**: Integrated graphics, older GPUs
- **FPS Target**: 30-60 FPS
- **Features**:
  - 2K shadow maps (2048×2048)
  - 150 dust particles
  - Screen glow enabled
  - LOD system (medium detail geometries)
  - 10 active light sources
  - Basic RGB effects
  - No post-processing

### Low Quality
- **Target**: Mobile devices, low-end hardware
- **FPS Target**: 30 FPS
- **Features**:
  - 512×512 shadow maps
  - 50 dust particles
  - Minimal lighting (5 sources)
  - LOD system (low detail geometries)
  - No caustics, no screen glow
  - No post-processing
  - Pixel ratio capped at 1

## Optimization Techniques

### 1. Level of Detail (LOD) System
Objects dynamically switch between 3 detail levels based on camera distance:
- **Close (< 5m)**: High poly count, all details
- **Medium (5-10m)**: Reduced poly count, simplified details
- **Far (> 10m)**: Minimal poly count, basic shapes

### 2. Instanced Rendering
Repeated objects use GPU instancing:
- Keyboard keys (single draw call for all 104 keys)
- Screws and bolts
- Book spines
- Particles

### 3. Frustum Culling
Objects outside the camera view are automatically hidden, reducing render load.

### 4. Texture Optimization
- Procedural textures generated at runtime (no image loading)
- Textures compressed to max 1024×1024 on low quality
- Anisotropic filtering: 16× (high), 4× (medium), 1× (low)

### 5. Shadow Optimization
- Shadow casters reduced on mobile
- Shadow map resolution scales with quality
- Contact shadows only on high quality

### 6. Material Simplification
- High quality: MeshPhysicalMaterial with clearcoat, transmission
- Medium/Low quality: MeshStandardMaterial only

### 7. Particle Systems
- Dust particles scale with quality setting
- Additive blending for minimal overdraw
- No depth writing for particles

## Performance Monitoring

The app includes a built-in performance monitor that tracks:
- **FPS**: Frames per second
- **Frame Time**: Milliseconds per frame
- **Memory**: Geometries + textures in GPU memory
- **Draw Calls**: Number of render passes per frame

### Auto Quality Adjustment
If FPS drops below 30 for 5+ seconds, quality automatically reduces:
- High → Medium → Low

To disable: Set `AUTO_ADJUST_QUALITY = false` in Scene.tsx

## Mobile Optimizations

### Device Detection
Automatically detects mobile devices and applies optimizations:
- Reduced particle count
- Lower shadow resolution
- Disabled post-processing
- Simplified materials
- Capped pixel ratio (prevents retina displays from overloading GPU)

### Touch Gestures
- Single finger: Rotate camera
- Two finger pinch: Zoom in/out
- Two finger pan: Move camera

### Haptics
- Subtle vibration feedback on interactions (if supported)

### Battery Considerations
- Low Power Mode detection (reduces quality)
- Frame rate throttling when backgrounded

## Desktop Optimizations

### Keyboard Shortcuts
All shortcuts are hardware-accelerated:
- `1-6`: Camera positions
- `H`: Toggle high quality
- `ESC`: Reset view
- `F`: Toggle fullscreen

### Multi-Monitor
Automatically adjusts for high DPI displays (Retina, 4K, etc.)

## Memory Management

### Geometry Disposal
All geometries properly disposed when:
- Quality level changes
- Components unmount
- Scene resets

### Texture Lifecycle
Procedural textures cached in memory:
- Created once per session
- Reused across material instances
- Disposed on quality change

### Material Pooling
Materials shared between similar objects:
- Single wood material for all wooden surfaces
- Single metal material for all metal parts

## Troubleshooting

### Issue: Low FPS on Desktop
**Solution**:
1. Check GPU driver updates
2. Ensure hardware acceleration enabled in browser
3. Close other GPU-intensive apps
4. Try Firefox or Chrome (better WebGL support than Safari)

### Issue: Stuttering on Mobile
**Solution**:
1. Close background apps
2. Enable Low Power Mode manually
3. Reduce quality in settings
4. Check if overheating (throttling may occur)

### Issue: High Memory Usage
**Solution**:
1. Reduce quality setting
2. Refresh page (clears texture cache)
3. Close other browser tabs

### Issue: Black Screen or WebGL Error
**Solution**:
1. Check browser console for errors
2. Ensure WebGL 2.0 support: [webglreport.com](https://webglreport.com)
3. Try different browser
4. Update GPU drivers

## Recommended Hardware

### Minimum (Low Quality - 30 FPS)
- **GPU**: Intel HD 4000 or equivalent
- **RAM**: 4GB
- **Browser**: Chrome 90+, Firefox 88+, Safari 14+

### Recommended (Medium Quality - 60 FPS)
- **GPU**: GTX 1050 / MX150 or equivalent
- **RAM**: 8GB
- **Browser**: Chrome 100+, Firefox 100+, Edge 100+

### Optimal (High Quality - 60 FPS)
- **GPU**: GTX 1660 / RTX 2060 or better
- **RAM**: 16GB
- **Browser**: Latest Chrome or Firefox

## Load Time Optimization

### Initial Load (<5 seconds on 3G)
- No external assets (everything procedural)
- Code splitting: Three.js lazy-loaded
- Vite optimizes dependencies
- Compression enabled on Vercel

### First Paint (<2 seconds)
- Loading screen renders immediately
- Progressive enhancement (scene loads in stages)

## Profiling

To profile performance:
1. Open browser DevTools
2. Go to Performance tab
3. Record 5-10 seconds of usage
4. Look for:
   - Long tasks (> 50ms)
   - Layout thrashing
   - Excessive garbage collection

## Future Optimizations (TODO)

- [ ] Web Workers for texture generation
- [ ] OffscreenCanvas for background rendering
- [ ] Compressed texture formats (KTX2)
- [ ] Level streaming (load room in chunks)
- [ ] Occlusion culling (hide objects blocked by walls)
- [ ] Temporal anti-aliasing (TAA)
- [ ] GPU-based particle system

## Best Practices for Contributors

When adding new objects:
1. **Always create LOD versions** (high, medium, low)
2. **Use instancing** for repeated elements
3. **Share materials** when possible
4. **Test on mobile** before committing
5. **Profile frame time** (should stay <16ms for 60fps)
6. **Avoid transparent materials** when possible (expensive)
7. **Use baked lighting** instead of dynamic where appropriate

## Benchmarks

Tested on:
- **MacBook Pro M1 (2021)**: 60 FPS high quality
- **iPhone 14 Pro**: 50-60 FPS medium quality
- **Dell XPS 13 (Intel Iris Xe)**: 45-60 FPS medium quality
- **Budget Android (Snapdragon 665)**: 30 FPS low quality
- **Desktop GTX 1660**: 60 FPS high quality

## Resources

- [Three.js Performance Tips](https://discoverthreejs.com/tips-and-tricks/)
- [WebGL Best Practices](https://developer.mozilla.org/en-US/docs/Web/API/WebGL_API/WebGL_best_practices)
- [React Three Fiber Optimization](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls)

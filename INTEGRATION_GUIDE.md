# Quick Integration Guide: Applying Realism Enhancements

This guide shows exactly how to apply the new realism features to existing components.

---

## 1. Enhanced Materials Integration

### Example: Update Desk.tsx

**Before:**
```tsx
import { woodOak } from './materials';

<mesh geometry={nodes.DeskTop.geometry}>
  <primitive object={woodOak} attach="material" />
</mesh>
```

**After:**
```tsx
import { enhancedWoodOak } from './proceduralMaterials';

<mesh geometry={nodes.DeskTop.geometry} castShadow receiveShadow>
  <primitive object={enhancedWoodOak} attach="material" />
</mesh>
```

### Material Mapping Guide

| Old Material | New Enhanced Material | Use For |
|-------------|----------------------|---------|
| `woodOak` | `enhancedWoodOak` | Desk top, light wood |
| `woodWalnut` | `enhancedWoodWalnut` | Bookshelf, dark wood |
| `woodDarkStained` | `enhancedWoodDarkStained` | Desk frame |
| `metalChrome` | `enhancedMetalChrome` | Chair base, hardware |
| `metalBrushedAluminum` | `enhancedMetalBrushedAluminum` | Monitor stands |
| `metalMatteBlack` | `enhancedMetalMatteBlack` | Monitor backs |
| `fabricMesh` | `enhancedFabricMesh` | Chair back mesh |
| `fabricSeat` | `enhancedFabricSeat` | Chair seat padding |
| `screenGlass` | `enhancedScreenGlass` | Monitor screens |
| `plasticGlossy` | `enhancedPlasticGlossy` | Keyboard, mouse |
| `plasticMatte` | `enhancedPlasticMatte` | Monitor bezels |

---

## 2. Animation Wrappers

### Example: Add Chair Sway

**In Scene.tsx:**

**Before:**
```tsx
<Chair />
```

**After:**
```tsx
import { ChairSway } from './SubtleAnimations';

<ChairSway position={[-1.5, 0, 1.5]}>
  <Chair />
</ChairSway>
```

### All Animation Wrappers

```tsx
// Chair with gentle sway
<ChairSway position={[-1.5, 0, 1.5]}>
  <Chair />
</ChairSway>

// Left monitor with wobble
<MonitorWobble position={[-0.5, 1, 2]} wobbleAmount={0.0008}>
  <LeftMonitor />
</MonitorWobble>

// Right monitor with wobble
<MonitorWobble position={[0.5, 1, 2]} wobbleAmount={0.0008}>
  <RightMonitor />
</MonitorWobble>

// Plant with leaf movement (if you add plants)
<PlantLeafMovement position={[2, 0.8, -2]} windStrength={0.002}>
  <Plant />
</PlantLeafMovement>

// Ceiling fan rotation (if not already rotating)
<FanRotation position={[0, 2.9, 0]} speed={0.5}>
  <CeilingFan />
</FanRotation>
```

---

## 3. Add Monitor Bezels

### Example: In Monitors.tsx

**Before:**
```tsx
export function Monitors() {
  return (
    <group>
      {/* Left Monitor */}
      <mesh position={[-0.5, 1.2, 2]} castShadow>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <primitive object={screenGlass} attach="material" />
      </mesh>
      
      {/* Right Monitor */}
      <mesh position={[0.5, 1.2, 2]} castShadow>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <primitive object={screenGlass} attach="material" />
      </mesh>
    </group>
  );
}
```

**After:**
```tsx
import { MonitorBezel } from './MonitorBezel';
import { enhancedScreenGlass } from './proceduralMaterials';

export function Monitors() {
  return (
    <group>
      {/* Left Monitor */}
      <MonitorBezel position={[-0.5, 1.2, 2]} width={1.6} height={0.9} />
      <mesh position={[-0.5, 1.2, 2.01]} castShadow>
        <boxGeometry args={[1.54, 0.84, 0.02]} />
        <primitive object={enhancedScreenGlass} attach="material" />
      </mesh>
      
      {/* Right Monitor */}
      <MonitorBezel position={[0.5, 1.2, 2]} width={1.6} height={0.9} />
      <mesh position={[0.5, 1.2, 2.01]} castShadow>
        <boxGeometry args={[1.54, 0.84, 0.02]} />
        <primitive object={enhancedScreenGlass} attach="material" />
      </mesh>
    </group>
  );
}
```

---

## 4. Replace Window Component

### In Scene.tsx

**Before:**
```tsx
import { Window } from './Window';

// In render
<Window />
```

**After:**
```tsx
import { EnhancedWindow } from './EnhancedWindow';

// In render
<EnhancedWindow />
```

**OR** if you want to keep the old Window logic, add enhanced skyline to existing:
```tsx
// Just import the skyline part and use it inside your existing Window component
```

---

## 5. Add Dust Particles in Light Beams

### In Scene.tsx or specific components

```tsx
import { LightBeamDust } from './SubtleAnimations';

// Add to render, placed where light beams would be
<LightBeamDust position={[0, 2, 2]} count={30} range={1.5} />
<LightBeamDust position={[-2, 2, -1]} count={20} range={1.2} />
<LightBeamDust position={[3, 2.5, -3]} count={25} range={1.3} />
```

---

## 6. Add Realistic Cables

### Example: Monitor power cables

```tsx
import { CableSag } from './SubtleAnimations';

// In Monitors.tsx or DeskProps.tsx
<CableSag 
  start={[-0.5, 1.2, 1.95]}    // Back of left monitor
  end={[-0.5, 0.85, 1.5]}      // Down to desk
  segments={16}
  sagAmount={0.15}
  color="#1A1A1A"
  thickness={0.01}
/>

<CableSag 
  start={[0.5, 1.2, 1.95]}     // Back of right monitor
  end={[0.5, 0.85, 1.5]}       // Down to desk
  segments={16}
  sagAmount={0.15}
  color="#1A1A1A"
  thickness={0.01}
/>
```

---

## 7. Enhanced Lighting (Already Done!)

The `EnhancedLighting` component is already integrated in `Scene.tsx`. No further action needed unless you want to tweak intensities:

```tsx
// Already in Scene.tsx
<EnhancedLighting />
```

To adjust, edit `src/three/EnhancedLighting.tsx` and modify:
- Point light intensities
- Directional light positions
- Dust particle count
- Spotlight angles

---

## Quick Integration Checklist

### Minimal Impact (30 min)
- [ ] Replace Window with EnhancedWindow
- [ ] Add ChairSway wrapper
- [ ] Add MonitorWobble wrappers

### Medium Impact (1 hour)
- [ ] Apply enhanced materials to Desk
- [ ] Apply enhanced materials to Chair
- [ ] Add MonitorBezel components

### Full Integration (2-3 hours)
- [ ] All enhanced materials applied
- [ ] All animation wrappers added
- [ ] Monitor bezels integrated
- [ ] Cables added with CableSag
- [ ] Light beam dust particles placed
- [ ] Test all camera positions
- [ ] Verify performance on mobile

---

## Testing After Each Integration

1. **After adding material:**
   ```bash
   npm run dev
   # Check object looks realistic
   # Verify no performance drop
   ```

2. **After adding animation:**
   ```bash
   npm run dev
   # Watch for smooth motion
   # Check FPS counter (add one in debug mode)
   ```

3. **After adding details:**
   ```bash
   npm run dev
   # Zoom in close to verify details visible
   # Check from all camera angles
   ```

---

## Rollback Plan

If any enhancement causes issues:

1. **Material issues:** Revert to old material import:
   ```tsx
   import { woodOak } from './materials';  // Old
   // instead of
   import { enhancedWoodOak } from './proceduralMaterials';  // New
   ```

2. **Animation issues:** Remove wrapper:
   ```tsx
   <Chair />  // Instead of <ChairSway><Chair /></ChairSway>
   ```

3. **Performance issues:** Disable dust particles:
   ```tsx
   // In EnhancedLighting.tsx, comment out:
   // {useShadows && <points ref={dustRef} ... />}
   ```

---

## Pro Tips

### Material Fine-Tuning
If a material doesn't look quite right, adjust parameters:
```tsx
const customWood = createRealisticWood('#B8906A', 0.75);  // Slightly rougher
```

### Animation Speed
Adjust animation speeds for your taste:
```tsx
<ChairSway wobbleAmount={0.0005}>  // More subtle
<MonitorWobble wobbleAmount={0.001}>  // More noticeable
```

### Performance Priority
If FPS drops:
1. Reduce dust particle count in `EnhancedLighting.tsx`
2. Lower normal map resolution in `proceduralMaterials.ts` (512 → 256)
3. Simplify cable segments: `segments={8}` instead of `16`

---

**Ready to integrate? Start with the "Minimal Impact" checklist first!**

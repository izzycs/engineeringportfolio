# Customization Guide

This guide explains how to customize your 3D Developer Room Portfolio.

## 📋 Content Updates

### Experience & Projects

**Location**: `src/data/`

#### Editing Experience (`experience.json`)

```json
{
  "id": "unique-id",           // Unique identifier
  "title": "Job Title",         // Your role
  "company": "Company Name",    // Employer
  "dates": "2023 — Present",    // Time period
  "bullets": [                  // Key achievements
    "Achievement 1",
    "Achievement 2"
  ],
  "tags": ["Skill", "Tech"]     // Relevant technologies
}
```

#### Editing Projects (`projects.json`)

```json
{
  "id": "project-id",           // Unique identifier
  "title": "Project Name",      // Project title
  "description": "Short desc",  // What it does
  "stack": ["React", "Node"],   // Tech stack
  "image": "/assets/proj.png",  // Thumbnail (TODO)
  "link": "https://...",        // Live URL
  "github": "https://github..." // Repo URL
}
```

### Contact Information

**Location**: `src/components/ContactForm.tsx`

**Line 18**: Replace email address
```typescript
window.location.href = `mailto:your.email@example.com?subject=${subject}&body=${body}`;
```

**Lines 81-91**: Update social links
```tsx
<a href="https://github.com/yourusername">GitHub</a>
<a href="https://linkedin.com/in/yourusername">LinkedIn</a>
```

### SEO & Metadata

**Location**: `index.html`

Update these meta tags:
- `<title>` — Page title
- `<meta name="description">` — Page description
- `<meta name="author">` — Your name
- `<meta property="og:*">` — Social media preview
- `<meta property="twitter:*">` — Twitter card

Don't forget to add:
- `/public/assets/og-image.png` — Social media preview image (1200×630px recommended)
- `/public/favicon.ico` — Browser tab icon

## 🎨 Visual Customization

### Colors & Materials

**Room Colors** (`src/three/RoomShell.tsx`):
```tsx
// Floor
<meshStandardMaterial color="#8B7355" /> // Wood brown

// Walls
<meshStandardMaterial color="#E8E4DC" /> // Off-white

// Ceiling
<meshStandardMaterial color="#F5F5F5" /> // Light gray
```

**Desk Color** (`src/three/Desk.tsx`):
```tsx
// Desk surface
<meshStandardMaterial color="#8B6F47" /> // Wood color

// Legs
<meshStandardMaterial color="#4A4A4A" /> // Dark gray metal
```

**Monitor Screens** (`src/three/Monitors.tsx`):
```tsx
// Change emissive color for glow effect
emissive={hovered ? '#3B82F6' : '#0F172A'}
```

### Camera Positions

**Location**: `src/store/useStore.ts`

Adjust `cameraPositions` object:
```typescript
export const cameraPositions: Record<CameraTarget, CameraPosition> = {
  default: {
    position: [0, 1.6, 5],    // [x, y, z] camera position
    target: [0, 1.2, 0],       // [x, y, z] look-at point
  },
  // ... other positions
};
```

**Tips**:
- Positive X = right, negative X = left
- Positive Y = up, negative Y = down
- Positive Z = forward (toward camera), negative Z = back

### Day/Night Cycle Colors

**Location**: `src/three/Window.tsx`

```typescript
const skyColors = {
  day: { top: '#87CEEB', bottom: '#E0F6FF' },
  golden: { top: '#FF6B35', bottom: '#FFD93D' },
  night: { top: '#0B1026', bottom: '#1A1F3A' },
};
```

**Cycle Speed** (in milliseconds per phase):
```typescript
15000 / cycleSpeed  // 15 seconds default
```

### Lighting

**Location**: `src/three/Scene.tsx`

```typescript
const lightConfigs = {
  day: { color: '#FFFFEE', intensity: 1.5, ambient: 0.6 },
  golden: { color: '#FFB366', intensity: 1.2, ambient: 0.4 },
  night: { color: '#5C7CFA', intensity: 0.4, ambient: 0.2 },
};
```

## 🏗️ Adding New Objects

### Basic Template

Create a new file in `src/three/YourObject.tsx`:

```tsx
import { useStore } from '../store/useStore';

export function YourObject() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={[x, y, z]}>
      <mesh castShadow={castShadow}>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial 
          color="#HEXCOLOR" 
          roughness={0.7} 
          metalness={0.3} 
        />
      </mesh>
    </group>
  );
}
```

### Available Geometries

From Three.js:
- `<boxGeometry>` — Rectangular box
- `<sphereGeometry>` — Sphere
- `<cylinderGeometry>` — Cylinder
- `<planeGeometry>` — Flat plane
- `<torusGeometry>` — Donut shape
- `<coneGeometry>` — Cone

From Drei:
- `<RoundedBox>` — Box with rounded edges
- `<Sphere>`, `<Box>`, `<Cylinder>` — Simplified helpers

### Material Properties

```tsx
<meshStandardMaterial
  color="#HEXCOLOR"      // Base color
  roughness={0.0-1.0}    // 0=smooth/reflective, 1=matte
  metalness={0.0-1.0}    // 0=non-metal, 1=metal
  emissive="#HEXCOLOR"   // Glow color
  emissiveIntensity={0.5} // Glow strength
/>
```

### Making Objects Clickable

```tsx
const setCameraTarget = useStore((state) => state.setCameraTarget);

<mesh
  onClick={() => setCameraTarget('yourTarget')}
  onPointerOver={(e) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
  }}
  onPointerOut={(e) => {
    e.stopPropagation();
    document.body.style.cursor = 'auto';
  }}
>
  {/* geometry & material */}
</mesh>
```

Don't forget to:
1. Add camera position in `useStore.ts`
2. Import and add `<YourObject />` to `Scene.tsx`

## 🎬 Animations

### Continuous Rotation

```tsx
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const meshRef = useRef<THREE.Mesh>(null);

useFrame((state) => {
  if (meshRef.current) {
    meshRef.current.rotation.y += 0.01; // Rotate on Y axis
  }
});

return <mesh ref={meshRef}>...</mesh>;
```

### Lerp (Smooth Transitions)

```tsx
import * as THREE from 'three';

useFrame(() => {
  if (groupRef.current) {
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,  // Current
      targetHeight,                  // Target
      0.05                          // Speed (0-1)
    );
  }
});
```

### Pulsing/Breathing Effect

```tsx
useFrame((state) => {
  if (meshRef.current) {
    const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    meshRef.current.scale.setScalar(scale);
  }
});
```

## 🎯 Performance Optimization

### Conditional Shadows

Always respect the quality setting:

```tsx
const quality = useStore((state) => state.quality);
const castShadow = quality === 'high';
const receiveShadow = quality === 'high';

<mesh castShadow={castShadow} receiveShadow={receiveShadow}>
```

### Geometry Simplification

For low-quality mode, reduce segment counts:

```tsx
const segments = quality === 'high' ? 32 : 16;
<cylinderGeometry args={[radius, radius, height, segments]} />
```

### Instance Meshes

For many identical objects (like books):

```tsx
import { Instances, Instance } from '@react-three/drei';

<Instances>
  <boxGeometry />
  <meshStandardMaterial />
  {books.map((book, i) => (
    <Instance key={i} position={book.position} />
  ))}
</Instances>
```

## 🖼️ Adding Images

### Project Thumbnails

1. Add images to `public/assets/`
2. Update `projects.json`:
   ```json
   "image": "/assets/my-project.png"
   ```
3. Images display in the modal when project is clicked

### Textures on 3D Objects

```tsx
import { useTexture } from '@react-three/drei';

const texture = useTexture('/assets/texture.png');

<meshStandardMaterial map={texture} />
```

## 🔧 Advanced: Custom Shaders

See `src/three/TV.tsx` for shader example.

Basic template:
```tsx
const material = useMemo(() => {
  return new THREE.ShaderMaterial({
    uniforms: {
      time: { value: 0 },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec2 vUv;
      void main() {
        vec3 color = vec3(vUv.x, vUv.y, sin(time));
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  });
}, []);

useFrame((state) => {
  material.uniforms.time.value = state.clock.elapsedTime;
});
```

## 🎓 Resources

- [Three.js Documentation](https://threejs.org/docs/)
- [React Three Fiber Docs](https://docs.pmnd.rs/react-three-fiber)
- [Drei Components](https://github.com/pmndrs/drei)
- [Zustand Guide](https://github.com/pmndrs/zustand)

## 💡 Tips

1. **Use the browser console** — Errors show up there
2. **Test on mobile** — Performance varies widely
3. **Keep it simple** — Fewer polygons = better performance
4. **Measure bundle size** — Run `npm run build` to check
5. **Version control** — Commit before major changes

---

Need help? Check the main [README.md](./README.md) or open an issue on GitHub.

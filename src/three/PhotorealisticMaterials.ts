import * as THREE from 'three';

/**
 * ROUND 9: PHOTOREALISTIC MATERIALS
 * Advanced material system with micro-details, subsurface scattering hints,
 * proper Fresnel reflections, and AAA-quality surface properties
 */

// ===== ADVANCED TEXTURE GENERATORS =====

/**
 * Generate fingerprint smudges (very subtle)
 */
function generateFingerprints(
  width: number = 1024,
  height: number = 1024
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  
  // Add 3-5 very subtle fingerprint smudges
  const numSmudges = 3 + Math.floor(Math.random() * 3);
  for (let i = 0; i < numSmudges; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const size = 40 + Math.random() * 80;
    
    const gradient = ctx.createRadialGradient(x, y, 0, x, y, size);
    gradient.addColorStop(0, `rgba(200, 200, 200, ${0.02 + Math.random() * 0.03})`);
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x - size, y - size, size * 2, size * 2);
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate dust accumulation map
 */
function generateDustMap(
  width: number = 512,
  height: number = 512,
  density: number = 0.3
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  
  const noise = (x: number, y: number): number => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (n - Math.floor(n));
  };
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const nx = x / width;
      const ny = y / height;
      
      let dust = noise(nx * 20, ny * 20) * 0.5;
      dust += noise(nx * 50, ny * 50) * 0.25;
      dust += noise(nx * 100, ny * 100) * 0.125;
      
      const dustValue = Math.floor((dust * density) * 40); // Very subtle
      
      imageData.data[idx] = dustValue;
      imageData.data[idx + 1] = dustValue;
      imageData.data[idx + 2] = dustValue;
      imageData.data[idx + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate micro-scratches for desk surface
 */
function generateMicroScratches(
  width: number = 1024,
  height: number = 1024,
  density: number = 50
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);
  
  // Micro scratches
  for (let i = 0; i < density; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const length = 5 + Math.random() * 30;
    const angle = Math.random() * Math.PI * 2;
    const opacity = 0.1 + Math.random() * 0.2;
    
    ctx.strokeStyle = `rgba(${90 + Math.random() * 30}, ${90 + Math.random() * 30}, ${90 + Math.random() * 30}, ${opacity})`;
    ctx.lineWidth = 0.3 + Math.random() * 0.7;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length);
    ctx.stroke();
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate coffee ring stain
 */
function generateCoffeeRing(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 256, 256);
  
  // Coffee ring
  const centerX = 128;
  const centerY = 128;
  const radius = 40;
  
  // Outer ring (darker)
  ctx.strokeStyle = 'rgba(101, 67, 33, 0.3)';
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
  ctx.stroke();
  
  // Inner stain (lighter)
  const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius - 5);
  gradient.addColorStop(0, 'rgba(101, 67, 33, 0.08)');
  gradient.addColorStop(1, 'rgba(101, 67, 33, 0)');
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate wear marks (for chair armrests, keyboard spacebar)
 */
function generateWearPattern(
  width: number = 512,
  height: number = 512,
  wearAmount: number = 0.3
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  // Base dark
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, width, height);
  
  // Wear pattern (lighter in center where touched most)
  const gradient = ctx.createRadialGradient(
    width / 2, height / 2, 0,
    width / 2, height / 2, width * 0.4
  );
  gradient.addColorStop(0, `rgba(255, 255, 255, ${wearAmount})`);
  gradient.addColorStop(0.7, `rgba(255, 255, 255, ${wearAmount * 0.3})`);
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate screen burn-in (very subtle CRT-like effect)
 */
function generateScreenBurnIn(): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, 512, 512);
  
  // Very subtle rectangular pattern (like old terminal windows)
  ctx.strokeStyle = 'rgba(100, 200, 255, 0.02)';
  ctx.lineWidth = 1;
  ctx.strokeRect(50, 50, 412, 350);
  ctx.strokeRect(52, 52, 408, 346);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

/**
 * Enhanced normal map with multiple octaves
 */
function generateEnhancedNormalMap(
  width: number = 1024,
  height: number = 1024,
  strength: number = 1.0
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  
  const noise = (x: number, y: number): number => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (n - Math.floor(n));
  };
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const nx = x / width;
      const ny = y / height;
      
      // Multi-octave noise for realistic surface detail
      let value = 0;
      value += noise(nx * 8, ny * 8) * 0.5;
      value += noise(nx * 16, ny * 16) * 0.25;
      value += noise(nx * 32, ny * 32) * 0.125;
      value += noise(nx * 64, ny * 64) * 0.0625;
      value += noise(nx * 128, ny * 128) * 0.03125;
      
      const normalVal = 128 + (value - 0.5) * strength * 127;
      
      imageData.data[idx] = normalVal;
      imageData.data[idx + 1] = normalVal;
      imageData.data[idx + 2] = 255;
      imageData.data[idx + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

// ===== PHOTOREALISTIC MATERIAL CREATORS =====

/**
 * Plant leaves with subsurface scattering hint (translucent)
 */
export function createPlantLeafMaterial(): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: '#2D5016',
    roughness: 0.4,
    metalness: 0.0,
    transmission: 0.1, // Allows light to pass through
    thickness: 0.5,
    envMapIntensity: 0.3,
    // Subsurface scattering approximation
    clearcoat: 0.1,
    clearcoatRoughness: 0.5,
  });
}

/**
 * Screen glass with proper Fresnel reflections
 */
export function createScreenGlassMaterial(): THREE.MeshPhysicalMaterial {
  const fingerprints = generateFingerprints();
  const burnIn = generateScreenBurnIn();
  
  return new THREE.MeshPhysicalMaterial({
    color: '#0A0A0A',
    roughness: 0.05,
    metalness: 0.0,
    envMapIntensity: 1.5,
    clearcoat: 1.0, // Strong glass coating
    clearcoatRoughness: 0.05,
    reflectivity: 1.0,
    alphaMap: fingerprints, // Very subtle fingerprints
    emissiveMap: burnIn,
    emissive: new THREE.Color('#1A2A3A'),
    emissiveIntensity: 0.02,
  });
}

/**
 * Desk surface with micro-scratches and fingerprints
 */
export function createDeskSurfaceMaterial(): THREE.MeshStandardMaterial {
  const scratches = generateMicroScratches(1024, 1024, 80);
  const dust = generateDustMap(512, 512, 0.2);
  const normalMap = generateEnhancedNormalMap(1024, 1024, 0.4);
  
  return new THREE.MeshStandardMaterial({
    color: '#B8906A',
    roughness: 0.3,
    metalness: 0.0,
    roughnessMap: scratches,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.3, 0.3),
    aoMap: dust,
    aoMapIntensity: 0.5,
    envMapIntensity: 0.6,
  });
}

/**
 * Chair fabric with normal map simulation
 */
export function createChairFabricMaterial(): THREE.MeshStandardMaterial {
  const wear = generateWearPattern(512, 512, 0.25);
  const normalMap = generateEnhancedNormalMap(512, 512, 1.2);
  
  return new THREE.MeshStandardMaterial({
    color: '#1A1A1A',
    roughness: 0.9,
    metalness: 0.0,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.8, 0.8),
    roughnessMap: wear, // Shinier where worn
    envMapIntensity: 0.15,
  });
}

/**
 * Book pages with realistic thickness feel
 */
export function createBookPagesMaterial(): THREE.MeshStandardMaterial {
  const normalMap = generateEnhancedNormalMap(256, 256, 0.6);
  
  return new THREE.MeshStandardMaterial({
    color: '#F5F1E8',
    roughness: 0.85,
    metalness: 0.0,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.4, 0.4),
    envMapIntensity: 0.1,
    side: THREE.DoubleSide,
  });
}

/**
 * Ceramic mug with proper glaze reflection
 */
export function createCeramicMugMaterial(): THREE.MeshPhysicalMaterial {
  const normalMap = generateEnhancedNormalMap(512, 512, 0.3);
  
  return new THREE.MeshPhysicalMaterial({
    color: '#E8E0D5',
    roughness: 0.2,
    metalness: 0.0,
    clearcoat: 0.6, // Glaze effect
    clearcoatRoughness: 0.2,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
    envMapIntensity: 0.8,
  });
}

/**
 * Metal surfaces with environment reflection intensity adjustment
 */
export function createPhotorealisticMetal(
  baseColor: string = '#C0C0C0',
  roughness: number = 0.15,
  scratchDensity: number = 0.3
): THREE.MeshStandardMaterial {
  const scratches = generateMicroScratches(1024, 1024, scratchDensity * 100);
  const normalMap = generateEnhancedNormalMap(1024, 1024, 0.5);
  
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: roughness,
    metalness: 0.98,
    roughnessMap: scratches,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.3, 0.3),
    envMapIntensity: 1.5,
  });
}

/**
 * Keyboard key with wear on spacebar
 */
export function createKeyboardKeyMaterial(isSpacebar: boolean = false): THREE.MeshStandardMaterial {
  const wear = isSpacebar ? generateWearPattern(256, 256, 0.4) : null;
  const normalMap = generateEnhancedNormalMap(256, 256, 0.3);
  
  return new THREE.MeshStandardMaterial({
    color: '#2A2A2A',
    roughness: isSpacebar ? 0.4 : 0.3, // Spacebar shinier from use
    metalness: 0.1,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
    ...(wear && { roughnessMap: wear }),
    envMapIntensity: 0.5,
  });
}

/**
 * Desk with coffee ring stain
 */
export function createDeskWithCoffeeStain(): THREE.MeshStandardMaterial {
  const scratches = generateMicroScratches(1024, 1024, 80);
  const coffeeRing = generateCoffeeRing();
  const normalMap = generateEnhancedNormalMap(1024, 1024, 0.4);
  
  return new THREE.MeshStandardMaterial({
    color: '#B8906A',
    roughness: 0.3,
    metalness: 0.0,
    roughnessMap: scratches,
    alphaMap: coffeeRing,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.3, 0.3),
    envMapIntensity: 0.6,
  });
}

// ===== EXPORTS =====

export const photoMaterials = {
  plantLeaf: createPlantLeafMaterial(),
  screenGlass: createScreenGlassMaterial(),
  deskSurface: createDeskSurfaceMaterial(),
  chairFabric: createChairFabricMaterial(),
  bookPages: createBookPagesMaterial(),
  ceramicMug: createCeramicMugMaterial(),
  chromePhotorealistic: createPhotorealisticMetal('#C0C0C0', 0.12, 0.25),
  aluminumPhotorealistic: createPhotorealisticMetal('#A8A8A8', 0.28, 0.35),
  keyboardKey: createKeyboardKeyMaterial(false),
  keyboardSpacebar: createKeyboardKeyMaterial(true),
  deskWithStain: createDeskWithCoffeeStain(),
};

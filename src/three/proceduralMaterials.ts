import * as THREE from 'three';

/**
 * Enhanced procedural materials with micro-detail and realistic textures
 * Uses noise functions and custom shaders for added realism
 */

// ===== PROCEDURAL TEXTURE GENERATORS =====

/**
 * Generate a noise-based normal map for surface micro-detail
 */
function generateNoiseNormalMap(
  width: number = 512, 
  height: number = 512, 
  strength: number = 1.0
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  
  // Simple noise function
  const noise = (x: number, y: number): number => {
    const n = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
    return (n - Math.floor(n));
  };
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const nx = x / width;
      const ny = y / height;
      
      // Multi-octave noise
      let value = 0;
      value += noise(nx * 8, ny * 8) * 0.5;
      value += noise(nx * 16, ny * 16) * 0.25;
      value += noise(nx * 32, ny * 32) * 0.125;
      value += noise(nx * 64, ny * 64) * 0.0625;
      
      const normalVal = 128 + (value - 0.5) * strength * 127;
      
      imageData.data[idx] = normalVal;     // R
      imageData.data[idx + 1] = normalVal; // G
      imageData.data[idx + 2] = 255;       // B (pointing up)
      imageData.data[idx + 3] = 255;       // A
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.needsUpdate = true;
  return texture;
}

/**
 * Generate wood grain texture
 */
function generateWoodGrain(
  width: number = 512,
  height: number = 512,
  baseColor: THREE.Color,
  grainStrength: number = 0.15
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
      
      // Vertical grain pattern
      let grain = Math.sin(nx * 80 + noise(nx * 5, ny * 5) * 10) * 0.5 + 0.5;
      grain = grain * grainStrength;
      
      // Add noise detail
      const detail = noise(nx * 40, ny * 40) * 0.1;
      const finalGrain = grain + detail;
      
      const r = Math.floor(baseColor.r * 255 * (1 - finalGrain));
      const g = Math.floor(baseColor.g * 255 * (1 - finalGrain));
      const b = Math.floor(baseColor.b * 255 * (1 - finalGrain));
      
      imageData.data[idx] = r;
      imageData.data[idx + 1] = g;
      imageData.data[idx + 2] = b;
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
 * Generate metal scratch/wear texture
 */
function generateMetalWear(
  width: number = 512,
  height: number = 512,
  scratchDensity: number = 0.3
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, width, height);
  
  // Add scratches
  const numScratches = Math.floor(scratchDensity * 100);
  for (let i = 0; i < numScratches; i++) {
    const x = Math.random() * width;
    const y = Math.random() * height;
    const length = 10 + Math.random() * 40;
    const angle = Math.random() * Math.PI * 2;
    
    ctx.strokeStyle = `rgba(${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${100 + Math.random() * 50}, ${0.3 + Math.random() * 0.4})`;
    ctx.lineWidth = 0.5 + Math.random() * 1.5;
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
 * Generate fabric weave pattern
 */
function generateFabricWeave(
  width: number = 512,
  height: number = 512,
  baseColor: THREE.Color
): THREE.Texture {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const imageData = ctx.createImageData(width, height);
  
  const weaveSize = 4;
  
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      
      const weaveX = Math.floor(x / weaveSize) % 2;
      const weaveY = Math.floor(y / weaveSize) % 2;
      const isWarp = weaveX === weaveY;
      
      const brightness = isWarp ? 1.0 : 0.85;
      const noise = Math.random() * 0.05;
      const final = brightness + noise;
      
      imageData.data[idx] = Math.floor(baseColor.r * 255 * final);
      imageData.data[idx + 1] = Math.floor(baseColor.g * 255 * final);
      imageData.data[idx + 2] = Math.floor(baseColor.b * 255 * final);
      imageData.data[idx + 3] = 255;
    }
  }
  
  ctx.putImageData(imageData, 0, 0);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(8, 8);
  texture.needsUpdate = true;
  return texture;
}

// ===== ENHANCED MATERIAL PRESETS =====

/**
 * Enhanced wood with grain detail
 */
export function createRealisticWood(
  baseColorHex: string = '#B8906A',
  roughness: number = 0.7
): THREE.MeshStandardMaterial {
  const baseColor = new THREE.Color(baseColorHex);
  const grainTexture = generateWoodGrain(512, 512, baseColor, 0.15);
  const normalMap = generateNoiseNormalMap(512, 512, 0.3);
  
  return new THREE.MeshStandardMaterial({
    color: baseColorHex,
    map: grainTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.3, 0.3),
    roughness: roughness,
    metalness: 0.0,
    envMapIntensity: 0.4,
  });
}

/**
 * Enhanced metal with scratches and wear
 */
export function createRealisticMetal(
  baseColorHex: string = '#C0C0C0',
  roughness: number = 0.2,
  scratchIntensity: number = 0.3
): THREE.MeshStandardMaterial {
  const wearTexture = generateMetalWear(512, 512, scratchIntensity);
  const normalMap = generateNoiseNormalMap(512, 512, 0.5);
  
  return new THREE.MeshStandardMaterial({
    color: baseColorHex,
    roughnessMap: wearTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.2, 0.2),
    roughness: roughness,
    metalness: 0.95,
    envMapIntensity: 1.2,
  });
}

/**
 * Enhanced fabric with weave pattern
 */
export function createRealisticFabric(
  baseColorHex: string = '#2C2C2C',
  roughness: number = 0.9
): THREE.MeshStandardMaterial {
  const baseColor = new THREE.Color(baseColorHex);
  const weaveTexture = generateFabricWeave(512, 512, baseColor);
  const normalMap = generateNoiseNormalMap(512, 512, 0.8);
  
  return new THREE.MeshStandardMaterial({
    color: baseColorHex,
    map: weaveTexture,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.5, 0.5),
    roughness: roughness,
    metalness: 0.0,
    envMapIntensity: 0.15,
  });
}

/**
 * Enhanced screen with realistic reflections
 */
export function createRealisticScreen(
  baseColorHex: string = '#0A0A0A'
): THREE.MeshPhysicalMaterial {
  return new THREE.MeshPhysicalMaterial({
    color: baseColorHex,
    roughness: 0.05,
    metalness: 0.0,
    envMapIntensity: 1.2,
    clearcoat: 0.3,
    clearcoatRoughness: 0.1,
  });
}

/**
 * Enhanced plastic with micro-detail
 */
export function createRealisticPlastic(
  baseColorHex: string = '#2A2A2A',
  isGlossy: boolean = false
): THREE.MeshStandardMaterial {
  const normalMap = generateNoiseNormalMap(256, 256, 0.15);
  
  return new THREE.MeshStandardMaterial({
    color: baseColorHex,
    normalMap: normalMap,
    normalScale: new THREE.Vector2(0.1, 0.1),
    roughness: isGlossy ? 0.2 : 0.7,
    metalness: isGlossy ? 0.1 : 0.0,
    envMapIntensity: isGlossy ? 0.8 : 0.3,
  });
}

// Export individual enhanced materials
export const enhancedWoodOak = createRealisticWood('#B8906A', 0.7);
export const enhancedWoodWalnut = createRealisticWood('#5C4A3D', 0.65);
export const enhancedWoodDarkStained = createRealisticWood('#3D3226', 0.6);

export const enhancedMetalChrome = createRealisticMetal('#C0C0C0', 0.15, 0.2);
export const enhancedMetalBrushedAluminum = createRealisticMetal('#A8A8A8', 0.3, 0.4);
export const enhancedMetalMatteBlack = createRealisticMetal('#1A1A1A', 0.4, 0.3);

export const enhancedFabricMesh = createRealisticFabric('#2C2C2C', 0.95);
export const enhancedFabricSeat = createRealisticFabric('#1A1A1A', 0.9);

export const enhancedScreenGlass = createRealisticScreen('#0A0A0A');
export const enhancedPlasticGlossy = createRealisticPlastic('#2A2A2A', true);
export const enhancedPlasticMatte = createRealisticPlastic('#3A3A3A', false);

import * as THREE from 'three';

/**
 * Reusable realistic material library
 * All materials are procedural - no external textures
 */

// ===== WOOD MATERIALS =====

export const woodOak = new THREE.MeshStandardMaterial({
  color: '#B8906A',
  roughness: 0.7,
  metalness: 0.0,
  envMapIntensity: 0.3,
});

export const woodWalnut = new THREE.MeshStandardMaterial({
  color: '#5C4A3D',
  roughness: 0.65,
  metalness: 0.0,
  envMapIntensity: 0.4,
});

export const woodPine = new THREE.MeshStandardMaterial({
  color: '#D4B896',
  roughness: 0.75,
  metalness: 0.0,
  envMapIntensity: 0.25,
});

export const woodDarkStained = new THREE.MeshStandardMaterial({
  color: '#3D3226',
  roughness: 0.6,
  metalness: 0.0,
  envMapIntensity: 0.5,
});

// ===== METAL MATERIALS =====

export const metalChrome = new THREE.MeshStandardMaterial({
  color: '#C0C0C0',
  roughness: 0.1,
  metalness: 1.0,
  envMapIntensity: 1.2,
});

export const metalBrushedAluminum = new THREE.MeshStandardMaterial({
  color: '#A8A8A8',
  roughness: 0.3,
  metalness: 0.9,
  envMapIntensity: 0.8,
});

export const metalMatteBlack = new THREE.MeshStandardMaterial({
  color: '#1A1A1A',
  roughness: 0.4,
  metalness: 0.7,
  envMapIntensity: 0.5,
});

export const metalGunmetal = new THREE.MeshStandardMaterial({
  color: '#4A4A4A',
  roughness: 0.35,
  metalness: 0.8,
  envMapIntensity: 0.7,
});

export const metalBrass = new THREE.MeshStandardMaterial({
  color: '#B5A642',
  roughness: 0.25,
  metalness: 0.85,
  envMapIntensity: 0.9,
});

// ===== PLASTIC MATERIALS =====

export const plasticGlossy = new THREE.MeshStandardMaterial({
  color: '#2A2A2A',
  roughness: 0.2,
  metalness: 0.1,
  envMapIntensity: 0.6,
});

export const plasticMatte = new THREE.MeshStandardMaterial({
  color: '#3A3A3A',
  roughness: 0.8,
  metalness: 0.0,
  envMapIntensity: 0.2,
});

export const plasticABS = new THREE.MeshStandardMaterial({
  color: '#1A1A1A',
  roughness: 0.5,
  metalness: 0.05,
  envMapIntensity: 0.4,
});

export const plasticWhiteGlossy = new THREE.MeshStandardMaterial({
  color: '#F5F5F5',
  roughness: 0.15,
  metalness: 0.1,
  envMapIntensity: 0.7,
});

export const plasticWhiteMatte = new THREE.MeshStandardMaterial({
  color: '#E8E8E8',
  roughness: 0.7,
  metalness: 0.0,
  envMapIntensity: 0.3,
});

// ===== FABRIC & SOFT MATERIALS =====

export const fabricMesh = new THREE.MeshStandardMaterial({
  color: '#2C2C2C',
  roughness: 0.95,
  metalness: 0.0,
  envMapIntensity: 0.1,
});

export const fabricSeat = new THREE.MeshStandardMaterial({
  color: '#1A1A1A',
  roughness: 0.9,
  metalness: 0.0,
  envMapIntensity: 0.15,
});

export const padding = new THREE.MeshStandardMaterial({
  color: '#2A2A2A',
  roughness: 0.85,
  metalness: 0.0,
  envMapIntensity: 0.2,
});

// ===== GLASS & SCREEN MATERIALS =====

export const glass = new THREE.MeshStandardMaterial({
  color: '#FFFFFF',
  roughness: 0.05,
  metalness: 0.1,
  transparent: true,
  opacity: 0.3,
  envMapIntensity: 1.5,
});

export const screenGlass = new THREE.MeshStandardMaterial({
  color: '#0A0A0A',
  roughness: 0.1,
  metalness: 0.0,
  envMapIntensity: 1.0,
});

// ===== CERAMIC & CLAY =====

export const ceramic = new THREE.MeshStandardMaterial({
  color: '#E8E0D5',
  roughness: 0.3,
  metalness: 0.0,
  envMapIntensity: 0.5,
});

export const terracotta = new THREE.MeshStandardMaterial({
  color: '#C66B4A',
  roughness: 0.8,
  metalness: 0.0,
  envMapIntensity: 0.2,
});

// ===== RUBBER & SOFT PLASTICS =====

export const rubber = new THREE.MeshStandardMaterial({
  color: '#1A1A1A',
  roughness: 0.9,
  metalness: 0.0,
  envMapIntensity: 0.1,
});

export const rubberWheel = new THREE.MeshStandardMaterial({
  color: '#2A2A2A',
  roughness: 0.95,
  metalness: 0.0,
  envMapIntensity: 0.05,
});

// ===== PAINTED SURFACES =====

export const paintMatte = new THREE.MeshStandardMaterial({
  color: '#E8E4DC',
  roughness: 0.9,
  metalness: 0.0,
  envMapIntensity: 0.15,
});

export const paintSemiGloss = new THREE.MeshStandardMaterial({
  color: '#F0EDE5',
  roughness: 0.4,
  metalness: 0.0,
  envMapIntensity: 0.4,
});

// ===== SPECIAL MATERIALS =====

export const basketball = new THREE.MeshStandardMaterial({
  color: '#E67E22',
  roughness: 0.85,
  metalness: 0.0,
  envMapIntensity: 0.2,
});

export const carpet = new THREE.MeshStandardMaterial({
  color: '#8B8B7A',
  roughness: 0.95,
  metalness: 0.0,
  envMapIntensity: 0.1,
});

// ===== HELPER FUNCTIONS =====

/**
 * Create a wood material with subtle variations
 */
export function createWoodVariant(baseColor: string, roughness: number = 0.7): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: roughness,
    metalness: 0.0,
    envMapIntensity: 0.3,
  });
}

/**
 * Create a metal material with custom properties
 */
export function createMetalVariant(baseColor: string, roughness: number = 0.3): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: roughness,
    metalness: 0.9,
    envMapIntensity: 1.0,
  });
}

/**
 * Create a plastic material with custom properties
 */
export function createPlasticVariant(baseColor: string, isGlossy: boolean = false): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color: baseColor,
    roughness: isGlossy ? 0.2 : 0.7,
    metalness: isGlossy ? 0.1 : 0.0,
    envMapIntensity: isGlossy ? 0.6 : 0.2,
  });
}

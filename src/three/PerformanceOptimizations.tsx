import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

/**
 * ROUND 9: PERFORMANCE OPTIMIZATIONS
 * LOD system, instancing, frustum culling, and mobile optimizations
 */

// ===== LOD (LEVEL OF DETAIL) SYSTEM =====

export interface LODMeshProps {
  position?: [number, number, number];
  rotation?: [number, number, number];
  highDetail: THREE.BufferGeometry;
  mediumDetail: THREE.BufferGeometry;
  lowDetail: THREE.BufferGeometry;
  material: THREE.Material | THREE.Material[];
  lodDistances?: [number, number]; // [medium, low] distances
}

/**
 * LOD mesh that switches detail based on camera distance
 */
export function LODMesh({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  highDetail,
  mediumDetail,
  lowDetail,
  material,
  lodDistances = [5, 10],
}: LODMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const quality = useStore((state) => state.quality);
  
  useFrame(({ camera }) => {
    if (!meshRef.current) return;
    
    // Force LOD based on quality setting
    if (quality === 'low') {
      meshRef.current.geometry = lowDetail;
      return;
    }
    
    if (quality === 'medium') {
      meshRef.current.geometry = mediumDetail;
      return;
    }
    
    // High quality: use distance-based LOD
    const distance = camera.position.distanceTo(meshRef.current.position);
    
    if (distance < lodDistances[0]) {
      meshRef.current.geometry = highDetail;
    } else if (distance < lodDistances[1]) {
      meshRef.current.geometry = mediumDetail;
    } else {
      meshRef.current.geometry = lowDetail;
    }
  });
  
  return (
    <mesh
      ref={meshRef}
      position={position}
      rotation={rotation}
      geometry={highDetail}
      material={material}
      castShadow
      receiveShadow
    />
  );
}

// ===== INSTANCED MESH HELPER =====

interface InstancedObjectProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
  positions: [number, number, number][];
  rotations?: [number, number, number][];
  scales?: [number, number, number][];
}

/**
 * Create instanced mesh for repeated objects (keys, screws, etc.)
 */
export function InstancedObject({
  geometry,
  material,
  positions,
  rotations,
  scales,
}: InstancedObjectProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  
  useMemo(() => {
    if (!meshRef.current) return;
    
    const dummy = new THREE.Object3D();
    
    positions.forEach((position, i) => {
      dummy.position.set(...position);
      
      if (rotations && rotations[i]) {
        dummy.rotation.set(...rotations[i]);
      }
      
      if (scales && scales[i]) {
        dummy.scale.set(...scales[i]);
      } else {
        dummy.scale.set(1, 1, 1);
      }
      
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    
    meshRef.current.instanceMatrix.needsUpdate = true;
  }, [positions, rotations, scales]);
  
  return (
    <instancedMesh
      ref={meshRef}
      args={[geometry, material, positions.length]}
      castShadow
      receiveShadow
    />
  );
}

// ===== FRUSTUM CULLING HELPER =====

/**
 * Helper to manually control frustum culling for specific objects
 */
export function useFrustumCulling(
  meshRef: React.RefObject<THREE.Mesh>,
  enabled: boolean = true
) {
  useFrame(({ camera }) => {
    if (!meshRef.current || !enabled) return;
    
    const frustum = new THREE.Frustum();
    const matrix = new THREE.Matrix4().multiplyMatrices(
      camera.projectionMatrix,
      camera.matrixWorldInverse
    );
    frustum.setFromProjectionMatrix(matrix);
    
    meshRef.current.visible = frustum.intersectsObject(meshRef.current);
  });
}

// ===== MOBILE OPTIMIZATIONS =====

/**
 * Get optimized settings based on device capability
 */
export function useDeviceOptimizations() {
  const quality = useStore((state) => state.quality);
  const isMobile = useMemo(() => {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  }, []);
  
  const optimizedSettings = useMemo(() => {
    const isLowPower = isMobile && quality === 'low';
    
    return {
      isMobile,
      shadowMapSize: isLowPower ? 512 : quality === 'high' ? 4096 : 2048,
      particleCount: isLowPower ? 50 : quality === 'high' ? 300 : 150,
      enablePostProcessing: !isLowPower && quality === 'high',
      enableCaustics: quality === 'high',
      enableScreenGlow: quality !== 'low',
      anisotropy: isLowPower ? 1 : quality === 'high' ? 16 : 4,
      pixelRatio: isLowPower ? 1 : Math.min(window.devicePixelRatio, 2),
      maxLights: isLowPower ? 5 : quality === 'high' ? 15 : 10,
    };
  }, [isMobile, quality]);
  
  return optimizedSettings;
}

// ===== TEXTURE COMPRESSION =====

/**
 * Compress canvas texture to reduce memory
 */
export function compressCanvasTexture(
  canvas: HTMLCanvasElement,
  maxSize: number = 1024
): THREE.CanvasTexture {
  // Resize if too large
  if (canvas.width > maxSize || canvas.height > maxSize) {
    const scale = maxSize / Math.max(canvas.width, canvas.height);
    const newCanvas = document.createElement('canvas');
    newCanvas.width = Math.floor(canvas.width * scale);
    newCanvas.height = Math.floor(canvas.height * scale);
    
    const ctx = newCanvas.getContext('2d')!;
    ctx.drawImage(canvas, 0, 0, newCanvas.width, newCanvas.height);
    
    const texture = new THREE.CanvasTexture(newCanvas);
    texture.needsUpdate = true;
    return texture;
  }
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

// ===== GEOMETRY LOD GENERATORS =====

/**
 * Generate three LOD levels for a box
 */
export function createBoxLODs(
  width: number,
  height: number,
  depth: number
): [THREE.BufferGeometry, THREE.BufferGeometry, THREE.BufferGeometry] {
  const high = new THREE.BoxGeometry(width, height, depth, 4, 4, 4);
  const medium = new THREE.BoxGeometry(width, height, depth, 2, 2, 2);
  const low = new THREE.BoxGeometry(width, height, depth, 1, 1, 1);
  
  return [high, medium, low];
}

/**
 * Generate three LOD levels for a cylinder
 */
export function createCylinderLODs(
  radiusTop: number,
  radiusBottom: number,
  height: number
): [THREE.BufferGeometry, THREE.BufferGeometry, THREE.BufferGeometry] {
  const high = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 32, 8);
  const medium = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 16, 4);
  const low = new THREE.CylinderGeometry(radiusTop, radiusBottom, height, 8, 1);
  
  return [high, medium, low];
}

/**
 * Generate three LOD levels for a sphere
 */
export function createSphereLODs(
  radius: number
): [THREE.BufferGeometry, THREE.BufferGeometry, THREE.BufferGeometry] {
  const high = new THREE.SphereGeometry(radius, 32, 32);
  const medium = new THREE.SphereGeometry(radius, 16, 16);
  const low = new THREE.SphereGeometry(radius, 8, 8);
  
  return [high, medium, low];
}

// ===== PERFORMANCE MONITORING =====

interface PerformanceStats {
  fps: number;
  frameTime: number;
  memory: number;
  drawCalls: number;
}

/**
 * Monitor and return performance stats
 */
export function usePerformanceMonitor(): PerformanceStats {
  const statsRef = useRef<PerformanceStats>({
    fps: 60,
    frameTime: 16.67,
    memory: 0,
    drawCalls: 0,
  });
  
  const lastTime = useRef<number>(performance.now());
  const frames = useRef<number>(0);
  
  useFrame(({ gl }) => {
    frames.current++;
    
    const now = performance.now();
    const delta = now - lastTime.current;
    
    // Update stats every second
    if (delta >= 1000) {
      statsRef.current.fps = Math.round((frames.current / delta) * 1000);
      statsRef.current.frameTime = delta / frames.current;
      
      // @ts-ignore - WebGL memory extension
      const memoryInfo = gl.info?.memory;
      if (memoryInfo) {
        statsRef.current.memory = memoryInfo.geometries + memoryInfo.textures;
      }
      
      statsRef.current.drawCalls = gl.info.render.calls;
      
      frames.current = 0;
      lastTime.current = now;
    }
  });
  
  return statsRef.current;
}

// ===== AUTO QUALITY ADJUSTMENT =====

/**
 * Automatically adjust quality based on FPS
 */
export function useAutoQualityAdjust(targetFPS: number = 30) {
  const stats = usePerformanceMonitor();
  const setQuality = useStore((state) => state.setQuality);
  const lastAdjustTime = useRef<number>(0);
  
  useFrame(() => {
    const now = Date.now();
    
    // Only adjust every 5 seconds
    if (now - lastAdjustTime.current < 5000) return;
    
    lastAdjustTime.current = now;
    
    // If FPS is consistently below target, reduce quality
    if (stats.fps < targetFPS && stats.fps > 0) {
      const currentQuality = useStore.getState().quality;
      
      if (currentQuality === 'high') {
        setQuality('medium');
        console.log('Auto-adjusted quality to medium');
      } else if (currentQuality === 'medium') {
        setQuality('low');
        console.log('Auto-adjusted quality to low');
      }
    }
  });
}

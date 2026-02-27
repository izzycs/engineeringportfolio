import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Subtle physics-based animations for realism
 * - Chair gentle sway (weight simulation)
 * - Monitor subtle wobble
 * - Plant leaf movement (breeze)
 * - Cable sag physics
 */

interface ChairSwayProps {
  children: React.ReactNode;
  position?: [number, number, number];
}

export function ChairSway({ children, position = [0, 0, 0] }: ChairSwayProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle swaying motion - simulates weight/springs
      const time = state.clock.elapsedTime;
      const swayX = Math.sin(time * 0.3) * 0.001;
      const swayZ = Math.cos(time * 0.4) * 0.001;
      
      groupRef.current.rotation.x = swayX;
      groupRef.current.rotation.z = swayZ;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

interface MonitorWobbleProps {
  children: React.ReactNode;
  position?: [number, number, number];
  wobbleAmount?: number;
}

export function MonitorWobble({ children, position = [0, 0, 0], wobbleAmount = 0.0008 }: MonitorWobbleProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Subtle screen wobble - like it's on a stand
      const time = state.clock.elapsedTime;
      const wobbleY = Math.sin(time * 0.6) * wobbleAmount;
      
      groupRef.current.rotation.y = wobbleY;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

interface PlantLeafMovementProps {
  children: React.ReactNode;
  position?: [number, number, number];
  windStrength?: number;
}

export function PlantLeafMovement({ children, position = [0, 0, 0], windStrength = 0.002 }: PlantLeafMovementProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (groupRef.current) {
      // Gentle breeze effect on leaves
      const time = state.clock.elapsedTime;
      const swayX = Math.sin(time * 0.8 + position[0]) * windStrength;
      const swayZ = Math.cos(time * 0.9 + position[2]) * windStrength;
      const bounce = Math.sin(time * 1.2) * windStrength * 0.5;
      
      groupRef.current.rotation.x = swayX;
      groupRef.current.rotation.z = swayZ;
      groupRef.current.position.y = position[1] + bounce;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

interface CableSagProps {
  start: [number, number, number];
  end: [number, number, number];
  segments?: number;
  sagAmount?: number;
  color?: string;
  thickness?: number;
}

export function CableSag({ 
  start, 
  end, 
  segments = 16, 
  sagAmount = 0.15,
  color = '#1A1A1A',
  thickness = 0.01
}: CableSagProps) {
  const lineRef = useRef<THREE.Line>(null);
  
  useFrame((state) => {
    if (lineRef.current) {
      const time = state.clock.elapsedTime;
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i <= segments; i++) {
        const t = i / segments;
        const idx = i * 3;
        
        // Lerp between start and end
        const x = THREE.MathUtils.lerp(start[0], end[0], t);
        const y = THREE.MathUtils.lerp(start[1], end[1], t);
        const z = THREE.MathUtils.lerp(start[2], end[2], t);
        
        // Add catenary-like sag (parabolic)
        const sag = Math.sin(t * Math.PI) * sagAmount;
        
        // Add gentle sway from wind
        const sway = Math.sin(time * 0.5 + t * 3) * 0.02;
        
        positions[idx] = x + sway;
        positions[idx + 1] = y - sag;
        positions[idx + 2] = z + sway * 0.5;
      }
      
      lineRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  // Generate initial cable geometry
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array((segments + 1) * 3);
  
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const idx = i * 3;
    
    positions[idx] = THREE.MathUtils.lerp(start[0], end[0], t);
    positions[idx + 1] = THREE.MathUtils.lerp(start[1], end[1], t);
    positions[idx + 2] = THREE.MathUtils.lerp(start[2], end[2], t);
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.LineBasicMaterial({
    color: color,
    linewidth: thickness,
  });
  
  const line = new THREE.Line(geometry, material);
  
  return <primitive ref={lineRef} object={line} />;
}

/**
 * Floating dust motes in light beams (more prominent than background particles)
 */
interface LightBeamDustProps {
  position: [number, number, number];
  count?: number;
  range?: number;
}

export function LightBeamDust({ position, count = 30, range = 1.5 }: LightBeamDustProps) {
  const particlesRef = useRef<THREE.Points>(null);
  
  useFrame((state) => {
    if (particlesRef.current) {
      const time = state.clock.elapsedTime;
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const idx = i * 3;
        
        // Circular motion in light beam
        const angle = time * 0.2 + i;
        const radius = 0.3;
        
        positions[idx] = position[0] + Math.sin(angle) * radius;
        positions[idx + 1] = position[1] + (time * 0.1 + i * 0.1) % range;
        positions[idx + 2] = position[2] + Math.cos(angle) * radius;
        
        // Reset when too high
        if (positions[idx + 1] > position[1] + range) {
          positions[idx + 1] = position[1];
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  const geometry = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  
  for (let i = 0; i < count; i++) {
    const idx = i * 3;
    positions[idx] = position[0] + (Math.random() - 0.5) * 0.5;
    positions[idx + 1] = position[1] + Math.random() * range;
    positions[idx + 2] = position[2] + (Math.random() - 0.5) * 0.5;
  }
  
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  
  const material = new THREE.PointsMaterial({
    color: '#FFFEF0',
    size: 0.015,
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  
  return <points ref={particlesRef} geometry={geometry} material={material} />;
}

/**
 * Keyboard key depression effect (visual feedback)
 */
interface KeyboardPressProps {
  children: React.ReactNode;
  position?: [number, number, number];
  isPressed?: boolean;
}

export function KeyboardPress({ children, position = [0, 0, 0], isPressed = false }: KeyboardPressProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      // Smooth spring animation for key press
      const targetY = isPressed ? -0.002 : 0;
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

/**
 * Ceiling fan gentle rotation
 */
interface FanRotationProps {
  children: React.ReactNode;
  position?: [number, number, number];
  speed?: number;
}

export function FanRotation({ children, position = [0, 0, 0], speed = 0.5 }: FanRotationProps) {
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += speed * 0.01;
    }
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

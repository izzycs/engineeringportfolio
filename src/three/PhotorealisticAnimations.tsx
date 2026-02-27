import { useRef, useEffect, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * ROUND 9: PHOTOREALISTIC ANIMATIONS
 * Spring physics-based animations with natural damping and easing
 */

// ===== SPRING PHYSICS UTILITIES =====

interface SpringState {
  value: number;
  velocity: number;
  target: number;
}

/**
 * Spring physics simulation
 * Returns new value and velocity based on spring dynamics
 */
function springPhysics(
  current: number,
  velocity: number,
  target: number,
  stiffness: number = 0.1,
  damping: number = 0.8,
  deltaTime: number = 1
): { value: number; velocity: number } {
  const force = (target - current) * stiffness;
  const dampingForce = velocity * damping;
  const acceleration = force - dampingForce;
  
  const newVelocity = velocity + acceleration * deltaTime;
  const newValue = current + newVelocity * deltaTime;
  
  return { value: newValue, velocity: newVelocity };
}

/**
 * Smooth easing function (ease-in-out cubic)
 */
export function easeInOutCubic(t: number): number {
  return t < 0.5
    ? 4 * t * t * t
    : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

// ===== ENHANCED CHAIR SWAY WITH SPRING PHYSICS =====

interface ChairSwayProps {
  children: ReactNode;
  position: [number, number, number];
}

export function EnhancedChairSway({ children, position }: ChairSwayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const springStateX = useRef<SpringState>({ value: 0, velocity: 0, target: 0 });
  const springStateZ = useRef<SpringState>({ value: 0, velocity: 0, target: 0 });
  const lastUpdateTime = useRef<number>(0);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    const deltaTime = time - lastUpdateTime.current;
    lastUpdateTime.current = time;
    
    // Update spring targets with gentle sway
    springStateX.current.target = Math.sin(time * 0.3) * 0.008;
    springStateZ.current.target = Math.cos(time * 0.25) * 0.006;
    
    // Apply spring physics with damping
    const newStateX = springPhysics(
      springStateX.current.value,
      springStateX.current.velocity,
      springStateX.current.target,
      0.05, // stiffness
      0.9,  // damping (high = settles quickly)
      deltaTime
    );
    
    const newStateZ = springPhysics(
      springStateZ.current.value,
      springStateZ.current.velocity,
      springStateZ.current.target,
      0.05,
      0.9,
      deltaTime
    );
    
    springStateX.current.value = newStateX.value;
    springStateX.current.velocity = newStateX.velocity;
    springStateZ.current.value = newStateZ.value;
    springStateZ.current.velocity = newStateZ.velocity;
    
    // Apply rotation with settling
    groupRef.current.rotation.x = newStateX.value;
    groupRef.current.rotation.z = newStateZ.value;
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

// ===== ENHANCED FAN ROTATION =====

interface FanRotationProps {
  children: ReactNode;
  position: [number, number, number];
  speed: number;
}

export function EnhancedFanRotation({ children, position, speed }: FanRotationProps) {
  const groupRef = useRef<THREE.Group>(null);
  const currentSpeed = useRef<number>(0);
  
  useFrame((_state, delta) => {
    if (!groupRef.current) return;
    
    // Smooth acceleration to target speed
    const targetSpeed = speed;
    currentSpeed.current += (targetSpeed - currentSpeed.current) * 0.02;
    
    groupRef.current.rotation.y += currentSpeed.current * delta;
  });
  
  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

// ===== NATURAL PLANT LEAF MOVEMENT =====

interface PlantLeafSwayProps {
  children: ReactNode;
  windStrength?: number;
}

export function PlantLeafSway({ children, windStrength = 0.3 }: PlantLeafSwayProps) {
  const groupRef = useRef<THREE.Group>(null);
  const gustPhase = useRef<number>(Math.random() * Math.PI * 2);
  const baseWind = useRef<number>(Math.random() * 0.5);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.elapsedTime;
    
    // Base wind with gusts (not constant)
    const gustFrequency = 0.5;
    const gust = Math.sin(time * gustFrequency + gustPhase.current) * 0.5 + 0.5;
    const wind = baseWind.current + gust * windStrength;
    
    // Natural leaf movement
    const swayX = Math.sin(time * 0.8 + gustPhase.current) * wind * 0.015;
    const swayZ = Math.cos(time * 0.6 + gustPhase.current * 0.5) * wind * 0.01;
    const twist = Math.sin(time * 1.2 + gustPhase.current) * wind * 0.008;
    
    groupRef.current.rotation.x = swayX;
    groupRef.current.rotation.z = swayZ;
    groupRef.current.rotation.y = twist;
  });
  
  return <group ref={groupRef}>{children}</group>;
}

// ===== MONITOR WOBBLE ON INTERACTION =====

interface MonitorWobbleProps {
  children: ReactNode;
  triggerWobble?: boolean;
}

export function MonitorWobble({ children, triggerWobble = false }: MonitorWobbleProps) {
  const groupRef = useRef<THREE.Group>(null);
  const wobbleState = useRef<SpringState>({ value: 0, velocity: 0, target: 0 });
  const isWobbling = useRef<boolean>(false);
  const wobbleStartTime = useRef<number>(0);
  
  useEffect(() => {
    if (triggerWobble) {
      isWobbling.current = true;
      wobbleStartTime.current = Date.now();
      wobbleState.current.target = 0.03;
      wobbleState.current.velocity = 0.1;
    }
  }, [triggerWobble]);
  
  useFrame((state, delta) => {
    if (!groupRef.current) return;
    
    if (isWobbling.current) {
      const elapsed = (Date.now() - wobbleStartTime.current) / 1000;
      
      // Wobble for 2 seconds then settle
      if (elapsed < 2) {
        wobbleState.current.target = Math.sin(state.clock.elapsedTime * 8) * 0.015;
      } else {
        wobbleState.current.target = 0;
        if (Math.abs(wobbleState.current.value) < 0.001 && Math.abs(wobbleState.current.velocity) < 0.001) {
          isWobbling.current = false;
        }
      }
      
      // Apply spring physics with damping
      const newState = springPhysics(
        wobbleState.current.value,
        wobbleState.current.velocity,
        wobbleState.current.target,
        0.08,
        0.85,
        delta
      );
      
      wobbleState.current.value = newState.value;
      wobbleState.current.velocity = newState.velocity;
      groupRef.current.rotation.z = newState.value;
    }
  });
  
  return <group ref={groupRef}>{children}</group>;
}

// ===== SMOOTH CAMERA TRANSITION =====

export function useSmoothCameraTransition(
  targetPosition: THREE.Vector3,
  _targetLookAt: THREE.Vector3,
  camera: THREE.Camera,
  duration: number = 1.5
) {
  const startPosition = useRef<THREE.Vector3>(new THREE.Vector3());
  const transitionProgress = useRef<number>(0);
  const isTransitioning = useRef<boolean>(false);
  
  useEffect(() => {
    startPosition.current.copy(camera.position);
    transitionProgress.current = 0;
    isTransitioning.current = true;
  }, [targetPosition, camera]);
  
  useFrame((_state, delta) => {
    if (!isTransitioning.current) return;
    
    transitionProgress.current += delta / duration;
    
    if (transitionProgress.current >= 1) {
      camera.position.copy(targetPosition);
      isTransitioning.current = false;
      return;
    }
    
    // Use ease-in-out for smooth transition
    const t = easeInOutCubic(transitionProgress.current);
    
    camera.position.lerpVectors(startPosition.current, targetPosition, t);
  });
}

// ===== RGB KEYBOARD WAVE SYNC =====

interface RGBKeyboardWaveProps {
  isPlaying?: boolean;
  audioTime?: number;
}

export function useRGBKeyboardWave({ isPlaying = false, audioTime = 0 }: RGBKeyboardWaveProps) {
  const hueRef = useRef<number>(0);
  
  useFrame((state, delta) => {
    if (isPlaying) {
      // Sync wave with music (use audioTime if provided, else clock)
      hueRef.current = ((audioTime || state.clock.elapsedTime) * 0.3) % 1;
    } else {
      // Slow wave when not playing
      hueRef.current = (hueRef.current + delta * 0.05) % 1;
    }
  });
  
  return hueRef.current;
}

// ===== MOUSE CURSOR PREVIEW =====

interface MouseCursorPreviewProps {
  position: [number, number, number];
  isHovered: boolean;
}

export function MouseCursorPreview({ position, isHovered }: MouseCursorPreviewProps) {
  const cursorRef = useRef<THREE.Mesh>(null);
  const scaleSpring = useRef<SpringState>({ value: 0, velocity: 0, target: 0 });
  
  useEffect(() => {
    scaleSpring.current.target = isHovered ? 1 : 0;
  }, [isHovered]);
  
  useFrame((state, delta) => {
    if (!cursorRef.current) return;
    
    const newState = springPhysics(
      scaleSpring.current.value,
      scaleSpring.current.velocity,
      scaleSpring.current.target,
      0.15,
      0.75,
      delta
    );
    
    scaleSpring.current.value = newState.value;
    scaleSpring.current.velocity = newState.velocity;
    
    const scale = newState.value;
    cursorRef.current.scale.set(scale, scale, scale);
    
    // Gentle float animation
    cursorRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.002;
  });
  
  return (
    <mesh ref={cursorRef} position={position}>
      <coneGeometry args={[0.008, 0.02, 8]} />
      <meshStandardMaterial color="#FFFFFF" emissive="#60A5FA" emissiveIntensity={0.5} />
    </mesh>
  );
}

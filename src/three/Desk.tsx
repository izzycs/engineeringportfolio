import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

export function Desk() {
  const groupRef = useRef<THREE.Group>(null);
  const deskHeight = useStore((state) => state.deskHeight);
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const receiveShadow = quality === 'high';

  // Smooth lerp animation for height
  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        deskHeight,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef} position={[0, deskHeight, 0]}>
      {/* Desk Surface - Rustic Brown Wood */}
      <mesh position={[0, 0, 0]} castShadow={castShadow} receiveShadow={receiveShadow}>
        <boxGeometry args={[2.6, 0.05, 1.2]} />
        <meshStandardMaterial
          color="#5C4033"
          roughness={0.75}
          metalness={0.05}
        />
      </mesh>

      {/* Legs - Rectangular Black Metal Tubes */}
      {/* Front Left */}
      <mesh position={[-1.2, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Front Right */}
      <mesh position={[1.2, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Back Left */}
      <mesh position={[-1.2, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Back Right */}
      <mesh position={[1.2, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Crossbar connecting leg pairs - Front */}
      <mesh position={[0, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Crossbar connecting leg pairs - Back */}
      <mesh position={[0, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.9}
        />
      </mesh>

      {/* Motor Housing */}
      <mesh position={[0, -0.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.35, 0.15, 0.9]} />
        <meshStandardMaterial
          color="#2A2A2A"
          roughness={0.4}
          metalness={0.7}
        />
      </mesh>

      {/* Cable Tray */}
      <mesh position={[0, -0.2, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.4, 0.08, 0.15]} />
        <meshStandardMaterial
          color="#1A1A1A"
          roughness={0.5}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

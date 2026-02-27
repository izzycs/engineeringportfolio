import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';
import { 
  createRealisticWood, 
  createRealisticMetal 
} from './proceduralMaterials';

export function Desk() {
  const groupRef = useRef<THREE.Group>(null);
  const ledStripRef = useRef<THREE.Mesh[]>([]);
  const deskHeight = useStore((state) => state.deskHeight);
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const receiveShadow = quality === 'high';
  
  // Create enhanced materials
  const enhancedWoodSurface = createRealisticWood('#5C4033', 0.65);
  const enhancedWoodEdge = createRealisticWood('#3D3226', 0.7);
  const brushedAluminum = createRealisticMetal('#A8A8A8', 0.3, 0.4);
  const matteBlackMetal = createRealisticMetal('#1A1A1A', 0.4, 0.3);

  // Smooth lerp animation for height and RGB LED cycling
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        deskHeight,
        0.05
      );
    }

    // RGB LED strip color cycling
    ledStripRef.current.forEach((strip, idx) => {
      if (strip) {
        const time = state.clock.elapsedTime;
        const hue = (time * 0.1 + idx * 0.2) % 1;
        const color = new THREE.Color().setHSL(hue, 0.8, 0.5);
        (strip.material as THREE.MeshStandardMaterial).emissive = color;
      }
    });
  });

  return (
    <group ref={groupRef} position={[0, deskHeight, 0]}>
      {/* Desk Surface - Realistic Wood with Grain Variation */}
      <mesh position={[0, 0, 0]} castShadow={castShadow} receiveShadow={receiveShadow}>
        <boxGeometry args={[2.6, 0.05, 1.2]} />
        <primitive object={enhancedWoodSurface} attach="material" />
      </mesh>
      
      {/* Desk Edge Wear/Banding - Front */}
      <mesh position={[0, -0.005, 0.6]} castShadow={castShadow}>
        <boxGeometry args={[2.6, 0.04, 0.01]} />
        <primitive object={enhancedWoodEdge} attach="material" />
      </mesh>
      
      {/* Desk Edge Wear/Banding - Back */}
      <mesh position={[0, -0.005, -0.6]} castShadow={castShadow}>
        <boxGeometry args={[2.6, 0.04, 0.01]} />
        <primitive object={enhancedWoodEdge} attach="material" />
      </mesh>
      
      {/* Desk Edge Wear/Banding - Left */}
      <mesh position={[-1.3, -0.005, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.01, 0.04, 1.2]} />
        <primitive object={enhancedWoodEdge} attach="material" />
      </mesh>
      
      {/* Desk Edge Wear/Banding - Right */}
      <mesh position={[1.3, -0.005, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.01, 0.04, 1.2]} />
        <primitive object={enhancedWoodEdge} attach="material" />
      </mesh>

      {/* Legs - Rectangular Black Metal Tubes with Realistic Finish */}
      {/* Front Left */}
      <mesh position={[-1.2, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <primitive object={brushedAluminum.clone()} attach="material" />
      </mesh>

      {/* Front Right */}
      <mesh position={[1.2, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <primitive object={brushedAluminum.clone()} attach="material" />
      </mesh>

      {/* Back Left */}
      <mesh position={[-1.2, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <primitive object={brushedAluminum.clone()} attach="material" />
      </mesh>

      {/* Back Right */}
      <mesh position={[1.2, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 0.7, 0.05]} />
        <primitive object={brushedAluminum.clone()} attach="material" />
      </mesh>
      
      {/* Leg Feet - Adjustable Leveling Feet */}
      {[[-1.2, 0.5], [1.2, 0.5], [-1.2, -0.5], [1.2, -0.5]].map(([x, z], i) => (
        <mesh key={i} position={[x, -0.72, z]} castShadow={castShadow}>
          <cylinderGeometry args={[0.035, 0.025, 0.04, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.8} metalness={0.2} />
        </mesh>
      ))}

      {/* Crossbar connecting leg pairs - Front */}
      <mesh position={[0, -0.35, 0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <primitive object={matteBlackMetal.clone()} attach="material" />
      </mesh>

      {/* Crossbar connecting leg pairs - Back */}
      <mesh position={[0, -0.35, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.5, 0.04, 0.04]} />
        <primitive object={matteBlackMetal.clone()} attach="material" />
      </mesh>

      {/* Motor Housing - Brushed Metal */}
      <mesh position={[0, -0.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.35, 0.15, 0.9]} />
        <primitive object={brushedAluminum.clone()} attach="material" />
      </mesh>
      
      {/* Motor Vents */}
      <mesh position={[-0.15, -0.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.02, 0.12, 0.6]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} metalness={0.1} />
      </mesh>
      <mesh position={[0.15, -0.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.02, 0.12, 0.6]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} metalness={0.1} />
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

      {/* Cable Management Tray Under Desk - Back Edge */}
      <mesh position={[0, -0.05, -0.5]} castShadow={castShadow}>
        <boxGeometry args={[2.3, 0.04, 0.1]} />
        <meshStandardMaterial
          color="#2A2A2A"
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Cables in Management Tray */}
      {/* Cable 1 - Black power cable */}
      <mesh position={[-0.8, -0.05, -0.5]} rotation={[0, 0, Math.PI / 6]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.4, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.6} />
      </mesh>

      {/* Cable 2 - Dark grey USB cable */}
      <mesh position={[-0.3, -0.05, -0.5]} rotation={[0, 0, -Math.PI / 8]} castShadow={castShadow}>
        <cylinderGeometry args={[0.006, 0.006, 0.35, 8]} />
        <meshStandardMaterial color="#3A3A3A" roughness={0.6} />
      </mesh>

      {/* Cable 3 - Black ethernet cable */}
      <mesh position={[0.2, -0.05, -0.5]} rotation={[0, 0, Math.PI / 12]} castShadow={castShadow}>
        <cylinderGeometry args={[0.007, 0.007, 0.45, 8]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.6} />
      </mesh>

      {/* Cable 4 - Grey display cable */}
      <mesh position={[0.7, -0.05, -0.5]} rotation={[0, 0, -Math.PI / 10]} castShadow={castShadow}>
        <cylinderGeometry args={[0.009, 0.009, 0.38, 8]} />
        <meshStandardMaterial color="#4A4A4A" roughness={0.6} />
      </mesh>

      {/* RGB LED Strip - Front Edge */}
      <mesh
        ref={(el) => { if (el) ledStripRef.current[0] = el; }}
        position={[0, -0.03, 0.58]}
        castShadow={castShadow}
      >
        <boxGeometry args={[2.5, 0.01, 0.015]} />
        <meshStandardMaterial
          color="#FF0000"
          emissive="#FF0000"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* RGB LED Strip - Left Side */}
      <mesh
        ref={(el) => { if (el) ledStripRef.current[1] = el; }}
        position={[-1.28, -0.03, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow={castShadow}
      >
        <boxGeometry args={[1.1, 0.01, 0.015]} />
        <meshStandardMaterial
          color="#00FF00"
          emissive="#00FF00"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* RGB LED Strip - Right Side */}
      <mesh
        ref={(el) => { if (el) ledStripRef.current[2] = el; }}
        position={[1.28, -0.03, 0]}
        rotation={[0, Math.PI / 2, 0]}
        castShadow={castShadow}
      >
        <boxGeometry args={[1.1, 0.01, 0.015]} />
        <meshStandardMaterial
          color="#0000FF"
          emissive="#0000FF"
          emissiveIntensity={1.2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
}

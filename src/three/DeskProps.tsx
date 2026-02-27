import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

export function DeskProps() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const timeRef = useRef(0);

  // RGB colors for mechanical keyboard keys
  const rgbColors = [
    '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00', '#7FFF00',
    '#00FF00', '#00FA9A', '#00FFFF', '#1E90FF', '#0000FF', '#8A2BE2',
    '#9370DB', '#FF1493', '#FF69B4', '#FFA500', '#32CD32', '#00CED1'
  ];

  // Animate time for RGB pulsing
  useFrame((state) => {
    timeRef.current = state.clock.elapsedTime;
  });

  return (
    <group position={[0, 0.73, 0]}>
      {/* Mouse Pad - Dark blue/purple with glow */}
      <mesh position={[0.4, 0.002, 0.3]} castShadow={castShadow}>
        <boxGeometry args={[0.3, 0.002, 0.2]} />
        <meshStandardMaterial 
          color="#4A148C"
          emissive="#7B1FA2"
          emissiveIntensity={0.2}
          roughness={0.6}
          metalness={0.1}
        />
      </mesh>

      {/* Keyboard Base - RGB Mechanical */}
      <mesh position={[0, 0.015, 0.35]} castShadow={castShadow}>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Keyboard Keys - RGB/Rainbow Colors with animation */}
      {[...Array(5)].map((_, row) =>
        [...Array(14)].map((_, col) => {
          const randomColor = rgbColors[Math.floor(Math.random() * rgbColors.length)];
          const keyIndex = row * 14 + col;
          // Only animate a few keys (every 10th key for subtlety)
          const shouldAnimate = keyIndex % 10 === 0;
          
          return (
            <KeyMesh
              key={`key-${row}-${col}`}
              position={[
                -0.195 + col * 0.03,
                0.026,
                0.29 + row * 0.025,
              ]}
              color={randomColor}
              castShadow={castShadow}
              shouldAnimate={shouldAnimate}
              keyIndex={keyIndex}
            />
          );
        })
      )}

      {/* Mouse - Black Wireless */}
      <mesh position={[0.4, 0.018, 0.3]} castShadow={castShadow}>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
      </mesh>

      {/* Coffee Mug - Front-right area */}
      <group position={[0.35, 0.04, 0.55]}>
        {/* Mug body - cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.035, 0.03, 0.06, 16]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
        {/* Mug handle - torus */}
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.02, 0.006, 8, 16]} />
          <meshStandardMaterial color="#2C1810" roughness={0.4} metalness={0.1} />
        </mesh>
      </group>

      {/* Desk Plant - Back-right corner */}
      <group position={[0.55, 0.02, -0.35]}>
        {/* Pot - brown cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.04, 0.035, 0.05, 12]} />
          <meshStandardMaterial color="#6D4C41" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Leaves - green cones */}
        <mesh position={[0, 0.06, 0]} rotation={[0, 0, 0.2]} castShadow={castShadow}>
          <coneGeometry args={[0.025, 0.08, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.6} metalness={0.0} />
        </mesh>
        <mesh position={[-0.02, 0.05, 0.01]} rotation={[0.2, 0.5, -0.3]} castShadow={castShadow}>
          <coneGeometry args={[0.02, 0.07, 8]} />
          <meshStandardMaterial color="#388E3C" roughness={0.6} metalness={0.0} />
        </mesh>
        <mesh position={[0.02, 0.05, -0.01]} rotation={[-0.2, -0.5, 0.4]} castShadow={castShadow}>
          <coneGeometry args={[0.02, 0.07, 8]} />
          <meshStandardMaterial color="#43A047" roughness={0.6} metalness={0.0} />
        </mesh>
      </group>
    </group>
  );
}

// Separate component for animated keyboard keys
function KeyMesh({ position, color, castShadow, shouldAnimate, keyIndex }: {
  position: [number, number, number];
  color: string;
  castShadow: boolean;
  shouldAnimate: boolean;
  keyIndex: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current && shouldAnimate) {
      const time = state.clock.elapsedTime;
      // Subtle pulsing effect with different phase for each key
      const intensity = 0.3 + Math.sin(time * 2 + keyIndex * 0.3) * 0.2;
      (meshRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = intensity;
    }
  });

  return (
    <mesh ref={meshRef} position={position} castShadow={castShadow}>
      <boxGeometry args={[0.022, 0.006, 0.018]} />
      <meshStandardMaterial 
        color={color}
        emissive={color}
        emissiveIntensity={shouldAnimate ? 0.3 : 0.3}
        roughness={0.4}
        metalness={0.6}
      />
    </mesh>
  );
}

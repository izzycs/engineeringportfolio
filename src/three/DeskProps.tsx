import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';
import { plasticABS, plasticMatte, ceramic, terracotta, metalChrome } from './materials';

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
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>

      {/* Keyboard Base - Anodized Aluminum RGB Mechanical */}
      <mesh position={[0, 0.015, 0.35]} castShadow={castShadow}>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} envMapIntensity={0.6} />
      </mesh>
      
      {/* Keyboard USB Cable */}
      <mesh position={[0, 0.015, 0.275]} rotation={[0, 0, Math.PI / 6]} castShadow={castShadow}>
        <cylinderGeometry args={[0.003, 0.003, 0.12, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.6} metalness={0.0} />
      </mesh>
      
      {/* RGB Underglow Reflection on Desk */}
      <mesh position={[0, -0.01, 0.35]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[0.5, 0.2]} />
        <meshBasicMaterial 
          color="#8B5CF6"
          transparent
          opacity={0.15}
        />
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

      {/* Mouse - Black Wireless with Matte Finish */}
      <mesh position={[0.4, 0.018, 0.3]} castShadow={castShadow}>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial {...plasticMatte} />
      </mesh>
      
      {/* Mouse Buttons - Subtle Dividers */}
      <mesh position={[0.4, 0.031, 0.33]} castShadow={castShadow}>
        <boxGeometry args={[0.001, 0.002, 0.04]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Mouse Scroll Wheel */}
      <mesh position={[0.4, 0.032, 0.33]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 12]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.3} />
      </mesh>

      {/* Coffee Mug - Front-right area with Ceramic Material */}
      <group position={[0.35, 0.04, 0.55]}>
        {/* Mug body - cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.035, 0.03, 0.06, 20]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        {/* Mug handle - torus */}
        <mesh position={[0.04, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.02, 0.006, 8, 16]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        {/* Coffee inside */}
        <mesh position={[0, 0.025, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.033, 0.033, 0.005, 16]} />
          <meshStandardMaterial color="#3E2723" roughness={0.2} metalness={0.1} />
        </mesh>
      </group>

      {/* Desk Plant - Back-right corner with Terracotta Pot */}
      <group position={[0.55, 0.02, -0.35]}>
        {/* Pot - terracotta cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.04, 0.035, 0.05, 16]} />
          <meshStandardMaterial {...terracotta} />
        </mesh>
        {/* Pot Rim */}
        <mesh position={[0, 0.026, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.041, 0.04, 0.003, 16]} />
          <meshStandardMaterial color="#B8583A" roughness={0.75} metalness={0.0} />
        </mesh>
        {/* Soil */}
        <mesh position={[0, 0.022, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.038, 0.038, 0.005, 16]} />
          <meshStandardMaterial color="#3E2723" roughness={0.95} metalness={0.0} />
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

      {/* Headphone Stand - Back-left area near monitor arm */}
      <group position={[-0.45, 0.02, -0.25]}>
        {/* Base - circular metal base */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 20]} />
          <meshStandardMaterial {...metalChrome} />
        </mesh>

        {/* Post - cylindrical stand */}
        <mesh position={[0, 0.1, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.012, 0.012, 0.2, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Hook - curved top using torus segment */}
        <mesh position={[0, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.03, 0.01, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.8} />
        </mesh>

        {/* Headphones hanging on stand */}
        {/* Headband - Plastic */}
        <mesh position={[0, 0.18, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.045, 0.008, 8, 16, Math.PI]} />
          <meshStandardMaterial {...plasticABS} />
        </mesh>

        {/* Left ear cup - Plastic Shell */}
        <mesh position={[-0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
          <meshStandardMaterial {...plasticABS} />
        </mesh>
        
        {/* Left ear cup padding */}
        <mesh position={[-0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.016, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>

        {/* Right ear cup - Plastic Shell */}
        <mesh position={[0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
          <meshStandardMaterial {...plasticABS} />
        </mesh>
        
        {/* Right ear cup padding */}
        <mesh position={[0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.016, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
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
    <>
      {/* Key Shadow/Gap */}
      <mesh position={[position[0], position[1] - 0.002, position[2]]} castShadow={false}>
        <boxGeometry args={[0.023, 0.001, 0.019]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.6} />
      </mesh>
      
      {/* Actual Key - ABS Plastic */}
      <mesh ref={meshRef} position={position} castShadow={castShadow}>
        <boxGeometry args={[0.022, 0.006, 0.018]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={shouldAnimate ? 0.3 : 0.25}
          roughness={0.5}
          metalness={0.05}
          envMapIntensity={0.4}
        />
      </mesh>
    </>
  );
}

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';
import { createRealisticPlastic, createRealisticMetal } from './proceduralMaterials';
import { PlantLeafMovement, CableSag } from './SubtleAnimations';

// Enhanced materials
const plasticABS = createRealisticPlastic('#2A2A2A', true);
const plasticMatte = createRealisticPlastic('#1A1A1A', false);
const metalChrome = createRealisticMetal('#C0C0C0', 0.15, 0.2);
const ceramic = {
  roughness: 0.3,
  metalness: 0.0,
  envMapIntensity: 0.5,
};
const terracotta = {
  color: '#C65D3B',
  roughness: 0.8,
  metalness: 0.0,
};

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
      
      {/* Mouse pad stitched edges */}
      {/* Top edge */}
      <mesh position={[0.4, 0.003, 0.202]} castShadow={false}>
        <boxGeometry args={[0.3, 0.0005, 0.004]} />
        <meshStandardMaterial color="#9C27B0" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Bottom edge */}
      <mesh position={[0.4, 0.003, 0.398]} castShadow={false}>
        <boxGeometry args={[0.3, 0.0005, 0.004]} />
        <meshStandardMaterial color="#9C27B0" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Left edge */}
      <mesh position={[0.252, 0.003, 0.3]} castShadow={false}>
        <boxGeometry args={[0.004, 0.0005, 0.2]} />
        <meshStandardMaterial color="#9C27B0" roughness={0.9} metalness={0.0} />
      </mesh>
      {/* Right edge */}
      <mesh position={[0.548, 0.003, 0.3]} castShadow={false}>
        <boxGeometry args={[0.004, 0.0005, 0.2]} />
        <meshStandardMaterial color="#9C27B0" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Mouse pad corners - slight curl */}
      <mesh position={[0.252, 0.0035, 0.398]} rotation={[-Math.PI / 12, 0, Math.PI / 12]} castShadow={false}>
        <boxGeometry args={[0.01, 0.001, 0.01]} />
        <meshStandardMaterial color="#4A148C" roughness={0.8} metalness={0.0} />
      </mesh>
      <mesh position={[0.548, 0.0035, 0.398]} rotation={[-Math.PI / 12, 0, -Math.PI / 12]} castShadow={false}>
        <boxGeometry args={[0.01, 0.001, 0.01]} />
        <meshStandardMaterial color="#4A148C" roughness={0.8} metalness={0.0} />
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

      {/* Keyboard Keys - RGB/Rainbow Colors with animation and wave pattern */}
      {[...Array(5)].map((_, row) =>
        [...Array(14)].map((_, col) => {
          // Wave pattern for RGB effect
          const keyIndex = row * 14 + col;
          const wavePhase = (col + row * 0.5) / 14;
          const colorIndex = Math.floor(wavePhase * rgbColors.length) % rgbColors.length;
          const keyColor = rgbColors[colorIndex];
          
          // Only animate a few keys (every 10th key for subtlety)
          const shouldAnimate = keyIndex % 10 === 0;
          
          // Add slight height variation for realism
          const heightVariation = (Math.sin(keyIndex * 0.5) * 0.0003);
          
          return (
            <KeyMesh
              key={`key-${row}-${col}`}
              position={[
                -0.195 + col * 0.03,
                0.026 + heightVariation,
                0.29 + row * 0.025,
              ]}
              color={keyColor}
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
        <primitive object={plasticMatte.clone()} attach="material" />
      </mesh>
      
      {/* Left Mouse Button */}
      <mesh position={[0.385, 0.0315, 0.335]} castShadow={castShadow}>
        <boxGeometry args={[0.024, 0.001, 0.035]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.0} />
      </mesh>
      
      {/* Right Mouse Button */}
      <mesh position={[0.415, 0.0315, 0.335]} castShadow={castShadow}>
        <boxGeometry args={[0.024, 0.001, 0.035]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} metalness={0.0} />
      </mesh>
      
      {/* Mouse Button Divider */}
      <mesh position={[0.4, 0.0318, 0.335]} castShadow={castShadow}>
        <boxGeometry args={[0.001, 0.0015, 0.04]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} metalness={0.0} />
      </mesh>
      
      {/* Mouse Scroll Wheel - Rubberized with grooves */}
      <mesh position={[0.4, 0.0325, 0.325]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
        <cylinderGeometry args={[0.009, 0.009, 0.016, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.8} metalness={0.1} />
      </mesh>
      
      {/* Scroll wheel grooves */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        return (
          <mesh 
            key={`scroll-${i}`}
            position={[
              0.4 + Math.cos(angle) * 0.0095, 
              0.0325, 
              0.325 + Math.sin(angle) * 0.0095
            ]} 
            rotation={[0, angle, Math.PI / 2]}
            castShadow={false}
          >
            <boxGeometry args={[0.001, 0.008, 0.017]} />
            <meshBasicMaterial color="#0A0A0A" transparent opacity={0.5} />
          </mesh>
        );
      })}
      
      {/* DPI indicator LED */}
      <mesh position={[0.4, 0.0315, 0.285]} castShadow={false}>
        <sphereGeometry args={[0.002, 8, 8]} />
        <meshStandardMaterial 
          color="#00FF00" 
          emissive="#00FF00"
          emissiveIntensity={0.8}
        />
      </mesh>
      
      {/* Mouse side buttons (left side) */}
      <mesh position={[0.369, 0.022, 0.31]} rotation={[0, 0, -Math.PI / 6]} castShadow={castShadow}>
        <boxGeometry args={[0.006, 0.012, 0.008]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.6} metalness={0.0} />
      </mesh>
      <mesh position={[0.369, 0.022, 0.295]} rotation={[0, 0, -Math.PI / 6]} castShadow={castShadow}>
        <boxGeometry args={[0.006, 0.012, 0.008]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.6} metalness={0.0} />
      </mesh>

      {/* Coffee Mug - Front-right area with Ceramic Material */}
      <group position={[0.35, 0.04, 0.55]}>
        {/* Mug body - cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.035, 0.03, 0.06, 24]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        
        {/* Ceramic rim detail - slightly glossier */}
        <mesh position={[0, 0.0305, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.036, 0.035, 0.002, 24]} />
          <meshStandardMaterial 
            color="#F0E8D8" 
            roughness={0.2} 
            metalness={0.0}
            envMapIntensity={0.6}
          />
        </mesh>
        
        {/* Mug handle - torus with better thickness */}
        <mesh position={[0.043, 0, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.022, 0.007, 10, 20, Math.PI * 1.5]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        
        {/* Handle connection to mug - top */}
        <mesh position={[0.038, 0.018, 0]} rotation={[0, 0, Math.PI / 4]} castShadow={castShadow}>
          <cylinderGeometry args={[0.008, 0.006, 0.012, 12]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        
        {/* Handle connection to mug - bottom */}
        <mesh position={[0.038, -0.018, 0]} rotation={[0, 0, -Math.PI / 4]} castShadow={castShadow}>
          <cylinderGeometry args={[0.006, 0.008, 0.012, 12]} />
          <meshStandardMaterial {...ceramic} color="#E8DCC8" />
        </mesh>
        
        {/* Coffee inside - brown liquid with slight glossiness */}
        <mesh position={[0, 0.024, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.033, 0.033, 0.006, 20]} />
          <meshStandardMaterial 
            color="#3E2723" 
            roughness={0.15} 
            metalness={0.05}
            envMapIntensity={0.4}
          />
        </mesh>
        
        {/* Coffee surface tension/highlight */}
        <mesh position={[0, 0.0271, 0]} castShadow={false}>
          <cylinderGeometry args={[0.032, 0.032, 0.0001, 20]} />
          <meshBasicMaterial 
            color="#5D4037"
            transparent
            opacity={0.3}
          />
        </mesh>
      </group>

      {/* Desk Plant - Back-right corner with Terracotta Pot */}
      <PlantLeafMovement position={[0.55, 0.02, -0.35]} windStrength={0.003}>
        <group>
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
          {/* Soil - with texture */}
          <mesh position={[0, 0.022, 0]} castShadow={castShadow}>
            <cylinderGeometry args={[0.038, 0.038, 0.006, 16]} />
            <meshStandardMaterial color="#3E2723" roughness={0.95} metalness={0.0} />
          </mesh>
          {/* Soil particles on top */}
          <mesh position={[0, 0.0255, 0]} castShadow={false}>
            <cylinderGeometry args={[0.037, 0.037, 0.0001, 16]} />
            <meshBasicMaterial color="#2E1A0A" transparent opacity={0.4} />
          </mesh>
          
          {/* Individual leaves with more detail */}
          {/* Center leaf */}
          <mesh position={[0, 0.06, 0]} rotation={[0, 0, 0.2]} castShadow={castShadow}>
            <coneGeometry args={[0.025, 0.08, 8]} />
            <meshStandardMaterial color="#2E7D32" roughness={0.6} metalness={0.0} />
          </mesh>
          {/* Center leaf vein (darker) */}
          <mesh position={[0, 0.065, 0.001]} rotation={[0, 0, 0.2]} castShadow={false}>
            <boxGeometry args={[0.001, 0.07, 0.001]} />
            <meshBasicMaterial color="#1B5E20" transparent opacity={0.5} />
          </mesh>
          
          {/* Left leaf */}
          <mesh position={[-0.02, 0.05, 0.01]} rotation={[0.2, 0.5, -0.3]} castShadow={castShadow}>
            <coneGeometry args={[0.02, 0.07, 8]} />
            <meshStandardMaterial color="#388E3C" roughness={0.6} metalness={0.0} />
          </mesh>
          {/* Left leaf vein */}
          <mesh position={[-0.02, 0.055, 0.011]} rotation={[0.2, 0.5, -0.3]} castShadow={false}>
            <boxGeometry args={[0.001, 0.06, 0.001]} />
            <meshBasicMaterial color="#2E7D32" transparent opacity={0.5} />
          </mesh>
          
          {/* Right leaf */}
          <mesh position={[0.02, 0.05, -0.01]} rotation={[-0.2, -0.5, 0.4]} castShadow={castShadow}>
            <coneGeometry args={[0.02, 0.07, 8]} />
            <meshStandardMaterial color="#43A047" roughness={0.6} metalness={0.0} />
          </mesh>
          {/* Right leaf vein */}
          <mesh position={[0.02, 0.055, -0.009]} rotation={[-0.2, -0.5, 0.4]} castShadow={false}>
            <boxGeometry args={[0.001, 0.06, 0.001]} />
            <meshBasicMaterial color="#388E3C" transparent opacity={0.5} />
          </mesh>
          
          {/* Additional small leaves for fullness */}
          <mesh position={[0.015, 0.045, 0.015]} rotation={[0.3, 0.3, 0.1]} castShadow={castShadow}>
            <coneGeometry args={[0.015, 0.05, 8]} />
            <meshStandardMaterial color="#4CAF50" roughness={0.6} metalness={0.0} />
          </mesh>
          <mesh position={[-0.015, 0.045, -0.015]} rotation={[-0.3, -0.3, -0.1]} castShadow={castShadow}>
            <coneGeometry args={[0.015, 0.05, 8]} />
            <meshStandardMaterial color="#66BB6A" roughness={0.6} metalness={0.0} />
          </mesh>
        </group>
      </PlantLeafMovement>

      {/* Headphone Stand - Back-left area near monitor arm */}
      <group position={[-0.45, 0.02, -0.25]}>
        {/* Base - circular metal base */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.06, 0.06, 0.01, 20]} />
          <primitive object={metalChrome.clone()} attach="material" />
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
          <primitive object={plasticABS.clone()} attach="material" />
        </mesh>

        {/* Left ear cup - Plastic Shell */}
        <mesh position={[-0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
          <primitive object={plasticABS.clone()} attach="material" />
        </mesh>
        
        {/* Left ear cup padding */}
        <mesh position={[-0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.016, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>

        {/* Right ear cup - Plastic Shell */}
        <mesh position={[0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
          <primitive object={plasticABS.clone()} attach="material" />
        </mesh>
        
        {/* Right ear cup padding */}
        <mesh position={[0.04, 0.14, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.016, 16]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>
      </group>
      
      {/* Cable Management - Sagging cables with physics */}
      {/* Keyboard cable to desk edge */}
      <CableSag 
        start={[0, 0.015, 0.275]} 
        end={[0, -0.2, -0.5]} 
        segments={16}
        sagAmount={0.08}
        color="#1A1A1A"
        thickness={0.003}
      />
      
      {/* Monitor power cable (left) */}
      <CableSag 
        start={[-0.65, -0.35, -0.05]} 
        end={[0, -0.5, -0.5]} 
        segments={20}
        sagAmount={0.12}
        color="#0A0A0A"
        thickness={0.005}
      />
      
      {/* Monitor display cable (right) */}
      <CableSag 
        start={[0.65, -0.35, -0.05]} 
        end={[0, -0.5, -0.5]} 
        segments={20}
        sagAmount={0.1}
        color="#2A2A2A"
        thickness={0.004}
      />
      
      {/* USB hub on desk - small black box */}
      <group position={[-0.5, 0.015, 0.4]}>
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.1, 0.015, 0.05]} />
          <primitive object={plasticMatte.clone()} attach="material" />
        </mesh>
        {/* USB ports */}
        {[0, 1, 2].map((i) => (
          <mesh key={`usb-${i}`} position={[-0.045 + i * 0.02, 0.0005, 0.026]} castShadow={false}>
            <boxGeometry args={[0.012, 0.006, 0.002]} />
            <meshStandardMaterial color="#0A0A0A" roughness={0.8} metalness={0.1} />
          </mesh>
        ))}
        {/* LED indicator */}
        <mesh position={[0.045, 0.008, 0]} castShadow={false}>
          <sphereGeometry args={[0.002, 8, 8]} />
          <meshStandardMaterial 
            color="#0080FF" 
            emissive="#0080FF"
            emissiveIntensity={0.6}
          />
        </mesh>
      </group>
      
      {/* Cable clips on desk edge */}
      {[-0.3, 0, 0.3].map((x, i) => (
        <mesh key={`clip-${i}`} position={[x, -0.015, -0.58]} rotation={[Math.PI / 2, 0, 0]} castShadow={castShadow}>
          <torusGeometry args={[0.01, 0.003, 8, 12]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.6} />
        </mesh>
      ))}
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
      {/* Key Gap/Shadow - More pronounced */}
      <mesh position={[position[0], position[1] - 0.003, position[2]]} castShadow={false}>
        <boxGeometry args={[0.029, 0.002, 0.024]} />
        <meshBasicMaterial color="#0A0A0A" transparent opacity={0.8} />
      </mesh>
      
      {/* Key Shadow underneath */}
      <mesh position={[position[0], position[1] - 0.001, position[2]]} castShadow={false}>
        <boxGeometry args={[0.021, 0.0005, 0.017]} />
        <meshBasicMaterial color="#000000" transparent opacity={0.5} />
      </mesh>
      
      {/* Actual Key - ABS Plastic with rounded edges (slightly smaller for gap) */}
      <mesh ref={meshRef} position={position} castShadow={castShadow}>
        <boxGeometry args={[0.020, 0.007, 0.017]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={shouldAnimate ? 0.3 : 0.25}
          roughness={0.5}
          metalness={0.05}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Key Legend (subtle darker top) */}
      <mesh position={[position[0], position[1] + 0.0036, position[2]]} castShadow={false}>
        <boxGeometry args={[0.015, 0.0001, 0.012]} />
        <meshBasicMaterial color="#1A1A1A" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

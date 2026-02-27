import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

// Component for Izzy nameplate on desk
export function DeskNameplate() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={[-0.5, 0.73, 0.55]}>
      {/* Nameplate base - brushed aluminum */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.003, 0.04]} />
        <meshStandardMaterial 
          color="#A0A0A0"
          roughness={0.3}
          metalness={0.9}
          envMapIntensity={0.6}
        />
      </mesh>
      
      {/* Stand */}
      <mesh position={[0, -0.008, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.14, 0.01, 0.035]} />
        <meshStandardMaterial 
          color="#888888"
          roughness={0.4}
          metalness={0.8}
        />
      </mesh>
      
      {/* Engraved text */}
      <Text
        position={[0, 0.0035, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.015}
        color="#2A2A2A"
        anchorX="center"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Bold.ttf"
      >
        IZZY • DATA ENG
      </Text>
    </group>
  );
}

// Stack of data engineering books
export function DataEngineeringBooks() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const groupRef = useRef<THREE.Group>(null);

  const books = [
    { title: 'Designing Data-Intensive Applications', color: '#8B4513', spine: '#654321' },
    { title: 'The Data Warehouse Toolkit', color: '#2E5090', spine: '#1E3A5F' },
    { title: 'Fundamentals of Data Engineering', color: '#4A6741', spine: '#2F4028' },
    { title: 'Stream Processing', color: '#8B0000', spine: '#5A0000' },
  ];

  useFrame(() => {
    if (groupRef.current && hovered) {
      groupRef.current.position.y = 0.735 + Math.sin(Date.now() * 0.003) * 0.002;
    } else if (groupRef.current) {
      groupRef.current.position.y += (0.73 - groupRef.current.position.y) * 0.1;
    }
  });

  return (
    <group 
      ref={groupRef}
      position={[-0.6, 0.73, 0.1]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setClicked(!clicked)}
    >
      {books.map((book, i) => (
        <group key={i} position={[0, i * 0.025, 0]}>
          {/* Book cover */}
          <mesh castShadow={castShadow}>
            <boxGeometry args={[0.12, 0.02, 0.08]} />
            <meshStandardMaterial color={book.color} roughness={0.7} metalness={0.0} />
          </mesh>
          
          {/* Book spine */}
          <mesh position={[-0.061, 0, 0]} castShadow={castShadow}>
            <boxGeometry args={[0.002, 0.02, 0.08]} />
            <meshStandardMaterial color={book.spine} roughness={0.6} metalness={0.0} />
          </mesh>
          
          {/* Book pages */}
          <mesh position={[0.06, 0, 0]} castShadow={false}>
            <boxGeometry args={[0.001, 0.018, 0.078]} />
            <meshStandardMaterial color="#F5F5DC" roughness={0.9} metalness={0.0} />
          </mesh>
          
          {/* Title text on spine - only show when clicked */}
          {clicked && (
            <Text
              position={[-0.062, 0, 0]}
              rotation={[0, Math.PI / 2, Math.PI / 2]}
              fontSize={0.006}
              color="#FFFFFF"
              anchorX="center"
              anchorY="middle"
              maxWidth={0.07}
            >
              {book.title}
            </Text>
          )}
        </group>
      ))}
      
      {/* Hover effect - glow */}
      {hovered && (
        <pointLight position={[0, 0.08, 0]} intensity={0.3} distance={0.2} color="#FFA500" />
      )}
    </group>
  );
}

// Personal photos in frames
export function PersonalPhotos() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <>
      {/* Desk photo frame */}
      <group position={[-0.55, 0.73, -0.25]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.08, 0.1, 0.005]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.6} />
        </mesh>
        
        {/* Photo - gradient placeholder */}
        <mesh position={[0, 0, 0.003]} castShadow={false}>
          <planeGeometry args={[0.07, 0.09]} />
          <meshStandardMaterial 
            color="#4A90E2"
            emissive="#4A90E2"
            emissiveIntensity={0.1}
            roughness={0.3}
          />
        </mesh>
        
        {/* Stand back */}
        <mesh position={[0, -0.04, -0.01]} rotation={[0.3, 0, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.06, 0.03, 0.002]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.5} metalness={0.5} />
        </mesh>
      </group>
    </>
  );
}

// NBA team merchandise
export function NBAMerchandise() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const bobbleRef = useRef<THREE.Group>(null);
  const [spinning, setSpinning] = useState(false);

  useFrame((state) => {
    if (bobbleRef.current) {
      if (spinning) {
        bobbleRef.current.rotation.y += 0.05;
      } else {
        // Subtle bobble motion
        bobbleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.05;
      }
    }
  });

  return (
    <>
      {/* Mini basketball on desk */}
      <group 
        ref={bobbleRef}
        position={[0.5, 0.76, -0.1]}
        onClick={() => setSpinning(!spinning)}
      >
        <mesh castShadow={castShadow}>
          <sphereGeometry args={[0.025, 16, 16]} />
          <meshStandardMaterial 
            color="#FF6700"
            roughness={0.7}
            metalness={0.0}
          />
        </mesh>
        
        {/* Basketball lines */}
        <mesh castShadow={false}>
          <torusGeometry args={[0.025, 0.0015, 8, 32]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
        <mesh rotation={[0, Math.PI / 2, 0]} castShadow={false}>
          <torusGeometry args={[0.025, 0.0015, 8, 32]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
      </group>
      
      {/* NBA team pennant on wall */}
      <mesh position={[-1.2, 2.3, -1.19]} rotation={[0, Math.PI / 2, 0]} castShadow={castShadow}>
        <coneGeometry args={[0.15, 0.4, 3]} />
        <meshStandardMaterial 
          color="#860038"
          roughness={0.8}
          metalness={0.0}
        />
      </mesh>
      
      {/* Team logo area on pennant */}
      <mesh position={[-1.19, 2.3, -1.15]} rotation={[0, -Math.PI / 2, 0]} castShadow={false}>
        <circleGeometry args={[0.06, 16]} />
        <meshStandardMaterial 
          color="#FDB927"
          emissive="#FDB927"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

// Anime collectibles
export function AnimeCollectibles() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const figurineRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (figurineRef.current) {
      figurineRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0.55, 0.73, 0.1]}>
      {/* Figurine 1 - chibi style */}
      <group ref={figurineRef} position={[-0.06, 0.03, 0]}>
        {/* Head */}
        <mesh position={[0, 0.025, 0]} castShadow={castShadow}>
          <sphereGeometry args={[0.015, 12, 12]} />
          <meshStandardMaterial color="#FFDAB9" roughness={0.6} />
        </mesh>
        
        {/* Body */}
        <mesh position={[0, 0, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.008, 0.012, 0.025, 8]} />
          <meshStandardMaterial color="#4169E1" roughness={0.7} />
        </mesh>
        
        {/* Hair */}
        <mesh position={[0, 0.032, 0]} castShadow={castShadow}>
          <coneGeometry args={[0.012, 0.02, 6]} />
          <meshStandardMaterial color="#2C1810" roughness={0.8} />
        </mesh>
      </group>
      
      {/* Figurine 2 */}
      <group position={[0, 0.03, 0]}>
        <mesh position={[0, 0.022, 0]} castShadow={castShadow}>
          <sphereGeometry args={[0.013, 12, 12]} />
          <meshStandardMaterial color="#FFE4C4" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.007, 0.01, 0.022, 8]} />
          <meshStandardMaterial color="#FF69B4" roughness={0.7} />
        </mesh>
      </group>
      
      {/* Figurine 3 */}
      <group position={[0.06, 0.035, 0]}>
        <mesh position={[0, 0.028, 0]} castShadow={castShadow}>
          <sphereGeometry args={[0.017, 12, 12]} />
          <meshStandardMaterial color="#F0E68C" roughness={0.6} />
        </mesh>
        <mesh position={[0, 0, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.009, 0.013, 0.028, 8]} />
          <meshStandardMaterial color="#00FF00" roughness={0.7} />
        </mesh>
        {/* Weapon prop */}
        <mesh position={[0.015, 0.01, 0]} rotation={[0, 0, Math.PI / 4]} castShadow={castShadow}>
          <cylinderGeometry args={[0.001, 0.001, 0.03, 4]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>
      
      {/* Display base */}
      <mesh position={[0, 0, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.08, 0.08, 0.005, 16]} />
        <meshStandardMaterial 
          color="#1A1A1A"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
    </group>
  );
}

// Water bottle with refraction
export function WaterBottle() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={[0.15, 0.73, 0.5]}>
      {/* Bottle body - glass/plastic with transparency */}
      <mesh castShadow={castShadow}>
        <cylinderGeometry args={[0.025, 0.03, 0.15, 16]} />
        <meshPhysicalMaterial 
          color="#E0F7FA"
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.0}
          transmission={0.9}
          thickness={0.02}
          envMapIntensity={1.0}
        />
      </mesh>
      
      {/* Water inside */}
      <mesh position={[0, -0.02, 0]} castShadow={false}>
        <cylinderGeometry args={[0.023, 0.028, 0.12, 16]} />
        <meshPhysicalMaterial 
          color="#B3E5FC"
          transparent
          opacity={0.6}
          roughness={0.05}
          transmission={0.95}
          envMapIntensity={0.8}
        />
      </mesh>
      
      {/* Bottle cap - metallic */}
      <mesh position={[0, 0.08, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.027, 0.025, 0.015, 16]} />
        <meshStandardMaterial 
          color="#607D8B"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Label */}
      <mesh position={[0, 0.02, 0.026]} castShadow={false}>
        <planeGeometry args={[0.04, 0.06]} />
        <meshStandardMaterial 
          color="#4CAF50"
          roughness={0.6}
          transparent
          opacity={0.8}
        />
      </mesh>
      
      {/* Eco-friendly icon on label */}
      <mesh position={[0, 0.02, 0.027]} castShadow={false}>
        <circleGeometry args={[0.008, 16]} />
        <meshStandardMaterial 
          color="#FFFFFF"
          emissive="#FFFFFF"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
}

// Snacks and energy drink
export function DeskSnacks() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <>
      {/* Energy drink can */}
      <group position={[0.25, 0.73, 0.45]}>
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.1, 16]} />
          <meshStandardMaterial 
            color="#00A8E8"
            roughness={0.2}
            metalness={0.9}
            envMapIntensity={1.0}
          />
        </mesh>
        
        {/* Top of can */}
        <mesh position={[0, 0.051, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.001, 16]} />
          <meshStandardMaterial 
            color="#C0C0C0"
            roughness={0.3}
            metalness={0.95}
          />
        </mesh>
        
        {/* Pull tab */}
        <mesh position={[0, 0.052, 0.01]} rotation={[0, 0, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.015, 0.001, 0.008]} />
          <meshStandardMaterial color="#D3D3D3" roughness={0.4} metalness={0.9} />
        </mesh>
        
        {/* Label design */}
        <mesh position={[0, 0.01, 0.021]} castShadow={false}>
          <planeGeometry args={[0.06, 0.03]} />
          <meshStandardMaterial 
            color="#FFD700"
            emissive="#FFD700"
            emissiveIntensity={0.3}
          />
        </mesh>
      </group>
      
      {/* Protein bar wrapper */}
      <group position={[0.3, 0.73, 0.35]}>
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.08, 0.01, 0.03]} />
          <meshStandardMaterial 
            color="#8B4513"
            roughness={0.7}
            metalness={0.1}
          />
        </mesh>
        
        {/* Wrapper text area */}
        <mesh position={[0, 0.006, 0]} castShadow={false}>
          <planeGeometry args={[0.07, 0.025]} />
          <meshStandardMaterial 
            color="#FFA500"
            roughness={0.4}
          />
        </mesh>
      </group>
    </>
  );
}

// Charging cables and devices
export function ChargingDevices() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const glowRef = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    if (glowRef.current) {
      glowRef.current.intensity = 0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <>
      {/* Wireless charging pad */}
      <group position={[-0.3, 0.73, 0.45]}>
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.04, 0.04, 0.005, 32]} />
          <meshStandardMaterial 
            color="#1A1A1A"
            roughness={0.4}
            metalness={0.6}
          />
        </mesh>
        
        {/* Charging indicator ring */}
        <mesh position={[0, 0.003, 0]} castShadow={false}>
          <ringGeometry args={[0.035, 0.038, 32]} />
          <meshStandardMaterial 
            color="#00FF00"
            emissive="#00FF00"
            emissiveIntensity={0.5}
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Glow light */}
        <pointLight 
          ref={glowRef}
          position={[0, 0.01, 0]} 
          intensity={0.3} 
          distance={0.15} 
          color="#00FF00" 
        />
      </group>
      
      {/* Phone on charger */}
      <group position={[-0.3, 0.735, 0.45]}>
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.035, 0.003, 0.07]} />
          <meshStandardMaterial 
            color="#0A0A0A"
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
        
        {/* Phone screen (on) */}
        <mesh position={[0, 0.002, 0]} castShadow={false}>
          <planeGeometry args={[0.032, 0.065]} />
          <meshStandardMaterial 
            color="#4A90E2"
            emissive="#4A90E2"
            emissiveIntensity={0.4}
          />
        </mesh>
        
        {/* Camera bump */}
        <mesh position={[-0.012, 0.0025, -0.025]} castShadow={castShadow}>
          <boxGeometry args={[0.008, 0.002, 0.008]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.7} />
        </mesh>
      </group>
      
      {/* Smartwatch on charger */}
      <group position={[-0.25, 0.73, 0.35]}>
        {/* Charging puck */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.02, 0.02, 0.003, 32]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            roughness={0.3}
            metalness={0.5}
          />
        </mesh>
        
        {/* Watch face */}
        <mesh position={[0, 0.008, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.018, 0.018, 0.01, 32]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Watch screen */}
        <mesh position={[0, 0.014, 0]} rotation={[-Math.PI / 2, 0, 0]} castShadow={false}>
          <circleGeometry args={[0.015, 32]} />
          <meshStandardMaterial 
            color="#00FF00"
            emissive="#00FF00"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Watch band */}
        <mesh position={[0, 0.008, 0.025]} castShadow={castShadow}>
          <boxGeometry args={[0.015, 0.008, 0.02]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.7} metalness={0.1} />
        </mesh>
      </group>
      
      {/* USB-C cable coiled on desk */}
      <group position={[-0.35, 0.73, 0.25]}>
        {[0, 1, 2, 3].map((i) => {
          const angle = (i / 4) * Math.PI * 2;
          const radius = 0.02;
          return (
            <mesh 
              key={i}
              position={[Math.cos(angle) * radius, i * 0.002, Math.sin(angle) * radius]}
              rotation={[0, angle, 0]}
              castShadow={castShadow}
            >
              <torusGeometry args={[0.015, 0.0015, 8, 16, Math.PI / 2]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.6} metalness={0.2} />
            </mesh>
          );
        })}
        
        {/* USB-C connector */}
        <mesh position={[0, 0.01, 0.035]} castShadow={castShadow}>
          <boxGeometry args={[0.008, 0.003, 0.012]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.3} metalness={0.9} />
        </mesh>
      </group>
    </>
  );
}

// Post-it notes with task reminders
export function PostItNotes() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  const notes = [
    { color: '#FFFF88', pos: [-0.15, 0.74, -0.4] as [number, number, number], rot: 0.1, text: 'REVIEW\nPIPELINE' },
    { color: '#FF88FF', pos: [-0.05, 0.74, -0.4] as [number, number, number], rot: -0.08, text: 'OPTIMIZE\nQUERY' },
    { color: '#88FFFF', pos: [0.05, 0.74, -0.4] as [number, number, number], rot: 0.05, text: 'TEST\nETL' },
  ];

  return (
    <>
      {notes.map((note, i) => (
        <group key={i} position={note.pos} rotation={[0, 0, note.rot]}>
          {/* Note paper */}
          <mesh castShadow={castShadow}>
            <boxGeometry args={[0.06, 0.0005, 0.06]} />
            <meshStandardMaterial 
              color={note.color}
              roughness={0.8}
              metalness={0.0}
            />
          </mesh>
          
          {/* Adhesive strip (slightly darker) */}
          <mesh position={[0, 0.0003, -0.025]} castShadow={false}>
            <boxGeometry args={[0.06, 0.0001, 0.01]} />
            <meshBasicMaterial 
              color={note.color}
              transparent
              opacity={0.6}
            />
          </mesh>
          
          {/* Text */}
          <Text
            position={[0, 0.001, 0]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={0.008}
            color="#1A1A1A"
            anchorX="center"
            anchorY="middle"
            font="/fonts/IBMPlexMono-Regular.ttf"
            lineHeight={1.2}
          >
            {note.text}
          </Text>
          
          {/* Slight curl at bottom corner */}
          <mesh position={[0.025, 0.0008, 0.025]} rotation={[-Math.PI / 8, 0, Math.PI / 8]} castShadow={false}>
            <boxGeometry args={[0.01, 0.0003, 0.01]} />
            <meshStandardMaterial color={note.color} roughness={0.8} />
          </mesh>
        </group>
      ))}
    </>
  );
}

// Laptop with powered-on screen
export function PoweredLaptop() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const screenRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.5 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0.5, 0.73, 0.2]} rotation={[0, -Math.PI / 6, 0]}>
      {/* Laptop base */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.008, 0.11]} />
        <meshStandardMaterial 
          color="#A0A0A0"
          roughness={0.3}
          metalness={0.8}
        />
      </mesh>
      
      {/* Keyboard area */}
      <mesh position={[0, 0.005, 0.01]} castShadow={false}>
        <planeGeometry args={[0.13, 0.09]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.7} />
      </mesh>
      
      {/* Touchpad */}
      <mesh position={[0, 0.0055, 0.04]} castShadow={false}>
        <planeGeometry args={[0.06, 0.04]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.2} metalness={0.5} />
      </mesh>
      
      {/* Screen lid */}
      <mesh position={[0, 0.06, -0.045]} rotation={[-Math.PI / 6, 0, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.1, 0.005]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Bezel */}
      <mesh position={[0, 0.06, -0.0425]} rotation={[-Math.PI / 6, 0, 0]} castShadow={false}>
        <boxGeometry args={[0.145, 0.095, 0.001]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.9} />
      </mesh>
      
      {/* Powered screen */}
      <mesh 
        ref={screenRef}
        position={[0, 0.06, -0.042]} 
        rotation={[-Math.PI / 6, 0, 0]} 
        castShadow={false}
      >
        <planeGeometry args={[0.135, 0.085]} />
        <meshStandardMaterial 
          color="#1E3A8A"
          emissive="#3B82F6"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Screen glow */}
      <pointLight 
        position={[0, 0.08, -0.04]} 
        intensity={0.2} 
        distance={0.3} 
        color="#3B82F6" 
      />
      
      {/* Camera dot */}
      <mesh position={[0, 0.1, -0.0425]} rotation={[-Math.PI / 6, 0, 0]} castShadow={false}>
        <circleGeometry args={[0.002, 16]} />
        <meshStandardMaterial 
          color="#00FF00"
          emissive="#00FF00"
          emissiveIntensity={0.6}
        />
      </mesh>
    </group>
  );
}

import { useRef, useState, useCallback } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

// Enhanced coffee mug with steam animation
export function InteractiveCoffeeMug({ position }: { position: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [showSteam, setShowSteam] = useState(false);
  const steamParticles = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (steamParticles.current && showSteam) {
      const positions = steamParticles.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Rise
        positions[i + 1] += 0.001;
        // Dissipate (move outward)
        positions[i] += (Math.random() - 0.5) * 0.0005;
        positions[i + 2] += (Math.random() - 0.5) * 0.0005;
        
        // Reset if too high
        if (positions[i + 1] > position[1] + 0.15) {
          positions[i] = position[0] + (Math.random() - 0.5) * 0.02;
          positions[i + 1] = position[1] + 0.05;
          positions[i + 2] = position[2] + (Math.random() - 0.5) * 0.02;
        }
      }
      
      steamParticles.current.geometry.attributes.position.needsUpdate = true;
      
      // Auto-stop after 5 seconds
      if (state.clock.elapsedTime % 5 < 0.016) {
        setShowSteam(false);
      }
    }
  });

  const particlePositions = new Float32Array(50 * 3);
  for (let i = 0; i < 50; i++) {
    particlePositions[i * 3] = position[0] + (Math.random() - 0.5) * 0.02;
    particlePositions[i * 3 + 1] = position[1] + 0.05 + Math.random() * 0.1;
    particlePositions[i * 3 + 2] = position[2] + (Math.random() - 0.5) * 0.02;
  }

  return (
    <group onClick={() => setShowSteam(true)}>
      {/* Mug body */}
      <mesh position={position} castShadow={castShadow}>
        <cylinderGeometry args={[0.035, 0.03, 0.06, 24]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.3} metalness={0.0} />
      </mesh>
      
      {/* Handle */}
      <mesh position={[position[0] + 0.043, position[1], position[2]]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
        <torusGeometry args={[0.022, 0.007, 10, 20, Math.PI * 1.5]} />
        <meshStandardMaterial color="#E8DCC8" roughness={0.3} metalness={0.0} />
      </mesh>
      
      {/* Coffee */}
      <mesh position={[position[0], position[1] + 0.024, position[2]]} castShadow={false}>
        <cylinderGeometry args={[0.033, 0.033, 0.006, 20]} />
        <meshStandardMaterial color="#3E2723" roughness={0.15} metalness={0.05} />
      </mesh>
      
      {/* Custom text/logo on mug */}
      <mesh position={[position[0], position[1], position[2] + 0.036]} castShadow={false}>
        <planeGeometry args={[0.05, 0.02]} />
        <meshStandardMaterial 
          color="#4A90E2"
          roughness={0.6}
        />
      </mesh>
      
      {/* Steam particles */}
      {showSteam && (
        <points ref={steamParticles}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={50}
              array={particlePositions}
              itemSize={3}
              args={[particlePositions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.01}
            color="#FFFFFF"
            transparent
            opacity={0.3}
            sizeAttenuation
          />
        </points>
      )}
    </group>
  );
}

// Basketball that bounces around
export function BouncingBasketball({ initialPosition }: { initialPosition: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const ballRef = useRef<THREE.Group>(null);
  const [isBouncing, setIsBouncing] = useState(false);
  const velocity = useRef(new THREE.Vector3(0, 0, 0));
  const gravity = -0.0005;

  useFrame(() => {
    if (ballRef.current && isBouncing) {
      // Apply gravity
      velocity.current.y += gravity;
      
      // Update position
      ballRef.current.position.add(velocity.current);
      
      // Floor bounce
      if (ballRef.current.position.y <= 0.76) {
        ballRef.current.position.y = 0.76;
        velocity.current.y *= -0.7; // Energy loss
        
        // Stop if velocity is too low
        if (Math.abs(velocity.current.y) < 0.001) {
          setIsBouncing(false);
          velocity.current.set(0, 0, 0);
        }
      }
      
      // Wall bounces
      if (Math.abs(ballRef.current.position.x) > 1.1) {
        velocity.current.x *= -0.7;
      }
      if (Math.abs(ballRef.current.position.z) > 1.1) {
        velocity.current.z *= -0.7;
      }
      
      // Rotation
      ballRef.current.rotation.x += velocity.current.z * 10;
      ballRef.current.rotation.z -= velocity.current.x * 10;
    }
  });

  const handleClick = useCallback(() => {
    if (!isBouncing) {
      setIsBouncing(true);
      // Random initial velocity
      velocity.current.set(
        (Math.random() - 0.5) * 0.02,
        0.03,
        (Math.random() - 0.5) * 0.02
      );
    }
  }, [isBouncing]);

  return (
    <group 
      ref={ballRef}
      position={initialPosition}
      onClick={handleClick}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      <mesh castShadow={castShadow}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial color="#FF6700" roughness={0.7} metalness={0.0} />
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
  );
}

// Clickable plant that grows when watered
export function InteractivePlant({ position }: { position: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [growth, setGrowth] = useState(1);
  const plantRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (plantRef.current) {
      plantRef.current.scale.setScalar(growth);
    }
  });

  const handleWater = useCallback(() => {
    if (growth < 1.3) {
      setGrowth((prev) => Math.min(prev + 0.1, 1.3));
    }
  }, [growth]);

  return (
    <group 
      ref={plantRef}
      position={position}
      onClick={handleWater}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Pot */}
      <mesh castShadow={castShadow}>
        <cylinderGeometry args={[0.04, 0.035, 0.05, 16]} />
        <meshStandardMaterial color="#C65D3B" roughness={0.8} metalness={0.0} />
      </mesh>
      
      {/* Soil */}
      <mesh position={[0, 0.022, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.038, 0.038, 0.006, 16]} />
        <meshStandardMaterial color="#3E2723" roughness={0.95} metalness={0.0} />
      </mesh>
      
      {/* Leaves */}
      {[
        { pos: [0, 0.06, 0], rot: [0, 0, 0.2] },
        { pos: [-0.02, 0.05, 0.01], rot: [0.2, 0.5, -0.3] },
        { pos: [0.02, 0.05, -0.01], rot: [-0.2, -0.5, 0.4] },
      ].map((leaf, i) => (
        <mesh 
          key={i}
          position={leaf.pos as [number, number, number]} 
          rotation={leaf.rot as [number, number, number]} 
          castShadow={castShadow}
        >
          <coneGeometry args={[0.025, 0.08, 8]} />
          <meshStandardMaterial color="#2E7D32" roughness={0.6} metalness={0.0} />
        </mesh>
      ))}
      
      {/* Water droplets when clicked */}
      {growth > 1 && growth < 1.3 && (
        <>
          {[...Array(5)].map((_, i) => (
            <mesh 
              key={i}
              position={[
                (Math.random() - 0.5) * 0.03,
                0.08 + i * 0.01,
                (Math.random() - 0.5) * 0.03
              ]}
              castShadow={false}
            >
              <sphereGeometry args={[0.002, 6, 6]} />
              <meshStandardMaterial 
                color="#4DD0E1"
                transparent
                opacity={0.7}
                roughness={0.1}
              />
            </mesh>
          ))}
        </>
      )}
    </group>
  );
}

// Clickable TV that cycles through content
export function InteractiveTV({ position }: { position: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [contentIndex, setContentIndex] = useState(0);
  const screenRef = useRef<THREE.Mesh>(null);

  const content = [
    { type: 'SP500', color: '#10B981', text: 'S&P 500\n+24.8%' },
    { type: 'NBA', color: '#FDB927', text: 'LAL 112\nBOS 108' },
    { type: 'Anime', color: '#FF69B4', text: 'ATTACK ON\nTITAN' },
  ];

  const currentContent = content[contentIndex];

  useFrame((state) => {
    if (screenRef.current) {
      const mat = screenRef.current.material as THREE.MeshStandardMaterial;
      mat.emissiveIntensity = 0.6 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
    }
  });

  return (
    <group 
      position={position}
      onClick={() => setContentIndex((prev) => (prev + 1) % content.length)}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* TV Frame */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[0.7, 0.4, 0.03]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Screen */}
      <mesh ref={screenRef} position={[0, 0, 0.016]} castShadow={false}>
        <planeGeometry args={[0.66, 0.36]} />
        <meshStandardMaterial 
          color={currentContent.color}
          emissive={currentContent.color}
          emissiveIntensity={0.6}
        />
      </mesh>
      
      {/* Content overlay would go here - simplified for now */}
      
      {/* Stand */}
      <mesh position={[0, -0.22, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.04, 0.1]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} metalness={0.7} />
      </mesh>
    </group>
  );
}

// Clickable headphones with sound visualization
export function InteractiveHeadphones({ position }: { position: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [isPlaying, setIsPlaying] = useState(false);
  const visualizerRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (visualizerRef.current && isPlaying) {
      const bars = visualizerRef.current.children as THREE.Mesh[];
      bars.forEach((bar, i) => {
        const scale = 1 + Math.sin(state.clock.elapsedTime * 10 + i) * 0.5;
        bar.scale.y = scale;
      });
    }
  });

  return (
    <group 
      position={position}
      onClick={() => setIsPlaying(!isPlaying)}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Headband */}
      <mesh rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
        <torusGeometry args={[0.045, 0.008, 8, 16, Math.PI]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* Left ear cup */}
      <mesh position={[-0.04, -0.03, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* Right ear cup */}
      <mesh position={[0.04, -0.03, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.025, 0.025, 0.015, 20]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.5} metalness={0.5} />
      </mesh>
      
      {/* Sound visualizer */}
      {isPlaying && (
        <group ref={visualizerRef} position={[0, 0.05, 0]}>
          {[...Array(8)].map((_, i) => (
            <mesh 
              key={i}
              position={[-0.035 + i * 0.01, 0, 0]}
              castShadow={false}
            >
              <boxGeometry args={[0.006, 0.02, 0.006]} />
              <meshStandardMaterial 
                color="#00FF00"
                emissive="#00FF00"
                emissiveIntensity={0.8}
              />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

// Window with time-of-day toggle
export function InteractiveWindow({ position, rotation }: { position: [number, number, number], rotation?: [number, number, number] }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [timeOfDay, setTimeOfDay] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('afternoon');
  const { scene } = useThree();

  const times = {
    morning: { sky: '#87CEEB', light: '#ADD8E6', intensity: 0.8 },
    afternoon: { sky: '#FFD700', light: '#FFA500', intensity: 1.0 },
    evening: { sky: '#FF6347', light: '#FF4500', intensity: 0.6 },
    night: { sky: '#0C1445', light: '#1E3A8A', intensity: 0.2 },
  };

  const currentTime = times[timeOfDay];

  const cycleTime = useCallback(() => {
    const order: Array<'morning' | 'afternoon' | 'evening' | 'night'> = ['morning', 'afternoon', 'evening', 'night'];
    const currentIndex = order.indexOf(timeOfDay);
    const nextIndex = (currentIndex + 1) % order.length;
    setTimeOfDay(order[nextIndex]);
    
    // Update scene lighting
    scene.traverse((object) => {
      if (object instanceof THREE.DirectionalLight && object.name === 'windowLight') {
        object.intensity = times[order[nextIndex]].intensity;
        object.color.set(times[order[nextIndex]].light);
      }
    });
  }, [timeOfDay, scene]);

  return (
    <group 
      position={position}
      rotation={rotation}
      onClick={cycleTime}
      onPointerOver={() => document.body.style.cursor = 'pointer'}
      onPointerOut={() => document.body.style.cursor = 'auto'}
    >
      {/* Frame */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[1.2, 1.5, 0.05]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} metalness={0.3} />
      </mesh>
      
      {/* Glass pane */}
      <mesh position={[0, 0, 0.026]} castShadow={false}>
        <planeGeometry args={[1.15, 1.45]} />
        <meshPhysicalMaterial 
          color={currentTime.sky}
          transparent
          opacity={0.7}
          roughness={0.1}
          transmission={0.5}
        />
      </mesh>
      
      {/* Window light source */}
      <directionalLight 
        name="windowLight"
        position={[0, 0, 0.5]}
        intensity={currentTime.intensity}
        color={currentTime.light}
        castShadow={quality === 'high'}
      />
    </group>
  );
}

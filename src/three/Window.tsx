import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

const skyColors = {
  day: { top: '#87CEEB', bottom: '#E0F6FF' },
  golden: { top: '#FF6B35', bottom: '#FFD93D' },
  night: { top: '#0B1026', bottom: '#1A1F3A' },
};

export function Window() {
  const meshRef = useRef<THREE.Mesh>(null);
  const timeOfDay = useStore((state) => state.timeOfDay);
  const cycleSpeed = useStore((state) => state.cycleSpeed);
  const setTimeOfDay = useStore((state) => state.setTimeOfDay);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  // Auto-cycle through time of day
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(
        timeOfDay === 'day' ? 'golden' : timeOfDay === 'golden' ? 'night' : 'day'
      );
    }, 15000 / cycleSpeed); // 15 seconds per phase, adjusted by speed

    return () => clearInterval(interval);
  }, [timeOfDay, cycleSpeed, setTimeOfDay]);

  const currentColors = skyColors[timeOfDay];

  // Animated stars for night
  const stars = useRef<THREE.Points>(null);
  useFrame((state) => {
    if (stars.current && timeOfDay === 'night') {
      stars.current.rotation.z = state.clock.elapsedTime * 0.05;
    }
  });

  const handleClick = () => {
    setCameraTarget('window');
  };

  return (
    <group
      position={[2.5, 2, -2]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {/* Window Frame */}
      <mesh position={[0, 0, 0.01]} castShadow={castShadow}>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Sky - Top Half */}
      <mesh ref={meshRef} position={[0, 0.4, 0]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshBasicMaterial color={currentColors.top} />
      </mesh>

      {/* Sky - Bottom Half (gradient effect) */}
      <mesh position={[0, -0.4, 0]}>
        <planeGeometry args={[1.0, 0.7]} />
        <meshBasicMaterial color={currentColors.bottom} />
      </mesh>

      {/* Stars (only visible at night) */}
      {timeOfDay === 'night' && (
        <points ref={stars} position={[0, 0, 0.01]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[
                new Float32Array(
                  Array.from({ length: 50 }, () => [
                    (Math.random() - 0.5) * 0.9,
                    (Math.random() - 0.5) * 1.4,
                    0,
                  ]).flat()
                ),
                3
              ]}
            />
          </bufferGeometry>
          <pointsMaterial size={0.01} color="#FFFFFF" />
        </points>
      )}

      {/* Window Cross Bar - Horizontal */}
      <mesh position={[0, 0, 0.03]} castShadow={castShadow}>
        <boxGeometry args={[1.0, 0.03, 0.02]} />
        <meshStandardMaterial color="#4A3A28" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Window Cross Bar - Vertical */}
      <mesh position={[0, 0, 0.03]} castShadow={castShadow}>
        <boxGeometry args={[0.03, 1.5, 0.02]} />
        <meshStandardMaterial color="#4A3A28" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Invisible clickable area */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[1.3, 1.7, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

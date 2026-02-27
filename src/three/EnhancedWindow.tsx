import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { glass } from './materials';

/**
 * Enhanced window with better DC skyline and animated clouds
 */
export function EnhancedWindow() {
  const cloudsRef = useRef<THREE.Group>(null);
  
  // Animate clouds
  useFrame((state) => {
    if (cloudsRef.current) {
      cloudsRef.current.position.x = (state.clock.elapsedTime * 0.1) % 20 - 10;
    }
  });
  
  // Generate cloud geometry
  const clouds = useMemo(() => {
    const cloudData = [];
    for (let i = 0; i < 8; i++) {
      cloudData.push({
        x: Math.random() * 20 - 10,
        y: 1.5 + Math.random() * 1.5,
        z: -4.9,
        scale: 0.3 + Math.random() * 0.4,
      });
    }
    return cloudData;
  }, []);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Window Frame */}
      <mesh position={[0, 1.8, -5]} castShadow receiveShadow>
        <boxGeometry args={[3.2, 2.6, 0.15]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.6} metalness={0.0} />
      </mesh>
      
      {/* Window Panes */}
      <mesh position={[0, 1.8, -4.95]} receiveShadow>
        <boxGeometry args={[2.9, 2.3, 0.02]} />
        <primitive object={glass} attach="material" />
      </mesh>
      
      {/* Window Cross Frame - Vertical */}
      <mesh position={[0, 1.8, -4.93]}>
        <boxGeometry args={[0.05, 2.3, 0.03]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      
      {/* Window Cross Frame - Horizontal */}
      <mesh position={[0, 1.8, -4.93]}>
        <boxGeometry args={[2.9, 0.05, 0.03]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.5} />
      </mesh>
      
      {/* Window Sill */}
      <mesh position={[0, 0.5, -4.95]} castShadow>
        <boxGeometry args={[3.3, 0.1, 0.2]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.7} />
      </mesh>
      
      {/* SKY - Improved gradient */}
      <mesh position={[0, 2.5, -5.5]}>
        <planeGeometry args={[12, 8]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>
      
      {/* ENHANCED DC SKYLINE - More buildings */}
      <group position={[0, 0, -5.3]}>
        {/* Washington Monument - iconic centerpiece */}
        <mesh position={[0, 1.2, 0]}>
          <boxGeometry args={[0.15, 1.8, 0.15]} />
          <meshStandardMaterial color="#E8E4DC" roughness={0.6} />
        </mesh>
        <mesh position={[0, 2.15, 0]}>
          <coneGeometry args={[0.12, 0.3, 4]} />
          <meshStandardMaterial color="#D8D4CC" roughness={0.5} />
        </mesh>
        
        {/* Capitol Building - dome */}
        <mesh position={[-2, 1.0, 0]}>
          <boxGeometry args={[0.6, 0.8, 0.4]} />
          <meshStandardMaterial color="#F5F5F5" roughness={0.5} />
        </mesh>
        <mesh position={[-2, 1.5, 0]}>
          <sphereGeometry args={[0.35, 16, 16]} />
          <meshStandardMaterial color="#E8E8E8" roughness={0.4} />
        </mesh>
        
        {/* Modern Office Building 1 */}
        <mesh position={[1.5, 1.3, 0]}>
          <boxGeometry args={[0.4, 1.6, 0.4]} />
          <meshStandardMaterial color="#B8C5D6" roughness={0.3} metalness={0.3} />
        </mesh>
        
        {/* Modern Office Building 2 */}
        <mesh position={[2.5, 1.0, 0.2]}>
          <boxGeometry args={[0.35, 1.2, 0.35]} />
          <meshStandardMaterial color="#A8B5C6" roughness={0.3} metalness={0.2} />
        </mesh>
        
        {/* Historic Building 1 */}
        <mesh position={[-3.2, 0.8, 0.1]}>
          <boxGeometry args={[0.5, 0.9, 0.4]} />
          <meshStandardMaterial color="#D8CFC0" roughness={0.6} />
        </mesh>
        
        {/* Historic Building 2 */}
        <mesh position={[-1, 0.7, 0.2]}>
          <boxGeometry args={[0.4, 0.8, 0.3]} />
          <meshStandardMaterial color="#E0D8C8" roughness={0.6} />
        </mesh>
        
        {/* Modern Tower */}
        <mesh position={[3.5, 1.5, 0.3]}>
          <boxGeometry args={[0.3, 1.8, 0.3]} />
          <meshStandardMaterial color="#9AA5B6" roughness={0.2} metalness={0.4} />
        </mesh>
        
        {/* Mid-rise Building 1 */}
        <mesh position={[0.8, 0.6, 0.15]}>
          <boxGeometry args={[0.35, 0.7, 0.35]} />
          <meshStandardMaterial color="#C5CDD8" roughness={0.5} />
        </mesh>
        
        {/* Mid-rise Building 2 */}
        <mesh position={[-2.8, 0.5, 0.25]}>
          <boxGeometry args={[0.3, 0.6, 0.3]} />
          <meshStandardMaterial color="#D0D8E0" roughness={0.5} />
        </mesh>
        
        {/* Background Buildings - Further back */}
        <mesh position={[-4, 0.9, 0.5]}>
          <boxGeometry args={[0.4, 1.0, 0.4]} />
          <meshStandardMaterial color="#B0B8C0" roughness={0.4} />
        </mesh>
        
        <mesh position={[4.2, 1.1, 0.6]}>
          <boxGeometry args={[0.35, 1.3, 0.35]} />
          <meshStandardMaterial color="#A0A8B0" roughness={0.3} metalness={0.3} />
        </mesh>
        
        {/* Smaller background fills */}
        <mesh position={[-0.5, 0.4, 0.3]}>
          <boxGeometry args={[0.25, 0.5, 0.25]} />
          <meshStandardMaterial color="#D8E0E8" roughness={0.5} />
        </mesh>
        
        <mesh position={[1.8, 0.5, 0.35]}>
          <boxGeometry args={[0.28, 0.6, 0.28]} />
          <meshStandardMaterial color="#C8D0D8" roughness={0.5} />
        </mesh>
        
        {/* Trees/foreground elements */}
        <mesh position={[-4.5, 0.3, -0.2]}>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial color="#2D5016" roughness={0.9} />
        </mesh>
        
        <mesh position={[4.5, 0.3, -0.2]}>
          <coneGeometry args={[0.2, 0.5, 8]} />
          <meshStandardMaterial color="#2D5016" roughness={0.9} />
        </mesh>
      </group>
      
      {/* ANIMATED CLOUDS */}
      <group ref={cloudsRef}>
        {clouds.map((cloud, i) => (
          <mesh key={i} position={[cloud.x, cloud.y, cloud.z]}>
            <sphereGeometry args={[cloud.scale, 8, 8]} />
            <meshBasicMaterial 
              color="#FFFFFF" 
              transparent 
              opacity={0.7}
              fog={false}
            />
          </mesh>
        ))}
      </group>
      
      {/* Sun/light source visible through window */}
      <mesh position={[3, 2.8, -5.4]}>
        <sphereGeometry args={[0.3, 16, 16]} />
        <meshBasicMaterial color="#FFFEF0" fog={false} />
      </mesh>
      
      {/* Sun glow */}
      <mesh position={[3, 2.8, -5.4]}>
        <sphereGeometry args={[0.5, 16, 16]} />
        <meshBasicMaterial 
          color="#FFEB99" 
          transparent 
          opacity={0.2}
          fog={false}
        />
      </mesh>
    </group>
  );
}

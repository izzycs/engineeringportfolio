import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

/**
 * Advanced lighting setup with rim lights, fill lights, and ambient occlusion simulation
 */
export function EnhancedLighting() {
  const quality = useStore((state) => state.quality);
  const useShadows = quality === 'high';
  
  // Dust particles reference
  const dustRef = useRef<THREE.Points>(null);
  
  // Animate dust particles
  useFrame((state) => {
    if (dustRef.current) {
      dustRef.current.rotation.y += 0.0001;
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        // Gentle float motion
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.0001;
        
        // Reset particles that drift too high
        if (positions[i + 1] > 3.5) {
          positions[i + 1] = 0.2;
        }
      }
      
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  // Generate dust particles
  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = useShadows ? 200 : 100;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;     // x
      positions[i * 3 + 1] = Math.random() * 3;          // y
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10; // z
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [useShadows]);
  
  const dustMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#FFFFFF',
      size: 0.01,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);
  
  return (
    <>
      {/* Main ambient light - base illumination */}
      <ambientLight intensity={0.4} color="#F5F3ED" />
      
      {/* Hemisphere light - simulates sky and ground bounce */}
      <hemisphereLight 
        color="#FFFFEE"        // Sky color (warm white)
        groundColor="#8B7355"   // Ground reflection (warm brown)
        intensity={0.35} 
        position={[0, 5, 0]}
      />

      {/* PRIMARY SUN LIGHT - Main directional light with enhanced shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.3}
        color="#FFFEF0"
        castShadow={useShadows}
        shadow-mapSize-width={useShadows ? 2048 : 512}
        shadow-mapSize-height={useShadows ? 2048 : 512}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00005}
        shadow-normalBias={0.02}
        shadow-radius={useShadows ? 2 : 1}
      />
      
      {/* FILL LIGHT 1 - Simulates light bounce from floor (fake GI) */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.15}
        color="#D4C4A8"
      />
      
      {/* FILL LIGHT 2 - Bounce from behind (rim light effect) */}
      <directionalLight
        position={[-4, 2, -4]}
        intensity={0.2}
        color="#C9B8A3"
      />
      
      {/* FILL LIGHT 3 - Side fill for depth */}
      <directionalLight
        position={[6, 1, -2]}
        intensity={0.18}
        color="#F0E8D8"
      />

      {/* RIM LIGHT - Adds edge highlights to objects */}
      <directionalLight
        position={[-3, 3, -6]}
        intensity={0.25}
        color="#FFECD1"
      />
      
      {/* ACCENT LIGHTS - Point lights for ambiance and depth */}
      
      {/* Ceiling center - general fill */}
      <pointLight 
        position={[0, 2.8, 0]} 
        intensity={0.2} 
        color="#FFFEF5" 
        distance={6}
        decay={2}
      />
      
      {/* Desk area - purple accent */}
      <pointLight 
        position={[-1.5, 1.3, 2.2]} 
        intensity={0.18} 
        color="#A78BFA" 
        distance={3.5}
        decay={2}
      />
      
      {/* Monitor glow - blue accent */}
      <pointLight 
        position={[0, 1.2, 2]} 
        intensity={0.15} 
        color="#60A5FA" 
        distance={2.5}
        decay={2}
      />
      
      {/* Bookshelf area - warm accent */}
      <pointLight 
        position={[3, 1.5, -3]} 
        intensity={0.15} 
        color="#F59E0B" 
        distance={4}
        decay={2}
      />
      
      {/* Behind chair - cool accent */}
      <pointLight 
        position={[-3, 1.2, 1]} 
        intensity={0.12} 
        color="#8B5CF6" 
        distance={3.5}
        decay={2}
      />
      
      {/* Corner ambient - warm fill */}
      <pointLight 
        position={[-4, 2, -4]} 
        intensity={0.1} 
        color="#FCD34D" 
        distance={5}
        decay={2}
      />
      
      {/* TV area glow */}
      <pointLight 
        position={[0, 2, -4.5]} 
        intensity={0.12} 
        color="#6EE7B7" 
        distance={3}
        decay={2}
      />
      
      {/* DUST PARTICLES - Floating in light beams */}
      {useShadows && (
        <points ref={dustRef} geometry={dustGeometry} material={dustMaterial} />
      )}
      
      {/* SUBTLE SPOTLIGHTS - Focused accents */}
      
      {/* Desk spotlight from above */}
      <spotLight
        position={[0, 2.9, 1.5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={0.3}
        color="#FFFEF0"
        target-position={[0, 0.8, 2]}
        castShadow={false}
      />
      
      {/* Bookshelf spotlight */}
      <spotLight
        position={[4, 2.5, -3]}
        angle={Math.PI / 5}
        penumbra={0.6}
        intensity={0.2}
        color="#FFF7ED"
        target-position={[3.5, 1, -3]}
        castShadow={false}
      />
    </>
  );
}

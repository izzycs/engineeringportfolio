import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useStore } from '../store/useStore';

/**
 * ROUND 9: PHOTOREALISTIC LIGHTING
 * Advanced lighting system with:
 * - Caustics simulation from window
 * - Screen backlight bleed
 * - Enhanced RGB keyboard reflections
 * - High-quality shadows
 * - Contact shadows
 * - Temperature-shifted window light
 */
export function PhotorealisticLighting() {
  const quality = useStore((state) => state.quality);
  const useShadows = quality === 'high';
  
  const dustRef = useRef<THREE.Points>(null);
  const causticsRef = useRef<THREE.Mesh>(null);
  const screenGlowRef = useRef<THREE.PointLight>(null);
  const rgbLightRef = useRef<THREE.PointLight>(null);
  
  // Animated caustics pattern from window
  useFrame((state) => {
    const time = state.clock.elapsedTime;
    
    // Dust particle animation
    if (dustRef.current) {
      dustRef.current.rotation.y += 0.0001;
      const positions = dustRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time * 0.5 + i) * 0.0001;
        if (positions[i + 1] > 3.5) positions[i + 1] = 0.2;
      }
      
      dustRef.current.geometry.attributes.position.needsUpdate = true;
    }
    
    // Caustics animation
    if (causticsRef.current) {
      const material = causticsRef.current.material as THREE.MeshBasicMaterial;
      material.opacity = 0.08 + Math.sin(time * 0.3) * 0.02;
    }
    
    // Screen backlight pulse
    if (screenGlowRef.current) {
      screenGlowRef.current.intensity = 0.25 + Math.sin(time * 0.5) * 0.05;
    }
    
    // RGB keyboard wave effect
    if (rgbLightRef.current) {
      const hue = (time * 0.1) % 1;
      rgbLightRef.current.color.setHSL(hue, 0.8, 0.6);
      rgbLightRef.current.intensity = 0.3 + Math.sin(time * 2) * 0.1;
    }
  });
  
  // Generate dust particles
  const dustGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const particleCount = useShadows ? 300 : 150;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 10;
      positions[i * 3 + 1] = Math.random() * 3;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, [useShadows]);
  
  const dustMaterial = useMemo(() => {
    return new THREE.PointsMaterial({
      color: '#FFFFFF',
      size: 0.012,
      transparent: true,
      opacity: 0.18,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
  }, []);
  
  // Caustics texture (simple projected pattern from window)
  const causticsTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d')!;
    
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, 512, 512);
    
    // Create wavy caustics pattern
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * 512;
      const y = Math.random() * 512;
      const radius = 30 + Math.random() * 60;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);
      gradient.addColorStop(0, 'rgba(255, 255, 240, 0.3)');
      gradient.addColorStop(0.5, 'rgba(255, 255, 240, 0.1)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    }
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);
  
  return (
    <>
      {/* AMBIENT LIGHTING - Base illumination */}
      <ambientLight intensity={0.35} color="#F5F3ED" />
      
      {/* HEMISPHERE LIGHT - Sky and ground bounce */}
      <hemisphereLight 
        color="#FFFEF8"
        groundColor="#8B7355"
        intensity={0.32}
        position={[0, 5, 0]}
      />

      {/* PRIMARY SUN LIGHT - Enhanced shadows for high quality */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.4}
        color="#FFFEF0"
        castShadow={useShadows}
        shadow-mapSize-width={useShadows ? 4096 : 1024}
        shadow-mapSize-height={useShadows ? 4096 : 1024}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.00002}
        shadow-normalBias={0.01}
        shadow-radius={useShadows ? 2.5 : 1}
      />
      
      {/* WINDOW LIGHT - Warmer temperature near window */}
      <directionalLight
        position={[0, 4, -5]}
        intensity={0.6}
        color="#FFF8E0" // Warmer tint
        castShadow={false}
      />
      
      {/* CAUSTICS PROJECTION - Simulated water-like light patterns */}
      {useShadows && (
        <mesh
          ref={causticsRef}
          position={[0, 0.01, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[8, 8]} />
          <meshBasicMaterial
            map={causticsTexture}
            transparent
            opacity={0.1}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
      
      {/* SCREEN BACKLIGHT BLEED - Light spilling onto desk */}
      <pointLight
        ref={screenGlowRef}
        position={[0, 0.9, 2.3]}
        intensity={0.25}
        color="#4A90FF"
        distance={1.5}
        decay={2}
        castShadow={false}
      />
      
      {/* ENHANCED RGB KEYBOARD REFLECTION - More pronounced */}
      <pointLight
        ref={rgbLightRef}
        position={[-0.3, 0.85, 2]}
        intensity={0.35}
        color="#FF00FF"
        distance={1.2}
        decay={2}
        castShadow={false}
      />
      
      {/* CONTACT SHADOWS - Objects touching surfaces */}
      {/* Desk contact shadow enhancer */}
      <directionalLight
        position={[0, 0.1, 0]}
        intensity={0.12}
        color="#000000"
        castShadow={false}
      />
      
      {/* FILL LIGHTS - Global illumination approximation */}
      <directionalLight
        position={[0, -2, 0]}
        intensity={0.18}
        color="#D4C4A8"
      />
      
      <directionalLight
        position={[-4, 2, -4]}
        intensity={0.22}
        color="#C9B8A3"
      />
      
      <directionalLight
        position={[6, 1, -2]}
        intensity={0.2}
        color="#F0E8D8"
      />

      {/* RIM LIGHT - Edge highlights */}
      <directionalLight
        position={[-3, 3, -6]}
        intensity={0.28}
        color="#FFECD1"
      />
      
      {/* ACCENT POINT LIGHTS - Depth and atmosphere */}
      <pointLight 
        position={[0, 2.8, 0]} 
        intensity={0.22} 
        color="#FFFEF5" 
        distance={6}
        decay={2}
      />
      
      <pointLight 
        position={[-1.5, 1.3, 2.2]} 
        intensity={0.2} 
        color="#A78BFA" 
        distance={3.5}
        decay={2}
      />
      
      <pointLight 
        position={[0, 1.2, 2]} 
        intensity={0.18} 
        color="#60A5FA" 
        distance={2.5}
        decay={2}
      />
      
      <pointLight 
        position={[3, 1.5, -3]} 
        intensity={0.18} 
        color="#F59E0B" 
        distance={4}
        decay={2}
      />
      
      <pointLight 
        position={[-3, 1.2, 1]} 
        intensity={0.14} 
        color="#8B5CF6" 
        distance={3.5}
        decay={2}
      />
      
      <pointLight 
        position={[-4, 2, -4]} 
        intensity={0.12} 
        color="#FCD34D" 
        distance={5}
        decay={2}
      />
      
      <pointLight 
        position={[0, 2, -4.5]} 
        intensity={0.14} 
        color="#6EE7B7" 
        distance={3}
        decay={2}
      />
      
      {/* DUST PARTICLES - Floating in light beams */}
      <points ref={dustRef} geometry={dustGeometry} material={dustMaterial} />
      
      {/* SPOTLIGHTS - Focused accents */}
      <spotLight
        position={[0, 2.9, 1.5]}
        angle={Math.PI / 6}
        penumbra={0.5}
        intensity={0.35}
        color="#FFFEF0"
        target-position={[0, 0.8, 2]}
        castShadow={useShadows}
        shadow-mapSize-width={useShadows ? 1024 : 512}
        shadow-mapSize-height={useShadows ? 1024 : 512}
        shadow-bias={-0.0001}
      />
      
      <spotLight
        position={[4, 2.5, -3]}
        angle={Math.PI / 5}
        penumbra={0.6}
        intensity={0.25}
        color="#FFF7ED"
        target-position={[3.5, 1, -3]}
        castShadow={false}
      />
    </>
  );
}

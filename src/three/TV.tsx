import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

export function TV() {
  const meshRef = useRef<THREE.Mesh>(null);
  const quality = useStore((state) => state.quality);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const castShadow = quality === 'high';

  // Simple shader for animated screen effect
  const screenMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
      },
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float time;
        varying vec2 vUv;
        
        void main() {
          // Code rain effect simulation
          float col = fract(sin(vUv.x * 20.0 + time) * 43758.5453);
          float row = fract(sin(vUv.y * 15.0 - time * 2.0) * 12345.6789);
          float brightness = col * row * 0.5 + 0.2;
          
          vec3 color = vec3(0.2, brightness * 0.8, 0.3);
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });
  }, []);

  useFrame((state) => {
    if (meshRef.current && screenMaterial) {
      screenMaterial.uniforms.time.value = state.clock.elapsedTime;
    }
  });

  const handleClick = () => {
    setCameraTarget('tv');
  };

  return (
    <group
      position={[0, 1.8, -4.9]}
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
      {/* TV Frame */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* TV Screen with shader */}
      <mesh ref={meshRef} position={[0, 0, 0.026]}>
        <planeGeometry args={[1.5, 0.84]} />
        <primitive object={screenMaterial} attach="material" />
      </mesh>

      {/* TV Mount */}
      <mesh position={[0, 0, -0.05]} castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Invisible clickable area */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[1.7, 1, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

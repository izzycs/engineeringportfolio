import { useRef, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { soundEffects } from '../utils/soundEffects';

export function EasterEggs() {
  const { camera } = useThree();
  
  // Basketball state
  const basketballRef = useRef<THREE.Mesh>(null);
  const [ballBouncing, setBallBouncing] = useState(false);
  const [ballVelocity, setBallVelocity] = useState(0);
  const bounceTime = useRef(0);
  
  // Camera shake state
  const cameraShakeIntensity = useRef(0);
  const cameraOriginalPosition = useRef(new THREE.Vector3());
  
  // Portal state
  const portalRef = useRef<THREE.Mesh>(null);
  const [portalHovered, setPortalHovered] = useState(false);
  const [portalColor, setPortalColor] = useState(0);
  
  // Click counter
  const [clickCount, setClickCount] = useState(0);

  // Basketball bounce physics
  useFrame((_state, delta) => {
    if (basketballRef.current && ballBouncing) {
      bounceTime.current += delta;
      
      // Simple gravity-based bounce
      const gravity = -9.8;
      const newVelocity = ballVelocity + gravity * delta;
      const newY = basketballRef.current.position.y + newVelocity * delta;
      
      // Ground collision at y = 0.15 (ball radius)
      if (newY <= 0.15) {
        setBallVelocity(-newVelocity * 0.7); // Bounce with energy loss
        basketballRef.current.position.y = 0.15;
        
        // Trigger camera shake and sound on bounce
        const impactStrength = Math.abs(newVelocity);
        if (impactStrength > 0.5) {
          cameraShakeIntensity.current = Math.min(impactStrength * 0.02, 0.08);
          soundEffects.play('bounce');
        }
        
        // Stop bouncing after energy dissipates
        if (Math.abs(newVelocity) < 0.5) {
          setBallBouncing(false);
          setBallVelocity(0);
        }
      } else {
        setBallVelocity(newVelocity);
        basketballRef.current.position.y = newY;
      }
      
      // Rotate while bouncing
      basketballRef.current.rotation.x += delta * 3;
      basketballRef.current.rotation.z += delta * 2;
    }
    
    // Camera shake effect
    if (cameraShakeIntensity.current > 0.001) {
      // Save original position on first shake frame
      if (cameraShakeIntensity.current > 0.01) {
        cameraOriginalPosition.current.copy(camera.position);
      }
      
      // Apply shake
      const shakeX = (Math.random() - 0.5) * cameraShakeIntensity.current;
      const shakeY = (Math.random() - 0.5) * cameraShakeIntensity.current;
      const shakeZ = (Math.random() - 0.5) * cameraShakeIntensity.current;
      
      camera.position.x += shakeX;
      camera.position.y += shakeY;
      camera.position.z += shakeZ;
      
      // Decay shake intensity with spring-like damping
      cameraShakeIntensity.current *= 0.9;
    }
    
    // Portal color cycling
    if (portalRef.current) {
      if (portalHovered) {
        setPortalColor((prev) => (prev + delta * 2) % (Math.PI * 2));
      }
      
      const hue = Math.sin(portalColor) * 0.5 + 0.5;
      const color = new THREE.Color().setHSL(hue, 1, 0.5);
      (portalRef.current.material as THREE.MeshStandardMaterial).color = color;
      (portalRef.current.material as THREE.MeshStandardMaterial).emissive = color;
      (portalRef.current.material as THREE.MeshStandardMaterial).emissiveIntensity = portalHovered ? 0.8 : 0.4;
    }
  });

  const handleBasketballClick = () => {
    if (!ballBouncing && basketballRef.current) {
      setBallBouncing(true);
      setBallVelocity(3); // Initial upward velocity
      bounceTime.current = 0;
      setClickCount((prev) => prev + 1);
      soundEffects.play('click');
    }
  };

  return (
    <group>
      {/* Hidden Basketball - near corner of room */}
      <mesh
        ref={basketballRef}
        position={[3.2, 0.15, 3.2]}
        onClick={handleBasketballClick}
        onPointerOver={() => {
          document.body.style.cursor = 'pointer';
          soundEffects.play('hover');
        }}
        onPointerOut={() => document.body.style.cursor = 'default'}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshStandardMaterial 
          color="#E07B39"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Basketball stripes */}
      <mesh position={[3.2, 0.15, 3.2]}>
        <torusGeometry args={[0.15, 0.01, 8, 24]} />
        <meshStandardMaterial color="#1a1a1a" />
      </mesh>

      {/* Glowing Portal - near bookshelf */}
      <mesh
        ref={portalRef}
        position={[-2.8, 1.5, -2.8]}
        rotation={[0, Math.PI / 4, 0]}
        onPointerOver={() => {
          setPortalHovered(true);
          document.body.style.cursor = 'pointer';
          soundEffects.play('hover');
        }}
        onPointerOut={() => {
          setPortalHovered(false);
          document.body.style.cursor = 'default';
        }}
        onClick={() => {
          setClickCount((prev) => prev + 1);
          soundEffects.play('click');
          alert(`🎉 You found the portal! Total interactions: ${clickCount + 1}`);
        }}
      >
        <torusGeometry args={[0.3, 0.05, 16, 32]} />
        <meshStandardMaterial 
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.4}
          toneMapped={false}
        />
      </mesh>

      {/* Portal inner glow */}
      <mesh
        position={[-2.8, 1.5, -2.8]}
        rotation={[0, Math.PI / 4, 0]}
      >
        <circleGeometry args={[0.25, 32]} />
        <meshBasicMaterial 
          color="#A78BFA"
          transparent
          opacity={portalHovered ? 0.6 : 0.3}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Click counter display (hidden, tracked in state) */}
      {clickCount > 0 && (
        <mesh position={[0, 2.8, 0]}>
          <planeGeometry args={[0.5, 0.2]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
      )}
    </group>
  );
}

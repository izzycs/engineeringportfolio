import { useStore } from '../store/useStore';

export function DeskLamp() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  // Position on back-left corner of desk
  return (
    <group position={[-0.55, 0.73, -0.3]}>
      {/* Lamp Base - circular */}
      <mesh position={[0, 0.02, 0]} castShadow={castShadow}>
        <cylinderGeometry args={[0.05, 0.06, 0.04, 16]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Lamp Arm - lower segment */}
      <mesh position={[0, 0.12, 0]} rotation={[0, 0, Math.PI / 6]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.2, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Lamp Arm - upper segment */}
      <mesh position={[0.05, 0.28, 0]} rotation={[0, 0, -Math.PI / 8]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.18, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Lamp Head/Shade - cone shape */}
      <mesh position={[0.08, 0.38, 0]} rotation={[Math.PI, 0, 0]} castShadow={castShadow}>
        <coneGeometry args={[0.06, 0.08, 16]} />
        <meshStandardMaterial 
          color="#2A2A2A" 
          roughness={0.3} 
          metalness={0.8}
          emissive="#FFA500"
          emissiveIntensity={0.1}
        />
      </mesh>

      {/* Warm Point Light from lamp head */}
      <pointLight 
        position={[0.08, 0.35, 0]} 
        intensity={0.8} 
        color="#FFA500"
        distance={1.5}
        decay={2}
        castShadow={castShadow}
      />
    </group>
  );
}

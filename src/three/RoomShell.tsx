import { useStore } from '../store/useStore';

export function RoomShell() {
  const quality = useStore((state) => state.quality);
  const receiveShadow = quality === 'high';

  return (
    <group>
      {/* Floor - Enhanced wood texture */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#7A6247"
          roughness={0.85}
          metalness={0.05}
          roughnessMap={undefined}
          normalScale={[0.5, 0.5]}
          envMapIntensity={0.3}
        />
      </mesh>

      {/* Back Wall */}
      <mesh position={[0, 2.5, -5]} receiveShadow={receiveShadow}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.95} metalness={0} />
      </mesh>

      {/* Left Wall */}
      <mesh
        position={[-5, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.95} metalness={0} />
      </mesh>

      {/* Right Wall */}
      <mesh
        position={[5, 2.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.95} metalness={0} />
      </mesh>

      {/* Ceiling */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.9} metalness={0} />
      </mesh>

      {/* Front Wall (behind camera) */}
      <mesh
        position={[0, 2.5, 5]}
        rotation={[0, Math.PI, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#E8E4DC" roughness={0.95} metalness={0} />
      </mesh>

      {/* Door on Front Wall */}
      <group position={[-2, 0, 4.99]} rotation={[0, Math.PI, 0]}>
        {/* Door frame */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 2.2, 0.05]} />
          <meshStandardMaterial color="#8B7355" roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Door panel */}
        <mesh position={[0, 1, -0.03]}>
          <planeGeometry args={[0.9, 2.0]} />
          <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Door handle */}
        <mesh position={[-0.35, 1, -0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Poster on Front Wall */}
      <mesh position={[2, 2.5, 4.99]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[2, 2.5, 4.98]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#9B59B6" />
      </mesh>

      {/* Poster Frames on Back Wall */}
      <mesh position={[-2, 2.5, -4.99]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[-2, 2.5, -4.98]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#3498DB" />
      </mesh>

      <mesh position={[2, 2.5, -4.99]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[2, 2.5, -4.98]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#E74C3C" />
      </mesh>
    </group>
  );
}

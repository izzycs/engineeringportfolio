import { useStore } from '../store/useStore';

export function RoomShell() {
  const quality = useStore((state) => state.quality);
  const receiveShadow = quality === 'high';

  return (
    <group>
      {/* Floor */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
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

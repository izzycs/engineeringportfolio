export function Chair() {
  return (
    <group position={[0, 0, 1.2]}>
      {/* Gas lift / center pole */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
      </mesh>

      {/* Base star (5-pointed) */}
      <group position={[0, 0.05, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const x = Math.cos(angle) * 0.25;
          const z = Math.sin(angle) * 0.25;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.08, 0.04, 0.3]} />
              <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.3} />
            </mesh>
          );
        })}
      </group>

      {/* Wheels */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.cos(angle) * 0.25;
        const z = Math.sin(angle) * 0.25;
        return (
          <mesh key={`wheel-${i}`} position={[x, 0.02, z]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
            <meshStandardMaterial color="#3a3a3a" roughness={0.6} />
          </mesh>
        );
      })}

      {/* Seat */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.08, 32]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Seat cushion detail */}
      <mesh position={[0, 0.69, 0]}>
        <cylinderGeometry args={[0.24, 0.21, 0.02, 32]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Backrest support posts */}
      <mesh position={[-0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>
      <mesh position={[0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial color="#2a2a2a" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Backrest */}
      <mesh position={[0, 1.0, -0.25]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.45, 0.08]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.8} />
      </mesh>

      {/* Backrest padding detail */}
      <mesh position={[0, 1.0, -0.21]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.02]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
      </mesh>

      {/* Lumbar support */}
      <mesh position={[0, 0.95, -0.21]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.15, 0.05]} />
        <meshStandardMaterial color="#3a3a3a" roughness={0.7} />
      </mesh>

      {/* Armrests */}
      <group>
        {/* Left armrest */}
        <mesh position={[-0.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[-0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Right armrest */}
        <mesh position={[0.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.25]} />
          <meshStandardMaterial color="#1a1a1a" metalness={0.6} roughness={0.4} />
        </mesh>
        <mesh position={[0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>
    </group>
  );
}

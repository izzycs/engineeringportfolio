import { fabricMesh, fabricSeat, plasticABS, metalChrome, rubberWheel } from './materials';

export function Chair() {
  return (
    <group position={[0, 0, 1.2]}>
      {/* Gas lift / center pole - Chrome Finish */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 20]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>
      
      {/* Gas lift cover - Plastic */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.035, 0.04, 16]} />
        <meshStandardMaterial {...plasticABS} />
      </mesh>

      {/* Base star (5-pointed) - Reinforced Plastic */}
      <group position={[0, 0.05, 0]}>
        {[0, 1, 2, 3, 4].map((i) => {
          const angle = (i * Math.PI * 2) / 5;
          const x = Math.cos(angle) * 0.25;
          const z = Math.sin(angle) * 0.25;
          return (
            <mesh key={i} position={[x, 0, z]} rotation={[0, angle, 0]}>
              <boxGeometry args={[0.08, 0.04, 0.3]} />
              <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.1} />
            </mesh>
          );
        })}
      </group>

      {/* Wheels - Rubber with Plastic Core */}
      {[0, 1, 2, 3, 4].map((i) => {
        const angle = (i * Math.PI * 2) / 5;
        const x = Math.cos(angle) * 0.25;
        const z = Math.sin(angle) * 0.25;
        return (
          <group key={`wheel-${i}`} position={[x, 0.02, z]}>
            {/* Rubber wheel */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.035, 0.035, 0.04, 16]} />
              <meshStandardMaterial {...rubberWheel} />
            </mesh>
            {/* Plastic core */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.041, 8]} />
              <meshStandardMaterial color="#3A3A3A" roughness={0.6} metalness={0.2} />
            </mesh>
          </group>
        );
      })}

      {/* Seat - Fabric Material */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.08, 32]} />
        <meshStandardMaterial {...fabricSeat} />
      </mesh>

      {/* Seat cushion detail - Stitching Effect */}
      <mesh position={[0, 0.69, 0]}>
        <cylinderGeometry args={[0.24, 0.21, 0.02, 32]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.95} metalness={0.0} />
      </mesh>
      
      {/* Seat Base/Pan - Plastic */}
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.22, 0.2, 0.02, 24]} />
        <meshStandardMaterial {...plasticABS} />
      </mesh>

      {/* Backrest support posts - Chrome */}
      <mesh position={[-0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>
      <mesh position={[0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>

      {/* Backrest Frame - Plastic */}
      <mesh position={[0, 1.0, -0.25]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.45, 0.08]} />
        <meshStandardMaterial {...plasticABS} />
      </mesh>

      {/* Backrest Mesh/Fabric */}
      <mesh position={[0, 1.0, -0.21]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.02]} />
        <meshStandardMaterial {...fabricMesh} />
      </mesh>

      {/* Lumbar support - Extra Padding */}
      <mesh position={[0, 0.95, -0.21]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.25, 0.15, 0.05]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
      </mesh>

      {/* Armrests - Plastic with Padding */}
      <group>
        {/* Left armrest top - Plastic */}
        <mesh position={[-0.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.25]} />
          <meshStandardMaterial {...plasticABS} />
        </mesh>
        {/* Left armrest padding */}
        <mesh position={[-0.25, 0.77, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.055, 0.01, 0.24]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>
        {/* Left armrest post - Chrome */}
        <mesh position={[-0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <meshStandardMaterial {...metalChrome} />
        </mesh>

        {/* Right armrest top - Plastic */}
        <mesh position={[0.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.25]} />
          <meshStandardMaterial {...plasticABS} />
        </mesh>
        {/* Right armrest padding */}
        <mesh position={[0.25, 0.77, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.055, 0.01, 0.24]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>
        {/* Right armrest post - Chrome */}
        <mesh position={[0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <meshStandardMaterial {...metalChrome} />
        </mesh>
      </group>
    </group>
  );
}

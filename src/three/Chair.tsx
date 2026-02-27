import { createRealisticFabric, createRealisticMetal, createRealisticPlastic } from './proceduralMaterials';

export function Chair() {
  // Enhanced materials
  const fabricMeshMat = createRealisticFabric('#2C2C2C', 0.95);
  const fabricSeatMat = createRealisticFabric('#1A1A1A', 0.9);
  const mattePlasticMat = createRealisticPlastic('#2A2A2A', false);
  const chromeMat = createRealisticMetal('#C0C0C0', 0.15, 0.2);
  const rubberMat = createRealisticPlastic('#0A0A0A', false);
  
  return (
    <group position={[0, 0, 0]}>
      {/* Gas lift / center pole - Chrome Finish */}
      <mesh position={[0, 0.3, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.6, 20]} />
        <primitive object={chromeMat.clone()} attach="material" />
      </mesh>
      
      {/* Gas lift cover - Plastic */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.05, 0.035, 0.04, 16]} />
        <primitive object={mattePlasticMat.clone()} attach="material" />
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
              <primitive object={rubberMat.clone()} attach="material" />
            </mesh>
            {/* Plastic core */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.015, 0.015, 0.041, 8]} />
              <primitive object={mattePlasticMat.clone()} attach="material" />
            </mesh>
          </group>
        );
      })}

      {/* Seat - Fabric Material */}
      <mesh position={[0, 0.65, 0]}>
        <cylinderGeometry args={[0.25, 0.22, 0.08, 32]} />
        <primitive object={fabricSeatMat.clone()} attach="material" />
      </mesh>

      {/* Seat cushion detail - Stitching Effect */}
      <mesh position={[0, 0.69, 0]}>
        <cylinderGeometry args={[0.24, 0.21, 0.02, 32]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.95} metalness={0.0} />
      </mesh>
      
      {/* Seat Base/Pan - Plastic */}
      <mesh position={[0, 0.61, 0]}>
        <cylinderGeometry args={[0.22, 0.2, 0.02, 24]} />
        <primitive object={mattePlasticMat.clone()} attach="material" />
      </mesh>

      {/* Backrest support posts - Chrome */}
      <mesh position={[-0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <primitive object={chromeMat.clone()} attach="material" />
      </mesh>
      <mesh position={[0.15, 0.85, -0.15]} rotation={[0.2, 0, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <primitive object={chromeMat.clone()} attach="material" />
      </mesh>

      {/* Backrest Frame - Plastic */}
      <mesh position={[0, 1.0, -0.25]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.35, 0.45, 0.08]} />
        <primitive object={mattePlasticMat.clone()} attach="material" />
      </mesh>

      {/* Backrest Mesh/Fabric */}
      <mesh position={[0, 1.0, -0.21]} rotation={[0.2, 0, 0]}>
        <boxGeometry args={[0.3, 0.4, 0.02]} />
        <primitive object={fabricMeshMat.clone()} attach="material" />
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
          <primitive object={mattePlasticMat.clone()} attach="material" />
        </mesh>
        {/* Left armrest padding */}
        <mesh position={[-0.25, 0.77, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.055, 0.01, 0.24]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>
        {/* Left armrest post - Chrome */}
        <mesh position={[-0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <primitive object={chromeMat.clone()} attach="material" />
        </mesh>

        {/* Right armrest top - Plastic */}
        <mesh position={[0.25, 0.75, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.06, 0.04, 0.25]} />
          <primitive object={mattePlasticMat.clone()} attach="material" />
        </mesh>
        {/* Right armrest padding */}
        <mesh position={[0.25, 0.77, 0]} rotation={[0, 0, 0]}>
          <boxGeometry args={[0.055, 0.01, 0.24]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.85} metalness={0.0} />
        </mesh>
        {/* Right armrest post - Chrome */}
        <mesh position={[0.25, 0.65, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.15, 16]} />
          <primitive object={chromeMat.clone()} attach="material" />
        </mesh>
      </group>
    </group>
  );
}

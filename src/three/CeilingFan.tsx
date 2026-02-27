export function CeilingFan() {
  return (
    <group position={[0, 0, 0]}>
      {/* Ceiling mount */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.1, 16]} />
        <meshStandardMaterial color="#d4d4d4" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Motor housing */}
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.12, 0.15, 0.15, 32]} />
        <meshStandardMaterial color="#e5e5e5" metalness={0.6} roughness={0.4} />
      </mesh>

      {/* Blades group (rotating) */}
      <group position={[0, -0.15, 0]}>
        {/* 4 blades */}
        {[0, 1, 2, 3].map((i) => {
          const angle = (i * Math.PI) / 2;
          const x = Math.cos(angle) * 0.35;
          const z = Math.sin(angle) * 0.35;
          
          return (
            <group key={i} position={[x / 2, 0, z / 2]} rotation={[0, angle, 0]}>
              {/* Blade */}
              <mesh position={[0.35, 0, 0]} rotation={[0, 0, -0.05]}>
                <boxGeometry args={[0.7, 0.02, 0.15]} />
                <meshStandardMaterial 
                  color="#8B7355" 
                  roughness={0.7}
                  metalness={0.1}
                />
              </mesh>
              
              {/* Blade holder */}
              <mesh position={[0.1, -0.02, 0]}>
                <boxGeometry args={[0.2, 0.03, 0.08]} />
                <meshStandardMaterial color="#d4d4d4" metalness={0.8} roughness={0.2} />
              </mesh>
            </group>
          );
        })}

        {/* Center hub */}
        <mesh>
          <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} />
          <meshStandardMaterial color="#c0c0c0" metalness={0.8} roughness={0.2} />
        </mesh>
      </group>

      {/* Light fixture (optional detail) */}
      <mesh position={[0, -0.25, 0]}>
        <cylinderGeometry args={[0.1, 0.12, 0.08, 16]} />
        <meshStandardMaterial 
          color="#f5f5f5"
          emissive="#ffffee"
          emissiveIntensity={0.2}
          roughness={0.3}
        />
      </mesh>
    </group>
  );
}

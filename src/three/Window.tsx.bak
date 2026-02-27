import { useStore } from '../store/useStore';

export function Window() {
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  const handleClick = () => {
    setCameraTarget('window');
  };

  return (
    <group
      position={[4.95, 2, 0]}
      rotation={[0, -Math.PI / 2, 0]}
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
      {/* Window Frame */}
      <mesh position={[0, 0, 0.01]} castShadow={castShadow}>
        <boxGeometry args={[1.2, 1.6, 0.05]} />
        <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* DC Skyline - Sky Background */}
      <mesh position={[0, 0.3, -0.01]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>

      {/* Ground/Horizon */}
      <mesh position={[0, -0.5, -0.005]}>
        <planeGeometry args={[1.0, 0.5]} />
        <meshBasicMaterial color="#2D5016" />
      </mesh>

      {/* Washington Monument - Tall obelisk (center, closest) */}
      <group position={[0, 0.1, 0.008]}>
        {/* Monument shaft */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.05, 0.4, 0.001]} />
          <meshBasicMaterial color="#E8E8E8" />
        </mesh>
        {/* Pyramidion top */}
        <mesh position={[0, 0.22, 0]} rotation={[0, 0, Math.PI / 4]}>
          <coneGeometry args={[0.035, 0.05, 4]} />
          <meshBasicMaterial color="#D8D8D8" />
        </mesh>
        {/* Base platform */}
        <mesh position={[0, -0.21, 0]}>
          <boxGeometry args={[0.08, 0.02, 0.001]} />
          <meshBasicMaterial color="#C8C8C8" />
        </mesh>
      </group>

      {/* US Capitol Dome - Right side (mid-depth) */}
      <group position={[0.3, -0.02, 0.004]}>
        {/* Main building base */}
        <mesh position={[0, 0.02, 0]}>
          <boxGeometry args={[0.14, 0.18, 0.001]} />
          <meshBasicMaterial color="#F5F5F5" />
        </mesh>
        {/* Dome */}
        <mesh position={[0, 0.13, 0]}>
          <sphereGeometry args={[0.08, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshBasicMaterial color="#F0F0F0" />
        </mesh>
        {/* Dome top finial */}
        <mesh position={[0, 0.21, 0]}>
          <coneGeometry args={[0.015, 0.03, 8]} />
          <meshBasicMaterial color="#D0D0D0" />
        </mesh>
        {/* Columns */}
        {[-0.05, -0.025, 0, 0.025, 0.05].map((x, i) => (
          <mesh key={`col-${i}`} position={[x, -0.04, 0]}>
            <boxGeometry args={[0.008, 0.09, 0.001]} />
            <meshBasicMaterial color="#E0E0E0" />
          </mesh>
        ))}
        {/* Steps */}
        <mesh position={[0, -0.09, 0]}>
          <boxGeometry args={[0.16, 0.01, 0.001]} />
          <meshBasicMaterial color="#C8C8C8" />
        </mesh>
      </group>

      {/* Lincoln Memorial - Left side (farthest) */}
      <group position={[-0.32, -0.08, 0.001]}>
        {/* Main temple building */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.12, 0.14, 0.001]} />
          <meshBasicMaterial color="#F0F0F0" />
        </mesh>
        {/* Pediment/roof */}
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.13, 0.02, 0.001]} />
          <meshBasicMaterial color="#D8D8D8" />
        </mesh>
        {/* Triangular pediment */}
        <mesh position={[0, 0.115, 0]} rotation={[0, 0, 0]}>
          <coneGeometry args={[0.068, 0.025, 3]} />
          <meshBasicMaterial color="#D0D0D0" />
        </mesh>
        {/* Columns */}
        {[-0.045, -0.03, -0.015, 0, 0.015, 0.03, 0.045].map((x, i) => (
          <mesh key={`lincoln-col-${i}`} position={[x, -0.02, 0]}>
            <boxGeometry args={[0.006, 0.09, 0.001]} />
            <meshBasicMaterial color="#E8E8E8" />
          </mesh>
        ))}
        {/* Steps */}
        <mesh position={[0, -0.07, 0]}>
          <boxGeometry args={[0.14, 0.01, 0.001]} />
          <meshBasicMaterial color="#C0C0C0" />
        </mesh>
      </group>

      {/* Reflecting Pool - between monuments */}
      <mesh position={[0, -0.28, 0.003]}>
        <planeGeometry args={[0.4, 0.08]} />
        <meshBasicMaterial color="#5A8AA0" opacity={0.6} transparent />
      </mesh>

      {/* Trees/greenery silhouettes at various depths */}
      <mesh position={[0.42, -0.18, 0.006]}>
        <coneGeometry args={[0.035, 0.09, 6]} />
        <meshBasicMaterial color="#1A4A1A" />
      </mesh>
      <mesh position={[0.38, -0.16, 0.002]}>
        <coneGeometry args={[0.028, 0.075, 6]} />
        <meshBasicMaterial color="#1A3A0A" />
      </mesh>
      <mesh position={[-0.45, -0.18, 0.003]}>
        <coneGeometry args={[0.03, 0.08, 6]} />
        <meshBasicMaterial color="#1A4A1A" />
      </mesh>
      <mesh position={[-0.48, -0.15, 0.001]}>
        <coneGeometry args={[0.025, 0.07, 6]} />
        <meshBasicMaterial color="#0F2A0A" />
      </mesh>
      <mesh position={[0.15, -0.2, 0.005]}>
        <coneGeometry args={[0.032, 0.085, 6]} />
        <meshBasicMaterial color="#2A5A2A" />
      </mesh>

      {/* Window Cross Bar - Horizontal */}
      <mesh position={[0, 0, 0.03]} castShadow={castShadow}>
        <boxGeometry args={[1.0, 0.03, 0.02]} />
        <meshStandardMaterial color="#4A3A28" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Window Cross Bar - Vertical */}
      <mesh position={[0, 0, 0.03]} castShadow={castShadow}>
        <boxGeometry args={[0.03, 1.5, 0.02]} />
        <meshStandardMaterial color="#4A3A28" roughness={0.7} metalness={0.1} />
      </mesh>

      {/* Invisible clickable area */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[1.3, 1.7, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

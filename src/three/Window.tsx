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
      <mesh position={[0, 0.3, 0]}>
        <planeGeometry args={[1.0, 1.0]} />
        <meshBasicMaterial color="#87CEEB" />
      </mesh>

      {/* Ground/Horizon */}
      <mesh position={[0, -0.5, 0.001]}>
        <planeGeometry args={[1.0, 0.5]} />
        <meshBasicMaterial color="#2D5016" />
      </mesh>

      {/* Washington Monument - Tall obelisk */}
      <mesh position={[-0.3, 0.1, 0.002]}>
        <boxGeometry args={[0.04, 0.35, 0.001]} />
        <meshBasicMaterial color="#E8E8E8" />
      </mesh>
      <mesh position={[-0.3, 0.29, 0.002]}>
        <coneGeometry args={[0.025, 0.04, 4]} />
        <meshBasicMaterial color="#E8E8E8" />
      </mesh>

      {/* US Capitol Dome - Dome shape */}
      <mesh position={[0.25, 0, 0.002]}>
        <boxGeometry args={[0.12, 0.15, 0.001]} />
        <meshBasicMaterial color="#F5F5F5" />
      </mesh>
      <mesh position={[0.25, 0.08, 0.002]}>
        <sphereGeometry args={[0.07, 16, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshBasicMaterial color="#F5F5F5" />
      </mesh>
      {/* Capitol columns */}
      <mesh position={[0.19, -0.03, 0.002]}>
        <boxGeometry args={[0.01, 0.08, 0.001]} />
        <meshBasicMaterial color="#E0E0E0" />
      </mesh>
      <mesh position={[0.25, -0.03, 0.002]}>
        <boxGeometry args={[0.01, 0.08, 0.001]} />
        <meshBasicMaterial color="#E0E0E0" />
      </mesh>
      <mesh position={[0.31, -0.03, 0.002]}>
        <boxGeometry args={[0.01, 0.08, 0.001]} />
        <meshBasicMaterial color="#E0E0E0" />
      </mesh>

      {/* Lincoln Memorial - Greek temple style */}
      <mesh position={[-0.05, -0.05, 0.002]}>
        <boxGeometry args={[0.1, 0.12, 0.001]} />
        <meshBasicMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[-0.05, 0.02, 0.002]}>
        <boxGeometry args={[0.11, 0.02, 0.001]} />
        <meshBasicMaterial color="#D0D0D0" />
      </mesh>

      {/* Some trees/greenery silhouettes */}
      <mesh position={[0.4, -0.15, 0.002]}>
        <coneGeometry args={[0.03, 0.08, 6]} />
        <meshBasicMaterial color="#1A3A0A" />
      </mesh>
      <mesh position={[-0.45, -0.15, 0.002]}>
        <coneGeometry args={[0.025, 0.07, 6]} />
        <meshBasicMaterial color="#1A3A0A" />
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

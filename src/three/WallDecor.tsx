import { useStore } from '../store/useStore';

export function WallDecor() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group>
      {/* Frame 1 - NBA Basketball Court (Back Wall - Left) */}
      <group position={[-2.5, 2.2, -4.95]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.8, 1.0, 0.04]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Inner content - Basketball court design */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[0.72, 0.92]} />
          <meshStandardMaterial color="#C97A3F" roughness={0.6} />
        </mesh>

        {/* Court lines - white */}
        <mesh position={[0, 0, 0.022]}>
          <planeGeometry args={[0.68, 0.02]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0.3, 0.022]}>
          <planeGeometry args={[0.02, 0.3]} />
          <meshStandardMaterial color="#FFFFFF" />
        </mesh>

        {/* Basketball hoop circle */}
        <mesh position={[0, 0.35, 0.022]}>
          <ringGeometry args={[0.08, 0.1, 16]} />
          <meshStandardMaterial color="#E74C3C" />
        </mesh>

        {/* Team color accent - Orange/Red */}
        <mesh position={[0, -0.35, 0.022]}>
          <planeGeometry args={[0.7, 0.15]} />
          <meshStandardMaterial color="#FF6B35" />
        </mesh>
      </group>

      {/* Frame 2 - Anime Poster Aesthetic (Side Wall - Right) */}
      <group position={[4.95, 2.2, 1.5]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.7, 1.0, 0.04]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Background - Vibrant purple/pink gradient effect */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[0.62, 0.92]} />
          <meshStandardMaterial color="#8B3A9C" roughness={0.6} />
        </mesh>

        {/* Top accent - bright cyan */}
        <mesh position={[0, 0.3, 0.022]}>
          <planeGeometry args={[0.6, 0.25]} />
          <meshStandardMaterial color="#00D9FF" />
        </mesh>

        {/* Character silhouette (abstract) - darker purple */}
        <mesh position={[-0.1, 0, 0.022]}>
          <planeGeometry args={[0.25, 0.6]} />
          <meshStandardMaterial color="#4A0E4E" />
        </mesh>

        {/* Accent shapes - pink/magenta */}
        <mesh position={[0.15, 0.1, 0.022]}>
          <planeGeometry args={[0.15, 0.15]} />
          <meshStandardMaterial color="#FF1493" />
        </mesh>

        {/* Bottom text bar - black with colored stripe */}
        <mesh position={[0, -0.35, 0.022]}>
          <planeGeometry args={[0.6, 0.12]} />
          <meshStandardMaterial color="#000000" />
        </mesh>
        <mesh position={[0, -0.4, 0.023]}>
          <planeGeometry args={[0.6, 0.02]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>

      {/* Frame 3 - Data Visualization Chart (Back Wall - Right) */}
      <group position={[2.5, 2.2, -4.95]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.9, 0.7, 0.04]} />
          <meshStandardMaterial color="#2C3E50" roughness={0.3} metalness={0.1} />
        </mesh>

        {/* Background - Dark tech blue */}
        <mesh position={[0, 0, 0.021]}>
          <planeGeometry args={[0.82, 0.62]} />
          <meshStandardMaterial color="#1A1F2E" roughness={0.6} />
        </mesh>

        {/* Chart bars - representing data */}
        <mesh position={[-0.25, -0.1, 0.022]}>
          <planeGeometry args={[0.08, 0.2]} />
          <meshStandardMaterial color="#4CAF50" />
        </mesh>
        <mesh position={[-0.1, -0.05, 0.022]}>
          <planeGeometry args={[0.08, 0.3]} />
          <meshStandardMaterial color="#2196F3" />
        </mesh>
        <mesh position={[0.05, -0.15, 0.022]}>
          <planeGeometry args={[0.08, 0.1]} />
          <meshStandardMaterial color="#FF9800" />
        </mesh>
        <mesh position={[0.2, 0, 0.022]}>
          <planeGeometry args={[0.08, 0.4]} />
          <meshStandardMaterial color="#9C27B0" />
        </mesh>

        {/* Grid lines - subtle */}
        <mesh position={[0, 0.1, 0.022]}>
          <planeGeometry args={[0.75, 0.005]} />
          <meshStandardMaterial color="#3A4F5F" />
        </mesh>
        <mesh position={[0, -0.1, 0.022]}>
          <planeGeometry args={[0.75, 0.005]} />
          <meshStandardMaterial color="#3A4F5F" />
        </mesh>

        {/* Title bar - accent color */}
        <mesh position={[0, 0.25, 0.022]}>
          <planeGeometry args={[0.8, 0.08]} />
          <meshStandardMaterial color="#00BCD4" />
        </mesh>
      </group>
    </group>
  );
}

import { useStore } from '../store/useStore';

export function DeskProps() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  // RGB colors for mechanical keyboard keys
  const rgbColors = [
    '#FF0000', '#FF4500', '#FF8C00', '#FFD700', '#FFFF00', '#7FFF00',
    '#00FF00', '#00FA9A', '#00FFFF', '#1E90FF', '#0000FF', '#8A2BE2',
    '#9370DB', '#FF1493', '#FF69B4', '#FFA500', '#32CD32', '#00CED1'
  ];

  return (
    <group position={[0, 0.73, 0]}>
      {/* Keyboard Base - RGB Mechanical */}
      <mesh position={[0, 0.015, 0.35]} castShadow={castShadow}>
        <boxGeometry args={[0.45, 0.02, 0.15]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Keyboard Keys - RGB/Rainbow Colors */}
      {[...Array(5)].map((_, row) =>
        [...Array(14)].map((_, col) => {
          const randomColor = rgbColors[Math.floor(Math.random() * rgbColors.length)];
          return (
            <mesh
              key={`key-${row}-${col}`}
              position={[
                -0.195 + col * 0.03,
                0.026,
                0.29 + row * 0.025,
              ]}
              castShadow={castShadow}
            >
              <boxGeometry args={[0.022, 0.006, 0.018]} />
              <meshStandardMaterial 
                color={randomColor}
                emissive={randomColor}
                emissiveIntensity={0.3}
                roughness={0.4}
                metalness={0.6}
              />
            </mesh>
          );
        })
      )}

      {/* Mouse - Black Wireless */}
      <mesh position={[0.4, 0.018, 0.3]} castShadow={castShadow}>
        <boxGeometry args={[0.06, 0.025, 0.1]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.2} metalness={0.9} />
      </mesh>
    </group>
  );
}

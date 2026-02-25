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

      {/* Pen/Pencil Holder - Glass Cylinder on LEFT */}
      <group position={[-0.8, 0.025, -0.2]}>
        {/* Glass cylinder */}
        <mesh castShadow={castShadow}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial 
            color="#E0E0E0"
            transparent
            opacity={0.3}
            roughness={0.1}
            metalness={0.1}
          />
        </mesh>
        {/* Colorful pens/pencils sticking up */}
        <mesh position={[0.01, 0.08, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.004, 0.004, 0.08, 8]} />
          <meshStandardMaterial color="#FF0000" />
        </mesh>
        <mesh position={[-0.01, 0.09, 0.005]} castShadow={castShadow}>
          <cylinderGeometry args={[0.004, 0.004, 0.1, 8]} />
          <meshStandardMaterial color="#0000FF" />
        </mesh>
        <mesh position={[0.005, 0.085, -0.008]} castShadow={castShadow}>
          <cylinderGeometry args={[0.004, 0.004, 0.09, 8]} />
          <meshStandardMaterial color="#00FF00" />
        </mesh>
        <mesh position={[-0.008, 0.075, 0.01]} castShadow={castShadow}>
          <cylinderGeometry args={[0.004, 0.004, 0.07, 8]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
      </group>

      {/* Small Figurine - next to pen holder */}
      <group position={[-0.65, 0.025, -0.25]}>
        {/* Body */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.03, 0.06, 0.02]} />
          <meshStandardMaterial color="#4A90E2" />
        </mesh>
        {/* Head */}
        <mesh position={[0, 0.04, 0]} castShadow={castShadow}>
          <sphereGeometry args={[0.015, 8, 8]} />
          <meshStandardMaterial color="#FFE4C4" />
        </mesh>
      </group>

      {/* Smart Speaker - between/behind monitors */}
      <mesh position={[0, 0.03, -0.35]} castShadow={castShadow}>
        <cylinderGeometry args={[0.045, 0.05, 0.06, 16]} />
        <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Laptop on Vertical Stand - RIGHT side */}
      <group position={[1.0, 0.08, -0.2]}>
        {/* Laptop in vertical orientation */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.015, 0.16, 0.22]} />
          <meshStandardMaterial color="#A0A0A0" roughness={0.2} metalness={0.9} />
        </mesh>
        {/* Sticker patches on back */}
        <mesh position={[0.008, 0.03, 0.05]}>
          <planeGeometry args={[0.03, 0.03]} />
          <meshStandardMaterial color="#FF4500" />
        </mesh>
        <mesh position={[0.008, -0.02, -0.04]}>
          <planeGeometry args={[0.025, 0.025]} />
          <meshStandardMaterial color="#00CED1" />
        </mesh>
        <mesh position={[0.008, 0.05, -0.06]}>
          <planeGeometry args={[0.02, 0.02]} />
          <meshStandardMaterial color="#FFD700" />
        </mesh>
        {/* Stand base */}
        <mesh position={[0, -0.1, 0]}>
          <boxGeometry args={[0.06, 0.01, 0.08]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
        </mesh>
      </group>
    </group>
  );
}

import { useStore } from '../store/useStore';

const bookTitles = [
  { title: 'Pirate Saga', color: '#E63946' },
  { title: 'Hunter Guild', color: '#2A9D8F' },
  { title: 'Soul Reaper', color: '#264653' },
  { title: 'Ninja Chronicle', color: '#F4A261' },
  { title: 'Titan Attack', color: '#E76F51' },
  { title: 'Demon Blade', color: '#8338EC' },
];

function Book({ position, height, color }: { position: [number, number, number]; height: number; color: string }) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <mesh position={position} castShadow={castShadow}>
      <boxGeometry args={[0.04, height, 0.15]} />
      <meshStandardMaterial color={color} roughness={0.7} metalness={0.1} />
    </mesh>
  );
}

export function Bookshelf() {
  const quality = useStore((state) => state.quality);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const castShadow = quality === 'high';

  const handleClick = () => {
    setCameraTarget('bookshelf');
  };

  return (
    <group
      position={[-2.5, 0, -2]}
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
      {/* Bookshelf Frame - Vertical Sides */}
      <mesh position={[-0.4, 1, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0.4, 1, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Shelves */}
      <mesh position={[0, 0.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0, 1.5, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>
      <mesh position={[0, 2, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.8, 0.03, 0.3]} />
        <meshStandardMaterial color="#654321" roughness={0.8} metalness={0.1} />
      </mesh>

      {/* Books - Bottom Shelf */}
      <Book position={[-0.3, 0.6, 0.05]} height={0.18} color={bookTitles[0].color} />
      <Book position={[-0.24, 0.65, 0.05]} height={0.28} color={bookTitles[1].color} />
      <Book position={[-0.18, 0.6, 0.05]} height={0.18} color={bookTitles[2].color} />
      <Book position={[-0.12, 0.63, 0.05]} height={0.24} color={bookTitles[3].color} />
      <Book position={[-0.06, 0.61, 0.05]} height={0.20} color={bookTitles[4].color} />
      <Book position={[0, 0.64, 0.05]} height={0.26} color={bookTitles[5].color} />

      {/* Books - Middle Shelf */}
      <Book position={[-0.3, 1.1, 0.05]} height={0.2} color={bookTitles[5].color} />
      <Book position={[-0.24, 1.13, 0.05]} height={0.26} color={bookTitles[0].color} />
      <Book position={[-0.18, 1.11, 0.05]} height={0.22} color={bookTitles[1].color} />
      <Book position={[-0.12, 1.14, 0.05]} height={0.28} color={bookTitles[2].color} />
      <Book position={[-0.06, 1.1, 0.05]} height={0.19} color={bookTitles[3].color} />

      {/* Books - Top Shelf */}
      <Book position={[-0.3, 1.6, 0.05]} height={0.22} color={bookTitles[4].color} />
      <Book position={[-0.24, 1.63, 0.05]} height={0.28} color={bookTitles[5].color} />
      <Book position={[-0.18, 1.61, 0.05]} height={0.24} color={bookTitles[0].color} />
      <Book position={[-0.12, 1.62, 0.05]} height={0.25} color={bookTitles[1].color} />
      <Book position={[-0.06, 1.6, 0.05]} height={0.21} color={bookTitles[2].color} />
      <Book position={[0, 1.64, 0.05]} height={0.27} color={bookTitles[3].color} />

      {/* Invisible clickable area for better UX */}
      <mesh position={[0, 1, 0]} visible={false}>
        <boxGeometry args={[0.9, 2.1, 0.35]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

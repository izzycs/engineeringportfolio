import { useStore } from '../store/useStore';
import { createRealisticWood } from './proceduralMaterials';

const enhancedWalnut = createRealisticWood('#5C4A3D', 0.65);
const basketball = {
  color: '#E86A33',
  roughness: 0.85,
  metalness: 0.0,
  envMapIntensity: 0.3,
};

const bookTitles = [
  { title: 'One Piece', color: '#E63946', width: 0.04 },
  { title: 'Hunter x Hunter', color: '#2A9D8F', width: 0.035 },
  { title: 'Bleach', color: '#264653', width: 0.042 },
  { title: 'Naruto', color: '#F4A261', width: 0.038 },
  { title: 'Attack on Titan', color: '#E76F51', width: 0.045 },
  { title: 'Demon Slayer', color: '#8338EC', width: 0.036 },
];

function Book({ position, height, color, width = 0.04, tilt = 0 }: { 
  position: [number, number, number]; 
  height: number; 
  color: string;
  width?: number;
  tilt?: number;
}) {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={position} rotation={[0, 0, tilt]}>
      {/* Book Spine */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[width, height, 0.15]} />
        <meshStandardMaterial 
          color={color} 
          roughness={0.8} 
          metalness={0.0}
          envMapIntensity={0.2}
        />
      </mesh>
      
      {/* Book spine texture/wear */}
      <mesh position={[0, 0, 0.076]} castShadow={false}>
        <boxGeometry args={[width * 0.9, height * 0.95, 0.001]} />
        <meshBasicMaterial 
          color="#000000" 
          transparent
          opacity={0.1}
        />
      </mesh>
      
      {/* Book Pages - Side View with texture */}
      <mesh position={[-width / 2 - 0.001, 0, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.002, height * 0.95, 0.14]} />
        <meshStandardMaterial 
          color="#F5F5DC" 
          roughness={0.9} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Page texture lines */}
      <mesh position={[-width / 2 - 0.0015, 0, 0]} castShadow={false}>
        <boxGeometry args={[0.0001, height * 0.94, 0.139]} />
        <meshBasicMaterial 
          color="#E8DCC8" 
          transparent
          opacity={0.5}
        />
      </mesh>
    </group>
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
      position={[-4.85, 0, 0]}
      rotation={[0, Math.PI / 2, 0]}
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
      {/* Bookshelf Frame - Vertical Sides with Wood Grain */}
      <mesh position={[-0.4, 1, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <primitive object={enhancedWalnut.clone()} attach="material" />
      </mesh>
      <mesh position={[0.4, 1, 0]} castShadow={castShadow}>
        <boxGeometry args={[0.05, 2, 0.3]} />
        <primitive object={enhancedWalnut.clone()} attach="material" />
      </mesh>
      
      {/* Back Panel */}
      <mesh position={[0, 1, -0.14]} castShadow={castShadow}>
        <boxGeometry args={[0.8, 2, 0.01]} />
        <meshStandardMaterial color="#4A3D2F" roughness={0.8} metalness={0.0} />
      </mesh>

      {/* Shelves with Wood Grain and Subtle Wear */}
      {[0.5, 1, 1.5, 2].map((y, i) => (
        <group key={`shelf-${i}`}>
          {/* Main Shelf */}
          <mesh position={[0, y, 0]} castShadow={castShadow}>
            <boxGeometry args={[0.8, 0.03, 0.3]} />
            <primitive object={enhancedWalnut.clone()} attach="material" />
          </mesh>
          {/* Shelf Dust/Wear Layer */}
          <mesh position={[0, y + 0.016, 0]} castShadow={false}>
            <planeGeometry args={[0.78, 0.28]} />
            <meshBasicMaterial 
              color="#9A8A7A"
              transparent
              opacity={0.08}
            />
          </mesh>
        </group>
      ))}

      {/* Books - Bottom Shelf with varied widths and slight tilts */}
      <Book position={[-0.3, 0.6, 0.05]} height={0.18} color={bookTitles[0].color} width={bookTitles[0].width} tilt={0.02} />
      <Book position={[-0.235, 0.65, 0.05]} height={0.28} color={bookTitles[1].color} width={bookTitles[1].width} tilt={-0.03} />
      <Book position={[-0.175, 0.6, 0.05]} height={0.18} color={bookTitles[2].color} width={bookTitles[2].width} tilt={0.01} />
      <Book position={[-0.11, 0.63, 0.05]} height={0.24} color={bookTitles[3].color} width={bookTitles[3].width} tilt={-0.02} />
      <Book position={[-0.05, 0.61, 0.05]} height={0.20} color={bookTitles[4].color} width={bookTitles[4].width} tilt={0.03} />
      <Book position={[0.012, 0.64, 0.05]} height={0.26} color={bookTitles[5].color} width={bookTitles[5].width} tilt={-0.01} />

      {/* Books - Middle Shelf - some pulled out slightly */}
      <Book position={[-0.3, 1.1, 0.06]} height={0.2} color={bookTitles[5].color} width={bookTitles[5].width} tilt={-0.02} />
      <Book position={[-0.235, 1.13, 0.05]} height={0.26} color={bookTitles[0].color} width={bookTitles[0].width} tilt={0.01} />
      <Book position={[-0.175, 1.11, 0.05]} height={0.22} color={bookTitles[1].color} width={bookTitles[1].width} tilt={-0.03} />
      <Book position={[-0.11, 1.14, 0.055]} height={0.28} color={bookTitles[2].color} width={bookTitles[2].width} tilt={0.02} />
      <Book position={[-0.05, 1.1, 0.05]} height={0.19} color={bookTitles[3].color} width={bookTitles[3].width} tilt={-0.01} />

      {/* Books - Top Shelf with more variety */}
      <Book position={[-0.3, 1.6, 0.05]} height={0.22} color={bookTitles[4].color} width={bookTitles[4].width} tilt={0.03} />
      <Book position={[-0.232, 1.63, 0.05]} height={0.28} color={bookTitles[5].color} width={bookTitles[5].width} tilt={-0.02} />
      <Book position={[-0.17, 1.61, 0.05]} height={0.24} color={bookTitles[0].color} width={bookTitles[0].width} tilt={0.01} />
      <Book position={[-0.11, 1.62, 0.05]} height={0.25} color={bookTitles[1].color} width={bookTitles[1].width} tilt={-0.03} />
      <Book position={[-0.05, 1.6, 0.058]} height={0.21} color={bookTitles[2].color} width={bookTitles[2].width} tilt={0.02} />
      <Book position={[0.012, 1.64, 0.05]} height={0.27} color={bookTitles[3].color} width={bookTitles[3].width} tilt={-0.01} />

      {/* NBA Basketball - on middle shelf */}
      <mesh position={[0.15, 1.2, 0.05]} castShadow={castShadow}>
        <sphereGeometry args={[0.06, 20, 20]} />
        <meshStandardMaterial {...basketball} />
      </mesh>
      
      {/* Basketball Black Lines - Simplified */}
      <mesh position={[0.15, 1.2, 0.05]} castShadow={false}>
        <sphereGeometry args={[0.061, 20, 20]} />
        <meshBasicMaterial 
          color="#000000"
          transparent
          opacity={0.15}
          wireframe
        />
      </mesh>

      {/* Anime Figurine - on top shelf (simple humanoid shape) */}
      <group position={[0.25, 1.68, 0.05]}>
        {/* Head */}
        <mesh position={[0, 0.08, 0]} castShadow={castShadow}>
          <sphereGeometry args={[0.025, 8, 8]} />
          <meshStandardMaterial color="#FFD1BA" roughness={0.7} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.04, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.035, 0.06, 0.02]} />
          <meshStandardMaterial color="#2196F3" roughness={0.7} />
        </mesh>
        {/* Legs */}
        <mesh position={[-0.01, -0.01, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.012, 0.04, 0.015]} />
          <meshStandardMaterial color="#1565C0" roughness={0.7} />
        </mesh>
        <mesh position={[0.01, -0.01, 0]} castShadow={castShadow}>
          <boxGeometry args={[0.012, 0.04, 0.015]} />
          <meshStandardMaterial color="#1565C0" roughness={0.7} />
        </mesh>
      </group>

      {/* Invisible clickable area for better UX */}
      <mesh position={[0, 1, 0]} visible={false}>
        <boxGeometry args={[0.9, 2.1, 0.35]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

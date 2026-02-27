import { useStore } from '../store/useStore';
import { paintMatte, paintSemiGloss } from './materials';

export function RoomShell() {
  const quality = useStore((state) => state.quality);
  const receiveShadow = quality === 'high';

  return (
    <group>
      {/* Floor - Realistic Wood with Grain Variation */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#8B7355"
          roughness={0.7}
          metalness={0.0}
          envMapIntensity={0.4}
        />
      </mesh>
      
      {/* Floor Planks - Subtle Dividers for Realism */}
      {[-4, -2, 0, 2, 4].map((z, i) => (
        <mesh
          key={`plank-${i}`}
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, 0.001, z]}
          receiveShadow={receiveShadow}
        >
          <planeGeometry args={[10, 0.02]} />
          <meshStandardMaterial 
            color="#6D5A47"
            roughness={0.8}
            metalness={0.0}
          />
        </mesh>
      ))}

      {/* Back Wall with Subtle Texture */}
      <mesh position={[0, 2.5, -5]} receiveShadow={receiveShadow}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial {...paintMatte} color="#E8E4DC" />
      </mesh>
      
      {/* Back Wall Baseboard */}
      <mesh position={[0, 0.05, -4.95]}>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#F0EDE5" />
      </mesh>

      {/* Left Wall with Subtle Texture */}
      <mesh
        position={[-5, 2.5, 0]}
        rotation={[0, Math.PI / 2, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial {...paintMatte} color="#E8E4DC" />
      </mesh>
      
      {/* Left Wall Baseboard */}
      <mesh position={[-4.95, 0.05, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#F0EDE5" />
      </mesh>

      {/* Right Wall with Subtle Texture */}
      <mesh
        position={[5, 2.5, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial {...paintMatte} color="#E8E4DC" />
      </mesh>
      
      {/* Right Wall Baseboard */}
      <mesh position={[4.95, 0.05, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#F0EDE5" />
      </mesh>

      {/* Ceiling with Texture */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 5, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial 
          color="#F5F5F5" 
          roughness={0.85} 
          metalness={0.0}
          envMapIntensity={0.2}
        />
      </mesh>
      
      {/* Crown Molding - Back Wall */}
      <mesh position={[0, 4.95, -4.95]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#FFFFFF" />
      </mesh>
      
      {/* Crown Molding - Left Wall */}
      <mesh position={[-4.95, 4.95, 0]} rotation={[0, Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#FFFFFF" />
      </mesh>
      
      {/* Crown Molding - Right Wall */}
      <mesh position={[4.95, 4.95, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#FFFFFF" />
      </mesh>

      {/* Front Wall (behind camera) with Texture */}
      <mesh
        position={[0, 2.5, 5]}
        rotation={[0, Math.PI, 0]}
        receiveShadow={receiveShadow}
      >
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial {...paintMatte} color="#E8E4DC" />
      </mesh>
      
      {/* Front Wall Baseboard */}
      <mesh position={[0, 0.05, 4.95]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[10, 0.1, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#F0EDE5" />
      </mesh>
      
      {/* Crown Molding - Front Wall */}
      <mesh position={[0, 4.95, 4.95]} rotation={[0, Math.PI, 0]}>
        <boxGeometry args={[10, 0.05, 0.05]} />
        <meshStandardMaterial {...paintSemiGloss} color="#FFFFFF" />
      </mesh>

      {/* Door on Front Wall */}
      <group position={[-2, 0, 4.99]} rotation={[0, Math.PI, 0]}>
        {/* Door frame */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[1, 2.2, 0.05]} />
          <meshStandardMaterial color="#8B7355" roughness={0.8} metalness={0.1} />
        </mesh>
        {/* Door panel */}
        <mesh position={[0, 1, -0.03]}>
          <planeGeometry args={[0.9, 2.0]} />
          <meshStandardMaterial color="#654321" roughness={0.7} metalness={0.1} />
        </mesh>
        {/* Door handle */}
        <mesh position={[-0.35, 1, -0.05]}>
          <sphereGeometry args={[0.03, 8, 8]} />
          <meshStandardMaterial color="#C0C0C0" roughness={0.2} metalness={0.9} />
        </mesh>
      </group>

      {/* Poster on Front Wall */}
      <mesh position={[2, 2.5, 4.99]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[2, 2.5, 4.98]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#9B59B6" />
      </mesh>

      {/* Poster Frames on Back Wall */}
      <mesh position={[-2, 2.5, -4.99]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[-2, 2.5, -4.98]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#3498DB" />
      </mesh>

      <mesh position={[2, 2.5, -4.99]}>
        <planeGeometry args={[1, 1.4]} />
        <meshStandardMaterial color="#2C3E50" />
      </mesh>
      <mesh position={[2, 2.5, -4.98]}>
        <planeGeometry args={[0.9, 1.3]} />
        <meshStandardMaterial color="#E74C3C" />
      </mesh>
    </group>
  );
}

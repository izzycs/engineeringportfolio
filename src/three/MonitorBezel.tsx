import { enhancedPlasticMatte, enhancedMetalBrushedAluminum } from './proceduralMaterials';

/**
 * Detailed monitor bezel with realistic materials
 */
interface MonitorBezelProps {
  position: [number, number, number];
  width?: number;
  height?: number;
  depth?: number;
}

export function MonitorBezel({ 
  position, 
  width = 1.6, 
  height = 0.9, 
  depth = 0.05 
}: MonitorBezelProps) {
  const bezelThickness = 0.02;
  
  return (
    <group position={position}>
      {/* Main bezel frame */}
      <mesh position={[0, 0, -depth / 2]}>
        <boxGeometry args={[width, height, depth]} />
        <primitive object={enhancedPlasticMatte} attach="material" />
      </mesh>
      
      {/* Top bezel edge */}
      <mesh position={[0, height / 2 - bezelThickness / 2, 0]}>
        <boxGeometry args={[width + 0.01, bezelThickness, depth + 0.01]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.6} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Bottom bezel edge */}
      <mesh position={[0, -height / 2 + bezelThickness / 2, 0]}>
        <boxGeometry args={[width + 0.01, bezelThickness, depth + 0.01]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.6} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Left bezel edge */}
      <mesh position={[-width / 2 + bezelThickness / 2, 0, 0]}>
        <boxGeometry args={[bezelThickness, height + 0.01, depth + 0.01]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.6} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Right bezel edge */}
      <mesh position={[width / 2 - bezelThickness / 2, 0, 0]}>
        <boxGeometry args={[bezelThickness, height + 0.01, depth + 0.01]} />
        <meshStandardMaterial 
          color="#0A0A0A" 
          roughness={0.6} 
          metalness={0.0}
        />
      </mesh>
      
      {/* Monitor stand base */}
      <mesh position={[0, -height / 2 - 0.05, -0.15]}>
        <cylinderGeometry args={[0.12, 0.15, 0.02, 16]} />
        <primitive object={enhancedMetalBrushedAluminum} attach="material" />
      </mesh>
      
      {/* Monitor stand arm */}
      <mesh position={[0, -height / 2 - 0.15, -0.1]}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <primitive object={enhancedMetalBrushedAluminum} attach="material" />
      </mesh>
      
      {/* Stand connection to monitor */}
      <mesh position={[0, -height / 2, -depth]}>
        <boxGeometry args={[0.1, 0.05, 0.03]} />
        <primitive object={enhancedPlasticMatte} attach="material" />
      </mesh>
      
      {/* Vents on back (detail) */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={i} position={[
          -width / 2 + 0.1 + i * 0.15, 
          height / 4, 
          -depth - 0.005
        ]}>
          <boxGeometry args={[0.08, 0.01, 0.002]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.8} />
        </mesh>
      ))}
      
      {/* Power indicator LED */}
      <mesh position={[width / 2 - 0.08, -height / 2 + 0.03, 0.01]}>
        <sphereGeometry args={[0.008, 8, 8]} />
        <meshStandardMaterial 
          color="#22FF22" 
          emissive="#22FF22"
          emissiveIntensity={0.5}
        />
      </mesh>
      
      {/* Brand logo area (subtle embossed) */}
      <mesh position={[0, -height / 2 + 0.04, 0.01]}>
        <boxGeometry args={[0.15, 0.02, 0.001]} />
        <meshStandardMaterial 
          color="#1A1A1A" 
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>
      
      {/* Screws in corners (tiny detail) */}
      {[
        [-width / 2 + 0.03, height / 2 - 0.03],
        [width / 2 - 0.03, height / 2 - 0.03],
        [-width / 2 + 0.03, -height / 2 + 0.03],
        [width / 2 - 0.03, -height / 2 + 0.03],
      ].map(([x, y], i) => (
        <mesh key={i} position={[x, y, 0.01]}>
          <cylinderGeometry args={[0.006, 0.006, 0.003, 6]} />
          <meshStandardMaterial 
            color="#404040" 
            roughness={0.3}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

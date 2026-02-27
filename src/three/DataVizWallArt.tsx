import { useStore } from '../store/useStore';
import * as THREE from 'three';
import { Text } from '@react-three/drei';

// Data visualization prints on walls
export function DataVizPrints() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <>
      {/* Large data visualization - stock market chart */}
      <group position={[-1.19, 1.8, -0.5]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.6, 0.4, 0.02]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.6} />
        </mesh>
        
        {/* Canvas/print */}
        <mesh position={[0, 0, 0.011]} castShadow={false}>
          <planeGeometry args={[0.55, 0.35]} />
          <meshStandardMaterial color="#0F172A" />
        </mesh>
        
        {/* Chart grid lines */}
        {[...Array(6)].map((_, i) => (
          <mesh key={`hline-${i}`} position={[0, -0.15 + i * 0.06, 0.012]} castShadow={false}>
            <planeGeometry args={[0.5, 0.001]} />
            <meshBasicMaterial color="#1E293B" transparent opacity={0.3} />
          </mesh>
        ))}
        {[...Array(8)].map((_, i) => (
          <mesh key={`vline-${i}`} position={[-0.22 + i * 0.063, 0, 0.012]} castShadow={false}>
            <planeGeometry args={[0.001, 0.3]} />
            <meshBasicMaterial color="#1E293B" transparent opacity={0.3} />
          </mesh>
        ))}
        
        {/* Chart line (simplified candlestick pattern) */}
        {[...Array(30)].map((_, i) => {
          const x = -0.22 + (i / 30) * 0.44;
          const height = 0.05 + Math.sin(i * 0.5) * 0.03 + Math.cos(i * 0.3) * 0.02;
          const y = -0.1 + height;
          const isGreen = Math.sin(i * 0.5) > 0;
          
          return (
            <mesh key={`candle-${i}`} position={[x, y, 0.013]} castShadow={false}>
              <boxGeometry args={[0.008, height, 0.001]} />
              <meshStandardMaterial 
                color={isGreen ? '#10B981' : '#EF4444'}
                emissive={isGreen ? '#10B981' : '#EF4444'}
                emissiveIntensity={0.3}
              />
            </mesh>
          );
        })}
        
        {/* Title */}
        <Text
          position={[0, 0.15, 0.013]}
          fontSize={0.02}
          color="#60A5FA"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          S&P 500 • 2026 YTD
        </Text>
        
        {/* Value */}
        <Text
          position={[0, -0.15, 0.013]}
          fontSize={0.025}
          color="#10B981"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          +24.8%
        </Text>
      </group>
      
      {/* Medium data viz - heat map */}
      <group position={[1.19, 1.8, 0]} rotation={[0, -Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.4, 0.4, 0.02]} />
          <meshStandardMaterial color="#2A2A2A" roughness={0.3} metalness={0.6} />
        </mesh>
        
        {/* Canvas */}
        <mesh position={[0, 0, 0.011]} castShadow={false}>
          <planeGeometry args={[0.36, 0.36]} />
          <meshStandardMaterial color="#1E1E1E" />
        </mesh>
        
        {/* Heat map squares */}
        {[...Array(7)].map((_, row) =>
          [...Array(7)].map((_, col) => {
            const value = Math.random();
            const color = value > 0.7 ? '#EF4444' : 
                         value > 0.4 ? '#F59E0B' : 
                         value > 0.2 ? '#10B981' : '#3B82F6';
            
            return (
              <mesh 
                key={`heat-${row}-${col}`}
                position={[-0.15 + col * 0.05, 0.15 - row * 0.05, 0.012]}
                castShadow={false}
              >
                <planeGeometry args={[0.045, 0.045]} />
                <meshStandardMaterial 
                  color={color}
                  emissive={color}
                  emissiveIntensity={0.2}
                />
              </mesh>
            );
          })
        )}
        
        {/* Title */}
        <Text
          position={[0, -0.16, 0.013]}
          fontSize={0.015}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          PIPELINE METRICS
        </Text>
      </group>
      
      {/* Small data viz - pie chart */}
      <group position={[0.6, 2.2, -1.19]} rotation={[0, Math.PI, 0]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.3, 0.3, 0.02]} />
          <meshStandardMaterial color="#3A3A3A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Canvas */}
        <mesh position={[0, 0, 0.011]} castShadow={false}>
          <planeGeometry args={[0.26, 0.26]} />
          <meshStandardMaterial color="#0A0A0A" />
        </mesh>
        
        {/* Pie chart segments */}
        {[
          { angle: 0, size: Math.PI * 0.6, color: '#3B82F6' },
          { angle: Math.PI * 0.6, size: Math.PI * 0.5, color: '#10B981' },
          { angle: Math.PI * 1.1, size: Math.PI * 0.4, color: '#F59E0B' },
          { angle: Math.PI * 1.5, size: Math.PI * 0.5, color: '#EF4444' },
        ].map((segment, i) => (
          <mesh key={`pie-${i}`} position={[0, 0, 0.012]} castShadow={false}>
            <ringGeometry args={[0, 0.08, 32, 1, segment.angle, segment.size]} />
            <meshStandardMaterial 
              color={segment.color}
              emissive={segment.color}
              emissiveIntensity={0.3}
              side={THREE.DoubleSide}
            />
          </mesh>
        ))}
        
        {/* Title */}
        <Text
          position={[0, -0.11, 0.013]}
          fontSize={0.012}
          color="#FFFFFF"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          DATA SOURCES
        </Text>
      </group>
    </>
  );
}

// Awards and certificates
export function AwardsCertificates() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <>
      {/* Certificate 1 - AWS */}
      <group position={[-1.19, 2.1, 0.8]} rotation={[0, Math.PI / 2, 0]}>
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.35, 0.25, 0.015]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} metalness={0.1} />
        </mesh>
        
        {/* Certificate paper */}
        <mesh position={[0, 0, 0.008]} castShadow={false}>
          <planeGeometry args={[0.32, 0.22]} />
          <meshStandardMaterial color="#F5F5DC" roughness={0.8} />
        </mesh>
        
        {/* Border */}
        <mesh position={[0, 0, 0.009]} castShadow={false}>
          <ringGeometry args={[0.15, 0.16, 4]} />
          <meshStandardMaterial color="#DAA520" metalness={0.8} roughness={0.2} />
        </mesh>
        
        {/* AWS logo placeholder */}
        <mesh position={[0, 0.05, 0.0095]} castShadow={false}>
          <boxGeometry args={[0.08, 0.03, 0.001]} />
          <meshStandardMaterial 
            color="#FF9900"
            emissive="#FF9900"
            emissiveIntensity={0.2}
          />
        </mesh>
        
        {/* Text */}
        <Text
          position={[0, -0.02, 0.01]}
          fontSize={0.015}
          color="#1A1A1A"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          AWS CERTIFIED
        </Text>
        <Text
          position={[0, -0.04, 0.01]}
          fontSize={0.012}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Regular.ttf"
        >
          Data Engineer
        </Text>
        
        {/* Seal */}
        <mesh position={[0.1, -0.08, 0.01]} castShadow={false}>
          <circleGeometry args={[0.02, 32]} />
          <meshStandardMaterial 
            color="#4169E1"
            emissive="#4169E1"
            emissiveIntensity={0.2}
          />
        </mesh>
      </group>
      
      {/* Certificate 2 - Data Science */}
      <group position={[-1.19, 1.7, 1.0]} rotation={[0, Math.PI / 2, 0]}>
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.3, 0.22, 0.015]} />
          <meshStandardMaterial color="#654321" roughness={0.6} metalness={0.1} />
        </mesh>
        
        <mesh position={[0, 0, 0.008]} castShadow={false}>
          <planeGeometry args={[0.28, 0.20]} />
          <meshStandardMaterial color="#FFFACD" roughness={0.8} />
        </mesh>
        
        <Text
          position={[0, 0.02, 0.01]}
          fontSize={0.013}
          color="#1A1A1A"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Bold.ttf"
        >
          DATA SCIENCE
        </Text>
        <Text
          position={[0, -0.01, 0.01]}
          fontSize={0.01}
          color="#333333"
          anchorX="center"
          anchorY="middle"
          font="/fonts/IBMPlexMono-Regular.ttf"
        >
          Professional Certificate
        </Text>
        
        {/* Ribbon */}
        <mesh position={[0, -0.06, 0.01]} castShadow={false}>
          <boxGeometry args={[0.04, 0.08, 0.001]} />
          <meshStandardMaterial color="#DC143C" />
        </mesh>
      </group>
      
      {/* Trophy on shelf */}
      <group position={[-0.5, 1.5, -1.15]} rotation={[0, 0, 0]}>
        {/* Base */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.06, 0.02, 0.06]} />
          <meshStandardMaterial 
            color="#8B4513"
            roughness={0.7}
          />
        </mesh>
        
        {/* Plaque */}
        <mesh position={[0, 0.015, 0.031]} castShadow={false}>
          <planeGeometry args={[0.05, 0.015]} />
          <meshStandardMaterial 
            color="#DAA520"
            roughness={0.3}
            metalness={0.8}
          />
        </mesh>
        
        {/* Stand */}
        <mesh position={[0, 0.04, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.008, 0.012, 0.04, 8]} />
          <meshStandardMaterial 
            color="#C0C0C0"
            roughness={0.3}
            metalness={0.9}
          />
        </mesh>
        
        {/* Cup */}
        <mesh position={[0, 0.08, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.025, 0.015, 0.05, 16]} />
          <meshStandardMaterial 
            color="#FFD700"
            roughness={0.2}
            metalness={0.95}
            envMapIntensity={1.2}
          />
        </mesh>
        
        {/* Handles */}
        <mesh position={[-0.03, 0.08, 0]} rotation={[0, 0, Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.015, 0.003, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.95} />
        </mesh>
        <mesh position={[0.03, 0.08, 0]} rotation={[0, 0, -Math.PI / 2]} castShadow={castShadow}>
          <torusGeometry args={[0.015, 0.003, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#FFD700" roughness={0.2} metalness={0.95} />
        </mesh>
        
        {/* Subtle glow */}
        <pointLight position={[0, 0.1, 0]} intensity={0.15} distance={0.3} color="#FFD700" />
      </group>
    </>
  );
}

// Whiteboard with diagrams
export function Whiteboard() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={[1.19, 1.5, -0.7]} rotation={[0, -Math.PI / 2, 0]}>
      {/* Board frame */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[0.6, 0.4, 0.02]} />
        <meshStandardMaterial color="#C0C0C0" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Whiteboard surface */}
      <mesh position={[0, 0, 0.011]} castShadow={false}>
        <planeGeometry args={[0.56, 0.36]} />
        <meshStandardMaterial 
          color="#F8F9FA"
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      
      {/* Diagram - ETL flow */}
      {/* Extract box */}
      <mesh position={[-0.18, 0.08, 0.012]} castShadow={false}>
        <planeGeometry args={[0.08, 0.06]} />
        <meshBasicMaterial color="#3B82F6" transparent opacity={0.3} />
      </mesh>
      <Text
        position={[-0.18, 0.08, 0.013]}
        fontSize={0.012}
        color="#1E40AF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Bold.ttf"
      >
        EXTRACT
      </Text>
      
      {/* Arrow 1 */}
      <mesh position={[-0.1, 0.08, 0.012]} castShadow={false}>
        <planeGeometry args={[0.04, 0.002]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      
      {/* Transform box */}
      <mesh position={[-0.02, 0.08, 0.012]} castShadow={false}>
        <planeGeometry args={[0.08, 0.06]} />
        <meshBasicMaterial color="#10B981" transparent opacity={0.3} />
      </mesh>
      <Text
        position={[-0.02, 0.08, 0.013]}
        fontSize={0.011}
        color="#065F46"
        anchorX="center"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Bold.ttf"
      >
        TRANSFORM
      </Text>
      
      {/* Arrow 2 */}
      <mesh position={[0.06, 0.08, 0.012]} castShadow={false}>
        <planeGeometry args={[0.04, 0.002]} />
        <meshBasicMaterial color="#1E293B" />
      </mesh>
      
      {/* Load box */}
      <mesh position={[0.14, 0.08, 0.012]} castShadow={false}>
        <planeGeometry args={[0.08, 0.06]} />
        <meshBasicMaterial color="#F59E0B" transparent opacity={0.3} />
      </mesh>
      <Text
        position={[0.14, 0.08, 0.013]}
        fontSize={0.012}
        color="#92400E"
        anchorX="center"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Bold.ttf"
      >
        LOAD
      </Text>
      
      {/* Notes below */}
      <Text
        position={[-0.15, -0.02, 0.013]}
        fontSize={0.008}
        color="#475569"
        anchorX="left"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Regular.ttf"
      >
        • API sources{'\n'}
        • S3 buckets{'\n'}
        • DB streams
      </Text>
      
      <Text
        position={[0.05, -0.05, 0.013]}
        fontSize={0.008}
        color="#475569"
        anchorX="left"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Regular.ttf"
      >
        TODO:{'\n'}
        - Add validation{'\n'}
        - Error handling{'\n'}
        - Monitoring
      </Text>
      
      {/* Marker tray */}
      <mesh position={[0, -0.16, 0.015]} castShadow={castShadow}>
        <boxGeometry args={[0.2, 0.02, 0.03]} />
        <meshStandardMaterial color="#E0E0E0" roughness={0.5} />
      </mesh>
      
      {/* Markers */}
      {[
        { pos: -0.06, color: '#EF4444' },
        { pos: -0.02, color: '#3B82F6' },
        { pos: 0.02, color: '#10B981' },
        { pos: 0.06, color: '#1A1A1A' },
      ].map((marker, i) => (
        <mesh key={i} position={[marker.pos, -0.16, 0.025]} rotation={[Math.PI / 2, 0, 0]} castShadow={castShadow}>
          <cylinderGeometry args={[0.004, 0.004, 0.08, 8]} />
          <meshStandardMaterial color={marker.color} roughness={0.5} />
        </mesh>
      ))}
      
      {/* Eraser */}
      <mesh position={[0.15, -0.16, 0.025]} castShadow={castShadow}>
        <boxGeometry args={[0.04, 0.015, 0.02]} />
        <meshStandardMaterial color="#8B4513" roughness={0.8} />
      </mesh>
    </group>
  );
}

// 2026 Calendar
export function Calendar2026() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  return (
    <group position={[-1.19, 2.2, -0.2]} rotation={[0, Math.PI / 2, 0]}>
      {/* Backing */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[0.25, 0.3, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
      </mesh>
      
      {/* Month header */}
      <mesh position={[0, 0.13, 0.006]} castShadow={false}>
        <planeGeometry args={[0.24, 0.04]} />
        <meshStandardMaterial color="#3B82F6" />
      </mesh>
      
      <Text
        position={[0, 0.13, 0.007]}
        fontSize={0.02}
        color="#FFFFFF"
        anchorX="center"
        anchorY="middle"
        font="/fonts/IBMPlexMono-Bold.ttf"
      >
        FEBRUARY 2026
      </Text>
      
      {/* Day grid */}
      {[...Array(5)].map((_, week) =>
        [...Array(7)].map((_, day) => {
          const dayNum = week * 7 + day + 1;
          if (dayNum > 28) return null;
          
          const isToday = dayNum === 27; // Today's date
          
          return (
            <group key={`day-${dayNum}`}>
              {isToday && (
                <mesh 
                  position={[-0.09 + day * 0.03, 0.08 - week * 0.035, 0.0065]} 
                  castShadow={false}
                >
                  <circleGeometry args={[0.012, 16]} />
                  <meshStandardMaterial 
                    color="#EF4444"
                    emissive="#EF4444"
                    emissiveIntensity={0.3}
                  />
                </mesh>
              )}
              <Text
                position={[-0.09 + day * 0.03, 0.08 - week * 0.035, 0.007]}
                fontSize={0.01}
                color={isToday ? '#FFFFFF' : '#1A1A1A'}
                anchorX="center"
                anchorY="middle"
                font="/fonts/IBMPlexMono-Regular.ttf"
              >
                {dayNum}
              </Text>
            </group>
          );
        })
      )}
      
      {/* Push pin */}
      <mesh position={[0, 0.15, 0.01]} castShadow={castShadow}>
        <cylinderGeometry args={[0.005, 0.003, 0.01, 8]} />
        <meshStandardMaterial 
          color="#EF4444"
          roughness={0.3}
          metalness={0.7}
        />
      </mesh>
      <mesh position={[0, 0.1555, 0.01]} castShadow={false}>
        <sphereGeometry args={[0.006, 8, 8]} />
        <meshStandardMaterial color="#DC2626" />
      </mesh>
    </group>
  );
}

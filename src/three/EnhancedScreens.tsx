import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

// Enhanced monitor with live terminal and code
export function EnhancedMonitors() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';

  // Left monitor - Terminal with live command output
  const leftScreenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    // Background
    ctx.fillStyle = '#0C1021';
    ctx.fillRect(0, 0, 1024, 768);

    // Terminal prompt
    ctx.fillStyle = '#10B981';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('izzy@data-eng:~/pipeline$ ', 16, 32);

    // Command
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '16px monospace';
    ctx.fillText('python run_etl.py --mode=prod', 280, 32);

    let y = 60;
    const output = [
      '[INFO] Connecting to data sources...',
      '[INFO] ✓ Connected to PostgreSQL',
      '[INFO] ✓ Connected to S3 bucket',
      '[INFO] ✓ API authentication successful',
      '',
      '[EXTRACT] Processing 147,382 records...',
      '[EXTRACT] ████████████████░░░░ 82% (120,843/147,382)',
      '',
      '[TRANSFORM] Applying business rules...',
      '[TRANSFORM] - Deduplication: 2,341 records removed',
      '[TRANSFORM] - Validation: 98.7% pass rate',
      '[TRANSFORM] - Enrichment: 145,041 records updated',
      '',
      '[LOAD] Writing to data warehouse...',
      '[LOAD] ████████████████████ 100% (145,041/145,041)',
      '',
      '[SUCCESS] Pipeline completed in 3m 42s',
      '[METRICS] Throughput: 712 records/sec',
      '[METRICS] Memory usage: 2.1 GB peak',
      '',
      'izzy@data-eng:~/pipeline$ _',
    ];

    output.forEach((line) => {
      if (line.includes('[INFO]') || line.includes('[SUCCESS]')) {
        ctx.fillStyle = '#10B981';
      } else if (line.includes('[EXTRACT]') || line.includes('[TRANSFORM]') || line.includes('[LOAD]')) {
        ctx.fillStyle = '#60A5FA';
      } else if (line.includes('[METRICS]')) {
        ctx.fillStyle = '#FBBF24';
      } else if (line.includes('█')) {
        ctx.fillStyle = '#8B5CF6';
      } else {
        ctx.fillStyle = '#94A3B8';
      }
      
      ctx.font = line.includes('izzy@') ? 'bold 16px monospace' : '16px monospace';
      ctx.fillText(line, 16, y);
      y += 24;
    });

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  // Right monitor - VS Code with data engineering code
  const rightScreenTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 768;
    const ctx = canvas.getContext('2d')!;

    // Background - VS Code dark theme
    ctx.fillStyle = '#1E1E1E';
    ctx.fillRect(0, 0, 1024, 768);

    // Top bar
    ctx.fillStyle = '#323233';
    ctx.fillRect(0, 0, 1024, 35);
    
    // File name
    ctx.fillStyle = '#CCCCCC';
    ctx.font = '14px -apple-system, system-ui';
    ctx.fillText('pipeline_transform.py', 60, 22);

    // Sidebar
    ctx.fillStyle = '#252526';
    ctx.fillRect(0, 35, 50, 733);

    // Code area
    let y = 60;
    const code = [
      '# Data Engineering Pipeline - Transform Stage',
      'import pandas as pd',
      'from datetime import datetime',
      'from typing import Dict, List',
      '',
      'class DataTransformer:',
      '    """Transform raw data with business rules"""',
      '    ',
      '    def __init__(self, config: Dict):',
      '        self.config = config',
      '        self.logger = setup_logger(__name__)',
      '    ',
      '    def transform(self, df: pd.DataFrame) -> pd.DataFrame:',
      '        """Apply transformation pipeline"""',
      '        df = self.deduplicate(df)',
      '        df = self.validate_schema(df)',
      '        df = self.enrich_data(df)',
      '        df = self.apply_business_rules(df)',
      '        return df',
      '    ',
      '    def deduplicate(self, df: pd.DataFrame):',
      '        """Remove duplicate records"""',
      '        before = len(df)',
      '        df = df.drop_duplicates(subset=[\'id\', \'timestamp\'])',
      '        after = len(df)',
      '        self.logger.info(f"Removed {before-after} dupes")',
      '        return df',
    ];

    code.forEach((line, i) => {
      // Line numbers
      ctx.fillStyle = '#858585';
      ctx.font = '14px monospace';
      ctx.fillText(String(i + 1).padStart(2, ' '), 60, y);

      // Code with syntax highlighting
      if (line.includes('import') || line.includes('from') || line.includes('class') || line.includes('def')) {
        ctx.fillStyle = '#C586C0';
      } else if (line.includes('#')) {
        ctx.fillStyle = '#6A9955';
      } else if (line.includes('"""')) {
        ctx.fillStyle = '#CE9178';
      } else if (line.includes('self.')) {
        ctx.fillStyle = '#9CDCFE';
      } else if (line.includes('DataFrame')) {
        ctx.fillStyle = '#4EC9B0';
      } else {
        ctx.fillStyle = '#D4D4D4';
      }
      
      ctx.font = '14px "Fira Code", monospace';
      ctx.fillText(line, 100, y);
      y += 22;
    });

    // Status bar
    ctx.fillStyle = '#007ACC';
    ctx.fillRect(0, 733, 1024, 35);
    ctx.fillStyle = '#FFFFFF';
    ctx.font = '12px -apple-system, system-ui';
    ctx.fillText('Python 3.11.2', 16, 755);
    ctx.fillText('UTF-8', 900, 755);
    ctx.fillText('Ln 13, Col 5', 960, 755);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  return (
    <group position={[0, 1.2, -0.45]}>
      {/* Left Monitor */}
      <group position={[-0.35, 0, 0]}>
        {/* Screen */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.32, 0.20, 0.015]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
        </mesh>
        
        {/* Display */}
        <mesh position={[0, 0, 0.008]} castShadow={false}>
          <planeGeometry args={[0.30, 0.18]} />
          <meshStandardMaterial 
            map={leftScreenTexture}
            emissive="#10B981"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Screen glow */}
        <pointLight position={[0, 0, 0.05]} intensity={0.3} distance={0.5} color="#10B981" />
      </group>
      
      {/* Right Monitor */}
      <group position={[0.35, 0, 0]}>
        {/* Screen */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[0.32, 0.20, 0.015]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.2} />
        </mesh>
        
        {/* Display */}
        <mesh position={[0, 0, 0.008]} castShadow={false}>
          <planeGeometry args={[0.30, 0.18]} />
          <meshStandardMaterial 
            map={rightScreenTexture}
            emissive="#007ACC"
            emissiveIntensity={0.3}
          />
        </mesh>
        
        {/* Screen glow */}
        <pointLight position={[0, 0, 0.05]} intensity={0.3} distance={0.5} color="#007ACC" />
      </group>
    </group>
  );
}

// Scrolling code effect for monitors
export function ScrollingCodeEffect({ position }: { position: [number, number, number] }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const scrollOffset = useRef(0);

  useFrame(() => {
    if (meshRef.current) {
      scrollOffset.current += 0.0005;
      const mat = meshRef.current.material as THREE.MeshStandardMaterial;
      if (mat.map) {
        mat.map.offset.y = scrollOffset.current % 1;
      }
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <planeGeometry args={[0.3, 0.18]} />
      <meshStandardMaterial 
        color="#00FF00"
        emissive="#00FF00"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
}

// Matrix rain effect (easter egg mode)
export function MatrixRainEffect({ enabled }: { enabled: boolean }) {
  const particlesRef = useRef<THREE.Points>(null);

  useFrame(() => {
    if (particlesRef.current && enabled) {
      const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.02; // Fall
        
        // Reset at bottom
        if (positions[i + 1] < 0) {
          positions[i + 1] = 3;
          positions[i] = (Math.random() - 0.5) * 5;
          positions[i + 2] = (Math.random() - 0.5) * 5;
        }
      }
      
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  const particleCount = 500;
  const positions = new Float32Array(particleCount * 3);
  
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 5;
    positions[i * 3 + 1] = Math.random() * 3;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 5;
  }

  if (!enabled) return null;

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#00FF00"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}

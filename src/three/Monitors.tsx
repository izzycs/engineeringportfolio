import { useMemo } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/useStore';
import * as THREE from 'three';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';
import { metalChrome, metalBrushedAluminum, metalMatteBlack, screenGlass } from './materials';

/** Renders text content onto a CanvasTexture so it lives ON the monitor mesh */
function useScreenTexture(type: 'experience' | 'projects') {
  const texture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 340;
    const ctx = canvas.getContext('2d')!;

    // Background
    ctx.fillStyle = '#0f172a';
    ctx.fillRect(0, 0, 512, 340);

    if (type === 'experience') {
      // Title
      ctx.fillStyle = '#4ade80';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('// EXPERIENCE', 16, 32);

      let y = 58;
      experienceData.forEach((exp) => {
        // Green left border
        ctx.fillStyle = '#22c55e';
        ctx.fillRect(16, y, 3, 70);

        // Job title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(exp.title, 28, y + 14);

        // Company
        ctx.fillStyle = '#9ca3af';
        ctx.font = '12px monospace';
        ctx.fillText(`${exp.company} • ${exp.dates}`, 28, y + 30);

        // Bullets (first 2)
        ctx.fillStyle = '#e2e8f0';
        ctx.font = '11px monospace';
        exp.bullets.slice(0, 2).forEach((bullet, i) => {
          const text = `→ ${bullet}`;
          ctx.fillText(text.length > 58 ? text.substring(0, 55) + '...' : text, 28, y + 46 + i * 14);
        });

        // Tags
        let tagX = 28;
        const tagY = y + 78;
        ctx.font = 'bold 9px monospace';
        exp.tags.slice(0, 5).forEach((tag) => {
          const w = ctx.measureText(tag).width + 10;
          ctx.fillStyle = '#064e3b';
          ctx.fillRect(tagX, tagY - 9, w, 14);
          ctx.fillStyle = '#6ee7b7';
          ctx.fillText(tag, tagX + 5, tagY);
          tagX += w + 4;
        });

        y += 100;
      });
    } else {
      // Title
      ctx.fillStyle = '#60a5fa';
      ctx.font = 'bold 20px monospace';
      ctx.fillText('// PROJECTS', 16, 32);

      let y = 52;
      projectsData.forEach((project) => {
        // Border box
        ctx.strokeStyle = '#1d4ed8';
        ctx.lineWidth = 1;
        ctx.strokeRect(16, y, 480, 65);

        // Project title
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 14px monospace';
        ctx.fillText(project.title, 24, y + 18);

        // Description
        ctx.fillStyle = '#9ca3af';
        ctx.font = '11px monospace';
        const desc = project.description;
        ctx.fillText(desc.length > 62 ? desc.substring(0, 59) + '...' : desc, 24, y + 34);

        // Tags
        let tagX = 24;
        const tagY = y + 52;
        ctx.font = 'bold 9px monospace';
        project.stack.slice(0, 5).forEach((tech) => {
          const w = ctx.measureText(tech).width + 10;
          ctx.fillStyle = '#1e3a5f';
          ctx.fillRect(tagX, tagY - 9, w, 14);
          ctx.fillStyle = '#93c5fd';
          ctx.fillText(tech, tagX + 5, tagY);
          tagX += w + 4;
        });

        y += 75;
      });
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, [type]);

  return texture;
}

/** Interactive HTML content shown only when zoomed in */
function MonitorContent({ type }: { type: 'experience' | 'projects' }) {
  const setSelectedProject = useStore((state) => state.setSelectedProject);

  if (type === 'experience') {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: '#0f172a',
        padding: '20px',
        overflowY: 'auto',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '16px',
        lineHeight: '1.6',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '14px', color: '#4ade80' }}>
          {'// EXPERIENCE'}
        </h2>
        {experienceData.map((exp) => (
          <div key={exp.id} style={{ borderLeft: '3px solid #22c55e', paddingLeft: '12px', marginBottom: '18px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{exp.title}</div>
            <div style={{ color: '#9ca3af', fontSize: '15px', marginTop: '3px' }}>{exp.company} • {exp.dates}</div>
            <ul style={{ margin: '8px 0', padding: 0, listStyle: 'none' }}>
              {exp.bullets.map((bullet, i) => (
                <li key={i} style={{ fontSize: '14px', marginBottom: '4px' }}>→ {bullet}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{
                  background: '#064e3b',
                  color: '#6ee7b7',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold',
                }}>{tag}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#0f172a',
      padding: '20px',
      overflowY: 'auto',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '16px',
      lineHeight: '1.6',
      boxSizing: 'border-box',
    }}>
      <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '14px', color: '#60a5fa' }}>
        {'// PROJECTS'}
      </h2>
      {projectsData.map((project) => (
        <div
          key={project.id}
          style={{
            border: '1px solid #1d4ed8',
            padding: '12px',
            marginBottom: '12px',
            cursor: 'pointer',
          }}
          onClick={(e) => {
            e.stopPropagation();
            setSelectedProject(project.id);
          }}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = '#60a5fa')}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = '#1d4ed8')}
        >
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{project.title}</div>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginTop: '4px' }}>{project.description}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '8px' }}>
            {project.stack.map((tech) => (
              <span key={tech} style={{
                background: '#1e3a5f',
                color: '#93c5fd',
                padding: '3px 8px',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: 'bold',
              }}>{tech}</span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export function Monitors() {
  const quality = useStore((state) => state.quality);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const castShadow = quality === 'high';
  const leftZoomed = cameraTarget === 'leftMonitor';
  const rightZoomed = cameraTarget === 'rightMonitor';

  const experienceTexture = useScreenTexture('experience');
  const projectsTexture = useScreenTexture('projects');

  const handleMonitorClick = (isLeft: boolean, e: any) => {
    e.stopPropagation();
    setCameraTarget(isLeft ? 'leftMonitor' : 'rightMonitor');
  };

  const frameW = 1.1;
  const frameH = 0.65;
  const screenW = 1.0;
  const screenH = 0.58;

  return (
    <group position={[0, 1.2, -0.3]}>
      {/* Dual Monitor Arm - Center Post */}
      <mesh position={[0, -0.45, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 16]} />
        <meshStandardMaterial {...metalBrushedAluminum} />
      </mesh>

      {/* Monitor Arm Base - Weighted */}
      <mesh position={[0, -0.905, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 24]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>
      
      {/* Base Rubber Grip */}
      <mesh position={[0, -0.895, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.11, 0.11, 0.005, 24]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.95} metalness={0.0} />
      </mesh>

      {/* Left Arm Extension */}
      <mesh position={[-0.45, 0.05, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.9, 0.025, 0.025]} />
        <meshStandardMaterial {...metalBrushedAluminum} />
      </mesh>

      {/* Left Arm Cable Clips */}
      <mesh position={[-0.3, 0.05, -0.09]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[-0.6, 0.05, -0.09]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Left Arm Joint Detail */}
      <mesh position={[-0.9, 0.05, -0.1]} castShadow={castShadow}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>

      {/* Right Arm Extension */}
      <mesh position={[0.45, 0.05, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.9, 0.025, 0.025]} />
        <meshStandardMaterial {...metalBrushedAluminum} />
      </mesh>

      {/* Right Arm Cable Clips */}
      <mesh position={[0.3, 0.05, -0.09]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.6} />
      </mesh>
      <mesh position={[0.6, 0.05, -0.09]} castShadow={castShadow}>
        <cylinderGeometry args={[0.008, 0.008, 0.015, 8]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Right Arm Joint Detail */}
      <mesh position={[0.9, 0.05, -0.1]} castShadow={castShadow}>
        <sphereGeometry args={[0.025, 16, 16]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>

      {/* Center Joint Detail (where arms meet post) */}
      <mesh position={[0, 0.05, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.06, 0.04, 0.04]} />
        <meshStandardMaterial {...metalChrome} />
      </mesh>

      {/* ===== LEFT MONITOR - EXPERIENCE ===== */}
      <group
        position={[-0.65, 0.05, 0]}
        onClick={(e) => handleMonitorClick(true, e)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
      >
        {/* Frame Back */}
        <mesh position={[0, 0, -0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, frameH, 0.03]} />
          <meshStandardMaterial {...metalMatteBlack} />
        </mesh>
        
        {/* Bezel Top */}
        <mesh position={[0, frameH / 2 - 0.005, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, 0.01, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Bottom */}
        <mesh position={[0, -frameH / 2 + 0.005, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, 0.01, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Left */}
        <mesh position={[-frameW / 2 + 0.005, 0, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[0.01, frameH, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Right */}
        <mesh position={[frameW / 2 - 0.005, 0, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[0.01, frameH, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Screen Glass Layer */}
        <mesh position={[0, 0, 0.0165]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshStandardMaterial {...screenGlass} />
        </mesh>

        {/* Screen with canvas texture (always visible, on top of glass) */}
        <mesh position={[0, 0, 0.0166]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial map={experienceTexture} />
        </mesh>

        {/* Interactive HTML overlay - only when zoomed in */}
        {leftZoomed && (
          <Html
            transform
            position={[0, 0, 0.016]}
            distanceFactor={0.62}
            style={{
              width: '500px',
              height: '340px',
              pointerEvents: 'auto',
              overflow: 'hidden',
              borderRadius: '2px',
            }}
          >
            <MonitorContent type="experience" />
          </Html>
        )}
      </group>

      {/* ===== RIGHT MONITOR - PROJECTS ===== */}
      <group
        position={[0.65, 0.05, 0]}
        onClick={(e) => handleMonitorClick(false, e)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; }}
      >
        {/* Frame Back */}
        <mesh position={[0, 0, -0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, frameH, 0.03]} />
          <meshStandardMaterial {...metalMatteBlack} />
        </mesh>
        
        {/* Bezel Top */}
        <mesh position={[0, frameH / 2 - 0.005, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, 0.01, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Bottom */}
        <mesh position={[0, -frameH / 2 + 0.005, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[frameW, 0.01, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Left */}
        <mesh position={[-frameW / 2 + 0.005, 0, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[0.01, frameH, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>
        
        {/* Bezel Right */}
        <mesh position={[frameW / 2 - 0.005, 0, 0.015]} castShadow={castShadow}>
          <boxGeometry args={[0.01, frameH, 0.002]} />
          <meshStandardMaterial color="#0A0A0A" roughness={0.3} metalness={0.5} />
        </mesh>

        {/* Screen Glass Layer */}
        <mesh position={[0, 0, 0.0165]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshStandardMaterial {...screenGlass} />
        </mesh>

        {/* Screen with canvas texture (always visible, on top of glass) */}
        <mesh position={[0, 0, 0.0166]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshBasicMaterial map={projectsTexture} />
        </mesh>

        {/* Interactive HTML overlay - only when zoomed in */}
        {rightZoomed && (
          <Html
            transform
            position={[0, 0, 0.016]}
            distanceFactor={0.62}
            style={{
              width: '500px',
              height: '340px',
              pointerEvents: 'auto',
              overflow: 'hidden',
              borderRadius: '2px',
            }}
          >
            <MonitorContent type="projects" />
          </Html>
        )}
      </group>

      {/* LED Strip Behind Monitors */}
      <mesh position={[0, 0.35, -0.05]} castShadow={castShadow}>
        <boxGeometry args={[2.0, 0.02, 0.02]} />
        <meshStandardMaterial
          color="#8B5CF6"
          emissive="#8B5CF6"
          emissiveIntensity={0.5}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

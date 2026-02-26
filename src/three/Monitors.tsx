import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/useStore';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

function MonitorContent({ type }: { type: 'experience' | 'projects' }) {
  const setSelectedProject = useStore((state) => state.setSelectedProject);

  if (type === 'experience') {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        background: '#0f172a',
        padding: '16px',
        overflowY: 'auto',
        color: 'white',
        fontFamily: 'monospace',
        fontSize: '14px',
        lineHeight: '1.5',
        boxSizing: 'border-box',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#4ade80' }}>
          {'// EXPERIENCE'}
        </h2>
        {experienceData.map((exp) => (
          <div key={exp.id} style={{ borderLeft: '3px solid #22c55e', paddingLeft: '10px', marginBottom: '14px' }}>
            <div style={{ fontWeight: 'bold', fontSize: '15px' }}>{exp.title}</div>
            <div style={{ color: '#9ca3af', fontSize: '13px', marginTop: '2px' }}>{exp.company} • {exp.dates}</div>
            <ul style={{ margin: '6px 0', padding: 0, listStyle: 'none' }}>
              {exp.bullets.map((bullet, i) => (
                <li key={i} style={{ fontSize: '12px', marginBottom: '3px' }}>→ {bullet}</li>
              ))}
            </ul>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
              {exp.tags.map((tag) => (
                <span key={tag} style={{
                  background: '#064e3b',
                  color: '#6ee7b7',
                  padding: '2px 7px',
                  borderRadius: '3px',
                  fontSize: '11px',
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
      padding: '16px',
      overflowY: 'auto',
      color: 'white',
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.5',
      boxSizing: 'border-box',
    }}>
      <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '12px', color: '#60a5fa' }}>
        {'// PROJECTS'}
      </h2>
      {projectsData.map((project) => (
        <div
          key={project.id}
          style={{
            border: '1px solid #1d4ed8',
            padding: '10px',
            marginBottom: '10px',
            cursor: 'pointer',
          }}
          onClick={() => setSelectedProject(project.id)}
          onMouseOver={(e) => (e.currentTarget.style.borderColor = '#60a5fa')}
          onMouseOut={(e) => (e.currentTarget.style.borderColor = '#1d4ed8')}
        >
          <div style={{ fontWeight: 'bold', fontSize: '14px' }}>{project.title}</div>
          <div style={{ color: '#9ca3af', fontSize: '12px', marginTop: '4px' }}>{project.description}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px', marginTop: '6px' }}>
            {project.stack.map((tech) => (
              <span key={tech} style={{
                background: '#1e3a5f',
                color: '#93c5fd',
                padding: '2px 7px',
                borderRadius: '3px',
                fontSize: '11px',
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
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const castShadow = quality === 'high';
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const handleMonitorClick = (isLeft: boolean, e: any) => {
    e.stopPropagation();
    setCameraTarget(isLeft ? 'leftMonitor' : 'rightMonitor');
  };

  // Monitor dimensions (bigger screens)
  const frameW = 1.1;
  const frameH = 0.65;
  const screenW = 1.0;
  const screenH = 0.58;

  return (
    <group position={[0, 1.2, -0.3]}>
      {/* Dual Monitor Arm - Center Post */}
      <mesh position={[0, -0.45, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.025, 0.025, 0.9, 12]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Monitor Arm Base */}
      <mesh position={[0, -0.905, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.12, 0.12, 0.02, 16]} />
        <meshStandardMaterial color="#6A6A6A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Left Arm Extension */}
      <mesh position={[-0.45, 0.05, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.9, 0.025, 0.025]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Right Arm Extension */}
      <mesh position={[0.45, 0.05, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.9, 0.025, 0.025]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* ===== LEFT MONITOR - EXPERIENCE ===== */}
      <group
        position={[-0.65, 0.05, 0]}
        onClick={(e) => handleMonitorClick(true, e)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setLeftHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; setLeftHovered(false); }}
      >
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[frameW, frameH, 0.03]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Screen backlight */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshStandardMaterial
            color={leftHovered ? '#1a3a2a' : '#0f172a'}
            emissive={leftHovered ? '#22c55e' : '#0f172a'}
            emissiveIntensity={leftHovered ? 0.15 : 0.05}
          />
        </mesh>

        {/* HTML Content */}
        <Html
          transform
          position={[0, 0, 0.018]}
          distanceFactor={0.62}
          style={{
            width: '480px',
            height: '320px',
            pointerEvents: 'auto',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          <MonitorContent type="experience" />
        </Html>
      </group>

      {/* ===== RIGHT MONITOR - PROJECTS ===== */}
      <group
        position={[0.65, 0.05, 0]}
        onClick={(e) => handleMonitorClick(false, e)}
        onPointerOver={(e) => { e.stopPropagation(); document.body.style.cursor = 'pointer'; setRightHovered(true); }}
        onPointerOut={(e) => { e.stopPropagation(); document.body.style.cursor = 'auto'; setRightHovered(false); }}
      >
        {/* Frame */}
        <mesh castShadow={castShadow}>
          <boxGeometry args={[frameW, frameH, 0.03]} />
          <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
        </mesh>

        {/* Screen backlight */}
        <mesh position={[0, 0, 0.016]}>
          <planeGeometry args={[screenW, screenH]} />
          <meshStandardMaterial
            color={rightHovered ? '#1a2a3a' : '#0f172a'}
            emissive={rightHovered ? '#3b82f6' : '#0f172a'}
            emissiveIntensity={rightHovered ? 0.15 : 0.05}
          />
        </mesh>

        {/* HTML Content */}
        <Html
          transform
          position={[0, 0, 0.018]}
          distanceFactor={0.62}
          style={{
            width: '480px',
            height: '320px',
            pointerEvents: 'auto',
            overflow: 'hidden',
            borderRadius: '2px',
          }}
        >
          <MonitorContent type="projects" />
        </Html>
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

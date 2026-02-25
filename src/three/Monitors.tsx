import { useState } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/useStore';
import experienceData from '../data/experience.json';
import projectsData from '../data/projects.json';

function MonitorContent({ type }: { type: 'experience' | 'projects' }) {
  const setSelectedProject = useStore((state) => state.setSelectedProject);

  if (type === 'experience') {
    return (
      <div className="w-full h-full bg-gray-900 p-4 overflow-y-auto text-white font-mono text-xs">
        <h2 className="text-lg font-bold mb-4 text-green-400">// EXPERIENCE</h2>
        <div className="space-y-4">
          {experienceData.map((exp) => (
            <div key={exp.id} className="border-l-2 border-green-500 pl-3">
              <h3 className="font-bold text-sm">{exp.title}</h3>
              <p className="text-gray-400 text-xs">{exp.company} • {exp.dates}</p>
              <ul className="mt-2 space-y-1 text-xs">
                {exp.bullets.map((bullet, i) => (
                  <li key={i}>→ {bullet}</li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1 mt-2">
                {exp.tags.map((tag) => (
                  <span key={tag} className="bg-green-900 text-green-300 px-2 py-0.5 rounded text-xs">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-gray-900 p-4 overflow-y-auto text-white font-mono text-xs">
      <h2 className="text-lg font-bold mb-4 text-blue-400">// PROJECTS</h2>
      <div className="grid grid-cols-1 gap-3">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="border border-blue-700 p-3 hover:border-blue-400 cursor-pointer transition-colors"
            onClick={() => setSelectedProject(project.id)}
          >
            <h3 className="font-bold text-sm">{project.title}</h3>
            <p className="text-gray-400 text-xs mt-1">{project.description}</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {project.stack.map((tech) => (
                <span key={tech} className="bg-blue-900 text-blue-300 px-2 py-0.5 rounded text-xs">
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function Monitors() {
  const quality = useStore((state) => state.quality);
  const castShadow = quality === 'high';
  const [leftHovered, setLeftHovered] = useState(false);
  const [rightHovered, setRightHovered] = useState(false);

  const MonitorMesh = ({
    position,
    isLeft,
    hovered,
    onHover,
    onUnhover,
  }: {
    position: [number, number, number];
    isLeft: boolean;
    hovered: boolean;
    onHover: () => void;
    onUnhover: () => void;
  }) => (
    <group position={position}>
      {/* Monitor Frame - Slightly Curved/Wider (27" monitors) */}
      <mesh castShadow={castShadow} onPointerOver={onHover} onPointerOut={onUnhover}>
        <boxGeometry args={[0.7, 0.42, 0.03]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Screen with glow */}
      <mesh position={[0, 0, 0.016]}>
        <planeGeometry args={[0.64, 0.37]} />
        <meshStandardMaterial
          color={hovered ? '#60A5FA' : '#1E293B'}
          emissive={hovered ? '#3B82F6' : '#0F172A'}
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* HTML Content Overlay */}
      <Html
        transform
        occlude
        position={[0, 0, 0.02]}
        distanceFactor={0.32}
        style={{
          width: '400px',
          height: '280px',
          pointerEvents: 'auto',
        }}
      >
        <MonitorContent type={isLeft ? 'experience' : 'projects'} />
      </Html>
    </group>
  );

  return (
    <group position={[0, 0.78, -0.3]}>
      {/* Dual Monitor Arm - Center Post */}
      <mesh position={[0, -0.4, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 12]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Monitor Arm Base */}
      <mesh position={[0, -0.8, -0.1]} castShadow={castShadow}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
        <meshStandardMaterial color="#6A6A6A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Left Arm Extension */}
      <mesh position={[-0.3, 0, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Right Arm Extension */}
      <mesh position={[0.3, 0, -0.1]} castShadow={castShadow}>
        <boxGeometry args={[0.6, 0.02, 0.02]} />
        <meshStandardMaterial color="#8A8A8A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* Left Monitor - Experience */}
      <MonitorMesh
        position={[-0.6, 0, 0]}
        isLeft={true}
        hovered={leftHovered}
        onHover={() => setLeftHovered(true)}
        onUnhover={() => setLeftHovered(false)}
      />

      {/* Right Monitor - Projects */}
      <MonitorMesh
        position={[0.6, 0, 0]}
        isLeft={false}
        hovered={rightHovered}
        onHover={() => setRightHovered(true)}
        onUnhover={() => setRightHovered(false)}
      />

      {/* LED Strip Behind Monitors */}
      <mesh position={[0, 0.15, -0.05]} castShadow={castShadow}>
        <boxGeometry args={[1.5, 0.02, 0.02]} />
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

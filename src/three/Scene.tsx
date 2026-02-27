import { useRef } from 'react';
import { OrbitControls, Environment } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore, cameraPositions } from '../store/useStore';
import * as THREE from 'three';
import { RoomShell } from './RoomShell';
import { Desk } from './Desk';
import { Monitors } from './Monitors';
import { Bookshelf } from './Bookshelf';
import { TV } from './TV';
import { Window } from './Window';
import { DeskProps } from './DeskProps';
import { DeskLamp } from './DeskLamp';
import { WallDecor } from './WallDecor';
import { Chair } from './Chair';
import { CeilingFan } from './CeilingFan';
import { EasterEggs } from './EasterEggs';
import { GitHubCalendar } from './GitHubCalendar';

export function Scene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const quality = useStore((state) => state.quality);
  
  const useShadows = quality === 'high';

  // Smooth camera transitions
  useFrame(() => {
    if (controlsRef.current && cameraTarget) {
      const targetPos = cameraPositions[cameraTarget];
      
      // Lerp camera position
      camera.position.lerp(
        new THREE.Vector3(...targetPos.position),
        0.05
      );
      
      // Lerp controls target
      controlsRef.current.target.lerp(
        new THREE.Vector3(...targetPos.target),
        0.05
      );
    }
  });

  return (
    <>
      {/* Environment Map for Realistic Reflections */}
      <Environment preset="apartment" />
      
      {/* Subtle Fog for Atmosphere */}
      <fog attach="fog" args={['#E8E4DC', 8, 18]} />

      {/* Ambient Light - Enhanced for Realism */}
      <ambientLight intensity={0.5} />
      
      {/* Hemisphere Light - Natural Skylight */}
      <hemisphereLight 
        color="#FFFFEE" 
        groundColor="#8B7355" 
        intensity={0.3} 
        position={[0, 5, 0]}
      />

      {/* Directional Light (Sun) - Enhanced with Better Shadows */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.2}
        color="#FFFFEE"
        castShadow={useShadows}
        shadow-mapSize-width={useShadows ? 2048 : 512}
        shadow-mapSize-height={useShadows ? 2048 : 512}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0001}
      />

      {/* Point lights for accent - More Strategic Placement */}
      <pointLight position={[0, 2.5, 0]} intensity={0.25} color="#FFFFFF" />
      <pointLight position={[-2, 1.5, 2]} intensity={0.15} color="#8B5CF6" distance={4} decay={2} />
      
      {/* Additional Accent Light - Purple/Blue Ambiance */}
      <pointLight position={[3, 1.5, -3]} intensity={0.2} color="#6366F1" distance={5} decay={2} />
      <pointLight position={[-3, 1.2, 1]} intensity={0.15} color="#A78BFA" distance={4} decay={2} />

      {/* Camera Controls - 360 rotation enabled */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={8}
        target={[0, 1.2, 0]}
      />

      {/* Click anywhere in room to reset view */}
      <mesh
        visible={false}
        position={[0, 2.5, 0]}
        onClick={() => {
          const target = useStore.getState().cameraTarget;
          if (target !== 'default') {
            useStore.getState().setCameraTarget('default');
          }
        }}
      >
        <boxGeometry args={[12, 6, 12]} />
        <meshBasicMaterial transparent opacity={0} side={THREE.DoubleSide} />
      </mesh>

      {/* Scene Objects */}
      <RoomShell />
      <Desk />
      <Chair />
      <Monitors />
      <DeskProps />
      <DeskLamp />
      <Bookshelf />
      <TV />
      <Window />
      <WallDecor />
      <CeilingFan />
      <EasterEggs />
      <GitHubCalendar />
    </>
  );
}

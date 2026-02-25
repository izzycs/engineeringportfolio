import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
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

const lightConfigs = {
  day: { color: '#FFFFEE', intensity: 1.5, ambient: 0.6 },
  golden: { color: '#FFB366', intensity: 1.2, ambient: 0.4 },
  night: { color: '#5C7CFA', intensity: 0.4, ambient: 0.2 },
};

export function Scene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const timeOfDay = useStore((state) => state.timeOfDay);
  const quality = useStore((state) => state.quality);
  
  const lightConfig = lightConfigs[timeOfDay];
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
      {/* Ambient Light */}
      <ambientLight intensity={lightConfig.ambient} />

      {/* Directional Light (Sun/Moon) */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={lightConfig.intensity}
        color={lightConfig.color}
        castShadow={useShadows}
        shadow-mapSize-width={useShadows ? 2048 : 512}
        shadow-mapSize-height={useShadows ? 2048 : 512}
        shadow-camera-far={20}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
      />

      {/* Point lights for accent */}
      <pointLight position={[0, 2, 0]} intensity={0.3} color="#FFFFFF" />
      <pointLight position={[-2, 1, 2]} intensity={0.2} color="#8B5CF6" />

      {/* Camera Controls */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        minDistance={2}
        maxDistance={8}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2}
        target={[0, 1.2, 0]}
      />

      {/* Scene Objects */}
      <RoomShell />
      <Desk />
      <Monitors />
      <DeskProps />
      <Bookshelf />
      <TV />
      <Window />
    </>
  );
}

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
      {/* Ambient Light - Fixed Daytime */}
      <ambientLight intensity={0.6} />

      {/* Directional Light (Sun) - Fixed Daytime */}
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#FFFFEE"
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
      <Monitors />
      <DeskProps />
      <Bookshelf />
      <TV />
      <Window />
    </>
  );
}

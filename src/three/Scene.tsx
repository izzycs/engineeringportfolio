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
import { EnhancedLighting } from './EnhancedLighting';

export function Scene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);

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

      {/* ENHANCED LIGHTING SYSTEM - Realistic with rim lights, fill lights, and dust particles */}
      <EnhancedLighting />

      {/* Camera Controls - 360 rotation enabled */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enableRotate={true}
        rotateSpeed={1.5}
        enablePan={true}
        panSpeed={1}
        minDistance={3}
        maxDistance={12}
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

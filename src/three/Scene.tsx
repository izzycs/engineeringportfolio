import { useRef } from 'react';
import { OrbitControls } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { useStore, cameraPositions } from '../store/useStore';
import * as THREE from 'three';
import { RoomShell } from './RoomShell';
import { Desk } from './Desk';
import { Monitors } from './Monitors';
import { Bookshelf } from './Bookshelf';
import { EnhancedWindow } from './EnhancedWindow';
import { DeskProps } from './DeskProps';
import { DeskLamp } from './DeskLamp';
import { Chair } from './Chair';
import { useDeviceOptimizations } from './PerformanceOptimizations';

export function Scene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const quality = useStore((state) => state.quality);

  const deviceSettings = useDeviceOptimizations();
  const isMobile = deviceSettings.isMobile;
  const enableShadows = !isMobile && quality === 'high';

  useFrame(() => {
    if (controlsRef.current && cameraTarget) {
      const targetPos = cameraPositions[cameraTarget];
      camera.position.lerp(new THREE.Vector3(...targetPos.position), 0.05);
      controlsRef.current.target.lerp(new THREE.Vector3(...targetPos.target), 0.05);
    }
  });

  return (
    <>
      {/* Stable three-point light rig — replaces the time-of-day system that caused flicker. */}
      <ambientLight intensity={0.55} color="#FFF6E8" />
      <hemisphereLight args={['#FFF6E8', '#9AA5B6', 0.35]} />
      <directionalLight
        position={[4, 6, 4]}
        intensity={1.1}
        color="#FFE9C4"
        castShadow={enableShadows}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-3, 4, 2]} intensity={0.25} color="#A8C8FF" />

      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        rotateSpeed={isMobile ? 0.7 : 0.9}
        enablePan={false}
        minDistance={3}
        maxDistance={9}
        minPolarAngle={Math.PI / 6}
        maxPolarAngle={Math.PI / 2.05}
        target={[0, 1.2, 0]}
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
      />

      <RoomShell />
      <Desk />
      <Chair />
      <Monitors />
      <DeskProps />
      <DeskLamp />
      <Bookshelf />
      <EnhancedWindow />
    </>
  );
}

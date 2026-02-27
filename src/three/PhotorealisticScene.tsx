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
import { EnhancedWindow } from './EnhancedWindow';
import { DeskProps } from './DeskProps';
import { DeskLamp } from './DeskLamp';
import { WallDecor } from './WallDecor';
import { Chair } from './Chair';
import { CeilingFan } from './CeilingFan';
import { EasterEggs } from './EasterEggs';
import { GitHubCalendar } from './GitHubCalendar';
import { PhotorealisticLighting } from './PhotorealisticLighting';
import { EnhancedChairSway, EnhancedFanRotation } from './PhotorealisticAnimations';
import { useDeviceOptimizations, useAutoQualityAdjust } from './PerformanceOptimizations';
import { PostProcessing } from './PostProcessing';

/**
 * ROUND 9: PHOTOREALISTIC SCENE
 * Integrates all advanced rendering features for AAA-quality visuals
 */
export function PhotorealisticScene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const quality = useStore((state) => state.quality);
  
  // Get device-specific optimizations
  const deviceSettings = useDeviceOptimizations();
  
  // Auto quality adjustment based on FPS (can be disabled)
  const AUTO_ADJUST_QUALITY = false; // Set to true to enable
  if (AUTO_ADJUST_QUALITY) {
    useAutoQualityAdjust(30);
  }
  
  // Smooth camera transitions with spring physics
  useFrame(() => {
    if (controlsRef.current && cameraTarget) {
      const targetPos = cameraPositions[cameraTarget];
      
      // Smooth lerp (could be replaced with spring physics for even smoother)
      camera.position.lerp(
        new THREE.Vector3(...targetPos.position),
        0.05
      );
      
      controlsRef.current.target.lerp(
        new THREE.Vector3(...targetPos.target),
        0.05
      );
    }
  });

  return (
    <>
      {/* Environment Map for Realistic Reflections */}
      <Environment 
        preset="apartment" 
        environmentIntensity={deviceSettings.isMobile ? 0.5 : 0.8}
      />
      
      {/* Subtle Fog for Atmosphere (disabled on low quality) */}
      {quality !== 'low' && <fog attach="fog" args={['#E8E4DC', 8, 18]} />}

      {/* PHOTOREALISTIC LIGHTING SYSTEM */}
      <PhotorealisticLighting />

      {/* POST-PROCESSING EFFECTS (high quality only) */}
      {deviceSettings.enablePostProcessing && <PostProcessing />}

      {/* Camera Controls - 360 rotation enabled */}
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.05}
        enableRotate={true}
        rotateSpeed={deviceSettings.isMobile ? 1.2 : 1.5}
        enablePan={true}
        panSpeed={deviceSettings.isMobile ? 0.8 : 1}
        minDistance={3}
        maxDistance={12}
        target={[0, 1.2, 0]}
        // Touch controls for mobile
        touches={{
          ONE: THREE.TOUCH.ROTATE,
          TWO: THREE.TOUCH.DOLLY_PAN,
        }}
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

      {/* Scene Objects with Photorealistic Materials */}
      <RoomShell />
      <Desk />
      
      {/* Chair with Enhanced Spring Physics Sway */}
      <EnhancedChairSway position={[0.8, 0, -0.3]}>
        <Chair />
      </EnhancedChairSway>
      
      <Monitors />
      <DeskProps />
      <DeskLamp />
      <Bookshelf />
      <TV />
      <EnhancedWindow />
      <WallDecor />
      
      {/* Ceiling Fan with Smooth Rotation */}
      <EnhancedFanRotation position={[0, 2.7, 0]} speed={0.5}>
        <CeilingFan />
      </EnhancedFanRotation>
      
      <EasterEggs />
      <GitHubCalendar />
    </>
  );
}

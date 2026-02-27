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
import { GitHubCalendar } from './GitHubCalendar';
// ROUND 9: Use photorealistic animations
import { EnhancedChairSway, EnhancedFanRotation } from './PhotorealisticAnimations';
import { useDeviceOptimizations } from './PerformanceOptimizations';
// ROUND 11: Lazy load heavy components to reduce bundle size
import { LazyEasterEggs, LazyAdvancedEasterEggs, LazyPostProcessing } from './LazyComponents';
// ROUND 10: Personal touches and interactive elements
import { 
  DeskNameplate, 
  DataEngineeringBooks, 
  PersonalPhotos, 
  NBAMerchandise,
  AnimeCollectibles,
  WaterBottle,
  DeskSnacks,
  ChargingDevices,
  PostItNotes,
  PoweredLaptop,
} from './PersonalTouches';
import { DataVizPrints, AwardsCertificates, Whiteboard, Calendar2026 } from './DataVizWallArt';
import { 
  InteractiveCoffeeMug, 
  BouncingBasketball, 
  InteractivePlant 
} from './InteractiveElements';
import { TimeOfDayLighting } from './TimeOfDayLighting';

export function Scene() {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const quality = useStore((state) => state.quality);
  
  // ROUND 9: Get device-specific optimizations
  const deviceSettings = useDeviceOptimizations();
  const isMobile = deviceSettings.isMobile;

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
      {/* Environment Map for Realistic Reflections - skip on mobile to save GPU memory */}
      {!isMobile && (
        <Environment 
          preset="apartment"
          environmentIntensity={0.8}
        />
      )}
      
      {/* Subtle Fog for Atmosphere (disabled on low quality) */}
      {quality !== 'low' && <fog attach="fog" args={['#E8E4DC', 8, 18]} />}

      {/* ROUND 10: TIME-OF-DAY LIGHTING SYSTEM (replaces PhotorealisticLighting) */}
      <TimeOfDayLighting />
      
      {/* ROUND 9: POST-PROCESSING EFFECTS (high quality only) */}
      {/* ROUND 11: Lazy loaded to reduce bundle size */}
      {deviceSettings.enablePostProcessing && <LazyPostProcessing />}

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
        // ROUND 9: Touch controls for mobile
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
      
      {/* ROUND 9: Enhanced Chair Sway with Spring Physics */}
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
      
      {/* ROUND 9: Enhanced Fan Rotation */}
      <EnhancedFanRotation position={[0, 2.7, 0]} speed={0.5}>
        <CeilingFan />
      </EnhancedFanRotation>
      
      {/* ROUND 11: Lazy loaded to reduce initial bundle size */}
      {!isMobile && <LazyEasterEggs />}
      <GitHubCalendar />
      
      {/* ROUND 10: PERSONAL TOUCHES - reduced set on mobile */}
      <DeskNameplate />
      {!isMobile && <DataEngineeringBooks />}
      {!isMobile && <PersonalPhotos />}
      {!isMobile && <NBAMerchandise />}
      {!isMobile && <AnimeCollectibles />}
      <WaterBottle />
      {!isMobile && <DeskSnacks />}
      {!isMobile && <ChargingDevices />}
      {!isMobile && <PostItNotes />}
      {!isMobile && <PoweredLaptop />}
      
      {/* ROUND 10: WALL DECORATIONS - reduced on mobile */}
      {!isMobile && <DataVizPrints />}
      {!isMobile && <AwardsCertificates />}
      {!isMobile && <Whiteboard />}
      {!isMobile && <Calendar2026 />}
      
      {/* ROUND 10: INTERACTIVE ELEMENTS - skip on mobile */}
      {!isMobile && <InteractiveCoffeeMug position={[0.35, 0.04, 0.55]} />}
      {!isMobile && <BouncingBasketball initialPosition={[0.5, 0.76, -0.1]} />}
      {!isMobile && <InteractivePlant position={[0.55, 0.02, -0.35]} />}
      
      {/* ROUND 10: ADVANCED EASTER EGGS - desktop only */}
      {!isMobile && <LazyAdvancedEasterEggs />}
    </>
  );
}

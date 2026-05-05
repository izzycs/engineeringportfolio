import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * Subtle wobble for monitor stands. Only export still wired into the
 * scene — the previous file also exported ChairSway, PlantLeafMovement,
 * CableSag, LightBeamDust, KeyboardPress, and FanRotation, which were
 * removed along with the rest of the unwired round-9+ animation code.
 */

interface MonitorWobbleProps {
  children: React.ReactNode;
  position?: [number, number, number];
  wobbleAmount?: number;
}

export function MonitorWobble({
  children,
  position = [0, 0, 0],
  wobbleAmount = 0.0008,
}: MonitorWobbleProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const time = state.clock.elapsedTime;
      groupRef.current.rotation.y = Math.sin(time * 0.6) * wobbleAmount;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {children}
    </group>
  );
}

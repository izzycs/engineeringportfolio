import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { useStore } from '../store/useStore';
import * as THREE from 'three';

/**
 * Time of day presets for dynamic lighting
 */
export type TimeOfDay = 'morning' | 'afternoon' | 'evening' | 'night';

/**
 * Complete lighting configuration for a specific time of day
 * Includes ambient, directional, window light, fog, and object-specific lighting
 */
interface LightingPreset {
  ambient: { color: string; intensity: number };
  directional: { color: string; intensity: number; position: [number, number, number] };
  window: { color: string; intensity: number };
  fog: { color: string; near: number; far: number };
  screenGlow: number;
  deskLampIntensity: number;
}

const LIGHTING_PRESETS: Record<TimeOfDay, LightingPreset> = {
  morning: {
    ambient: { color: '#B0D4F1', intensity: 0.5 },
    directional: { color: '#FFE9D6', intensity: 0.8, position: [5, 5, 5] },
    window: { color: '#87CEEB', intensity: 1.2 },
    fog: { color: '#E0F2FE', near: 8, far: 18 },
    screenGlow: 0.4,
    deskLampIntensity: 0.2,
  },
  afternoon: {
    ambient: { color: '#FFE9D6', intensity: 0.7 },
    directional: { color: '#FFD700', intensity: 1.0, position: [3, 5, 3] },
    window: { color: '#FFD700', intensity: 1.5 },
    fog: { color: '#FFF4E6', near: 8, far: 18 },
    screenGlow: 0.5,
    deskLampIntensity: 0.3,
  },
  evening: {
    ambient: { color: '#FF8C66', intensity: 0.4 },
    directional: { color: '#FF6347', intensity: 0.6, position: [2, 3, 2] },
    window: { color: '#FF6347', intensity: 0.8 },
    fog: { color: '#4A2F2F', near: 6, far: 15 },
    screenGlow: 0.7,
    deskLampIntensity: 0.8,
  },
  night: {
    ambient: { color: '#1E2A4A', intensity: 0.2 },
    directional: { color: '#1E3A8A', intensity: 0.3, position: [1, 2, 1] },
    window: { color: '#0C1445', intensity: 0.3 },
    fog: { color: '#0A0F1E', near: 5, far: 12 },
    screenGlow: 1.0,
    deskLampIntensity: 1.2,
  },
};

/**
 * Dynamic time-of-day lighting system
 * Smoothly transitions between morning, afternoon, evening, and night lighting presets
 * Updates ambient light, directional light, window light, desk lamp, fog, and screen glows
 * 
 * @example
 * ```tsx
 * <TimeOfDayLighting />
 * ```
 */
export function TimeOfDayLighting() {
  const { scene } = useThree();
  const timeOfDay = useStore((state) => state.timeOfDay || 'afternoon');
  const quality = useStore((state) => state.quality);
  
  const ambientRef = useRef<THREE.AmbientLight>(null);
  const directionalRef = useRef<THREE.DirectionalLight>(null);
  const windowRef = useRef<THREE.PointLight>(null);
  const deskLampRef = useRef<THREE.PointLight>(null);
  
  const targetPreset = useRef<LightingPreset>(LIGHTING_PRESETS[timeOfDay]);

  useEffect(() => {
    targetPreset.current = LIGHTING_PRESETS[timeOfDay];
  }, [timeOfDay]);

  useFrame(() => {
    // Smooth transition between presets
    const lerpFactor = 0.02;
    
    if (ambientRef.current) {
      const targetColor = new THREE.Color(targetPreset.current.ambient.color);
      ambientRef.current.color.lerp(targetColor, lerpFactor);
      ambientRef.current.intensity += (targetPreset.current.ambient.intensity - ambientRef.current.intensity) * lerpFactor;
    }
    
    if (directionalRef.current) {
      const targetColor = new THREE.Color(targetPreset.current.directional.color);
      directionalRef.current.color.lerp(targetColor, lerpFactor);
      directionalRef.current.intensity += (targetPreset.current.directional.intensity - directionalRef.current.intensity) * lerpFactor;
      
      const targetPos = new THREE.Vector3(...targetPreset.current.directional.position);
      directionalRef.current.position.lerp(targetPos, lerpFactor);
    }
    
    if (windowRef.current) {
      const targetColor = new THREE.Color(targetPreset.current.window.color);
      windowRef.current.color.lerp(targetColor, lerpFactor);
      windowRef.current.intensity += (targetPreset.current.window.intensity - windowRef.current.intensity) * lerpFactor;
    }
    
    if (deskLampRef.current) {
      deskLampRef.current.intensity += (targetPreset.current.deskLampIntensity - deskLampRef.current.intensity) * lerpFactor;
    }
    
    // Update fog
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      const targetFogColor = new THREE.Color(targetPreset.current.fog.color);
      scene.fog.color.lerp(targetFogColor, lerpFactor);
      scene.fog.near += (targetPreset.current.fog.near - scene.fog.near) * lerpFactor;
      scene.fog.far += (targetPreset.current.fog.far - scene.fog.far) * lerpFactor;
    }
    
    // Update screen glows
    scene.traverse((object) => {
      if (object instanceof THREE.PointLight && object.name === 'screenGlow') {
        object.intensity += (targetPreset.current.screenGlow - object.intensity) * lerpFactor;
      }
    });
  });

  const preset = LIGHTING_PRESETS[timeOfDay];

  return (
    <>
      {/* Ambient light */}
      <ambientLight 
        ref={ambientRef}
        color={preset.ambient.color} 
        intensity={preset.ambient.intensity} 
      />
      
      {/* Directional sun/moon light */}
      <directionalLight
        ref={directionalRef}
        color={preset.directional.color}
        intensity={preset.directional.intensity}
        position={preset.directional.position}
        castShadow={quality === 'high'}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-5}
        shadow-camera-right={5}
        shadow-camera-top={5}
        shadow-camera-bottom={-5}
      />
      
      {/* Window light */}
      <pointLight
        ref={windowRef}
        name="windowLight"
        position={[0.6, 2, -1.1]}
        color={preset.window.color}
        intensity={preset.window.intensity}
        distance={4}
      />
      
      {/* Desk lamp */}
      <pointLight
        ref={deskLampRef}
        name="deskLamp"
        position={[-0.6, 1.0, -0.3]}
        color="#FFA500"
        intensity={preset.deskLampIntensity}
        distance={2}
        decay={2}
      />
    </>
  );
}

/**
 * UI control panel for changing time of day
 * Displays emoji-based buttons for each time period
 * Highlights current selection and provides smooth hover effects
 * 
 * @example
 * ```tsx
 * <TimeOfDayControl />
 * ```
 */
export function TimeOfDayControl() {
  const setTimeOfDay = useStore((state) => state.setTimeOfDay);
  const timeOfDay = useStore((state) => state.timeOfDay || 'afternoon');

  const times: Array<{ value: TimeOfDay; label: string; emoji: string }> = [
    { value: 'morning', label: 'Morning', emoji: '🌅' },
    { value: 'afternoon', label: 'Afternoon', emoji: '☀️' },
    { value: 'evening', label: 'Evening', emoji: '🌆' },
    { value: 'night', label: 'Night', emoji: '🌙' },
  ];

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      gap: '10px',
      background: 'rgba(0, 0, 0, 0.7)',
      padding: '12px 20px',
      borderRadius: '12px',
      backdropFilter: 'blur(10px)',
      zIndex: 1000,
    }}>
      {times.map((time) => (
        <button
          key={time.value}
          onClick={() => setTimeOfDay(time.value)}
          style={{
            background: timeOfDay === time.value ? 'rgba(59, 130, 246, 0.8)' : 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            borderRadius: '8px',
            padding: '8px 16px',
            color: 'white',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: timeOfDay === time.value ? 'bold' : 'normal',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}
          onMouseEnter={(e) => {
            if (timeOfDay !== time.value) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (timeOfDay !== time.value) {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }
          }}
        >
          <span>{time.emoji}</span>
          <span>{time.label}</span>
        </button>
      ))}
    </div>
  );
}

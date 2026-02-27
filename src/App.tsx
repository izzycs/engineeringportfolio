import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './three/Scene';
import { Nav } from './components/Nav';
import { ProjectModal } from './components/ProjectModal';
import { ContactForm } from './components/ContactForm';
import { PerformanceToggle } from './components/PerformanceToggle';
import { Instructions } from './components/Instructions';
import { BackButton } from './components/BackButton';
import { LoadingScreen } from './components/LoadingScreen';
import { KeyboardShortcuts } from './components/KeyboardShortcuts';
import { useStore } from './store/useStore';
// ROUND 10: New UI components
import { TimeOfDayControl } from './three/TimeOfDayLighting';
import { SoundControl } from './three/SoundEffects';
import { AccessibilityPanel, SkipToContent } from './three/AccessibilityFeatures';
// ROUND 11: Error handling and recovery
import { ErrorBoundary, WebGLContextLossHandler } from './components/ErrorBoundary';

function App() {
  const quality = useStore((state) => state.quality);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile for camera positioning
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // ROUND 11: Add WebGL context loss handling
    const cleanup = WebGLContextLossHandler();
    
    return () => {
      window.removeEventListener('resize', checkMobile);
      cleanup?.();
    };
  }, []);

  // Adjust camera for mobile - farther back for full room view
  const cameraPosition: [number, number, number] = isMobile ? [0, 2.5, 8] : [0, 1.6, 5];
  const cameraFov = isMobile ? 75 : 60;

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <SkipToContent />
      
      <Canvas
        shadows={quality === 'high'}
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{ 
          antialias: quality === 'high',
          powerPreference: isMobile ? 'low-power' : 'high-performance'
        }}
        dpr={Math.min(window.devicePixelRatio, 2)}
      >
        <Scene />
      </Canvas>
      
      <main id="main-content">
        <Nav />
        <Instructions />
        <BackButton />
        <ProjectModal />
        <ContactForm />
        <PerformanceToggle />
        <KeyboardShortcuts />
        
        {/* ROUND 10: New UI Controls */}
        <TimeOfDayControl />
        <SoundControl />
        <AccessibilityPanel />
      </main>
    </ErrorBoundary>
  );
}

export default App;

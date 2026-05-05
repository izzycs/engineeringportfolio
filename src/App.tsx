import { useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Scene } from './three/Scene';
import { Nav } from './components/Nav';
import { ProjectModal } from './components/ProjectModal';
import { ContactForm } from './components/ContactForm';
import { BackButton } from './components/BackButton';
import { LoadingScreen } from './components/LoadingScreen';
import { useStore } from './store/useStore';
import { ErrorBoundary, WebGLContextLossHandler } from './components/ErrorBoundary';

function App() {
  const quality = useStore((state) => state.quality);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    const cleanup = WebGLContextLossHandler();
    return () => {
      window.removeEventListener('resize', checkMobile);
      cleanup?.();
    };
  }, []);

  const cameraPosition: [number, number, number] = isMobile ? [0, 2.2, 7] : [0, 1.6, 5];
  const cameraFov = isMobile ? 70 : 55;
  const dpr: [number, number] = isMobile ? [1, 1.25] : [1, Math.min(window.devicePixelRatio, 2)];

  return (
    <ErrorBoundary>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <Canvas
        shadows={!isMobile && quality === 'high'}
        camera={{ position: cameraPosition, fov: cameraFov }}
        gl={{
          antialias: !isMobile,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          failIfMajorPerformanceCaveat: false,
          alpha: false,
        }}
        dpr={dpr}
        style={{ background: '#0b1020' }}
      >
        <color attach="background" args={['#0b1020']} />
        <Scene />
      </Canvas>

      <main id="main-content">
        <Nav />
        <BackButton />
        <ProjectModal />
        <ContactForm />
      </main>
    </ErrorBoundary>
  );
}

export default App;

import { useState } from 'react';
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

function App() {
  const quality = useStore((state) => state.quality);
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      
      <Canvas
        shadows={quality === 'high'}
        camera={{ position: [0, 1.6, 5], fov: 60 }}
        gl={{ antialias: quality === 'high' }}
      >
        <Scene />
      </Canvas>
      
      <Nav />
      <Instructions />
      <BackButton />
      <ProjectModal />
      <ContactForm />
      <PerformanceToggle />
      <KeyboardShortcuts />
    </>
  );
}

export default App;

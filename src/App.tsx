import { Canvas } from '@react-three/fiber';
import { Scene } from './three/Scene';
import { Nav } from './components/Nav';
import { ProjectModal } from './components/ProjectModal';
import { ContactForm } from './components/ContactForm';
import { PerformanceToggle } from './components/PerformanceToggle';
import { Instructions } from './components/Instructions';
import { BackButton } from './components/BackButton';
import { useStore } from './store/useStore';

function App() {
  const quality = useStore((state) => state.quality);

  return (
    <>
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
    </>
  );
}

export default App;

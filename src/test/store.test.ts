import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../store/useStore';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store state before each test
    useStore.setState({
      cameraTarget: 'default',
      deskHeight: 0.7,
      quality: 'high',
      showInstructions: true,
      selectedProject: null,
      showContactForm: false,
    });
  });

  it('should have initial state', () => {
    const state = useStore.getState();
    expect(state.cameraTarget).toBe('default');
    expect(state.deskHeight).toBe(0.7);
    expect(state.quality).toBe('high');
  });

  it('should update camera target', () => {
    const { setCameraTarget } = useStore.getState();
    setCameraTarget('leftMonitor');
    expect(useStore.getState().cameraTarget).toBe('leftMonitor');
  });

  it('should toggle desk height', () => {
    const { toggleDeskHeight } = useStore.getState();
    toggleDeskHeight();
    expect(useStore.getState().deskHeight).toBe(1.2);
    toggleDeskHeight();
    expect(useStore.getState().deskHeight).toBe(0.7);
  });

  it('should update quality setting', () => {
    const { setQuality } = useStore.getState();
    setQuality('low');
    expect(useStore.getState().quality).toBe('low');
  });

  it('should manage project selection', () => {
    const { setSelectedProject } = useStore.getState();
    setSelectedProject('dq-dashboard');
    expect(useStore.getState().selectedProject).toBe('dq-dashboard');
    setSelectedProject(null);
    expect(useStore.getState().selectedProject).toBeNull();
  });

  it('should hide instructions when camera moves', () => {
    const { setCameraTarget } = useStore.getState();
    setCameraTarget('bookshelf');
    expect(useStore.getState().showInstructions).toBe(false);
  });
});

import { create } from 'zustand';

export type QualityLevel = 'high' | 'low';
export type TimeOfDay = 'day' | 'golden' | 'night';
export type CameraTarget = 'default' | 'leftMonitor' | 'rightMonitor' | 'bookshelf' | 'tv' | 'window';

interface CameraPosition {
  position: [number, number, number];
  target: [number, number, number];
}

export const cameraPositions: Record<CameraTarget, CameraPosition> = {
  default: {
    position: [0, 1.6, 5],
    target: [0, 1.2, 0],
  },
  leftMonitor: {
    position: [-0.8, 1.5, 2],
    target: [-0.5, 1.3, 0],
  },
  rightMonitor: {
    position: [0.8, 1.5, 2],
    target: [0.5, 1.3, 0],
  },
  bookshelf: {
    position: [-3, 1.5, 2],
    target: [-2.5, 1.2, -2],
  },
  tv: {
    position: [0, 1.8, 3],
    target: [0, 1.8, -3],
  },
  window: {
    position: [3, 1.6, 1],
    target: [2.5, 1.6, -2],
  },
};

interface StoreState {
  // Camera
  cameraTarget: CameraTarget;
  setCameraTarget: (target: CameraTarget) => void;
  
  // Desk
  deskHeight: number;
  isDeskTransitioning: boolean;
  setDeskHeight: (height: number) => void;
  toggleDeskHeight: () => void;
  
  // Time of day
  timeOfDay: TimeOfDay;
  cycleSpeed: number;
  setTimeOfDay: (time: TimeOfDay) => void;
  setCycleSpeed: (speed: number) => void;
  
  // Quality
  quality: QualityLevel;
  setQuality: (quality: QualityLevel) => void;
  
  // UI
  showInstructions: boolean;
  setShowInstructions: (show: boolean) => void;
  selectedProject: string | null;
  setSelectedProject: (id: string | null) => void;
  showContactForm: boolean;
  setShowContactForm: (show: boolean) => void;
}

export const useStore = create<StoreState>((set) => ({
  // Camera
  cameraTarget: 'default',
  setCameraTarget: (target) => set({ cameraTarget: target, showInstructions: false }),
  
  // Desk (0.7 = sitting, 1.2 = standing)
  deskHeight: 0.7,
  isDeskTransitioning: false,
  setDeskHeight: (height) => set({ deskHeight: height }),
  toggleDeskHeight: () => set((state) => ({
    deskHeight: state.deskHeight === 0.7 ? 1.2 : 0.7,
    isDeskTransitioning: true,
  })),
  
  // Time
  timeOfDay: 'day',
  cycleSpeed: 1, // multiplier for auto-cycle
  setTimeOfDay: (time) => set({ timeOfDay: time }),
  setCycleSpeed: (speed) => set({ cycleSpeed: speed }),
  
  // Quality
  quality: 'high',
  setQuality: (quality) => set({ quality }),
  
  // UI
  showInstructions: true,
  setShowInstructions: (show) => set({ showInstructions: show }),
  selectedProject: null,
  setSelectedProject: (id) => set({ selectedProject: id }),
  showContactForm: false,
  setShowContactForm: (show) => set({ showContactForm: show }),
}));

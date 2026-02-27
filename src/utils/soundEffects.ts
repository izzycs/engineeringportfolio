// Simple sound effects manager for the portfolio
// All sounds are optional and can be toggled off

export type SoundType = 
  | 'click' 
  | 'hover' 
  | 'bounce' 
  | 'typing' 
  | 'ambient';

interface SoundConfig {
  volume: number;
  loop?: boolean;
}

class SoundEffectsManager {
  private enabled = false;
  private configs: Map<SoundType, SoundConfig> = new Map();
  private ambientSound: HTMLAudioElement | null = null;

  constructor() {
    // Initialize sound configurations
    this.configs.set('click', { volume: 0.3 });
    this.configs.set('hover', { volume: 0.15 });
    this.configs.set('bounce', { volume: 0.5 });
    this.configs.set('typing', { volume: 0.2, loop: true });
    this.configs.set('ambient', { volume: 0.1, loop: true });

    // Load enabled state from localStorage
    const savedState = localStorage.getItem('soundEffectsEnabled');
    this.enabled = savedState === 'true';
  }

  toggle(): boolean {
    this.enabled = !this.enabled;
    localStorage.setItem('soundEffectsEnabled', String(this.enabled));
    
    // Stop all sounds when disabling
    if (!this.enabled) {
      this.stopAll();
    }
    
    return this.enabled;
  }

  isEnabled(): boolean {
    return this.enabled;
  }

  // Play a sound effect using Web Audio API
  play(type: SoundType): void {
    if (!this.enabled) return;

    try {
      const config = this.configs.get(type);
      if (!config) return;

      // Create simple beep/click sounds using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different frequencies for different sound types
      switch (type) {
        case 'click':
          oscillator.frequency.value = 800;
          gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.05);
          break;
        
        case 'hover':
          oscillator.frequency.value = 600;
          gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.03);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.03);
          break;
        
        case 'bounce':
          oscillator.frequency.value = 150;
          gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.1);
          break;
        
        case 'typing':
          oscillator.frequency.value = 400;
          oscillator.type = 'square';
          gainNode.gain.setValueAtTime(config.volume, audioContext.currentTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.02);
          oscillator.start(audioContext.currentTime);
          oscillator.stop(audioContext.currentTime + 0.02);
          break;
      }
    } catch (error) {
      console.warn('Sound effect playback failed:', error);
    }
  }

  // Start ambient background music
  startAmbient(): void {
    if (!this.enabled || this.ambientSound) return;

    try {
      // Create a very subtle ambient drone using multiple oscillators
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const config = this.configs.get('ambient');
      
      if (!config) return;

      // Create a subtle ambient pad with multiple oscillators
      const createDrone = (freq: number, detune: number) => {
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        
        osc.type = 'sine';
        osc.frequency.value = freq;
        osc.detune.value = detune;
        gain.gain.value = config.volume / 3; // Divide by number of oscillators
        
        osc.connect(gain);
        gain.connect(audioContext.destination);
        osc.start();
        
        return osc;
      };

      // Create a simple ambient pad (low C, E, G)
      createDrone(130.81, 0);   // C3
      createDrone(164.81, -5);  // E3 slightly detuned
      createDrone(196.00, 5);   // G3 slightly detuned
    } catch (error) {
      console.warn('Ambient sound failed:', error);
    }
  }

  stopAmbient(): void {
    if (this.ambientSound) {
      this.ambientSound.pause();
      this.ambientSound = null;
    }
  }

  stopAll(): void {
    this.stopAmbient();
  }
}

// Singleton instance
export const soundEffects = new SoundEffectsManager();

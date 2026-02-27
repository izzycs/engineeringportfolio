import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

// Sound effect manager
class SoundManager {
  private sounds: Map<string, HTMLAudioElement> = new Map();
  private enabled: boolean = true;
  private volume: number = 0.3;

  constructor() {
    // Initialize sound effects (using Data URLs or web audio API)
    this.initSounds();
  }

  private initSounds() {
    // Create simple beep sounds using Web Audio API
    // In production, these would be actual audio files
  }

  play(soundName: string) {
    if (!this.enabled) return;
    
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.volume = this.volume;
      sound.currentTime = 0;
      sound.play().catch(() => {
        // Ignore errors (user gesture required)
      });
    }
  }

  setVolume(volume: number) {
    this.volume = Math.max(0, Math.min(1, volume));
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
  }
}

export const soundManager = new SoundManager();

// Sound effects component
export function SoundEffects() {
  const [soundEnabled] = useState(true);
  const [volume] = useState(0.3);

  useEffect(() => {
    soundManager.setEnabled(soundEnabled);
  }, [soundEnabled]);

  useEffect(() => {
    soundManager.setVolume(volume);
  }, [volume]);

  return null; // This component just manages sound state
}

// Ambient sounds component
export function AmbientSounds() {
  const timeOfDay = useStore((state) => state.timeOfDay || 'afternoon');

  useEffect(() => {
    // In production, load actual ambient sound files
    // For now, this is just a placeholder
    
    // Would load and play ambient sound based on timeOfDay
    // Example: soundManager.play(`ambient-${timeOfDay}`);
  }, [timeOfDay]);

  return null;
}

// Clickable object that plays sound
export function SoundTrigger({ 
  soundName, 
  children 
}: { 
  soundName: string;
  children: React.ReactNode;
}) {
  const handleClick = (e: any) => {
    soundManager.play(soundName);
    if (e && e.stopPropagation) {
      e.stopPropagation();
    }
  };

  return (
    <group onClick={handleClick}>
      {children}
    </group>
  );
}

// Sound control UI
export function SoundControl() {
  const [enabled, setEnabled] = useState(true);
  const [volume, setVolume] = useState(0.3);
  const [showControls, setShowControls] = useState(false);

  const handleToggle = () => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    soundManager.setEnabled(newEnabled);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    soundManager.setVolume(newVolume);
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      right: '20px',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setShowControls(!showControls)}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          transition: 'all 0.3s ease',
        }}
        title="Sound Controls"
      >
        {enabled ? '🔊' : '🔇'}
      </button>
      
      {showControls && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          right: '0',
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '15px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          minWidth: '200px',
        }}>
          <div style={{ marginBottom: '10px' }}>
            <label style={{ color: 'white', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Sound Effects
            </label>
            <button
              onClick={handleToggle}
              style={{
                background: enabled ? '#10B981' : '#EF4444',
                border: 'none',
                borderRadius: '6px',
                padding: '8px 16px',
                color: 'white',
                cursor: 'pointer',
                width: '100%',
              }}
            >
              {enabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
          
          <div>
            <label style={{ color: 'white', fontSize: '14px', display: 'block', marginBottom: '5px' }}>
              Volume: {Math.round(volume * 100)}%
            </label>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={handleVolumeChange}
              style={{ width: '100%' }}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Keyboard typing sound effect (for demo)
export function useKeyboardSound() {
  useEffect(() => {
    const handleKeyPress = () => {
      soundManager.play('keypress');
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}

// Mouse click sound effect
export function useMouseClickSound() {
  useEffect(() => {
    const handleClick = () => {
      soundManager.play('click');
    };

    window.addEventListener('mousedown', handleClick);
    return () => window.removeEventListener('mousedown', handleClick);
  }, []);
}

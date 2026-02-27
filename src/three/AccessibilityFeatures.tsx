import { useState, useEffect } from 'react';

// Accessibility settings
export interface A11ySettings {
  reducedMotion: boolean;
  highContrast: boolean;
  colorBlindMode: 'none' | 'protanopia' | 'deuteranopia' | 'tritanopia';
  textScale: number;
  screenReaderEnabled: boolean;
  keyboardNavigation: boolean;
}

// Accessibility control panel
export function AccessibilityPanel() {
  const [showPanel, setShowPanel] = useState(false);
  const [settings, setSettings] = useState<A11ySettings>({
    reducedMotion: false,
    highContrast: false,
    colorBlindMode: 'none',
    textScale: 1.0,
    screenReaderEnabled: false,
    keyboardNavigation: true,
  });

  // Detect system preferences
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const highContrast = window.matchMedia('(prefers-contrast: more)').matches;
    
    setSettings((prev) => ({
      ...prev,
      reducedMotion,
      highContrast,
    }));
  }, []);

  // Apply settings
  useEffect(() => {
    // Update CSS variables
    document.documentElement.style.setProperty('--text-scale', settings.textScale.toString());
    
    // Apply reduced motion
    if (settings.reducedMotion) {
      document.documentElement.style.setProperty('--animation-duration', '0s');
    } else {
      document.documentElement.style.setProperty('--animation-duration', '0.3s');
    }
    
    // Apply high contrast
    if (settings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
    
    // Store settings
    localStorage.setItem('a11y-settings', JSON.stringify(settings));
  }, [settings]);

  // Load saved settings
  useEffect(() => {
    const saved = localStorage.getItem('a11y-settings');
    if (saved) {
      try {
        setSettings(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load accessibility settings');
      }
    }
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: '20px',
      left: '20px',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setShowPanel(!showPanel)}
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
        }}
        aria-label="Accessibility Settings"
        title="Accessibility Settings"
      >
        ♿
      </button>

      {showPanel && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: '0',
          background: 'rgba(0, 0, 0, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          minWidth: '300px',
          maxHeight: '600px',
          overflowY: 'auto',
          color: 'white',
        }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>
            Accessibility Settings
          </h3>

          {/* Reduced Motion */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.reducedMotion}
                onChange={(e) => setSettings({ ...settings, reducedMotion: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>Reduce Motion</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Minimize animations and transitions
                </div>
              </div>
            </label>
          </div>

          {/* High Contrast */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.highContrast}
                onChange={(e) => setSettings({ ...settings, highContrast: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>High Contrast</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Increase contrast for better visibility
                </div>
              </div>
            </label>
          </div>

          {/* Color Blind Mode */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>Color Blind Mode</div>
            <select
              value={settings.colorBlindMode}
              onChange={(e) => setSettings({ ...settings, colorBlindMode: e.target.value as any })}
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontSize: '14px',
              }}
            >
              <option value="none" style={{ background: '#1A1A1A' }}>None</option>
              <option value="protanopia" style={{ background: '#1A1A1A' }}>Protanopia (Red-blind)</option>
              <option value="deuteranopia" style={{ background: '#1A1A1A' }}>Deuteranopia (Green-blind)</option>
              <option value="tritanopia" style={{ background: '#1A1A1A' }}>Tritanopia (Blue-blind)</option>
            </select>
          </div>

          {/* Text Scale */}
          <div style={{ marginBottom: '20px' }}>
            <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
              Text Scale: {(settings.textScale * 100).toFixed(0)}%
            </div>
            <input
              type="range"
              min="0.8"
              max="1.5"
              step="0.1"
              value={settings.textScale}
              onChange={(e) => setSettings({ ...settings, textScale: parseFloat(e.target.value) })}
              style={{ width: '100%' }}
            />
          </div>

          {/* Screen Reader */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.screenReaderEnabled}
                onChange={(e) => setSettings({ ...settings, screenReaderEnabled: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>Screen Reader Support</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Enable descriptions for screen readers
                </div>
              </div>
            </label>
          </div>

          {/* Keyboard Navigation */}
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={settings.keyboardNavigation}
                onChange={(e) => setSettings({ ...settings, keyboardNavigation: e.target.checked })}
                style={{ width: '20px', height: '20px' }}
              />
              <div>
                <div style={{ fontWeight: 'bold' }}>Keyboard Navigation</div>
                <div style={{ fontSize: '12px', opacity: 0.8 }}>
                  Enable keyboard controls (Arrow keys, Tab)
                </div>
              </div>
            </label>
          </div>

          <div style={{
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)',
            fontSize: '12px',
            opacity: 0.7,
          }}>
            <div>Keyboard Shortcuts:</div>
            <div>• Arrow Keys: Rotate view</div>
            <div>• +/-: Zoom in/out</div>
            <div>• Space: Reset view</div>
            <div>• Tab: Cycle through interactive elements</div>
          </div>
        </div>
      )}
    </div>
  );
}

// Keyboard navigation hook
export function useKeyboardNavigation() {
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      const settings = localStorage.getItem('a11y-settings');
      if (!settings) return;
      
      try {
        const parsed: A11ySettings = JSON.parse(settings);
        if (!parsed.keyboardNavigation) return;
      } catch {
        return;
      }

      // Handle navigation keys
      switch (e.key) {
        case 'ArrowLeft':
          // Rotate camera left
          break;
        case 'ArrowRight':
          // Rotate camera right
          break;
        case 'ArrowUp':
          // Tilt camera up
          break;
        case 'ArrowDown':
          // Tilt camera down
          break;
        case '+':
        case '=':
          // Zoom in
          break;
        case '-':
          // Zoom out
          break;
        case ' ':
          // Reset view
          e.preventDefault();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);
}

// Screen reader announcements
export function ScreenReaderAnnouncement({ message }: { message: string }) {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-atomic="true"
      style={{
        position: 'absolute',
        left: '-10000px',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
      }}
    >
      {message}
    </div>
  );
}

// Focus trap for modals
export function useFocusTrap(ref: React.RefObject<HTMLElement>, active: boolean) {
  useEffect(() => {
    if (!active || !ref.current) return;

    const element = ref.current;
    const focusableElements = element.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    const handleTab = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    element.addEventListener('keydown', handleTab);
    firstElement?.focus();

    return () => {
      element.removeEventListener('keydown', handleTab);
    };
  }, [ref, active]);
}

// Skip to content link
export function SkipToContent() {
  return (
    <a
      href="#main-content"
      style={{
        position: 'absolute',
        left: '-10000px',
        top: 'auto',
        width: '1px',
        height: '1px',
        overflow: 'hidden',
        background: '#000',
        color: '#fff',
        padding: '10px',
        textDecoration: 'none',
        zIndex: 10000,
      }}
      onFocus={(e) => {
        e.currentTarget.style.left = '10px';
        e.currentTarget.style.top = '10px';
        e.currentTarget.style.width = 'auto';
        e.currentTarget.style.height = 'auto';
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = '-10000px';
        e.currentTarget.style.top = 'auto';
        e.currentTarget.style.width = '1px';
        e.currentTarget.style.height = '1px';
      }}
    >
      Skip to main content
    </a>
  );
}

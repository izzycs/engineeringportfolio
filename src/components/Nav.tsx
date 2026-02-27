import { useStore } from '../store/useStore';
import { soundEffects } from '../utils/soundEffects';
import { useState } from 'react';

export function Nav() {
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const setShowContactForm = useStore((state) => state.setShowContactForm);
  const toggleDeskHeight = useStore((state) => state.toggleDeskHeight);
  const cameraTarget = useStore((state) => state.cameraTarget);
  const [soundEnabled, setSoundEnabled] = useState(soundEffects.isEnabled());

  const navButtons = [
    { 
      label: 'Experience', 
      action: () => {
        setCameraTarget('leftMonitor');
        soundEffects.play('click');
      },
      target: 'leftMonitor' as const
    },
    { 
      label: 'Projects', 
      action: () => {
        setCameraTarget('rightMonitor');
        soundEffects.play('click');
      },
      target: 'rightMonitor' as const
    },
    { 
      label: 'Bookshelf', 
      action: () => {
        setCameraTarget('bookshelf');
        soundEffects.play('click');
      },
      target: 'bookshelf' as const
    },
    { 
      label: 'Contact', 
      action: () => {
        setShowContactForm(true);
        soundEffects.play('click');
      },
      target: null
    },
    { 
      label: 'Reset View', 
      action: () => {
        setCameraTarget('default');
        soundEffects.play('click');
      },
      target: 'default' as const
    },
  ];

  const handleToggleDeskHeight = () => {
    toggleDeskHeight();
    soundEffects.play('click');
  };

  const handleToggleSound = () => {
    const newState = soundEffects.toggle();
    setSoundEnabled(newState);
    soundEffects.play('click');
  };

  const getViewBreadcrumb = () => {
    switch (cameraTarget) {
      case 'leftMonitor':
        return '🖥️ Experience';
      case 'rightMonitor':
        return '🖥️ Projects';
      case 'bookshelf':
        return '📚 Bookshelf';
      case 'tv':
        return '📺 S&P 500 TV';
      case 'window':
        return '🪟 Window View';
      case 'default':
      default:
        return '🏠 Full Room';
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-3 md:gap-6 flex-wrap">
          <div className="text-base md:text-lg font-bold text-white">Izzy Amaya</div>
          
          {/* Breadcrumb - Current View */}
          <div className="hidden sm:flex items-center gap-2 text-xs text-gray-300 bg-white/5 px-3 py-1 rounded">
            <span className="text-gray-500">Viewing:</span>
            <span className="font-medium">{getViewBreadcrumb()}</span>
          </div>
          
          {navButtons.map((btn) => {
            const isActive = btn.target && btn.target === cameraTarget;
            return (
              <button
                key={btn.label}
                onClick={btn.action}
                onMouseEnter={() => soundEffects.play('hover')}
                className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded transition-all ${
                  isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/50' 
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {btn.label}
                {isActive && <span className="ml-1">●</span>}
              </button>
            );
          })}
        </div>
        
        <div className="flex items-center gap-2 md:gap-4">
          <a 
            href="https://github.com/izzycs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            title="GitHub"
            onMouseEnter={() => soundEffects.play('hover')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </a>
          <a 
            href="https://www.linkedin.com/in/izzycs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-white hover:text-gray-300 transition-colors"
            title="LinkedIn"
            onMouseEnter={() => soundEffects.play('hover')}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
          
          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            onMouseEnter={() => soundEffects.play('hover')}
            className={`px-3 py-1.5 text-xs md:text-sm font-medium rounded transition-colors ${
              soundEnabled 
                ? 'bg-green-600 hover:bg-green-700 text-white' 
                : 'bg-gray-600 hover:bg-gray-700 text-white'
            }`}
            title={soundEnabled ? 'Sound On' : 'Sound Off'}
          >
            {soundEnabled ? '🔊' : '🔇'}
          </button>
          
          <button
            onClick={handleToggleDeskHeight}
            onMouseEnter={() => soundEffects.play('hover')}
            className="px-3 md:px-4 py-1.5 text-xs md:text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
          >
            <span className="hidden md:inline">Toggle Desk ↕</span>
            <span className="md:hidden">Desk ↕</span>
          </button>
        </div>
      </div>
    </nav>
  );
}

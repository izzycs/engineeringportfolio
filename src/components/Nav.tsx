import { useStore } from '../store/useStore';

export function Nav() {
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const setShowContactForm = useStore((state) => state.setShowContactForm);
  const toggleDeskHeight = useStore((state) => state.toggleDeskHeight);

  const navButtons = [
    { label: 'Experience', action: () => setCameraTarget('leftMonitor') },
    { label: 'Projects', action: () => setCameraTarget('rightMonitor') },
    { label: 'Bookshelf', action: () => setCameraTarget('bookshelf') },
    { label: 'Contact', action: () => setShowContactForm(true) },
    { label: 'Reset View', action: () => setCameraTarget('default') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-10 bg-black/30 backdrop-blur-sm border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-2">
        <div className="flex items-center gap-6 flex-wrap">
          <div className="text-lg font-bold text-white">Izzy Amaya</div>
          {navButtons.map((btn) => (
            <button
              key={btn.label}
              onClick={btn.action}
              className="px-3 py-1.5 text-sm font-medium text-white hover:bg-white/10 rounded transition-colors"
            >
              {btn.label}
            </button>
          ))}
        </div>
        
        <button
          onClick={toggleDeskHeight}
          className="px-4 py-1.5 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white rounded transition-colors"
        >
          Toggle Desk ↕
        </button>
      </div>
    </nav>
  );
}

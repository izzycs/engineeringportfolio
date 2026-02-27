import { useEffect, useState } from 'react';

export function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' || (e.shiftKey && e.key === '/')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isOpen]);

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-40 w-10 h-10 rounded-full bg-gray-800/80 backdrop-blur-sm border border-gray-700 text-white hover:bg-gray-700 transition-colors flex items-center justify-center text-lg font-bold shadow-lg"
        title="Keyboard Shortcuts"
      >
        ?
      </button>
    );
  }

  const shortcuts = [
    { key: 'ESC', description: 'Zoom out to default view' },
    { key: '1', description: 'Focus left monitor' },
    { key: '2', description: 'Focus right monitor' },
    { key: '3', description: 'View bookshelf' },
    { key: '4', description: 'View TV' },
    { key: '5', description: 'View window' },
    { key: 'Mouse Drag', description: 'Rotate camera 360°' },
    { key: 'Scroll', description: 'Zoom in/out' },
    { key: 'Click Objects', description: 'Interact with room items' },
    { key: '?', description: 'Toggle this help menu' },
  ];

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
        onClick={() => setIsOpen(false)}
      />

      {/* Modal */}
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 bg-gray-900 border border-purple-500/50 rounded-lg shadow-2xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Keyboard Shortcuts</h2>
            <p className="text-sm text-gray-400">Navigate the portfolio like a pro</p>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Shortcuts list */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="space-y-3">
            {shortcuts.map((shortcut, index) => (
              <div
                key={index}
                className="flex items-center justify-between py-2 px-3 rounded bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <span className="text-gray-300 text-sm">{shortcut.description}</span>
                <kbd className="px-3 py-1 bg-gray-950 border border-gray-700 rounded text-purple-400 font-mono text-xs font-semibold shadow-sm min-w-[60px] text-center">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-800 bg-gray-950/50 rounded-b-lg">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>🎮 Explore the room to find easter eggs!</span>
            <span className="text-purple-500">Press ESC to close</span>
          </div>
        </div>
      </div>
    </>
  );
}

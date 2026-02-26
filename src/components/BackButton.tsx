import { useStore } from '../store/useStore';

export function BackButton() {
  const cameraTarget = useStore((state) => state.cameraTarget);
  const setCameraTarget = useStore((state) => state.setCameraTarget);

  // Only show when zoomed into something (not default view)
  if (cameraTarget === 'default') return null;

  const labels: Record<string, string> = {
    leftMonitor: '🖥️ Experience',
    rightMonitor: '🖥️ Projects',
    bookshelf: '📚 Bookshelf',
    tv: '📺 TV',
    window: '🪟 Window',
  };

  const currentLabel = labels[cameraTarget] || cameraTarget;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
      <div className="bg-black/60 backdrop-blur-sm border border-white/20 rounded-lg px-4 py-2 text-white text-sm font-mono">
        Viewing: {currentLabel}
      </div>
      <button
        onClick={() => setCameraTarget('default')}
        className="bg-white/90 hover:bg-white text-gray-900 font-semibold px-5 py-2.5 rounded-lg shadow-lg transition-all hover:scale-105 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Room
      </button>
    </div>
  );
}

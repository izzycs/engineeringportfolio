import { useStore } from '../store/useStore';

export function BackButton() {
  const cameraTarget = useStore((state) => state.cameraTarget);
  const setCameraTarget = useStore((state) => state.setCameraTarget);

  // Only show when zoomed into something (not default view)
  if (cameraTarget === 'default') return null;

  const labels: Record<string, string> = {
    leftMonitor: '🖥️ Viewing Experience',
    rightMonitor: '🖥️ Viewing Projects',
    bookshelf: '📚 Viewing Bookshelf',
    tv: '📺 Viewing TV',
    window: '🪟 Viewing Window',
  };

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
      <span className="text-white/80 text-sm font-mono bg-black/40 backdrop-blur-sm px-3 py-2 rounded-l-lg border border-white/10">
        {labels[cameraTarget] || 'Zoomed In'}
      </span>
      <button
        onClick={() => setCameraTarget('default')}
        className="px-5 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-white/40 text-white font-medium rounded-r-lg transition-all duration-200 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M19 12H5M12 19l-7-7 7-7"/>
        </svg>
        Back to Room
      </button>
    </div>
  );
}

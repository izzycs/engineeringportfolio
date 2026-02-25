import { useStore } from '../store/useStore';

export function PerformanceToggle() {
  const quality = useStore((state) => state.quality);
  const setQuality = useStore((state) => state.setQuality);

  return (
    <div className="fixed bottom-4 right-4 z-10">
      <div className="bg-black/50 backdrop-blur-sm border border-white/20 rounded-lg p-3">
        <div className="text-white text-sm font-medium mb-2">Quality</div>
        <div className="flex gap-2">
          <button
            onClick={() => setQuality('high')}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              quality === 'high'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            High
          </button>
          <button
            onClick={() => setQuality('low')}
            className={`px-3 py-1.5 text-sm rounded transition-colors ${
              quality === 'low'
                ? 'bg-green-600 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Low
          </button>
        </div>
        <div className="text-xs text-gray-400 mt-2">
          {quality === 'high' ? 'Shadows & effects enabled' : 'Performance mode'}
        </div>
      </div>
    </div>
  );
}

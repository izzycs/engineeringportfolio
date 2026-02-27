import { useEffect, useState } from 'react';
import { useStore } from '../store/useStore';

export function Instructions() {
  const showInstructions = useStore((state) => state.showInstructions);
  const setShowInstructions = useStore((state) => state.setShowInstructions);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detect mobile device
    setIsMobile(/iPhone|iPad|iPod|Android/i.test(navigator.userAgent) || window.innerWidth < 768);
    
    // Auto-hide after 8 seconds (longer on mobile for touch instructions)
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 8000);

    return () => clearTimeout(timer);
  }, [setShowInstructions]);

  if (!showInstructions) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center p-4">
      <div className="bg-black/70 backdrop-blur-sm border border-white/30 rounded-lg p-4 md:p-6 max-w-md w-full text-white animate-fade-in pointer-events-auto overflow-y-auto max-h-[90vh]">
        <h2 className="text-xl md:text-2xl font-bold mb-3">Welcome! 👋</h2>
        <p className="text-gray-300 mb-4 text-sm md:text-base">
          Step into Izzy's data engineering workspace. A blend of analytics, anime, and NBA passion. 
          {isMobile ? ' Tap objects to zoom in — drag to explore 360°.' : ' Click on objects to zoom in — drag to look around 360°.'}
        </p>
        
        <ul className="space-y-2 text-xs md:text-sm mb-4">
          <li>🖥️ <strong>Left Monitor</strong> — Experience & career history</li>
          <li>🖥️ <strong>Right Monitor</strong> — Data engineering projects</li>
          <li>📚 <strong>Bookshelf</strong> — Anime collection, NBA basketball & figurines</li>
          <li>📺 <strong>TV</strong> — Live S&P 500 market data</li>
          <li>🪟 <strong>Window</strong> — DC skyline view</li>
          <li>🎨 <strong>GitHub Calendar</strong> — Contribution heatmap on wall</li>
          <li>⬅️ <strong>Back Button</strong> — Return to full room view</li>
        </ul>

        {isMobile && (
          <div className="bg-blue-600/20 border border-blue-500/50 rounded p-3 mb-4 text-xs md:text-sm">
            <strong className="block mb-2">📱 Mobile Controls:</strong>
            <ul className="space-y-1 text-gray-300">
              <li>• <strong>One finger drag</strong> — Rotate camera</li>
              <li>• <strong>Two finger pinch</strong> — Zoom in/out</li>
              <li>• <strong>Tap objects</strong> — Focus view</li>
              <li>• <strong>Nav menu</strong> — Quick navigation</li>
            </ul>
          </div>
        )}
        
        <button
          onClick={() => setShowInstructions(false)}
          className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-medium text-sm md:text-base"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

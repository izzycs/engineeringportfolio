import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function Instructions() {
  const showInstructions = useStore((state) => state.showInstructions);
  const setShowInstructions = useStore((state) => state.setShowInstructions);

  useEffect(() => {
    // Auto-hide after 5 seconds
    const timer = setTimeout(() => {
      setShowInstructions(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, [setShowInstructions]);

  if (!showInstructions) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none flex items-center justify-center">
      <div className="bg-black/70 backdrop-blur-sm border border-white/30 rounded-lg p-6 max-w-md mx-4 text-white animate-fade-in pointer-events-auto">
        <h2 className="text-2xl font-bold mb-3">Welcome! 👋</h2>
        <p className="text-gray-300 mb-4">
          Step into Izzy's data engineering workspace. A blend of analytics, anime, and NBA passion. Click on objects to zoom in — drag to look around 360°.
        </p>
        <ul className="space-y-2 text-sm">
          <li>🖥️ <strong>Left Monitor</strong> — Experience & career history</li>
          <li>🖥️ <strong>Right Monitor</strong> — Data engineering projects</li>
          <li>📚 <strong>Bookshelf</strong> — Anime collection, NBA basketball & figurines</li>
          <li>📺 <strong>TV</strong> — Live S&P 500 market data</li>
          <li>🪟 <strong>Window</strong> — DC skyline view</li>
          <li>⬅️ <strong>Back Button</strong> — Return to full room view</li>
        </ul>
        <button
          onClick={() => setShowInstructions(false)}
          className="mt-4 w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded transition-colors font-medium"
        >
          Got it!
        </button>
      </div>
    </div>
  );
}

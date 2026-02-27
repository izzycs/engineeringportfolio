import { useEffect, useState } from 'react';

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Start fade out
          setTimeout(() => {
            setFadeOut(true);
            // Complete after fade animation
            setTimeout(() => onComplete(), 500);
          }, 300);
          return 100;
        }
        // Realistic loading curve
        const increment = prev < 50 ? 8 : prev < 80 ? 4 : 2;
        return Math.min(prev + increment, 100);
      });
    }, 100);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 flex flex-col items-center justify-center transition-opacity duration-500 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Name/Logo */}
      <div className="mb-8">
        <h1 className="text-6xl font-bold text-white mb-2 tracking-wider">
          IZZY
        </h1>
        <p className="text-xl text-purple-300 text-center font-light tracking-widest">
          DEVELOPER PORTFOLIO
        </p>
      </div>

      {/* Loading bar */}
      <div className="w-80 h-2 bg-gray-800 rounded-full overflow-hidden mb-4 shadow-lg">
        <div
          className="h-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 transition-all duration-300 ease-out rounded-full"
          style={{ width: `${progress}%` }}
        >
          {/* Shimmer effect */}
          <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Percentage */}
      <div className="text-2xl font-mono text-purple-400 mb-8">
        {progress}%
      </div>

      {/* Loading text with animated dots */}
      <div className="text-sm text-gray-400 flex items-center gap-1">
        <span>Loading 3D environment</span>
        <span className="inline-flex gap-1">
          <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
          <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
        </span>
      </div>

      {/* Hint text */}
      <div className="absolute bottom-12 text-xs text-gray-500 text-center px-4">
        <p>Tip: Click objects to interact • Use mouse to look around</p>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
}

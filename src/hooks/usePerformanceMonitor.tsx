/**
 * Performance monitoring hook
 * Tracks FPS, memory usage, and render times
 */

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';

export interface PerformanceMetrics {
  fps: number;
  frameTime: number;
  memoryUsage?: number;
  drawCalls?: number;
}

export function usePerformanceMonitor(enabled = true) {
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    fps: 0,
    frameTime: 0,
  });

  const frameCount = useRef(0);
  const lastTime = useRef(performance.now());
  const frameTimes = useRef<number[]>([]);

  useFrame((state) => {
    if (!enabled) return;

    const currentTime = performance.now();
    const deltaTime = currentTime - lastTime.current;

    frameCount.current++;
    frameTimes.current.push(deltaTime);

    // Update metrics every second
    if (deltaTime >= 1000) {
      const fps = Math.round((frameCount.current * 1000) / deltaTime);
      const avgFrameTime =
        frameTimes.current.reduce((a, b) => a + b, 0) / frameTimes.current.length;

      setMetrics({
        fps,
        frameTime: Math.round(avgFrameTime * 100) / 100,
        memoryUsage: (performance as any).memory?.usedJSHeapSize,
        drawCalls: state.gl.info.render.calls,
      });

      frameCount.current = 0;
      lastTime.current = currentTime;
      frameTimes.current = [];
    }
  });

  return metrics;
}

/**
 * Display performance metrics overlay
 */
export function PerformanceOverlay({ enabled }: { enabled: boolean }) {
  const metrics = usePerformanceMonitor(enabled);

  if (!enabled) return null;

  const formatMemory = (bytes?: number) => {
    if (!bytes) return 'N/A';
    const mb = bytes / 1024 / 1024;
    return `${mb.toFixed(1)} MB`;
  };

  const getFpsColor = (fps: number) => {
    if (fps >= 55) return '#10B981';
    if (fps >= 30) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '12px',
        borderRadius: '8px',
        fontFamily: 'monospace',
        fontSize: '12px',
        zIndex: 1000,
        minWidth: '180px',
        backdropFilter: 'blur(10px)',
      }}
    >
      <div style={{ marginBottom: '8px', fontWeight: 'bold', fontSize: '14px' }}>
        Performance
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>FPS:</span>
        <span style={{ color: getFpsColor(metrics.fps), fontWeight: 'bold' }}>
          {metrics.fps}
        </span>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
        <span>Frame:</span>
        <span>{metrics.frameTime.toFixed(2)} ms</span>
      </div>
      
      {metrics.drawCalls !== undefined && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
          <span>Draw calls:</span>
          <span>{metrics.drawCalls}</span>
        </div>
      )}
      
      {metrics.memoryUsage && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span>Memory:</span>
          <span>{formatMemory(metrics.memoryUsage)}</span>
        </div>
      )}
    </div>
  );
}

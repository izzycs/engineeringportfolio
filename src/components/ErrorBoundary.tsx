import { Component } from 'react';
import type { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error boundary to catch and handle React component errors gracefully
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '20px',
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '40px',
              borderRadius: '20px',
              maxWidth: '500px',
              textAlign: 'center',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            }}
          >
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>⚠️</div>
            <h1 style={{ margin: '0 0 10px 0', fontSize: '24px' }}>
              Something went wrong
            </h1>
            <p style={{ margin: '0 0 20px 0', opacity: 0.9 }}>
              The 3D scene encountered an error. This might be due to WebGL compatibility issues or device limitations.
            </p>
            {this.state.error && (
              <details style={{ textAlign: 'left', marginBottom: '20px' }}>
                <summary style={{ cursor: 'pointer', marginBottom: '10px' }}>
                  Error details
                </summary>
                <pre
                  style={{
                    background: 'rgba(0, 0, 0, 0.3)',
                    padding: '15px',
                    borderRadius: '8px',
                    fontSize: '12px',
                    overflow: 'auto',
                    maxHeight: '200px',
                  }}
                >
                  {this.state.error.message}
                  {'\n\n'}
                  {this.state.error.stack}
                </pre>
              </details>
            )}
            <button
              onClick={() => window.location.reload()}
              style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '12px 30px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * WebGL context lost handler
 */
export function WebGLContextLossHandler() {
  const handleContextLost = (event: Event) => {
    event.preventDefault();
    console.error('WebGL context lost');
    
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      background: rgba(239, 68, 68, 0.95);
      color: white;
      padding: 15px 25px;
      border-radius: 8px;
      font-family: system-ui;
      z-index: 9999;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    `;
    notification.textContent = '⚠️ WebGL context lost. Attempting to recover...';
    document.body.appendChild(notification);

    setTimeout(() => {
      document.body.removeChild(notification);
    }, 5000);
  };

  const handleContextRestored = () => {
    // Intentional console.log - WebGL recovery is rare and important to track
    console.log('WebGL context restored');
    window.location.reload();
  };

  const canvas = document.querySelector('canvas');
  if (canvas) {
    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }
}

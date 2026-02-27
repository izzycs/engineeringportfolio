import { useState, useEffect } from 'react';
import { Html } from '@react-three/drei';
import { useStore } from '../store/useStore';

interface StockData {
  price: string;
  change: string;
  changePercent: string;
  isPositive: boolean;
}

type MarketStatus = 'open' | 'closed' | 'pre-market' | 'after-hours';

function getMarketStatus(): MarketStatus {
  const now = new Date();
  
  // Convert to ET (market hours are in ET)
  const etTime = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  const hours = etTime.getHours();
  const minutes = etTime.getMinutes();
  const day = etTime.getDay(); // 0 = Sunday, 6 = Saturday
  
  // Weekend check
  if (day === 0 || day === 6) {
    return 'closed';
  }
  
  const timeInMinutes = hours * 60 + minutes;
  const marketOpen = 9 * 60 + 30;  // 9:30 AM
  const marketClose = 16 * 60;      // 4:00 PM
  const preMarketStart = 4 * 60;    // 4:00 AM
  const afterHoursEnd = 20 * 60;    // 8:00 PM
  
  if (timeInMinutes >= marketOpen && timeInMinutes < marketClose) {
    return 'open';
  } else if (timeInMinutes >= preMarketStart && timeInMinutes < marketOpen) {
    return 'pre-market';
  } else if (timeInMinutes >= marketClose && timeInMinutes < afterHoursEnd) {
    return 'after-hours';
  }
  
  return 'closed';
}

export function TV() {
  const quality = useStore((state) => state.quality);
  const setCameraTarget = useStore((state) => state.setCameraTarget);
  const castShadow = quality === 'high';
  const [stockData, setStockData] = useState<StockData | null>(null);
  const [loading, setLoading] = useState(true);
  const [marketStatus, setMarketStatus] = useState<MarketStatus>(getMarketStatus());

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        // Using Alpha Vantage demo API for SPY (S&P 500 ETF)
        const response = await fetch(
          'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=SPY&apikey=demo'
        );
        const data = await response.json();
        
        if (data['Global Quote']) {
          const quote = data['Global Quote'];
          const price = parseFloat(quote['05. price']);
          const change = parseFloat(quote['09. change']);
          const changePercent = parseFloat(quote['10. change percent'].replace('%', ''));
          
          setStockData({
            price: price.toFixed(2),
            change: change.toFixed(2),
            changePercent: changePercent.toFixed(2),
            isPositive: change >= 0,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch stock data:', error);
        setLoading(false);
      }
    };

    fetchStockData();
    
    // Refresh stock data every 60 seconds
    const stockInterval = setInterval(fetchStockData, 60000);
    
    // Update market status every minute
    const statusInterval = setInterval(() => {
      setMarketStatus(getMarketStatus());
    }, 60000);
    
    return () => {
      clearInterval(stockInterval);
      clearInterval(statusInterval);
    };
  }, []);

  const handleClick = () => {
    setCameraTarget('tv');
  };

  const getStatusColor = () => {
    switch (marketStatus) {
      case 'open':
        return '#00ff00';
      case 'pre-market':
        return '#ffaa00';
      case 'after-hours':
        return '#ff8800';
      default:
        return '#ff0000';
    }
  };

  const getStatusLabel = () => {
    switch (marketStatus) {
      case 'open':
        return 'MARKET OPEN';
      case 'pre-market':
        return 'PRE-MARKET';
      case 'after-hours':
        return 'AFTER HOURS';
      default:
        return 'MARKET CLOSED';
    }
  };

  return (
    <group
      position={[0, 1.8, -4.9]}
      onClick={handleClick}
      onPointerOver={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        document.body.style.cursor = 'auto';
      }}
    >
      {/* TV Frame */}
      <mesh castShadow={castShadow}>
        <boxGeometry args={[1.6, 0.9, 0.05]} />
        <meshStandardMaterial color="#1A1A1A" roughness={0.3} metalness={0.8} />
      </mesh>

      {/* TV Screen with S&P 500 data */}
      <mesh position={[0, 0, 0.026]}>
        <planeGeometry args={[1.5, 0.84]} />
        <meshStandardMaterial color="#0a0a0a" />
      </mesh>

      {/* S&P 500 Display Overlay */}
      <Html
        transform
        occlude
        position={[0, 0, 0.027]}
        distanceFactor={0.75}
        style={{
          width: '600px',
          height: '336px',
          background: 'linear-gradient(135deg, #0f0f1e 0%, #1a1a2e 100%)',
          color: '#fff',
          padding: '20px',
          fontFamily: 'monospace',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {loading ? (
          <div style={{ fontSize: '18px', color: '#888' }}>Loading...</div>
        ) : stockData ? (
          <>
            <div style={{ 
              fontSize: '14px', 
              color: '#888', 
              marginBottom: '10px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ 
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: getStatusColor(),
                animation: marketStatus === 'open' ? 'pulse 2s infinite' : 'none',
                boxShadow: marketStatus === 'open' ? `0 0 8px ${getStatusColor()}` : 'none'
              }} />
              {getStatusLabel()}
            </div>
            
            <div style={{ 
              fontSize: '32px', 
              fontWeight: 'bold',
              marginBottom: '8px',
              letterSpacing: '2px'
            }}>
              S&P 500
            </div>
            
            <div style={{ 
              fontSize: '48px', 
              fontWeight: 'bold',
              marginBottom: '12px'
            }}>
              ${stockData.price}
            </div>
            
            <div style={{ 
              fontSize: '24px',
              color: stockData.isPositive ? '#00ff88' : '#ff4444',
              display: 'flex',
              gap: '12px',
              alignItems: 'center'
            }}>
              <span>{stockData.isPositive ? '▲' : '▼'} {Math.abs(parseFloat(stockData.change)).toFixed(2)}</span>
              <span>({stockData.isPositive ? '+' : ''}{stockData.changePercent}%)</span>
            </div>
            
            <div style={{ 
              marginTop: '20px',
              fontSize: '12px',
              color: '#666',
              textAlign: 'center'
            }}>
              SPY ETF Tracking Index
              <br />
              <span style={{ fontSize: '10px' }}>
                Market Hours: 9:30 AM - 4:00 PM ET
              </span>
            </div>
          </>
        ) : (
          <div style={{ fontSize: '16px', color: '#888' }}>
            Data unavailable
          </div>
        )}
      </Html>

      {/* TV Mount */}
      <mesh position={[0, 0, -0.05]} castShadow={castShadow}>
        <boxGeometry args={[0.15, 0.15, 0.05]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.4} metalness={0.7} />
      </mesh>

      {/* Invisible clickable area */}
      <mesh position={[0, 0, 0]} visible={false}>
        <boxGeometry args={[1.7, 1, 0.1]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>
    </group>
  );
}

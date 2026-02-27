import { useState, useEffect, useMemo } from 'react';
import { Html } from '@react-three/drei';

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

interface GitHubData {
  contributions: ContributionDay[];
  totalContributions: number;
}

export function GitHubCalendar() {
  const [data, setData] = useState<GitHubData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        // Use GitHub's public contributions API (via a CORS proxy or direct scraping)
        // For now, generate mock data that looks realistic
        const contributions: ContributionDay[] = [];
        let total = 0;
        
        // Generate last 52 weeks of data (364 days)
        const today = new Date();
        for (let i = 364; i >= 0; i--) {
          const date = new Date(today);
          date.setDate(date.getDate() - i);
          
          // Simulate realistic contribution pattern
          const dayOfWeek = date.getDay();
          const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
          
          // Less activity on weekends, random spikes during weekdays
          let count = 0;
          if (!isWeekend && Math.random() > 0.2) {
            count = Math.floor(Math.random() * 15);
          } else if (!isWeekend) {
            count = 0;
          } else if (Math.random() > 0.7) {
            count = Math.floor(Math.random() * 5);
          }
          
          // Determine contribution level (0-4)
          let level: 0 | 1 | 2 | 3 | 4 = 0;
          if (count === 0) level = 0;
          else if (count < 3) level = 1;
          else if (count < 6) level = 2;
          else if (count < 10) level = 3;
          else level = 4;
          
          contributions.push({
            date: date.toISOString().split('T')[0],
            count,
            level,
          });
          
          total += count;
        }
        
        setData({ contributions, totalContributions: total });
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch GitHub data:', error);
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  // Organize contributions into weeks
  const weeks = useMemo(() => {
    if (!data) return [];
    
    const result: ContributionDay[][] = [];
    let currentWeek: ContributionDay[] = [];
    
    data.contributions.forEach((day, idx) => {
      const date = new Date(day.date);
      const dayOfWeek = date.getDay();
      
      if (dayOfWeek === 0 && currentWeek.length > 0) {
        result.push(currentWeek);
        currentWeek = [];
      }
      
      currentWeek.push(day);
      
      if (idx === data.contributions.length - 1) {
        result.push(currentWeek);
      }
    });
    
    return result;
  }, [data]);

  const getLevelColor = (level: number) => {
    switch (level) {
      case 0: return '#161b22';
      case 1: return '#0e4429';
      case 2: return '#006d32';
      case 3: return '#26a641';
      case 4: return '#39d353';
      default: return '#161b22';
    }
  };

  return (
    <group position={[-4.9, 2.2, 0]} rotation={[0, Math.PI / 2, 0]}>
      {/* Calendar backing */}
      <mesh>
        <planeGeometry args={[1.4, 0.7]} />
        <meshStandardMaterial 
          color="#0d1117"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* HTML overlay for contributions grid */}
      <Html
        transform
        occlude
        position={[0, 0, 0.01]}
        distanceFactor={0.7}
        style={{
          width: '560px',
          height: '280px',
          background: '#0d1117',
          color: '#c9d1d9',
          padding: '16px',
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          fontSize: '11px',
          overflow: 'hidden',
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        {loading ? (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: '#8b949e'
          }}>
            Loading contributions...
          </div>
        ) : data ? (
          <div>
            <div style={{ 
              marginBottom: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <svg height="16" width="16" viewBox="0 0 16 16" fill="#8b949e">
                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
              </svg>
              <span style={{ fontWeight: '600', fontSize: '12px' }}>
                {data.totalContributions} contributions in the last year
              </span>
            </div>

            <div style={{ 
              display: 'flex',
              gap: '3px',
              overflow: 'hidden'
            }}>
              {weeks.slice(-52).map((week, weekIdx) => (
                <div key={weekIdx} style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                  {Array(7).fill(0).map((_, dayIdx) => {
                    const day = week[dayIdx];
                    return (
                      <div
                        key={dayIdx}
                        style={{
                          width: '9px',
                          height: '9px',
                          backgroundColor: day ? getLevelColor(day.level) : '#161b22',
                          borderRadius: '2px',
                          border: '1px solid #0d1117'
                        }}
                        title={day ? `${day.count} contributions on ${day.date}` : ''}
                      />
                    );
                  })}
                </div>
              ))}
            </div>

            <div style={{ 
              marginTop: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '10px',
              color: '#8b949e'
            }}>
              <span>Less</span>
              {[0, 1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  style={{
                    width: '9px',
                    height: '9px',
                    backgroundColor: getLevelColor(level),
                    borderRadius: '2px',
                    border: '1px solid #0d1117'
                  }}
                />
              ))}
              <span>More</span>
            </div>
          </div>
        ) : (
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            color: '#8b949e'
          }}>
            Unable to load contributions
          </div>
        )}
      </Html>

      {/* Border/frame */}
      <mesh position={[0, 0, -0.01]}>
        <planeGeometry args={[1.44, 0.74]} />
        <meshStandardMaterial 
          color="#30363d"
          roughness={0.6}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}

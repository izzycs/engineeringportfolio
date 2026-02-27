import { useState, useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { MatrixRainEffect } from './EnhancedScreens';

// Konami code detector
export function useKonamiCode(callback: () => void) {
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];
    let currentIndex = 0;

    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === konamiCode[currentIndex]) {
        currentIndex++;
        if (currentIndex === konamiCode.length) {
          callback();
          currentIndex = 0;
        }
      } else {
        currentIndex = 0;
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [callback]);
}

// Portal click counter
export function usePortalClicks(targetClicks: number, callback: () => void) {
  const [clicks, setClicks] = useState(0);

  useEffect(() => {
    if (clicks >= targetClicks) {
      callback();
      setClicks(0);
    }
  }, [clicks, targetClicks, callback]);

  return () => setClicks((prev) => prev + 1);
}

// Achievement system
interface Achievement {
  id: string;
  name: string;
  description: string;
  unlocked: boolean;
  icon: string;
}

const ACHIEVEMENTS: Achievement[] = [
  { id: 'konami', name: 'Old School', description: 'Entered the Konami code', unlocked: false, icon: '🎮' },
  { id: 'portal', name: 'Portal Master', description: 'Clicked portal 10 times', unlocked: false, icon: '🌀' },
  { id: 'matrix', name: 'Neo', description: 'Activated Matrix mode', unlocked: false, icon: '💚' },
  { id: 'rainbow', name: 'Unicorn Mode', description: 'Discovered RGB mode', unlocked: false, icon: '🌈' },
  { id: 'basketball', name: 'Kobe!', description: 'Made the basketball bounce 100 times', unlocked: false, icon: '🏀' },
  { id: 'coffee', name: 'Caffeine Addict', description: 'Clicked coffee 50 times', unlocked: false, icon: '☕' },
  { id: 'plant', name: 'Green Thumb', description: 'Watered the plant 20 times', unlocked: false, icon: '🌱' },
  { id: 'timemaster', name: 'Time Lord', description: 'Cycled through all times of day', unlocked: false, icon: '⏰' },
];

export function AchievementSystem() {
  const [achievements, setAchievements] = useState<Achievement[]>(ACHIEVEMENTS);
  const [newUnlock, setNewUnlock] = useState<Achievement | null>(null);

  const unlockAchievement = (id: string) => {
    setAchievements((prev) =>
      prev.map((ach) =>
        ach.id === id && !ach.unlocked
          ? { ...ach, unlocked: true }
          : ach
      )
    );

    const achievement = achievements.find((a) => a.id === id);
    if (achievement && !achievement.unlocked) {
      setNewUnlock(achievement);
      setTimeout(() => setNewUnlock(null), 3000);
    }
  };

  // Store unlock function in global context for easy access
  useEffect(() => {
    (window as any).unlockAchievement = unlockAchievement;
  }, []);

  return (
    <>
      {/* Achievement notification */}
      {newUnlock && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: 'rgba(16, 185, 129, 0.95)',
          color: 'white',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          zIndex: 2000,
          minWidth: '300px',
          animation: 'slideIn 0.3s ease-out',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}>
          <div style={{ fontSize: '48px', textAlign: 'center', marginBottom: '10px' }}>
            {newUnlock.icon}
          </div>
          <div style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '5px', textAlign: 'center' }}>
            Achievement Unlocked!
          </div>
          <div style={{ fontSize: '16px', marginBottom: '3px', textAlign: 'center' }}>
            {newUnlock.name}
          </div>
          <div style={{ fontSize: '12px', opacity: 0.9, textAlign: 'center' }}>
            {newUnlock.description}
          </div>
        </div>
      )}

      {/* Achievement list toggle */}
      <AchievementList achievements={achievements} />
    </>
  );
}

function AchievementList({ achievements }: { achievements: Achievement[] }) {
  const [showList, setShowList] = useState(false);
  const unlockedCount = achievements.filter((a) => a.unlocked).length;

  return (
    <div style={{
      position: 'fixed',
      bottom: '80px',
      left: '20px',
      zIndex: 1000,
    }}>
      <button
        onClick={() => setShowList(!showList)}
        style={{
          background: 'rgba(0, 0, 0, 0.7)',
          border: 'none',
          borderRadius: '50%',
          width: '50px',
          height: '50px',
          color: 'white',
          fontSize: '24px',
          cursor: 'pointer',
          backdropFilter: 'blur(10px)',
          position: 'relative',
        }}
        title="Achievements"
      >
        🏆
        <span style={{
          position: 'absolute',
          top: '-5px',
          right: '-5px',
          background: '#10B981',
          borderRadius: '50%',
          width: '20px',
          height: '20px',
          fontSize: '12px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {unlockedCount}
        </span>
      </button>

      {showList && (
        <div style={{
          position: 'absolute',
          bottom: '60px',
          left: '0',
          background: 'rgba(0, 0, 0, 0.95)',
          padding: '20px',
          borderRadius: '12px',
          backdropFilter: 'blur(10px)',
          minWidth: '350px',
          maxHeight: '500px',
          overflowY: 'auto',
        }}>
          <h3 style={{ color: 'white', marginTop: 0, marginBottom: '15px' }}>
            Achievements ({unlockedCount}/{achievements.length})
          </h3>
          
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              style={{
                background: achievement.unlocked
                  ? 'rgba(16, 185, 129, 0.2)'
                  : 'rgba(255, 255, 255, 0.05)',
                padding: '12px',
                marginBottom: '10px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                opacity: achievement.unlocked ? 1 : 0.6,
              }}
            >
              <div style={{ fontSize: '32px' }}>
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: '3px',
                }}>
                  {achievement.name}
                </div>
                <div style={{
                  color: '#94A3B8',
                  fontSize: '12px',
                }}>
                  {achievement.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Matrix rain mode (triggered by backtick key)
export function MatrixMode() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '`') {
        setEnabled((prev) => {
          const newState = !prev;
          if (newState && (window as any).unlockAchievement) {
            (window as any).unlockAchievement('matrix');
          }
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return <MatrixRainEffect enabled={enabled} />;
}

// RGB mode (all objects glow rainbow)
export function RGBMode() {
  const [enabled, setEnabled] = useState(false);
  const hueRef = useRef(0);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'R') {
        setEnabled((prev) => {
          const newState = !prev;
          if (newState && (window as any).unlockAchievement) {
            (window as any).unlockAchievement('rainbow');
          }
          return newState;
        });
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  useFrame(() => {
    if (enabled) {
      hueRef.current = (hueRef.current + 1) % 360;
    }
  });

  if (!enabled) return null;

  return (
    <group>
      {/* Rainbow ambient light */}
      <ambientLight color={`hsl(${hueRef.current}, 100%, 50%)`} intensity={0.3} />
      
      {/* Rainbow fog effect */}
      <fog attach="fog" args={[`hsl(${hueRef.current}, 100%, 50%)`, 8, 18]} />
    </group>
  );
}

// Developer console (triggered by ` key long press)
export function DeveloperConsole() {
  const [visible, setVisible] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    '> Welcome to the Developer Console',
    '> Type "help" for commands',
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    let pressTimer: ReturnType<typeof setTimeout>;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '~') {
        pressTimer = setTimeout(() => {
          setVisible((prev) => !prev);
        }, 500);
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === '~') {
        clearTimeout(pressTimer);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearTimeout(pressTimer);
    };
  }, []);

  const handleCommand = (cmd: string) => {
    const commands: Record<string, () => void> = {
      help: () => {
        setLogs((prev) => [
          ...prev,
          '> Available commands:',
          '  help - Show this message',
          '  clear - Clear console',
          '  konami - Trigger Konami effect',
          '  matrix - Toggle Matrix mode',
          '  rgb - Toggle RGB mode',
          '  unlock [achievement_id] - Unlock achievement',
        ]);
      },
      clear: () => setLogs([]),
      konami: () => {
        setLogs((prev) => [...prev, '> Konami code activated!']);
        if ((window as any).unlockAchievement) {
          (window as any).unlockAchievement('konami');
        }
      },
      matrix: () => {
        setLogs((prev) => [...prev, '> Matrix mode toggled']);
      },
      rgb: () => {
        setLogs((prev) => [...prev, '> RGB mode toggled']);
      },
    };

    if (cmd.startsWith('unlock ')) {
      const achievementId = cmd.split(' ')[1];
      if ((window as any).unlockAchievement) {
        (window as any).unlockAchievement(achievementId);
        setLogs((prev) => [...prev, `> Unlocked achievement: ${achievementId}`]);
      }
    } else if (commands[cmd]) {
      commands[cmd]();
    } else {
      setLogs((prev) => [...prev, `> Unknown command: ${cmd}`]);
    }
  };

  if (!visible) return null;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      background: 'rgba(0, 0, 0, 0.95)',
      color: '#00FF00',
      padding: '20px',
      borderRadius: '8px',
      backdropFilter: 'blur(10px)',
      width: '600px',
      maxHeight: '400px',
      fontFamily: 'monospace',
      fontSize: '14px',
      zIndex: 3000,
      border: '2px solid #00FF00',
    }}>
      <div style={{ marginBottom: '10px', fontWeight: 'bold' }}>
        DEVELOPER CONSOLE
      </div>
      
      <div style={{
        height: '300px',
        overflowY: 'auto',
        marginBottom: '10px',
        background: 'rgba(0, 0, 0, 0.5)',
        padding: '10px',
        borderRadius: '4px',
      }}>
        {logs.map((log, i) => (
          <div key={i}>{log}</div>
        ))}
      </div>
      
      <div style={{ display: 'flex', gap: '10px' }}>
        <span>{'>'}</span>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              setLogs((prev) => [...prev, `> ${input}`]);
              handleCommand(input);
              setInput('');
            }
          }}
          style={{
            flex: 1,
            background: 'transparent',
            border: 'none',
            color: '#00FF00',
            outline: 'none',
            fontFamily: 'monospace',
            fontSize: '14px',
          }}
          autoFocus
        />
      </div>
      
      <div style={{ marginTop: '10px', fontSize: '12px', opacity: 0.7 }}>
        Press ~ (hold) to close
      </div>
    </div>
  );
}

// Main easter eggs component
export function AdvancedEasterEggs() {
  useKonamiCode(() => {
    console.log('Konami code activated!');
    if ((window as any).unlockAchievement) {
      (window as any).unlockAchievement('konami');
    }
  });

  return (
    <>
      <AchievementSystem />
      <MatrixMode />
      <RGBMode />
      <DeveloperConsole />
    </>
  );
}

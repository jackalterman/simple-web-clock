import React, { useState, useEffect } from 'react';
import { useTime } from './hooks/useTime';
import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';
import BinaryClock from './components/BinaryClock';
import ProgressClock from './components/ProgressClock';
import NeonClock from './components/NeonClock';
import WordClock from './components/WordClock';
import BarClock from './components/BarClock';
import ClockControls from './components/ClockControls';
import WorldClockSidebar from './components/WorldClockSidebar';
import type { Theme, ClockType, ClockSettings, WorldZone } from './types';

const DEFAULT_SETTINGS: ClockSettings = {
  is24Hour: false,
  showSeconds: true,
  showDate: true,
  accentColor: 'orange',
  zoom: 1,
  worldClocks: [
     { label: 'UTC', timezone: 'UTC' }
  ]
};

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
  const [activeClock, setActiveClock] = useState<ClockType>('analog');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Initialize from local storage or defaults
  const [settings, setSettings] = useState<ClockSettings>(() => {
    try {
        const saved = localStorage.getItem('clockSettings');
        return saved ? JSON.parse(saved) : DEFAULT_SETTINGS;
    } catch (e) {
        return DEFAULT_SETTINGS;
    }
  });

  // Persistence effect
  useEffect(() => {
    localStorage.setItem('clockSettings', JSON.stringify(settings));
  }, [settings]);

  const time = useTime();

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const handleAddClock = (zone: WorldZone) => {
      setSettings(prev => ({
          ...prev,
          worldClocks: [...prev.worldClocks, zone]
      }));
  };

  const handleRemoveClock = (timezone: string) => {
      setSettings(prev => ({
          ...prev,
          worldClocks: prev.worldClocks.filter(c => c.timezone !== timezone)
      }));
  };

  const renderClock = () => {
    const props = { time, settings };
    switch (activeClock) {
      case 'analog': return <AnalogClock {...props} />;
      case 'digital': return <DigitalClock {...props} />;
      case 'binary': return <BinaryClock {...props} />;
      case 'progress': return <ProgressClock {...props} />;
      case 'neon': return <NeonClock {...props} />;
      case 'word': return <WordClock {...props} />;
      case 'bar': return <BarClock {...props} />;
      default: return <AnalogClock {...props} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center font-sans overflow-hidden relative transition-colors duration-700">
      
      <style>{`
        @keyframes subtle-drift {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animated-bg {
          background-size: 300% 300%;
          animation: subtle-drift 20s ease infinite;
        }
      `}</style>

      {/* Animated Background Layer */}
      <div className="absolute inset-0 -z-10 animated-bg bg-gradient-to-br from-gray-100 via-gray-200 to-slate-300 dark:from-black dark:via-gray-900 dark:to-[#0f172a] transition-colors duration-700" />
      
      <main className="flex-grow flex items-center justify-center w-full p-4 pb-32 z-10">
        <div 
            className="transform transition-transform duration-300 ease-out origin-center will-change-transform"
            style={{ transform: `scale(${settings.zoom})` }}
        >
           {renderClock()}
        </div>
      </main>

      <ClockControls 
        activeClock={activeClock} 
        setActiveClock={setActiveClock}
        settings={settings}
        setSettings={setSettings}
        theme={theme}
        toggleTheme={toggleTheme}
        toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
      />

      <WorldClockSidebar 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        time={time}
        settings={settings}
        onAddClock={handleAddClock}
        onRemoveClock={handleRemoveClock}
      />
    </div>
  );
};

export default App;
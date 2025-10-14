import React, { useState, useEffect } from 'react';
import { useTime } from './hooks/useTime';
import AnalogClock from './components/AnalogClock';
import DigitalClock from './components/DigitalClock';
import ThemeToggle from './components/ThemeToggle';
import type { Theme } from './types';

const App: React.FC = () => {
  const [theme, setTheme] = useState<Theme>('dark');
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

  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  return (
    <div className="bg-gray-100 dark:bg-black transition-colors duration-700 min-h-screen flex flex-col items-center justify-center text-center font-sans p-4">
      <main className="flex flex-col items-center justify-center space-y-12">
        <AnalogClock hours={hours} minutes={minutes} seconds={seconds} />
        <DigitalClock time={time} />
      </main>
      
      <footer className="absolute bottom-8">
         <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
      </footer>
    </div>
  );
};

export default App;

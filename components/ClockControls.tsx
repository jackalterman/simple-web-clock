import React, { useState } from 'react';
import { ClockType, ClockSettings, Theme, AccentColor } from '../types';

interface Props {
  activeClock: ClockType;
  setActiveClock: (t: ClockType) => void;
  settings: ClockSettings;
  setSettings: React.Dispatch<React.SetStateAction<ClockSettings>>;
  theme: Theme;
  toggleTheme: () => void;
  toggleSidebar: () => void;
}

const ClockControls: React.FC<Props> = ({ 
    activeClock, setActiveClock, settings, setSettings, theme, toggleTheme, toggleSidebar 
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const clocks: ClockType[] = ['analog', 'digital', 'binary', 'progress', 'neon', 'word', 'bar'];
  const colors: AccentColor[] = ['orange', 'blue', 'green', 'purple', 'red'];

  const updateSetting = <K extends keyof ClockSettings>(key: K, value: ClockSettings[K]) => {
      setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`fixed bottom-0 left-0 right-0 bg-white/90 dark:bg-black/90 backdrop-blur-md border-t border-gray-200 dark:border-gray-800 transition-transform duration-500 z-50 ${isOpen ? 'translate-y-0' : 'translate-y-[calc(100%-4rem)]'}`}>
        
        {/* Toggle Handle */}
        <button 
            onClick={() => setIsOpen(!isOpen)}
            className="absolute -top-10 left-1/2 -translate-x-1/2 bg-white dark:bg-black border border-b-0 border-gray-200 dark:border-gray-800 px-6 py-2 rounded-t-xl font-bold text-gray-600 dark:text-gray-300 hover:text-orange-500 transition-colors"
        >
            {isOpen ? 'Hide Controls' : 'Settings & Clocks'}
        </button>

        <div className="max-w-6xl mx-auto p-6 pb-8 flex flex-col gap-8">
            
            {/* Clock Selector */}
            <div className="flex flex-wrap justify-center gap-2">
                {clocks.map(c => (
                    <button
                        key={c}
                        onClick={() => setActiveClock(c)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold capitalize transition-all ${
                            activeClock === c 
                            ? 'bg-black dark:bg-white text-white dark:text-black' 
                            : 'bg-gray-100 dark:bg-gray-800 text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700'
                        }`}
                    >
                        {c}
                    </button>
                ))}
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Feature 1: Display Settings */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400">Display</h3>
                    <div className="flex flex-wrap gap-3">
                        <button 
                            onClick={() => updateSetting('is24Hour', !settings.is24Hour)}
                            className={`px-3 py-1 rounded border text-sm ${settings.is24Hour ? 'border-orange-500 text-orange-500' : 'border-gray-300 dark:border-gray-700 text-gray-500'}`}
                        >
                            {settings.is24Hour ? '24H' : '12H'}
                        </button>
                        <button 
                            onClick={() => updateSetting('showSeconds', !settings.showSeconds)}
                            className={`px-3 py-1 rounded border text-sm ${settings.showSeconds ? 'border-orange-500 text-orange-500' : 'border-gray-300 dark:border-gray-700 text-gray-500'}`}
                        >
                            Sec {settings.showSeconds ? 'ON' : 'OFF'}
                        </button>
                        <button 
                            onClick={() => updateSetting('showDate', !settings.showDate)}
                            className={`px-3 py-1 rounded border text-sm ${settings.showDate ? 'border-orange-500 text-orange-500' : 'border-gray-300 dark:border-gray-700 text-gray-500'}`}
                        >
                            Date {settings.showDate ? 'ON' : 'OFF'}
                        </button>
                    </div>
                </div>

                {/* Feature 2: Zoom/Size */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400">Size</h3>
                    <div className="flex items-center gap-4">
                        <input 
                            type="range" 
                            min="0.5" 
                            max="3" 
                            step="0.1"
                            value={settings.zoom} 
                            onChange={(e) => updateSetting('zoom', parseFloat(e.target.value))}
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <span className="font-mono text-sm w-12 text-right text-gray-600 dark:text-gray-300">
                            {Math.round(settings.zoom * 100)}%
                        </span>
                    </div>
                </div>

                {/* Feature 3: Color & Theme */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400">Appearance</h3>
                    <div className="flex gap-2 items-center">
                        <button onClick={toggleTheme} className="p-2 bg-gray-200 dark:bg-gray-800 rounded-full mr-2 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors" title="Toggle Light/Dark">
                            {theme === 'light' ? '🌙' : '☀️'}
                        </button>
                        {colors.map(col => (
                            <button
                                key={col}
                                onClick={() => updateSetting('accentColor', col)}
                                className={`w-6 h-6 rounded-full ring-2 ring-offset-2 ring-offset-white dark:ring-offset-black transition-all ${
                                    settings.accentColor === col ? 'ring-gray-400 scale-110' : 'ring-transparent opacity-70 hover:opacity-100'
                                }`}
                                style={{ backgroundColor: col }}
                            />
                        ))}
                    </div>
                </div>

                {/* Feature 4: World Clocks (Previously Time Travel) */}
                <div className="space-y-3">
                    <h3 className="text-xs uppercase tracking-widest text-gray-400">World Clock</h3>
                    <button 
                        onClick={toggleSidebar}
                        className="w-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-black dark:text-white font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                    >
                        <span>🌍</span> Manage Zones
                    </button>
                </div>
            </div>
        </div>
    </div>
  );
};

export default ClockControls;
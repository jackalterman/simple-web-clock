import React, { useState } from 'react';
import { ClockSettings, WorldZone } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  time: Date;
  settings: ClockSettings;
  onAddClock: (zone: WorldZone) => void;
  onRemoveClock: (timezone: string) => void;
}

const AVAILABLE_ZONES: WorldZone[] = [
  { label: 'Los Angeles (PT)', timezone: 'America/Los_Angeles' },
  { label: 'New York (ET)', timezone: 'America/New_York' },
  { label: 'London (GMT)', timezone: 'Europe/London' },
  { label: 'Paris (CET)', timezone: 'Europe/Paris' },
  { label: 'Moscow (MSK)', timezone: 'Europe/Moscow' },
  { label: 'Dubai (GST)', timezone: 'Asia/Dubai' },
  { label: 'Mumbai (IST)', timezone: 'Asia/Kolkata' },
  { label: 'Singapore (SGT)', timezone: 'Asia/Singapore' },
  { label: 'Tokyo (JST)', timezone: 'Asia/Tokyo' },
  { label: 'Sydney (AEDT)', timezone: 'Australia/Sydney' },
  { label: 'UTC', timezone: 'UTC' },
];

const MiniClock = ({ time, zone, settings }: { time: Date; zone: WorldZone; settings: ClockSettings }) => {
  const timeString = time.toLocaleTimeString('en-US', {
    timeZone: zone.timezone,
    hour12: !settings.is24Hour,
    hour: 'numeric',
    minute: '2-digit',
    second: settings.showSeconds ? '2-digit' : undefined,
  });

  const dateString = time.toLocaleDateString('en-US', {
    timeZone: zone.timezone,
    weekday: 'short',
    month: 'short',
    day: 'numeric'
  });

  const colorMap: Record<string, string> = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 flex flex-col items-start relative group">
       <span className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">{zone.label}</span>
       <div className="text-2xl font-mono font-bold text-black dark:text-white">
           {timeString}
       </div>
       <div className={`text-xs font-mono mt-1 ${colorMap[settings.accentColor]}`}>
           {dateString}
       </div>
    </div>
  );
};

const WorldClockSidebar: React.FC<Props> = ({ isOpen, onClose, time, settings, onAddClock, onRemoveClock }) => {
  const [selectedZone, setSelectedZone] = useState<string>(AVAILABLE_ZONES[0].timezone);

  const handleAdd = () => {
    const zone = AVAILABLE_ZONES.find(z => z.timezone === selectedZone);
    if (zone) {
        // Prevent duplicates
        if (!settings.worldClocks.find(c => c.timezone === zone.timezone)) {
            onAddClock(zone);
        }
    }
  };

  return (
    <div className={`fixed top-0 right-0 h-full w-80 bg-white/95 dark:bg-black/95 backdrop-blur-xl shadow-2xl z-[60] transform transition-transform duration-300 ease-in-out border-l border-gray-200 dark:border-gray-800 flex flex-col ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <h2 className="text-xl font-bold text-black dark:text-white">World Clock</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-200 dark:hover:bg-gray-800 rounded-full text-gray-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>

        {/* Scrollable List */}
        <div className="flex-grow overflow-y-auto p-6 space-y-4">
            {settings.worldClocks.length === 0 ? (
                <div className="text-center text-gray-400 py-10 italic">
                    No world clocks added.
                </div>
            ) : (
                settings.worldClocks.map((clock) => (
                    <div key={clock.timezone} className="relative group">
                        <MiniClock time={time} zone={clock} settings={settings} />
                        <button 
                            onClick={() => onRemoveClock(clock.timezone)}
                            className="absolute top-2 right-2 p-1.5 bg-red-100 dark:bg-red-900/30 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                            title="Remove clock"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                ))
            )}
        </div>

        {/* Add Clock Section */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
            <div className="flex gap-2">
                <select 
                    value={selectedZone} 
                    onChange={(e) => setSelectedZone(e.target.value)}
                    className="flex-grow bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-black dark:text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                    {AVAILABLE_ZONES.map(z => (
                        <option key={z.timezone} value={z.timezone}>{z.label}</option>
                    ))}
                </select>
                <button 
                    onClick={handleAdd}
                    className="bg-black dark:bg-white text-white dark:text-black px-4 py-2 rounded-lg font-bold text-sm hover:opacity-80 transition-opacity"
                >
                    Add
                </button>
            </div>
        </div>
    </div>
  );
};

export default WorldClockSidebar;
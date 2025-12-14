import React from 'react';
import { ClockProps } from '../types';

const NeonClock: React.FC<ClockProps> = ({ time, settings }) => {
  let hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  if (!settings.is24Hour) {
      hours = hours % 12 || 12;
  }

  const pad = (n: number) => n.toString().padStart(2, '0');

  const colorMap: Record<string, string> = {
    orange: 'text-orange-500 shadow-orange-500',
    blue: 'text-cyan-400 shadow-cyan-400',
    green: 'text-green-400 shadow-green-400',
    purple: 'text-fuchsia-500 shadow-fuchsia-500',
    red: 'text-red-500 shadow-red-500',
  };
  
  const activeClass = colorMap[settings.accentColor];

  // Inline style for the intense glow effect
  const glowStyle = {
    textShadow: '0 0 10px currentColor, 0 0 20px currentColor, 0 0 40px currentColor'
  };

  return (
    <div className="p-10 bg-gray-900 rounded-xl border-4 border-gray-800 shadow-2xl bg-opacity-90 backdrop-blur-sm">
        <div className={`font-mono flex items-end gap-4 ${activeClass}`} style={glowStyle}>
            <div className="text-[clamp(4rem,12vw,8rem)] leading-none">
                {pad(hours)}:{pad(minutes)}
            </div>
            {settings.showSeconds && (
                <div className="text-[clamp(2rem,6vw,4rem)] mb-2 opacity-80">
                    :{pad(seconds)}
                </div>
            )}
        </div>
        
        <div className="flex justify-between mt-4 px-2">
             {!settings.is24Hour && (
                 <div className={`text-2xl font-bold ${activeClass}`} style={{ textShadow: '0 0 10px currentColor' }}>
                     {ampm}
                 </div>
             )}
             {settings.showDate && (
                <div className={`text-xl tracking-widest ${activeClass} ml-auto`} style={{ textShadow: '0 0 5px currentColor' }}>
                    {time.toLocaleDateString().toUpperCase()}
                </div>
             )}
        </div>
    </div>
  );
};

export default NeonClock;

import React from 'react';
import { ClockProps } from '../types';

const BarClock: React.FC<ClockProps> = ({ time, settings }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const ms = time.getMilliseconds();

  const hMax = settings.is24Hour ? 24 : 12;
  const hVal = settings.is24Hour ? hours : (hours % 12 || 12);

  const hPct = (hVal / hMax) * 100;
  const mPct = (minutes / 60) * 100;
  // Smooth seconds
  const sPct = ((seconds + ms/1000) / 60) * 100;

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };
  const activeColor = colorMap[settings.accentColor];

  const Bar = ({ label, pct, val }: { label: string, pct: number, val: string | number }) => (
      <div className="flex flex-col items-center h-64 sm:h-80 w-16 sm:w-24 bg-gray-200 dark:bg-gray-800 rounded-2xl overflow-hidden relative shadow-inner">
          <div 
            className={`absolute bottom-0 w-full transition-all duration-200 ease-out ${activeColor}`}
            style={{ height: `${pct}%` }} 
          />
          <div className="absolute bottom-4 w-full text-center font-mono text-xl font-bold text-black dark:text-white mix-blend-difference z-10">
              {val}
          </div>
          <div className="absolute top-4 w-full text-center font-sans text-xs uppercase tracking-wider text-gray-500 dark:text-gray-400 z-10">
              {label}
          </div>
      </div>
  );

  return (
    <div className="flex gap-4 sm:gap-8 items-end">
        <Bar label="Hour" pct={hPct} val={hVal} />
        <Bar label="Min" pct={mPct} val={minutes.toString().padStart(2,'0')} />
        {settings.showSeconds && <Bar label="Sec" pct={sPct} val={seconds.toString().padStart(2,'0')} />}
    </div>
  );
};

export default BarClock;

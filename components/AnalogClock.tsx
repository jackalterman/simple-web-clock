import React from 'react';
import { ClockProps } from '../types';

const Hand = ({ rotation, className, length, style }: { rotation: number; className: string; length: string; style?: React.CSSProperties }) => (
    <div
        style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            height: length,
            ...style
        }}
        className={`absolute bottom-1/2 left-1/2 origin-bottom rounded-full z-10 ${className}`}
    />
);

const AnalogClock: React.FC<ClockProps> = ({ time, settings }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursRotation = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  const smoothTransition = 'transition-transform duration-500 ease-in-out';
  const secondHandTransition = seconds === 0 
    ? 'transition-none' 
    : 'transition-transform duration-1000 ease-linear';

  // Map accent colors to hex or classes
  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    purple: 'bg-purple-500',
    red: 'bg-red-500',
  };

  const borderColorMap: Record<string, string> = {
    orange: 'border-orange-500',
    blue: 'border-blue-500',
    green: 'border-green-500',
    purple: 'border-purple-500',
    red: 'border-red-500',
  };

  const activeColor = colorMap[settings.accentColor];
  const activeBorder = borderColorMap[settings.accentColor];

  return (
    <div className="w-[60vmin] h-[60vmin] bg-gray-200 dark:bg-[#1f1f1f] rounded-full relative shadow-2xl flex items-center justify-center">
      <div className="w-[95%] h-[95%] bg-gray-50 dark:bg-black rounded-full border-4 border-gray-300 dark:border-gray-700 relative">
        {/* Markers */}
        {Array.from({ length: 12 }).map((_, i) => (
            <div
                key={i}
                className="absolute w-full h-full"
                style={{ transform: `rotate(${i * 30}deg)` }}
            >
                <div className={`absolute top-2 left-1/2 -translate-x-1/2 h-5 ${ i % 3 === 0 ? 'w-1.5 bg-black dark:bg-white' : 'w-1 bg-gray-500 dark:bg-gray-400'}`} />
            </div>
        ))}

        {/* Center dot */}
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black dark:bg-white rounded-full z-20 border-2 ${activeBorder}`} />

        {/* Hands */}
        <Hand rotation={hoursRotation} length="25%" className={`w-2 bg-black dark:bg-white ${smoothTransition}`} />
        <Hand rotation={minutesRotation} length="35%" className={`w-1.5 bg-black dark:bg-white ${smoothTransition}`} />
        
        {settings.showSeconds && (
          <Hand rotation={secondsRotation} length="40%" className={`w-1 ${activeColor} ${secondHandTransition}`} />
        )}
        
        {/* Date Window (Analog Feature) */}
        {settings.showDate && (
            <div className="absolute right-[25%] top-1/2 -translate-y-1/2 bg-gray-200 dark:bg-gray-800 px-1.5 py-0.5 rounded text-xs font-mono border border-gray-300 dark:border-gray-700 text-black dark:text-white">
                {time.getDate()}
            </div>
        )}
      </div>
    </div>
  );
};

export default AnalogClock;

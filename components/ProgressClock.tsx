import React from 'react';
import { ClockProps } from '../types';

const ProgressRing = ({ radius, stroke, progress, colorClass }: { radius: number; stroke: number; progress: number; colorClass: string }) => {
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
      <svg
        height={radius * 2}
        width={radius * 2}
        className="transform -rotate-90 transition-all duration-1000 ease-linear"
      >
        <circle
          stroke="currentColor"
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={circumference + ' ' + circumference}
          style={{ strokeDashoffset }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          className={`${colorClass} opacity-80`}
        />
        <circle
            stroke="currentColor"
            fill="transparent"
            strokeWidth={stroke}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
            className="text-gray-200 dark:text-gray-800 opacity-30"
        />
      </svg>
    </div>
  );
};

const ProgressClock: React.FC<ClockProps> = ({ time, settings }) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();
  const milliseconds = time.getMilliseconds();

  // Calculate percentages
  // For hours, we usually want 12h cycle for visual ring, or 24h.
  const hourMax = settings.is24Hour ? 24 : 12;
  const currentHour = settings.is24Hour ? hours : (hours % 12 || 12);
  
  // Add fractional progress for smoother feel
  const hourProgress = ((currentHour + minutes/60) / hourMax) * 100;
  const minuteProgress = ((minutes + seconds/60) / 60) * 100;
  
  // Smooth second progress including ms
  const secondProgress = ((seconds + milliseconds/1000) / 60) * 100;

  const colorMap: Record<string, string> = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
  };
  const activeColor = colorMap[settings.accentColor];

  return (
    <div className="relative w-[60vmin] h-[60vmin] flex items-center justify-center">
       {/* Hours Ring (Outer) */}
       <ProgressRing radius={140} stroke={12} progress={hourProgress} colorClass={activeColor} />
       
       {/* Minutes Ring (Middle) */}
       <ProgressRing radius={100} stroke={12} progress={minuteProgress} colorClass={activeColor} />

       {/* Seconds Ring (Inner) - Optional */}
       {settings.showSeconds && (
         <ProgressRing radius={60} stroke={8} progress={secondProgress} colorClass={activeColor} />
       )}

       {/* Digital Center */}
       <div className="flex flex-col items-center z-10">
         <span className="text-3xl font-bold text-black dark:text-white font-mono">
            {settings.is24Hour ? 
                `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}` : 
                `${(hours % 12 || 12)}:${minutes.toString().padStart(2, '0')}`
            }
         </span>
         {settings.showDate && (
             <span className="text-xs font-mono text-gray-500 mt-1">
                 {time.toLocaleDateString()}
             </span>
         )}
       </div>
    </div>
  );
};

export default ProgressClock;

import React from 'react';
import { ClockProps } from '../types';

const DigitalClock: React.FC<ClockProps> = ({ time, settings }) => {
  const formatTime = (date: Date): { main: string; sub?: string } => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    
    let ampm = '';

    if (!settings.is24Hour) {
        ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
    }
    
    const strHours = settings.is24Hour && hours < 10 ? '0' + hours : hours.toString();
    const strMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const strSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    let timeStr = `${strHours}:${strMinutes}`;
    if (settings.showSeconds) {
        timeStr += `:${strSeconds}`;
    }

    return { main: timeStr, sub: ampm };
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  const { main, sub } = formatTime(time);

  const colorMap: Record<string, string> = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
  };
  
  const activeColor = colorMap[settings.accentColor];

  return (
    <div className="text-black dark:text-white transition-colors duration-700 font-mono flex flex-col items-center">
      <div className="flex items-baseline gap-4">
        <h1 className="text-[clamp(3rem,15vw,10rem)] font-bold tracking-tighter leading-none tabular-nums">
            {main}
        </h1>
        {sub && <span className={`text-[clamp(1rem,4vw,3rem)] font-bold ${activeColor}`}>{sub}</span>}
      </div>
      
      {settings.showDate && (
        <div className={`mt-4 text-[clamp(1rem,3vw,2rem)] font-light tracking-[0.2em] uppercase ${activeColor}`}>
            {formatDate(time)}
        </div>
      )}
    </div>
  );
};

export default DigitalClock;

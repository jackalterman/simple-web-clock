import React from 'react';
import { ClockProps } from '../types';

const BinaryClock: React.FC<ClockProps> = ({ time, settings }) => {
  // Binary Coded Decimal (BCD) Logic
  // H1 H2 : M1 M2 : S1 S2
  // Columns represent the tens and units of hours, minutes, seconds
  
  let hours = time.getHours();
  if (!settings.is24Hour) {
    hours = hours % 12 || 12;
  }
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const timeDigits = [
    Math.floor(hours / 10), hours % 10,
    Math.floor(minutes / 10), minutes % 10,
    ...(settings.showSeconds ? [Math.floor(seconds / 10), seconds % 10] : [])
  ];

  // Weights for rows: 8, 4, 2, 1
  const rows = [8, 4, 2, 1];

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500 shadow-orange-500/50',
    blue: 'bg-blue-500 shadow-blue-500/50',
    green: 'bg-green-500 shadow-green-500/50',
    purple: 'bg-purple-500 shadow-purple-500/50',
    red: 'bg-red-500 shadow-red-500/50',
  };

  const activeClass = colorMap[settings.accentColor];
  const inactiveClass = "bg-gray-300 dark:bg-gray-800";

  return (
    <div className="flex flex-col items-center gap-8">
        <div className="flex gap-4 sm:gap-8 p-8 bg-gray-100 dark:bg-gray-900 rounded-3xl shadow-inner">
        {timeDigits.map((digit, colIndex) => (
            <div key={colIndex} className="flex flex-col gap-3 sm:gap-4">
            {rows.map((weight, rowIndex) => {
                const isOn = (digit & weight) !== 0;
                return (
                <div
                    key={rowIndex}
                    className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full transition-all duration-300 ${
                        isOn ? `${activeClass} shadow-lg scale-110` : inactiveClass
                    }`}
                />
                );
            })}
            <div className="text-center text-gray-500 dark:text-gray-400 font-mono text-xs sm:text-sm mt-2">
                {digit} 
            </div>
            </div>
        ))}
        </div>
        {settings.showDate && (
            <div className="text-gray-500 dark:text-gray-400 font-mono tracking-widest">
                {time.toLocaleDateString()}
            </div>
        )}
    </div>
  );
};

export default BinaryClock;
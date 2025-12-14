import React from 'react';
import { ClockProps } from '../types';

const WordClock: React.FC<ClockProps> = ({ time, settings }) => {
  // Approximate Word Clock Logic (5-minute intervals)
  const hour = time.getHours();
  const minute = time.getMinutes();
  
  // Calculate logical time for "To" and "Past"
  // e.g., 10:50 is "Ten Minutes To Eleven"
  const isTo = minute > 32;
  const displayHour = isTo ? (hour + 1) % 24 : hour;
  const displayMinute = isTo ? 60 - minute : minute;
  
  // Convert hour to 12h format for words
  const h12 = displayHour % 12 || 12;

  const words = [
    { text: "IT", active: true },
    { text: "IS", active: true },
    { text: "HALF", active: (displayMinute >= 28 && displayMinute <= 32) },
    { text: "TEN", active: (displayMinute >= 8 && displayMinute <= 12) || (displayMinute >= 48 && displayMinute <= 52) },
    { text: "QUARTER", active: (displayMinute >= 13 && displayMinute <= 17) || (displayMinute >= 43 && displayMinute <= 47) },
    { text: "TWENTY", active: (displayMinute >= 18 && displayMinute <= 27) || (displayMinute >= 33 && displayMinute <= 42) },
    { text: "FIVE", active: (displayMinute >= 3 && displayMinute <= 7) || (displayMinute >= 23 && displayMinute <= 27) || (displayMinute >= 33 && displayMinute <= 37) || (displayMinute >= 53 && displayMinute <= 57) },
    { text: "MINUTES", active: (displayMinute >= 3 && displayMinute <= 27) || (displayMinute >= 33 && displayMinute <= 57) && displayMinute !== 15 && displayMinute !== 30 && displayMinute !== 45 }, // Show minutes unless it's quarter/half
    { text: "TO", active: isTo && displayMinute > 2 },
    { text: "PAST", active: !isTo && displayMinute > 2 },
    { text: "ONE", active: h12 === 1 },
    { text: "TWO", active: h12 === 2 },
    { text: "THREE", active: h12 === 3 },
    { text: "FOUR", active: h12 === 4 },
    { text: "FIVE", active: h12 === 5 },
    { text: "SIX", active: h12 === 6 },
    { text: "SEVEN", active: h12 === 7 },
    { text: "EIGHT", active: h12 === 8 },
    { text: "NINE", active: h12 === 9 },
    { text: "TEN", active: h12 === 10 },
    { text: "ELEVEN", active: h12 === 11 },
    { text: "TWELVE", active: h12 === 12 },
    { text: "O'CLOCK", active: displayMinute < 3 }
  ];

  const colorMap: Record<string, string> = {
    orange: 'text-orange-500',
    blue: 'text-blue-500',
    green: 'text-green-500',
    purple: 'text-purple-500',
    red: 'text-red-500',
  };
  const activeColor = colorMap[settings.accentColor];

  return (
    <div className="max-w-xl mx-auto p-8 bg-white dark:bg-black rounded-xl shadow-xl">
        <div className="flex flex-wrap justify-center gap-3 font-mono font-bold text-2xl sm:text-3xl leading-relaxed text-center text-gray-200 dark:text-gray-800 transition-colors duration-500">
            {words.map((w, i) => (
                <span key={i} className={`${w.active ? `scale-110 ${activeColor} drop-shadow-sm` : 'opacity-30'} transition-all duration-500`}>
                    {w.text}
                </span>
            ))}
        </div>
        {settings.showDate && (
            <div className={`mt-8 font-mono text-center uppercase tracking-widest text-sm ${activeColor}`}>
                {time.toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long'})}
            </div>
        )}
    </div>
  );
};

export default WordClock;

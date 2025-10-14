import React from 'react';

interface AnalogClockProps {
  hours: number;
  minutes: number;
  seconds: number;
}

const Hand = ({ rotation, className, length }: { rotation: number; className: string; length: string }) => (
    <div
        style={{
            transform: `translateX(-50%) rotate(${rotation}deg)`,
            height: length,
        }}
        className={`absolute bottom-1/2 left-1/2 origin-bottom rounded-full z-10 ${className}`}
    />
);


const AnalogClock: React.FC<AnalogClockProps> = ({ hours, minutes, seconds }) => {
  const secondsRotation = (seconds / 60) * 360;
  const minutesRotation = (minutes / 60) * 360 + (seconds / 60) * 6;
  const hoursRotation = ((hours % 12) / 12) * 360 + (minutes / 60) * 30;

  // Smooth transitions for hour and minute hands
  const smoothTransition = 'transition-transform duration-500 ease-in-out';
  // Special transition for second hand to handle the 0-second reset smoothly
  const secondHandTransition = seconds === 0 
    ? 'transition-none' 
    : 'transition-transform duration-1000 ease-linear';

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

        {/* Center dot - slightly larger to better anchor the hands */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-black dark:bg-white rounded-full z-20 border-2 border-orange-500" />

        {/* Hands with controlled transitions */}
        <Hand rotation={hoursRotation} length="25%" className={`w-2 bg-black dark:bg-white ${smoothTransition}`} />
        <Hand rotation={minutesRotation} length="35%" className={`w-1.5 bg-black dark:bg-white ${smoothTransition}`} />
        <Hand rotation={secondsRotation} length="40%" className={`w-1 bg-orange-500 ${secondHandTransition}`} />
      </div>
    </div>
  );
};

export default AnalogClock;
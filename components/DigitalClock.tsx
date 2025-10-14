import React from 'react';

interface DigitalClockProps {
  time: Date;
}

const DigitalClock: React.FC<DigitalClockProps> = ({ time }) => {
  const formatTime = (date: Date): string => {
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    
    const strMinutes = minutes < 10 ? '0' + minutes : minutes.toString();
    const strSeconds = seconds < 10 ? '0' + seconds : seconds.toString();

    return `${hours}:${strMinutes}:${strSeconds} ${ampm}`;
  };

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    }).toUpperCase();
  };

  return (
    <div className="text-black dark:text-white transition-colors duration-700 font-mono">
      <h1 className="text-[clamp(3rem,12vw,8rem)] font-semibold tracking-wider leading-none">
        {formatTime(time)}
      </h1>
      <div className="mt-2 text-[clamp(1rem,3vw,2rem)] font-light tracking-widest">
        <span>{formatDate(time)}</span>
      </div>
    </div>
  );
};

export default DigitalClock;
import React from "react";

interface ClockProps {
  currentMode: "Session" | "Break";
  timeLeft: string;
}

const Clock: React.FC<ClockProps> = ({ currentMode, timeLeft }) => {
  return (
    <div className='mt-6 bg-zinc-800 px-2 py-1 rounded-xl border-2 border-purple-700 shadow-md shadow-purple-700 sm:mt-10 md:py-2 lg:mt-16'>
      <h2
        className='text-center text-purple-500 text-3xl font-semibold mt-5 sm:text-4xl'
        id='timer-label'
      >
        {currentMode}
      </h2>
      <h3
        id='time-left'
        className='text-white text-center font-semibold text-5xl my-5 transition-all duration-300 ease-in-out sm:text-6xl'
      >
        {timeLeft}
      </h3>
    </div>
  );
};

export default Clock;

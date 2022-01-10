import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faPause, faUndo } from "@fortawesome/free-solid-svg-icons";

interface StartStopResetProps {
  isOn: boolean;
  start_stop: () => void;
  reset: () => void;
}

const StartStopReset: React.FC<StartStopResetProps> = ({
  isOn,
  start_stop,
  reset,
}) => {
  return (
    <div className='flex mt-6 justify-around sm:mt-8 lg:mt-16'>
      <button
        className='text-4xl hover:text-purple-600 transition-all duration-300 ease-in-out sm:text-5xl'
        id='start_stop'
        onClick={start_stop}
      >
        {isOn ? (
          <FontAwesomeIcon icon={faPause} />
        ) : (
          <FontAwesomeIcon icon={faPlay} />
        )}
      </button>
      <button
        className='text-4xl hover:text-purple-600 transition-all duration-300 ease-in-out sm:text-5xl'
        id='reset'
        onClick={reset}
      >
        <FontAwesomeIcon icon={faUndo} />
      </button>
    </div>
  );
};

export default StartStopReset;

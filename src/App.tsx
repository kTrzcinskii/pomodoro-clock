import React, { useCallback, useEffect, useState } from "react";
import ButtonsContainers from "./components/ButtonsContainers";
import Clock from "./components/Clock";
import StartStopReset from "./components/StartStopReset";

function App() {
  const [breakLength, setBreatkLength] = useState(5);
  const [sessionLength, setSessionLength] = useState(25);
  const [currentMode, setCurrentMode] = useState<"Session" | "Break">(
    "Session"
  );
  const [timeLeft, setTimeLeft] = useState("25:00");
  const [isOn, setIsOn] = useState(false);

  const transformTimeToNumbers = (time: string) => {
    const digits = time.split("");
    const minutes = +digits[0] * 10 + +digits[1];
    const seconds = +digits[3] * 10 + +digits[4];
    return { minutes, seconds };
  };

  const transformNumbersToTime = (minutes: number, seconds: number) => {
    let mins: string;
    let secs: string;

    if (minutes < 10) {
      mins = `0${minutes}`;
    } else {
      mins = minutes.toString();
    }

    if (seconds < 10) {
      secs = `0${seconds}`;
    } else {
      secs = seconds.toString();
    }

    return `${mins}:${secs}`;
  };

  const start_stop = () => {
    if (isOn) {
      setIsOn(false);
    } else {
      setIsOn(true);
    }
  };

  const reset = () => {
    setIsOn(false);
    setCurrentMode("Session");
    setSessionLength(25);
    setBreatkLength(5);
    setTimeLeft("25:00");

    const myAudio = document.getElementById("beep") as HTMLAudioElement;
    if (!myAudio.paused) {
      myAudio.pause();
      myAudio.currentTime = 0;
    }
  };

  const makeSwitch = useCallback(() => {
    if (currentMode === "Session") {
      setCurrentMode("Break");
      setTimeLeft(transformNumbersToTime(breakLength, 0));
    } else {
      setCurrentMode("Session");
      setTimeLeft(transformNumbersToTime(sessionLength, 0));
    }
  }, [breakLength, sessionLength, currentMode]);

  const applyLowTimeEffect = () => {
    const myClasses = ["!text-red-400"];
    const timer = document.getElementById("time-left");

    timer?.classList.add(...myClasses);

    setTimeout(() => {
      timer?.classList.remove(...myClasses);
    }, 300);
  };

  useEffect(() => {
    if (isOn) {
      const countdown = setInterval(() => {
        const { minutes, seconds } = transformTimeToNumbers(timeLeft);
        if (minutes === 0 && seconds < 31 && seconds !== 0) {
          applyLowTimeEffect();
        }
        if (minutes === 0 && seconds === 0) {
          makeSwitch();
        } else if (seconds === 0) {
          const newMinutes = minutes - 1;
          const newSeconds = 59;
          setTimeLeft(transformNumbersToTime(newMinutes, newSeconds));
        } else {
          const newSeconds = seconds - 1;
          setTimeLeft(transformNumbersToTime(minutes, newSeconds));
        }
      }, 1000);
      return () => clearInterval(countdown);
    }
  }, [isOn, timeLeft, makeSwitch]);

  useEffect(() => {
    if (currentMode === "Session") {
      setTimeLeft(transformNumbersToTime(sessionLength, 0));
    } else {
      setTimeLeft(transformNumbersToTime(breakLength, 0));
    }
  }, [sessionLength, breakLength, currentMode]);

  useEffect(() => {
    if (timeLeft === "00:00") {
      const myAudio = document.getElementById("beep") as HTMLAudioElement;
      if (!myAudio.paused) {
        myAudio.pause();
        myAudio.currentTime = 0;
      }
      myAudio.play();
    }
  }, [timeLeft]);

  return (
    <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-purple-800'>
      <h1 className='font-bold text-center text-3xl whitespace-nowrap text-purple-500 sm:text-5xl'>
        Pomodoro Clock
      </h1>
      <div className='flex flex-col justify-center mt-8 space-y-4 sm:mt-10 sm:space-y-5 md:flex-row md:space-y-0 md:space-x-20 lg:space-x-28 lg:mt-16'>
        <ButtonsContainers
          labelName='break'
          minutes={breakLength}
          changeLength={setBreatkLength}
          isOn={isOn}
        />
        <ButtonsContainers
          labelName='session'
          minutes={sessionLength}
          changeLength={setSessionLength}
          isOn={isOn}
        />
      </div>
      <Clock currentMode={currentMode} timeLeft={timeLeft} />
      <StartStopReset isOn={isOn} start_stop={start_stop} reset={reset} />
      <audio
        id='beep'
        src='https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3'
      ></audio>
    </div>
  );
}

export default App;

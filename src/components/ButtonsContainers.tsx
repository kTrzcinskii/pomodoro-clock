import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";

interface ButtonsContainersProps {
  labelName: string;
  minutes: number;
  changeLength: React.Dispatch<React.SetStateAction<number>>;
  isOn: boolean;
}

const ButtonsContainers: React.FC<ButtonsContainersProps> = ({
  labelName,
  minutes,
  changeLength,
  isOn,
}) => {
  const changeEffect = (type: string) => {
    const changeClasses = [
      "!text-purple-700",
      `${type === "increment" ? `!-translate-y-1` : `!translate-y-1`}`,
    ];

    const element = document.getElementById(`${labelName}-length`);
    element?.classList.add(...changeClasses);

    setTimeout(() => {
      element?.classList.remove(...changeClasses);
    }, 200);
  };

  const wrongChangeEffect = () => {
    const wrongChangeClasses = ["!text-red-400"];

    const element = document.getElementById(`${labelName}-length`);
    element?.classList.add(...wrongChangeClasses);

    setTimeout(() => {
      element?.classList.remove(...wrongChangeClasses);
    }, 200);
  };

  const handleClick = (type: string) => {
    if (!isOn) {
      if (type === "decrement" && minutes > 1) {
        changeEffect(type);
        changeLength((prev) => prev - 1);
      } else if (type === "increment" && minutes < 60) {
        changeEffect(type);
        changeLength((prev) => prev + 1);
      } else {
        wrongChangeEffect();
      }
    }
  };

  return (
    <div className='text-center'>
      <p
        id={`${labelName}-label`}
        className='capitalize font-semibold text-xl sm:text-2xl'
      >
        {labelName} length
      </p>
      <div className='flex justify-between items-center mt-2 w-28 mx-auto sm:w-32'>
        <button
          id={`${labelName}-decrement`}
          className={`transition duration-300 text-white ${
            isOn
              ? "hover:text-gray-500"
              : minutes === 1
              ? "hover:text-red-400"
              : "hover:text-purple-700"
          }`}
          onClick={() => handleClick("decrement")}
        >
          <FontAwesomeIcon icon={faMinus} className='sm:text-xl' />
        </button>
        <p
          id={`${labelName}-length`}
          className='text-4xl text-white font-bold transition-all duration-150 sm:text-5xl'
        >
          {minutes}
        </p>
        <button
          id={`${labelName}-increment`}
          className={`transition duration-300 text-white ${
            isOn
              ? "hover:text-gray-500"
              : minutes === 60
              ? "hover:text-red-400"
              : "hover:text-purple-700"
          } `}
          onClick={() => handleClick("increment")}
        >
          <FontAwesomeIcon icon={faPlus} className='sm:text-xl' />
        </button>
      </div>
    </div>
  );
};

export default ButtonsContainers;

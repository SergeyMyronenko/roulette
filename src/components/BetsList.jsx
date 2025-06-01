import rolls from "@/utils/rolls.json";
import clsx from "clsx";
import { useEffect, useState } from "react";

export const BetsList = ({ input, reset, onResetInput }) => {
  const [greenField, setGreenField] = useState([]);
  const [redField, setRedField] = useState([]);
  const [blackField, setBlackField] = useState([]);
  const [purpleField, setPurpleField] = useState([]);

  const handleBet = (color) => {
    if (!input || input === 0) return;

    switch (color) {
      case "red":
        setRedField((prev) => [...prev, input]);
        break;
      case "green":
        setGreenField((prev) => [...prev, input]);
        break;
      case "black":
        setBlackField((prev) => [...prev, input]);
        break;
      case "purple":
        setPurpleField((prev) => [...prev, input]);
        break;
      default:
        break;
    }
  };

  const totalBet = (array) => {
    const total = array.reduce(
      (accum, currentValue) => accum + currentValue,
      0
    );
    return total;
  };

  const resetColumns = (boolean) => {
    if (boolean === true) {
      setRedField([]);
      setGreenField([]);
      setBlackField([]);
      setPurpleField([]);
      onResetInput();
    }
  };

  useEffect(() => {
    resetColumns(reset);
  }, [reset]);

  return (
    <div>
      <ul className="flex justify-between h-[370px] overflow-auto scroll-smooth hide-scrollbar">
        <li className="w-[308px]">
          <button
            className="flex justify-between bg-red-500 rounded-lg px-3 py-4 w-full"
            onClick={() => handleBet("red")}
          >
            <p className="uppercase">bet on red</p>
            <p>PAY 2X</p>
          </button>
          <div className="flex justify-between rounded-lg px-3 py-4">
            <p>{redField.length > 0 ? `${redField.length}` : ""} Bets total</p>
            <div className="flex items-center gap-2">
              <img
                src="/images/icons.png"
                alt="icon counter"
                className="w-5 h-5 block"
              />
              <span>{totalBet(redField)}</span>
            </div>
          </div>
          <ul
            className={clsx("rounded-lg", redField.length > 0 && "bg-gray-800")}
          >
            {redField.map((field, index) => (
              <li
                key={index}
                className="flex justify-between items-center rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <img src="/images/rank-icons.png" alt="icon rank" />
                  <p>User</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/icons.png"
                    alt="icon counter"
                    className="w-5 h-5 block"
                  />
                  <span>{field}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className="w-[308px]">
          <button
            className="flex justify-between bg-green-400 rounded-lg px-3 py-4 w-full"
            onClick={() => handleBet("green")}
          >
            <p className="uppercase">bet on green</p>
            <p>PAY 14X</p>
          </button>
          <div className="flex items-center justify-between rounded-lg px-3 py-4">
            <p>
              {greenField.length > 0 ? `${greenField.length}` : ""} Bets total
            </p>
            <div className="flex items-center gap-2">
              <img
                src="/images/icons.png"
                alt="icon counter"
                className="w-5 h-5 block"
              />
              <span>{totalBet(greenField)}</span>
            </div>
          </div>
          <ul className="rounded-lg bg-gray-800 overflow-y-scroll scroll-smooth hide-scrollbar">
            {greenField.map((field, index) => (
              <li
                key={index}
                className="flex justify-between items-center rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <img src="/images/rank-icons.png" alt="icon rank" />
                  <p>User</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/icons.png"
                    alt="icon counter"
                    className="w-5 h-5 block"
                  />
                  <span>{field}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className="w-[308px]">
          <button
            className="flex justify-between bg-gray-700 rounded-lg px-3 py-4 w-full"
            onClick={() => handleBet("black")}
          >
            <p className="uppercase">bet on black</p>
            <p>PAY 2X</p>
          </button>
          <div className="flex items-center justify-between rounded-lg px-3 py-4">
            <p>
              {blackField.length > 0 ? `${blackField.length}` : ""} Bets total
            </p>
            <div className="flex items-center">
              <img
                src="/images/icons.png"
                alt="icon counter"
                className="w-5 h-5 block"
              />
              <span>{totalBet(blackField)}</span>
            </div>
          </div>
          <ul className="rounded-lg bg-gray-800 overflow-y-scroll scroll-smooth hide-scrollbar">
            {blackField.map((field, index) => (
              <li
                key={index}
                className="flex justify-between items-center rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <img src="/images/rank-icons.png" alt="icon rank" />
                  <p>User</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/icons.png"
                    alt="icon counter"
                    className="w-5 h-5 block"
                  />
                  <span>{field}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className="w-[308px]">
          <button
            className="flex justify-between bg-purple-500 rounded-lg px-3 py-4 w-full"
            onClick={() => handleBet("purple")}
          >
            <p className="uppercase">bet on joker</p>
            <p>PAY 7X</p>
          </button>
          <div className="flex justify-between items-center rounded-lg px-3 py-4">
            <p>
              {purpleField.length > 0 ? `${purpleField.length}` : ""} Bets total
            </p>
            <div className="flex items-center">
              <img
                src="/images/icons.png"
                alt="icon counter"
                className="w-5 h-5 block"
              />
              <span>{totalBet(purpleField)}</span>
            </div>
          </div>
          <ul className="rounded-lg bg-gray-800 overflow-y-scroll scroll-smooth hide-scrollbar">
            {purpleField.map((field, index) => (
              <li
                key={index}
                className="flex justify-between items-center rounded-lg px-4 py-2"
              >
                <div className="flex items-center gap-1.5">
                  <img src="/images/rank-icons.png" alt="icon rank" />
                  <p>User</p>
                </div>
                <div className="flex items-center gap-2">
                  <img
                    src="/images/icons.png"
                    alt="icon counter"
                    className="w-5 h-5 block"
                  />
                  <span>{field}</span>
                </div>
              </li>
            ))}
          </ul>
        </li>
      </ul>
    </div>
  );
};

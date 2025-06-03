"use client";

import { useEffect, useRef, useState } from "react";
import rolls from "@/utils/rolls.json";
import clsx from "clsx";

export const MainPage = () => {
  const [recentRolls, setRecentRolls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [greenField, setGreenField] = useState([]);
  const [redField, setRedField] = useState([]);
  const [blackField, setBlackField] = useState([]);
  const [purpleField, setPurpleField] = useState([]);
  const [userBalance, setUserBalance] = useState(1000);
  const [selectedIndex, setSelectedIndex] = useState(8);
  const [isRolling, setIsRolling] = useState(true);
  const [time, setTime] = useState({ seconds: 5, milliseconds: 99 });
  const [progress, setProgress] = useState(100);
  const [isVisible, setIsVisible] = useState(true);

  const wrapperRef = useRef(null);

  const handleInputValue = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleBet = (color) => {
    if (!inputValue || inputValue === 0 || !isRolling) return;

    switch (color) {
      case "red":
        setRedField((prev) => [...prev, inputValue]);
        break;
      case "green":
        setGreenField((prev) => [...prev, inputValue]);
        break;
      case "black":
        setBlackField((prev) => [...prev, inputValue]);
        break;
      case "purple":
        setPurpleField((prev) => [...prev, inputValue]);
        break;
      default:
        break;
    }
  };

  const handleBetValue = (type) => {
    setInputValue((prev) => {
      switch (type) {
        case "half":
          return prev / 2;
        case "double":
          return prev * 2;
        case "max":
          return userBalance;
        default:
          return prev;
      }
    });
  };

  const handleReset = () => {
    setInputValue("");
  };

  const totalBet = (array) => {
    const total = array.reduce(
      (accum, currentValue) => accum + currentValue,
      0
    );
    return total.toFixed(2);
  };

  const centerIcon = (index) => {
    if (!wrapperRef.current) return;

    const wrapper = wrapperRef.current;
    const icon = wrapper.children[index];
    if (!icon) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const iconRect = icon.getBoundingClientRect();

    const iconLeftRelative = icon.offsetLeft;

    const wrapperCenter = wrapperRect.width / 2;

    const scrollTo = iconLeftRelative - wrapperCenter + iconRect.width / 2;

    wrapper.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  const startRoll = () => {
    const disableRandom = false;
    const customIndex = 4;

    const minIndex = 6;
    const maxIndex = 18;

    const rollItem = disableRandom
      ? customIndex
      : Math.floor(Math.random() * (maxIndex - minIndex + 1) + minIndex);
    setSelectedIndex(rollItem);

    const winner = rolls[rollItem];

    centerIcon(rollItem);

    setRecentRolls((prev) => [...prev, winner]);
    setRedField([]);
    setGreenField([]);
    setBlackField([]);
    setPurpleField([]);
    setInputValue("");
  };

  const lastCounts = recentRolls.slice(-100).reduce(
    (acc, roll) => {
      if (roll.color === "bg-red-500") acc.red += 1;
      else if (roll.color === "bg-gray-700") acc.gray += 1;
      else if (roll.color === "bg-green-400") acc.green += 1;
      else if (roll.color === "bg-purple-500") acc.purple += 1;

      return acc;
    },
    { red: 0, gray: 0, green: 0, purple: 0 }
  );

  useEffect(() => {
    if (!isRolling) return;

    const countdownTime = time.seconds * 1000;
    const endTime = Date.now() + countdownTime;
    const updateInterval = 10;

    const interval = setInterval(() => {
      const remaining = endTime - Date.now();

      if (remaining <= 0) {
        clearInterval(interval);
        setIsVisible(false);
        setIsRolling(false);
        startRoll();

        setTimeout(() => {
          setIsRolling(true);
          setTime({ seconds: 5, milliseconds: 99 });
          setProgress(100);
          setIsVisible(true);
        }, 2000);
      } else {
        const seconds = Math.floor(remaining / 1000);
        const milliseconds = remaining % 1000;
        setTime({ seconds, milliseconds });
        setProgress((remaining / countdownTime) * 100);
      }
    }, updateInterval);

    return () => clearInterval(interval);
  }, [isRolling]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsRolling(true), 1000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-[1280px] ml-auto mr-auto py-6">
      <div className="flex justify-between mb-8 h-9">
        <ul className="flex w-[356px] overflow-hidden gap-1">
          {recentRolls &&
            recentRolls.slice(-10).map((roll, index) => (
              <li
                key={index}
                className={`w-8 h-8 border-sm ${roll.color} flex justify-center items-center rounded-sm shrink-0 border-t-2 border-white/30`}
              >
                <svg className={`w-4 h-[7px] ${roll.iconColor}`}>
                  <use href={`/icons/sprite.svg#${roll.icon}`}></use>
                </svg>
              </li>
            ))}
        </ul>
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium text-white/40">Last 100</p>
          <ul className="flex gap-4 items-center">
            <li className="flex gap-2 items-center">
              <span className="w-6 h-6 bg-red-500 rounded-[4px] flex justify-center items-center border-t-2 border-white/30">
                <svg className="w-[12px] h-[6px] fill-black">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">{lastCounts.red ?? 0}</span>
            </li>
            <li className="flex gap-2 items-center">
              <span className="w-6 h-6 bg-gray-700 rounded-[4px] flex justify-center items-center border-t-2 border-white/30">
                <svg className="w-[12px] h-[6px] fill-white">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">{lastCounts.gray ?? 0}</span>
            </li>
            <li className="flex gap-2 items-center">
              <span className="w-6 h-6 bg-green-400 rounded-[4px] flex justify-center items-center border-t-2 border-white/30">
                <svg className="w-[12px] h-[6px] fill-white">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">{lastCounts.green ?? 0}</span>
            </li>
            <li className="flex gap-2 items-center">
              <span className="w-6 h-6 bg-purple-500 rounded-[4px] flex justify-center items-center border-t-2 border-white/30">
                <svg className="w-[14px] h-[14px] fill-white">
                  <use href="/icons/sprite.svg#icon-Group"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">
                {lastCounts.purple ?? 0}
              </span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex justify-center relative overflow-hidden mb-2">
        <svg className="w-4 h-4 absolute top-0.5  z-20 fill-amber-300">
          <use href="/icons/sprite.svg#icon-down-arrow"></use>
        </svg>
        {!isVisible && (
          <span className="w-[100px] h-[100px] rounded-lg border-2 border-amber-300 absolute mx-auto z-20 top-2"></span>
        )}
        <ul
          className="flex gap-2 whitespace-nowrap overflow-x-auto hide-scrollbar py-2"
          ref={wrapperRef}
        >
          {rolls.map((roll, index) => (
            <li
              key={index}
              className={clsx(
                `w-[100px] h-[100px] ${roll.color} flex justify-center items-center rounded-lg flex-shrink-0 border-t-2 border-white/30`
              )}
            >
              <svg
                className={clsx(
                  `w-[50px] h-[24px] ${roll.iconColor}`,
                  roll.name === "crown" && "w-[57px] h-[57px]"
                )}
              >
                <use href={`/icons/sprite.svg#${roll.icon}`}></use>
              </svg>
            </li>
          ))}
        </ul>

        <div className="absolute left-0 top-0 h-full w-[100px] bg-gradient-to-r from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
        <div className="absolute right-0 top-0 h-full w-[100px] bg-gradient-to-l from-[#0a0a0c] to-transparent z-10 pointer-events-none"></div>
        {isVisible && (
          <div className="bg-gray-800/50 absolute w-full h-full flex flex-col justify-center items-center">
            <p className="uppercase text-white text-sm font-medium">
              Rolling in:
            </p>
            <span className="text-white text-xl font-bold uppercase">
              {time.seconds}.
              {time.milliseconds < 10
                ? `0${time.milliseconds}`
                : Math.floor(time.milliseconds / 10)
                    .toString()
                    .padStart(2, "0")}
            </span>
          </div>
        )}
      </div>
      <div
        className={`h-0.5 bg-amber-600 mb-9`}
        style={{ width: `${progress}%` }}
      ></div>
      <div className="w-[500px] flex p-1 mr-auto ml-auto h-11 items-center justify-between mb-8">
        <div className="flex items-center gap-2">
          <img
            src="/images/icons.png"
            alt="icon counter"
            className="w-4 h-4 block"
          />
          <div className="relative">
            <input
              type="number"
              value={inputValue}
              onChange={handleInputValue}
              className="w-[240px] h-8 border-gray-700 border-2 rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none p-1"
            />
            <button
              className="absolute top-1.5 right-1 text-[8px] text-gray-600 bg-gray-900 rounded-lg px-2 py-1 hover:scale-105"
              onClick={handleReset}
            >
              clear
            </button>
          </div>
        </div>
        <ul className="flex gap-0.5 items-center">
          <li>
            <button
              className="rounded-lg bg-gray-800 p-2 text-gray-500 w-[51px] h-[36px] flex justify-center items-center"
              onClick={() => handleBetValue("half")}
            >
              1/2
            </button>
          </li>
          <li>
            <button
              className="rounded-lg bg-gray-800 p-2 text-gray-500 w-[51px] h-[36px] flex justify-center items-center"
              onClick={() => handleBetValue("double")}
            >
              x2
            </button>
          </li>
          <li>
            <button
              className="rounded-lg bg-gray-800 p-2 text-gray-500 w-[51px] h-[36px] flex justify-center items-center"
              onClick={() => handleBetValue("max")}
            >
              Max
            </button>
          </li>
        </ul>
      </div>
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
              <p>
                {redField.length > 0 ? `${redField.length}` : ""} Bets total
              </p>
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
              className={clsx(
                "rounded-lg",
                redField.length > 0 && "bg-gray-800"
              )}
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
              <div className="flex items-center gap-2">
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
                {purpleField.length > 0 ? `${purpleField.length}` : ""} Bets
                total
              </p>
              <div className="flex items-center gap-2">
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
    </div>
  );
};

"use client";

import { useEffect, useState } from "react";
import rolls from "@/utils/rolls.json";
import clsx from "clsx";
import { motion, useAnimation } from "framer-motion";

export const MainPage = () => {
  const [recentRolls, setRecentRolls] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [greenField, setGreenField] = useState([]);
  const [redField, setRedField] = useState([]);
  const [blackField, setBlackField] = useState([]);
  const [purpleField, setPurpleField] = useState([]);
  const [userBalance, setUserBalance] = useState(1000);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [counter, setCounter] = useState(5);

  const handleInputValue = (e) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setInputValue(value);
    }
  };

  const handleBet = (color) => {
    if (!inputValue || inputValue === 0) return;

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
    return total;
  };

  const startRoll = () => {
    setIsRolling(true);
    const randomIndex = Math.floor(Math.random() * rolls.length);
    setSelectedIndex(randomIndex);

    const winner = rolls[randomIndex];

    setRecentRolls((prev) => [...prev, winner]);
  };

  useEffect(() => {
    if (counter === 0) {
      setIsRolling(false);
      startRoll();
      setCounter(5);
      setRedField([]);
      setGreenField([]);
      setBlackField([]);
      setPurpleField([]);
      setInputValue("");
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="w-[1280px] ml-auto mr-auto overflow-hidden py-6">
      <div className="flex justify-between mb-8 h-9">
        <ul className="flex w-[356px] overflow-hidden gap-1">
          {recentRolls.map((roll) => (
            <li
              key={roll.id}
              className={`w-8 h-8 border-sm ${roll.color} flex justify-center items-center rounded-sm shrink-0`}
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
            <li className="flex gap-4 items-center">
              <span className="w-6 h-6 bg-red-500 rounded-[4px] flex justify-center items-center">
                <svg className="w-[12px] h-[6px] fill-black">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">39</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-gray-700 rounded-[4px] flex justify-center items-center">
                <svg className="w-[12px] h-[6px] fill-white">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">39</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-green-400 rounded-[4px] flex justify-center items-center">
                <svg className="w-[12px] h-[6px] fill-white">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">9</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-purple-500 rounded-[4px] flex justify-center items-center">
                <svg className="w-[14px] h-[14px] fill-white">
                  <use href="/icons/sprite.svg#icon-Group"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">13</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mb-9 relative">
        <motion.ul
          className="flex gap-2"
          animate={{
            x: isRolling
              ? `-${selectedIndex * 102}px` // ширина item + gap
              : 0,
          }}
          transition={{ duration: 4, ease: "easeInOut" }}
        >
          {rolls.map((roll) => (
            <li
              key={roll.id}
              className={`w-[100px] h-[100px] ${roll.color} flex justify-center items-center rounded-lg border-t-2 border-white/30`}
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
        </motion.ul>
        <div className="bg-gray-800/50 absolute w-full h-full flex flex-col justify-center items-center">
          <p className="uppercase text-white text-sm font-medium">
            Rolling in:
          </p>
          <span className="text-white text-xl font-bold uppercase">
            {counter}
          </span>
        </div>
      </div>
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
              className="w-[240px] h-8 border-gray-700 border-2 rounded-lg appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
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

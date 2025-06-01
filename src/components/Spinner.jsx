"use client";

import { motion, useAnimation } from "framer-motion";
import clsx from "clsx";
import rolls from "@/utils/rolls.json";
import { useState, useEffect } from "react";

export const Spinner = ({ recentRolls, timerEnd }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRolling, setIsRolling] = useState(false);
  const [counter, setCounter] = useState(5);

  const startRoll = () => {
    setIsRolling(true);
    const randomIndex = Math.floor(Math.random() * rolls.length);
    setSelectedIndex(randomIndex);

    const winner = rolls[randomIndex];

    recentRolls(winner);
  };

  useEffect(() => {
    if (counter === 0) {
      setIsRolling(false);
      timerEnd();
      startRoll();
      setCounter(5);
      return;
    }

    const timer = setTimeout(() => {
      setCounter((prevCounter) => prevCounter - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [counter]);

  return (
    <div className="flex justify-center mb-9 relative">
      <motion.ul
        className="flex gap-2"
        animate={{
          x: isRolling ? `-${selectedIndex * 102}px` : 0,
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
        <p className="uppercase text-white text-sm font-medium">Rolling in:</p>
        <span className="text-white text-xl font-bold uppercase">
          {counter}
        </span>
      </div>
    </div>
  );
};

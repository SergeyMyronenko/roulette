"use client";

import { useState } from "react";
import rolls from "@/utils/rolls.json";

export const MainPage = () => {
  const [recentRolls, setRessentRolls] = useState([rolls]);

  return (
    <div className="w-[1280px] ml-auto mr-auto overflow-hidden">
      <div className="flex justify-between mb-8">
        <ul className="flex gap-1">
          {rolls.map((roll) => (
            <li
              key={roll.id}
              className={`w-8 h-8 border-sm ${roll.color} flex justify-center items-center rounded-sm`}
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
                <svg className="w-[9px] h-[6px] fill-amber-500">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">39</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-gray-500 rounded-[4px] flex justify-center items-center">
                <svg className="w-[9px] h-[6px] fill-amber-500">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">39</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-green-400 rounded-[4px] flex justify-center items-center">
                <svg className="w-[9px] h-[6px] fill-amber-500">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">9</span>
            </li>
            <li className="flex gap-2">
              <span className="w-6 h-6 bg-violet-700 rounded-[4px] flex justify-center items-center">
                <svg className="w-[9px] h-[6px] fill-amber-500">
                  <use href="/icons/sprite.svg#icon-Vector"></use>
                </svg>
              </span>
              <span className="text-sm font-bold">13</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="flex justify-center mb-9">
        <ul className="flex gap-2">
          {rolls.map((roll) => (
            <li
              key={roll.id}
              className={`w-[100px] h-[100px] ${roll.color} flex justify-center items-center rounded-lg`}
            >
              <svg className="w-[18px] h-[18px]">
                <use href={`/icons/sprite.svg#${roll.icon}`}></use>
              </svg>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[500px] flex p-1 mr-auto ml-auto h-11 items-center justify-between">
        <div className="flex items-center gap-2">
          <img
            src="/images/icons.png"
            alt="icon counter"
            className="w-4 h-4 block"
          />
          <input
            type="number"
            className="w-[240px] border-gray-700 border-2 rounded-lg"
          />
        </div>
        <ul className="flex gap-0.5 items-center">
          <li>
            <button className="rounded-lg bg-gray-800 p-2 text-gray-700 w-[51px] h-[36px]">
              1/2
            </button>
          </li>
          <li>
            <button className="rounded-lg bg-gray-800 p-2 text-gray-700 w-[51px] h-[36px]">
              x2
            </button>
          </li>
          <li>
            <button className="rounded-lg bg-gray-800 p-2 text-gray-700 w-[51px] h-[36px]">
              Max
            </button>
          </li>
        </ul>
      </div>
      <div></div>
    </div>
  );
};

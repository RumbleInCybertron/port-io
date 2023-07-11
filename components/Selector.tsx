"use client"

import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";

type StockProps = {
  name: string;
  ticker: string;
}

export const Selector = (stocks: StockProps[]) => {
  const sArr = Object.values(stocks).sort();
  const [inputValue, setInputValue] = useState("");
  const [selected, setSelected] = useState("");
  const [type, setType] = useState("");
  const [data, setData] = useState({
    name: "",
    ticker: "",
    type: "",
  });
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  const getStockChart = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setData({
      name: type === "stock" ? selected : "",
      ticker: type === "ticker" ? selected : "",
      type,
    });
    const param = data.name !== "" ? data.name : data.ticker;
    const res = await fetch(`/api/stocks/${type}/${param}`);
  };

  return (
    <div className="w-72 font-medium h-80">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${
          !selected && "text-gray-700"
        }`}
      >
        {selected
          ? selected?.length > 25
            ? selected?.substring(0, 25) + "..."
            : selected
          : "Select Stock"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${
          open ? "max-h-60" : "max-h-0"
        } `}
      >
        <div className="flex items-center px-2 sticky top-0 bg-white">
          <AiOutlineSearch size={18} className="text-gray-700" />
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value.toLowerCase())}
            placeholder="Enter stock name"
            className="placeholder:text-gray-700 p-2 outline-none"
          />
        </div>
        {sArr?.map((stock: StockProps) => (
          <li
          key={stock?.name}
          className={`p-2 text-sm hover:bg-sky-600 hover:text-white
          ${
            stock?.name?.toLowerCase() === selected?.toLowerCase() &&
            "bg-sky-600 text-white"
          }
          ${
            stock?.name?.toLowerCase().startsWith(inputValue)
            ? "block"
            : "hidden"
          }`}
          onClick={() => {
            if (stock?.name?.toLowerCase() !== selected.toLowerCase()) {
              setSelected(stock?.name);
              setType("name");
              getStockChart;
              setOpen(false);
              setInputValue("");
            }
          }}
          >
            {stock?.name}
          </li>
        ))}
        {sArr?.map((stock: StockProps) => (
          <li
            key={stock?.ticker}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${
              stock?.ticker?.toLowerCase() === selected?.toLowerCase() &&
              "bg-sky-600 text-white"
            }
            ${
              stock?.ticker?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
            }`}
            onClick={() => {
              if (stock?.ticker?.toLowerCase() !== selected.toLowerCase()) {
                setSelected(stock?.ticker);
                setType("ticker");
                setOpen(false);
                setInputValue("");
              }
            }}
          >
            {stock?.ticker}
          </li>
        ))}
      </ul>
    </div>
  );
};
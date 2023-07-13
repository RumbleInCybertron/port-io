"use client"

import React, { useEffect, useState } from "react";
import { BiChevronDown } from "react-icons/bi";
import { AiOutlineSearch } from "react-icons/ai";
import { useRouter } from "next/navigation";

type StockProps = {
  ticker: string;
}

export const Selector = (stocks: StockProps[], stock: StockProps) => {
  const router = useRouter();
  const uri = "/stock/"
  const sArr = Object.values(stocks).sort();
  const [inputValue, setInputValue] = useState("");
  const [ticker, setTicker] = useState("");
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getStockData = async () => {
      const res = await fetch(`/api/stock/${ticker}`);
      // console.log("Response /api/stock/type/ticker: ", res.json());
    }

    getStockData();
  }, [ticker]);
  

  return (
    <div className="w-72 font-medium h-80">
      <div
        onClick={() => setOpen(!open)}
        className={`bg-white w-full p-2 flex items-center justify-between rounded ${!ticker && "text-gray-700"
          }`}
      >
        {ticker
          ? ticker?.length > 25
            ? ticker?.substring(0, 25) + "..."
            : ticker
          : "Select Stock Ticker/Symbol"}
        <BiChevronDown size={20} className={`${open && "rotate-180"}`} />
      </div>
      <ul
        className={`bg-white mt-2 overflow-y-auto ${open ? "max-h-60" : "max-h-0"
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
            key={stock?.ticker}
            className={`p-2 text-sm hover:bg-sky-600 hover:text-white
            ${stock?.ticker?.toLowerCase() === ticker?.toLowerCase() &&
              "bg-sky-600 text-white"
              }
            ${stock?.ticker?.toLowerCase().startsWith(inputValue)
                ? "block"
                : "hidden"
              }`}
            onClick={async () => {
              if (stock?.ticker?.toLowerCase() !== ticker.toLowerCase()) {
                setOpen(false);
                setInputValue("");
                setTicker(stock?.ticker);
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
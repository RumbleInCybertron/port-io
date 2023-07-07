"use client"

import { TransactionProps } from "@/components/portfolio/Transaction";
import { useRouter, useSearchParams } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Dropdown } from "@nextui-org/react";
import { ChangeEvent, Key, useState } from "react";
import Navbar from "@/components/Navbar";

export type StockAssetProps = {
  id: string;
  name: string;
  ticker: string;
  index: string;
  amount: number;
  average: number;
  updatedAt: Date;
  // transactions: TransactionProps[];
};

export type CryptoAssetProps = {
  id: string;
  name: string;
  ticker: string;
  amount: number;
  average: number;
  updatedAt: Date;
  // transactions: TransactionProps[];
};

export type AssetInputProps = {
  portfolioId: string;
  name: string;
  ticker: string;
  index?: string;
  amount: number;
  average: number;
};

export const StockAsset = ({ id, name, ticker, index, amount, average, updatedAt }: StockAssetProps) => {
  const router = useRouter();
  return (
    <div className="text-inherit p-2" onClick={() => router.push(`/portfolio/asset/${id}`)}>
      <div className="font-bold text-xl">{name}</div>
      <div className="mx-2">
        <div className="text-xs">Symbol: {ticker} </div>
        <div className="text-xs">Index: {index} </div>
        <div className="text-xs">Shares: {amount}</div>
        <div className="text-xs">Average: ${average.toFixed(2)}</div>
        <div className="text-xs">Last Updated: {updatedAt.toDateString()}</div>
      </div>
    </div>
  )
}

export const CryptoAsset = ({ id, name, ticker, amount, average, updatedAt }: CryptoAssetProps) => {
  const router = useRouter();
  return (
    <div className="text-inherit p-2" onClick={() => router.push(`/portfolio/asset/${id}`)}>
      <small>{name}: {ticker} </small>
      <small>Amount: {amount} ${average}</small>
      <small>Last Updated: {updatedAt.toDateString()}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
    </div>
  )
}

// export const AssetForm = (asset: AssetInputProps) => {

//   return (
//     <>
//       <Navbar />
//       <section className="bg-purple-600 min-h-screen pt-20">
//         <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
//           <div className="md:w-8/12 lg:w-5/12 bg-dark-200 px-8 py-10">
//             <div>
//               <Dropdown>
//                 <Dropdown.Button flat>Asset Type</Dropdown.Button>
//                 <Dropdown.Menu onAction={(key) => { handleAction(key) }}>
//                   <Dropdown.Item key="stock">Stock</Dropdown.Item>
//                   <Dropdown.Item key="crypto" withDivider>Crypto</Dropdown.Item>
//                 </Dropdown.Menu>
//               </Dropdown>
//             </div>
//             <div className="flex justify-center p-3">
//               {
//                 type === "stock"
//                   ?
//                   <form onSubmit={onStockSubmit}>
//                     {error && (
//                       <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
//                     )}
//                     <div>
//                       <div className="text-center"><h1>Stock</h1></div>
//                       <label htmlFor="name">Name *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={stockFormValues.name}
//                         onChange={handleStockChange}
//                         placeholder="e.g. 'Unity Software Inc'"
//                         type="text"
//                         name="name"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="ticker">Ticker Symbol *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={stockFormValues.ticker}
//                         onChange={handleStockChange}
//                         placeholder="e.g. 'U'"
//                         type="text"
//                         name="ticker"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="index">Index *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={stockFormValues.index}
//                         onChange={handleStockChange}
//                         placeholder="e.g. 'NYSE'"
//                         type="text"
//                         name="index"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="amount">Number of Shares *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={stockFormValues.amount}
//                         onChange={handleStockChange}
//                         placeholder="e.g. '69'"
//                         type="number"
//                         name="amount"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="price">Price per Share *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={stockFormValues.price}
//                         onChange={handleStockChange}
//                         placeholder="e.g. '$420.69'"
//                         type="number"
//                         name="price"
//                         className="text-black mb-2"
//                       />
//                       <input
//                         disabled={
//                           !stockFormValues.name
//                           || !stockFormValues.ticker
//                           || !stockFormValues.index
//                           || !stockFormValues.amount
//                           || !stockFormValues.price
//                         }
//                         type="submit"
//                         value="Create"
//                         className="bg-pink-400 mb-2"
//                       />
//                     </div>
//                     <a href="#" onClick={() => router.push('/')}>
//                       or Cancel
//                     </a>
//                   </form>
//                   :
//                   <form onSubmit={onCryptoSubmit}>
//                     {error && (
//                       <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
//                     )}
//                     <div>
//                       <div className="text-center"><h1>Crypto</h1></div>
//                       <label htmlFor="name">Name *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={cryptoFormValues.name}
//                         onChange={handleCryptoChange}
//                         placeholder="e.g. 'Bitcoin'"
//                         type="text"
//                         name="name"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="ticker">Ticker Symbol *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={cryptoFormValues.ticker}
//                         onChange={handleCryptoChange}
//                         placeholder="e.g. 'BTC'"
//                         type="text"
//                         name="ticker"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="amount">Number of Coins *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={cryptoFormValues.amount}
//                         onChange={handleCryptoChange}
//                         placeholder="e.g. '69'"
//                         type="number"
//                         name="amount"
//                         className="text-black mb-2"
//                       />
//                       <label htmlFor="price">Price per Coin *</label>
//                       <input
//                         required
//                         autoFocus
//                         value={cryptoFormValues.price}
//                         onChange={handleCryptoChange}
//                         placeholder="e.g. '$27,420.69'"
//                         type="number"
//                         name="price"
//                         className="text-black mb-2"
//                       />
//                       <input
//                         disabled={
//                           !cryptoFormValues.name
//                           || !cryptoFormValues.ticker
//                           || !cryptoFormValues.amount
//                           || !cryptoFormValues.price
//                         }
//                         type="submit"
//                         value="Create"
//                         className="bg-pink-400 mb-2"
//                       />
//                     </div>
//                     <a href="#" onClick={() => router.push('/')}>
//                       or Cancel
//                     </a>
//                   </form>
//               }
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
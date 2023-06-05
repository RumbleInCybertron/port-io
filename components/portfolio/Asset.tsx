"use client"

import { TransactionProps } from "@/components/portfolio/Transaction";
import Router from "next/router";
import ReactMarkdown from "react-markdown";

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

export const StockAsset = ({id, name, ticker, index, amount, average, updatedAt}: StockAssetProps) => {
  return (
    <div className="text-inherit p-2" onClick={() => Router.push("/portfolio/asset/[id]", `/portfolio/asset/${id}`)}>
      <small>{name}: {ticker} </small>
      <small>{name}: {index} </small>
      <small>Shares: {amount} ${average}</small>
      <small>Last Updated: {updatedAt.toDateString()}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
    </div>
  )
}

export const CryptoAsset = ({id, name, ticker, amount, average, updatedAt}: CryptoAssetProps) => {
  return (
    <div className="text-inherit p-2" onClick={() => Router.push("/portfolio/asset/[id]", `/portfolio/asset/${id}`)}>
      <small>{name}: {ticker} </small>
      <small>Amount: {amount} ${average}</small>
      <small>Last Updated: {updatedAt.toDateString()}</small>
      <ReactMarkdown>{name}</ReactMarkdown>
    </div>
  )
}
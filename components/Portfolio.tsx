"use client"

import '@/app/styles/globals.css';
import React from 'react';
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { CryptoAsset, CryptoAssetProps, StockAsset, StockAssetProps } from './portfolio/Asset';
import Navbar from '@/components/Navbar';
import { FiatProps } from '@/components/Fiat';
import { Profit, ProfitProps } from '@/components/Profit';

export type PortfolioProps = {
  id: string;
  name: string;
  ttl_value: number;
  Fiat: FiatProps | null;
  stockAssets?: StockAssetProps[];
  cryptoAssets?: CryptoAssetProps[];
};

export const GetPortfolio = (props: { portfolio: PortfolioProps, profits: ProfitProps[] }) => {
  const router = useRouter();
  const uri = "/portfolio/asset/update/" + props.portfolio.id
  console.log("Profits: ", props.profits);
  return (
    <>
      <Navbar />
      <div className="m-4 text-yellow-600">
        Portfolio
        <div>{props.portfolio.name}
          <div>Total Profits{
            props.profits !== undefined && props.profits.length > 0
              ? (
                props.profits.map((profit: ProfitProps, i) => (
                  <div key={i}>
                    <Profit {...profit} />
                  </div>
                )))
              : (
                <div className="mx-1">No Profits yet!</div>
              )}
          </div>
          <div>Total Value: ${props.portfolio.ttl_value}</div>
          <div>Fiat: ${props.portfolio.Fiat?.amount}</div>
          <div>Stocks</div>
          {
            props.portfolio.stockAssets !== undefined && props.portfolio.stockAssets.length >= 1
              ? (
                props.portfolio.stockAssets?.map((stockAsset: StockAssetProps, i) => (
                  <div key={i}>
                    <StockAsset {...stockAsset} />
                  </div>
                )))
              : (
                <div>No Stock Assets in this Portfolio</div>
              )}
          <div>Crypto</div>
          {
            props.portfolio.cryptoAssets !== undefined && props.portfolio.cryptoAssets.length >= 1
              ? (
                props.portfolio.cryptoAssets?.map((cryptoAsset: CryptoAssetProps, i) => (
                  <div key={i}>
                    <CryptoAsset {...cryptoAsset} />
                  </div>
                )))
              : (
                <div>No Crypto Assets in this Portfolio</div>
              )}
          <button className="m-2 w-1/3" onClick={() => router.push(uri)}>+ Add/Update Asset</button>
        </div>
        {/* <StockAsset id={props.portfolio.id} name={props.portfolio.name} ticker={props.portfolio.ticker} amount={props.portfolio.amount} average={props.portfolio.average} updatedAt={props.portfolio.updatedAt} /> */}
      </div>
    </>
  )
  {/* <div>
        {stocks.length < 1 ? null : <h1>Stocks</h1>}
        {stocks.map((stock) => (
          <div key={stock.id} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
            <Stock {...stock} />
          </div>
        ))}
        {cryptos.length < 1 ? null : <h1>Crypto</h1>}
        {cryptos.map((crypto) => (
          <div key={crypto.id}>
            <Crypto {...crypto} />
          </div>
        ))}
      </div> */}
}

export const GetPortfolios = ({ portfolios }: { portfolios: PortfolioProps[] }) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div className="m-2 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        Portfolios
        {portfolios.length < 1
          ? (
            <div>
              <div className="p-2 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">No portfolios here. Would you like to add one?</div>
            </div>
          )
          : (
            portfolios.map((portfolio: PortfolioProps, i) => (
              <div key={i} className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
                <Portfolio {...portfolio} />
              </div>
            ))
          )}
        <button onClick={() => router.push("/portfolio/create")}>+ add</button>
      </div>
    </>
  )
}

export const Portfolio = ({ ...portfolio }: PortfolioProps) => {
  const router = useRouter();
  const uri = "/portfolio/" + portfolio.id;

  return (
    <div onClick={() =>
      router.push(uri)
    }>
      <small>{portfolio.name}</small>
      <ReactMarkdown>{portfolio.name}</ReactMarkdown>
    </div>
  )
}

export default Portfolio;
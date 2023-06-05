"use client"

import '@/app/styles/globals.css';
import React from 'react';
import { useRouter } from "next/navigation";
import ReactMarkdown from 'react-markdown';
import { CryptoAsset, CryptoAssetProps, StockAsset, StockAssetProps } from './portfolio/Asset';
import Navbar from '@/components/Navbar';

export type PortfolioProps = {
  id: string;
  name: string;
  stockAssets?: StockAssetProps[];
  cryptoAssets?: CryptoAssetProps[];
};

export const GetPortfolio = (portfolio: PortfolioProps) => {
  const router = useRouter();
  return (
    <>
      <Navbar />
      <div>
        Portfolio
        <div>{portfolio.name}
          <div>Stocks</div>
          {
            portfolio.stockAssets !== undefined && portfolio.stockAssets.length >= 1
              ? (
                portfolio.stockAssets?.map((stockAsset: StockAssetProps, i) => (
                  <div key={i}>
                    <StockAsset {...stockAsset} />
                  </div>
                )))
              : (
                <div>No Stock Assets in this Portfolio</div>
              )}
          <div>Crypto</div>
          {
            portfolio.cryptoAssets !== undefined && portfolio.cryptoAssets.length >= 1
              ? (
                portfolio.cryptoAssets?.map((cryptoAsset: CryptoAssetProps, i) => (
                  <div key={i}>
                    <CryptoAsset {...cryptoAsset} />
                  </div>
                )))
              : (
                <div>No Crypto Assets in this Portfolio</div>
              )}
          <button className="m-2 w-1/3" onClick={() => router.push(`/portfolio/asset/update/?id=${portfolio.id}`)}>+ Add/Update Asset</button>
        </div>
        {/* <StockAsset id={portfolio.id} name={portfolio.name} ticker={portfolio.ticker} amount={portfolio.amount} average={portfolio.average} updatedAt={portfolio.updatedAt} /> */}
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
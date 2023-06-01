"use client"

import '@/app/styles/globals.css';
import { CryptoAsset, CryptoAssetProps, StockAsset, StockAssetProps } from "@/components/portfolio/Asset";
import { Portfolio } from "@/components/Portfolio";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface Portfolio {
  name: string;
  stockAssets?: StockAssetProps[];
  cryptoAssets?: CryptoAssetProps[];
}

export default function PortfolioPage({ name, stockAssets, cryptoAssets }: Portfolio) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [portfolio, setPortfolioData] = useState<Portfolio>({name: "", stockAssets: [], cryptoAssets: []});

  const refreshData = () => {
    router.replace(pathname);
  };

  useEffect(() => {
    const callApi = async () => {
      try {
        const res = await fetch(`/api/portfolio/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log("Response: ", res);
        setPortfolioData(await res.json());
      } catch (err) {
        console.error(err);
      }
    }

    const result = callApi().catch(console.error);
    // console.log("Result: ", result);
  }, [id]);

  return (
      <div>
        Portfolio
        <div>{portfolio.name}
          {portfolio.stockAssets !== undefined && portfolio.stockAssets.length > 1
            ? (
              portfolio.stockAssets?.map((stockAsset: StockAssetProps, i) => (
                <div key={i}>
                  <StockAsset {...stockAsset} />
                </div>
              )))
            : (
              <div>No Stock Assets in this Portfolio</div>
            )}
          {portfolio.cryptoAssets !== undefined && portfolio.cryptoAssets.length > 1
            ? (
              portfolio.cryptoAssets?.map((cryptoAsset: CryptoAssetProps, i) => (
                <div key={i}>
                  <CryptoAsset {...cryptoAsset} />
                </div>
              )))
            : (
              <div>No Crypto Assets in this Portfolio</div>
            )}
          <button className="m-2 w-1/3" onClick={() => router.push("/portfolio/asset/stock/update")}>+ Add/Update Stock Assets</button>
          <button className="m-2 w-1/3" onClick={() => router.push("/portfolio/asset/crypto/update")}>+ Add/Update Crypto Assets</button>
        </div>
        {/* <StockAsset id={portfolio.id} name={portfolio.name} ticker={portfolio.ticker} amount={portfolio.amount} average={portfolio.average} updatedAt={portfolio.updatedAt} /> */}
      </div>
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
};
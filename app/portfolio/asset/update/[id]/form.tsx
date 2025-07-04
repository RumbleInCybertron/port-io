"use client";

import '@/app/styles/globals.css';
import { ChangeEvent, Key,useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "@nextui-org/react";
import Navbar from '@/components/Navbar';
import { useSession } from 'next-auth/react';

export type Portfolio = {
  id: string
}

export const AssetForm = (portfolio: Portfolio) => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const user = session?.user;

  const [stockFormValues, setStockFormValues] = useState({
    portfolioId: "",
    name: "",
    ticker: "",
    index: "",
    amount: 0,
    price: 0,
    assetType: "stock",
    // transactionType: "",
  });
  const [cryptoFormValues, setCryptoFormValues] = useState({
    portfolioId: "",
    name: "",
    ticker: "",
    amount: 0,
    price: 0,
    assetType: "crypto",
    // transactionType: "",
  });

  const [assetType, setAssetType] = useState("stock");
  const [transactionType, setTransactionType] = useState("long");

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const uri = "/portfolios/" + user?.email;
  const callbackUrl = searchParams.get("callbackUrl") || uri;

  const onStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStockFormValues({
      portfolioId: portfolio.id,
      name: "",
      ticker: "",
      index: "",
      amount: 0,
      price: 0,
      assetType: "stock",
    });
    const body = { ...stockFormValues, transactionType };
    console.log("Body: ", body)

    const res = await fetch("/api/portfolio/asset", {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!res.ok) {
      setError((await res.json()).message);
      return;
    }

    await router.push(callbackUrl);
  };

  const onCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCryptoFormValues({
      portfolioId: portfolio.id,
      name: "",
      ticker: "",
      amount: 0,
      price: 0,
      assetType: "crypto",
    });
    const body = { ...cryptoFormValues, transactionType };
    console.log("Body: ", body);

    try {
      const res = await fetch("/api/portfolio/asset", {
        method: "PUT",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      await router.push(callbackUrl);

    } catch (error: any) {
      setError(error);
    }
  };

  const handleStockChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setStockFormValues({ ...stockFormValues, [name]: value });
  };

  const handleCryptoChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setCryptoFormValues({ ...cryptoFormValues, [name]: value });
  };

  const handleAssetTypeAction = (type: Key) => {
    setAssetType(type.toString());
    console.log(type);
  };

  const handleTransactionTypeAction = (type: Key) => {
    setTransactionType(type.toString());
    console.log(type);
  };

  return (
    <>
      <Navbar />
      <section className="bg-purple-600 min-h-screen pt-20">
        <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
          <div className="md:w-8/12 lg:w-5/12 bg-dark-200 px-8 py-10">
            <div className="flex">
              <div className="mx-2">
                <Dropdown>
                  <Dropdown.Button flat>Asset Type</Dropdown.Button>
                  <Dropdown.Menu onAction={(key) => { handleAssetTypeAction(key) }}>
                    <Dropdown.Item key="stock">Stock</Dropdown.Item>
                    <Dropdown.Item key="crypto" withDivider>Crypto</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
              <div>
                <Dropdown>
                  <Dropdown.Button flat>Transaction Type</Dropdown.Button>
                  <Dropdown.Menu onAction={(key) => { handleTransactionTypeAction(key) }}>
                    <Dropdown.Item key="long">Buy / Long</Dropdown.Item>
                    <Dropdown.Item key="short" withDivider>Sell / Short</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="flex justify-center p-3">
              {
                assetType === "stock"
                  ?
                  <form
                   onSubmit={onStockSubmit}
                                    //  action="/api/portfolio/asset"
                                    //  method="put"
                   >
                    {error && (
                      <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                    )}
                    <div>
                      <div className="text-center"><h1>Stock</h1></div>
                      <label htmlFor="name">Name *</label>
                      <input
                        required
                        autoFocus
                        value={stockFormValues.name}
                        onChange={handleStockChange}
                        placeholder="e.g. 'Unity Software Inc'"
                        type="text"
                        name="name"
                        className="text-black mb-2"
                      />
                      <label htmlFor="ticker">Ticker Symbol *</label>
                      <input
                        required
                        autoFocus
                        value={stockFormValues.ticker}
                        onChange={handleStockChange}
                        placeholder="e.g. 'U'"
                        type="text"
                        name="ticker"
                        className="text-black mb-2"
                      />
                      <label htmlFor="index">Index *</label>
                      <input
                        required
                        autoFocus
                        value={stockFormValues.index}
                        onChange={handleStockChange}
                        placeholder="e.g. 'NYSE'"
                        type="text"
                        name="index"
                        className="text-black mb-2"
                      />
                      <label htmlFor="amount">Number of Shares *</label>
                      <input
                        required
                        autoFocus
                        value={stockFormValues.amount}
                        onChange={handleStockChange}
                        placeholder="e.g. '69'"
                        type="number"
                        name="amount"
                        className="text-black mb-2"
                      />
                      <label htmlFor="price">Price per Share *</label>
                      <input
                        required
                        autoFocus
                        value={stockFormValues.price}
                        onChange={handleStockChange}
                        placeholder="e.g. '$420.69'"
                        type="number"
                        name="price"
                        className="text-black mb-2"
                      />
                      <input
                        disabled={
                          !stockFormValues.name
                          || !stockFormValues.ticker
                          || !stockFormValues.index
                          || !stockFormValues.amount
                          || !stockFormValues.price
                        }
                        type="submit"
                        value="Create"
                        className="bg-pink-400 mb-2"
                      />
                    </div>
                    <a href="#" onClick={() => router.push('/')}>
                      or Cancel
                    </a>
                  </form>
                  :
                  <form
                    onSubmit={onCryptoSubmit}
                  // action="/api/portfolio/asset"
                  >
                    {error && (
                      <p className="text-center bg-red-300 py-4 mb-6 rounded">{error}</p>
                    )}
                    <div>
                      <div className="text-center"><h1>Crypto</h1></div>
                      <label htmlFor="name">Name *</label>
                      <input
                        required
                        autoFocus
                        value={cryptoFormValues.name}
                        onChange={handleCryptoChange}
                        placeholder="e.g. 'Bitcoin'"
                        type="text"
                        name="name"
                        className="text-black mb-2"
                      />
                      <label htmlFor="ticker">Ticker Symbol *</label>
                      <input
                        required
                        autoFocus
                        value={cryptoFormValues.ticker}
                        onChange={handleCryptoChange}
                        placeholder="e.g. 'BTC'"
                        type="text"
                        name="ticker"
                        className="text-black mb-2"
                      />
                      <label htmlFor="amount">Number of Coins *</label>
                      <input
                        required
                        autoFocus
                        value={cryptoFormValues.amount}
                        onChange={handleCryptoChange}
                        placeholder="e.g. '69'"
                        type="number"
                        name="amount"
                        className="text-black mb-2"
                      />
                      <label htmlFor="price">Price per Coin *</label>
                      <input
                        required
                        autoFocus
                        value={cryptoFormValues.price}
                        onChange={handleCryptoChange}
                        placeholder="e.g. '$27,420.69'"
                        type="number"
                        name="price"
                        className="text-black mb-2"
                      />
                      <input
                        disabled={
                          !cryptoFormValues.name
                          || !cryptoFormValues.ticker
                          || !cryptoFormValues.amount
                          || !cryptoFormValues.price
                        }
                        type="submit"
                        value="Create"
                        className="bg-pink-400 mb-2"
                      />
                    </div>
                    <a href="#" onClick={() => router.push('/')}>
                      or Cancel
                    </a>
                  </form>
              }
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
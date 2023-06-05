"use client";

import '@/app/styles/globals.css';
import { ChangeEvent, Key, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Dropdown } from "@nextui-org/react";

export const AssetForm = () => {
  const router = useRouter();
  const [stockFormValues, setStockFormValues] = useState({
    name: "",
    ticker: "",
    index: "",
    amount: 0,
    price: 0,
    type: "crypto",
  });
  const [cryptoFormValues, setCryptoFormValues] = useState({
    name: "",
    ticker: "",
    amount: 0,
    price: 0,
    type: "stock",
  });

  const [type, setType] = useState("stock");

  const [error, setError] = useState("");

  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/portfolios";
  const portfolioId = searchParams.get("id");

  const onStockSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStockFormValues({ name: "", ticker: "", index: "", amount: 0, price: 0, type: "stock" });
    const body = { ...stockFormValues, portfolioId };

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

      router.push(callbackUrl);

    } catch (error: any) {
      setError(error);
    }
  };

  const onCryptoSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCryptoFormValues({ name: "", ticker: "", amount: 0, price: 0, type: "crypto" });

    try {
      const res = await fetch("/api/portfolio/asset", {
        method: "PUT",
        body: JSON.stringify(cryptoFormValues),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }

      router.push(callbackUrl);

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

  const handleAction = (type: Key) => {
    setType(type.toString());
    console.log(type);
  };

  return (
    <section className="bg-purple-600 min-h-screen pt-20">
      <div className="container mx-auto px-6 py-12 h-full flex justify-center items-center">
        <div className="md:w-8/12 lg:w-5/12 bg-dark-200 px-8 py-10">
          <div>
            <Dropdown>
              <Dropdown.Button flat>Asset Type</Dropdown.Button>
              <Dropdown.Menu onAction={(key) => { handleAction(key) }}>
                <Dropdown.Item key="stock">Stock</Dropdown.Item>
                <Dropdown.Item key="crypto" withDivider>Crypto</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
          <div className="flex justify-center p-3">
            {
              type === "stock"
                ?
                <form onSubmit={onStockSubmit}>
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
                <form onSubmit={onCryptoSubmit}>
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
  );
};
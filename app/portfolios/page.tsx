"use client"

import '@/app/styles/globals.css';
import { Portfolio, PortfolioProps } from "@/components/Portfolio";
import Navbar from "@/components/Navbar";
import { useState } from 'react';
import { useRouter } from "next/navigation";

export default function PortfoliosPage() {
  const router = useRouter();
  const [portfolios, setPortfolios] = useState([]);
  const [error, setError] = useState("");

  const callApi = async () => {
    try {      
      const res = await fetch("/api/portfolios", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      setPortfolios(await res.json());
      if (!res.ok) {
        setError((await res.json()).message);
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
  );
}
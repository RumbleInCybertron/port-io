"use client"

import { Collapse, Text } from "@nextui-org/react";
import Portfolio, { PortfolioProps } from "@/components/Portfolio";
import { useRouter } from "next/navigation";

export default function Accordion(portfolios: PortfolioProps[]) {
  const router = useRouter();
  const pArr = Object.values(portfolios).sort();
  return (
    <div className="m-2 font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      Portfolios
      {pArr.length < 1
        ? (
          <div>
            <div className="p-2 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">No portfolios here. Would you like to add one?</div>
          </div>
        )
        : (
          pArr.map((portfolio: PortfolioProps, i: any) => (
            <Collapse.Group key={i}>
              <Collapse title={portfolio.name}>
                <div className="bg-purple-800/50 shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 mb-2 p-3 w-1/3">
                  <Portfolio {...portfolio} />
                </div>
              </Collapse>
            </Collapse.Group>
          ))
        )}
      <button onClick={() => router.push("/portfolio/create")}>+ add</button>
    </div>
  )
}
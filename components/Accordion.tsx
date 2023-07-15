"use client"

import { Collapse, Text } from "@nextui-org/react";
import Portfolio, { PortfolioProps } from "@/components/Portfolio";
import { useRouter } from "next/navigation";
import { CyberEl42 } from 'react-cyber-elements'

export default function Accordion(portfolios: PortfolioProps[]) {
  const router = useRouter();
  const pArr = Object.values(portfolios).sort();
  return (
    <div className="m-2 grid justify-center font-extrabold text-transparent text-6xl bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
      <div className="mb-2 mx-10">Portfolios</div>
      {pArr.length < 1
        ? (
          <div>
            <div className="p-2 font-extrabold text-transparent text-2xl bg-clip-text bg-gradient-to-r from-pink-400 to-purple-600">No portfolios here. Would you like to add one?</div>
          </div>
        )
        : (
          pArr.map((portfolio: PortfolioProps, i: any) => (
            <Collapse.Group className="w-96" key={i}>
              <Collapse bordered className="custom border-solid border-2 border-sky-500 text-transparent" title={<div className="text-sm text-slate-400 cursor-grabbing">{portfolio.name}</div>} arrowIcon={<CyberEl42 style={{
                width: '30px',
                height: '30px',
              }} />}>
                <div className="bg-purple-800/50 rounded shadow ease-in duration-100 hover:shadow hover:bg-purple-900/50 text-slate-200 mb-2 p-3">
                  <Portfolio {...portfolio} />
                </div>
              </Collapse>
            </Collapse.Group>
          ))
        )}
      <button className="text-slate-200 text-3xl w-60 mt-4 mx-16" onClick={() => router.push("/portfolio/create")}>+ add</button>
    </div>
  )
}
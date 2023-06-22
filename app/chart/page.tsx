import '@/app/styles/globals.css'
// import { LineChart } from "@/components/charts/LineChart";
import { LineChart } from "@/components/charts/AssetLineChart";
import {  DoubleLineChart } from "@/components/charts/DoubleLineChart";
import { getThirtyDays } from "@/utils/getThirtyDays";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { TransactionProps } from '@/components/portfolio/Transaction';

export default async function LineChartPage() {
  const session = await getServerSession(authOptions);
  console.log("Session Data: ", session);
  const user = await prisma.user.findFirst({
    where: {
      email: String(session?.user?.email)
    },
    select: {
      portfolios: {
        select: {
          stockAssets: {
            select: {
              name: true,
              ticker: true,
              index: true,
              amount: true,
              average: true,
              updatedAt: true,
              id: true,
              transactions: {
                select: {
                  price: true,
                  units: true,
                  type: true,
                  createdAt: true,
                  id: true
                }
              }
            }
          },
          cryptoAssets: {
            select: {
              name: true,
              ticker: true,
              amount: true,
              average: true,
              updatedAt: true,
              id: true,
              transactions: {
                select: {
                  price: true,
                  units: true,
                  type: true,
                  createdAt: true,
                  id: true
                }
              }
            }
          }
        }
      }
    }
  });
  console.log("Assets: ", user?.portfolios);
  console.log("3rd Portfolio: ", user?.portfolios[2]);
  const cryptos: [{ name: string, ticker: string, amount: number, average: number, updatedAt: Date, id: string, transactions: TransactionProps[] }] = user?.portfolios[2].cryptoAssets as [{
    name: string;
    ticker: string;
    amount: number;
    average: number;
    updatedAt: Date;
    id: string;
    transactions: TransactionProps[];
  }];
  const stocks: [{ name: string, ticker: string, index: string, amount: number, average: number, updatedAt: Date, id: string, transactions: TransactionProps[] }] = user?.portfolios[2].stockAssets as [{
    name: string;
    ticker: string;
    index: string;
    amount: number;
    average: number;
    updatedAt: Date;
    id: string;
    transactions: TransactionProps[];
  }];

  console.log("Crypto Array: ", cryptos);
  console.log("Stock Array: ", stocks);
  const assets = cryptos.concat(stocks);
  console.log("Assets Array: ", assets);

  const transactions = user?.portfolios[2].stockAssets[0].transactions !== undefined
    ?
      user?.portfolios[2].stockAssets[0].transactions.map((e) => {
        const type = e.price > 0 ? "buy" : "sell";
        const price = Math.abs(e.price);
        return price;
      })
    :
      [];
  console.log("Transactions: ", transactions);

  // TODO: Eventually User will choose 1m, 5m, 15m, 1d, 1w etc to display data
  const thirtyDays = getThirtyDays();

  const data = {
    labels: thirtyDays,
    datasets: [{
      data: transactions,
    },
    ]
  };
  // const data = {
  //   labels: thirtyDays,
  //   datasets: [{
  //     data: [86, 114, 106, 106, 107, 111, 133, 86, 114, 106, 106, 107, 111, 133, 86, 114, 106, 106, 107, 111, 133, 90, 100, 70, 90, 44, 60, 83, 90, 100,],
  //   }, {
  //     data: [70, 90, 44, 60, 83, 90, 100, 70, 90, 44, 60, 83, 90, 100, 70, 90, 44, 60, 83, 90, 100, 86, 114, 106, 106, 107, 111, 133, 86, 114],
  //   }, {
  //     data: [10, 21, 60, 44, 17, 21, 17, 10, 21, 60, 44, 17, 21, 17, 10, 21, 60, 44, 17, 21, 17, 21, 17, 10, 21, 60, 44, 17, 21, 17,],
  //   }, {
  //     data: [6, 3, 2, 2, 7, 0, 16, 6, 3, 2, 2, 7, 0, 16, 6, 3, 100, 87, 7, 0, 16, 6, 3, 2, 2, 7, 0, 16, 2, 19],
  //   }
  //   ]
  // };

  return (
    <>
      <Navbar />
      {/* <LineChart {...data} /> */}
      {/* <DoubleLineChart /> */}
      <LineChart />
    </>
  )
}
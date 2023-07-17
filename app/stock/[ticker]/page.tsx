import '@/app/styles/globals.css'
import { LineChart } from "@/components/charts/LineChart";
// import { LineChart } from "@/components/charts/AssetLineChart";
import { DoubleLineChart } from "@/components/charts/DoubleLineChart";
import { getDates } from "@/utils/getDates";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import Navbar from "@/components/Navbar";
import { TransactionProps } from '@/components/portfolio/Transaction';
import { Selector } from '@/components/Selector';

export default async function StockPage({ params }: { params: { ticker: string } }) {
  const stocks = await prisma.stock.findMany({
    select: { ticker: true }
  });

  const stock = await prisma.stock.findFirstOrThrow({
    where: { ticker: String(params.ticker) },
  });

  const session = await getServerSession(authOptions);
  // console.log("Session Data: ", session);
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
  // console.log("Assets: ", user?.portfolios);
  // console.log("2nd Portfolio: ", user?.portfolios[2]);
  const cryptoAssets: [{ name: string, ticker: string, amount: number, average: number, updatedAt: Date, id: string, transactions: TransactionProps[] }] = user?.portfolios[2].cryptoAssets as [{
    name: string;
    ticker: string;
    amount: number;
    average: number;
    updatedAt: Date;
    id: string;
    transactions: TransactionProps[];
  }];
  const stockAssets: [{ name: string, ticker: string, index: string, amount: number, average: number, updatedAt: Date, id: string, transactions: TransactionProps[] }] = user?.portfolios[2].stockAssets as [{
    name: string;
    ticker: string;
    index: string;
    amount: number;
    average: number;
    updatedAt: Date;
    id: string;
    transactions: TransactionProps[];
  }];

  // console.log("Crypto Asset Array: ", cryptoAssets);
  // console.log("Stock Asset Array: ", stockAssets);
  const assets = cryptoAssets.concat(stockAssets);
  // console.log("Assets Array: ", assets);

  const transactions = user?.portfolios[2].stockAssets[0].transactions !== undefined
    ?
    user?.portfolios[2].stockAssets[0].transactions.map((e: any) => {
      const type = e.type === "long" ? "buy" : "sell";
      const price = Math.abs(e.price);
      const createdAt = e.createdAt;
      return { type, price, createdAt };
    })
    :
    [];

  let longs: object[] = [], shorts: object[] = [];
  transactions.forEach((e: any) =>
    e.type === "buy"
      ? longs.push({ price: e.price, createdAt: e.createdAt })
      : shorts.push({ price: e.price, createdAt: e.createdAt })
  );

  const startDate = new Date("2023-05-01");
  const endDate = new Date("2023-06-30");

  const history = await prisma.historicalData.findMany({
    where: {
      ticker: String(stock.ticker),
      date: {
        lte: endDate,
        gte: startDate
      }
    },
    orderBy: { date: "asc" }
  });

  // const aapl_hist = await prisma.historicalData.findMany({
  //   where: {
  //     ticker: "AAPL",
  //     date: {
  //       lte: endDate,
  //       gte: startDate
  //     }
  //   },
  //   orderBy: { date: "asc" }
  // });
  // console.log("Apple Historical Data: ", aapl_hist);
  const marketDates = history.map((e: any) => e.date.toLocaleDateString('en-US'));
  // console.log("Market Dates: ", marketDates);
  // TODO: Eventually User will choose 1m, 5m, 15m, 1d, 1w etc to display data
  const dates = getDates(startDate, endDate);
  // console.log("Dates: ", dates);

  const data = {
    labels: marketDates,
    datasets: [
      // {
      //   label: "Longs",
      //   data: longs,
      //   borderColor: 'rgb(53, 162, 235)',
      //   backgroundColor: 'rgba(53, 162, 235, 0.5)',
      // },
      // {
      //   label: "Shorts",
      //   data: shorts,
      //   borderColor: 'rgb(255, 255, 0)',
      //   backgroundColor: 'rgba(0, 100, 235, 0.5)',
      // },
      {
        label: "Stock",
        data: history.map((e: any) => e.close!),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }
    ],
    width: 100,
    height: 40,
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

      <Selector {...stocks} />
      <LineChart {...data} />
      <form>
        <div className="flex">
          <label htmlFor="search-dropdown" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label>
          <button id="dropdown-button" data-dropdown-toggle="dropdown" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700 dark:text-white dark:border-gray-600" type="button">All Assets<svg className="w-2.5 h-2.5 ml-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
          </svg></button>
          <div id="dropdown" className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700">
            <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdown-button">
              <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Mockups</button>
              </li>
              <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Templates</button>
              </li>
              <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Design</button>
              </li>
              <li>
                <button type="button" className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logos</button>
              </li>
            </ul>
          </div>
          <div className="relative w-full">
            <input type="search" id="search-dropdown" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search Stocks and Cryptos" required />
            <button type="submit" className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </div>
        </div>
      </form>
      {/* <DoubleLineChart /> */}
      {/* <LineChart /> */}
    </>
  )
}
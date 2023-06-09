// import { GetAssets } from "@/components/portfolio/Asset";

// export default async function AssetsPage({ params }: { params: { id: string } }) {
//   const stocks = await prisma.stockAsset.findMany({
//     where: { portfolioId: String(params.id)},
//     select: {
//       name: true,
//       ticker: true,
//       index: true,
//       amount: true,
//       average: true,
//       portfolio: {
//         select: {
//           id: true
//         }
//       },
//     }
//   });

//   const cryptos = await prisma.cryptoAsset.findMany({
//     where: { portfolioId: String(params.id)},
//     select: {
//       name: true,
//       ticker: true,
//       amount: true,
//       average: true,
//       portfolio: {
//         select: {
//           id: true
//         }
//       },
//     }
//   });

//   const assets = { stocks, cryptos };

//   console.log("Stocks: ", stocks);
//   console.log("Cryptos: ", cryptos);
//   return (
//     <GetAssets {...assets} />
//   )
// };
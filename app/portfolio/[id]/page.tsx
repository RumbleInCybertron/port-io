import { GetPortfolio } from "@/components/Portfolio";

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const portfolio = await prisma.portfolio.findUniqueOrThrow({
    where: { id: String(params.id) },
    select: {
      id: true,
      userId: true,
      name: true,
      ttl_value: true,
      Fiat: true,
      stockAssets: { select: { name: true, ticker: true, index: true, amount: true, average: true, updatedAt: true, id: true } },
      cryptoAssets: { select: { name: true, ticker: true, amount: true, average: true, updatedAt: true, id: true } }
    }
  });

  const stockAssetIds = portfolio.stockAssets.map((e: any) => e.id);
  console.log("Stock IDs from DB: ", stockAssetIds);
  const cryptoAssetIds = portfolio.cryptoAssets.map((e: any) => e.id);
  console.log("Crypto IDs from DB: ", cryptoAssetIds);
  const profits = await prisma.profit.findMany({
    where: { OR: [{ stockAssetId: { in: stockAssetIds } }, { cryptoAssetId: { in: cryptoAssetIds } }] }
  });

  const losses = await prisma.loss.findMany({
    where: { OR: [{ stockAssetId: { in: stockAssetIds } }, { cryptoAssetId: { in: cryptoAssetIds } }] }
  });

  console.log("Losses from DB: ", losses);

  const props = { portfolio, profits, losses };

  console.log("Portfolio w/ ID param: ", portfolio);
  return (
    <div className="container mx-auto">
      <GetPortfolio {...props} />
    </div>
  )
};
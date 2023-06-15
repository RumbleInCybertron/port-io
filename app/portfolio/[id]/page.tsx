import { GetPortfolio } from "@/components/Portfolio";

export default async function PortfolioPage({ params }: { params: { id: string } }) {
  const portfolio = await prisma.portfolio.findUniqueOrThrow({
    where: { id: String(params.id) },
    select: {
      id: true,
      userId: true,
      name: true,
      Fiat: true,
      stockAssets: { select: { name: true, ticker: true, index: true, amount: true, average: true, updatedAt: true, id: true } },
      cryptoAssets: { select: { name: true, ticker: true, amount: true, average: true, updatedAt: true, id: true } }
    }
  });

  console.log("Portfolio w/ ID param: ", portfolio);
  return (
    <GetPortfolio {...portfolio} />
  )
};
import { GetPortfolios } from "@/components/Portfolio";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export default async function PortfoliosPage() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUniqueOrThrow({
    where: { email: String(session?.user?.email) },
    select: { id: true, email: true, image: true, name: true },
  });

  const portfolios = await prisma.portfolio.findMany({
    where: { userId: user!.id},
    select: {
      id: true,
      name: true,
      ttl_value: true,
      stockAssets: { select: { name: true, ticker: true, index: true, amount: true, average: true, updatedAt: true, id: true } },
      cryptoAssets: { select: { name: true, ticker: true, amount: true, average: true, updatedAt: true, id: true } }
    }
  });

  console.log("User Id from Params: ", user!.id);
  console.log("Portfolios: ", portfolios);

  return (
    <GetPortfolios portfolios={portfolios} />
  );
};
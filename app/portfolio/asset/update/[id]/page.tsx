
import { AssetForm } from "./form";

export default async function UpdateAssetPage({ params }: { params: { id: string } }) {
  const portfolio = await prisma.portfolio.findUniqueOrThrow({
    where: { id: String(params.id) },
    select: {
      id: true,
      Fiat: { select: { amount: true}},
    }
  });

  return (
    <AssetForm {...portfolio} />
  );
}
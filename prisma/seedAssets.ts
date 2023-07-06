import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createTransactions() {
  const portfolioId = "cljo52qkk0008lhtsm6cn6wse";
  await prisma.stockAsset.deleteMany({
    where: { portfolioId: portfolioId },
  });
  const asset = await prisma.stockAsset.create({
    data: {
      name: "Apple Inc.",
      ticker: "AAPL",
      index: "NASDAQ",
      amount: 0,
      average: 0,
      portfolioId: portfolioId, // avoid getting user
    },
  });

  const longTransactionData = [
    {
      price: 177.5,
      units: 10,
      type: "long",
      createdAt: new Date("2023-05-31").toISOString(),
      stockAssetId: String(asset.id),
    },
    {
      price: 178.08,
      units: 10,
      type: "long",
      createdAt: new Date("2023-06-01").toISOString(),
      stockAssetId: String(asset.id),
    },
    {
      price: 181.6,
      units: 5,
      type: "long",
      createdAt: new Date("2023-06-02").toISOString(),
      stockAssetId: String(asset.id),
    },
    {
      price: 178.69,
      units: 10,
      type: "long",
      createdAt: new Date("2023-06-05").toISOString(),
      stockAssetId: String(asset.id),
    },
    {
      price: 180.11,
      units: 10,
      type: "long",
      createdAt: new Date("2023-06-06").toISOString(),
      stockAssetId: String(asset.id),
    },
  ];
  await prisma.transaction.createMany({
    data: longTransactionData,
  });

  let totalShares = 0;
  const average =
    longTransactionData.reduce((acc, cur) => {
      totalShares += cur.units;
      return acc + cur.price * cur.units;
    }, 0) / totalShares;

  await prisma.stockAsset.update({
    where: { id: String(asset.id) },
    data: {
      amount: totalShares,
      average: average,
    },
  });
  const shortTransactionData = [
    {
      price: 185.5,
      units: 5,
      type: "short",
      stockAssetId: String(asset.id),
      createdAt: new Date("2023-06-26"),
    },
    {
      price: 186.01,
      units: 5,
      type: "short",
      stockAssetId: String(asset.id),
      createdAt: new Date("2023-06-27"),
    },
    {
      price: 189.47,
      units: 5,
      type: "short",
      stockAssetId: String(asset.id),
      createdAt: new Date("2023-06-28"),
    },
    {
      price: 189.33,
      units: 5,
      type: "short",
      stockAssetId: String(asset.id),
      createdAt: new Date("2023-06-29"),
    },
    {
      price: 192.1,
      units: 5,
      type: "short",
      stockAssetId: String(asset.id),
      createdAt: new Date("2023-06-30"),
    },
  ];
  await prisma.transaction.createMany({
    data: shortTransactionData,
  });


  let profit = 0;
  shortTransactionData.forEach(async (i) => {
    profit = i.price * i.units - average * i.units;

    if (profit > 0) createProfit(profit, asset.id);
    else if (profit < 0) createLoss(profit, asset.id);

    await prisma.$executeRaw`
    UPDATE "Fiat"
    SET "amount" = "amount" + ${i.price}*${i.units}
    WHERE "portfolioId" = ${String(portfolioId)};`;

    await prisma.$executeRaw`
    UPDATE "Portfolio"
    SET "ttl_value" = "ttl_value" + ${Number(i.units) * Number(i.price)}
    WHERE "id" = ${String(portfolioId)};`;
  });
}

async function createProfit(profit: number, id: string) {
  await prisma.profit.create({
    data: {
      amount: profit,
      stockAssetId: id,
    },
  });
}

async function createLoss(amount: number, id: string) {
  await prisma.loss.create({
    data: {
      amount: amount,
      stockAssetId: id,
    },
  });
}

async function main() {
  await createTransactions();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

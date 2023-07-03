import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import path from "path";
import fs, { promises } from "fs";
import Papa from "papaparse";

const prisma = new PrismaClient();

async function createStocks(results: Papa.ParseResult<unknown>) {
  results.data.forEach(async (row: any) => {
    const stock = await prisma.stock.create({
      data: {
        name: String(row[1]),
        ticker: String(row[0]),
        index: "NYSE",
        last_updated: new Date(),
      },
    });
    console.log("Stock: ", stock);
  });
}

async function main() {
  const password = await hash("password123", 12);
  const user = await prisma.user.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      name: "Admin",
      password,
    },
  });
  console.log({ user });

  const portfolio1 = await prisma.portfolio.create({
    data: { name: "Test Portfolio #1", ttl_value: 0, userId: String(user.id) },
  });
  console.log({ portfolio1 });

  const portfolio2 = await prisma.portfolio.create({
    data: { name: "Test Portfolio #2", ttl_value: 0, userId: String(user.id) },
  });
  console.log({ portfolio2 });

  const portfolio3 = await prisma.portfolio.create({
    data: { name: "Test Portfolio #3", ttl_value: 0, userId: String(user.id) },
  });
  console.log({ portfolio3 });

  const stockAsset1 = await prisma.stockAsset.create({
    data: {
      name: "Unity Software Inc",
      ticker: "U",
      index: "NYSE",
      amount: 10,
      average: 30,
      portfolioId: String(portfolio1.id),
    },
  });
  console.log({ stockAsset1 });
  const transaction1 = await prisma.transaction.create({
    data: {
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset1.id),
    },
  });
  console.log({ transaction1 });

  const stockAsset2 = await prisma.stockAsset.create({
    data: {
      name: "Alibaba Group Holding Ltd - ADR",
      ticker: "BABA",
      index: "NYSE",
      amount: 5,
      average: 75,
      portfolioId: String(portfolio1.id),
    },
  });
  console.log({ stockAsset2 });
  const transaction2 = await prisma.transaction.create({
    data: {
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset2.id),
    },
  });
  console.log({ transaction2 });

  const stockAsset3 = await prisma.stockAsset.create({
    data: {
      name: "Advanced Micro Devices, Inc",
      ticker: "AMD",
      index: "NASDAQ",
      amount: 10,
      average: 80,
      portfolioId: String(portfolio1.id),
    },
  });
  console.log({ stockAsset3 });
  const transaction3 = await prisma.transaction.create({
    data: {
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset3.id),
    },
  });
  console.log({ transaction3 });

  let filenames: string[] = [];
  // const dir = path.join(process.cwd(), 'hist_data');
  const ticker_lists = "/Users/cyb3rf0x/repos/nasdaq/ticker_lists/"; // Mac
  // dir = "C:/Users/rumbl/repos/stock_scrape/ticker_lists/"; // Windows
  fs.readdirSync(ticker_lists).forEach((file) => {
    filenames.push(file);
  });

  filenames.forEach(async (file) => {
    const csv = await promises.readFile(ticker_lists + file, "utf-8");
    const csvData = csv.toString();
    await Papa.parse(csvData, {
      complete: async (results) => {
        // console.log("Parsed Results: ", results.data);
        await createStocks(results);
      },
    });
  });

  // await createHistoricalData();
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

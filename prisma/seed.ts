import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";
import path from "path";
import fs, {promises} from "fs";
import Papa from "papaparse";

const prisma = new PrismaClient();

async function createHistoricalData() {
  
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
      portfolioId: String(portfolio1.id)    
    }
  });
  console.log({ stockAsset1 });
  const transaction1 = await prisma.transaction.create({
    data: { 
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset1.id)
    }
  });
  console.log({transaction1});

  const stockAsset2 = await prisma.stockAsset.create({
    data: { 
      name: "Alibaba Group Holding Ltd - ADR",
      ticker: "BABA",
      index: "NYSE",
      amount: 5,
      average: 75,
      portfolioId: String(portfolio1.id)    
    }
  });
  console.log({ stockAsset2 });
  const transaction2 = await prisma.transaction.create({
    data: { 
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset2.id)
    }
  });
  console.log({transaction2});

  const stockAsset3 = await prisma.stockAsset.create({
    data: { 
      name: "Advanced Micro Devices, Inc",
      ticker: "AMD",
      index: "NASDAQ",
      amount: 10,
      average: 80,
      portfolioId: String(portfolio1.id)    
    }
  });
  console.log({ stockAsset3 });
  const transaction3 = await prisma.transaction.create({
    data: { 
      price: 30,
      units: 10,
      type: "stock",
      stockAssetId: String(stockAsset3.id)
    }
  });
  console.log({transaction3});

  let dir = "";
  let filenames: string[] = [];
  // const dir = path.join(process.cwd(), 'historical_data');
  dir = "C:/Users/rumbl/repos/stock_scrape/historical_data/";
  fs.readdirSync(dir).forEach(file => {
    filenames.push(file);
  });


  filenames.forEach(async(file) => {
    await promises.readFile(dir + file, "utf-8")
    await Papa.parse(file, {complete: async(results) => {
      console.log("CSV Data: ", results);
      results.data.slice(1).forEach(async(row: any) => {
        await prisma.stock.create({
          data: {
            name: ,
            ticker: ,
            index: ,
            price: ,
            last_updated: 
          }
        });

        await prisma.historicalData.create({
         data: {
          date: row[0],
          close: row[1],
          volume: row[2],
          open: row[3],
          high: row[4],
          low: row[5],
          stockId: 
         } 
        });
      })
    }});
    });
  
};
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

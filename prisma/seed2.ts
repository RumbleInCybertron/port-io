import { PrismaClient } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import fs, { promises } from "fs";
import Papa from "papaparse";

const prisma = new PrismaClient();

async function createHistoricalData() {
  await prisma.historicalData.deleteMany({});
  const hist_data = "/Users/cyb3rf0x/repos/nasdaq/hist_data/"; // Mac
  // dir = "C:/Users/rumbl/repos/stock_scrape/hist_data/"; // Windows
  let filenames: string[] = [];
  fs.readdirSync(hist_data).forEach((file) => {
    filenames.push(file);
    // console.log("File: ", file);
  });
  filenames.forEach(async (file) => {
    const csv = await promises.readFile(hist_data + file, "utf-8");
    // const parts = csv.split("\n");
    // const slc = parts.slice(1, 2);
    // const parts2 = slc[0].split(",");
    // const sub = parts2.slice(6, 7);
    // const ticker = sub.join();

    const csvData = csv.toString();
    await Papa.parse(csvData, {
      complete: async (results) => {
        // console.log("CSV Data: ", results.data);
        results.data.slice(1).forEach(async (row: any) => {
          let d = new Date(row[0]).toISOString();

          // const stock = await prisma.stock.findFirstOrThrow({
          //   where: { ticker: String(ticker) },
          // });
          // console.log("Stock ID: ", stock.id);

          const hist_data = await prisma.historicalData.create({
            data: {
              ticker: String(row[6]),
              date: d,
              close: row[1] === "" ? null : parseFloat(row[1].substring(1)),
              volume: row[2] === "" ? null : parseInt(row[2]),
              open: row[3] === "" ? null : parseFloat(row[3].substring(1)),
              high: row[4] === "" ? null : parseFloat(row[4].substring(1)),
              low: row[5] === "" ? null : parseFloat(row[5].substring(1)),
              // stockId: String(stock.id),
              // stockId: "id" + Math.random().toString(16).slice(2)
            },
          });
          console.log("Historical Data: ", hist_data);
        });
      },
    });
  });
}

async function main() {
  await createHistoricalData();
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
